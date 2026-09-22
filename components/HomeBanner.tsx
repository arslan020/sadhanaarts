import ContentImage from "@/components/ContentImage";

export default function HomeBanner({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-deep-burgundy sm:min-h-[82vh]">
      <ContentImage src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />
      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-3xl items-end px-6 py-16 sm:min-h-[82vh] sm:py-24">
        {children}
      </div>
    </section>
  );
}
