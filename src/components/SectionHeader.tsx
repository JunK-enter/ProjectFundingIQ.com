import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  children,
  tone = "light",
  as = "h2",
  id,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}) {
  const Heading = as;

  return (
    <div className={`max-w-3xl ${className}`} id={id}>
      {eyebrow ? (
        <p className={`eyebrow ${tone === "dark" ? "text-gold" : "text-forest"}`}>
          {eyebrow}
        </p>
      ) : null}
      <Heading
        className={`mt-3 font-serif text-[2rem] leading-[1.15] text-balance sm:text-4xl lg:text-[2.75rem] ${
          tone === "dark" ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </Heading>
      {children ? (
        <div
          className={`mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${
            tone === "dark" ? "text-cream/75" : "text-muted"
          }`}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
