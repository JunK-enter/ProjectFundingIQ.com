"use client";

import { useEffect, useState } from "react";
import { ViewTransition } from "react";

let booted = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const [boot] = useState(() => !booted);

  useEffect(() => {
    booted = true;
  }, []);

  return (
    <ViewTransition enter="page" exit="page" default="none">
      <div className={boot ? "page-boot" : undefined}>{children}</div>
    </ViewTransition>
  );
}
