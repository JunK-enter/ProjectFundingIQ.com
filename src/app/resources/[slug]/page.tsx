import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody";
import { Container } from "@/components/Container";
import { PartnerCTA } from "@/components/PartnerCTA";
import { articles, getArticle } from "@/content/resources";
import { pageMetadata } from "@/lib/seo";

type ArticleParams = { slug: string };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ArticleParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.description,
    path: `/resources/${article.slug}`,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<ArticleParams>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = articles
    .filter((item) => item.slug !== article.slug && item.categoryId === article.categoryId)
    .slice(0, 3);

  const more = related.length
    ? related
    : articles.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <>
      <article className="pb-16 pt-8 md:pt-14">
        <Container>
          <p className="eyebrow text-forest">{article.category}</p>
          <h1 className="mt-3 max-w-3xl font-serif text-[2.15rem] leading-[1.15] text-balance text-ink sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {article.excerpt}
          </p>
          <p className="mt-6 max-w-3xl border border-line bg-sage/60 px-4 py-3 text-sm leading-relaxed text-ink">
            Educational only. This article does not describe a specific offer
            and is not a promise of eligibility, pricing, or funding.
          </p>
          <div className="mt-10">
            <ArticleBody blocks={article.blocks} />
          </div>
        </Container>
      </article>
      <section className="border-t border-line bg-paper py-14">
        <Container>
          <h2 className="font-serif text-2xl text-ink">Keep reading</h2>
          <ul className="mt-5 grid gap-3 md:grid-cols-3">
            {more.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/resources/${item.slug}`}
                  className="block h-full rounded-[14px] border border-line bg-cream p-5 hover:bg-sage/50"
                >
                  <p className="eyebrow text-forest">{item.category}</p>
                  <p className="mt-3 font-serif text-xl text-ink">{item.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <PartnerCTA />
    </>
  );
}
