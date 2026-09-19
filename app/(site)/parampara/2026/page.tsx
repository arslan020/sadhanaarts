import type { Metadata } from "next";
import ContentImage from "@/components/ContentImage";
import CtaRow from "@/components/CtaRow";
import Ornament from "@/components/Ornament";
import PageHero from "@/components/PageHero";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/store";

export const revalidate = 0;
export const metadata: Metadata = { title: "Parampara 2026" };

export default async function Parampara2026Page() {
  const { parampara2026 } = await getContent();

  return (
    <main>
      <PageHero
        eyebrow="Parampara 2026"
        title={parampara2026.heading}
        lead={parampara2026.subtitle}
        imageUrl={parampara2026.photoUrl}
      />
      <section className="bg-warm-white">
        <div className="mx-auto max-w-3xl space-y-5 px-6 py-20">
          {parampara2026.paragraphs.map((para, i) => (
            <Reveal key={i} delayMs={i * 60}>
              <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{para}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal className="text-center">
            <h2 className="font-serif text-3xl font-semibold text-deep-burgundy">Meet the Artists</h2>
            <div className="mt-5 flex justify-center">
              <Ornament />
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {parampara2026.featured.map((item, i) => (
              <Reveal key={item.title} delayMs={(i % 2) * 80}>
                <article className="h-full rounded-2xl bg-warm-white p-7 ring-1 ring-parchment">
                  <h3 className="font-serif text-2xl text-burgundy">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/75 sm:text-base">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
          {parampara2026.programmeNotes.length > 0 && (
            <div className="mx-auto mt-12 max-w-3xl space-y-3 text-center">
              {parampara2026.programmeNotes.map((note, i) => (
                <p key={i} className="text-sm italic text-ink/60">
                  {note}
                </p>
              ))}
            </div>
          )}
          <Reveal className="mt-12">
            {parampara2026.photoUrl ? (
              <ContentImage src={parampara2026.photoUrl} className="mx-auto w-full max-w-3xl rounded-2xl object-cover" />
            ) : (
              <div className="mx-auto max-w-3xl">
                <PhotoPlaceholder label="Gallery photography coming soon" />
              </div>
            )}
          </Reveal>
          <Reveal className="mt-10">
            <CtaRow ctas={parampara2026.ctas.filter((cta) => cta.href !== "/parampara/2026")} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
