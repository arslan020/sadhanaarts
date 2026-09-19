import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { articleBySlug } from "@/lib/content";
import { getContent } from "@/lib/store";

export const revalidate = 0;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent();
  const article = articleBySlug(content, slug);
  return { title: article?.title ?? "News" };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const content = await getContent();
  const article = articleBySlug(content, slug);
  if (!article) notFound();

  const date = new Date(article.date);
  const formatted = Number.isNaN(date.getTime())
    ? article.date
    : date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <main>
      <PageHero eyebrow={article.category} title={article.title} lead={formatted} imageUrl={article.photoUrl} />
      <article className="bg-warm-white">
        <div className="mx-auto max-w-3xl space-y-5 px-6 py-16">
          {article.body.map((para, i) => (
            <p key={i} className="text-base leading-relaxed text-ink/80 sm:text-lg">
              {para}
            </p>
          ))}
          <p className="pt-8">
            <Link href="/news" className="text-sm font-semibold text-burgundy hover:text-deep-burgundy">
              ← Back to What’s New
            </Link>
          </p>
        </div>
      </article>
    </main>
  );
}
