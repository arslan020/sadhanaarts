import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import type { SiteContent } from "@/lib/content";
import { getContent, isStorageConfigured, saveContent } from "@/lib/store";

async function isAuthed(): Promise<boolean> {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const content = await getContent();
  return NextResponse.json({ content, storageConfigured: isStorageConfigured() });
}

export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = (await request.json().catch(() => null)) as SiteContent | null;
  if (!content) {
    return NextResponse.json({ error: "Invalid content payload." }, { status: 400 });
  }

  try {
    await saveContent(content);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save content.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
