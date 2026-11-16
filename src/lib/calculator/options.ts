import { marqueeTrades } from "@/content/site";
import type {
  Occupancy,
  PropertyType,
  SecuredLoanType,
  ValueSource,
} from "./types";

type Option<T extends string> = { value: T; label: string; hint?: string };

export const propertyTypeOptions: Option<PropertyType>[] = [
  { value: "single-family", label: "Single-family home" },
  { value: "townhouse", label: "Townhouse" },
  { value: "condo", label: "Condominium" },
  { value: "multi-unit", label: "2–4 unit property" },
  { value: "manufactured", label: "Manufactured home" },
];

export const occupancyOptions: Option<Occupancy>[] = [
  { value: "primary", label: "Primary residence", hint: "The owner lives here most of the year." },
  { value: "second-home", label: "Second home", hint: "A vacation or part-time residence." },
  { value: "investment", label: "Rental or investment", hint: "The home is rented to others." },
];

export const valueSourceOptions: Option<ValueSource>[] = [
  { value: "appraisal", label: "A recent appraisal" },
  { value: "online-estimate", label: "An online estimate" },
  { value: "recent-sales", label: "Recent nearby sales" },
  { value: "best-guess", label: "My best guess" },
];

export const securedLoanTypeOptions: Option<SecuredLoanType>[] = [
  { value: "heloc", label: "HELOC" },
  { value: "home-equity-loan", label: "Home equity loan" },
  { value: "second-mortgage", label: "Second mortgage" },
  { value: "solar-or-pace", label: "Solar or PACE lien" },
  { value: "other", label: "Other secured loan" },
];

export const projectTypeOptions: Option<string>[] = [
  ...marqueeTrades.map((trade) => ({ value: trade, label: trade })),
  { value: "Not sure yet", label: "Not sure yet" },
];

export const usStates: Option<string>[] = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"],
  ["CA", "California"], ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"],
  ["DC", "District of Columbia"], ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"],
  ["ID", "Idaho"], ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"],
  ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"],
  ["MD", "Maryland"], ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"],
  ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"],
  ["NV", "Nevada"], ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"],
  ["NY", "New York"], ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"],
  ["OK", "Oklahoma"], ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"],
  ["SC", "South Carolina"], ["SD", "South Dakota"], ["TN", "Tennessee"], ["TX", "Texas"],
  ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"], ["WA", "Washington"],
  ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"],
].map(([value, label]) => ({ value, label }));

export function optionLabel<T extends string>(
  options: Option<T>[],
  value: T | "",
) {
  return options.find((option) => option.value === value)?.label ?? "";
}
