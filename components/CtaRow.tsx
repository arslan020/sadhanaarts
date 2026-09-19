import type { Cta } from "@/lib/content";
import Link from "next/link";

export default function CtaRow({ ctas, inverted = false }: { ctas: Cta[]; inverted?: boolean }) {
  if (!ctas.length) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {ctas.map((cta, i) => (
        <Link
          key={`${cta.label}-${i}`}
          href={cta.href}
          className={
            inverted
              ? i === 0
                ? "rounded-full bg-gold px-6 py-3 text-sm font-semibold text-deep-burgundy transition hover:bg-soft-gold"
                : "rounded-full border border-ivory/40 px-6 py-3 text-sm font-semibold text-ivory transition hover:bg-ivory/10"
              : i === 0
                ? "rounded-full bg-burgundy px-6 py-3 text-sm font-semibold text-ivory transition hover:bg-deep-burgundy"
                : "rounded-full border border-burgundy/30 bg-warm-white px-6 py-3 text-sm font-semibold text-burgundy transition hover:border-burgundy hover:bg-parchment"
          }
        >
          {cta.label}
        </Link>
      ))}
    </div>
  );
}
