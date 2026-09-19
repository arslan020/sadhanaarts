import type { Metadata } from "next";
import ContentImage from "@/components/ContentImage";
import CtaRow from "@/components/CtaRow";
import Ornament from "@/components/Ornament";
import PageHero from "@/components/PageHero";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/store";

export const revalidate = 0;
export const metadata: Metadata = { title: "Workshops & Shibirs" };

export default async function WorkshopsPage() {
  const { workshops } = await getContent();

  return (
    <main>
      <PageHero
        eyebrow="Workshops & Shibirs"
        title={workshops.heading}
        lead={workshops.lead}
        imageUrl={workshops.photoUrl}
      />

      <section className="bg-warm-white">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 py-20 lg:grid-cols-[3fr_2fr]">
          <div className="space-y-5">
            {workshops.paragraphs.map((para, i) => (
              <Reveal key={i} delayMs={i * 70}>
                <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{para}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delayMs={150}>
            {workshops.photoUrl ? (
              <ContentImage src={workshops.photoUrl} className="w-full rounded-2xl object-cover ring-1 ring-gold/30" />
            ) : (
              <PhotoPlaceholder label="Workshop photography coming soon" />
            )}
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold text-deep-burgundy">{workshops.shibirHeading}</h2>
            <div className="mt-5">
              <Ornament />
            </div>
          </Reveal>
          <div className="mt-8 space-y-4">
            {workshops.shibirParagraphs.map((para, i) => (
              <Reveal key={i} delayMs={i * 70}>
                <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-white">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold text-deep-burgundy">{workshops.beyondHeading}</h2>
            <div className="mt-5 flex justify-center">
              <Ornament />
            </div>
          </Reveal>
          <div className="mt-8 space-y-4">
            {workshops.beyondParagraphs.map((para, i) => (
              <Reveal key={i}>
                <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{para}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <CtaRow ctas={workshops.ctas} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
