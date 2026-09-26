import type { Cta } from "@/lib/content";
import Link from "next/link";

function buttonClass(inverted: boolean, index: number, size: "md" | "lg") {
  const sizing = size === "lg" ? "px-10 py-4 text-base sm:px-12 sm:text-lg" : "px-6 py-3 text-sm";
  if (inverted) {
    return index === 0
      ? `rounded-full bg-gold ${sizing} font-semibold text-deep-burgundy transition hover:bg-soft-gold`
      : `rounded-full border border-ivory/40 ${sizing} font-semibold text-ivory transition hover:bg-ivory/10`;
  }
  return index === 0
    ? `rounded-full bg-burgundy ${sizing} font-semibold text-ivory transition hover:bg-deep-burgundy`
    : `rounded-full border border-burgundy/30 bg-warm-white ${sizing} font-semibold text-burgundy transition hover:border-burgundy hover:bg-parchment`;
}

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:");
}

export default function CtaRow({
  ctas,
  inverted = false,
  size = "md",
}: {
  ctas: Cta[];
  inverted?: boolean;
  size?: "md" | "lg";
}) {
  if (!ctas.length) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {ctas.map((cta, i) =>
        isExternal(cta.href) ? (
          <a
            key={`${cta.label}-${i}`}
            href={cta.href}
            target="_blank"
            rel="noreferrer"
            className={buttonClass(inverted, i, size)}
          >
            {cta.label}
          </a>
        ) : (
          <Link key={`${cta.label}-${i}`} href={cta.href} className={buttonClass(inverted, i, size)}>
            {cta.label}
          </Link>
        )
      )}
    </div>
  );
}
