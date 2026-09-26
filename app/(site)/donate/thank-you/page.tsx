import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import Ornament from "@/components/Ornament";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/store";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default async function DonateThankYouPage() {
  const { support } = await getContent();
  const thanks = support.donateThanks;

  return (
    <main>
      <section className="flex min-h-[70vh] flex-col bg-deep-burgundy">
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-20 text-center sm:py-24">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-soft-gold">Donate</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold text-ivory sm:text-5xl">
              {thanks?.heading || "Thank you"}
            </h1>
            <div className="mt-6 flex justify-center">
              <Ornament />
            </div>
            <p className="mx-auto mt-6 max-w-xl whitespace-pre-line text-base leading-relaxed text-ivory/80 sm:text-lg">
              {thanks?.message ||
                "Your gift has been received. You are helping Sadhana Arts carry Indian classical music forward."}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="rounded-full bg-gold px-8 py-3 text-sm font-semibold text-deep-burgundy transition hover:bg-soft-gold"
              >
                Back to home
              </Link>
              <Link
                href="/support"
                className="rounded-full border border-ivory/40 px-8 py-3 text-sm font-semibold text-ivory transition hover:bg-ivory/10"
              >
                Support Us
              </Link>
            </div>
          </Reveal>
          <div className="mt-auto flex justify-center pt-16">
            <Logo inverted size="lg" />
          </div>
        </div>
      </section>
    </main>
  );
}
