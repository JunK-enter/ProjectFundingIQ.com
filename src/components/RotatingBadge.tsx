"use client";

import { useEffect, useId, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

const RADIUS = 46;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function RotatingBadge({
  href,
  text,
  label,
  className,
}: {
  href: string;
  text: string;
  label: string;
  className?: string;
}) {
  const pathId = useId();
  const reduce = useReducedMotion();
  const rotate = useMotionValue(0);
  const speed = useMotionValue(14);
  const smoothSpeed = useSpring(speed, { stiffness: 60, damping: 18 });
  const root = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = root.current;
    if (reduce !== false || !el) return;
    let frame = 0;
    let last = 0;
    let visible = false;
    const tick = (now: number) => {
      const delta = last ? now - last : 0;
      last = now;
      rotate.set((rotate.get() + (smoothSpeed.get() * delta) / 1000) % 360);
      frame = visible ? requestAnimationFrame(tick) : 0;
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reduce, rotate, smoothSpeed]);

  return (
    <Magnetic strength={8} className={className}>
      <a
        ref={root}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        onPointerEnter={() => speed.set(70)}
        onPointerLeave={() => speed.set(14)}
        onFocus={() => speed.set(70)}
        onBlur={() => speed.set(14)}
        className="group relative grid size-24 place-items-center rounded-full bg-white/95 text-blue shadow-[0_14px_34px_rgba(15,30,70,0.14)] backdrop-blur-sm transition-colors duration-300 hover:bg-blue hover:text-white focus-visible:outline-offset-4 sm:size-28"
      >
        <motion.svg
          aria-hidden
          viewBox="0 0 120 120"
          style={{ rotate }}
          className="absolute inset-0 size-full"
        >
          <defs>
            <path
              id={pathId}
              d={`M60,60 m-${RADIUS},0 a${RADIUS},${RADIUS} 0 1,1 ${RADIUS * 2},0 a${RADIUS},${RADIUS} 0 1,1 -${RADIUS * 2},0`}
            />
          </defs>
          <text
            className="fill-current text-[9.5px] font-semibold uppercase"
            style={{ letterSpacing: "0.18em" }}
          >
            <textPath
              href={`#${pathId}`}
              textLength={CIRCUMFERENCE - 4}
              lengthAdjust="spacing"
            >
              {text}
            </textPath>
          </text>
        </motion.svg>
        <ArrowUpRight
          aria-hidden
          className={cn(
            "size-5 motion-safe:transition-transform motion-safe:duration-300",
            "motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:scale-110",
          )}
        />
      </a>
    </Magnetic>
  );
}
