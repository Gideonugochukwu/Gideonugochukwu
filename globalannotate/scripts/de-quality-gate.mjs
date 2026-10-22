#!/usr/bin/env node
// Quality gate for the German (/de) locale. Runs after `next build`
// (postbuild) against the prerendered HTML in .next/server/app and exits
// non-zero if any check fails:
//
//   1. English leak   — visible text (plus alt / aria-label / title /
//                       placeholder attributes, <title>, meta description,
//                       og:title / og:description) contains a word longer
//                       than 3 letters that occurs in the English (/en) pages'
//                       vocabulary and is not an approved abbreviation, brand
//                       name, or documented German/English homograph or
//                       proper noun.
//   2. Status + lang  — every /de URL in sitemap.xml was prerendered (or,
//                       with --serve, returns HTTP 200 from `next start`) and
//                       has <html lang="de">.
//   3. hreflang       — every /de page's <head> carries hreflang de, de-AT
//                       and de-CH pointing to the /de URL.
//   4. Legal pages    — /de/impressum and /de/privacy exist and the German
//                       footer links to both ("Impressum", "Datenschutz").
//   5. Sitemap        — sitemap.xml lists every built /de route.
//   6. Orthography    — no ae/oe/ue or ss stand-ins for umlauts and ß, no
//                       English-style quotation marks („ “ only), no ASCII
//                       double quotes, no English number formats (1,000 /
//                       0.08) or "$" amounts in visible text.
//   7. Google <head>  — title under 60 characters ending in
//                       "| GlobalAnnotate", 140–155 character description,
//                       exactly one <h1>, og:locale de_DE, and inLanguage
//                       "de" on every JSON-LD block.
//
// Usage:  node scripts/de-quality-gate.mjs [--serve] [--report=path.md]

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
// Approved technical abbreviations (from the brief).
const APPROVED_ABBR = ["SEO", "MTPE", "RLHF", "LQA", "SRT", "VTT", "API", "GEO", "AEO", "ROAS", "KPI", "UGC", "ASO", "KI"];
// Brand names that stay in English (from the brief), plus SMEDAN from the glossary.
const APPROVED_BRANDS = [
  "GlobalAnnotate", "MarketReady", "Gideon", "Ugochukwu", "Upwork", "LinkedIn", "Clutch",
  "GoodFirms", "UNGM", "TED", "Zapier", "n8n", "Make", "SMEDAN",
];
// Documented extensions. Every hit against this list is printed in the
// report so it can be reviewed.
const EXTENDED = {
  "Product & platform brands": [
    "Google Play", "App Store", "Search Console", "Looker Studio", "Label Studio", "Business Manager",
    "Unity Localization", "Unreal StringTables", "Godot CSV",
    "Facebook", "Instagram", "Meta", "Google", "YouTube", "TikTok", "Telegram", "Steam", "Epic",
    "Unity", "Unreal", "Godot", "Figma", "GitHub", "Webflow", "Contentful", "Lokalise", "Crowdin",
    "Phrase", "memoQ", "Labelbox", "CVAT", "Scale", "Roboflow", "Encord", "WordPress", "Sitebulb",
    "Xbench", "Airtable", "JavaScript", "Trados", "Smartling", "Shopify", "Slack", "Notion",
    "Analytics", "Word", "Excel", "Android", "iOS",
  ],
  "Client & reviewer names (original spelling)": [
    "Amara Okafor", "Daniel Park", "Daniel P.", "Priya R.", "Sophie Martin", "Rafael Mendoza", "Priya Raghavan", "Lina Haddad",
    "Beam Health", "Northwind", "Maison Verte", "Tribu Studios", "LumenLearn", "Noor Cosmetics",
  ],
  "Place names spelled the same in German": [
    "Lagos", "Kano", "Nairobi", "Dakar", "Accra", "London", "Toronto", "Berlin", "Paris", "Dubai",
    "Jakarta", "Tokio", "Riad", "São Paulo", "Québec", "Kigali", "Abuja", "Johannesburg", "Ghana",
    "Kenia", "Nigeria", "Senegal", "Uganda", "Ruanda", "Gambia", "Niger", "Benin", "Togo", "Kamerun",
    "Tschad", "Burundi", "Simbabwe", "Somalia", "Eritrea", "Mauretanien", "Kongo", "Kanada",
    "Mexiko", "Brasilien", "Indonesien", "Vietnam", "Japan", "Korea", "Indien", "Afrika", "Europa",
    "Asien", "Amerika", "Sahel",
  ],
  "Language names spelled the same in German": [
    "Hausa", "Yoruba", "Igbo", "Swahili", "Kiswahili", "Wolof", "Somali", "Zulu", "Shona", "Twi",
    "Tigrinya", "Oromo", "Kinyarwanda", "Kirundi", "Lingala", "Sango", "Xhosa", "isiXhosa", "Sotho",
    "Tswana", "Ndebele", "Ewe", "Mooré", "Kanuri", "Sheng", "Pidgin", "Fidel", "Ajami", "Boko",
    "Ge'ez", "Urdu", "Farsi", "Bantu",
  ],
  "Technical terms and file formats used untranslated in German": [
    "hreflang", "x-default", "SaaS", "JSON", "YAML", "XLIFF", "XLSX", "HTML", "ICU MessageFormat",
    "MessageFormat", "UTF", "Unicode", "Kanji", "ccTLD", "Alpha",
  ],
  // German words (Duden) that are spelled the same as an English word on
  // the /en pages. They are German here, not English leaks.
  "German words spelled like English words": [
    "Blog", "Cookie", "Cookies", "Software", "Marketing", "Team", "Teams", "Laptop", "Smartphone",
    "Tablet", "App", "Apps", "Name", "Namen", "Hand", "Start", "Plan", "Test", "Tests", "Status",
    "Format", "Formate", "Region", "Regionen", "Global", "Partner", "Partnern", "Projekt", "Sprint",
    "Analyse", "Konversion", "Konversionen", "Million", "Minute", "Minuten", "Daten", "Kontakt",
    "Service", "Problem", "Probleme", "Problemen", "Fokus", "Pilot", "Pilotprojekt", "Studio",
    "Studios", "Indie", "Engine", "Shop", "Shops", "Trailer", "Logistik", "Fakten", "Material",
    "Person", "Personen", "Branche", "Bank", "Banken", "Elite", "Agentur", "Kultur", "Stimme",
    "Text", "Texte", "Texten", "Wort", "Wörter", "Gold", "Goldstandard", "Fair", "Online",
    "Webinar", "Demo", "Chat", "Dialog", "Dialoge", "Dialogen", "Server", "Code", "Quelle",
    "Monitor", "Medien", "Video", "Videos", "Audio", "Band", "Mode", "Genre", "Genres", "Kontext",
    "Detail", "Details", "Optimierung", "Pixel", "Polygone", "Experte", "Experten", "Index",
    "Thema", "Themen", "Glossar", "Prototyp", "Prototypen", "Benchmark", "Startup", "Konsole",
    "Konsolen", "Ende", "Elemente", "Element", "Tutorial", "Hotel", "Gast", "Taxi", "Kontinent",
    "Real", "Ideal", "Fall", "Fälle", "Link", "Links", "Bonus", "Risiko", "Risiken", "Basis",
    "Mobil", "Interview", "Workshop", "Branding", "Startseite", "Story", "Super", "Zone",
    "Kategorie", "Kategorien", "Instanz", "Segment", "Segmente", "Segmentierung", "Fragment",
    "Formular", "Formulare", "Option", "Optionen", "Programm", "Programme", "System", "Systeme",
    "Systemen", "Prozess", "Prozesse", "Struktur", "Strukturen", "Methode", "Methoden",
    "Modell", "Modelle", "Modellen", "Qualität", "Original", "Kunst", "Wind", "Land", "Länder",
    "Mission", "Vision", "Fans", "Profil", "Profile", "Spezialist", "Spezialisten", "Fakt",
    "Hamburg", "Linguist", "Insights", "Feedback", "Content", "Workflow", "Release", "Store",
    "Follower", "Briefing", "Briefings", "Landingpage", "Landingpages",
    "Logo", "Logos", "Website", "Websites", "Boutique", "Internet", "Version", "Symbol", "Budget",
    "International", "Domain", "Starten", "Starts", "Fast", "Expansion", "Optional", "Generation",
    "Annotation", "Annotator", "Also", "Revision", "Will", "Training", "Standard", "Plus",
    "Position", "Personal", "Multimedia", "Layout", "Layouts", "Dollar", "Religion", "Migration",
    "Viral", "Mobile", "West", "Subdomains", "Engines", "Transparent", "Relevant", "Regional",
    "Parallel", "Trend", "Symptom", "Simulation", "Signal", "Schemas", "Reputation", "Quote",
    "Patient", "Moment", "Form", "Dimension", "Design", "Codes", "Cloud", "Browser", "Blind",
    "Banner", "Auto", "Finger", "Final", "Falls",
  ],
  "Place and language names (German spelling identical)": [
    "Ibadan", "Addis Abeba", "Lesotho", "China", "Hindi", "Fulfulde", "Tamil", "Telugu", "Tagalog",
    "Nepali", "Marathi", "Malayalam", "Kannada", "Gujarati", "Khmer", "Dari", "Nupe", "Ijaw",
    "Ibibio", "Efik", "Adlam",
  ],
  "Company names and statutes cited in the text": ["HSBC", "Pepsi", "KFC", "CCPA", "CPRA", "LGPD", "DSGVO", "DACH"],
  // Historical advertising slogans quoted verbatim in the MarketReady
  // article, each followed by its German rendering.
  "Quoted original slogans": [
    "Assume Nothing", "Finger-lickin’ good", "Come Alive with the Pepsi Generation",
  ],
  // Wording of the article title prescribed in the brief.
  "Prescribed title wording": ["Launch"],
};
// Of the loanwords above, these are anglicisms the brief asks to replace
// where a German term exists. They are allowed by the leak check (Duden
// lists them) but reported separately so they can be reviewed.
const ANGLICISMS = new Set(
  ["Insights", "Feedback", "Content", "Workflow", "Release", "Store", "Follower", "Briefing", "Briefings", "Landingpage", "Landingpages", "Demo", "Benchmark", "Startup", "Workshop", "Branding", "Story", "Webinar", "Tutorial"].map((w) => w.toLowerCase())
);

const PHRASES = [...APPROVED_BRANDS, ...Object.values(EXTENDED).flat()]
  .filter((t) => /\s|-|'/.test(t))
  .sort((a, b) => b.length - a.length);
const WORDS = new Set(
  [...APPROVED_ABBR, ...APPROVED_BRANDS, ...Object.values(EXTENDED).flat()]
    .filter((t) => !/\s/.test(t))
    .map((t) => t.toLowerCase())
);
const EXTENDED_LOOKUP = new Map();
for (const [group, terms] of Object.entries(EXTENDED))
  for (const t of terms) EXTENDED_LOOKUP.set(t.toLowerCase(), group);

// ── Helpers ─────────────────────────────────────────────────────────────────
const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ldquo: "“", rdquo: "”", bdquo: "„", rsquo: "’", lsquo: "‘", mdash: "—", ndash: "–", hellip: "…", trade: "™", middot: "·" };
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

const routeOf = (file) => "/" + relative(APP, file).replace(/\.html$/, "").replace(/\\/g, "/");
const isNotFound = (route) => /\/_not-found$/.test(route) || /^\/(_global-error|_not-found)/.test(route);

// Visible text segments (scripts, styles, code samples and svg removed) and
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

function clean(text) {
  return ` ${text} `
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[\w.+-]+@[\w-]+(\.[\w-]+)+/g, " ")
    .replace(/\b[\w-]+(\.[a-z]{2,})+(\/\S*)?/gi, " ") // domains, example.com/de/
    .replace(/\{[^}]*\}/g, " ") // {playerName}
    .replace(/\b[A-Z]{2,}-\d[\d-]*/g, " ") // registration IDs
    .replace(/%[a-z]/gi, " ")
    .replace(/(^|\s|\(|,)\.[a-z]+/gi, " "); // .po / .resx file extensions
}

// ── Collect pages ───────────────────────────────────────────────────────────
if (!existsSync(APP)) {
  console.error("[de-gate] .next/server/app not found — run `next build` first.");
  process.exit(1);
}
const deFiles = [join(APP, "de.html"), ...(existsSync(join(APP, "de")) ? walk(join(APP, "de")) : [])].filter(existsSync)
  // Locale-only routes (e.g. /zh/impressum for the German Impressum) are
  // prerendered as 404s in the other locales; they are not pages to check.
  .filter((f) => !is404(f));
const pages = new Map(deFiles.map((f) => [routeOf(f), readFileSync(f, "utf8")]));

// English vocabulary: every word of the prerendered English pages.
const enFiles = walk(APP).filter((f) => {
  const r = routeOf(f);
  return !/^\/(de|zh)(\/|$)/.test(r) && !/^\/(_global-error|_not-found)/.test(r);
});
const EN_VOCAB = new Set();
for (const f of enFiles) {
  const { meta, attrs, texts } = extract(readFileSync(f, "utf8"));
  for (const seg of [...meta, ...attrs, ...texts])
    for (const m of clean(seg.text).matchAll(/[A-Za-z][A-Za-z'’]*/g)) EN_VOCAB.add(m[0].replace(/['’]s$/, "").toLowerCase());
}

// Plus common English words, so a leak is caught even if the word happens not
// to occur on the English pages.
for (const w of `the and with your our for this that from have are you they them their there
  what when where which while who whom whose why how into onto than then these those been being
  were was does done doing would could should shall must might about after before again
  against among because between both during each every few more most other over same some such
  through under until very just only own here also both either neither nor not yet still
  please learn read view contact service services translation translations language languages
  native speaker speakers team project projects quality data training review reviews price
  pricing quote free fast best great better world global business company clients customer
  customers market markets launch launches localization localize annotation labeling
  marketing growth search content insight insights home blog case study studies work worked
  start started today learn more see all back next previous share email phone address submit
  send message name company website required optional thank thanks sorry error page found
  cookie cookies accept decline settings privacy terms policy rights reserved`.split(/\s+/))
  if (w) EN_VOCAB.add(w);

const sitemapFile = join(APP, "sitemap.xml.body");
const sitemap = existsSync(sitemapFile) ? readFileSync(sitemapFile, "utf8") : "";
const sitemapRoutes = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), (m) => new URL(m[1]).pathname).filter((p) =>
  /^\/de(\/|$)/.test(p)
);

const failures = [];
const report = [];
const log = (line = "") => {
  console.log(line);
  report.push(line);
};

// ── 2. Status + lang ────────────────────────────────────────────────────────
log('## 2. Every /de route returns 200 and has lang="de"');
let statusFails = 0;
if (SERVE) {
  const port = 3918;
  const server = spawn("npx", ["next", "start", "-p", String(port)], { cwd: root, stdio: "ignore" });
  const base = `http://localhost:${port}`;
  for (let i = 0; i < 60; i++) {
    try {
      await fetch(base + "/de");
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
      if (res.status !== 200 || lang !== "de") {
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
    if (!html || lang !== "de") {
      statusFails++;
      log(`- FAIL ${route}: ${html ? `lang=${lang}` : "not prerendered"}`);
    }
  }
}
log(statusFails ? `FAIL — ${statusFails} route(s).` : `PASS — ${sitemapRoutes.length} routes${SERVE ? " returned HTTP 200" : " prerendered"} with lang="de".`);
if (statusFails) failures.push("status/lang");
log();

// ── 1. English leak ─────────────────────────────────────────────────────────
log("## 1. English-leak report (visible text, alt/aria-label/title/placeholder, <title>, meta, og)");
const extendedSeen = new Set();
const anglicismsSeen = new Map();
let leakCount = 0;
for (const [route, html] of [...pages].sort()) {
  const { meta, attrs, texts } = extract(html);
  const hits = [];
  for (const seg of [...meta, ...attrs, ...texts]) {
    let s = clean(seg.text);
    for (const phrase of PHRASES) {
      if (s.includes(phrase)) {
        if (EXTENDED_LOOKUP.has(phrase.toLowerCase())) extendedSeen.add(phrase);
        s = s.split(phrase).join(" ");
      }
    }
    const words = [];
    for (const m of s.matchAll(/[A-Za-zÄÖÜäöüß][A-Za-zÄÖÜäöüß'’]*/g)) {
      const w = m[0];
      const letters = w.replace(/[^A-Za-zÄÖÜäöüß]/g, "");
      if (letters.length <= 3) continue;
      const key = w.replace(/['’]s$/, "").toLowerCase();
      if (WORDS.has(key)) {
        if (EXTENDED_LOOKUP.has(key)) extendedSeen.add(w);
        if (ANGLICISMS.has(key)) anglicismsSeen.set(w, [...(anglicismsSeen.get(w) ?? []), route]);
        continue;
      }
      if (EN_VOCAB.has(key)) words.push(w);
    }
    if (words.length) hits.push(`${seg.where}: ${[...new Set(words)].join(", ")}  ⟵ “${seg.text.slice(0, 90)}”`);
  }
  if (hits.length) {
    leakCount += hits.length;
    log(`- ${route}`);
    for (const h of hits) log(`  - ${h}`);
  }
}
log(leakCount ? `FAIL — ${leakCount} segment(s) contain English.` : `PASS — 0 English words found across ${pages.size} /de pages (checked against ${EN_VOCAB.size} English words from ${enFiles.length} /en pages).`);
if (leakCount) failures.push("english-leak");
const seen = [...extendedSeen].sort();
if (seen.length) {
  log("Allowed by the extended list (proper nouns / technical terms / German homographs, for review):");
  const byGroup = {};
  for (const t of seen) {
    const g = EXTENDED_LOOKUP.get(t.toLowerCase()) ?? "Other";
    (byGroup[g] ??= new Set()).add(t);
  }
  for (const [g, ts] of Object.entries(byGroup)) log(`  - ${g}: ${[...ts].join(", ")}`);
}
if (anglicismsSeen.size) {
  log("Anglicisms still present (Duden loanwords — review; „Feedback“ is mandated by the glossary term „Verstärkendes Lernen aus menschlichem Feedback (RLHF)“):");
  for (const [w, routes] of anglicismsSeen) log(`  - ${w}: ${[...new Set(routes)].join(", ")}`);
} else {
  log("Anglicisms (Duden loanwords such as Content, Feedback, Workflow, Briefing): none used.");
}
log();

// ── 3. hreflang ─────────────────────────────────────────────────────────────
log("## 3. hreflang de, de-AT and de-CH on every /de page");
let hrefFails = 0;
for (const [route, html] of [...pages].sort()) {
  if (isNotFound(route)) continue;
  const head = html.match(/<head[\s\S]*?<\/head>/i)?.[0] ?? "";
  const want = `${ORIGIN}${route}`;
  const missing = ["de", "de-AT", "de-CH"].filter(
    (l) => !new RegExp(`hrefLang="${l}" href="${want.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`, "i").test(head)
  );
  if (missing.length) {
    hrefFails++;
    log(`- ${route}: missing ${missing.join(", ")}`);
  }
}
log(hrefFails ? `FAIL — ${hrefFails} page(s).` : `PASS — hreflang de, de-AT and de-CH point to the /de URL on all ${[...pages.keys()].filter((r) => !isNotFound(r)).length} pages.`);
if (hrefFails) failures.push("hreflang");
log();

// ── 4. Legal pages ──────────────────────────────────────────────────────────
log("## 4. Impressum and Datenschutz exist and are linked in the German footer");
const legalIssues = [];
for (const r of ["/de/impressum", "/de/privacy"]) if (!pages.has(r)) legalIssues.push(`${r} not built`);
const footerless = [];
for (const [route, html] of pages) {
  const footer = html.match(/<footer[\s\S]*?<\/footer>/i)?.[0] ?? "";
  if (!/href="\/de\/impressum"[^>]*>Impressum</.test(footer) || !/href="\/de\/privacy"[^>]*>Datenschutz</.test(footer))
    footerless.push(route);
}
if (footerless.length) legalIssues.push(`footer without Impressum/Datenschutz links: ${footerless.join(", ")}`);
for (const i of legalIssues) log(`- ${i}`);
log(legalIssues.length ? "FAIL" : `PASS — /de/impressum and /de/privacy are built; every /de footer links „Impressum“ and „Datenschutz“.`);
if (legalIssues.length) failures.push("legal");
log();

// ── 5. Sitemap ──────────────────────────────────────────────────────────────
log("## 5. sitemap.xml lists every /de route");
const built = [...pages.keys()].filter((r) => !isNotFound(r));
const missing = built.filter((r) => !sitemapRoutes.includes(r));
const altOk = /hreflang="de-AT"/.test(sitemap) && /hreflang="de-CH"/.test(sitemap) && /hreflang="x-default"/.test(sitemap);
if (missing.length) log(`- Missing from sitemap.xml: ${missing.join(", ")}`);
if (!altOk) log("- sitemap.xml has no de-AT / de-CH / x-default alternates");
const smOk = !missing.length && altOk;
log(smOk ? `PASS — ${sitemapRoutes.length} /de URLs in sitemap.xml cover all ${built.length} built /de routes, with en / de / de-AT / de-CH / zh-Hans / x-default alternates.` : "FAIL");
if (!smOk) failures.push("sitemap");
log();

// ── 6. Orthography ──────────────────────────────────────────────────────────
log("## 6. Umlauts, ß, German quotation marks and number formats");
const ORTHO = [
  [/\b(fuer|ueber|Ueber|koennen|moechten|waehrend|Groesse|Loesung|Loesungen|muessen|Pruefung|Qualitaet|Aenderung|zurueck|natuerlich|Gruender|fuehren|Uebersetzung|Uebersetzungen)\b/g, "ae/oe/ue instead of an umlaut"],
  [/\b(gross|grosse|grossen|grosser|massgeblich|Massnahmen|Strasse|heisst|schliesslich|ausserdem|gemaess|gemäss|regelmässig)\b/g, "ss instead of ß"],
  [/(^|[\s(])“(?=\S)/g, "English opening quote “ (use „)"],
  [/"/g, "ASCII double quote (use „ “)"],
  [/\b\d{1,3},\d{3}\b/g, "English thousands separator (use 5.000)"],
  [/\b\d+\.\d{1,2}\s*(USD|€|%|Mio)/g, "English decimal point (use 0,08)"],
  [/\$\s?\d/g, "dollar sign (use „5.000 USD“)"],
];
let orthoCount = 0;
for (const [route, html] of [...pages].sort()) {
  const { texts, attrs, meta } = extract(html);
  const hits = [];
  for (const seg of [...texts, ...attrs, ...meta.filter((m) => m.where !== "meta keywords")]) {
    for (const [re, label] of ORTHO)
      for (const m of seg.text.matchAll(re)) hits.push(`${label}: “${seg.text.slice(Math.max(0, m.index - 20), m.index + 25)}”`);
  }
  if (hits.length) {
    orthoCount += hits.length;
    log(`- ${route}`);
    for (const h of hits) log(`  - ${h}`);
  }
}
log(orthoCount ? `FAIL — ${orthoCount} issue(s).` : "PASS — umlauts and ß used throughout; quotations use „ “; numbers use 5.000 / 0,08; amounts are written as „USD“.");
if (orthoCount) failures.push("orthography");
log();

// ── 7. Google head checks ───────────────────────────────────────────────────
log("## 7. Google <head> rules on every /de page");
let headFails = 0;
const titles = new Map();
for (const [route, html] of [...pages].sort()) {
  if (isNotFound(route)) continue;
  const head = html.match(/<head[\s\S]*?<\/head>/i)?.[0] ?? "";
  const title = decode(head.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const desc = decode(head.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? "");
  const h1s = html.match(/<h1[\s>]/gi) ?? [];
  const issues = [];
  if (!title.endsWith("| GlobalAnnotate")) issues.push("title must end with “| GlobalAnnotate”");
  if (title.length >= 60) issues.push(`title is ${title.length} characters (under 60)`);
  if (titles.has(title)) issues.push(`title duplicates ${titles.get(title)}`);
  titles.set(title, route);
  if (desc.length < 140 || desc.length > 155) issues.push(`description is ${desc.length} characters (140–155)`);
  if (h1s.length !== 1) issues.push(`${h1s.length} <h1> elements`);
  if (!/property="og:locale" content="de_DE"/.test(head)) issues.push("og:locale is not de_DE");
  if (!/<html[^>]*\slang="de"/.test(html)) issues.push('<html lang> is not "de"');
  const ld = Array.from(html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g), (m) => JSON.parse(m[1])).flat();
  const untagged = ld.filter((b) => b.inLanguage !== "de").map((b) => b["@type"]);
  if (untagged.length) issues.push(`JSON-LD without inLanguage "de": ${untagged.join(", ")}`);
  if (issues.length) {
    headFails++;
    log(`- ${route} (“${title}”): ${issues.join("; ")}`);
  }
}
log(headFails ? `FAIL — ${headFails} page(s).` : 'PASS — unique titles under 60 characters ending in „| GlobalAnnotate“, 140–155 character descriptions, one <h1>, og:locale de_DE, lang="de", and inLanguage "de" on every JSON-LD block.');
if (headFails) failures.push("google-head");
log();

if (REPORT) writeFileSync(REPORT, report.join("\n") + "\n");
if (failures.length) {
  console.error(`[de-gate] FAILED: ${failures.join(", ")}`);
  process.exit(1);
}
console.log("[de-gate] all checks passed");
