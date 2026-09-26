"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import {
  CtaList,
  ImageUpload,
  ParagraphList,
  RemoveButton,
  Section,
  addButtonClass,
  inputClass,
  labelClass,
} from "@/components/admin/fields";
import { DEFAULT_CONTENT, type Artist, type ArtistCategory, type SiteContent, type TeamMember } from "@/lib/content";

const TABS = [
  { id: "site", label: "Site" },
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "learn", label: "Learn" },
  { id: "parampara", label: "Parampara" },
  { id: "artists", label: "Artists" },
  { id: "news", label: "What’s New" },
  { id: "support", label: "Support" },
  { id: "contact", label: "Contact" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [storageConfigured, setStorageConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "error"; message: string } | null>(null);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [tab, setTab] = useState<TabId>("home");
  const contentRef = useRef<SiteContent | null>(null);

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    fetch("/api/admin/content")
      .then(async (res) => {
        if (res.status === 401) {
          router.push("/admin/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        setContent(data.content);
        setStorageConfigured(data.storageConfigured);
      })
      .finally(() => setLoading(false));
  }, [router]);

  async function persist(payload: SiteContent, message: string) {
    setSaving(true);
    setStatus(null);
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      setStatus({ type: "ok", message });
      return;
    }
    const data = await res.json().catch(() => null);
    setStatus({ type: "error", message: data?.error || "Failed to save changes." });
  }

  async function handleSave() {
    if (!contentRef.current) return;
    await persist(contentRef.current, "Changes saved. The live site is updated.");
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.error || "Upload failed.");
    return data.url as string;
  }

  async function handleUpload(key: string, file: File, update: (prev: SiteContent, url: string) => SiteContent) {
    setUploadingKey(key);
    setStatus(null);
    try {
      const url = await uploadImage(file);
      const prev = contentRef.current;
      if (!prev) return;
      const next = update(prev, url);
      contentRef.current = next;
      setContent(next);
      await persist(next, "Photo uploaded and saved. The live site is updated.");
    } catch (err) {
      setStatus({ type: "error", message: err instanceof Error ? err.message : "Upload failed." });
    } finally {
      setUploadingKey(null);
    }
  }

  if (loading) {
    return <main className="flex min-h-screen items-center justify-center bg-ivory text-ink">Loading…</main>;
  }
  if (!content) return null;

  return (
    <main className="min-h-screen bg-ivory pb-24">
      <header className="sticky top-0 z-10 border-b border-parchment bg-ivory/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-y-2 px-4 py-3 sm:px-6">
          <Logo size="sm" />
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="/" target="_blank" rel="noreferrer" className="text-sm font-medium text-ink transition hover:text-burgundy">
              View site ↗
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-burgundy px-3 py-2 text-sm font-semibold text-ivory transition hover:bg-deep-burgundy sm:px-4"
            >
              Log out
            </button>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-3 sm:px-6">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition ${
                tab === item.id ? "bg-burgundy text-ivory" : "bg-white text-ink/70 hover:text-burgundy"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-6 px-6 py-8">
        {!storageConfigured && (
          <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Storage isn&apos;t connected yet, so changes can&apos;t be saved. Connect a Neon database to this project
            in the Vercel dashboard (Storage tab), then redeploy.
          </p>
        )}

        {tab === "site" && (
          <Section title="Brand" description="Used in the header, footer and across the site.">
            <div>
              <label className={labelClass}>Organisation name</label>
              <input
                className={`mt-1 ${inputClass}`}
                value={content.site.name}
                onChange={(e) => setContent({ ...content, site: { ...content.site, name: e.target.value } })}
              />
            </div>
            <div>
              <label className={labelClass}>Principal brand statement</label>
              <input
                className={`mt-1 ${inputClass}`}
                value={content.site.brandStatement}
                onChange={(e) => setContent({ ...content, site: { ...content.site, brandStatement: e.target.value } })}
              />
            </div>
            <div>
              <label className={labelClass}>Website</label>
              <input
                className={`mt-1 ${inputClass}`}
                value={content.site.website || ""}
                onChange={(e) => setContent({ ...content, site: { ...content.site, website: e.target.value } })}
              />
            </div>
            <div>
              <label className={labelClass}>Tagline</label>
              <textarea
                rows={3}
                className={`mt-1 ${inputClass}`}
                value={content.site.tagline}
                onChange={(e) => setContent({ ...content, site: { ...content.site, tagline: e.target.value } })}
              />
            </div>
          </Section>
        )}

        {tab === "home" && (
          <>
            <Section title="Home" description="Hero and introduction on the homepage.">
              <div>
                <label className={labelClass}>Heading</label>
                <input
                  className={`mt-1 ${inputClass}`}
                  value={content.home.heading}
                  onChange={(e) => setContent({ ...content, home: { ...content.home, heading: e.target.value } })}
                />
              </div>
              <div>
                <label className={labelClass}>Lead sentence</label>
                <textarea
                  rows={3}
                  className={`mt-1 ${inputClass}`}
                  value={content.home.lead}
                  onChange={(e) => setContent({ ...content, home: { ...content.home, lead: e.target.value } })}
                />
              </div>
              <div>
                <label className={labelClass}>Feature photograph</label>
                <p className="mt-1 text-xs text-ink/60">Shown under the maroon hero panel on the home page.</p>
                <div className="mt-1">
                  <ImageUpload
                    imageUrl={content.home.heroImage}
                    uploading={uploadingKey === "homeHero"}
                    onUpload={(file) =>
                      handleUpload("homeHero", file, (prev, url) => ({
                        ...prev,
                        home: { ...prev.home, heroImage: url },
                      }))
                    }
                    onClear={() => setContent({ ...content, home: { ...content.home, heroImage: "" } })}
                  />
                </div>
              </div>
              <ParagraphList
                values={content.home.paragraphs}
                onChange={(paragraphs) => setContent({ ...content, home: { ...content.home, paragraphs } })}
                onAdd={() =>
                  setContent({ ...content, home: { ...content.home, paragraphs: [...content.home.paragraphs, ""] } })
                }
                onRemove={(i) =>
                  setContent({
                    ...content,
                    home: { ...content.home, paragraphs: content.home.paragraphs.filter((_, idx) => idx !== i) },
                  })
                }
              />
            </Section>
            <Section title="Home closing">
              <div>
                <label className={labelClass}>Closing heading</label>
                <input
                  className={`mt-1 ${inputClass}`}
                  value={content.home.closingHeading}
                  onChange={(e) => setContent({ ...content, home: { ...content.home, closingHeading: e.target.value } })}
                />
              </div>
              <ParagraphList
                values={content.home.closingParagraphs}
                onChange={(closingParagraphs) => setContent({ ...content, home: { ...content.home, closingParagraphs } })}
                onAdd={() =>
                  setContent({
                    ...content,
                    home: { ...content.home, closingParagraphs: [...content.home.closingParagraphs, ""] },
                  })
                }
                onRemove={(i) =>
                  setContent({
                    ...content,
                    home: {
                      ...content.home,
                      closingParagraphs: content.home.closingParagraphs.filter((_, idx) => idx !== i),
                    },
                  })
                }
              />
              <CtaList
                values={content.home.ctas}
                onChange={(i, field, value) => {
                  const ctas = [...content.home.ctas];
                  ctas[i] = { ...ctas[i], [field]: value };
                  setContent({ ...content, home: { ...content.home, ctas } });
                }}
                onAdd={() =>
                  setContent({ ...content, home: { ...content.home, ctas: [...content.home.ctas, { label: "", href: "" }] } })
                }
                onRemove={(i) =>
                  setContent({ ...content, home: { ...content.home, ctas: content.home.ctas.filter((_, idx) => idx !== i) } })
                }
              />
            </Section>
          </>
        )}

        {tab === "about" && (
          <>
            <Section title="About">
              <div>
                <label className={labelClass}>Heading</label>
                <input
                  className={`mt-1 ${inputClass}`}
                  value={content.about.heading}
                  onChange={(e) => setContent({ ...content, about: { ...content.about, heading: e.target.value } })}
                />
              </div>
              <div>
                <label className={labelClass}>Lead</label>
                <textarea
                  rows={2}
                  className={`mt-1 ${inputClass}`}
                  value={content.about.lead}
                  onChange={(e) => setContent({ ...content, about: { ...content.about, lead: e.target.value } })}
                />
              </div>
              <ImageUpload
                imageUrl={content.about.photoUrl}
                uploading={uploadingKey === "aboutPhoto"}
                onUpload={(file) =>
                  handleUpload("aboutPhoto", file, (prev, url) => ({
                    ...prev,
                    about: { ...prev.about, photoUrl: url },
                  }))
                }
                onClear={() => setContent({ ...content, about: { ...content.about, photoUrl: "" } })}
              />
              <ParagraphList
                values={content.about.paragraphs}
                onChange={(paragraphs) => setContent({ ...content, about: { ...content.about, paragraphs } })}
                onAdd={() =>
                  setContent({ ...content, about: { ...content.about, paragraphs: [...content.about.paragraphs, ""] } })
                }
                onRemove={(i) =>
                  setContent({
                    ...content,
                    about: { ...content.about, paragraphs: content.about.paragraphs.filter((_, idx) => idx !== i) },
                  })
                }
              />
            </Section>
            <Section title="What We Do">
              <div>
                <label className={labelClass}>Heading</label>
                <input
                  className={`mt-1 ${inputClass}`}
                  value={content.about.whatWeDoHeading}
                  onChange={(e) =>
                    setContent({ ...content, about: { ...content.about, whatWeDoHeading: e.target.value } })
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Introduction</label>
                <input
                  className={`mt-1 ${inputClass}`}
                  value={content.about.whatWeDoIntro}
                  onChange={(e) => setContent({ ...content, about: { ...content.about, whatWeDoIntro: e.target.value } })}
                />
              </div>
              {content.about.areas.map((area, i) => (
                <div key={i} className="rounded-xl border border-parchment p-4">
                  <div className="flex items-start gap-2">
                    <div className="w-full space-y-3">
                      <input
                        className={inputClass}
                        value={area.title}
                        onChange={(e) => {
                          const areas = [...content.about.areas];
                          areas[i] = { ...areas[i], title: e.target.value };
                          setContent({ ...content, about: { ...content.about, areas } });
                        }}
                      />
                      <textarea
                        rows={3}
                        className={inputClass}
                        value={area.description}
                        onChange={(e) => {
                          const areas = [...content.about.areas];
                          areas[i] = { ...areas[i], description: e.target.value };
                          setContent({ ...content, about: { ...content.about, areas } });
                        }}
                      />
                    </div>
                    <RemoveButton
                      label="Remove area"
                      onClick={() =>
                        setContent({
                          ...content,
                          about: { ...content.about, areas: content.about.areas.filter((_, idx) => idx !== i) },
                        })
                      }
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                className={addButtonClass}
                onClick={() =>
                  setContent({
                    ...content,
                    about: { ...content.about, areas: [...content.about.areas, { title: "", description: "" }] },
                  })
                }
              >
                + Add area
              </button>
            </Section>
            <Section title="Meet the Team" description="Add photographs and biographies. You can add more people at any time.">
              <Field
                value={content.about.teamHeading || ""}
                label="Heading"
                onChange={(teamHeading) => setContent({ ...content, about: { ...content.about, teamHeading } })}
              />
              <Area
                value={content.about.teamIntro || ""}
                label="Introduction"
                onChange={(teamIntro) => setContent({ ...content, about: { ...content.about, teamIntro } })}
              />
              {(content.about.teamMembers || []).map((member, i) => (
                <TeamEditor
                  key={i}
                  member={member}
                  uploading={uploadingKey === `team-${i}`}
                  onChange={(next) => {
                    const teamMembers = [...(content.about.teamMembers || [])];
                    teamMembers[i] = next;
                    setContent({ ...content, about: { ...content.about, teamMembers } });
                  }}
                  onUpload={(file) =>
                    handleUpload(`team-${i}`, file, (prev, url) => {
                      const teamMembers = [...(prev.about.teamMembers || [])];
                      teamMembers[i] = { ...teamMembers[i], photoUrl: url };
                      return { ...prev, about: { ...prev.about, teamMembers } };
                    })
                  }
                  onRemove={() =>
                    setContent({
                      ...content,
                      about: {
                        ...content.about,
                        teamMembers: (content.about.teamMembers || []).filter((_, idx) => idx !== i),
                      },
                    })
                  }
                />
              ))}
              <button
                type="button"
                className={addButtonClass}
                onClick={() =>
                  setContent({
                    ...content,
                    about: {
                      ...content.about,
                      teamMembers: [
                        ...(content.about.teamMembers || []),
                        { name: "", role: "", bio: "", photoUrl: "" },
                      ],
                    },
                  })
                }
              >
                + Add team member
              </button>
            </Section>
            <Section title="Why It Matters">
              <div>
                <label className={labelClass}>Heading</label>
                <input
                  className={`mt-1 ${inputClass}`}
                  value={content.about.whyHeading}
                  onChange={(e) => setContent({ ...content, about: { ...content.about, whyHeading: e.target.value } })}
                />
              </div>
              <ParagraphList
                values={content.about.whyParagraphs}
                onChange={(whyParagraphs) => setContent({ ...content, about: { ...content.about, whyParagraphs } })}
                onAdd={() =>
                  setContent({
                    ...content,
                    about: { ...content.about, whyParagraphs: [...content.about.whyParagraphs, ""] },
                  })
                }
                onRemove={(i) =>
                  setContent({
                    ...content,
                    about: { ...content.about, whyParagraphs: content.about.whyParagraphs.filter((_, idx) => idx !== i) },
                  })
                }
              />
            </Section>
          </>
        )}

        {tab === "learn" && (
          <>
            <LearnSection
              title="Workshops & Shibirs"
              heading={content.workshops.heading}
              lead={content.workshops.lead}
              paragraphs={content.workshops.paragraphs}
              photoUrl={content.workshops.photoUrl}
              uploading={uploadingKey === "workshopsPhoto"}
              onHeading={(heading) => setContent({ ...content, workshops: { ...content.workshops, heading } })}
              onLead={(lead) => setContent({ ...content, workshops: { ...content.workshops, lead } })}
              onParagraphs={(paragraphs) => setContent({ ...content, workshops: { ...content.workshops, paragraphs } })}
              onPhoto={(file) =>
                handleUpload("workshopsPhoto", file, (prev, url) => ({
                  ...prev,
                  workshops: { ...prev.workshops, photoUrl: url },
                }))
              }
              onClearPhoto={() => setContent({ ...content, workshops: { ...content.workshops, photoUrl: "" } })}
            />
            <Section title="The Sadhana Arts Shibir">
              <div>
                <label className={labelClass}>Heading</label>
                <input
                  className={`mt-1 ${inputClass}`}
                  value={content.workshops.shibirHeading}
                  onChange={(e) =>
                    setContent({ ...content, workshops: { ...content.workshops, shibirHeading: e.target.value } })
                  }
                />
              </div>
              <ParagraphList
                values={content.workshops.shibirParagraphs}
                onChange={(shibirParagraphs) =>
                  setContent({ ...content, workshops: { ...content.workshops, shibirParagraphs } })
                }
                onAdd={() =>
                  setContent({
                    ...content,
                    workshops: { ...content.workshops, shibirParagraphs: [...content.workshops.shibirParagraphs, ""] },
                  })
                }
                onRemove={(i) =>
                  setContent({
                    ...content,
                    workshops: {
                      ...content.workshops,
                      shibirParagraphs: content.workshops.shibirParagraphs.filter((_, idx) => idx !== i),
                    },
                  })
                }
              />
            </Section>
            <Section title="Beyond the Shibir">
              <div>
                <label className={labelClass}>Heading</label>
                <input
                  className={`mt-1 ${inputClass}`}
                  value={content.workshops.beyondHeading}
                  onChange={(e) =>
                    setContent({ ...content, workshops: { ...content.workshops, beyondHeading: e.target.value } })
                  }
                />
              </div>
              <ParagraphList
                values={content.workshops.beyondParagraphs}
                onChange={(beyondParagraphs) =>
                  setContent({ ...content, workshops: { ...content.workshops, beyondParagraphs } })
                }
                onAdd={() =>
                  setContent({
                    ...content,
                    workshops: { ...content.workshops, beyondParagraphs: [...content.workshops.beyondParagraphs, ""] },
                  })
                }
                onRemove={(i) =>
                  setContent({
                    ...content,
                    workshops: {
                      ...content.workshops,
                      beyondParagraphs: content.workshops.beyondParagraphs.filter((_, idx) => idx !== i),
                    },
                  })
                }
              />
              <CtaList
                values={content.workshops.ctas}
                onChange={(i, field, value) => {
                  const ctas = [...content.workshops.ctas];
                  ctas[i] = { ...ctas[i], [field]: value };
                  setContent({ ...content, workshops: { ...content.workshops, ctas } });
                }}
                onAdd={() =>
                  setContent({
                    ...content,
                    workshops: { ...content.workshops, ctas: [...content.workshops.ctas, { label: "", href: "" }] },
                  })
                }
                onRemove={(i) =>
                  setContent({
                    ...content,
                    workshops: { ...content.workshops, ctas: content.workshops.ctas.filter((_, idx) => idx !== i) },
                  })
                }
              />
            </Section>
            <LearnSection
              title="Masterclasses"
              heading={content.masterclasses.heading}
              lead={content.masterclasses.lead}
              paragraphs={content.masterclasses.paragraphs}
              onHeading={(heading) => setContent({ ...content, masterclasses: { ...content.masterclasses, heading } })}
              onLead={(lead) => setContent({ ...content, masterclasses: { ...content.masterclasses, lead } })}
              onParagraphs={(paragraphs) =>
                setContent({ ...content, masterclasses: { ...content.masterclasses, paragraphs } })
              }
            />
            <LearnSection
              title="Education & Schools"
              heading={content.education.heading}
              lead={content.education.lead}
              paragraphs={content.education.paragraphs}
              onHeading={(heading) => setContent({ ...content, education: { ...content.education, heading } })}
              onLead={(lead) => setContent({ ...content, education: { ...content.education, lead } })}
              onParagraphs={(paragraphs) => setContent({ ...content, education: { ...content.education, paragraphs } })}
            />
          </>
        )}

        {tab === "parampara" && (
          <>
            <Section title="About Parampara">
              <Field value={content.parampara.heading} label="Heading" onChange={(heading) => setContent({ ...content, parampara: { ...content.parampara, heading } })} />
              <Area value={content.parampara.lead} label="Lead" onChange={(lead) => setContent({ ...content, parampara: { ...content.parampara, lead } })} />
              <ImageUpload
                imageUrl={content.parampara.photoUrl}
                uploading={uploadingKey === "paramparaPhoto"}
                onUpload={(file) =>
                  handleUpload("paramparaPhoto", file, (prev, url) => ({
                    ...prev,
                    parampara: { ...prev.parampara, photoUrl: url },
                  }))
                }
                onClear={() => setContent({ ...content, parampara: { ...content.parampara, photoUrl: "" } })}
              />
              <ParagraphList
                values={content.parampara.paragraphs}
                onChange={(paragraphs) => setContent({ ...content, parampara: { ...content.parampara, paragraphs } })}
                onAdd={() =>
                  setContent({ ...content, parampara: { ...content.parampara, paragraphs: [...content.parampara.paragraphs, ""] } })
                }
                onRemove={(i) =>
                  setContent({
                    ...content,
                    parampara: { ...content.parampara, paragraphs: content.parampara.paragraphs.filter((_, idx) => idx !== i) },
                  })
                }
              />
              <CtaList
                values={content.parampara.ctas}
                onChange={(i, field, value) => {
                  const ctas = [...content.parampara.ctas];
                  ctas[i] = { ...ctas[i], [field]: value };
                  setContent({ ...content, parampara: { ...content.parampara, ctas } });
                }}
                onAdd={() =>
                  setContent({ ...content, parampara: { ...content.parampara, ctas: [...content.parampara.ctas, { label: "", href: "" }] } })
                }
                onRemove={(i) =>
                  setContent({ ...content, parampara: { ...content.parampara, ctas: content.parampara.ctas.filter((_, idx) => idx !== i) } })
                }
              />
            </Section>

            <Section title="Parampara 2025" description="Add the 2025 artist line-up, venue, photography and video links here.">
              <Field value={content.parampara2025.heading} label="Heading" onChange={(heading) => setContent({ ...content, parampara2025: { ...content.parampara2025, heading } })} />
              <Field value={content.parampara2025.subtitle} label="Subtitle" onChange={(subtitle) => setContent({ ...content, parampara2025: { ...content.parampara2025, subtitle } })} />
              <Field value={content.parampara2025.venue} label="Venue" onChange={(venue) => setContent({ ...content, parampara2025: { ...content.parampara2025, venue } })} />
              <Area value={content.parampara2025.lineup} label="Artist line-up" onChange={(lineup) => setContent({ ...content, parampara2025: { ...content.parampara2025, lineup } })} />
              <ImageUpload
                imageUrl={content.parampara2025.photoUrl}
                uploading={uploadingKey === "p2025"}
                onUpload={(file) =>
                  handleUpload("p2025", file, (prev, url) => ({
                    ...prev,
                    parampara2025: { ...prev.parampara2025, photoUrl: url },
                  }))
                }
                onClear={() => setContent({ ...content, parampara2025: { ...content.parampara2025, photoUrl: "" } })}
              />
              <ParagraphList
                values={content.parampara2025.paragraphs}
                onChange={(paragraphs) => setContent({ ...content, parampara2025: { ...content.parampara2025, paragraphs } })}
                onAdd={() =>
                  setContent({ ...content, parampara2025: { ...content.parampara2025, paragraphs: [...content.parampara2025.paragraphs, ""] } })
                }
                onRemove={(i) =>
                  setContent({
                    ...content,
                    parampara2025: {
                      ...content.parampara2025,
                      paragraphs: content.parampara2025.paragraphs.filter((_, idx) => idx !== i),
                    },
                  })
                }
              />
              <Field value={content.parampara2025.legacyHeading} label="Legacy heading" onChange={(legacyHeading) => setContent({ ...content, parampara2025: { ...content.parampara2025, legacyHeading } })} />
              <ParagraphList
                values={content.parampara2025.legacyParagraphs}
                onChange={(legacyParagraphs) => setContent({ ...content, parampara2025: { ...content.parampara2025, legacyParagraphs } })}
                onAdd={() =>
                  setContent({
                    ...content,
                    parampara2025: { ...content.parampara2025, legacyParagraphs: [...content.parampara2025.legacyParagraphs, ""] },
                  })
                }
                onRemove={(i) =>
                  setContent({
                    ...content,
                    parampara2025: {
                      ...content.parampara2025,
                      legacyParagraphs: content.parampara2025.legacyParagraphs.filter((_, idx) => idx !== i),
                    },
                  })
                }
              />
              <CtaList
                values={content.parampara2025.ctas}
                onChange={(i, field, value) => {
                  const ctas = [...content.parampara2025.ctas];
                  ctas[i] = { ...ctas[i], [field]: value };
                  setContent({ ...content, parampara2025: { ...content.parampara2025, ctas } });
                }}
                onAdd={() =>
                  setContent({ ...content, parampara2025: { ...content.parampara2025, ctas: [...content.parampara2025.ctas, { label: "", href: "" }] } })
                }
                onRemove={(i) =>
                  setContent({
                    ...content,
                    parampara2025: { ...content.parampara2025, ctas: content.parampara2025.ctas.filter((_, idx) => idx !== i) },
                  })
                }
              />
            </Section>

            <Section title="Parampara 2026">
              <Field value={content.parampara2026.heading} label="Heading" onChange={(heading) => setContent({ ...content, parampara2026: { ...content.parampara2026, heading } })} />
              <Field value={content.parampara2026.subtitle} label="Subtitle" onChange={(subtitle) => setContent({ ...content, parampara2026: { ...content.parampara2026, subtitle } })} />
              <ImageUpload
                imageUrl={content.parampara2026.photoUrl}
                uploading={uploadingKey === "p2026"}
                onUpload={(file) =>
                  handleUpload("p2026", file, (prev, url) => ({
                    ...prev,
                    parampara2026: { ...prev.parampara2026, photoUrl: url },
                  }))
                }
                onClear={() => setContent({ ...content, parampara2026: { ...content.parampara2026, photoUrl: "" } })}
              />
              <ParagraphList
                values={content.parampara2026.paragraphs}
                onChange={(paragraphs) => setContent({ ...content, parampara2026: { ...content.parampara2026, paragraphs } })}
                onAdd={() =>
                  setContent({ ...content, parampara2026: { ...content.parampara2026, paragraphs: [...content.parampara2026.paragraphs, ""] } })
                }
                onRemove={(i) =>
                  setContent({
                    ...content,
                    parampara2026: {
                      ...content.parampara2026,
                      paragraphs: content.parampara2026.paragraphs.filter((_, idx) => idx !== i),
                    },
                  })
                }
              />
              {content.parampara2026.featured.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <div className="grid w-full gap-2 sm:grid-cols-2">
                    <input
                      className={inputClass}
                      value={item.title}
                      onChange={(e) => {
                        const featured = [...content.parampara2026.featured];
                        featured[i] = { ...featured[i], title: e.target.value };
                        setContent({ ...content, parampara2026: { ...content.parampara2026, featured } });
                      }}
                    />
                    <input
                      className={inputClass}
                      value={item.description}
                      onChange={(e) => {
                        const featured = [...content.parampara2026.featured];
                        featured[i] = { ...featured[i], description: e.target.value };
                        setContent({ ...content, parampara2026: { ...content.parampara2026, featured } });
                      }}
                    />
                  </div>
                  <RemoveButton
                    label="Remove featured artist"
                    onClick={() =>
                      setContent({
                        ...content,
                        parampara2026: {
                          ...content.parampara2026,
                          featured: content.parampara2026.featured.filter((_, idx) => idx !== i),
                        },
                      })
                    }
                  />
                </div>
              ))}
              <button
                type="button"
                className={addButtonClass}
                onClick={() =>
                  setContent({
                    ...content,
                    parampara2026: {
                      ...content.parampara2026,
                      featured: [...content.parampara2026.featured, { title: "", description: "" }],
                    },
                  })
                }
              >
                + Add featured artist
              </button>
              <ParagraphList
                values={content.parampara2026.programmeNotes}
                onChange={(programmeNotes) => setContent({ ...content, parampara2026: { ...content.parampara2026, programmeNotes } })}
                onAdd={() =>
                  setContent({
                    ...content,
                    parampara2026: { ...content.parampara2026, programmeNotes: [...content.parampara2026.programmeNotes, ""] },
                  })
                }
                onRemove={(i) =>
                  setContent({
                    ...content,
                    parampara2026: {
                      ...content.parampara2026,
                      programmeNotes: content.parampara2026.programmeNotes.filter((_, idx) => idx !== i),
                    },
                  })
                }
              />
            </Section>
          </>
        )}

        {tab === "artists" && (
          <>
            <Section title="Artists page">
              <Field value={content.artists.heading} label="Heading" onChange={(heading) => setContent({ ...content, artists: { ...content.artists, heading } })} />
              <Area value={content.artists.lead} label="Lead" onChange={(lead) => setContent({ ...content, artists: { ...content.artists, lead } })} />
              <ParagraphList
                values={content.artists.paragraphs}
                onChange={(paragraphs) => setContent({ ...content, artists: { ...content.artists, paragraphs } })}
                onAdd={() => setContent({ ...content, artists: { ...content.artists, paragraphs: [...content.artists.paragraphs, ""] } })}
                onRemove={(i) =>
                  setContent({ ...content, artists: { ...content.artists, paragraphs: content.artists.paragraphs.filter((_, idx) => idx !== i) } })
                }
              />
              <Field value={content.artists.passingHeading} label="Passing it forward heading" onChange={(passingHeading) => setContent({ ...content, artists: { ...content.artists, passingHeading } })} />
              <ParagraphList
                values={content.artists.passingParagraphs}
                onChange={(passingParagraphs) => setContent({ ...content, artists: { ...content.artists, passingParagraphs } })}
                onAdd={() =>
                  setContent({ ...content, artists: { ...content.artists, passingParagraphs: [...content.artists.passingParagraphs, ""] } })
                }
                onRemove={(i) =>
                  setContent({
                    ...content,
                    artists: { ...content.artists, passingParagraphs: content.artists.passingParagraphs.filter((_, idx) => idx !== i) },
                  })
                }
              />
            </Section>
            <Section title="Artist categories" description="Rename headings such as Emerging Artists, or add more groups for the Artists page.">
              {adminArtistCategories(content.artists).map((category, i) => (
                <div key={category.id || i} className="rounded-xl border border-parchment p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="grid w-full gap-3">
                      <Field
                        value={category.heading}
                        label="Category heading"
                        onChange={(heading) => {
                          const categories = [...adminArtistCategories(content.artists)];
                          categories[i] = { ...categories[i], heading };
                          setContent({ ...content, artists: { ...content.artists, categories } });
                        }}
                      />
                      <Area
                        value={category.intro}
                        label="Introduction"
                        onChange={(intro) => {
                          const categories = [...adminArtistCategories(content.artists)];
                          categories[i] = { ...categories[i], intro };
                          setContent({ ...content, artists: { ...content.artists, categories } });
                        }}
                      />
                    </div>
                    <RemoveButton
                      label="Remove category"
                      onClick={() =>
                        setContent({
                          ...content,
                          artists: {
                            ...content.artists,
                            categories: adminArtistCategories(content.artists).filter((_, idx) => idx !== i),
                          },
                        })
                      }
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                className={addButtonClass}
                onClick={() =>
                  setContent({
                    ...content,
                    artists: {
                      ...content.artists,
                      categories: [
                        ...adminArtistCategories(content.artists),
                        { id: `category-${Date.now()}`, heading: "New category", intro: "" },
                      ],
                    },
                  })
                }
              >
                + Add category
              </button>
            </Section>
            <Section title="Artist cards" description="Add or edit artists and assign each one to a category.">
              {content.artists.people.map((person, i) => (
                <ArtistEditor
                  key={i}
                  person={person}
                  categories={adminArtistCategories(content.artists)}
                  uploading={uploadingKey === `artist-${i}`}
                  onChange={(next) => {
                    const people = [...content.artists.people];
                    people[i] = next;
                    setContent({ ...content, artists: { ...content.artists, people } });
                  }}
                  onUpload={(file) =>
                    handleUpload(`artist-${i}`, file, (prev, url) => {
                      const people = [...prev.artists.people];
                      people[i] = { ...people[i], photoUrl: url };
                      return { ...prev, artists: { ...prev.artists, people } };
                    })
                  }
                  onRemove={() =>
                    setContent({
                      ...content,
                      artists: { ...content.artists, people: content.artists.people.filter((_, idx) => idx !== i) },
                    })
                  }
                />
              ))}
              <button
                type="button"
                className={addButtonClass}
                onClick={() =>
                  setContent({
                    ...content,
                    artists: {
                      ...content.artists,
                      people: [
                        ...content.artists.people,
                        { name: "", role: "", category: adminArtistCategories(content.artists)[0]?.id || "emerging", bio: "", photoUrl: "" },
                      ],
                    },
                  })
                }
              >
                + Add artist
              </button>
            </Section>
          </>
        )}

        {tab === "news" && (
          <>
            <Section title="What’s New">
              <Field value={content.news.heading} label="Heading" onChange={(heading) => setContent({ ...content, news: { ...content.news, heading } })} />
              <Area value={content.news.intro} label="Introduction" onChange={(intro) => setContent({ ...content, news: { ...content.news, intro } })} />
              <div>
                <label className={labelClass}>Categories</label>
                <div className="mt-1 grid gap-2 sm:grid-cols-2">
                  {content.news.categories.map((category, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        className={inputClass}
                        value={category}
                        onChange={(e) => {
                          const categories = [...content.news.categories];
                          categories[i] = e.target.value;
                          setContent({ ...content, news: { ...content.news, categories } });
                        }}
                      />
                      <RemoveButton
                        label="Remove category"
                        onClick={() =>
                          setContent({
                            ...content,
                            news: { ...content.news, categories: content.news.categories.filter((_, idx) => idx !== i) },
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className={`mt-3 ${addButtonClass}`}
                  onClick={() => setContent({ ...content, news: { ...content.news, categories: [...content.news.categories, ""] } })}
                >
                  + Add category
                </button>
              </div>
            </Section>
            <Section title="Articles" description="Each article appears as a card with a Read More button.">
              {content.news.articles.map((article, i) => (
                <div key={i} className="rounded-xl border border-parchment p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-serif text-lg text-burgundy">{article.title || "Untitled article"}</p>
                    <RemoveButton
                      label="Remove article"
                      onClick={() =>
                        setContent({
                          ...content,
                          news: { ...content.news, articles: content.news.articles.filter((_, idx) => idx !== i) },
                        })
                      }
                    />
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Title</label>
                      <input
                        className={`mt-1 ${inputClass}`}
                        value={article.title}
                        onChange={(e) => {
                          const articles = [...content.news.articles];
                          articles[i] = { ...articles[i], title: e.target.value };
                          setContent({ ...content, news: { ...content.news, articles } });
                        }}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>URL slug</label>
                      <input
                        className={`mt-1 ${inputClass}`}
                        value={article.slug}
                        onChange={(e) => {
                          const articles = [...content.news.articles];
                          articles[i] = { ...articles[i], slug: e.target.value };
                          setContent({ ...content, news: { ...content.news, articles } });
                        }}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Date (YYYY-MM-DD)</label>
                      <input
                        className={`mt-1 ${inputClass}`}
                        value={article.date}
                        onChange={(e) => {
                          const articles = [...content.news.articles];
                          articles[i] = { ...articles[i], date: e.target.value };
                          setContent({ ...content, news: { ...content.news, articles } });
                        }}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Category</label>
                      <input
                        className={`mt-1 ${inputClass}`}
                        value={article.category}
                        onChange={(e) => {
                          const articles = [...content.news.articles];
                          articles[i] = { ...articles[i], category: e.target.value };
                          setContent({ ...content, news: { ...content.news, articles } });
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className={labelClass}>Short introduction</label>
                    <textarea
                      rows={2}
                      className={`mt-1 ${inputClass}`}
                      value={article.excerpt}
                      onChange={(e) => {
                        const articles = [...content.news.articles];
                        articles[i] = { ...articles[i], excerpt: e.target.value };
                        setContent({ ...content, news: { ...content.news, articles } });
                      }}
                    />
                  </div>
                  <div className="mt-3">
                    <ImageUpload
                      imageUrl={article.photoUrl}
                      uploading={uploadingKey === `news-${i}`}
                      onUpload={(file) =>
                        handleUpload(`news-${i}`, file, (prev, url) => {
                          const articles = [...prev.news.articles];
                          articles[i] = { ...articles[i], photoUrl: url };
                          return { ...prev, news: { ...prev.news, articles } };
                        })
                      }
                      onClear={() => {
                        const articles = [...content.news.articles];
                        articles[i] = { ...articles[i], photoUrl: "" };
                        setContent({ ...content, news: { ...content.news, articles } });
                      }}
                    />
                  </div>
                  <ParagraphList
                    values={article.body}
                    onChange={(body) => {
                      const articles = [...content.news.articles];
                      articles[i] = { ...articles[i], body };
                      setContent({ ...content, news: { ...content.news, articles } });
                    }}
                    onAdd={() => {
                      const articles = [...content.news.articles];
                      articles[i] = { ...articles[i], body: [...articles[i].body, ""] };
                      setContent({ ...content, news: { ...content.news, articles } });
                    }}
                    onRemove={(paraIndex) => {
                      const articles = [...content.news.articles];
                      articles[i] = { ...articles[i], body: articles[i].body.filter((_, idx) => idx !== paraIndex) };
                      setContent({ ...content, news: { ...content.news, articles } });
                    }}
                  />
                </div>
              ))}
              <button
                type="button"
                className={addButtonClass}
                onClick={() =>
                  setContent({
                    ...content,
                    news: {
                      ...content.news,
                      articles: [
                        ...content.news.articles,
                        { title: "", slug: "", date: "", category: content.news.categories[0] || "Announcements", excerpt: "", body: [""], photoUrl: "" },
                      ],
                    },
                  })
                }
              >
                + Add article
              </button>
            </Section>
          </>
        )}

        {tab === "support" && (
          <>
          <Section title="Support Us">
            <Field value={content.support.heading} label="Heading" onChange={(heading) => setContent({ ...content, support: { ...content.support, heading } })} />
            <Area value={content.support.lead} label="Lead" onChange={(lead) => setContent({ ...content, support: { ...content.support, lead } })} />
            <ParagraphList
              values={content.support.paragraphs}
              onChange={(paragraphs) => setContent({ ...content, support: { ...content.support, paragraphs } })}
              onAdd={() => setContent({ ...content, support: { ...content.support, paragraphs: [...content.support.paragraphs, ""] } })}
              onRemove={(i) =>
                setContent({ ...content, support: { ...content.support, paragraphs: content.support.paragraphs.filter((_, idx) => idx !== i) } })
              }
            />
            <Field value={content.support.journeyHeading} label="Journey heading" onChange={(journeyHeading) => setContent({ ...content, support: { ...content.support, journeyHeading } })} />
            <ParagraphList
              values={content.support.journeyParagraphs}
              onChange={(journeyParagraphs) => setContent({ ...content, support: { ...content.support, journeyParagraphs } })}
              onAdd={() =>
                setContent({ ...content, support: { ...content.support, journeyParagraphs: [...content.support.journeyParagraphs, ""] } })
              }
              onRemove={(i) =>
                setContent({
                  ...content,
                  support: { ...content.support, journeyParagraphs: content.support.journeyParagraphs.filter((_, idx) => idx !== i) },
                })
              }
            />
            <Field value={content.support.legacyHeading} label="Legacy heading" onChange={(legacyHeading) => setContent({ ...content, support: { ...content.support, legacyHeading } })} />
            <ParagraphList
              values={content.support.legacyItems}
              onChange={(legacyItems) => setContent({ ...content, support: { ...content.support, legacyItems } })}
              onAdd={() => setContent({ ...content, support: { ...content.support, legacyItems: [...content.support.legacyItems, ""] } })}
              onRemove={(i) =>
                setContent({ ...content, support: { ...content.support, legacyItems: content.support.legacyItems.filter((_, idx) => idx !== i) } })
              }
            />
            <CtaList
              values={content.support.ctas}
              onChange={(i, field, value) => {
                const ctas = [...content.support.ctas];
                ctas[i] = { ...ctas[i], [field]: value };
                setContent({ ...content, support: { ...content.support, ctas } });
              }}
              onAdd={() => setContent({ ...content, support: { ...content.support, ctas: [...content.support.ctas, { label: "", href: "" }] } })}
              onRemove={(i) =>
                setContent({ ...content, support: { ...content.support, ctas: content.support.ctas.filter((_, idx) => idx !== i) } })
              }
            />
          </Section>
          <Section title="Pay it Forward" description="Video, photographs, copy and donate button on the Support page.">
            <Field
              value={content.support.payItForward?.heading || ""}
              label="Heading"
              onChange={(heading) =>
                setContent({
                  ...content,
                  support: {
                    ...content.support,
                    payItForward: { ...content.support.payItForward, heading },
                  },
                })
              }
            />
            <Field
              value={content.support.payItForward?.videoUrl || ""}
              label="Video URL (YouTube, Vimeo or MP4). Leave blank for the coming-soon placeholder."
              onChange={(videoUrl) =>
                setContent({
                  ...content,
                  support: {
                    ...content.support,
                    payItForward: { ...content.support.payItForward, videoUrl },
                  },
                })
              }
            />
            <div>
              <p className={labelClass}>Main photograph</p>
              <div className="mt-1">
                <ImageUpload
                  imageUrl={content.support.payItForward?.photoUrl || ""}
                  uploading={uploadingKey === "payItForward"}
                  onUpload={(file) =>
                    handleUpload("payItForward", file, (prev, url) => ({
                      ...prev,
                      support: {
                        ...prev.support,
                        payItForward: { ...prev.support.payItForward, photoUrl: url },
                      },
                    }))
                  }
                  onClear={() =>
                    setContent({
                      ...content,
                      support: {
                        ...content.support,
                        payItForward: { ...content.support.payItForward, photoUrl: "" },
                      },
                    })
                  }
                />
              </div>
            </div>
            <div>
              <p className={labelClass}>Additional photographs</p>
              <div className="mt-2 space-y-3">
                {(content.support.payItForward?.photoUrls || []).map((imageUrl, i) => (
                  <div key={`${imageUrl}-${i}`} className="flex items-center gap-2">
                    <ImageUpload
                      imageUrl={imageUrl}
                      uploading={uploadingKey === `payItForwardExtra-${i}`}
                      onUpload={(file) =>
                        handleUpload(`payItForwardExtra-${i}`, file, (prev, url) => {
                          const photoUrls = [...(prev.support.payItForward.photoUrls || [])];
                          photoUrls[i] = url;
                          return {
                            ...prev,
                            support: {
                              ...prev.support,
                              payItForward: { ...prev.support.payItForward, photoUrls },
                            },
                          };
                        })
                      }
                      onClear={() => {
                        const photoUrls = (content.support.payItForward.photoUrls || []).filter((_, idx) => idx !== i);
                        setContent({
                          ...content,
                          support: {
                            ...content.support,
                            payItForward: { ...content.support.payItForward, photoUrls },
                          },
                        });
                      }}
                      clearLabel="Remove photo"
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                className={`mt-3 ${addButtonClass}`}
                onClick={() =>
                  setContent({
                    ...content,
                    support: {
                      ...content.support,
                      payItForward: {
                        ...content.support.payItForward,
                        photoUrls: [...(content.support.payItForward.photoUrls || []), ""],
                      },
                    },
                  })
                }
              >
                + Add photo
              </button>
            </div>
            <ParagraphList
              values={content.support.payItForward?.paragraphs || []}
              onChange={(paragraphs) =>
                setContent({
                  ...content,
                  support: {
                    ...content.support,
                    payItForward: { ...content.support.payItForward, paragraphs },
                  },
                })
              }
              onAdd={() =>
                setContent({
                  ...content,
                  support: {
                    ...content.support,
                    payItForward: {
                      ...content.support.payItForward,
                      paragraphs: [...(content.support.payItForward?.paragraphs || []), ""],
                    },
                  },
                })
              }
              onRemove={(i) =>
                setContent({
                  ...content,
                  support: {
                    ...content.support,
                    payItForward: {
                      ...content.support.payItForward,
                      paragraphs: (content.support.payItForward?.paragraphs || []).filter((_, idx) => idx !== i),
                    },
                  },
                })
              }
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                value={content.support.payItForward?.cta.label || ""}
                label="Button label"
                onChange={(label) =>
                  setContent({
                    ...content,
                    support: {
                      ...content.support,
                      payItForward: {
                        ...content.support.payItForward,
                        cta: { ...content.support.payItForward.cta, label },
                      },
                    },
                  })
                }
              />
              <Field
                value={content.support.payItForward?.cta.href || ""}
                label="Button link (donate URL or /contact)"
                onChange={(href) =>
                  setContent({
                    ...content,
                    support: {
                      ...content.support,
                      payItForward: {
                        ...content.support.payItForward,
                        cta: { ...content.support.payItForward.cta, href },
                      },
                    },
                  })
                }
              />
            </div>
          </Section>
          </>
        )}

        {tab === "contact" && (
          <Section title="Contact">
            <Field value={content.contact.heading} label="Heading" onChange={(heading) => setContent({ ...content, contact: { ...content.contact, heading } })} />
            <Area value={content.contact.intro} label="Introduction" onChange={(intro) => setContent({ ...content, contact: { ...content.contact, intro } })} />
            <Field value={content.contact.organisation} label="Organisation" onChange={(organisation) => setContent({ ...content, contact: { ...content.contact, organisation } })} />
            <div>
              <label className={labelClass}>Contact emails</label>
              <p className="mt-1 text-xs text-ink/60">Form submissions are sent to every address listed here.</p>
              <div className="mt-2 space-y-2">
                {(content.contact.emails || [content.contact.email]).map((address, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      className={inputClass}
                      value={address}
                      onChange={(e) => {
                        const emails = [...(content.contact.emails || [content.contact.email])];
                        emails[i] = e.target.value;
                        setContent({
                          ...content,
                          contact: { ...content.contact, emails, email: emails[0] || "" },
                        });
                      }}
                    />
                    <RemoveButton
                      label="Remove email"
                      onClick={() => {
                        const emails = (content.contact.emails || [content.contact.email]).filter((_, idx) => idx !== i);
                        setContent({
                          ...content,
                          contact: { ...content.contact, emails, email: emails[0] || "" },
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                className={`mt-3 ${addButtonClass}`}
                onClick={() => {
                  const emails = [...(content.contact.emails || [content.contact.email]), ""];
                  setContent({ ...content, contact: { ...content.contact, emails, email: emails[0] || "" } });
                }}
              >
                + Add email
              </button>
            </div>
            <div>
              <label className={labelClass}>Address lines</label>
              <div className="mt-1 space-y-2">
                {content.contact.addressLines.map((line, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      className={inputClass}
                      value={line}
                      onChange={(e) => {
                        const addressLines = [...content.contact.addressLines];
                        addressLines[i] = e.target.value;
                        setContent({ ...content, contact: { ...content.contact, addressLines } });
                      }}
                    />
                    <RemoveButton
                      label="Remove line"
                      onClick={() =>
                        setContent({
                          ...content,
                          contact: { ...content.contact, addressLines: content.contact.addressLines.filter((_, idx) => idx !== i) },
                        })
                      }
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                className={`mt-3 ${addButtonClass}`}
                onClick={() =>
                  setContent({ ...content, contact: { ...content.contact, addressLines: [...content.contact.addressLines, ""] } })
                }
              >
                + Add address line
              </button>
            </div>
            <div>
              <label className={labelClass}>Enquiry categories</label>
              <div className="mt-1 space-y-2">
                {content.contact.enquiryCategories.map((category, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      className={inputClass}
                      value={category}
                      onChange={(e) => {
                        const enquiryCategories = [...content.contact.enquiryCategories];
                        enquiryCategories[i] = e.target.value;
                        setContent({ ...content, contact: { ...content.contact, enquiryCategories } });
                      }}
                    />
                    <RemoveButton
                      label="Remove category"
                      onClick={() =>
                        setContent({
                          ...content,
                          contact: {
                            ...content.contact,
                            enquiryCategories: content.contact.enquiryCategories.filter((_, idx) => idx !== i),
                          },
                        })
                      }
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                className={`mt-3 ${addButtonClass}`}
                onClick={() =>
                  setContent({
                    ...content,
                    contact: { ...content.contact, enquiryCategories: [...content.contact.enquiryCategories, ""] },
                  })
                }
              >
                + Add category
              </button>
            </div>
            <Field value={content.contact.instagram} label="Instagram URL" onChange={(instagram) => setContent({ ...content, contact: { ...content.contact, instagram } })} />
            <Field value={content.contact.facebook} label="Facebook URL" onChange={(facebook) => setContent({ ...content, contact: { ...content.contact, facebook } })} />
          </Section>
        )}

        <button type="button" className={addButtonClass} onClick={() => setContent(DEFAULT_CONTENT)}>
          Reset all fields to defaults
        </button>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-parchment bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          {status ? (
            <p className={`text-sm ${status.type === "ok" ? "text-burgundy" : "text-red-600"}`}>{status.message}</p>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-burgundy px-6 py-2.5 text-sm font-semibold text-ivory transition hover:bg-deep-burgundy disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </main>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input className={`mt-1 ${inputClass}`} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Area({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <textarea rows={3} className={`mt-1 ${inputClass}`} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function LearnSection({
  title,
  heading,
  lead,
  paragraphs,
  photoUrl,
  uploading,
  onHeading,
  onLead,
  onParagraphs,
  onPhoto,
  onClearPhoto,
}: {
  title: string;
  heading: string;
  lead: string;
  paragraphs: string[];
  photoUrl?: string;
  uploading?: boolean;
  onHeading: (value: string) => void;
  onLead: (value: string) => void;
  onParagraphs: (value: string[]) => void;
  onPhoto?: (file: File) => void;
  onClearPhoto?: () => void;
}) {
  return (
    <Section title={title}>
      <Field value={heading} label="Heading" onChange={onHeading} />
      <Area value={lead} label="Lead" onChange={onLead} />
      {onPhoto && (
        <ImageUpload
          imageUrl={photoUrl || ""}
          uploading={!!uploading}
          onUpload={onPhoto}
          onClear={onClearPhoto}
        />
      )}
      <ParagraphList
        values={paragraphs}
        onChange={onParagraphs}
        onAdd={() => onParagraphs([...paragraphs, ""])}
        onRemove={(i) => onParagraphs(paragraphs.filter((_, idx) => idx !== i))}
      />
    </Section>
  );
}

function TeamEditor({
  member,
  uploading,
  onChange,
  onUpload,
  onRemove,
}: {
  member: TeamMember;
  uploading: boolean;
  onChange: (member: TeamMember) => void;
  onUpload: (file: File) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-xl border border-parchment p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="grid w-full gap-3 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Name</label>
            <input className={`mt-1 ${inputClass}`} value={member.name} onChange={(e) => onChange({ ...member, name: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>Role</label>
            <input className={`mt-1 ${inputClass}`} value={member.role} onChange={(e) => onChange({ ...member, role: e.target.value })} />
          </div>
        </div>
        <RemoveButton label="Remove team member" onClick={onRemove} />
      </div>
      <div className="mt-3">
        <ImageUpload
          imageUrl={member.photoUrl}
          uploading={uploading}
          onUpload={onUpload}
          onClear={() => onChange({ ...member, photoUrl: "" })}
        />
      </div>
      <div className="mt-3">
        <label className={labelClass}>Biography</label>
        <textarea rows={3} className={`mt-1 ${inputClass}`} value={member.bio} onChange={(e) => onChange({ ...member, bio: e.target.value })} />
      </div>
    </div>
  );
}

function adminArtistCategories(artists: SiteContent["artists"]): ArtistCategory[] {
  if (artists.categories?.length) return artists.categories;
  return [
    { id: "master", heading: artists.mastersHeading, intro: artists.mastersIntro },
    { id: "emerging", heading: artists.emergingHeading, intro: artists.emergingIntro },
  ];
}

function ArtistEditor({
  person,
  categories,
  uploading,
  onChange,
  onUpload,
  onRemove,
}: {
  person: Artist;
  categories: ArtistCategory[];
  uploading: boolean;
  onChange: (person: Artist) => void;
  onUpload: (file: File) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-xl border border-parchment p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="grid w-full gap-3 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Name</label>
            <input className={`mt-1 ${inputClass}`} value={person.name} onChange={(e) => onChange({ ...person, name: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>Role</label>
            <input className={`mt-1 ${inputClass}`} value={person.role} onChange={(e) => onChange({ ...person, role: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <select
              className={`mt-1 ${inputClass}`}
              value={person.category}
              onChange={(e) => onChange({ ...person, category: e.target.value })}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.heading}
                </option>
              ))}
            </select>
          </div>
        </div>
        <RemoveButton label="Remove artist" onClick={onRemove} />
      </div>
      <div className="mt-3">
        <ImageUpload
          imageUrl={person.photoUrl}
          uploading={uploading}
          onUpload={onUpload}
          onClear={() => onChange({ ...person, photoUrl: "" })}
        />
      </div>
      <div className="mt-3">
        <label className={labelClass}>Biography</label>
        <textarea rows={3} className={`mt-1 ${inputClass}`} value={person.bio} onChange={(e) => onChange({ ...person, bio: e.target.value })} />
      </div>
    </div>
  );
}
