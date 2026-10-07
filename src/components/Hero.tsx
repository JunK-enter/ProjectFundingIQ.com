import Image from "next/image";
import Link from "next/link";
import { heroTrades, partnerTransition, partnerUrl } from "@/content/site";
import { Button } from "./Button";
import { Container } from "./Container";

export function Hero() {
  return (
    <section className="pb-16 pt-6 sm:pb-20 sm:pt-8 lg:pb-24 lg:pt-10">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <p className="eyebrow text-forest">
              Funding conversations for home improvement
            </p>
            <h1 className="mt-4 font-serif text-[2.05rem] leading-[1.14] text-balance text-ink sm:text-5xl lg:text-[3.15rem]">
              Your customer wants the project.{" "}
              <span className="mt-1 block">
                <span className="italic">Another monthly payment</span> is
                holding them back.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              When traditional financing doesn&apos;t fit, a Home Equity
              Agreement may give an eligible homeowner another option to
              explore — and give contractors another opportunity to move the
              project forward.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={partnerUrl} external className="w-full sm:w-auto">
                Become a Partner
              </Button>
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
          <div className="lg:col-span-6">
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
                  className="group mt-3 flex items-center justify-between border-t border-line pt-3 text-sm font-medium text-forest"
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
