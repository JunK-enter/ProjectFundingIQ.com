import { Calculator } from "lucide-react";
import { equityCalculatorTransition, equityCalculatorUrl } from "@/content/site";
import { Button } from "./Button";
import { Container } from "./Container";
import { Magnetic } from "./Magnetic";
import { Reveal } from "./Reveal";

const formula = [
  { sign: "", label: "Home value", dot: "bg-ink/15", width: "w-full" },
  { sign: "−", label: "Mortgage balance", dot: "bg-navy", width: "w-[58%]" },
  { sign: "−", label: "Other secured loans", dot: "bg-sky", width: "w-[12%]" },
];

export function EquityCalculatorCTA() {
  return (
    <section
      id="home-equity-calculator"
      className="relative isolate overflow-clip bg-gradient-to-br from-brand-from via-brand-via to-[#1a47b8] py-20 text-white md:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-sky/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-24 -z-10 h-[24rem] w-[24rem] rounded-full bg-navy/40 blur-3xl"
      />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-white">
              <Calculator className="h-4 w-4" aria-hidden />
              <span className="eyebrow">Home equity calculator</span>
            </p>
            <h2 className="mt-5 font-serif text-[2.4rem] leading-[1.08] text-balance sm:text-5xl lg:text-[3.4rem]">
              How much equity is in the home?
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
              Start with a home value and the balances secured against it to
              see a simple, informational estimate of home equity.
            </p>
            <div className="mt-9">
              <Magnetic className="w-full sm:w-auto">
                <Button
                  href={equityCalculatorUrl}
                  external
                  externalLabel="opens the Barastone home equity calculator"
                  variant="inverse"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Explore Your Home Equity
                </Button>
              </Magnetic>
            </div>
            <p className="mt-5 text-sm text-white/75">{equityCalculatorTransition}</p>
          </Reveal>

          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <div
              aria-hidden
              className="rounded-[18px] bg-white p-6 text-ink shadow-[0_40px_80px_-30px_rgba(8,20,50,0.55)] sm:p-8 motion-safe:transition-transform motion-safe:duration-500 lg:rotate-[1.5deg] lg:hover:rotate-0"
            >
              <div className="flex items-center justify-between">
                <p className="eyebrow text-blue">How it’s calculated</p>
                <span className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-blue" />
                </span>
              </div>
              <ul className="mt-6 space-y-4">
                {formula.map((row) => (
                  <li key={row.label}>
                    <div className="flex items-center gap-3 text-[15px]">
                      <span className="w-4 text-center font-serif text-xl text-muted">{row.sign}</span>
                      {row.label}
                    </div>
                    <div className="ml-7 mt-2 h-2 rounded-full bg-surface">
                      <div className={`h-full rounded-full ${row.dot} ${row.width}`} />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-[12px] bg-tint p-4">
                <p className="flex items-center gap-3 font-serif text-2xl text-blue">
                  <span className="w-4 text-center">=</span>
                  Estimated home equity
                </p>
                <div className="ml-7 mt-3 h-2.5 rounded-full bg-white">
                  <div className="h-full w-[30%] rounded-full bg-blue" />
                </div>
              </div>
              <p className="mt-5 text-sm text-muted">
                An estimate from your own numbers, not an offer of financing.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
