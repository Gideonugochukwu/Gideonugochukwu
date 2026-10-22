import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Server-side relay for the /zh quote and review forms (see lib/form-submit).
// Only the two configured Formspree endpoints can be reached — the client
// picks a form by name, never by URL, so this can't be used as an open proxy.
const ENDPOINTS: Record<string, string | undefined> = {
  quote: process.env.NEXT_PUBLIC_FORMSPREE_QUOTE_ENDPOINT,
  review: process.env.NEXT_PUBLIC_FORMSPREE_REVIEW_ENDPOINT,
};

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }
  const { form, payload } = (body ?? {}) as { form?: unknown; payload?: unknown };
  const endpoint = typeof form === "string" ? ENDPOINTS[form] : undefined;
  if (!endpoint) {
    return NextResponse.json({ ok: false, error: "Unknown or unconfigured form." }, { status: 400 });
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ ok: false, error: "Missing payload." }, { status: 400 });
  }
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    return NextResponse.json({ ok: res.ok }, { status: res.ok ? 200 : 502 });
  } catch {
    return NextResponse.json({ ok: false, error: "Upstream request failed." }, { status: 502 });
  }
}
