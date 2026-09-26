"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { NAV_LINKS } from "@/lib/content";

type HeaderProps = {
  siteName: string;
};

export default function Header({ siteName }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-parchment bg-warm-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 lg:px-6">
          <Link href="/" onClick={() => setOpen(false)} aria-label={siteName} className="flex-shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex">
            {NAV_LINKS.filter((link) => link.href !== "/").map((link) =>
              link.children ? (
                <div key={link.href} className="group relative">
                  <Link
                    href={link.href}
                    className={`inline-flex items-center gap-1 px-2.5 py-2 text-sm font-medium transition ${
                      isActive(link.href) ? "text-burgundy" : "text-ink/80 hover:text-burgundy"
                    }`}
                  >
                    {link.label}
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M6 8l4 4 4-4" />
                    </svg>
                  </Link>
                  <div className="invisible absolute left-0 top-full z-20 min-w-[220px] translate-y-1 pt-2 opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="rounded-xl bg-warm-white py-2 shadow-lg ring-1 ring-parchment">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-4 py-2.5 text-sm transition hover:bg-ivory hover:text-burgundy ${
                            isActive(child.href) ? "text-burgundy" : "text-ink/80"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group whitespace-nowrap px-2.5 py-2 text-sm font-medium transition ${
                    isActive(link.href) ? "text-burgundy" : "text-ink/80 hover:text-burgundy"
                  }`}
                >
                  {link.label}
                  <span
                    className={`block h-px bg-gold transition-all duration-300 ${
                      isActive(link.href) ? "max-w-full" : "max-w-0 group-hover:max-w-full"
                    }`}
                  />
                </Link>
              )
            )}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/support"
              className="rounded-full border border-burgundy/30 bg-warm-white px-4 py-2 text-sm font-semibold text-burgundy transition hover:border-burgundy hover:bg-parchment"
            >
              Support Us
            </Link>
            <Link
              href="/contact?type=Donate"
              className="rounded-full bg-burgundy px-4 py-2 text-sm font-semibold text-ivory transition hover:bg-deep-burgundy"
            >
              Donate
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-deep-burgundy xl:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 xl:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <nav
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-80 max-w-[86%] flex-col bg-warm-white shadow-xl transition-transform duration-300 ease-in-out xl:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <Logo />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-deep-burgundy"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-1 overflow-y-auto px-4 py-2">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.href}>
                <button
                  type="button"
                  onClick={() => setExpanded(expanded === link.href ? null : link.href)}
                  className="flex w-full items-center justify-between rounded-lg px-2 py-3 text-left text-sm font-medium text-ink"
                >
                  {link.label}
                  <span className="text-gold">{expanded === link.href ? "–" : "+"}</span>
                </button>
                {expanded === link.href && (
                  <div className="mb-2 ml-3 space-y-1 border-l border-gold/40 pl-3">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-2 py-2 text-sm text-ink/80 hover:bg-ivory hover:text-burgundy"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-sm font-medium text-ink transition hover:bg-ivory hover:text-burgundy"
              >
                {link.label}
              </Link>
            )
          )}
          <div className="mt-4 flex flex-col gap-2 px-2 pb-6">
            <Link
              href="/support"
              onClick={() => setOpen(false)}
              className="rounded-full border border-burgundy/30 px-4 py-2.5 text-center text-sm font-semibold text-burgundy"
            >
              Support Us
            </Link>
            <Link
              href="/contact?type=Donate"
              onClick={() => setOpen(false)}
              className="rounded-full bg-burgundy px-4 py-2.5 text-center text-sm font-semibold text-ivory"
            >
              Donate
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
