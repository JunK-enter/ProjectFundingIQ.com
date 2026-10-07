const contractorPoints = [
  "Recognize when another funding conversation may be useful.",
  "Share accurate, approved information.",
  "Avoid estimating qualification, fees, or a settlement amount.",
  "Introduce homeowners who want to learn more.",
  "Return to the project if they proceed and funding is provided.",
];

const providerPoints = [
  "Reviews eligibility under its own requirements.",
  "Handles the application.",
  "Provides disclosures and explains the contract.",
  "Describes fees, liens, settlement events, and other obligations.",
  "Makes the funding decision.",
];

export function RoleColumns() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <article className="rounded-[14px] border border-line bg-paper p-6 sm:p-8">
        <p className="eyebrow text-forest">Your side of the table</p>
        <h3 className="mt-3 font-serif text-2xl text-ink">The contractor’s role</h3>
        <ul className="mt-5 space-y-3">
          {contractorPoints.map((point) => (
            <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </article>
      <article className="rounded-[14px] bg-forest p-6 text-cream sm:p-8">
        <p className="eyebrow text-gold">Their side of the table</p>
        <h3 className="mt-3 font-serif text-2xl">The provider’s role</h3>
        <ul className="mt-5 space-y-3">
          {providerPoints.map((point) => (
            <li key={point} className="flex gap-3 text-sm leading-relaxed text-cream/80">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
