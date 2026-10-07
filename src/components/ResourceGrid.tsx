import Link from "next/link";
import { ArrowRight, BookOpen, CircleHelp, FileText, MessageCircle, Scale, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { homepageResources } from "@/content/resources";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const icons: Record<string, LucideIcon> = {
  "hea-101": BookOpen,
  "hea-vs-heloc": Scale,
  "hea-vs-home-improvement-loan": Scale,
  "understanding-hea-settlement": FileText,
  "questions-homeowners-ask": CircleHelp,
  "how-contractors-introduce-an-hea": MessageCircle,
  "what-happens-after-a-referral": Users,
};

export function ResourceGrid() {
  return (
    <section id="learn" className="bg-paper py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="Learn at your own pace"
          title="You don’t need to become a funding expert to start a helpful conversation."
        />
        <ul className="mt-10 grid gap-3 md:grid-cols-2">
          {homepageResources.map((article, index) => {
            const Icon = icons[article.slug] ?? BookOpen;
            return (
              <Reveal as="li" key={article.slug} delay={Math.min(index * 0.04, 0.16)}>
                <Link
                  href={`/resources/${article.slug}`}
                  className="group flex h-full items-start gap-4 rounded-[14px] border border-line bg-cream px-4 py-4 transition-[background-color,transform,border-color,box-shadow] duration-300 hover:border-forest/15 hover:bg-sage/60 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_12px_28px_rgba(16,44,38,0.06)] sm:px-5"
                >
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage text-forest">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-ink">
                      {article.cardTitle}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">
                      {article.cardText}
                    </span>
                  </span>
                  <ArrowRight
                    className="mt-1 h-4 w-4 shrink-0 text-forest motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
