"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { ClickEvent } from "@/lib/heatmap-store";

type PathCount = { path: string; count: number };

function drawHeatmap(
  canvas: HTMLCanvasElement,
  events: ClickEvent[],
  width: number,
  height: number,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.max(1, Math.floor(width * dpr));
  canvas.height = Math.max(1, Math.floor(height * dpr));
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  if (!events.length) return;

  const radius = Math.max(28, Math.min(width, height) * 0.04);
  for (const event of events) {
    const x = event.x * width;
    const y = event.y * height;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, "rgba(255, 48, 48, 0.55)");
    gradient.addColorStop(0.35, "rgba(255, 160, 32, 0.28)");
    gradient.addColorStop(0.7, "rgba(64, 160, 255, 0.12)");
    gradient.addColorStop(1, "rgba(64, 160, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function HeatmapViewer() {
  const searchParams = useSearchParams();
  const accessKey = searchParams.get("key") || "";
  const [path, setPath] = useState("/");
  const [paths, setPaths] = useState<PathCount[]>([]);
  const [events, setEvents] = useState<ClickEvent[]>([]);
  const [status, setStatus] = useState("Loading clicks…");
  const [opacity, setOpacity] = useState(0.72);
  const [frameHeight, setFrameHeight] = useState(900);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const refresh = useCallback(async () => {
    try {
      const params = new URLSearchParams({ path });
      if (accessKey) params.set("key", accessKey);
      const response = await fetch(`/api/heatmap?${params.toString()}`, {
        cache: "no-store",
      });
      const data = (await response.json()) as {
        events?: ClickEvent[];
        paths?: PathCount[];
        total?: number;
        error?: string;
      };
      if (!response.ok) {
        setStatus(data.error || `Could not load clicks (${response.status})`);
        return;
      }
      const nextEvents = Array.isArray(data.events) ? data.events : [];
      const nextPaths = Array.isArray(data.paths) ? data.paths : [];
      setEvents(nextEvents);
      setPaths(nextPaths);
      const total = data.total ?? nextEvents.length;
      setStatus(
        total
          ? `${total} click${total === 1 ? "" : "s"} on this page`
          : "No clicks on this page yet — browse the site, then refresh",
      );
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Could not load clicks",
      );
    }
  }, [accessKey, path]);

  useEffect(() => {
    void refresh();
    const id = window.setInterval(() => {
      void refresh();
    }, 10_000);
    return () => window.clearInterval(id);
  }, [refresh]);

  const paint = useCallback(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!frame || !canvas) return;
    const doc = frame.contentDocument;
    if (!doc?.documentElement) return;
    const width = Math.max(doc.documentElement.scrollWidth, frame.clientWidth, 1);
    const height = Math.max(
      doc.documentElement.scrollHeight,
      frame.clientHeight,
      1,
    );
    const capped = Math.min(height, 5000);
    setFrameHeight(capped);
    drawHeatmap(canvas, events, width, capped);
  }, [events]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const onLoad = () => {
      window.setTimeout(paint, 250);
      window.setTimeout(paint, 1000);
    };
    frame.addEventListener("load", onLoad);
    if (frame.contentDocument?.readyState === "complete") onLoad();
    return () => frame.removeEventListener("load", onLoad);
  }, [paint, path]);

  useEffect(() => {
    paint();
  }, [paint, opacity, frameHeight]);

  const clearAll = async () => {
    if (!window.confirm("Clear all recorded clicks?")) return;
    const params = accessKey ? `?key=${encodeURIComponent(accessKey)}` : "";
    await fetch(`/api/heatmap${params}`, { method: "DELETE" });
    await refresh();
  };

  const options = paths.length ? paths : [{ path: "/", count: 0 }];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end gap-3">
        <label className="grid gap-1 text-sm text-muted">
          Page
          <select
            className="min-h-11 rounded-[10px] border border-line bg-white px-3 text-ink"
            value={path}
            onChange={(event) => setPath(event.target.value)}
          >
            {options.map((item) => (
              <option key={item.path} value={item.path}>
                {item.path} ({item.count})
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm text-muted">
          Overlay
          <input
            type="range"
            min={0.2}
            max={1}
            step={0.05}
            value={opacity}
            onChange={(event) => setOpacity(Number(event.target.value))}
            className="min-w-[10rem]"
          />
        </label>
        <button
          type="button"
          onClick={() => void refresh()}
          className="min-h-11 rounded-[10px] border border-line bg-white px-4 text-sm font-medium text-ink"
        >
          Refresh
        </button>
        <button
          type="button"
          onClick={() => void clearAll()}
          className="min-h-11 rounded-[10px] border border-line bg-white px-4 text-sm font-medium text-clay"
        >
          Clear clicks
        </button>
        <p className="pb-2 text-sm text-muted" data-heatmap-status>
          {status}
        </p>
      </div>

      <div
        className="relative overflow-hidden rounded-[14px] border border-line bg-white"
        style={{ height: frameHeight }}
      >
        <iframe
          ref={frameRef}
          title={`Heatmap preview for ${path}`}
          src={path}
          className="absolute inset-0 h-full w-full border-0"
        />
        <canvas
          ref={canvasRef}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0"
          style={{ opacity }}
        />
      </div>

      <div className="overflow-x-auto rounded-[14px] border border-line">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-surface text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">When</th>
              <th className="px-4 py-3 font-medium">Position</th>
              <th className="px-4 py-3 font-medium">Target</th>
            </tr>
          </thead>
          <tbody>
            {[...events]
              .reverse()
              .slice(0, 40)
              .map((event) => (
                <tr
                  key={`${event.t}-${event.x}-${event.y}-${event.label || ""}`}
                  className="border-t border-line"
                >
                  <td className="px-4 py-2 text-muted">
                    {new Date(event.t).toLocaleString("en-US", {
                      timeZone: "America/Los_Angeles",
                    })}
                  </td>
                  <td className="px-4 py-2 tabular-nums text-ink">
                    {Math.round(event.x * 100)}% × {Math.round(event.y * 100)}%
                  </td>
                  <td className="px-4 py-2 text-ink">{event.label || "—"}</td>
                </tr>
              ))}
            {!events.length ? (
              <tr>
                <td className="px-4 py-6 text-muted" colSpan={3}>
                  Browse the live site and click around, then refresh this page.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
