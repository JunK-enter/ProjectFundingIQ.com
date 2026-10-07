import Link from "next/link";
import { heaSteps } from "@/content/journey";
import { Container } from "./Container";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function HEAExplainer() {
  return (
    <section id="what-is-an-hea" className="py-20 md:py-28">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeader
              eyebrow="HEA 101"
              title="So, what exactly is a Home Equity Agreement?"
            >
              A Home Equity Agreement is an alternative way for an eligible
              homeowner to access a portion of the equity in their property
              without taking out a traditional loan.
            </SectionHeader>
            <Link
              href="/how-heas-work"
              className="group mt-8 inline-flex min-h-11 items-center gap-2 text-base font-medium text-forest"
            >
              Understand HEAs{" "}
              <span
                aria-hidden
                className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
          <Stagger as="ol" className="lg:col-span-6 lg:col-start-7" stagger={0.08}>
              {heaSteps.map((step, index) => (
                <StaggerItem
                  key={step.number}
                  className="relative grid grid-cols-[auto_1fr] gap-4 pb-8 last:pb-0"
                >
                  {index < heaSteps.length - 1 ? (
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-5 top-11 w-px bg-line"
                    />
                  ) : null}
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-sage font-serif text-sm text-forest">
                    {step.number}
                  </span>
                  <div className="pt-1">
                    <h3 className="font-serif text-xl text-ink">{step.title}</h3>
                    <p className="mt-1.5 text-muted leading-relaxed">{step.body}</p>
                  </div>
                </StaggerItem>
              ))}
          </Stagger>
        </div>
        <Reveal>
          <aside className="mt-12 border border-line bg-sage/70 p-6 sm:p-8 md:mt-16">
            <h3 className="font-serif text-2xl text-ink sm:text-3xl">
              No monthly payment does not mean free funding.
            </h3>
            <p className="mt-4 max-w-3xl leading-relaxed text-muted">
              The homeowner enters into a contractual agreement tied to the
              home&apos;s value. Fees, settlement calculations, liens, settlement
              events, and other obligations depend on the provider&apos;s
              agreement and must be clearly understood before proceeding.
            </p>
          </aside>
        </Reveal>
      </Container>
    </section>
  );
}
