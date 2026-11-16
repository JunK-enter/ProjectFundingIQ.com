"use client";

import { Lightbulb, Loader2 } from "lucide-react";
import { useState } from "react";
import type { ValuationProvider } from "@/lib/calculator/integrations";
import { valueSourceOptions } from "@/lib/calculator/options";
import { ChoiceGroup, CurrencyField } from "../fields";
import { actionButton, type StepProps } from "./shared";

function ValuationLookup({
  estimate,
  onResult,
  address,
}: {
  estimate: NonNullable<ValuationProvider["estimate"]>;
  onResult: (value: number) => void;
  address: StepProps["data"]["address"];
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "empty">("idle");

  const lookup = async () => {
    setStatus("loading");
    try {
      const result = await estimate(address);
      if (result) {
        onResult(result.value);
        setStatus("idle");
      } else {
        setStatus("empty");
      }
    } catch {
      setStatus("empty");
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => void lookup()}
        disabled={status === "loading"}
        className={`${actionButton.base} ${actionButton.secondary}`}
      >
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
        Look up an estimated value
      </button>
      <p className="text-sm text-muted" aria-live="polite">
        {status === "empty" ? "No estimate was found. Enter a value instead." : null}
      </p>
    </div>
  );
}

export function ValueStep({
  data,
  errors,
  dispatch,
  valuationProvider,
}: StepProps & { valuationProvider: ValuationProvider }) {
  return (
    <div className="space-y-8">
      <CurrencyField
        name="homeValue"
        label="Estimated home value"
        size="lg"
        value={data.homeValue}
        onChange={(homeValue) => dispatch({ type: "patch", patch: { homeValue } })}
        error={errors.homeValue}
        className="max-w-md"
      />
      {valuationProvider.estimate ? (
        <ValuationLookup
          estimate={valuationProvider.estimate}
          address={data.address}
          onResult={(homeValue) =>
            dispatch({ type: "patch", patch: { homeValue, valueSource: "online-estimate" } })
          }
        />
      ) : null}
      <ChoiceGroup
        name="valueSource"
        legend="Where does this number come from?"
        hint="Optional. It helps you remember how solid the number is."
        value={data.valueSource}
        onChange={(valueSource) => dispatch({ type: "patch", patch: { valueSource } })}
        options={valueSourceOptions}
      />
      <aside className="flex gap-3 rounded-[12px] bg-surface p-4 text-sm leading-relaxed text-muted">
        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-blue" aria-hidden />
        <p>
          Not sure? A recent appraisal, an online estimate, or the sale prices
          of similar homes nearby can be a starting point. A county assessed
          value is often different from market value.
        </p>
      </aside>
    </div>
  );
}
