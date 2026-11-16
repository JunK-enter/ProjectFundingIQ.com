"use client";

import { Info, RotateCcw, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/Button";
import { NumberTicker } from "@/components/velora/number-ticker";
import type { EquityEstimate } from "@/lib/calculator/equity";
import { formatAddress, formatPercent, formatUsd } from "@/lib/calculator/format";
import type { CalculatorData } from "@/lib/calculator/types";
import { actionButton } from "./shared";

function EquityBar({ estimate }: { estimate: EquityEstimate }) {
  const reduce = useReducedMotion();
  const base = Math.max(estimate.homeValue, estimate.totalSecuredBalance, 1);
  const segments = [
    { key: "mortgage", label: "Mortgage", amount: estimate.mortgageBalance, color: "bg-navy" },
    { key: "other", label: "Other secured loans", amount: estimate.otherSecuredLoans, color: "bg-sky" },
    { key: "equity", label: "Estimated equity", amount: estimate.equity, color: "bg-blue" },
  ].filter((segment) => segment.amount > 0);

  return (
    <figure>
      <div
        role="img"
        aria-label={`Of the ${formatUsd(estimate.homeValue)} home value entered, ${formatUsd(estimate.totalSecuredBalance)} is secured balances and ${formatUsd(estimate.equity)} is estimated equity.`}
        className="flex h-4 overflow-hidden rounded-full bg-line"
      >
        {segments.map((segment, index) => (
          <motion.div
            key={segment.key}
            className={`${segment.color} h-full`}
            initial={{ width: 0 }}
            animate={{ width: `${(segment.amount / base) * 100}%` }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.9, delay: 0.15 + index * 0.12, ease: [0.22, 1, 0.36, 1] }
            }
          />
        ))}
      </div>
      <figcaption className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted">
        {segments.map((segment) => (
          <span key={segment.key} className="inline-flex items-center gap-2">
            <span aria-hidden className={`h-2.5 w-2.5 rounded-full ${segment.color}`} />
            {segment.label}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}

function BreakdownRow({
  label,
  amount,
  sign,
  emphasis = false,
}: {
  label: string;
  amount: number;
  sign?: "−" | "=";
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-4 py-3 ${
        emphasis ? "border-t-2 border-ink/80" : "border-t border-line first:border-t-0"
      }`}
    >
      <dt className={emphasis ? "font-medium text-ink" : "text-muted"}>
        {sign ? (
          <span aria-hidden className="mr-2 inline-block w-3 text-center text-ink/50">
            {sign}
          </span>
        ) : (
          <span aria-hidden className="mr-2 inline-block w-3" />
        )}
        {label}
      </dt>
      <dd
        className={`tabular-nums ${emphasis ? "font-serif text-2xl text-blue" : "text-ink"}`}
      >
        {formatUsd(amount)}
      </dd>
    </div>
  );
}

export function ResultStep({
  data,
  estimate,
  onEdit,
  onReset,
}: {
  data: CalculatorData;
  estimate: EquityEstimate;
  onEdit: () => void;
  onReset: () => void;
}) {
  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-[14px] bg-navy p-6 text-white sm:p-8">
        <p className="eyebrow text-sky">Estimated home equity</p>
        <p className="mt-3 font-serif text-[3rem] leading-none tracking-tight sm:text-[4.25rem]">
          <NumberTicker value={estimate.equity} prefix="$" />
        </p>
        <p className="mt-4 max-w-xl text-white/80">
          About {formatPercent(estimate.equityPercent)} of the home value you
          entered for {formatAddress(data.address)}.
        </p>
      </div>

      <EquityBar estimate={estimate} />

      {estimate.balancesExceedValue ? (
        <p className="flex gap-3 rounded-[12px] bg-surface p-4 text-[15px] leading-relaxed text-ink">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue" aria-hidden />
          The balances you entered meet or exceed the home value you entered,
          so the estimate shows $0 in equity. Double-check the numbers, or edit
          your answers below.
        </p>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-2">
        <section aria-labelledby="calc-breakdown">
          <h3 id="calc-breakdown" className="font-serif text-2xl text-ink">
            How the estimate is calculated
          </h3>
          <dl className="mt-4">
            <BreakdownRow label="Home value you entered" amount={estimate.homeValue} />
            <BreakdownRow label="Mortgage balance" amount={estimate.mortgageBalance} sign="−" />
            <BreakdownRow label="Other secured loans" amount={estimate.otherSecuredLoans} sign="−" />
            <BreakdownRow label="Estimated home equity" amount={estimate.equity} sign="=" emphasis />
          </dl>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Secured balances total{" "}
            <span className="tabular-nums text-ink">{formatUsd(estimate.totalSecuredBalance)}</span>,
            or {formatPercent(estimate.combinedLoanToValuePercent)} of the home
            value entered (combined loan-to-value). Equity is never shown below $0.
          </p>
        </section>

        <section
          aria-labelledby="calc-disclaimer"
          className="rounded-[12px] border-l-4 border-blue bg-tint p-5 sm:p-6"
        >
          <h3 id="calc-disclaimer" className="font-serif text-2xl text-ink">
            An estimate, not an offer
          </h3>
          <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-ink/85">
            <p>
              This is an informational home equity estimate based only on the
              numbers you entered. It is not an offer of financing, an
              appraisal, a credit decision, or a statement of how much funding
              may be available.
            </p>
            <p>
              Home Equity Agreement providers set their own eligibility rules,
              valuation methods, amounts, fees, and settlement terms. Only a
              provider’s own review and agreement can describe those.
            </p>
          </div>
        </section>
      </div>

      <p className="flex gap-3 text-sm leading-relaxed text-muted">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue" aria-hidden />
        Your answers were not sent or saved anywhere. Refreshing or leaving this
        page clears them.
      </p>

      <div className="border-t border-line pt-8">
        <h3 className="font-serif text-2xl text-ink">Keep learning</h3>
        <p className="mt-2 max-w-xl text-muted">
          Understand how a Home Equity Agreement works before talking with a
          provider.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href="/how-heas-work" className="w-full sm:w-auto">
            Learn How an HEA Works
          </Button>
          <Button href="/resources/hea-vs-heloc" variant="secondary" className="w-full sm:w-auto">
            Compare an HEA and a HELOC
          </Button>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={onReset}
          className={`${actionButton.base} ${actionButton.quiet}`}
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          Start over
        </button>
        <button
          type="button"
          onClick={onEdit}
          className={`${actionButton.base} ${actionButton.secondary}`}
        >
          Edit answers
        </button>
      </div>
    </div>
  );
}
