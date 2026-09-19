type LogoProps = {
  className?: string;
  inverted?: boolean;
  withWordmark?: boolean;
  size?: "sm" | "md" | "lg";
};

const LOCKUP = {
  sm: "h-12 w-auto object-contain",
  md: "h-[4.5rem] w-auto object-contain sm:h-[5.25rem]",
  lg: "h-24 w-auto object-contain",
};

export default function Logo({
  className = "",
  inverted = false,
  withWordmark = false,
  size = "md",
}: LogoProps) {
  const src = inverted ? "/images/logo-lockup-light.png" : "/images/logo-lockup.png";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="Sadhana Arts" className={`${LOCKUP[size]} flex-shrink-0`} />
      {withWordmark && (
        <span
          className={`font-serif text-lg font-semibold leading-none tracking-[0.14em] sm:text-xl ${
            inverted ? "text-ivory" : "text-ink"
          }`}
        >
          SADHANA ARTS
        </span>
      )}
    </span>
  );
}
