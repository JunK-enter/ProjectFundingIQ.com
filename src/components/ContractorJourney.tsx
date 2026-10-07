import { journeySteps } from "@/content/journey";
import { Container } from "./Container";
import { Button } from "./Button";
import { SectionHeader } from "./SectionHeader";

export function ContractorJourney({
  showCta = true,
}: {
  showCta?: boolean;
}) {
  return (
    <section id="contractor-path" className="bg-forest-deep py-20 text-cream md:py-28">
      <Container>
        <SectionHeader
          tone="dark"
          eyebrow="For contractors"
          title={
            <>
              You introduce the option. The provider handles the funding
              conversation.
            </>
          }
        />
        <ol className="relative mt-12 grid gap-8 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          <span
            aria-hidden
            className="absolute bottom-2 left-[15px] top-3 w-px bg-gold/40 lg:hidden"
          />
          <span
            aria-hidden
            className="absolute left-[10%] right-[10%] top-5 hidden h-px bg-gold/40 lg:block"
          />
          {journeySteps.map((step) => (
            <li key={step.number} className="relative pl-12 lg:pl-0">
              <span className="absolute left-0 top-0 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 bg-forest-deep font-serif text-xs text-gold lg:static lg:mb-5">
                {step.number}
              </span>
              <h3 className="font-serif text-xl leading-snug text-cream">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/75">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
        {showCta ? (
          <div className="mt-12">
            <Button href="/for-contractors" variant="inverse">
              Explore the Contractor Program
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
