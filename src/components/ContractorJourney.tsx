import { Container } from "./Container";
import { Button } from "./Button";
import { JourneyStairs } from "./JourneyStairs";
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
        <JourneyStairs />
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
