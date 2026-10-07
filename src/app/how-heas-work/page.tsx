import Link from "next/link";
import { ComparisonTable } from "@/components/ComparisonTable";
import { Container } from "@/components/Container";
import { Disclosure } from "@/components/Disclosure";
import { FaqList } from "@/components/FaqList";
import { PageHero } from "@/components/PageHero";
import { PartnerCTA } from "@/components/PartnerCTA";
import { RoleColumns } from "@/components/RoleColumns";
import { heaSteps } from "@/content/journey";
import { homeownerFaqs } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How HEAs Work",
  description:
    "A conservative explanation of Home Equity Agreements for contractors: structure, settlement, fees, liens, and how the provider’s role differs from yours.",
  path: "/how-heas-work",
});

const contents = [
  { href: "#what-is-an-hea", label: "What is an HEA?" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#why-explore", label: "Why homeowners explore one" },
  { href: "#compare", label: "How it differs" },
  { href: "#not-free", label: "Not free money" },
  { href: "#settlement", label: "Settlement" },
  { href: "#obligations", label: "Fees, liens, sale, refinance" },
  { href: "#questions", label: "Homeowner questions" },
  { href: "#roles", label: "Roles" },
];

export default function HowHeasWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="HEA education"
        title="Understand the funding option before you introduce it."
      >
        <p>
          This page is for contractors who want a clear picture of a Home
          Equity Agreement before mentioning it to a homeowner. It is
          education, not an offer, and it does not describe every provider’s
          contract.
        </p>
      </PageHero>

      <nav aria-label="On this page" className="border-y border-line bg-paper">
        <Container className="flex gap-2 overflow-x-auto py-3">
          {contents.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-line px-3 py-2 text-sm text-ink hover:bg-sage"
            >
              {item.label}
            </a>
          ))}
        </Container>
      </nav>

      <section id="what-is-an-hea" className="py-16 md:py-20">
        <Container className="max-w-3xl">
          <h2 className="font-serif text-3xl text-ink sm:text-4xl">What is an HEA?</h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
            <p>
              A Home Equity Agreement is an alternative way for an eligible
              homeowner to access a portion of the equity in their property
              without taking out a traditional loan.
            </p>
            <p>
              The homeowner and the provider enter a contract tied to the home.
              If the provider approves the homeowner, funds may be available
              upfront. The agreement is settled later under that contract. The
              provider — not the contractor — decides whether someone is
              eligible and what the documents say.
            </p>
          </div>
        </Container>
      </section>

      <section id="how-it-works" className="bg-paper py-16 md:py-20">
        <Container>
          <h2 className="max-w-2xl font-serif text-3xl text-ink sm:text-4xl">
            How an HEA works
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            The sequence below is the general shape. Amounts, timing, and
            conditions are provider-specific.
          </p>
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {heaSteps.map((step) => (
              <li key={step.number} className="rounded-[14px] border border-line bg-cream p-5">
                <p className="font-serif text-sm text-gold">{step.number}</p>
                <h3 className="mt-2 font-serif text-2xl text-ink">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="why-explore" className="py-16 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-serif text-3xl text-ink sm:text-4xl">
              Why homeowners may explore one
            </h2>
          </div>
          <div className="space-y-4 text-lg leading-relaxed text-muted lg:col-span-7">
            <p>
              Many homeowners already want the project. What they hesitate over
              is adding another monthly obligation on top of the mortgage, a
              car, or other bills.
            </p>
            <p>
              An HEA may be worth understanding in that situation because it
              generally does not require a monthly loan payment during the
              applicable term. That is a structural difference. It is not a
              reason to assume the homeowner will qualify, or that the
              agreement will feel inexpensive once the settlement terms are
              clear.
            </p>
            <p>
              Homeowners who are comfortable with a traditional payment may
              still prefer a loan or a HELOC. Different tools fit different
              concerns.
            </p>
          </div>
        </Container>
      </section>

      <div id="compare">
        <ComparisonTable />
      </div>

      <section className="py-16 md:py-20">
        <Container className="grid gap-8 lg:grid-cols-2">
          <article>
            <h2 className="font-serif text-3xl text-ink">HEA vs HELOC</h2>
            <p className="mt-4 leading-relaxed text-muted">
              A HELOC is a revolving line secured by the home, with interest and
              payments set by the lender. An HEA is an equity agreement. It
              generally has no required monthly loan payment and no traditional
              interest rate during the term. The cost lives in the contract.
              Being declined for a HELOC does not mean an HEA is available.
            </p>
          </article>
          <article>
            <h2 className="font-serif text-3xl text-ink">HEA vs a traditional loan</h2>
            <p className="mt-4 leading-relaxed text-muted">
              A home improvement loan is debt repaid on a schedule. An HEA is
              not that installment structure. Settlement replaces the familiar
              payment book, and the amount is calculated the way the provider’s
              agreement describes. Neither product is automatically the better
              fit.
            </p>
          </article>
        </Container>
      </section>

      <section id="not-free" className="bg-sage py-16 md:py-20">
        <Container>
          <h2 className="max-w-3xl font-serif text-3xl text-ink sm:text-4xl">
            No monthly loan payment ≠ free money
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
            The absence of a required monthly loan payment does not make the
            funding free, and it does not mean there is nothing to repay. The
            homeowner takes on a contractual obligation tied to the home’s
            value. Fees, a settlement amount, a lien, and other duties can all
            be part of that obligation. Those details have to be read in the
            provider’s agreement before anyone proceeds.
          </p>
        </Container>
      </section>

      <section id="settlement" className="py-16 md:py-20">
        <Container className="max-w-3xl">
          <h2 className="font-serif text-3xl text-ink sm:text-4xl">
            Understanding settlement
          </h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
            <p>
              Settlement is how the agreement ends, financially. The contract
              names the events that require it. Depending on the provider,
              those events may include the end of the term, a sale, a
              refinance, or another defined trigger. Some agreements also
              describe an option to settle earlier.
            </p>
            <p>
              The settlement amount is commonly connected to the home’s value
              and the calculation in the contract. It can also include fees or
              other amounts the documents name. ProjectFundingIQ does not
              publish a universal term, sharing percentage, or payoff formula,
              because those are not universal.
            </p>
            <p>
              Contractors should not estimate the number. If a homeowner asks
              “what will I owe,” the honest answer is that the provider has to
              show the calculation in their agreement.
            </p>
          </div>
        </Container>
      </section>

      <section id="obligations" className="bg-paper py-16 md:py-20">
        <Container>
          <h2 className="max-w-2xl font-serif text-3xl text-ink sm:text-4xl">
            Fees, liens, selling, and refinancing
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <article className="rounded-[14px] border border-line bg-cream p-6">
              <h3 className="font-serif text-2xl text-ink">Potential fees</h3>
              <p className="mt-3 leading-relaxed text-muted">
                A provider may charge origination, processing, valuation, or
                other administrative fees. Whether they exist, when they are
                due, and how they are calculated belongs in the disclosures.
                Do not quote a fee you have not seen in that provider’s materials.
              </p>
            </article>
            <article className="rounded-[14px] border border-line bg-cream p-6">
              <h3 className="font-serif text-2xl text-ink">Lien considerations</h3>
              <p className="mt-3 leading-relaxed text-muted">
                Providers commonly secure the agreement with a lien or a similar
                interest on the property. A lien can affect later financing and
                a future sale. The homeowner should ask what is recorded, in
                what position, and what is required to release it.
              </p>
            </article>
            <article className="rounded-[14px] border border-line bg-cream p-6">
              <h3 className="font-serif text-2xl text-ink">Selling the home</h3>
              <p className="mt-3 leading-relaxed text-muted">
                A sale is often a settlement event. The agreement may need to
                be resolved before or as part of closing. Homeowners who think
                they may move during the term should ask the provider how a
                sale is handled before they sign.
              </p>
            </article>
            <article className="rounded-[14px] border border-line bg-cream p-6">
              <h3 className="font-serif text-2xl text-ink">Refinancing</h3>
              <p className="mt-3 leading-relaxed text-muted">
                A refinance can require the provider’s consent, a subordination,
                or full settlement, depending on the contract and the new
                lender. It is not safe to tell a homeowner they can refinance
                freely later. That answer has to come from the agreement and
                the parties involved.
              </p>
            </article>
          </div>
        </Container>
      </section>

      <section id="questions" className="py-16 md:py-20">
        <Container>
          <h2 className="font-serif text-3xl text-ink sm:text-4xl">
            Common homeowner questions
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            You can point to these answers. The provider still has to confirm
            anything that depends on a specific agreement.
          </p>
          <div className="mt-8">
            <FaqList items={homeownerFaqs} idPrefix="homeowner" />
          </div>
          <p className="mt-6 text-sm">
            <Link href="/resources/questions-homeowners-ask" className="inline-flex min-h-11 items-center font-medium text-forest">
              Read the longer question guide →
            </Link>
          </p>
        </Container>
      </section>

      <section id="roles" className="bg-paper py-16 md:py-20">
        <Container>
          <h2 className="max-w-2xl font-serif text-3xl text-ink sm:text-4xl">
            Contractor’s role vs provider’s role
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            The introduction can be yours. The funding conversation should not be.
          </p>
          <div className="mt-8">
            <RoleColumns />
          </div>
          <Disclosure className="mt-10 max-w-3xl" />
        </Container>
      </section>

      <PartnerCTA
        title="Ready to explore the partner program?"
        body="Learn how Home Equity Agreements may fit into customer conversations, then continue to the HomeWealthIQ partner experience when you are ready."
      />
    </>
  );
}
