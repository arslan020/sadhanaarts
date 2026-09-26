import type { Metadata } from "next";
import ContentImage from "@/components/ContentImage";
import CtaRow from "@/components/CtaRow";
import Ornament from "@/components/Ornament";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { artistCategories } from "@/lib/content";
import { getContent } from "@/lib/store";

export const revalidate = 0;
export const metadata: Metadata = { title: "Artists" };

export default async function ArtistsPage() {
  const { artists } = await getContent();
  const groups = artistCategories(artists);

  return (
    <main>
      <PageHero eyebrow="Artists" title={artists.heading} lead={artists.lead} />
      <section className="bg-warm-white">
        <div className="mx-auto max-w-3xl space-y-5 px-6 py-16">
          {artists.paragraphs.map((para, i) => (
            <Reveal key={i}>
              <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{para}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {groups.map((group, i) => {
        const people = artists.people.filter((person) => person.category === group.id);
        if (!people.length) return null;
        return (
          <ArtistGroup
            key={group.id}
            heading={group.heading}
            intro={group.intro}
            people={people}
            tone={i % 2 === 0 ? "warm" : "ivory"}
          />
        );
      })}

      <section className="bg-warm-white">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold text-deep-burgundy">{artists.passingHeading}</h2>
            <div className="mt-5 flex justify-center">
              <Ornament />
            </div>
          </Reveal>
          <div className="mt-8 space-y-4">
            {artists.passingParagraphs.map((para, i) => (
              <Reveal key={i}>
                <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{para}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <CtaRow
              ctas={[
                { label: "Explore Parampara", href: "/parampara" },
                { label: "View What’s New", href: "/news" },
              ]}
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function ArtistGroup({
  heading,
  intro,
  people,
  tone = "warm",
}: {
  heading: string;
  intro: string;
  people: { name: string; role: string; bio: string; photoUrl: string }[];
  tone?: "warm" | "ivory";
}) {
  return (
    <section className={tone === "ivory" ? "bg-ivory" : "bg-parchment/60"}>
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="max-w-3xl">
          <h2 className="font-serif text-3xl font-semibold text-deep-burgundy">{heading}</h2>
          <p className="mt-4 text-ink/75">{intro}</p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {people.map((person, i) => (
            <Reveal key={person.name} delayMs={(i % 3) * 80}>
              <article className="h-full overflow-hidden rounded-2xl bg-warm-white shadow-sm ring-1 ring-parchment">
                {person.photoUrl ? (
                  <ContentImage src={person.photoUrl} alt={person.name} className="aspect-[4/3] w-full object-cover" />
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center bg-parchment text-burgundy/40">
                    <span className="font-serif text-4xl">{person.name.slice(0, 1)}</span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-burgundy">{person.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gold">{person.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/75">{person.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
