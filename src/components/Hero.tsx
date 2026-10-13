import Image from "next/image";
import Link from "next/link";
import { heroTrades, partnerTransition, partnerUrl } from "@/content/site";
import { Button } from "./Button";
import { Container } from "./Container";
import { Magnetic } from "./Magnetic";
import { RotatingBadge } from "./RotatingBadge";
function words(text: string) {
  return text.split(" ").map((word, index, all) => (
    <span key={`${word}-${index}`}>
      <span className="hero-word">{word}</span>
      {index < all.length - 1 ? " " : null}
    </span>
  ));
}

function HeroLine({
  index,
  className = "",
  children,
}: {
  index: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className="-my-[0.12em] block overflow-hidden py-[0.12em] pr-[0.12em]">
      <span
        className={`hero-line block ${className}`}
        style={{ "--i": index } as React.CSSProperties}
      >
        {children}
      </span>
    </span>
  );
}

export function Hero() {
  return (
    <section className="pb-16 pt-6 sm:pb-20 sm:pt-8 lg:pb-24 lg:pt-10">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow inline-flex items-center gap-2.5 rounded-full !text-[0.58rem] !tracking-[0.06em] min-[400px]:!text-[0.72rem] min-[400px]:!tracking-[0.16em] border border-forest/15 bg-paper/70 py-1.5 pl-2.5 pr-3.5 text-forest">
              <span aria-hidden className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-gold opacity-70 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-gold" />
              </span>
              Funding conversations for home improvement
            </p>
            <h1 className="mt-6 font-serif text-[2.3rem] min-[400px]:text-[2.55rem] leading-[1.04] tracking-[-0.015em] text-ink sm:text-[3.6rem] lg:text-[3.55rem] xl:text-[3.9rem]">
              <HeroLine index={0}>{words("Your customer")}</HeroLine>
              <HeroLine index={1}>{words("wants the project.")}</HeroLine>
              <HeroLine index={2} className="italic text-forest">
                {words("Another")}{" "}
                <span className="relative inline-block whitespace-nowrap">
                  {words("monthly payment")}
                  <svg
                    aria-hidden
                    viewBox="0 0 300 20"
                    preserveAspectRatio="none"
                    className="hero-squiggle pointer-events-none absolute -bottom-[0.02em] left-0 h-[0.26em] w-full text-gold"
                  >
                    <path
                      d="M4 13 C 45 5, 75 17, 115 10 S 185 4, 225 11 S 278 9, 296 6"
                      pathLength={1}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </span>
              </HeroLine>
              <HeroLine index={3}>{words("is holding them back.")}</HeroLine>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              When traditional financing doesn&apos;t fit, a Home Equity
              Agreement may give an eligible homeowner another option to
              explore — and give contractors another opportunity to move the
              project forward.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Magnetic className="w-full sm:w-auto">
                <Button href={partnerUrl} external className="w-full sm:w-auto">
                  Become a Partner
                </Button>
              </Magnetic>
              <Button href="/how-heas-work" variant="secondary" className="w-full sm:w-auto">
                Learn How an HEA Works
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted">{partnerTransition}</p>
            <p className="mt-6 text-sm text-ink/80">
              Built for contractors working on real homes and real projects.
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
              {heroTrades.map((trade) => (
                <li
                  key={trade}
                  className="text-sm tracking-tight text-forest before:mr-3 before:text-line before:content-['/'] first:before:mr-0 first:before:content-none"
                >
                  {trade}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] sm:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src="/images/hero.jpg"
                  alt="A contractor reviewing residential floor plans during a project conversation"
                  fill
                  priority
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="hero-photo !inset-auto !bottom-0 !left-0 !h-[175%] !w-full max-w-none object-cover object-bottom"
                />
              </div>
              <div className="hero-card absolute right-4 top-4 z-10 sm:right-5 sm:top-5">
                <RotatingBadge
                  href={partnerUrl}
                  text="Become a partner · Explore the program · "
                  label="Become a Partner (opens the HomeWealthIQ partner experience)"
                />
              </div>
              <div className="hero-card relative z-10 -mt-14 mx-3 rounded-[14px] border border-line bg-paper p-4 shadow-[0_16px_40px_rgba(16,44,38,0.08)] sm:absolute sm:bottom-5 sm:left-5 sm:right-auto sm:mx-0 sm:mt-0 sm:w-[19rem] sm:p-5">
                <p className="eyebrow text-muted">Project status</p>
                <p className="mt-3 text-sm text-ink sm:text-[15px]">
                  Customer wants the project
                </p>
                <p className="mt-1 text-sm text-clay sm:text-[15px]">
                  Funding conversation stalled
                </p>
                <Link
                  href="/how-heas-work"
                  className="group mt-3 flex min-h-11 items-center justify-between border-t border-line pt-2 text-sm font-medium text-forest"
                >
                  Another option to explore
                  <span
                    aria-hidden
                    className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
