import { partnerTransition, partnerUrl } from "@/content/site";
import { Button } from "./Button";
import { Container } from "./Container";

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
    <section className="bg-forest-deep py-20 text-cream md:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-[2.1rem] leading-[1.15] text-balance sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-cream/75">
            {body}
          </p>
          <div className="mt-8">
            <Button
              href={partnerUrl}
              external
              variant="inverse"
              size="lg"
              className="w-full sm:w-auto"
            >
              {button}
            </Button>
          </div>
          <p className="mt-4 text-sm text-cream/70">{partnerTransition}</p>
        </div>
      </Container>
    </section>
  );
}
