import {
  comparisonColumns,
  comparisonRows,
  type ComparisonColumnId,
} from "@/content/comparison";
import { Container } from "./Container";
import { SectionHeader } from "./SectionHeader";

export function ComparisonTable({
  showHeader = true,
}: {
  showHeader?: boolean;
}) {
  return (
    <section id="comparison" className="bg-paper py-20 md:py-28">
      <Container>
        {showHeader ? (
          <SectionHeader title="Different tools solve different problems." />
        ) : null}
        <div className={showHeader ? "mt-10 lg:hidden" : "lg:hidden"}>
          <div className="grid gap-4">
            {comparisonColumns.map((column) => (
              <article
                key={column.id}
                className="rounded-[14px] border border-line bg-cream p-5"
              >
                <h3 className="font-serif text-2xl text-ink">{column.label}</h3>
                <p className="mt-1 text-sm text-muted">{column.detail}</p>
                <dl className="mt-4 divide-y divide-line">
                  {comparisonRows.map((row) => (
                    <div key={row.label} className="grid gap-1 py-3">
                      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                        {row.label}
                      </dt>
                      <dd className="text-[15px] leading-relaxed text-ink">
                        {row.values[column.id as ComparisonColumnId]}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </div>
        <div className={`hidden lg:block ${showHeader ? "mt-10" : ""}`}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <caption className="sr-only">
                Educational comparison of a Home Equity Agreement, a HELOC, and
                a home improvement loan. Terms are provider-specific.
              </caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="w-[18%] py-4 pr-4 text-sm font-medium text-muted">
                    <span className="sr-only">Topic</span>
                  </th>
                  {comparisonColumns.map((column) => (
                    <th
                      key={column.id}
                      scope="col"
                      className="px-4 py-4 font-serif text-2xl font-normal text-ink"
                    >
                      {column.label}
                      <span className="mt-1 block font-sans text-xs font-medium tracking-normal text-muted">
                        {column.detail}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="border-b border-line align-top">
                    <th
                      scope="row"
                      className="py-5 pr-4 text-sm font-semibold text-ink"
                    >
                      {row.label}
                    </th>
                    {comparisonColumns.map((column) => (
                      <td
                        key={column.id}
                        className="px-4 py-5 text-sm leading-relaxed text-muted"
                      >
                        {row.values[column.id]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mx-auto mt-12 max-w-2xl text-center font-serif text-2xl leading-snug text-balance text-ink sm:text-3xl">
          An HEA isn&apos;t automatically better. It&apos;s simply another option
          worth understanding.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted">
          This is a general comparison for education. Actual structure, cost,
          and eligibility depend on the provider and the agreement.
        </p>
      </Container>
    </section>
  );
}
