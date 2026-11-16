import type { EquityEstimate } from "./equity";
import type { CalculatorData, PropertyAddress } from "./types";

/*
 * Extension points for paid services (address autocomplete, valuation, CRM).
 * The site is a static export, so any provider plugged in here must run in the
 * browser or call an external endpoint. Each capability is optional; when it
 * is missing the calculator falls back to manual entry and sends nothing.
 */

export type AddressSuggestion = {
  id: string;
  label: string;
  address: PropertyAddress;
};

export type AddressProvider = {
  suggest?: (query: string, signal: AbortSignal) => Promise<AddressSuggestion[]>;
};

export type ValuationResult = { value: number; sourceLabel: string };

export type ValuationProvider = {
  estimate?: (address: PropertyAddress) => Promise<ValuationResult | null>;
};

export type CalculatorSubmission = {
  data: CalculatorData;
  estimate: EquityEstimate;
};

export type SubmissionHandler = {
  /** Called once when the result step is reached. Must not throw. */
  submit?: (submission: CalculatorSubmission) => Promise<void>;
};

export type CalculatorIntegrations = {
  address: AddressProvider;
  valuation: ValuationProvider;
  submission: SubmissionHandler;
};

export const manualIntegrations: CalculatorIntegrations = {
  address: {},
  valuation: {},
  submission: {},
};
