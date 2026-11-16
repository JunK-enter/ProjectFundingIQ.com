import {
  emptyCalculatorData,
  type CalculatorData,
  type PropertyAddress,
  type SecuredLoan,
} from "./types";

export type CalculatorAction =
  | { type: "patch"; patch: Partial<CalculatorData> }
  | { type: "address"; patch: Partial<PropertyAddress> }
  | { type: "add-loan"; id: string }
  | { type: "update-loan"; id: string; patch: Partial<Omit<SecuredLoan, "id">> }
  | { type: "remove-loan"; id: string }
  | { type: "reset" };

export function calculatorReducer(
  state: CalculatorData,
  action: CalculatorAction,
): CalculatorData {
  switch (action.type) {
    case "patch":
      return { ...state, ...action.patch };
    case "address":
      return { ...state, address: { ...state.address, ...action.patch } };
    case "add-loan":
      return {
        ...state,
        otherLoans: [...state.otherLoans, { id: action.id, type: "", balance: null }],
      };
    case "update-loan":
      return {
        ...state,
        otherLoans: state.otherLoans.map((loan) =>
          loan.id === action.id ? { ...loan, ...action.patch } : loan,
        ),
      };
    case "remove-loan":
      return {
        ...state,
        otherLoans: state.otherLoans.filter((loan) => loan.id !== action.id),
      };
    case "reset":
      return emptyCalculatorData;
  }
}
