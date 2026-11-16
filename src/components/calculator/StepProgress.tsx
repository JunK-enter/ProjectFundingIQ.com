"use client";

import { Check } from "lucide-react";
import { calculatorSteps } from "@/lib/calculator/steps";

export function StepProgress({
  current,
  canVisit,
  onSelect,
}: {
  current: number;
  canVisit: (index: number) => boolean;
  onSelect: (index: number) => void;
}) {
  const total = calculatorSteps.length;
  const percent = ((current + 1) / total) * 100;

  return (
    <nav aria-label="Calculator progress">
      <div className="lg:hidden">
        <div className="flex items-baseline justify-between gap-4 text-sm">
          <span className="font-medium text-ink">
            Step {current + 1} of {total}
          </span>
          <span className="text-muted">{calculatorSteps[current].label}</span>
        </div>
        <div
          role="progressbar"
          aria-label="Calculator progress"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={current + 1}
          aria-valuetext={`Step ${current + 1} of ${total}: ${calculatorSteps[current].label}`}
          className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-line"
        >
          <div
            className="h-full rounded-full bg-blue transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <ol className="hidden lg:block">
        {calculatorSteps.map((step, index) => {
          const state =
            index < current ? "complete" : index === current ? "current" : "upcoming";
          const clickable = index !== current && canVisit(index);
          const body = (
            <>
              <span
                aria-hidden
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium tabular-nums transition-colors duration-300 ${
                  state === "complete"
                    ? "bg-blue text-white"
                    : state === "current"
                      ? "border-2 border-blue bg-white text-blue"
                      : "border border-line bg-white text-muted"
                }`}
              >
                {state === "complete" ? <Check className="h-4 w-4" strokeWidth={2.5} /> : index + 1}
              </span>
              <span
                className={`text-[15px] ${
                  state === "current" ? "font-medium text-ink" : state === "complete" ? "text-ink" : "text-muted"
                }`}
              >
                {step.label}
                <span className="sr-only">
                  {state === "complete" ? " (completed)" : state === "upcoming" ? " (not started)" : ""}
                </span>
              </span>
            </>
          );

          return (
            <li key={step.id} className="relative pb-5 last:pb-0">
              {index < total - 1 ? (
                <span
                  aria-hidden
                  className={`absolute bottom-0 left-4 top-9 w-px transition-colors duration-300 ${
                    index < current ? "bg-blue" : "bg-line"
                  }`}
                />
              ) : null}
              {clickable ? (
                <button
                  type="button"
                  onClick={() => onSelect(index)}
                  className="-mx-2 flex w-[calc(100%+1rem)] items-center gap-3 rounded-[10px] px-2 py-0.5 text-left hover:bg-tint"
                >
                  {body}
                </button>
              ) : (
                <div
                  aria-current={state === "current" ? "step" : undefined}
                  className="flex items-center gap-3 py-0.5"
                >
                  {body}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
