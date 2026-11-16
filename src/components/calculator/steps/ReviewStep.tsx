"use client";

import { Pencil } from "lucide-react";
import type { ReactNode } from "react";
import { formatAddress, formatUsd } from "@/lib/calculator/format";
import {
  occupancyOptions,
  optionLabel,
  propertyTypeOptions,
  securedLoanTypeOptions,
  valueSourceOptions,
} from "@/lib/calculator/options";
import type { StepId } from "@/lib/calculator/steps";
import { CheckboxField } from "../fields";
import type { StepProps } from "./shared";

function ReviewSection({
  title,
  step,
  onEdit,
  children,
}: {
  title: string;
  step: StepId;
  onEdit: (step: StepId) => void;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 border-t border-line py-4 first:border-t-0 first:pt-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="min-w-0">
        <dt className="eyebrow text-muted">{title}</dt>
        <dd className="mt-1.5 text-[15px] leading-relaxed text-ink">{children}</dd>
      </div>
      <button
        type="button"
        onClick={() => onEdit(step)}
        className="inline-flex min-h-11 shrink-0 items-center gap-1.5 self-start rounded-[8px] px-2 text-sm font-medium text-blue hover:bg-tint"
      >
        <Pencil className="h-3.5 w-3.5" aria-hidden />
        Edit<span className="sr-only"> {title.toLowerCase()}</span>
      </button>
    </div>
  );
}

export function ReviewStep({
  data,
  errors,
  dispatch,
  onEdit,
}: StepProps & { onEdit: (step: StepId) => void }) {
  const loans = data.hasOtherLoans === "yes" ? data.otherLoans : [];

  return (
    <div className="space-y-8">
      <dl className="rounded-[12px] border border-line p-5 sm:p-6">
        <ReviewSection title="Property address" step="address" onEdit={onEdit}>
          {formatAddress(data.address)}
        </ReviewSection>
        <ReviewSection title="Property" step="property" onEdit={onEdit}>
          {optionLabel(propertyTypeOptions, data.propertyType)} ·{" "}
          {optionLabel(occupancyOptions, data.occupancy)}
        </ReviewSection>
        <ReviewSection title="Estimated home value" step="value" onEdit={onEdit}>
          <span className="tabular-nums">{formatUsd(data.homeValue ?? 0)}</span>
          {data.valueSource ? (
            <span className="text-muted"> · {optionLabel(valueSourceOptions, data.valueSource)}</span>
          ) : null}
        </ReviewSection>
        <ReviewSection title="Mortgage balance" step="mortgage" onEdit={onEdit}>
          {data.hasMortgage === "yes" ? (
            <span className="tabular-nums">{formatUsd(data.mortgageBalance ?? 0)}</span>
          ) : (
            "No mortgage"
          )}
        </ReviewSection>
        <ReviewSection title="Other secured loans" step="other-loans" onEdit={onEdit}>
          {loans.length ? (
            <ul className="space-y-0.5">
              {loans.map((loan) => (
                <li key={loan.id}>
                  {optionLabel(securedLoanTypeOptions, loan.type)}:{" "}
                  <span className="tabular-nums">{formatUsd(loan.balance ?? 0)}</span>
                </li>
              ))}
            </ul>
          ) : (
            "None"
          )}
        </ReviewSection>
        <ReviewSection title="Project" step="project" onEdit={onEdit}>
          {data.projectType}
          {data.projectCost ? (
            <span className="text-muted">
              {" "}· <span className="tabular-nums">{formatUsd(data.projectCost)}</span> estimated
            </span>
          ) : null}
        </ReviewSection>
      </dl>

      <CheckboxField
        name="acknowledged"
        checked={data.acknowledged}
        onChange={(acknowledged) => dispatch({ type: "patch", patch: { acknowledged } })}
        error={errors.acknowledged}
      >
        I understand the result is an informational home equity estimate based
        only on the numbers I entered. It is not an offer of financing, an
        appraisal, or a decision about eligibility.
      </CheckboxField>
    </div>
  );
}
