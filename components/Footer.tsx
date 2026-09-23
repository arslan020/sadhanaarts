import Link from "next/link";
import Logo from "@/components/Logo";
import Reveal from "@/components/Reveal";
import { contactEmails, displayWebsite, type SiteContent } from "@/lib/content";

const EXPLORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Artists", href: "/artists" },
  { label: "What’s New", href: "/news" },
];

const PROGRAMME_LINKS = [
  { label: "Learn", href: "/learn" },
  { label: "Parampara", href: "/parampara" },
  { label: "Support Us", href: "/support" },
  { label: "Contact", href: "/contact" },
];

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 8.97 6.65a2 2 0 0 0 2.06 0L22 7" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2}>
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
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal className="sm:col-span-2 lg:col-span-1">
            <Logo inverted />
            <p className="mt-5 max-w-[16rem] font-serif text-lg leading-snug text-soft-gold">{site.brandStatement}</p>
          </Reveal>

          <FooterList heading="Explore" links={EXPLORE_LINKS} />
          <FooterList heading="Programmes" links={PROGRAMME_LINKS} delayMs={80} />

          <Reveal delayMs={160}>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-soft-gold">Visit</h4>
            <div className="mt-4 space-y-4 text-sm text-ivory/85">
              <p className="flex items-start gap-2.5">
                <LocationIcon />
                <span className="leading-relaxed">
                  <span className="block font-medium text-ivory">{contact.organisation}</span>
                  {contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </p>
              <p className="flex items-start gap-2.5">
                <MailIcon />
                <span className="space-y-1">
                  {contactEmails(contact).map((address) => (
                    <a key={address} href={`mailto:${address}`} className="block hover:text-gold">
                      {address}
                    </a>
                  ))}
                </span>
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 border-t border-ivory/15 pt-6 text-center">
          <p className="text-xs text-ivory/50">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          {site.website && (
            <a
              href={site.website}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-xs text-ivory/50 transition hover:text-gold"
            >
              {displayWebsite(site.website)}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}

function FooterList({
  heading,
  links,
  delayMs = 0,
}: {
  heading: string;
  links: { label: string; href: string }[];
  delayMs?: number;
}) {
  return (
    <Reveal delayMs={delayMs}>
      <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-soft-gold">{heading}</h4>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-ivory/85 transition hover:text-gold">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
