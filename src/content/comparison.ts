export const comparisonColumns = [
  {
    id: "hea",
    label: "HEA",
    detail: "Home Equity Agreement",
  },
  {
    id: "heloc",
    label: "HELOC",
    detail: "Home equity line of credit",
  },
  {
    id: "loan",
    label: "Home improvement loan",
    detail: "Traditional loan",
  },
] as const;

export const comparisonRows = [
  {
    label: "Structure",
    values: {
      hea: "Equity-based agreement",
      heloc: "Revolving credit line secured by the home",
      loan: "Debt",
    },
  },
  {
    label: "Monthly payment",
    values: {
      hea: "Generally no required monthly loan payment during the applicable term",
      heloc: "Yes",
      loan: "Yes",
    },
  },
  {
    label: "Interest",
    values: {
      hea: "No traditional loan interest rate. The cost is defined by the agreement.",
      heloc: "Yes",
      loan: "Yes",
    },
  },
  {
    label: "Home equity involvement",
    values: {
      hea: "Tied to the home’s value. A lien or similar interest may apply, depending on the provider.",
      heloc: "Secured by home equity",
      loan: "May be secured or unsecured, depending on the lender and product",
    },
  },
  {
    label: "Repayment / settlement",
    values: {
      hea: "Settled later according to the provider agreement",
      heloc: "Loan repayment",
      loan: "Regular repayment schedule",
    },
  },
  {
    label: "Qualification",
    values: {
      hea: "Provider-specific. Not qualifying for another product does not determine HEA eligibility.",
      heloc: "Credit, income, equity, and lender requirements",
      loan: "Lender requirements",
    },
  },
] as const;

export type ComparisonColumnId = (typeof comparisonColumns)[number]["id"];
