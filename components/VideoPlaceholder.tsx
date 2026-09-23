export default function VideoPlaceholder({
  label = "Video coming soon",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-3 rounded-2xl bg-parchment text-burgundy/50 ring-1 ring-gold/30 ${
        className.includes("aspect-") ? "" : "aspect-video"
      } ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth={1.4}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M10 9.5v5l5-2.5-5-2.5z" fill="currentColor" stroke="none" />
      </svg>
      <span className="px-4 text-center text-xs font-medium uppercase tracking-wide">{label}</span>
    </div>
  );
}
