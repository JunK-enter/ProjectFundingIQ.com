"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const instant = { duration: 0 };

export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const MotionTag = as === "li" ? motion.li : motion.div;
  const shown = { opacity: 1, y: 0 };

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={reduce ? shown : undefined}
      whileInView={reduce ? undefined : shown}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={reduce ? instant : { duration: 0.72, ease, delay }}
    >
      {children}
    </MotionTag>
  );
}

export function Stagger({
  children,
  className = "",
  as = "div",
  stagger = 0.07,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ol" | "ul";
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const MotionTag = as === "ol" ? motion.ol : as === "ul" ? motion.ul : motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate={reduce ? "show" : undefined}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      variants={{
        hidden: {},
        show: {
          transition: reduce
            ? instant
            : { staggerChildren: stagger, delayChildren: 0.04 },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.li
      className={className}
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: reduce ? instant : { duration: 0.6, ease },
        },
      }}
    >
      {children}
    </motion.li>
  );
}
