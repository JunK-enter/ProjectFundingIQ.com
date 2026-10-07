import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { PartnerCTA } from "@/components/PartnerCTA";
import { getArticlesByCategory, resourceCategories } from "@/content/resources";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Resources",
  description:
    "Educational articles on Home Equity Agreements for contractors: basics, comparisons, homeowner questions, and the partner process.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resource center"
        title="Understand HEAs without becoming a funding expert."
      >
        <p>
          Short guides for contractors who want to recognize the option, speak
          about it carefully, and know when to hand the conversation to the
          provider.
        </p>
      </PageHero>

      <nav aria-label="Resource categories" className="border-y border-line bg-paper">
        <Container className="flex gap-2 overflow-x-auto py-3">
          {resourceCategories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="shrink-0 rounded-full border border-line bg-cream px-3 py-2 text-sm text-ink hover:bg-sage"
            >
              {category.label}
            </a>
          ))}
        </Container>
      </nav>

      <div className="py-14 md:py-20">
        <Container className="space-y-16">
          {resourceCategories.map((category) => {
            const items = getArticlesByCategory(category.id);
            return (
              <section key={category.id} id={category.id}>
                <h2 className="font-serif text-3xl text-ink">{category.label}</h2>
                <ul className="mt-6 divide-y divide-line border-y border-line">
                  {items.map((article) => (
                    <li key={article.slug}>
                      <Link
                        href={`/resources/${article.slug}`}
                        className="group grid gap-3 py-6 sm:grid-cols-[1fr_auto] sm:items-center"
                      >
                        <span>
                          <span className="block font-serif text-2xl text-ink">
                            {article.title}
                          </span>
                          <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-muted">
                            {article.excerpt}
                          </span>
                        </span>
                        <ArrowRight
                          className="h-4 w-4 text-forest motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </Container>
      </div>

      <PartnerCTA />
    </>
  );
}
