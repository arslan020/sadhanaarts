import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { getBlobToken } from "@/lib/blob";

const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

export async function POST(request: Request) {
  const session = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!verifySessionToken(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Please upload a JPG, PNG, WEBP, AVIF or GIF image." }, { status: 400 });
  }
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "Image is too large. Please keep it under 5MB." }, { status: 400 });
  }

  const blobToken = getBlobToken();
  if (!blobToken) {
    return NextResponse.json(
      {
        error:
          "Image storage isn't connected yet. Ask your developer to connect Vercel Blob storage to this project in the Vercel dashboard (Storage tab), then redeploy.",
      },
      { status: 500 }
    );
  }

  const pathname = file.name || "upload";
  const options = { addRandomSuffix: true, token: blobToken } as const;

  try {
    const blob = await put(pathname, file, { ...options, access: "public" });
    return NextResponse.json({ url: blob.url || blob.downloadUrl });
  } catch {
    try {
      const blob = await put(pathname, file, { ...options, access: "private" });
      return NextResponse.json({ url: blob.url || blob.downloadUrl });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed.";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }
}
