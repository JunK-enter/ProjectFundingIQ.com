"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type QueuedClick = {
  path: string;
  x: number;
  y: number;
  vw: number;
  vh: number;
  dw: number;
  dh: number;
  t: number;
  label?: string;
};

function labelFor(target: EventTarget | null) {
  if (!(target instanceof Element)) return undefined;
  const el =
    target.closest("a, button, [role='button'], input, summary, label") ||
    target;
  const text = (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);
  const tag = el.tagName.toLowerCase();
  return text ? `${tag}: ${text}` : tag;
}

export function ClickTracker() {
  const pathname = usePathname();
  const queue = useRef<QueuedClick[]>([]);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!pathname || pathname.startsWith("/insights")) return;
    // Skip recording when the page is previewed inside the heatmap viewer.
    if (window.self !== window.top) return;

    const flush = () => {
      if (!queue.current.length) return;
      const events = queue.current.splice(0, queue.current.length);
      const body = JSON.stringify({ events });
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        navigator.sendBeacon(
          "/api/heatmap",
          new Blob([body], { type: "application/json" }),
        );
        return;
      }
      void fetch("/api/heatmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    };

    const schedule = () => {
      if (timer.current != null) return;
      timer.current = window.setTimeout(() => {
        timer.current = null;
        flush();
      }, 700);
    };

    const onClick = (event: MouseEvent) => {
      if (event.button !== 0) return;
      const doc = document.documentElement;
      const width = Math.max(doc.scrollWidth, window.innerWidth, 1);
      const height = Math.max(doc.scrollHeight, window.innerHeight, 1);
      const x = (event.pageX / width);
      const y = (event.pageY / height);
      if (!Number.isFinite(x) || !Number.isFinite(y)) return;

      queue.current.push({
        path: pathname,
        x: Math.min(1, Math.max(0, x)),
        y: Math.min(1, Math.max(0, y)),
        vw: window.innerWidth,
        vh: window.innerHeight,
        dw: width,
        dh: height,
        t: Date.now(),
        label: labelFor(event.target),
      });
      if (queue.current.length >= 12) flush();
      else schedule();
    };

    window.addEventListener("click", onClick, { capture: true, passive: true });
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") flush();
    });

    return () => {
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("pagehide", flush);
      if (timer.current != null) window.clearTimeout(timer.current);
      flush();
    };
  }, [pathname]);

  return null;
}
