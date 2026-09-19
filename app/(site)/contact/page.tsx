import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/store";

export const revalidate = 0;
export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const { contact } = await getContent();

  return (
    <main>
      <PageHero eyebrow="Contact" title={contact.heading} lead={contact.intro} />
      <section className="bg-warm-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Visit or write to us</p>
            <h2 className="mt-3 font-serif text-3xl text-deep-burgundy">{contact.organisation}</h2>
            <address className="mt-5 not-italic leading-relaxed text-ink/80">
              {contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a href={`mailto:${contact.email}`} className="mt-5 inline-block font-medium text-burgundy hover:text-deep-burgundy">
              {contact.email}
            </a>
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Enquiry categories</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {contact.enquiryCategories.map((category) => (
                  <li
                    key={category}
                    className="rounded-full border border-gold/40 bg-ivory px-3 py-1 text-xs font-medium text-burgundy"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delayMs={120}>
            <ContactForm email={contact.email} categories={contact.enquiryCategories} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
