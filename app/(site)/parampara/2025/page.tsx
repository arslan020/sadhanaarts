import type { Metadata } from "next";
import ContentImage from "@/components/ContentImage";
import CtaRow from "@/components/CtaRow";
import Ornament from "@/components/Ornament";
import PageHero from "@/components/PageHero";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/store";

export const revalidate = 0;
export const metadata: Metadata = { title: "Parampara 2025" };

export default async function Parampara2025Page() {
  const { parampara2025 } = await getContent();

  return (
    <main>
      <PageHero
        eyebrow="Parampara 2025"
        title={parampara2025.heading}
        lead={parampara2025.subtitle}
        imageUrl={parampara2025.photoUrl}
      />
      <section className="bg-warm-white">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 py-20 lg:grid-cols-[3fr_2fr]">
          <div className="space-y-5">
            {parampara2025.paragraphs.map((para, i) => (
              <Reveal key={i} delayMs={i * 70}>
                <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{para}</p>
              </Reveal>
            ))}
            {(parampara2025.lineup || parampara2025.venue) && (
              <Reveal className="rounded-2xl bg-ivory p-6 ring-1 ring-parchment">
                {parampara2025.venue && (
                  <p className="text-sm">
                    <span className="font-semibold text-burgundy">Venue: </span>
                    {parampara2025.venue}
                  </p>
                )}
                {parampara2025.lineup && (
                  <p className="mt-2 text-sm leading-relaxed">
                    <span className="font-semibold text-burgundy">Line-up: </span>
                    {parampara2025.lineup}
                  </p>
                )}
              </Reveal>
            )}
          </div>
          <Reveal>
            {parampara2025.photoUrl ? (
              <ContentImage src={parampara2025.photoUrl} className="w-full rounded-2xl object-cover ring-1 ring-gold/30" />
            ) : (
              <PhotoPlaceholder label="Gallery photography coming soon" />
            )}
          </Reveal>
        </div>
      </section>
      <section className="bg-ivory">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold text-deep-burgundy">{parampara2025.legacyHeading}</h2>
            <div className="mt-5 flex justify-center">
              <Ornament />
            </div>
          </Reveal>
          <div className="mt-8 space-y-4">
            {parampara2025.legacyParagraphs.map((para, i) => (
              <Reveal key={i}>
                <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{para}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <CtaRow ctas={parampara2025.ctas} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
