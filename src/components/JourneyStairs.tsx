"use client";

import { useRef, useSyncExternalStore } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { journeySteps } from "@/content/journey";

const WIDE = "(min-width: 1024px)";
const subscribeWide = (onChange: () => void) => {
  const query = matchMedia(WIDE);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const isWide = () => matchMedia(WIDE).matches;

const heights = ["lg:min-h-[17rem]", "lg:min-h-[19.5rem]", "lg:min-h-[22rem]", "lg:min-h-[24.5rem]"];

export function JourneyStairs() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end 75%"],
  });

  return (
    <ol
      ref={ref}
      className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:items-end"
    >
      {journeySteps.map((step, index) => (
        <Stair
          key={step.number}
          step={step}
          index={index}
          progress={scrollYProgress}
        />
      ))}
    </ol>
  );
}

function Stair({
  step,
  index,
  progress,
}: {
  step: (typeof journeySteps)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const wide = useSyncExternalStore(subscribeWide, isWide, () => true);
  const start = index * 0.12;
  const rise = reduce ? 0 : wide ? 90 + index * 40 : 32;
  const y = useTransform(progress, [start, start + 0.55], [rise, 0]);
  const opacity = useTransform(
    progress,
    [start, start + 0.3],
    reduce ? [1, 1] : [0.25, 1],
  );
  const draw = useTransform(progress, [start + 0.2, start + 0.7], [0, 1]);

  return (
    <motion.li
      style={{ y, opacity }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[14px] border border-cream/10 bg-forest p-6 transition-colors duration-500 hover:border-gold/40 hover:bg-[#1d463b] ${heights[index]}`}
    >
      <div>
        <span className="font-serif text-4xl text-gold">{step.number}</span>
        <svg
          aria-hidden
          viewBox="0 0 200 24"
          preserveAspectRatio="none"
          className="mt-4 h-5 w-full text-gold/50"
        >
          <motion.path
            d="M0 2 Q 25 22 50 2 Q 75 22 100 2 Q 125 22 150 2 Q 175 22 200 2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            style={{ pathLength: reduce ? 1 : draw }}
          />
        </svg>
      </div>
      <div className="mt-8">
        <h3 className="font-serif text-2xl leading-snug text-cream">
          {step.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-cream/75">
          {step.body}
        </p>
      </div>
    </motion.li>
  );
}
