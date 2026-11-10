"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { ClickTracker } from "./ClickTracker";
import { ScrollProgress } from "./velora/scroll-progress";

export function MotionLayer() {
  const reduce = useReducedMotion();

  return (
    <>
      {reduce === false ? (
        <ReactLenis root options={{ lerp: 0.11, wheelMultiplier: 0.95 }} />
      ) : null}
      <ScrollProgress />
      <ClickTracker />
    </>
  );
}
