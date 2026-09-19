import type { Metadata } from "next";
import ContentImage from "@/components/ContentImage";
import CtaRow from "@/components/CtaRow";
import PageHero from "@/components/PageHero";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/store";

export const revalidate = 0;
export const metadata: Metadata = { title: "Parampara" };

export default async function ParamparaPage() {
  const { parampara } = await getContent();

  return (
    <main>
      <PageHero eyebrow="Parampara" title={parampara.heading} lead={parampara.lead} imageUrl={parampara.photoUrl} />
      <section className="bg-warm-white">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 py-20 lg:grid-cols-[3fr_2fr]">
          <div className="space-y-5">
            {parampara.paragraphs.map((para, i) => (
              <Reveal key={i} delayMs={i * 50}>
                <p
                  className={
                    para.trim() === "It is continuity."
                      ? "font-serif text-2xl text-burgundy"
                      : "text-base leading-relaxed text-ink/80 sm:text-lg"
                  }
                >
                  {para}
                </p>
              </Reveal>
            ))}
            <Reveal delayMs={200} className="pt-6">
              <CtaRow ctas={parampara.ctas} />
            </Reveal>
          </div>
          <Reveal delayMs={150}>
            {parampara.photoUrl ? (
              <ContentImage src={parampara.photoUrl} className="w-full rounded-2xl object-cover ring-1 ring-gold/30" />
            ) : (
              <PhotoPlaceholder label="Parampara photography coming soon" />
            )}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
