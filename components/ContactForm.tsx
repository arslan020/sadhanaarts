"use client";

import { useState } from "react";

const fieldClass =
  "mt-1 w-full rounded-lg border border-parchment bg-warm-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-gold";

export default function ContactForm({ email, categories }: { email: string; categories: string[] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_honey")) return;

    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.get("name")?.toString() ?? "",
          email: data.get("email")?.toString() ?? "",
          category: data.get("category")?.toString() ?? "",
          message: data.get("message")?.toString() ?? "",
          _subject: `Sadhana Arts enquiry: ${data.get("category")?.toString() ?? "General"}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-ivory p-6 shadow-sm ring-1 ring-parchment sm:p-8">
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-ink">
            Name *
          </label>
          <input id="name" name="name" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-ink">
            Email *
          </label>
          <input id="email" name="email" type="email" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="category" className="text-sm font-medium text-ink">
            Enquiry type
          </label>
          <select id="category" name="category" className={fieldClass} defaultValue={categories[0] ?? ""}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="message" className="text-sm font-medium text-ink">
            Message *
          </label>
          <textarea id="message" name="message" required rows={5} className={fieldClass} />
        </div>
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-full bg-burgundy px-6 py-3 text-sm font-semibold text-ivory transition hover:bg-deep-burgundy disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "sent" && <p className="mt-3 text-sm text-burgundy">Thank you — we will be in touch shortly.</p>}
      {status === "error" && (
        <p className="mt-3 text-sm text-red-700">
          Something went wrong. Please email us directly at {email}.
        </p>
      )}
    </form>
  );
}
