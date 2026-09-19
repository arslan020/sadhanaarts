import { NextResponse } from "next/server";
import { getContent, isStorageConfigured } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getContent();
  const photoCounts = {
    artists: content.artists.people.filter((person) => Boolean(person.photoUrl)).length,
    news: content.news.articles.filter((article) => Boolean(article.photoUrl)).length,
    about: Boolean(content.about.photoUrl),
  };

  return NextResponse.json({
    storageConfigured: isStorageConfigured(),
    photoCounts,
  });
}
