import { usStates } from "./options";
import type { StepId } from "./steps";
import type { CalculatorData, FieldErrors } from "./types";

export const MIN_HOME_VALUE = 10_000;
export const MAX_AMOUNT = 100_000_000;

const ZIP_PATTERN = /^\d{5}(-\d{4})?$/;

function amountError(
  value: number | null,
  { label, min = 1 }: { label: string; min?: number },
) {
  if (value == null) return `Enter ${label}.`;
  if (value < min) {
    return min > 1
      ? `Enter at least $${min.toLocaleString("en-US")}.`
      : `Enter an amount greater than $0.`;
  }
  if (value > MAX_AMOUNT) return "Enter an amount under $100,000,000.";
  return null;
}

export function validateStep(step: StepId, data: CalculatorData): FieldErrors {
  const errors: FieldErrors = {};
  const set = (key: string, message: string | null) => {
    if (message) errors[key] = message;
  };

  switch (step) {
    case "address": {
      const { street, city, state, zip } = data.address;
      set("address.street", street.trim().length < 3 ? "Enter the street address." : null);
      set("address.city", city.trim().length < 2 ? "Enter the city." : null);
      set(
        "address.state",
        usStates.some((option) => option.value === state) ? null : "Choose a state.",
      );
      set(
        "address.zip",
        ZIP_PATTERN.test(zip.trim()) ? null : "Enter a 5-digit ZIP code.",
      );
      break;
    }
    case "property":
      set("propertyType", data.propertyType ? null : "Choose the type of home.");
      set("occupancy", data.occupancy ? null : "Choose how the home is used.");
      break;
    case "value":
      set(
        "homeValue",
        amountError(data.homeValue, { label: "an estimated home value", min: MIN_HOME_VALUE }),
      );
      break;
    case "mortgage":
      set("hasMortgage", data.hasMortgage ? null : "Choose yes or no.");
      if (data.hasMortgage === "yes") {
        set(
          "mortgageBalance",
          data.mortgageBalance === 0
            ? "If the mortgage is paid off, choose No."
            : amountError(data.mortgageBalance, { label: "the mortgage balance" }),
        );
      }
      break;
    case "other-loans":
      set("hasOtherLoans", data.hasOtherLoans ? null : "Choose yes or no.");
      if (data.hasOtherLoans === "yes") {
        if (!data.otherLoans.length) {
          set("otherLoans", "Add at least one loan, or choose No.");
        }
        for (const loan of data.otherLoans) {
          set(`otherLoans.${loan.id}.type`, loan.type ? null : "Choose the loan type.");
          set(
            `otherLoans.${loan.id}.balance`,
            amountError(loan.balance, { label: "the balance" }),
          );
        }
      }
      break;
    case "project":
      set("projectType", data.projectType ? null : "Choose a project type.");
      if (data.projectCost != null) {
        set(
          "projectCost",
          data.projectCost > MAX_AMOUNT ? "Enter an amount under $100,000,000." : null,
        );
      }
      break;
    case "review":
      set(
        "acknowledged",
        data.acknowledged ? null : "Confirm that you understand this is an informational estimate.",
      );
      break;
    case "result":
      break;
  }

  return errors;
}

export function firstInvalidStep(
  steps: readonly { id: StepId }[],
  data: CalculatorData,
) {
  return steps.find((step) => Object.keys(validateStep(step.id, data)).length);
}
