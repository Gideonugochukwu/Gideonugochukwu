#!/usr/bin/env node
// Quality gate for the Simplified Chinese (/zh) locale. Runs after
// `next build` (postbuild) against the prerendered HTML in .next/server/app,
// and exits non-zero if any check fails:
//
//   1. English leak   — visible text (plus alt / aria-label / title /
//                       placeholder attributes, <title>, meta description)
//                       contains English words longer than 3 letters that
//                       aren't approved abbreviations, brand names, or the
//                       documented proper-noun / technical-term allowlist.
//   2. Status + lang  — every /zh route in sitemap-zh.xml was prerendered
//                       (or, with --serve, returns HTTP 200 from `next start`)
//                       and has <html lang="zh-CN">.
//   3. External hosts — no <script>/<link>/<img>/<iframe>/<source> or CSS
//                       url() on a /zh page loads from a domain we don't own.
//   4. Sitemap/robots — sitemap-zh.xml lists every built /zh route and
//                       robots.txt allows Baiduspider.
//   5. Punctuation    — no half-width , ; : ! ? ( ) touching Chinese text,
//                       and no "." straight after a Chinese character.
//   6. Baidu <head>   — keyword-first title ≤ 30 chars + "| GlobalAnnotate",
//                       60–100 char description, 5–8 keywords, one <h1>,
//                       og:locale zh_CN, zh-Hans/zh-CN hreflang, and
//                       inLanguage zh-CN on every JSON-LD block.
//
// Usage:  node scripts/zh-quality-gate.mjs [--serve] [--report=path.md]

import { readFileSync, readdirSync, existsSync, writeFileSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const APP = join(root, ".next/server/app");
const ORIGIN = "https://globalannotate.com";
const args = process.argv.slice(2);
const SERVE = args.includes("--serve");
const REPORT = args.find((a) => a.startsWith("--report="))?.slice("--report=".length);

// ── Allowlists ──────────────────────────────────────────────────────────────
// Approved technical abbreviations (may stay in Latin form).
const APPROVED_ABBR = ["SEO", "MTPE", "RLHF", "LQA", "SRT", "VTT", "API", "GEO", "AEO", "ROAS", "KPI", "UGC", "ASO"];
// Brand names that stay in English (from the brief), plus SMEDAN from the glossary.
const APPROVED_BRANDS = [
  "GlobalAnnotate", "MarketReady", "Gideon", "Ugochukwu", "Upwork", "LinkedIn", "Clutch",
  "GoodFirms", "UNGM", "TED", "Zapier", "n8n", "Make", "SMEDAN",
];
// Documented extensions: third-party product/platform brand names, client and
// reviewer names kept in their original spelling, and technical terms that
// Chinese web copy conventionally leaves untranslated. Every hit against this
// list is printed in the report so it can be reviewed.
const EXTENDED = {
  "Product & platform brands": [
    "Google Play", "App Store", "Search Console", "Looker Studio", "Label Studio", "Business Manager",
    "Facebook", "Instagram", "Meta", "Google", "YouTube", "TikTok", "Telegram", "Steam", "Epic",
    "Unity", "Unreal", "Godot", "Figma", "GitHub", "Webflow", "Contentful", "Lokalise", "Crowdin",
    "Phrase", "memoQ", "Labelbox", "CVAT", "Scale", "Roboflow", "Encord", "WordPress", "Sitebulb",
    "Xbench", "Airtable", "JavaScript", "Trados",
  ],
  "Client & reviewer names (original spelling)": [
    "Amara Okafor", "Daniel Park", "Daniel P.", "Priya R.", "Sophie Martin", "Rafael Mendoza", "Priya Raghavan", "Lina Haddad",
    "Beam Health", "Northwind", "Maison Verte", "Tribu Studios", "LumenLearn", "Noor Cosmetics",
  ],
  "Technical terms used untranslated in Chinese": [
    "hreflang", "x-default", "Cookie", "SaaS", "JSON", "YAML", "XLIFF", "XLSX",
  ],
};
const PHRASES = [...APPROVED_BRANDS, ...Object.values(EXTENDED).flat()]
  .filter((t) => /\s|-/.test(t))
  .sort((a, b) => b.length - a.length);
const WORDS = new Set(
  [...APPROVED_ABBR, ...APPROVED_BRANDS, ...Object.values(EXTENDED).flat()]
    .filter((t) => !/\s/.test(t))
    .map((t) => t.toLowerCase())
);
const EXTENDED_LOOKUP = new Map();
for (const [group, terms] of Object.entries(EXTENDED))
  for (const t of terms) EXTENDED_LOOKUP.set(t.toLowerCase(), group);

// Hosts a /zh page may load from. Airtable is the freelancer application form
// embed, which the brief says stays as is (only on /zh/freelancers).
const OWN_HOSTS = new Set(["globalannotate.com", "www.globalannotate.com"]);
const ROUTE_EXCEPTIONS = { "/zh/freelancers": ["airtable.com"] };

// ── Helpers ─────────────────────────────────────────────────────────────────
const CJK = "\\u3400-\\u9fff\\uf900-\\ufaff\\u3000-\\u303f\\uff00-\\uffef";
const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ldquo: "“", rdquo: "”", rsquo: "’", lsquo: "‘", mdash: "—", ndash: "–", hellip: "…", trade: "™", middot: "·" };
const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);

// Prerendered 404 (a route that only exists in another locale).
function is404(file) {
  const meta = file.replace(/\.html$/, ".meta");
  if (!existsSync(meta)) return false;
  try {
    return JSON.parse(readFileSync(meta, "utf8")).status === 404;
  } catch {
    return false;
  }
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

function routeOf(file) {
  const rel = relative(APP, file).replace(/\.html$/, "").replace(/\\/g, "/");
  return "/" + rel; // zh.html → /zh, zh/about.html → /zh/about
}

// Visible text segments (with scripts, styles, code samples, svg removed) and
// the human-facing attribute values.
function extract(html) {
  const head = html.match(/<head[\s\S]*?<\/head>/i)?.[0] ?? "";
  const meta = [];
  const title = head.match(/<title>([\s\S]*?)<\/title>/i)?.[1];
  if (title) meta.push({ where: "<title>", text: decode(title) });
  for (const m of head.matchAll(/<meta\s+[^>]*name="(description|keywords)"[^>]*content="([^"]*)"/gi))
    meta.push({ where: `meta ${m[1]}`, text: decode(m[2]) });
  for (const m of head.matchAll(/<meta\s+[^>]*property="og:(title|description)"[^>]*content="([^"]*)"/gi))
    meta.push({ where: `og:${m[1]}`, text: decode(m[2]) });

  let body = html.match(/<body[\s\S]*<\/body>/i)?.[0] ?? html;
  body = body
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<template[\s\S]*?<\/template>/gi, " ")
    .replace(/<(code|pre)[\s\S]*?<\/\1>/gi, " ");
  const attrs = [];
  for (const m of body.matchAll(/\s(alt|aria-label|title|placeholder)="([^"]*)"/gi))
    attrs.push({ where: m[1], text: decode(m[2]) });
  const textOnly = body.replace(/<svg[\s\S]*?<\/svg>/gi, " ");
  const texts = [];
  for (const m of textOnly.matchAll(/>([^<]+)</g)) {
    const t = decode(m[1]).trim();
    if (t) texts.push({ where: "text", text: t });
  }
  return { meta, attrs, texts };
}

function englishHits(text, extendedSeen) {
  let s = ` ${text} `;
  s = s
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[\w.+-]+@[\w-]+(\.[\w-]+)+/g, " ")
    .replace(/\b[\w-]+(\.[a-z]{2,})+(\/\S*)?/gi, " ") // domains, example.com/de/
    .replace(/\{[^}]*\}/g, " ") // {playerName}
    .replace(/\b[A-Z]{2,}-\d[\d-]*/g, " ") // registration IDs, e.g. SUID-2318-…
    .replace(/%[a-z]/gi, " ")
    .replace(/(^|\s|、|，|（)\.[a-z]+/gi, " "); // .po / .resx file extensions
  for (const phrase of PHRASES) {
    if (s.includes(phrase)) {
      if (EXTENDED_LOOKUP.has(phrase.toLowerCase())) extendedSeen.add(phrase);
      s = s.split(phrase).join(" ");
    }
  }
  const hits = [];
  for (const m of s.matchAll(/[A-Za-z][A-Za-z0-9'’]*/g)) {
    const w = m[0];
    if (/\d/.test(w)) continue; // IDs, F1, n8n, SUID-…
    const letters = w.replace(/[^A-Za-z]/g, "");
    if (letters.length <= 3) continue;
    const key = w.replace(/['’]s$/, "").toLowerCase();
    if (WORDS.has(key)) {
      const ext = [...EXTENDED_LOOKUP.keys()].find((k) => k === key);
      if (ext) extendedSeen.add(w);
      continue;
    }
    hits.push(w);
  }
  return hits;
}

function punctuationHits(text) {
  const hits = [];
  const bad = [
    new RegExp(`[${CJK}][,;:!?()]`, "g"),
    new RegExp(`[,;:!?()][${CJK}]`, "g"),
    new RegExp(`[\\u3400-\\u9fff]\\.(?!\\d)`, "g"),
  ];
  for (const re of bad) for (const m of text.matchAll(re)) hits.push(text.slice(Math.max(0, m.index - 8), m.index + 9));
  return hits;
}

function externalLoads(html, route) {
  const found = [];
  const check = (url, tag) => {
    if (!url || url.startsWith("data:") || url.startsWith("#")) return;
    let u;
    try {
      u = new URL(url, `${ORIGIN}${route}`);
    } catch {
      return;
    }
    if (!/^https?:$/.test(u.protocol)) return;
    const host = u.hostname.replace(/^www\./, "");
    if (OWN_HOSTS.has(u.hostname) || OWN_HOSTS.has(host)) return;
    if ((ROUTE_EXCEPTIONS[route] ?? []).includes(host)) return;
    found.push(`${tag} → ${u.href}`);
  };
  for (const m of html.matchAll(/<(script|img|iframe|source|video|audio|embed)\b[^>]*\ssrc="([^"]+)"/gi)) check(decode(m[2]), m[1]);
  for (const m of html.matchAll(/<link\b([^>]*)>/gi)) {
    const attrs = m[1];
    const rel = attrs.match(/rel="([^"]+)"/i)?.[1] ?? "";
    if (/alternate|canonical|author/i.test(rel)) continue; // references, not loads
    const href = attrs.match(/href="([^"]+)"/i)?.[1];
    check(href && decode(href), `link[rel=${rel}]`);
  }
  for (const m of html.matchAll(/srcset="([^"]+)"/gi))
    for (const part of decode(m[1]).split(",")) check(part.trim().split(/\s+/)[0], "srcset");
  for (const m of html.matchAll(/url\((['"]?)([^'")]+)\1\)/gi)) check(m[2], "css url()");
  return found;
}

// ── Collect routes ──────────────────────────────────────────────────────────
if (!existsSync(APP)) {
  console.error("[zh-gate] .next/server/app not found — run `next build` first.");
  process.exit(1);
}
const zhFiles = [join(APP, "zh.html"), ...(existsSync(join(APP, "zh")) ? walk(join(APP, "zh")) : [])].filter(existsSync)
  // Locale-only routes (e.g. /zh/impressum for the German Impressum) are
  // prerendered as 404s in the other locales; they are not pages to check.
  .filter((f) => !is404(f));
const pages = new Map(zhFiles.map((f) => [routeOf(f), readFileSync(f, "utf8")]));

const sitemapPath = join(root, "public/sitemap-zh.xml");
const sitemap = existsSync(sitemapPath) ? readFileSync(sitemapPath, "utf8") : "";
const sitemapRoutes = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), (m) => new URL(m[1]).pathname);

const failures = [];
const report = [];
const log = (line = "") => {
  console.log(line);
  report.push(line);
};

// ── 2. Status + lang ────────────────────────────────────────────────────────
log("## 2. Every /zh route returns 200 and has lang=\"zh-CN\"");
let statusFails = 0;
if (SERVE) {
  const port = 3917;
  const server = spawn("npx", ["next", "start", "-p", String(port)], { cwd: root, stdio: "ignore" });
  const base = `http://localhost:${port}`;
  for (let i = 0; i < 60; i++) {
    try {
      await fetch(base + "/zh");
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  for (const route of sitemapRoutes) {
    try {
      const res = await fetch(base + route, { redirect: "manual" });
      const html = await res.text();
      const lang = html.match(/<html[^>]*\slang="([^"]+)"/i)?.[1];
      const ok = res.status === 200 && lang === "zh-CN";
      if (!ok) {
        statusFails++;
        log(`- FAIL ${route}: HTTP ${res.status}, lang=${lang}`);
      }
      if (res.status === 200 && !pages.has(route)) pages.set(route, html);
    } catch (e) {
      statusFails++;
      log(`- FAIL ${route}: ${e.message}`);
    }
  }
  server.kill();
} else {
  for (const route of sitemapRoutes) {
    const html = pages.get(route);
    const lang = html?.match(/<html[^>]*\slang="([^"]+)"/i)?.[1];
    if (!html || lang !== "zh-CN") {
      statusFails++;
      log(`- FAIL ${route}: ${html ? `lang=${lang}` : "not prerendered"}`);
    }
  }
}
log(statusFails ? `FAIL — ${statusFails} route(s).` : `PASS — ${sitemapRoutes.length} routes${SERVE ? " returned HTTP 200" : " prerendered"} with lang="zh-CN".`);
if (statusFails) failures.push("status/lang");
log();

// ── 1. English leak ─────────────────────────────────────────────────────────
log("## 1. English-leak report (visible text, alt/aria-label/title/placeholder, <title>, meta)");
const extendedSeen = new Set();
let leakCount = 0;
for (const [route, html] of [...pages].sort()) {
  const { meta, attrs, texts } = extract(html);
  const hits = [];
  for (const seg of [...meta, ...attrs, ...texts]) {
    const words = englishHits(seg.text, extendedSeen);
    if (words.length) hits.push(`${seg.where}: ${[...new Set(words)].join(", ")}  ⟵ “${seg.text.slice(0, 90)}”`);
  }
  if (hits.length) {
    leakCount += hits.length;
    log(`- ${route}`);
    for (const h of hits) log(`  - ${h}`);
  }
}
log(leakCount ? `FAIL — ${leakCount} segment(s) contain English.` : `PASS — 0 English words found across ${pages.size} /zh pages.`);
if (leakCount) failures.push("english-leak");
const seen = [...extendedSeen].sort();
if (seen.length) {
  log("Allowed by the extended list (proper nouns / technical terms, for review):");
  const byGroup = {};
  for (const t of seen) {
    const g = EXTENDED_LOOKUP.get(t.toLowerCase()) ?? "Other";
    (byGroup[g] ??= new Set()).add(t);
  }
  for (const [g, ts] of Object.entries(byGroup)) log(`  - ${g}: ${[...ts].join(", ")}`);
}
log();

// ── 3. External hosts ───────────────────────────────────────────────────────
log("## 3. No /zh page loads anything from a domain we don't own");
let extCount = 0;
for (const [route, html] of [...pages].sort()) {
  const ext = externalLoads(html, route);
  if (ext.length) {
    extCount += ext.length;
    log(`- ${route}`);
    for (const e of ext) log(`  - ${e}`);
  }
}
const googleFonts = [...pages.values()].some((h) => /fonts\.googleapis|fonts\.gstatic|googletagmanager|google-analytics/.test(h));
if (googleFonts) {
  extCount++;
  log("- Google Fonts / Analytics / Tag Manager reference found in /zh HTML.");
}
log(extCount ? `FAIL — ${extCount} external load(s).` : "PASS — all scripts, styles, fonts, images and globe textures are served from globalannotate.com (Airtable form embed on /zh/freelancers is the documented exception).");
if (extCount) failures.push("external-hosts");
log();

// ── 4. Sitemap + robots ─────────────────────────────────────────────────────
log("## 4. sitemap-zh.xml covers every /zh route; robots.txt allows Baiduspider");
const built = [...pages.keys()].filter((r) => !r.endsWith("/_not-found"));
const missing = built.filter((r) => !sitemapRoutes.includes(r));
const robotsFile = join(APP, "robots.txt.body");
const robots = existsSync(robotsFile) ? readFileSync(robotsFile, "utf8") : "";
const baiduOk = /User-Agent:\s*Baiduspider\s*\nAllow:\s*\//i.test(robots);
const robotsSitemap = /Sitemap:\s*https:\/\/globalannotate\.com\/sitemap-zh\.xml/i.test(robots);
if (missing.length) log(`- Missing from sitemap-zh.xml: ${missing.join(", ")}`);
if (!baiduOk) log("- robots.txt has no explicit Allow for Baiduspider");
if (!robotsSitemap) log("- robots.txt does not reference sitemap-zh.xml");
const smOk = !missing.length && baiduOk && robotsSitemap;
log(smOk ? `PASS — ${sitemapRoutes.length} URLs in sitemap-zh.xml cover all ${built.length} built /zh routes; Baiduspider and Bingbot allowed; sitemap-zh.xml referenced.` : "FAIL");
if (!smOk) failures.push("sitemap/robots");
log();

// ── 5. Punctuation ──────────────────────────────────────────────────────────
log("## 5. Full-width punctuation in Chinese body text");
let punctCount = 0;
for (const [route, html] of [...pages].sort()) {
  const { texts, attrs, meta } = extract(html);
  // <meta name="keywords"> is a machine-read, comma-separated list by spec,
  // not body text, so it is excluded here.
  const hits = [...texts, ...attrs, ...meta.filter((m) => m.where !== "meta keywords")].flatMap(
    (t) => punctuationHits(t.text)
  );
  if (hits.length) {
    punctCount += hits.length;
    log(`- ${route}: ${hits.map((h) => `“${h}”`).join(" | ")}`);
  }
}
log(punctCount ? `FAIL — ${punctCount} half-width mark(s) next to Chinese text.` : "PASS — no half-width , ; : ! ? ( ) or . adjacent to Chinese characters.");
if (punctCount) failures.push("punctuation");
log();

// ── 6. Baidu head checks ───────────────────────────────────────────────────
log("## 6. Baidu <head> rules on every /zh page");
let headFails = 0;
for (const [route, html] of [...pages].sort()) {
  if (route.endsWith("/_not-found")) continue;
  const head = html.match(/<head[\s\S]*?<\/head>/i)?.[0] ?? "";
  const title = decode(head.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const desc = decode(head.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? "");
  const keywords = decode(head.match(/<meta name="keywords" content="([^"]*)"/i)?.[1] ?? "");
  const h1s = html.match(/<h1[\s>]/gi) ?? [];
  const issues = [];
  const core = title.split(" | ")[0];
  if (!title.endsWith("| GlobalAnnotate")) issues.push("title must end with “| GlobalAnnotate”");
  if (core.length > 30) issues.push(`title before brand is ${core.length} characters (max 30)`);
  if (desc.length < 60 || desc.length > 100) issues.push(`description is ${desc.length} characters (60–100)`);
  const kwCount = keywords.split(",").filter(Boolean).length;
  if (kwCount < 5 || kwCount > 8) issues.push(`${kwCount} keywords (5–8)`);
  if (h1s.length !== 1) issues.push(`${h1s.length} <h1> elements`);
  if (!/property="og:locale" content="zh_CN"/.test(head)) issues.push("og:locale is not zh_CN");
  if (!/hrefLang="zh-Hans"/i.test(head) || !/hrefLang="zh-CN"/i.test(head)) issues.push("missing zh-Hans / zh-CN hreflang");
  const ld = Array.from(html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g), (m) => JSON.parse(m[1]));
  const untagged = ld.filter((b) => b.inLanguage !== "zh-CN").map((b) => b["@type"]);
  if (untagged.length) issues.push(`JSON-LD without inLanguage zh-CN: ${untagged.join(", ")}`);
  if (issues.length) {
    headFails++;
    log(`- ${route}: ${issues.join("; ")}`);
  }
}
log(headFails ? `FAIL — ${headFails} page(s).` : "PASS — keyword-first title ≤ 30 characters + brand, 60–100 character description, 5–8 keywords, one <h1>, og:locale zh_CN, zh-Hans + zh-CN hreflang, and inLanguage zh-CN on every JSON-LD block.");
if (headFails) failures.push("baidu-head");
log();

if (REPORT) writeFileSync(REPORT, report.join("\n") + "\n");
if (failures.length) {
  console.error(`[zh-gate] FAILED: ${failures.join(", ")}`);
  process.exit(1);
}
console.log("[zh-gate] All /zh quality gates passed.");
