import ContentImage from "@/components/ContentImage";
import Ornament from "@/components/Ornament";
import Reveal from "@/components/Reveal";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  imageUrl?: string;
};

export default function PageHero({ eyebrow, title, lead, imageUrl }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-deep-burgundy">
      {imageUrl ? (
        <>
          <ContentImage src={imageUrl} className="absolute inset-0 h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-burgundy/70 via-deep-burgundy/80 to-deep-burgundy" />
        </>
      ) : (
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(201,162,39,0.25), transparent 40%), radial-gradient(circle at 80% 80%, rgba(201,162,39,0.18), transparent 45%)",
          }}
        />
      )}
      <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:py-28">
        <Reveal>
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-soft-gold">{eyebrow}</p>
          )}
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-ivory sm:text-5xl">{title}</h1>
          <div className="mt-6 flex justify-center">
            <Ornament />
          </div>
          {lead && <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ivory/80 sm:text-lg">{lead}</p>}
        </Reveal>
      </div>
    </section>
  );
}
