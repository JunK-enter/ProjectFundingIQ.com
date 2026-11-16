"use client";

import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useReducer, useRef, useState, type FormEvent } from "react";
import { calculateHomeEquity, equityInputsFrom } from "@/lib/calculator/equity";
import {
  manualIntegrations,
  type CalculatorIntegrations,
} from "@/lib/calculator/integrations";
import { calculatorReducer } from "@/lib/calculator/state";
import { calculatorSteps, stepIndex, type StepId } from "@/lib/calculator/steps";
import { emptyCalculatorData } from "@/lib/calculator/types";
import { firstInvalidStep, validateStep } from "@/lib/calculator/validation";
import { fieldId } from "./fields";
import { StepProgress } from "./StepProgress";
import { AddressStep } from "./steps/AddressStep";
import { MortgageStep } from "./steps/MortgageStep";
import { OtherLoansStep } from "./steps/OtherLoansStep";
import { ProjectStep } from "./steps/ProjectStep";
import { PropertyStep } from "./steps/PropertyStep";
import { ResultStep } from "./steps/ResultStep";
import { ReviewStep } from "./steps/ReviewStep";
import { actionButton } from "./steps/shared";
import { ValueStep } from "./steps/ValueStep";

const REVIEW = stepIndex("review");
const RESULT = stepIndex("result");
const HEADER_OFFSET = 96;

export function Calculator({
  integrations = manualIntegrations,
}: {
  integrations?: CalculatorIntegrations;
}) {
  const [data, dispatch] = useReducer(calculatorReducer, emptyCalculatorData);
  const [current, setCurrent] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const [attempted, setAttempted] = useState<Partial<Record<StepId, boolean>>>({});
  const [returnToReview, setReturnToReview] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const lenis = useLenis();
  const reduce = useReducedMotion();

  const step = calculatorSteps[current];
  const errors = useMemo(() => validateStep(step.id, data), [step.id, data]);
  const visibleErrors = attempted[step.id] ? errors : {};

  const estimate = useMemo(() => {
    const inputs = equityInputsFrom(data);
    return inputs ? calculateHomeEquity(inputs) : null;
  }, [data]);

  useEffect(() => {
    if (!moved.current) return;
    headingRef.current?.focus({ preventScroll: true });
    const root = rootRef.current;
    if (!root) return;
    const top = root.getBoundingClientRect().top;
    if (top >= HEADER_OFFSET && top < window.innerHeight * 0.4) return;
    const target = top + window.scrollY - HEADER_OFFSET;
    if (lenis) lenis.scrollTo(target, { duration: reduce ? 0 : 0.7 });
    else window.scrollTo({ top: target, behavior: reduce ? "auto" : "smooth" });
  }, [current, lenis, reduce]);

  const goTo = (index: number) => {
    moved.current = true;
    setCurrent(index);
    setFurthest((value) => Math.max(value, index));
    setAnnouncement("");
  };

  const focusFirstError = (keys: string[]) => {
    const count = keys.length;
    setAnnouncement(
      `${count} ${count === 1 ? "answer needs" : "answers need"} attention before you continue.`,
    );
    requestAnimationFrame(() => {
      document.getElementById(fieldId(keys[0]))?.focus();
    });
  };

  const finish = () => {
    const invalid = firstInvalidStep(calculatorSteps.slice(0, REVIEW), data);
    if (invalid) {
      setAttempted((value) => ({ ...value, [invalid.id]: true }));
      setReturnToReview(true);
      goTo(stepIndex(invalid.id));
      return;
    }
    goTo(RESULT);
    if (estimate && integrations.submission.submit) {
      void integrations.submission.submit({ data, estimate }).catch(() => {});
    }
  };

  const onContinue = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const keys = Object.keys(errors);
    if (keys.length) {
      setAttempted((value) => ({ ...value, [step.id]: true }));
      focusFirstError(keys);
      return;
    }
    if (step.id === "review") {
      finish();
    } else if (returnToReview) {
      setReturnToReview(false);
      goTo(REVIEW);
    } else {
      goTo(current + 1);
    }
  };

  const onBack = () => {
    setReturnToReview(false);
    goTo(Math.max(0, current - 1));
  };

  const editStep = (id: StepId) => {
    setReturnToReview(true);
    goTo(stepIndex(id));
  };

  const reset = () => {
    dispatch({ type: "reset" });
    setAttempted({});
    setReturnToReview(false);
    setFurthest(0);
    goTo(0);
  };

  const canVisit = (index: number) =>
    index <= furthest && (index < RESULT || current === REVIEW || furthest === RESULT);

  const stepProps = { data, errors: visibleErrors, dispatch };
  const isResult = step.id === "result";

  return (
    <div ref={rootRef} className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <aside className="lg:col-span-4 xl:col-span-3">
        <div className="lg:sticky lg:top-28">
          <StepProgress
            current={current}
            canVisit={canVisit}
            onSelect={(index) => (index === RESULT ? finish() : goTo(index))}
          />
          <p className="mt-8 hidden gap-2.5 text-sm leading-relaxed text-muted lg:flex">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue" aria-hidden />
            Your answers stay in this browser tab. Nothing is sent or saved.
          </p>
        </div>
      </aside>

      <div className="lg:col-span-8 xl:col-span-9">
        <form
          noValidate
          onSubmit={onContinue}
          aria-labelledby="calc-step-title"
          className="rounded-[16px] border border-line bg-white p-5 shadow-[0_24px_60px_-30px_rgba(12,26,51,0.25)] sm:p-8 lg:p-10"
        >
          <p className="eyebrow text-blue">
            Step {current + 1} of {calculatorSteps.length}
          </p>
          <h2
            id="calc-step-title"
            ref={headingRef}
            tabIndex={-1}
            className="mt-3 font-serif text-[1.9rem] leading-[1.15] text-ink outline-none sm:text-4xl"
          >
            {step.title}
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">{step.description}</p>
          <p className="sr-only" role="status" aria-live="polite">
            {announcement}
          </p>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step.id}
              className="mt-8"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {step.id === "address" ? (
                <AddressStep {...stepProps} addressProvider={integrations.address} />
              ) : step.id === "property" ? (
                <PropertyStep {...stepProps} />
              ) : step.id === "value" ? (
                <ValueStep {...stepProps} valuationProvider={integrations.valuation} />
              ) : step.id === "mortgage" ? (
                <MortgageStep {...stepProps} />
              ) : step.id === "other-loans" ? (
                <OtherLoansStep {...stepProps} />
              ) : step.id === "project" ? (
                <ProjectStep {...stepProps} />
              ) : step.id === "review" ? (
                <ReviewStep {...stepProps} onEdit={editStep} />
              ) : estimate ? (
                <ResultStep
                  data={data}
                  estimate={estimate}
                  onEdit={() => goTo(REVIEW)}
                  onReset={reset}
                />
              ) : null}
            </motion.div>
          </AnimatePresence>

          {isResult ? null : (
            <div className="mt-10 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              {current > 0 ? (
                <button
                  type="button"
                  onClick={onBack}
                  className={`${actionButton.base} ${actionButton.secondary}`}
                >
                  <ArrowLeft
                    className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:-translate-x-0.5"
                    aria-hidden
                  />
                  Back
                </button>
              ) : (
                <span className="hidden sm:block" />
              )}
              <button type="submit" className={`${actionButton.base} ${actionButton.primary}`}>
                {step.id === "review"
                  ? "See my estimate"
                  : returnToReview
                    ? "Save and review"
                    : "Continue"}
                <ArrowRight
                  className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
                  aria-hidden
                />
              </button>
            </div>
          )}
        </form>

        <p className="mt-5 flex gap-2.5 text-sm leading-relaxed text-muted lg:hidden">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue" aria-hidden />
          Your answers stay in this browser tab. Nothing is sent or saved.
        </p>
      </div>
    </div>
  );
}
