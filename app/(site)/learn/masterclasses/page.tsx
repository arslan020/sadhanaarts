import type { Metadata } from "next";
import CtaRow from "@/components/CtaRow";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/store";

export const revalidate = 0;
export const metadata: Metadata = { title: "Masterclasses" };

export default async function MasterclassesPage() {
  const { masterclasses } = await getContent();

  return (
    <main>
      <PageHero eyebrow="Learn" title={masterclasses.heading} lead={masterclasses.lead} />
      <section className="bg-warm-white">
        <div className="mx-auto max-w-3xl space-y-5 px-6 py-20">
          {masterclasses.paragraphs.map((para, i) => (
            <Reveal key={i} delayMs={i * 70}>
              <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{para}</p>
            </Reveal>
          ))}
          <Reveal delayMs={200} className="pt-6">
            <CtaRow
              ctas={[
                { label: "View Upcoming Workshops", href: "/news" },
                { label: "Register Your Interest", href: "/contact" },
              ]}
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
