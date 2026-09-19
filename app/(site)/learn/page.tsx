import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/store";

export const revalidate = 0;
export const metadata: Metadata = { title: "Learn" };

export default async function LearnPage() {
  const { workshops, masterclasses, education } = await getContent();

  const cards = [
    { href: "/learn/workshops", title: workshops.heading, text: workshops.lead, label: "Workshops & Shibirs" },
    { href: "/learn/masterclasses", title: masterclasses.heading, text: masterclasses.lead, label: "Masterclasses" },
    { href: "/learn/education", title: education.heading, text: education.lead, label: "Education & Schools" },
  ];

  return (
    <main>
      <PageHero
        eyebrow="Learn"
        title="Learn. Experience. Perform. Preserve."
        lead="Through Shibirs, workshops, masterclasses, education and live performance, we create opportunities to experience Indian classical music directly from those who have dedicated their lives to it."
      />
      <section className="bg-warm-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-20 lg:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.href} delayMs={i * 100}>
              <Link
                href={card.href}
                className="flex h-full flex-col rounded-2xl bg-ivory p-7 ring-1 ring-parchment transition hover:-translate-y-1 hover:shadow-md hover:ring-gold/50"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">{card.label}</p>
                <h2 className="mt-3 font-serif text-2xl text-deep-burgundy">{card.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/75">{card.text}</p>
                <span className="mt-6 text-sm font-semibold text-burgundy">Explore →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
