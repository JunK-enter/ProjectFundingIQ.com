"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { ScrollProgress } from "./velora/scroll-progress";
import { SmoothCursor } from "./velora/smooth-cursor";

export function MotionLayer() {
  const reduce = useReducedMotion();

  return (
    <>
      {reduce === false ? (
        <ReactLenis root options={{ lerp: 0.11, wheelMultiplier: 0.95 }} />
      ) : null}
      <ScrollProgress />
      <SmoothCursor dotClassName="bg-cream" ringClassName="border-cream/80" />
    </>
  );
}
