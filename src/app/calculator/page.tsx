import { Calculator } from "@/components/calculator/Calculator";
import { Container } from "@/components/Container";
import { Disclosure } from "@/components/Disclosure";
import { PageHero } from "@/components/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Home Equity Calculator",
  description:
    "Estimate home equity from your own numbers: the home value you enter minus the mortgage and other secured balances. Informational only, not an offer of financing.",
  path: "/calculator",
});

const notes = [
  {
    title: "Your numbers only",
    body: "The calculator does not look up the address, appraise the home, or check credit. It uses only what you type.",
  },
  {
    title: "Nothing leaves the page",
    body: "Answers are kept in this browser tab while you use it. They are not sent, stored, or shared.",
  },
  {
    title: "No funding figures",
    body: "It does not estimate HEA funding amounts, rates, or settlement costs. Only a provider’s own review can describe those.",
  },
];

export default function CalculatorPage() {
  return (
    <>
      <PageHero eyebrow="Home equity calculator" title="Explore your home equity.">
        <p>
          Answer eight short steps to see a simple estimate of the equity in a
          home: its value minus the balances secured against it. It is an
          informational estimate, not an offer of financing.
        </p>
      </PageHero>

      <section className="border-y border-line bg-surface py-10 md:py-14">
        <Container>
          <Calculator />
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="font-serif text-3xl text-ink sm:text-4xl">
                How the estimate works
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Home equity is the part of a home’s value that is not owed to a
                lender. The calculator subtracts the balances you enter from
                the home value you enter, and never shows less than $0.
              </p>
              <p className="mt-6 rounded-[12px] border border-line bg-tint/60 px-5 py-4 font-serif text-lg leading-relaxed text-ink">
                Home equity = Home value − Mortgage balance − Other secured loans
              </p>
            </div>
            <ul className="grid gap-4 lg:col-span-7">
              {notes.map((note) => (
                <li key={note.title} className="rounded-[14px] border border-line bg-white p-5">
                  <h3 className="font-serif text-xl text-ink">{note.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{note.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <Disclosure className="mt-12 max-w-3xl" />
        </Container>
      </section>
    </>
  );
}
