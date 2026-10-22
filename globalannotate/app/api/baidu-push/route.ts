import { NextResponse } from "next/server";
import { isZhUrl, submitToBaidu } from "@/lib/baidu-push";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Submits new or changed /zh URLs to Baidu's URL submission endpoint.
//
//   POST /api/baidu-push
//   Authorization: Bearer <BAIDU_PUSH_SECRET>        (required when set)
//   { "urls": ["https://globalannotate.com/zh/languages"] }
//
// With no body (or an empty `urls` list) every URL in /sitemap-zh.xml is
// submitted. Only https://globalannotate.com/zh… URLs are accepted. The Baidu
// token is read from BAIDU_PUSH_TOKEN and never echoed back. Baidu enforces a
// daily quota, so set BAIDU_PUSH_SECRET in production to stop others from
// spending it.
export async function POST(request: Request) {
  const token = process.env.BAIDU_PUSH_TOKEN;
  if (!token) {
    return NextResponse.json(
      { ok: false, error: "BAIDU_PUSH_TOKEN is not configured." },
      { status: 503 }
    );
  }

  const secret = process.env.BAIDU_PUSH_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  let requested: string[] = [];
  const raw = await request.text();
  if (raw.trim()) {
    try {
      const { url, urls } = JSON.parse(raw) as { url?: unknown; urls?: unknown };
      requested = [
        ...(typeof url === "string" ? [url] : []),
        ...(Array.isArray(urls) ? urls.filter((u): u is string => typeof u === "string") : []),
      ];
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
    }
  }

  if (requested.length === 0) {
    try {
      // Public files aren't bundled with serverless functions, so the
      // deployed sitemap is fetched from this deployment's own origin.
      const res = await fetch(new URL("/sitemap-zh.xml", request.url));
      if (!res.ok) throw new Error(String(res.status));
      const xml = await res.text();
      requested = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), (m) => m[1].trim());
    } catch {
      return NextResponse.json(
        { ok: false, error: "Could not read sitemap-zh.xml; pass `urls` explicitly." },
        { status: 500 }
      );
    }
  }

  const rejected = requested.filter((u) => !isZhUrl(u));
  if (rejected.length > 0) {
    return NextResponse.json(
      { ok: false, error: "Only https://globalannotate.com/zh URLs are accepted.", rejected },
      { status: 400 }
    );
  }
  const urls = Array.from(new Set(requested));

  try {
    const result = await submitToBaidu(urls, token);
    return NextResponse.json(
      { ok: result.ok, submitted: urls.length, baidu: result.body },
      { status: result.ok ? 200 : 502 }
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: `Baidu request failed: ${(error as Error).message}` },
      { status: 502 }
    );
  }
}
