"use client";

import { occupancyOptions, propertyTypeOptions } from "@/lib/calculator/options";
import { ChoiceGroup } from "../fields";
import type { StepProps } from "./shared";

export function PropertyStep({ data, errors, dispatch }: StepProps) {
  return (
    <div className="space-y-8">
      <ChoiceGroup
        name="propertyType"
        legend="Type of home"
        value={data.propertyType}
        onChange={(propertyType) => dispatch({ type: "patch", patch: { propertyType } })}
        options={propertyTypeOptions}
        error={errors.propertyType}
        columns={3}
      />
      <ChoiceGroup
        name="occupancy"
        legend="How is the home used?"
        value={data.occupancy}
        onChange={(occupancy) => dispatch({ type: "patch", patch: { occupancy } })}
        options={occupancyOptions}
        error={errors.occupancy}
        columns={3}
      />
    </div>
  );
}
