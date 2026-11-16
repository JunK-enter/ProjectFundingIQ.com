export const calculatorSteps = [
  {
    id: "address",
    label: "Address",
    title: "Where is the property?",
    description: "Enter the address of the home. It stays in this browser tab and is not looked up or sent anywhere.",
  },
  {
    id: "property",
    label: "Property",
    title: "Tell us about the home.",
    description: "The type of home and how it is used help frame the estimate.",
  },
  {
    id: "value",
    label: "Home value",
    title: "What do you think the home is worth?",
    description: "Use your own best estimate. This calculator does not appraise or look up property values.",
  },
  {
    id: "mortgage",
    label: "Mortgage",
    title: "Is there a mortgage on the home?",
    description: "Use the current principal balance from a recent statement, not the original loan amount.",
  },
  {
    id: "other-loans",
    label: "Other loans",
    title: "Are there other loans secured by the home?",
    description: "Include balances that are recorded against the property, such as a HELOC or a solar lien.",
  },
  {
    id: "project",
    label: "Project",
    title: "What project is being considered?",
    description: "This is for context in your summary. It does not change the equity calculation.",
  },
  {
    id: "review",
    label: "Review",
    title: "Review your answers.",
    description: "Check the numbers before you see the estimate. You can edit any section.",
  },
  {
    id: "result",
    label: "Estimate",
    title: "Your home equity estimate",
    description: "Based only on the numbers you entered.",
  },
] as const;

export type CalculatorStep = (typeof calculatorSteps)[number];
export type StepId = CalculatorStep["id"];

export const stepIndex = (id: StepId) =>
  calculatorSteps.findIndex((step) => step.id === id);
