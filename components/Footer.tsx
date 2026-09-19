import Link from "next/link";
import Logo from "@/components/Logo";
import Reveal from "@/components/Reveal";
import { NAV_LINKS, type SiteContent } from "@/lib/content";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 8.97 6.65a2 2 0 0 0 2.06 0L22 7" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

type FooterProps = {
  site: SiteContent["site"];
  contact: SiteContent["contact"];
};

export default function Footer({ site, contact }: FooterProps) {
  return (
    <footer className="bg-deep-burgundy text-ivory">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <Reveal>
            <Logo inverted />
            <p className="mt-4 max-w-xs font-serif text-lg leading-snug text-soft-gold">{site.brandStatement}</p>
            <p className="mt-3 text-sm leading-relaxed text-ivory/70">{site.tagline}</p>
          </Reveal>

          <Reveal delayMs={100}>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-soft-gold">Explore</h4>
            <ul className="mt-4 columns-2 space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="break-inside-avoid">
                  <Link href={link.href} className="text-ivory/85 transition hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delayMs={200}>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-soft-gold">Visit</h4>
            <ul className="mt-4 space-y-3 text-sm text-ivory/85">
              <li className="flex items-start gap-2">
                <LocationIcon />
                <span>
                  {contact.organisation}
                  <br />
                  {contact.addressLines.join(", ")}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MailIcon />
                <a href={`mailto:${contact.email}`} className="hover:text-gold">
                  {contact.email}
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="mt-12 border-t border-ivory/15 pt-6 text-center">
          <p className="text-xs text-ivory/50">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
