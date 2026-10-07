export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "note"; title: string; text: string };

export type Article = {
  slug: string;
  title: string;
  cardTitle: string;
  cardText: string;
  category: string;
  categoryId: string;
  excerpt: string;
  description: string;
  featuredOnHome?: boolean;
  blocks: ArticleBlock[];
};

export const resourceCategories = [
  { id: "hea-basics", label: "HEA Basics" },
  { id: "comparisons", label: "Comparisons" },
  { id: "homeowner-questions", label: "Homeowner Questions" },
  { id: "contractor-guides", label: "Contractor Guides" },
  { id: "partner-resources", label: "Partner Resources" },
] as const;

export const articles: Article[] = [
  {
    slug: "hea-101",
    title: "What is a Home Equity Agreement?",
    cardTitle: "HEA 101",
    cardText: "What is a Home Equity Agreement?",
    category: "HEA Basics",
    categoryId: "hea-basics",
    excerpt:
      "A plain-language introduction for contractors who may mention this option when a monthly payment does not fit.",
    description:
      "A contractor-friendly introduction to Home Equity Agreements: what they are, what they are not, and which details stay with the provider.",
    featuredOnHome: true,
    blocks: [
      {
        type: "p",
        text: "A Home Equity Agreement is an alternative way for an eligible homeowner to access a portion of the equity in their property without taking out a traditional loan.",
      },
      {
        type: "p",
        text: "In a typical structure, the homeowner may receive funds upfront. During the applicable investment period, the agreement generally does not require a monthly loan payment. The agreement is settled later, according to the provider’s contract. That settlement is tied to the home and the terms the homeowner actually signs.",
      },
      {
        type: "h2",
        text: "What an HEA is not",
      },
      {
        type: "ul",
        items: [
          "It is not a promise that every homeowner qualifies.",
          "It is not free funding, and it is not “no repayment.”",
          "It is not a HELOC, and failing to qualify for a HELOC does not automatically create HEA eligibility.",
          "It is not a product with one universal term length, fee, or settlement formula.",
        ],
      },
      {
        type: "h2",
        text: "What stays provider-specific",
      },
      {
        type: "p",
        text: "Eligibility, the amount of funding, fees, liens, the length of the agreement, settlement events, and the way a settlement amount is calculated all belong to the applicable provider and the written agreement. ProjectFundingIQ explains the category. It does not quote a program it does not control.",
      },
      {
        type: "note",
        title: "A useful contractor sentence",
        text: "“This may be another option to explore. The provider decides whether it fits, and they are the ones who walk through the contract.”",
      },
    ],
  },
  {
    slug: "hea-vs-heloc",
    title: "HEA vs HELOC",
    cardTitle: "HEA vs HELOC",
    cardText: "Understand how the structures differ.",
    category: "Comparisons",
    categoryId: "comparisons",
    excerpt:
      "Both can involve home equity. The structure, payment, and qualification review are not the same.",
    description:
      "An educational comparison of Home Equity Agreements and HELOCs for home improvement contractors.",
    featuredOnHome: true,
    blocks: [
      {
        type: "p",
        text: "A HELOC is a revolving credit line secured by the home. The homeowner typically draws what they need, pays interest, and makes payments under the lender’s terms. Qualification usually considers credit, income, equity, and other lender requirements.",
      },
      {
        type: "p",
        text: "A Home Equity Agreement is an equity-based contract. An eligible homeowner may receive funds upfront. There is generally no required monthly loan payment during the applicable term, and there is no traditional loan interest rate. The cost of the agreement shows up in the contract: fees, a possible lien, and a later settlement tied to the provider’s formula.",
      },
      {
        type: "h2",
        text: "They solve different hesitations",
      },
      {
        type: "p",
        text: "A homeowner who is comfortable with a line of credit and a monthly payment may prefer a HELOC. A homeowner who wants the project and does not want another monthly obligation may want to understand an HEA. Neither preference predicts approval.",
      },
      {
        type: "note",
        title: "Do not bridge the two",
        text: "If a customer was declined for a HELOC, do not suggest that an HEA is therefore available. The provider runs its own review.",
      },
    ],
  },
  {
    slug: "hea-vs-home-improvement-loan",
    title: "HEA vs a home improvement loan",
    cardTitle: "HEA vs home improvement loan",
    cardText: "Debt with a payment schedule, or an agreement settled later.",
    category: "Comparisons",
    categoryId: "comparisons",
    excerpt:
      "A traditional home improvement loan is debt. An HEA is a different structure, with its own obligations.",
    description:
      "How a Home Equity Agreement differs from a traditional home improvement loan, in language contractors can use carefully.",
    blocks: [
      {
        type: "p",
        text: "A home improvement loan is debt. The homeowner borrows a sum, pays interest, and repays it on a schedule. Some of these loans are secured by the home. Others are not. The lender sets the requirements.",
      },
      {
        type: "p",
        text: "An HEA is not structured as that kind of installment debt. Funds, if approved, may be provided upfront. The ongoing obligation is generally not a monthly loan payment. Settlement happens later under the agreement, and the amount is not a standard amortization schedule you can quote from a rate sheet.",
      },
      {
        type: "h2",
        text: "How to talk about the difference",
      },
      {
        type: "ul",
        items: [
          "A loan asks the homeowner to take on a payment.",
          "An HEA asks the homeowner to understand a contract tied to the home’s value.",
          "One is not automatically cheaper, faster, or easier to qualify for.",
          "The right next step is a provider conversation, not a contractor estimate of the payoff.",
        ],
      },
    ],
  },
  {
    slug: "understanding-hea-settlement",
    title: "Understanding HEA settlement",
    cardTitle: "Settlement explained",
    cardText: "Understand when and how an HEA may be settled.",
    category: "HEA Basics",
    categoryId: "hea-basics",
    excerpt:
      "Settlement is contractual. The timing and the amount come from the agreement, not from a rule of thumb.",
    description:
      "A conservative explanation of when a Home Equity Agreement may be settled and why contractors should not estimate the amount.",
    featuredOnHome: true,
    blocks: [
      {
        type: "p",
        text: "Settlement is the point at which the homeowner’s obligation under the agreement is resolved. It is not the same event for every provider. The contract names the events that require settlement and the way the amount is calculated.",
      },
      {
        type: "h2",
        text: "Events that may be in an agreement",
      },
      {
        type: "ul",
        items: [
          "The end of the stated term",
          "A sale of the home",
          "A refinance",
          "Another event the provider defines in writing",
        ],
      },
      {
        type: "p",
        text: "Some agreements also allow an earlier settlement if the homeowner chooses to end the contract under the rules provided. Whether that option exists, and what it costs, is provider-specific.",
      },
      {
        type: "h2",
        text: "What the amount can depend on",
      },
      {
        type: "p",
        text: "The settlement amount is commonly connected to the home’s value and the sharing or calculation method in the contract. It can also reflect fees or other amounts described in the documents. Because home values move, the amount is not something a contractor can responsibly predict at the kitchen table.",
      },
      {
        type: "note",
        title: "Leave the math with the provider",
        text: "Do not estimate a percentage, a term, or a future payoff. Offer to connect the homeowner with the provider who can show the actual calculation.",
      },
    ],
  },
  {
    slug: "questions-homeowners-ask",
    title: "Questions homeowners ask",
    cardTitle: "Customer questions",
    cardText: "Questions homeowners are likely to ask.",
    category: "Homeowner Questions",
    categoryId: "homeowner-questions",
    excerpt:
      "The questions are usually about payment, cost, the house, and who decides. You do not have to answer all of them yourself.",
    description:
      "Common homeowner questions about Home Equity Agreements, with conservative answers a contractor can stand behind.",
    featuredOnHome: true,
    blocks: [
      {
        type: "h2",
        text: "“Is this free if there is no monthly payment?”",
      },
      {
        type: "p",
        text: "No. No required monthly loan payment is not the same as free funding. The homeowner still has a contract. Fees, a lien, and a later settlement may all be part of that contract.",
      },
      {
        type: "h2",
        text: "“Will I qualify?”",
      },
      {
        type: "p",
        text: "Only the provider can say. Equity in the home may matter, and so can property type, location, and other program rules. Credit and income reviews, where they exist, are also provider-specific. Do not translate a loan decline into an HEA approval.",
      },
      {
        type: "h2",
        text: "“What happens when I sell?”",
      },
      {
        type: "p",
        text: "A sale is often a settlement event. The agreement may need to be paid or otherwise resolved in connection with the sale. The homeowner should ask the provider how a sale is handled before signing.",
      },
      {
        type: "h2",
        text: "“Can I refinance later?”",
      },
      {
        type: "p",
        text: "A refinance may require the provider’s involvement, and it may itself be a settlement event. The contract controls. This is a question for the provider, not a promise to make in the proposal.",
      },
      {
        type: "h2",
        text: "“Who is on the hook for explaining the paperwork?”",
      },
      {
        type: "p",
        text: "The funding provider. Your job is the project. Their job is qualification, disclosures, and the agreement.",
      },
    ],
  },
  {
    slug: "how-contractors-introduce-an-hea",
    title: "How contractors can introduce an HEA",
    cardTitle: "Contractor conversation guide",
    cardText: "How to introduce another funding option naturally.",
    category: "Contractor Guides",
    categoryId: "contractor-guides",
    excerpt:
      "Mention the option when a monthly payment is the reason a wanted project is sitting still. Then hand the funding conversation to the provider.",
    description:
      "A practical, conservative way for contractors to introduce a Home Equity Agreement without becoming the funding expert.",
    featuredOnHome: true,
    blocks: [
      {
        type: "p",
        text: "The moment is usually familiar. The estimate is done. The homeowner wants the work. Then they say they do not want another monthly payment. That is a funding problem, not a sign that the project was wrong.",
      },
      {
        type: "h2",
        text: "A plain way to say it",
      },
      {
        type: "p",
        text: "“If another monthly payment is what is holding this up, there is a different structure some eligible homeowners look at. It is called a Home Equity Agreement. It is not a fit for everyone, and I do not make the funding decision. If you want, I can point you to the provider who explains qualification and the contract.”",
      },
      {
        type: "h2",
        text: "Stay inside these lines",
      },
      {
        type: "ul",
        items: [
          "Say “may” and “eligible.”",
          "Say the provider decides.",
          "Do not estimate the settlement.",
          "Do not promise a term, a fee, or an approval.",
          "Do not say the money is free or that there is no repayment of any kind.",
          "Do not pressure a homeowner who is not interested.",
        ],
      },
      {
        type: "note",
        title: "The goal of the introduction",
        text: "A useful conversation, not a close. If the homeowner wants to learn more, the provider takes the funding discussion from there.",
      },
    ],
  },
  {
    slug: "what-happens-after-a-referral",
    title: "What happens after a referral",
    cardTitle: "Partner guide",
    cardText: "Understand what happens after a referral.",
    category: "Partner Resources",
    categoryId: "partner-resources",
    excerpt:
      "You make the introduction. The provider handles qualification, paperwork, and the funding decision.",
    description:
      "What contractors can expect after introducing a homeowner to the HomeWealthIQ partner experience.",
    featuredOnHome: true,
    blocks: [
      {
        type: "p",
        text: "ProjectFundingIQ helps contractors learn about and connect with the HomeWealthIQ partner experience. Joining that experience is how you get the partner resources and the path for an introduction. It is not a promise that any particular homeowner will be approved.",
      },
      {
        type: "h2",
        text: "After you introduce the option",
      },
      {
        type: "ul",
        items: [
          "The homeowner who wants to learn more continues with the funding provider.",
          "The provider reviews qualification under its own requirements.",
          "The provider is responsible for application steps, disclosures, and explaining the contract.",
          "The provider makes the funding decision.",
          "If the homeowner proceeds and funding is provided, you go back to building the project.",
        ],
      },
      {
        type: "h2",
        text: "What you should not expect",
      },
      {
        type: "p",
        text: "An introduction is not instant funding, a guaranteed approval, or a recovered job. Some conversations will end because the homeowner is not eligible, does not like the terms, or decides not to move forward. That is a complete outcome. Your role was to make another option visible.",
      },
      {
        type: "note",
        title: "Where the partner process lives",
        text: "Partner enrollment continues on the HomeWealthIQ partner experience. ProjectFundingIQ is the education in front of that step.",
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(categoryId: string) {
  return articles.filter((article) => article.categoryId === categoryId);
}

export const homepageResources = articles.filter((article) => article.featuredOnHome);
