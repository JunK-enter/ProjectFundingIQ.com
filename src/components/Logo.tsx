import Link from "next/link";

export function Logo({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 font-serif text-[1.2rem] leading-none tracking-tight sm:text-[1.45rem] ${
        tone === "light" ? "text-cream" : "text-forest"
      } ${className}`}
    >
      <span
        aria-hidden
        className="inline-block h-2 w-2 shrink-0 bg-gold"
      />
      ProjectFundingIQ
    </Link>
  );
}
