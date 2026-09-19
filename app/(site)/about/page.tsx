import type { Metadata } from "next";
import CtaRow from "@/components/CtaRow";
import Ornament from "@/components/Ornament";
import PageHero from "@/components/PageHero";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/store";

export const revalidate = 0;
export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const { about } = await getContent();

  return (
    <main>
      <PageHero eyebrow="About Us" title={about.heading} lead={about.lead} imageUrl={about.photoUrl} />

      <section className="bg-warm-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[2fr_3fr]">
          <Reveal>
            {about.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={about.photoUrl} alt="" className="w-full rounded-2xl object-cover shadow-sm ring-1 ring-gold/30" />
            ) : (
              <PhotoPlaceholder label="About photograph coming soon" />
            )}
          </Reveal>
          <div className="space-y-5">
            {about.paragraphs.map((para, i) => (
              <Reveal key={i} delayMs={i * 80}>
                <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal className="text-center">
            <h2 className="font-serif text-3xl font-semibold text-deep-burgundy sm:text-4xl">{about.whatWeDoHeading}</h2>
            <div className="mt-5 flex justify-center">
              <Ornament />
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-ink/75">{about.whatWeDoIntro}</p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {about.areas.map((area, i) => (
              <Reveal key={area.title} delayMs={(i % 2) * 100}>
                <article className="h-full rounded-2xl bg-warm-white p-7 shadow-sm ring-1 ring-parchment">
                  <h3 className="font-serif text-2xl text-burgundy">{area.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/75 sm:text-base">{area.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-white">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold text-deep-burgundy sm:text-4xl">{about.whyHeading}</h2>
            <div className="mt-5">
              <Ornament />
            </div>
          </Reveal>
          <div className="mt-8 space-y-5">
            {about.whyParagraphs.map((para, i) => (
              <Reveal key={i} delayMs={i * 60}>
                <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{para}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delayMs={200} className="mt-10">
            <CtaRow
              ctas={[
                { label: "Explore Parampara", href: "/parampara" },
                { label: "Meet the Artists", href: "/artists" },
              ]}
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
