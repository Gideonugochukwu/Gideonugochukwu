import { NextResponse } from "next/server";
import {
  INDEXNOW_HOST,
  INDEXNOW_KEY,
  INDEXNOW_KEY_LOCATION,
  submitToIndexNow,
} from "@/lib/indexnow";

export const runtime = "nodejs";
// Never prerender — this is an on-demand notification endpoint.
export const dynamic = "force-dynamic";

// Accepts a single URL or a list and forwards it to IndexNow, which fans the
// notification out to Bing, Yandex, and other participating engines.
//
//   POST /api/indexnow
//   { "url": "https://globalannotate.com/languages" }
//   { "urls": ["https://globalannotate.com/a", "https://globalannotate.com/b"] }
//
// Only URLs on the canonical host are accepted — IndexNow rejects mismatched
// hosts, and this stops the endpoint from being used to submit third-party
// URLs under our key.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const { url, urls } = (body ?? {}) as { url?: unknown; urls?: unknown };
  const candidates = [
    ...(typeof url === "string" ? [url] : []),
    ...(Array.isArray(urls) ? urls.filter((u): u is string => typeof u === "string") : []),
  ];

  if (candidates.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Provide `url` (string) or `urls` (string[])." },
      { status: 400 }
    );
  }

  const valid: string[] = [];
  for (const candidate of candidates) {
    let parsed: URL;
    try {
      parsed = new URL(candidate);
    } catch {
      return NextResponse.json(
        { ok: false, error: `Not a valid URL: ${candidate}` },
        { status: 400 }
      );
    }
    if (parsed.host !== INDEXNOW_HOST) {
      return NextResponse.json(
        { ok: false, error: `URL host must be ${INDEXNOW_HOST}: ${candidate}` },
        { status: 400 }
      );
    }
    valid.push(parsed.toString());
  }

  try {
    const result = await submitToIndexNow(valid);
    return NextResponse.json(
      {
        ok: result.ok,
        submitted: valid,
        key: INDEXNOW_KEY,
        keyLocation: INDEXNOW_KEY_LOCATION,
        indexnow: { status: result.status, statusText: result.statusText },
      },
      { status: result.ok ? 200 : 502 }
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: `IndexNow request failed: ${(error as Error).message}` },
      { status: 502 }
    );
  }
}
