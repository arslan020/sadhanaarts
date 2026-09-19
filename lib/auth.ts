import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE_NAME = "sa_admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

function getSecret(): string {
  return process.env.SESSION_SECRET || "sadhana-arts-dev-secret-change-me";
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

export function checkCredentials(email: string, password: string): boolean {
  const expectedEmail = process.env.ADMIN_EMAIL || "info@sadhanaarts.com";
  const expectedPassword = process.env.ADMIN_PASSWORD || "sadhana123";
  return email.trim().toLowerCase() === expectedEmail.toLowerCase() && password === expectedPassword;
}

export function createSessionToken(email: string): string {
  const payload = JSON.stringify({ email, exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000 });
  const encoded = Buffer.from(payload).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return false;

  const expected = sign(encoded);
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) return false;

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString());
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}
