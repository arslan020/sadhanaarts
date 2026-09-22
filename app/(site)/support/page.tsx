import type { Metadata } from "next";
import CtaRow from "@/components/CtaRow";
import ContentImage from "@/components/ContentImage";
import Ornament from "@/components/Ornament";
import PageHero from "@/components/PageHero";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/store";

export const revalidate = 0;
export const metadata: Metadata = { title: "Support Us" };

export default async function SupportPage() {
  const { support } = await getContent();

  return (
    <main>
      <PageHero eyebrow="Support Us" title={support.heading} lead={support.lead} />
      <section className="bg-warm-white">
        <div className="mx-auto max-w-3xl space-y-5 px-6 py-20">
          {support.paragraphs.map((para, i) => (
            <Reveal key={i}>
              <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{para}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-ivory">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold text-deep-burgundy">{support.journeyHeading}</h2>
            <div className="mt-5">
              <Ornament />
            </div>
          </Reveal>
          <div className="mt-8 space-y-4">
            {support.journeyParagraphs.map((para, i) => (
              <Reveal key={i}>
                <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-warm-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            {support.payItForward?.photoUrl ? (
              <ContentImage
                src={support.payItForward.photoUrl}
                alt=""
                className="w-full rounded-2xl object-cover shadow-sm ring-1 ring-gold/30"
              />
            ) : (
              <PhotoPlaceholder label="Pay it Forward photograph coming soon" />
            )}
          </div>
          <div>
            <Reveal>
              <h2 className="font-serif text-3xl font-semibold text-deep-burgundy sm:text-4xl">
                {support.payItForward?.heading || "Pay it Forward"}
              </h2>
              <div className="mt-5">
                <Ornament />
              </div>
            </Reveal>
            <div className="mt-8 space-y-4">
              {(support.payItForward?.paragraphs || []).map((para, i) => (
                <Reveal key={i}>
                  <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{para}</p>
                </Reveal>
              ))}
            </div>
            {support.payItForward?.cta?.label && (
              <Reveal className="mt-8">
                <CtaRow
                  ctas={[
                    {
                      ...support.payItForward.cta,
                      href:
                        support.payItForward.cta.href === "/contact"
                          ? "/contact?type=Donate"
                          : support.payItForward.cta.href,
                    },
                  ]}
                />
              </Reveal>
            )}
          </div>
        </div>
      </section>
      <section className="bg-deep-burgundy">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold text-ivory sm:text-4xl">{support.legacyHeading}</h2>
          </Reveal>
          <ul className="mt-10 space-y-4">
            {support.legacyItems.map((item, i) => (
              <Reveal key={i} delayMs={i * 60}>
                <li className="font-serif text-xl text-soft-gold sm:text-2xl">{item}</li>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-12">
            <CtaRow ctas={support.ctas} inverted />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
