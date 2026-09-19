import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getContent } from "@/lib/store";

export const revalidate = 0;
export const metadata: Metadata = { title: "What’s New" };

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function NewsPage() {
  const { news } = await getContent();
  const articles = [...news.articles].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main>
      <PageHero eyebrow="What’s New" title={news.heading} lead={news.intro} />
      <section className="bg-warm-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          {news.categories.length > 0 && (
            <div className="mb-10 flex flex-wrap gap-2">
              {news.categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-gold/40 bg-ivory px-3 py-1 text-xs font-medium text-burgundy"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <Reveal key={article.slug} delayMs={(i % 3) * 80}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-ivory shadow-sm ring-1 ring-parchment">
                  {article.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={article.photoUrl} alt="" className="aspect-[16/10] w-full object-cover" />
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center bg-parchment text-burgundy/40">
                      <span className="text-xs uppercase tracking-wide">{article.category}</span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                      {article.category} · {formatDate(article.date)}
                    </p>
                    <h2 className="mt-2 font-serif text-2xl text-deep-burgundy">{article.title}</h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/75">{article.excerpt}</p>
                    <Link
                      href={`/news/${article.slug}`}
                      className="mt-5 text-sm font-semibold text-burgundy hover:text-deep-burgundy"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
