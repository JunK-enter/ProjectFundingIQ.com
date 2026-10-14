import { partnerTransition, partnerUrl } from "@/content/site";
import { Button } from "./Button";
import { Container } from "./Container";
import { Magnetic } from "./Magnetic";
import { Reveal } from "./Reveal";
import { ScrollVelocity } from "./velora/scroll-velocity";
import { TextReveal } from "./velora/text-reveal";

export function PartnerCTA({
  title = "Give your customers another funding option to explore.",
  body = "Join the partner program and learn how Home Equity Agreements may fit into your customer conversations.",
  button = "Become a Partner",
}: {
  title?: string;
  body?: string;
  button?: string;
}) {
  return (
    <section className="overflow-hidden bg-navy pb-20 pt-10 text-white md:pb-28 md:pt-14">
      <ScrollVelocity
        baseVelocity={2.5}
        className="mb-12 border-y border-white/10 py-4 md:mb-16 md:py-5"
      >
        <span className="inline-flex items-center gap-8 font-serif text-[2.6rem] leading-none text-white/25 italic sm:text-6xl md:text-7xl">
          Another option to explore
          <span aria-hidden className="size-2.5 rotate-45 bg-sky/70 md:size-3" />
          Keep the project moving
          <span aria-hidden className="size-2.5 rotate-45 bg-sky/70 md:size-3" />
        </span>
      </ScrollVelocity>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <TextReveal
            as="h2"
            text={title}
            className="font-serif text-[2.1rem] leading-[1.15] text-balance sm:text-5xl"
          />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              {body}
            </p>
            <div className="mt-8">
              <Magnetic className="w-full sm:w-auto">
                <Button
                  href={partnerUrl}
                  external
                  variant="inverse"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {button}
                </Button>
              </Magnetic>
            </div>
            <p className="mt-4 text-sm text-white/70">{partnerTransition}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
