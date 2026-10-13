"use client";

import type { Variants } from "motion/react";
import { motion, useReducedMotion } from "motion/react";
import type { HTMLAttributes } from "react";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export interface ArrowUturnLeftIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowUturnLeftIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

type IconState = "normal" | "animate";

const STRETCH_VARIANTS: Variants = {
  normal: { scaleX: 1, x: 0, opacity: 1 },
  animate: {
    scaleX: [1, 1.15, 1],
    x: [0, -1.5, 0],
    transition: {
      duration: 0.45,
      ease: "easeInOut",
    },
  },
};

const ArrowUturnLeftIcon = forwardRef<
  ArrowUturnLeftIconHandle,
  ArrowUturnLeftIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const reduce = useReducedMotion();
  const [state, setState] = useState<IconState>("normal");
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;

    return {
      startAnimation: () => setState("animate"),
      stopAnimation: () => setState("normal"),
    };
  });

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        onMouseEnter?.(e);
      } else {
        setState("animate");
      }
    },
    [onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isControlledRef.current) {
        onMouseLeave?.(e);
      } else {
        setState("normal");
      }
    },
    [onMouseLeave]
  );

  return (
    <div
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <svg
        fill="none"
        height={size}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 9h12a6 6 0 0 1 0 12h-3" />
        <motion.g
          animate={reduce ? "normal" : state}
          initial={false}
          variants={STRETCH_VARIANTS}
        >
          <path d="M9 15 3 9m0 0 6-6" />
        </motion.g>
      </svg>
    </div>
  );
});

ArrowUturnLeftIcon.displayName = "ArrowUturnLeftIcon";

export { ArrowUturnLeftIcon };
