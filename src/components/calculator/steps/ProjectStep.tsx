"use client";

import { projectTypeOptions } from "@/lib/calculator/options";
import { ChoiceGroup, CurrencyField } from "../fields";
import type { StepProps } from "./shared";

export function ProjectStep({ data, errors, dispatch }: StepProps) {
  return (
    <div className="space-y-8">
      <ChoiceGroup
        name="projectType"
        legend="Type of project"
        value={data.projectType}
        onChange={(projectType) => dispatch({ type: "patch", patch: { projectType } })}
        options={projectTypeOptions}
        error={errors.projectType}
        columns={3}
      />
      <CurrencyField
        name="projectCost"
        label="Estimated project cost"
        optional
        hint="From an estimate or proposal, if there is one."
        value={data.projectCost}
        onChange={(projectCost) => dispatch({ type: "patch", patch: { projectCost } })}
        error={errors.projectCost}
        className="max-w-md"
      />
    </div>
  );
}
