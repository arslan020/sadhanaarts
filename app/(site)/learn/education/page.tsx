import type { Metadata } from "next";
import CtaRow from "@/components/CtaRow";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/store";

export const revalidate = 0;
export const metadata: Metadata = { title: "Education & Schools" };

export default async function EducationPage() {
  const { education } = await getContent();

  return (
    <main>
      <PageHero eyebrow="Learn" title={education.heading} lead={education.lead} />
      <section className="bg-warm-white">
        <div className="mx-auto max-w-3xl space-y-5 px-6 py-20">
          {education.paragraphs.map((para, i) => (
            <Reveal key={i} delayMs={i * 70}>
              <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{para}</p>
            </Reveal>
          ))}
          <Reveal delayMs={200} className="pt-6">
            <CtaRow
              ctas={[
                { label: "Talk to Us", href: "/contact" },
                { label: "Support Education", href: "/support" },
              ]}
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
