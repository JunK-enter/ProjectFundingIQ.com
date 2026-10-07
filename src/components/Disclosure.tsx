export function Disclosure({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={`text-sm leading-relaxed ${
        tone === "dark" ? "text-cream/65" : "text-muted"
      } ${className}`}
    >
      ProjectFundingIQ provides educational information for contractors and home
      improvement professionals. It does not make funding or qualification
      decisions. Funding availability, eligibility, terms, fees, settlement
      obligations, and other requirements are determined by the applicable
      provider and contractual agreement.
    </p>
  );
}
