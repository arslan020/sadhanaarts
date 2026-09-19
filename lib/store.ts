import { Redis } from "@upstash/redis";
import { DEFAULT_CONTENT, type SiteContent } from "@/lib/content";

const CONTENT_KEY = "sadhana-arts:site-content";

function readEnv(...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) return value;
  }
  return undefined;
}

function getRedis(): Redis | null {
  const url = readEnv("KV_REST_API_URL", "UPSTASH_REDIS_REST_URL");
  const token = readEnv("KV_REST_API_TOKEN", "UPSTASH_REDIS_REST_TOKEN");
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export function isStorageConfigured(): boolean {
  return getRedis() !== null;
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
  const redis = getRedis();
  if (!redis) return DEFAULT_CONTENT;
  const stored = await redis.get<SiteContent>(CONTENT_KEY);
  if (!stored) return DEFAULT_CONTENT;
  return deepMerge(DEFAULT_CONTENT, stored);
}

export async function saveContent(content: SiteContent): Promise<void> {
  const redis = getRedis();
  if (!redis) {
    throw new Error(
      "Storage is not configured yet. Connect a KV/Redis database to this project in the Vercel dashboard (Storage tab), then redeploy."
    );
  }
  await redis.set(CONTENT_KEY, content);
}
