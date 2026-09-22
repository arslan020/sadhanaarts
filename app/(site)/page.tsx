import type { Metadata } from "next";
import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import CtaRow from "@/components/CtaRow";
import Ornament from "@/components/Ornament";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/store";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage() {
  const { home, site } = await getContent();

  return (
    <main>
      <section className="relative overflow-hidden bg-deep-burgundy">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(201,162,39,0.28), transparent 42%), radial-gradient(circle at 85% 80%, rgba(107,33,52,0.4), transparent 50%)",
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-16 text-center sm:py-24">
          <Reveal className="flex w-full flex-col items-center">
            <div className="w-full max-w-3xl">
              {home.heroImage ? (
                <ContentImage
                  src={home.heroImage}
                  alt=""
                  className="aspect-[16/9] w-full rounded-2xl object-cover shadow-lg ring-1 ring-gold/40"
                />
              ) : (
                <PhotoPlaceholder
                  label="Feature photograph coming soon"
                  className="aspect-[16/9] bg-ivory/10 text-ivory/70 ring-ivory/20"
                />
              )}
            </div>
            <p className="mt-10 font-serif text-5xl font-semibold uppercase leading-none tracking-[0.08em] text-ivory sm:text-7xl lg:text-8xl">
              {site.name}
            </p>
            <div className="mt-7 flex justify-center">
              <Ornament />
            </div>
            <h1 className="mt-7 max-w-3xl font-serif text-2xl font-semibold leading-tight text-soft-gold sm:text-4xl">
              {home.heading}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ivory/85 sm:text-xl">{home.lead}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-warm-white">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <div className="space-y-5">
            {home.paragraphs.map((para, i) => (
              <Reveal key={i} delayMs={i * 80}>
                <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold text-deep-burgundy sm:text-4xl">{home.closingHeading}</h2>
            <div className="mt-5 flex justify-center">
              <Ornament />
            </div>
          </Reveal>
          <div className="mt-8 space-y-4">
            {home.closingParagraphs.map((para, i) => (
              <Reveal key={i} delayMs={100 + i * 80}>
                <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{para}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delayMs={300} className="mt-10">
            <CtaRow ctas={home.ctas} />
          </Reveal>
        </div>
      </section>

      <section className="bg-burgundy">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:grid-cols-3">
          {[
            { href: "/learn", title: "Learn", text: "Workshops, Shibirs, masterclasses and education." },
            { href: "/parampara", title: "Parampara", text: "Keeping the chain of knowledge alive." },
            { href: "/support", title: "Support", text: "Help carry the tradition forward." },
          ].map((item, i) => (
            <Reveal key={item.href} delayMs={i * 100}>
              <Link
                href={item.href}
                className="block rounded-2xl border border-ivory/15 p-6 text-ivory transition hover:border-gold hover:bg-deep-burgundy"
              >
                <h3 className="font-serif text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm text-ivory/75">{item.text}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
