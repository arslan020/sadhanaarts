"use client";

export const inputClass =
  "w-full rounded-lg border border-parchment px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-gold";
export const labelClass = "text-sm font-medium text-ink";
export const addButtonClass =
  "rounded-full bg-burgundy px-4 py-2 text-sm font-semibold text-ivory transition hover:bg-deep-burgundy";

export function RemoveButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-ink/50 transition hover:bg-red-50 hover:text-red-600"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  );
}

export function ImageUpload({
  imageUrl,
  uploading,
  onUpload,
  onClear,
  clearLabel,
}: {
  imageUrl: string;
  uploading: boolean;
  onUpload: (file: File) => void;
  onClear?: () => void;
  clearLabel?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {imageUrl ? (
        <img src={imageUrl} alt="" className="h-16 w-16 flex-shrink-0 rounded-lg object-cover ring-1 ring-parchment" />
      ) : (
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-parchment text-[10px] text-ink/40">
          No photo
        </div>
      )}
      <div className="flex flex-col items-start gap-1">
        <label className="cursor-pointer rounded-full border border-burgundy px-3 py-1.5 text-xs font-semibold text-burgundy transition hover:bg-burgundy hover:text-ivory">
          {uploading ? "Uploading…" : "Upload photo"}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onUpload(file);
              e.target.value = "";
            }}
          />
        </label>
        {onClear && imageUrl && (
          <button type="button" onClick={onClear} className="text-xs text-ink/60 underline hover:text-ink">
            {clearLabel || "Remove custom photo"}
          </button>
        )}
      </div>
    </div>
  );
}

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-parchment sm:p-8">
      <h2 className="font-serif text-2xl text-deep-burgundy">{title}</h2>
      {description && <p className="mt-1 text-sm text-ink/70">{description}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

export function ParagraphList({
  values,
  onChange,
  onAdd,
  onRemove,
  rows = 3,
}: {
  values: string[];
  onChange: (next: string[]) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className={labelClass}>Paragraphs</label>
      <div className="mt-1 space-y-3">
        {values.map((para, i) => (
          <div key={i} className="flex gap-2">
            <textarea
              rows={rows}
              className={inputClass}
              value={para}
              onChange={(e) => {
                const next = [...values];
                next[i] = e.target.value;
                onChange(next);
              }}
            />
            <RemoveButton label="Remove paragraph" onClick={() => onRemove(i)} />
          </div>
        ))}
      </div>
      <button type="button" className={`mt-3 ${addButtonClass}`} onClick={onAdd}>
        + Add paragraph
      </button>
    </div>
  );
}

export function CtaList({
  values,
  onChange,
  onAdd,
  onRemove,
}: {
  values: { label: string; href: string }[];
  onChange: (index: number, field: "label" | "href", value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div>
      <label className={labelClass}>Buttons</label>
      <div className="mt-1 space-y-3">
        {values.map((cta, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="grid w-full gap-2 sm:grid-cols-2">
              <input
                placeholder="Label"
                className={inputClass}
                value={cta.label}
                onChange={(e) => onChange(i, "label", e.target.value)}
              />
              <input
                placeholder="/page-url"
                className={inputClass}
                value={cta.href}
                onChange={(e) => onChange(i, "href", e.target.value)}
              />
            </div>
            <RemoveButton label="Remove button" onClick={() => onRemove(i)} />
          </div>
        ))}
      </div>
      <button type="button" className={`mt-3 ${addButtonClass}`} onClick={onAdd}>
        + Add button
      </button>
    </div>
  );
}
