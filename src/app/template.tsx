"use client";

import { useEffect, useState } from "react";
import { ViewTransition } from "react";
import { useReducedMotion } from "framer-motion";

let booted = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [boot] = useState(() => !booted);

  useEffect(() => {
    booted = true;
  }, []);

  return (
    <ViewTransition
      enter={reduce ? "none" : "page"}
      exit={reduce ? "none" : "page"}
      default="none"
    >
      <div className={!reduce && boot ? "page-boot" : undefined}>{children}</div>
    </ViewTransition>
  );
}
