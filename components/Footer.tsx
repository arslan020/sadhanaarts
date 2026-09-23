import Link from "next/link";
import Logo from "@/components/Logo";
import Reveal from "@/components/Reveal";
import { contactEmails, displayWebsite, type SiteContent } from "@/lib/content";

const DISCOVER_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Artists", href: "/artists" },
  { label: "What’s New", href: "/news" },
];

const EXPERIENCE_LINKS = [
  { label: "Learn", href: "/learn" },
  { label: "Parampara", href: "/parampara" },
];

const CONNECT_LINKS = [
  { label: "Support Us", href: "/support" },
  { label: "Contact", href: "/contact" },
];

type FooterProps = {
  site: SiteContent["site"];
  contact: SiteContent["contact"];
};

export default function Footer({ site, contact }: FooterProps) {
  return (
    <footer className="bg-deep-burgundy text-ivory">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:flex-wrap sm:justify-center lg:flex-nowrap lg:items-start lg:justify-center lg:gap-x-20 xl:gap-x-24">
          <Reveal className="max-w-[15rem] sm:w-[15rem]">
            <Logo inverted />
            <p className="mt-5 font-serif text-base leading-snug text-soft-gold">{site.brandStatement}</p>
          </Reveal>

          <FooterList heading="Discover" links={DISCOVER_LINKS} />
          <FooterList heading="Experience" links={EXPERIENCE_LINKS} delayMs={80} />
          <FooterList heading="Connect" links={CONNECT_LINKS} delayMs={120} />

          <Reveal delayMs={160} className="shrink-0">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-soft-gold">Email</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {contactEmails(contact).map((address) => (
                <li key={address}>
                  <a href={`mailto:${address}`} className="whitespace-nowrap text-ivory/85 transition hover:text-gold">
                    {address}
                  </a>
                </li>
              ))}
            </ul>
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
