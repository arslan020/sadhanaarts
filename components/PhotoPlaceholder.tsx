export default function PhotoPlaceholder({ label = "Photograph coming soon" }: { label?: string }) {
  return (
    <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 rounded-2xl bg-parchment text-burgundy/50 ring-1 ring-gold/30">
      <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth={1.4}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="8.5" cy="10" r="1.5" />
        <path d="M21 16l-5-5-8 8" />
      </svg>
      <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
    </div>
  );
}
