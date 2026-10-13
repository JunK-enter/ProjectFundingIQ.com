"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import {
  ArrowUturnLeftIcon,
  type ArrowUturnLeftIconHandle,
} from "@/components/ui/arrow-uturn-left";

const variants = {
  button:
    "min-h-12 rounded-[10px] border border-forest/25 px-5 text-[15px] font-medium tracking-tight text-forest transition-[background-color,border-color,transform,box-shadow] duration-300 hover:border-forest hover:bg-paper motion-safe:hover:-translate-y-px motion-safe:hover:shadow-[0_10px_24px_rgba(16,44,38,0.12)]",
  text: "min-h-11 text-sm font-medium text-forest transition-colors duration-300 hover:text-forest-deep",
};

export function UturnLink({
  href,
  children,
  variant = "button",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  const icon = useRef<ArrowUturnLeftIconHandle>(null);
  const start = () => icon.current?.startAnimation();
  const stop = () => icon.current?.stopAnimation();

  return (
    <Link
      href={href}
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
      className={`inline-flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
    >
      <ArrowUturnLeftIcon
        ref={icon}
        size={variant === "button" ? 18 : 16}
        aria-hidden
        className="flex shrink-0"
      />
      {children}
    </Link>
  );
}
