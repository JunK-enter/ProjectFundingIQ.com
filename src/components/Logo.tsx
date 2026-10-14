"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

export function Logo({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const pathname = usePathname();
  const lenis = useLenis();

  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/" || event.metaKey || event.ctrlKey || event.shiftKey) {
      return;
    }
    event.preventDefault();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1 });
    } else {
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    }
  };

  return (
    <Link
      href="/"
      onClick={onClick}
      className={`inline-flex min-h-11 items-center gap-2 font-serif text-[1.2rem] leading-none tracking-tight sm:text-[1.45rem] ${
        tone === "light" ? "text-white" : "text-blue"
      } ${className}`}
    >
      <span
        aria-hidden
        className="inline-block h-2 w-2 shrink-0 bg-sky"
      />
      ProjectFundingIQ
    </Link>
  );
}
