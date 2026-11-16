import type { Dispatch } from "react";
import type { CalculatorAction } from "@/lib/calculator/state";
import type { CalculatorData, FieldErrors } from "@/lib/calculator/types";

export type StepProps = {
  data: CalculatorData;
  errors: FieldErrors;
  dispatch: Dispatch<CalculatorAction>;
};

export const yesNoOptions = [
  { value: "yes" as const, label: "Yes" },
  { value: "no" as const, label: "No" },
];

export const actionButton = {
  base: "group inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] px-5 text-[15px] font-medium tracking-tight transition-[color,background-color,border-color,transform,box-shadow] duration-300 ease-out focus-visible:outline-offset-3 disabled:cursor-not-allowed disabled:opacity-60",
  primary:
    "bg-blue text-white hover:bg-navy motion-safe:hover:-translate-y-px motion-safe:hover:shadow-[0_10px_24px_rgba(15,30,70,0.12)]",
  secondary:
    "border border-blue/25 bg-transparent text-blue hover:border-blue hover:bg-surface",
  quiet: "text-blue hover:bg-tint",
};
