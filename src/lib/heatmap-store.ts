import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type ClickEvent = {
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

const MAX_EVENTS = 8_000;
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "clicks.json");

type HeatmapState = {
  events: ClickEvent[];
  loadPromise?: Promise<void>;
};

const globalStore = globalThis as typeof globalThis & {
  __heatmapStore?: HeatmapState;
};

function state(): HeatmapState {
  if (!globalStore.__heatmapStore) {
    globalStore.__heatmapStore = { events: [] };
  }
  return globalStore.__heatmapStore;
}

async function ensureLoaded() {
  const store = state();
  if (!store.loadPromise) {
    store.loadPromise = (async () => {
      try {
        const raw = await readFile(DATA_FILE, "utf8");
        const parsed = JSON.parse(raw) as { events?: ClickEvent[] };
        if (Array.isArray(parsed.events)) {
          store.events = parsed.events.slice(-MAX_EVENTS);
        }
      } catch {
        store.events = [];
      }
    })();
  }
  await store.loadPromise;
}

async function persist() {
  const store = state();
  try {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(
      DATA_FILE,
      JSON.stringify({ events: store.events.slice(-MAX_EVENTS) }),
      "utf8",
    );
  } catch {
    // Serverless or read-only filesystems can skip disk persistence.
  }
}

export async function addClicks(events: ClickEvent[]) {
  await ensureLoaded();
  const store = state();
  const cleaned = events
    .filter(
      (event) =>
        typeof event.path === "string" &&
        event.path.startsWith("/") &&
        !event.path.startsWith("/insights") &&
        Number.isFinite(event.x) &&
        Number.isFinite(event.y) &&
        event.x >= 0 &&
        event.x <= 1 &&
        event.y >= 0 &&
        event.y <= 1,
    )
    .map((event) => ({
      path: event.path.slice(0, 200),
      x: Number(event.x.toFixed(4)),
      y: Number(event.y.toFixed(4)),
      vw: Math.max(0, Math.round(event.vw || 0)),
      vh: Math.max(0, Math.round(event.vh || 0)),
      dw: Math.max(0, Math.round(event.dw || 0)),
      dh: Math.max(0, Math.round(event.dh || 0)),
      t: Number.isFinite(event.t) ? event.t : Date.now(),
      label:
        typeof event.label === "string"
          ? event.label.slice(0, 120)
          : undefined,
    }));

  if (!cleaned.length) return store.events.length;
  store.events.push(...cleaned);
  if (store.events.length > MAX_EVENTS) {
    store.events = store.events.slice(-MAX_EVENTS);
  }
  await persist();
  return store.events.length;
}

export async function listClicks(pathname?: string) {
  await ensureLoaded();
  const store = state();
  if (!pathname) return store.events;
  return store.events.filter((event) => event.path === pathname);
}

export async function listPaths() {
  await ensureLoaded();
  const counts = new Map<string, number>();
  for (const event of state().events) {
    counts.set(event.path, (counts.get(event.path) || 0) + 1);
  }
  return [...counts.entries()]
    .map(([pathName, count]) => ({ path: pathName, count }))
    .sort((a, b) => b.count - a.count || a.path.localeCompare(b.path));
}

export async function clearClicks() {
  await ensureLoaded();
  const store = state();
  store.events = [];
  await persist();
}
