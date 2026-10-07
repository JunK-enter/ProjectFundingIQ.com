import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "inverse";
  external?: boolean;
  size?: "md" | "lg";
  className?: string;
};

const variants = {
  primary: "bg-forest text-cream hover:bg-forest-deep",
  secondary:
    "border border-forest/25 bg-transparent text-forest hover:border-forest hover:bg-paper",
  inverse: "bg-cream text-forest hover:bg-white",
};

const sizes = {
  md: "min-h-12 px-5 text-[15px]",
  lg: "min-h-14 px-7 text-base",
};

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  size = "md",
  className = "",
}: ButtonProps) {
  const classes = `group inline-flex items-center justify-center gap-2 rounded-[10px] font-medium tracking-tight transition-[color,background-color,border-color,transform,box-shadow] duration-300 ease-out motion-safe:hover:-translate-y-px motion-safe:hover:shadow-[0_10px_24px_rgba(16,44,38,0.12)] focus-visible:outline-offset-3 ${variants[variant]} ${sizes[size]} ${
    variant === "inverse" ? "focus-visible:outline-cream" : ""
  } ${className}`;

  const content = (
    <>
      {children}
      {external ? (
        <ArrowUpRight
          className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
          aria-hidden
        />
      ) : (
        <ArrowRight
          className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5"
          aria-hidden
        />
      )}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
        <span className="sr-only">
          {" "}
          (opens the HomeWealthIQ partner experience)
        </span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
