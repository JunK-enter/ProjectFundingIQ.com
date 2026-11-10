import { NextRequest, NextResponse } from "next/server";
import {
  addClicks,
  clearClicks,
  listClicks,
  listPaths,
  type ClickEvent,
} from "@/lib/heatmap-store";

function authorized(request: NextRequest) {
  const required = process.env.HEATMAP_ACCESS_KEY;
  if (!required) return true;
  const fromQuery = request.nextUrl.searchParams.get("key");
  const fromHeader = request.headers.get("x-heatmap-key");
  return fromQuery === required || fromHeader === required;
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pathName = request.nextUrl.searchParams.get("path") || undefined;
  const [events, paths] = await Promise.all([
    listClicks(pathName),
    listPaths(),
  ]);

  return NextResponse.json({
    events,
    paths,
    total: events.length,
  });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const events = Array.isArray(body)
    ? body
    : Array.isArray((body as { events?: unknown })?.events)
      ? ((body as { events: ClickEvent[] }).events)
      : null;

  if (!events) {
    return NextResponse.json({ error: "Expected events array" }, { status: 400 });
  }

  if (events.length > 40) {
    return NextResponse.json({ error: "Too many events" }, { status: 400 });
  }

  const total = await addClicks(events as ClickEvent[]);
  return NextResponse.json({ ok: true, total });
}

export async function DELETE(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await clearClicks();
  return NextResponse.json({ ok: true });
}
