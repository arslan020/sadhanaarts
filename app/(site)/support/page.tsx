import type { Metadata } from "next";
import CtaRow from "@/components/CtaRow";
import ContentImage from "@/components/ContentImage";
import Ornament from "@/components/Ornament";
import PageHero from "@/components/PageHero";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import Reveal from "@/components/Reveal";
import VideoEmbed from "@/components/VideoEmbed";
import VideoPlaceholder from "@/components/VideoPlaceholder";
import { donateHref, payItForwardPhotos } from "@/lib/content";
import { getContent } from "@/lib/store";

export const revalidate = 0;
export const metadata: Metadata = { title: "Support Us" };

export default async function SupportPage() {
  const { support } = await getContent();
  const payItForward = support.payItForward;
  const photos = payItForwardPhotos(payItForward);
  const videoUrl = payItForward?.videoUrl?.trim() || "";

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
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h2 className="font-serif text-3xl font-semibold text-deep-burgundy sm:text-4xl">
                {payItForward?.heading || "Pay it Forward"}
              </h2>
              <div className="mt-5">
                <Ornament />
              </div>
            </Reveal>
            {(payItForward?.paragraphs || [])[0] && (
              <Reveal className="mt-8">
                <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{(payItForward?.paragraphs || [])[0]}</p>
              </Reveal>
            )}
          </div>

          <Reveal className="mt-10">
            {videoUrl ? (
              <VideoEmbed url={videoUrl} title={payItForward?.heading || "Pay it Forward"} className="mx-auto max-w-4xl" />
            ) : (
              <VideoPlaceholder label="Pay it Forward video coming soon" className="mx-auto max-w-4xl" />
            )}
          </Reveal>

          <div className="mx-auto mt-10 max-w-3xl">
            <div className="space-y-4">
              {(payItForward?.paragraphs || []).slice(1).map((para, i) => (
                <Reveal key={i}>
                  <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{para}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {photos.length > 0 ? (
            <div className={`mx-auto mt-12 grid max-w-4xl gap-4 ${photos.length === 1 ? "" : "sm:grid-cols-2"}`}>
              {photos.map((src) => (
                <ContentImage
                  key={src}
                  src={src}
                  alt=""
                  className="aspect-[16/10] w-full rounded-2xl object-cover shadow-sm ring-1 ring-gold/30"
                />
              ))}
            </div>
          ) : (
            <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
              <PhotoPlaceholder label="Pay it Forward photograph" />
              <PhotoPlaceholder label="Additional photograph" />
            </div>
          )}

          {payItForward?.cta?.label && (
            <Reveal className="mt-12">
              <CtaRow
                size="lg"
                ctas={[
                  {
                    ...payItForward.cta,
                    href: donateHref(payItForward.cta.href),
                  },
                ]}
              />
            </Reveal>
          )}
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
