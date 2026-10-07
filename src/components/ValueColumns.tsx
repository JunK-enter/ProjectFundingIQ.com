import { valuePoints } from "@/content/journey";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function ValueColumns() {
  return (
    <section id="another-option" className="bg-sage py-20 md:py-28">
      <Container>
        <SectionHeader title="Another option for the funding conversation." />
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0">
          {valuePoints.map((point, index) => (
            <Reveal
              as="li"
              key={point.number}
              delay={index * 0.08}
              className={`md:px-8 ${
                index === 0 ? "md:pl-0" : "md:border-l md:border-forest/15"
              } ${index === valuePoints.length - 1 ? "md:pr-0" : ""}`}
            >
              <p className="font-serif text-4xl text-forest/35" aria-hidden>
                {point.number}
              </p>
              <h3 className="mt-4 font-serif text-2xl leading-snug text-ink">
                {point.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{point.body}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
