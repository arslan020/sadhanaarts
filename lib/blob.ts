export function getBlobToken(): string | undefined {
  const value =
    process.env.BLOB_READ_WRITE_TOKEN ||
    process.env.Blob_READ_WRITE_TOKEN ||
    process.env.blob_READ_WRITE_TOKEN;
  return value?.trim() || undefined;
}

export function isVercelBlobUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    return host.endsWith("vercel-storage.com");
  } catch {
    return false;
  }
}

export function mediaSrc(url: string): string {
  if (!url) return url;
  if (url.startsWith("/api/media")) return url;
  if (!isVercelBlobUrl(url)) return url;
  return `/api/media?src=${encodeURIComponent(url)}`;
}
