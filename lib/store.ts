import { neon } from "@neondatabase/serverless";
import { unstable_noStore as noStore } from "next/cache";
import { DEFAULT_CONTENT, type SiteContent } from "@/lib/content";

const ROW_ID = "default";

function readEnv(...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) return value;
  }
  return undefined;
}

function getDatabaseUrl(): string | undefined {
  return readEnv(
    "DATABASE_URL",
    "POSTGRES_URL",
    "POSTGRES_PRISMA_URL",
    "NEON_DATABASE_URL",
    "DATABASE_URL_UNPOOLED",
    "POSTGRES_URL_NON_POOLING"
  );
}

function getSql() {
  const url = getDatabaseUrl();
  if (!url) return null;
  return neon(url, { fetchOptions: { cache: "no-store" } });
}

type SqlClient = NonNullable<ReturnType<typeof getSql>>;

export function isStorageConfigured(): boolean {
  return Boolean(getDatabaseUrl());
}

async function ensureTable(sql: SqlClient) {
  await sql`
    CREATE TABLE IF NOT EXISTS site_content (
      id TEXT PRIMARY KEY,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMerge<T>(base: T, overlay: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(overlay)) {
    return (overlay === undefined ? base : overlay) as T;
  }

  const result: Record<string, unknown> = { ...base };
  for (const [key, overlayVal] of Object.entries(overlay)) {
    if (overlayVal === undefined) continue;
    const baseVal = result[key];
    if (Array.isArray(overlayVal)) {
      result[key] = overlayVal;
    } else if (isPlainObject(overlayVal) && isPlainObject(baseVal)) {
      result[key] = deepMerge(baseVal, overlayVal);
    } else {
      result[key] = overlayVal;
    }
  }
  return result as T;
}

export async function getContent(): Promise<SiteContent> {
  noStore();
  const sql = getSql();
  if (!sql) return DEFAULT_CONTENT;

  await ensureTable(sql);
  const rows = (await sql`SELECT data FROM site_content WHERE id = ${ROW_ID} LIMIT 1`) as { data: SiteContent }[];
  const stored = rows[0]?.data;
  if (!stored) return DEFAULT_CONTENT;
  return deepMerge(DEFAULT_CONTENT, stored);
}

export async function saveContent(content: SiteContent): Promise<void> {
  const sql = getSql();
  if (!sql) {
    throw new Error(
      "Storage is not configured yet. Connect a Neon database to this project in the Vercel dashboard (Storage tab), then redeploy."
    );
  }

  await ensureTable(sql);
  const payload = JSON.stringify(content);
  await sql`
    INSERT INTO site_content (id, data, updated_at)
    VALUES (${ROW_ID}, ${payload}::jsonb, NOW())
    ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()
  `;
}
