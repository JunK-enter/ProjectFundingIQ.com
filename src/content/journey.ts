export const journeySteps = [
  {
    number: "01",
    title: "Join the partner program",
    body: "Learn about the program and available partner resources.",
  },
  {
    number: "02",
    title: "Introduce the option",
    body: "Share the approved information with homeowners interested in exploring an alternative funding route.",
  },
  {
    number: "03",
    title: "Provider takes over",
    body: "The funding provider handles qualification, application, disclosures, contractual information, and funding decisions.",
  },
  {
    number: "04",
    title: "Get back to the project",
    body: "If the homeowner chooses to proceed and receives funding, you continue doing what you do best: completing the project.",
  },
] as const;

export const heaSteps = [
  {
    number: "01",
    title: "Home equity",
    body: "The homeowner has equity in the property.",
  },
  {
    number: "02",
    title: "Funds",
    body: "An eligible homeowner may receive funds upfront.",
  },
  {
    number: "03",
    title: "No required monthly loan payment",
    body: "Unlike a traditional loan, the agreement generally does not require monthly loan payments during the applicable investment period.",
  },
  {
    number: "04",
    title: "Settlement",
    body: "The agreement is settled later according to the provider’s contractual terms.",
  },
] as const;

export const stallSteps = [
  { label: "Lead", emphasis: false },
  { label: "Estimate", emphasis: false },
  { label: "Site Visit", emphasis: false },
  { label: "Proposal", emphasis: false },
  { label: "Customer Says Yes", emphasis: false },
  { label: "Funding", emphasis: true },
  { label: "Project Stalls", emphasis: true },
] as const;

export const lostProjects = [
  {
    amount: "$28,000",
    title: "Roof replacement",
    note: "Customer wanted the project.",
    status: "Funding stalled.",
  },
  {
    amount: "$85,000",
    title: "ADU project",
    note: "Project postponed.",
    status: "Monthly payment didn’t fit.",
  },
  {
    amount: "$42,000",
    title: "Solar + battery",
    note: "Customer interested.",
    status: "Financing conversation stopped.",
  },
] as const;

export const valuePoints = [
  {
    number: "01",
    title: "Revisit stalled estimates",
    body: "Yesterday’s “not right now” may be worth another conversation.",
  },
  {
    number: "02",
    title: "Give customers another path",
    body: "Not every homeowner wants to add another monthly loan payment.",
  },
  {
    number: "03",
    title: "Keep your role simple",
    body: "Introduce the option. Let the funding provider explain qualification and contractual terms.",
  },
] as const;
