export type YesNo = "yes" | "no";

export type PropertyType =
  | "single-family"
  | "townhouse"
  | "condo"
  | "multi-unit"
  | "manufactured";

export type Occupancy = "primary" | "second-home" | "investment";

export type ValueSource =
  | "appraisal"
  | "online-estimate"
  | "recent-sales"
  | "best-guess";

export type SecuredLoanType =
  | "heloc"
  | "home-equity-loan"
  | "second-mortgage"
  | "solar-or-pace"
  | "other";

export type SecuredLoan = {
  id: string;
  type: SecuredLoanType | "";
  balance: number | null;
};

export type PropertyAddress = {
  street: string;
  unit: string;
  city: string;
  state: string;
  zip: string;
};

export type CalculatorData = {
  address: PropertyAddress;
  propertyType: PropertyType | "";
  occupancy: Occupancy | "";
  homeValue: number | null;
  valueSource: ValueSource | "";
  hasMortgage: YesNo | "";
  mortgageBalance: number | null;
  hasOtherLoans: YesNo | "";
  otherLoans: SecuredLoan[];
  projectType: string;
  projectCost: number | null;
  acknowledged: boolean;
};

export const emptyCalculatorData: CalculatorData = {
  address: { street: "", unit: "", city: "", state: "", zip: "" },
  propertyType: "",
  occupancy: "",
  homeValue: null,
  valueSource: "",
  hasMortgage: "",
  mortgageBalance: null,
  hasOtherLoans: "",
  otherLoans: [],
  projectType: "",
  projectCost: null,
  acknowledged: false,
};

/** Field keys use dot paths, e.g. `address.zip` or `otherLoans.<id>.balance`. */
export type FieldErrors = Record<string, string>;
