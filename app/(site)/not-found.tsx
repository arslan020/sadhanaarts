import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">404</p>
      <h1 className="mt-3 font-serif text-4xl text-deep-burgundy">Page not found</h1>
      <p className="mt-4 max-w-md text-ink/70">This page does not exist, or the content has been moved.</p>
      <Link href="/" className="mt-8 rounded-full bg-burgundy px-6 py-3 text-sm font-semibold text-ivory">
        Return home
      </Link>
    </main>
  );
}
