import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactEmails } from "@/lib/content";
import { getContent } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_MESSAGE_LENGTH = 4000;
const DEFAULT_FROM = "Sadhana Arts <info@sadhana-arts.org>";

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function envRecipients(): string[] {
  const raw = process.env.CONTACT_TO_EMAIL?.trim();
  if (!raw) return [];
  return raw
    .split(",")
    .map((value) => value.trim())
    .filter(isValidEmail);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  if (asString((body as { honey?: unknown }).honey)) {
    return NextResponse.json({ ok: true });
  }

  const name = asString((body as { name?: unknown }).name);
  const email = asString((body as { email?: unknown }).email);
  const category = asString((body as { category?: unknown }).category) || "General Enquiries";
  const message = asString((body as { message?: unknown }).message);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Please fill in your name, email and message." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const content = await getContent();
  const to = envRecipients().length ? envRecipients() : contactEmails(content.contact);
  const subject = `Sadhana Arts enquiry: ${category}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Enquiry type: ${category}`,
    "",
    message,
  ].join("\n");

  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    const resend = new Resend(resendKey);
    const from = process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_FROM;
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text,
    });
    if (!error) {
      return NextResponse.json({ ok: true });
    }
  }

  const results = await Promise.all(
    to.map((address) =>
      fetch(`https://formsubmit.co/ajax/${encodeURIComponent(address)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          category,
          message,
          _subject: subject,
          _template: "table",
          _captcha: "false",
          _replyto: email,
        }),
      }).catch(() => null)
    )
  );

  if (!results.some((res) => res?.ok)) {
    return NextResponse.json(
      { error: "Email delivery is not connected yet. Please email us directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
