import type { CalculatorData } from "./types";

export type EquityInputs = {
  homeValue: number;
  mortgageBalance: number;
  otherSecuredLoans: number;
};

export type EquityEstimate = EquityInputs & {
  totalSecuredBalance: number;
  equity: number;
  /** Equity as a share of the entered home value, 0–100. */
  equityPercent: number;
  /** Secured balances as a share of the entered home value; can exceed 100. */
  combinedLoanToValuePercent: number;
  balancesExceedValue: boolean;
};

/** Home Equity = max(0, Home Value − Mortgage Balance − Other Secured Loans) */
export function calculateHomeEquity({
  homeValue,
  mortgageBalance,
  otherSecuredLoans,
}: EquityInputs): EquityEstimate {
  const totalSecuredBalance = mortgageBalance + otherSecuredLoans;
  const equity = Math.max(0, homeValue - totalSecuredBalance);
  const share = (amount: number) => (homeValue > 0 ? (amount / homeValue) * 100 : 0);

  return {
    homeValue,
    mortgageBalance,
    otherSecuredLoans,
    totalSecuredBalance,
    equity,
    equityPercent: share(equity),
    combinedLoanToValuePercent: share(totalSecuredBalance),
    balancesExceedValue: totalSecuredBalance >= homeValue,
  };
}

export function equityInputsFrom(data: CalculatorData): EquityInputs | null {
  if (data.homeValue == null) return null;
  return {
    homeValue: data.homeValue,
    mortgageBalance: data.hasMortgage === "yes" ? data.mortgageBalance ?? 0 : 0,
    otherSecuredLoans:
      data.hasOtherLoans === "yes"
        ? data.otherLoans.reduce((sum, loan) => sum + (loan.balance ?? 0), 0)
        : 0,
  };
}