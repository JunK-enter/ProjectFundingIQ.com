import type { ReactNode } from "react";
import { lostProjects } from "@/content/journey";
import { Button } from "./Button";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function LostProjects({
  id = "pipeline",
  eyebrow = "The opportunity already in your pipeline",
  title = "Think about the estimates sitting in your CRM right now.",
  ctaHref = "/for-contractors#introduce",
  ctaLabel = "Learn How to Start the Conversation",
  showCta = true,
  intro,
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
  showCta?: boolean;
  intro?: ReactNode;
}) {
  return (
    <section id={id} className="py-20 md:py-28">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title}>
          {intro}
        </SectionHeader>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {lostProjects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.05}>
              <article className="h-full overflow-hidden rounded-[14px] border border-line bg-paper">
                <div className="flex items-center justify-between border-b border-line bg-sage/80 px-5 py-3">
                  <p className="eyebrow text-muted">Estimate</p>
                  <p className="eyebrow text-clay">Open</p>
                </div>
                <div className="px-5 py-6">
                  <p className="font-serif text-4xl text-ink">{project.amount}</p>
                  <h3 className="mt-4 eyebrow text-forest">{project.title}</h3>
                  <p className="mt-4 text-ink">{project.note}</p>
                  <p className="mt-1 font-medium text-clay">{project.status}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">
          Illustrative examples, not actual customer records.
        </p>
        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="font-serif text-2xl leading-snug text-balance text-ink sm:text-3xl">
            Some stalled projects may simply be worth another funding
            conversation.
          </p>
          <p className="mt-4 text-muted leading-relaxed">
            ProjectFundingIQ helps contractors understand another option they
            can introduce when appropriate — without turning the contractor into
            the funding expert.
          </p>
          {showCta ? (
            <div className="mt-6">
              <Button href={ctaHref} variant="secondary">
                {ctaLabel}
              </Button>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
