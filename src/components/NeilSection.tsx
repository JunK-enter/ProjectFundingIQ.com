import { neilUrl, partnerTransition } from "@/content/site";
import { Button } from "./Button";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function NeilSection() {
  return (
    <section id="ask-neil" className="py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-[14px] border border-line bg-sage">
              <div className="absolute inset-0 flex flex-col justify-between p-7">
                <p className="eyebrow text-forest">Partner contact</p>
                <div>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-forest font-serif text-2xl text-cream">
                    NO
                  </div>
                  <p className="mt-5 font-serif text-3xl text-ink">Neil Okun</p>
                  <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-muted">
                    Partner contact for contractors exploring the program.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.08}>
            <h2 className="font-serif text-[2rem] leading-[1.15] text-balance text-ink sm:text-4xl">
              Questions before you join?
            </h2>
            <p className="mt-4 font-serif text-2xl text-forest">Meet Neil Okun</p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              Neil works with contractors and home improvement professionals
              exploring the HomeWealthIQ partner program and can help answer
              questions about the partner process.
            </p>
            <div className="mt-8">
              <Button href={neilUrl} external>
                Talk With Neil
              </Button>
              <p className="mt-3 text-sm text-muted">{partnerTransition}</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
