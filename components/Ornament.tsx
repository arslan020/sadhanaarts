export default function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 12" className={`h-3 w-28 text-gold ${className}`} aria-hidden="true">
      <path
        d="M2 6h42 M76 6h42 M60 6m-8 0a8 8 0 1 1 16 0 8 8 0 0 1-16 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="60" cy="6" r="2.2" fill="currentColor" />
    </svg>
  );
}
