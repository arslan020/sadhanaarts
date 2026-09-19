import { NextResponse } from "next/server";
import { get } from "@vercel/blob";
import { getBlobToken, isVercelBlobUrl } from "@/lib/blob";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function fetchPrivateBlob(src: string, token: string) {
  try {
    const result = await get(src, { access: "private", token });
    if (result?.statusCode === 200 && result.stream) {
      return { stream: result.stream, contentType: result.blob.contentType || "image/jpeg" };
    }
  } catch {
    // Store may be public, or get() may reject this URL shape.
  }

  try {
    const result = await get(src, { access: "public", token });
    if (result?.statusCode === 200 && result.stream) {
      return { stream: result.stream, contentType: result.blob.contentType || "image/jpeg" };
    }
  } catch {
    // Fall through to a token-authenticated fetch.
  }

  const response = await fetch(src, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok || !response.body) return null;
  return {
    stream: response.body,
    contentType: response.headers.get("content-type") || "image/jpeg",
  };
}

export async function GET(request: Request) {
  const src = new URL(request.url).searchParams.get("src");
  if (!src || !isVercelBlobUrl(src)) {
    return NextResponse.json({ error: "Invalid image." }, { status: 400 });
  }

  const token = getBlobToken();
  if (!token) {
    return NextResponse.json({ error: "Image storage is not configured." }, { status: 500 });
  }

  try {
    const blob = await fetchPrivateBlob(src, token);
    if (!blob) {
      return new NextResponse("Not found", { status: 404 });
    }

    return new NextResponse(blob.stream, {
      headers: {
        "Content-Type": blob.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
