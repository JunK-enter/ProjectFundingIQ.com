"use client";

import { Plus, Trash2 } from "lucide-react";
import { securedLoanTypeOptions } from "@/lib/calculator/options";
import type { SecuredLoanType } from "@/lib/calculator/types";
import { ChoiceGroup, CurrencyField, FieldError, SelectField, fieldId } from "../fields";
import { actionButton, yesNoOptions, type StepProps } from "./shared";

const MAX_LOANS = 6;

let loanCount = 0;
const nextLoanId = () => `loan-${Date.now().toString(36)}-${(loanCount += 1)}`;

export function OtherLoansStep({ data, errors, dispatch }: StepProps) {
  const addLoan = () => dispatch({ type: "add-loan", id: nextLoanId() });

  return (
    <div className="space-y-8">
      <ChoiceGroup
        name="hasOtherLoans"
        legend="Any other loans or liens secured by the home?"
        hint="For example a HELOC, a home equity loan, a second mortgage, or a solar or PACE lien."
        value={data.hasOtherLoans}
        onChange={(hasOtherLoans) => {
          dispatch({ type: "patch", patch: { hasOtherLoans } });
          if (hasOtherLoans === "yes" && !data.otherLoans.length) addLoan();
        }}
        options={yesNoOptions}
        error={errors.hasOtherLoans}
        className="max-w-md"
      />

      {data.hasOtherLoans === "yes" ? (
        <div>
          <ol className="space-y-4">
            {data.otherLoans.map((loan, index) => (
              <li
                key={loan.id}
                className="grid gap-4 rounded-[12px] border border-line bg-surface/60 p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-start sm:p-5"
              >
                <SelectField
                  name={`otherLoans.${loan.id}.type`}
                  label={`Loan ${index + 1} type`}
                  value={loan.type}
                  onChange={(type) =>
                    dispatch({
                      type: "update-loan",
                      id: loan.id,
                      patch: { type: type as SecuredLoanType },
                    })
                  }
                  options={securedLoanTypeOptions}
                  placeholder="Choose a type"
                  error={errors[`otherLoans.${loan.id}.type`]}
                />
                <CurrencyField
                  name={`otherLoans.${loan.id}.balance`}
                  label="Current balance"
                  value={loan.balance}
                  onChange={(balance) =>
                    dispatch({ type: "update-loan", id: loan.id, patch: { balance } })
                  }
                  error={errors[`otherLoans.${loan.id}.balance`]}
                />
                <button
                  type="button"
                  onClick={() => dispatch({ type: "remove-loan", id: loan.id })}
                  className={`${actionButton.base} ${actionButton.quiet} sm:mt-7 sm:px-3`}
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                  <span className="sm:sr-only">Remove loan {index + 1}</span>
                </button>
              </li>
            ))}
          </ol>
          <div id={fieldId("otherLoans")} tabIndex={-1} className="outline-none">
            <FieldError id={`${fieldId("otherLoans")}-error`} message={errors.otherLoans} />
          </div>
          {data.otherLoans.length < MAX_LOANS ? (
            <button
              type="button"
              onClick={addLoan}
              className={`${actionButton.base} ${actionButton.secondary} mt-4`}
            >
              <Plus className="h-4 w-4" aria-hidden />
              {data.otherLoans.length ? "Add another loan" : "Add a loan"}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
