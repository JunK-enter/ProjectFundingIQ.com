"use client";

import { ChoiceGroup, CurrencyField } from "../fields";
import { yesNoOptions, type StepProps } from "./shared";

export function MortgageStep({ data, errors, dispatch }: StepProps) {
  return (
    <div className="space-y-8">
      <ChoiceGroup
        name="hasMortgage"
        legend="Is there a first mortgage on the home?"
        value={data.hasMortgage}
        onChange={(hasMortgage) => dispatch({ type: "patch", patch: { hasMortgage } })}
        options={yesNoOptions}
        error={errors.hasMortgage}
        className="max-w-md"
      />
      {data.hasMortgage === "yes" ? (
        <CurrencyField
          name="mortgageBalance"
          label="Current mortgage balance"
          hint="The remaining principal on a recent statement."
          value={data.mortgageBalance}
          onChange={(mortgageBalance) => dispatch({ type: "patch", patch: { mortgageBalance } })}
          error={errors.mortgageBalance}
          className="max-w-md"
        />
      ) : null}
    </div>
  );
}
