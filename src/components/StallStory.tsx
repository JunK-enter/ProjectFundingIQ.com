import { ArrowRight } from "lucide-react";
import { stallSteps } from "@/content/journey";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function StallStory() {
  return (
    <section id="why-projects-stall" className="py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <SectionHeader
              eyebrow="Why projects stall"
              title={
                <>
                  You did everything right. Then the funding conversation
                  stopped the project.
                </>
              }
            />
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8 lg:pt-16" delay={0.06}>
            <ul className="space-y-2 text-lg leading-relaxed text-ink">
              <li>You prepared the estimate.</li>
              <li>Answered the questions.</li>
              <li>Earned the homeowner&apos;s trust.</li>
              <li>Planned the project.</li>
            </ul>
            <p className="mt-6 text-muted">Then the customer says:</p>
            <blockquote className="mt-3 border-l-2 border-gold pl-5">
              <p className="font-serif text-2xl italic leading-snug text-ink sm:text-3xl">
                “I don&apos;t want another monthly payment.”
              </p>
            </blockquote>
          </Reveal>
        </div>

        <Reveal className="mt-14 md:mt-16">
          <ol className="md:hidden">
            {stallSteps.map((step, index) => (
              <li key={step.label} className="relative flex gap-3 pb-3">
                {index < stallSteps.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-[15px] top-8 w-px bg-line"
                  />
                ) : null}
                <span
                  className={`relative z-10 mt-1 h-8 w-8 shrink-0 rounded-full text-center text-xs leading-8 ${
                    step.emphasis
                      ? "bg-forest text-cream"
                      : "border border-line bg-paper text-forest"
                  }`}
                >
                  {index + 1}
                </span>
                <span
                  className={`flex min-h-11 flex-1 items-center rounded-[12px] px-3 text-sm ${
                    step.emphasis
                      ? "bg-forest text-cream"
                      : "border border-line bg-paper text-ink"
                  }`}
                >
                  {step.label}
                </span>
              </li>
            ))}
          </ol>
          <ol className="hidden flex-wrap items-center gap-x-2 gap-y-3 md:flex">
            {stallSteps.map((step, index) => (
              <li key={step.label} className="flex items-center gap-2">
                <span
                  className={`rounded-[12px] px-3.5 py-2.5 text-sm ${
                    step.emphasis
                      ? "bg-forest text-cream"
                      : "border border-line bg-paper text-ink"
                  }`}
                >
                  {step.label}
                </span>
                {index < stallSteps.length - 1 ? (
                  <ArrowRight className="h-4 w-4 text-muted" aria-hidden />
                ) : null}
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal>
          <p className="mt-12 max-w-2xl font-serif text-2xl leading-snug text-ink sm:text-3xl">
            That doesn&apos;t always have to be the end of the conversation.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
