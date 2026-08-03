import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import JsonLd from "@/components/JsonLd";
import { img } from "@/lib/images";
import { site } from "@/lib/site";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";

const TITLE = "Game Localization & Translation Services | GlobalAnnotate";
const DESCRIPTION =
  "End-to-end game localization in 100+ languages — UI, narrative and dialogue, subtitles, voiceover scripts, store listings, culturalization, and LQA testing for studios going global.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${site.url}/services/game-localization` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${site.url}/services/game-localization`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const FAQ = [
  {
    q: "What file formats and engines do you support?",
    a: "We work directly with the formats your engine already exports — JSON, XML, .po/.pot, .resx, .strings, .csv, .xlsx, YAML, Unity/Unreal localization tables, and Godot CSVs. We can plug into your build pipeline, your TMS (Crowdin, Lokalise, Phrase, memoQ), or your GitHub repo so new strings flow to linguists on every commit and return ready to merge — no copy-pasting between spreadsheets.",
  },
  {
    q: "What is LQA and do I really need it?",
    a: "Linguistic Quality Assurance is in-context play-testing on the actual build — native gamer-linguists run through real gameplay in each locale to catch truncated UI, broken variables, untranslated strings, mis-timed subtitles, wrong gender or formality, and culturalization issues that never show up in a spreadsheet. For any game with a serious launch budget, LQA is the difference between a clean release and a wave of one-star reviews about broken localization.",
  },
  {
    q: "How do you handle character limits, UI truncation, and dynamic strings?",
    a: "Linguists work in-context with screenshots, character limits, and variable placeholders visible at all times. We never break <code>{playerName}</code>, <code>%d</code>, or rich-text tags. For tight UI we transcreate rather than translate literally — a short, punchy alternative that fits the button without losing meaning. We also flag any source string that simply can't be localized cleanly so design can adjust before ship.",
  },
  {
    q: "Do you do voiceover? Can you mix human VO with multilingual TTS?",
    a: "Yes. We script and direct fully human VO with native voice talent for hero characters and cinematics, and we use modern multilingual TTS where it makes sense — incidental NPC barks, prototype recordings, or large-scale procedural lines — always under human direction with native-speaker review on the final audio. You decide where each lever lands inside your audio budget.",
  },
  {
    q: "What's the turnaround for typical projects?",
    a: "A 10–20k-word mobile or indie title typically ships into 5 languages in 3–4 weeks including LQA. A 200k-word narrative RPG into 10–12 languages with VO scripts runs 8–12 weeks. We agree milestones and per-language SLAs up front and report progress weekly — and for live-ops titles we ship continuous localization on your release cadence, not in batches.",
  },
  {
    q: "How does pricing work?",
    a: "Text is per word, by language pair and content type (UI, narrative, marketing, legal). LQA is billed hourly per locale with a clear bug-report deliverable. Voiceover is per recorded minute plus studio time. We share a fixed-scope quote before any work starts, and translation memory + glossaries compound discounts over the life of the project — repeat strings and live-ops updates get progressively cheaper.",
  },
];

const INCLUDED = [
  {
    title: "In-game text & UI",
    body: "Menus, HUD, tooltips, error states, settings, and tutorial copy — translated with character limits, placeholders, and rich-text tags fully respected.",
  },
  {
    title: "Narrative & dialogue",
    body: "Story, character voice, barks, and branching dialogue handled by gamer-linguists who understand tone, lore, and the genre your players already know.",
  },
  {
    title: "Subtitles & voiceover scripts",
    body: "Timed subtitle files, dub-ready VO scripts with lip-sync notes, and native voice talent direction for cinematics and hero characters.",
  },
  {
    title: "Store listings & ASO",
    body: "Localized Steam, App Store, Google Play, Epic and console store pages — title, description, keywords, and screenshot copy tuned for each market.",
  },
  {
    title: "Culturalization",
    body: "Symbols, colours, gestures, humour, religion, gore, alcohol, and political references reviewed per region so your game doesn't get pulled or review-bombed at launch.",
  },
  {
    title: "LQA testing",
    body: "Native gamer-linguists play the actual build in each locale, log bugs with screenshots in your tracker, and verify fixes — UI truncation, broken variables, mis-timed subs, all caught before ship.",
  },
];

const USE_CASES = [
  {
    title: "Mobile & hyper-casual",
    body: "Fast-turnaround localization tuned for store conversion and tight UI — perfect for soft launches and live-ops content drops on a weekly cadence.",
  },
  {
    title: "Indie & narrative RPGs",
    body: "Heavy dialogue, lore-driven worldbuilding, and culturally specific humour transcreated by gamer-linguists who respect the writer's voice.",
  },
  {
    title: "Strategy, simulation & MMOs",
    body: "Glossary-locked terminology across hundreds of units, items, and systems — consistent across UI, tutorials, patch notes, and community channels.",
  },
  {
    title: "Console & AAA launches",
    body: "Full-scale text, audio, and certification-ready localization with LQA on real devkits — coordinated to your global submission and release calendar.",
  },
];

const TIERS = [
  {
    name: "Starter",
    price: "From $0.10",
    cadence: "/ word",
    description:
      "For indie and mobile titles localizing into 1–5 languages without VO.",
    features: [
      "Up to 20k source words",
      "Native gamer-linguist + reviewer",
      "Glossary & style guide",
      "Store-listing copy included",
      "Standard 2–3 week delivery",
    ],
  },
  {
    name: "Growth",
    price: "From $0.13",
    cadence: "/ word",
    description:
      "Our most popular plan — full localization with in-context LQA across multiple markets.",
    features: [
      "Unlimited volume, 6–12 languages",
      "Two-step linguist + senior review",
      "In-context LQA on real builds",
      "Subtitles & dub-ready VO scripts",
      "Engine / TMS / GitHub integration",
      "Translation memory & QA reports",
    ],
    highlighted: true,
  },
  {
    name: "Studio",
    price: "Custom",
    description:
      "Full-scale console, AAA, and live-ops programs with VO, certification, and continuous delivery.",
    features: [
      "12+ languages with dedicated lead",
      "Full VO production & direction",
      "Console certification-ready QA",
      "Culturalization & regional compliance",
      "Continuous localization on release cadence",
      "Quarterly business reviews",
    ],
  },
];

// FAQPage JSON-LD content — the canonical, GEO-optimized Q&A surfaced to
// search engines and AI systems. Kept distinct from the visible `FAQ` above
// (which drives the on-page accordion) so the page content stays unchanged.
const SCHEMA_FAQ = [
  {
    q: "What game localization services do you offer?",
    a: "UI string localization, narrative dialogue translation, subtitling, voiceover script adaptation, store listing optimization, ASO, and linguistic quality assurance (LQA) testing on real builds.",
  },
  {
    q: "What languages do you localize games into?",
    a: "All major gaming markets plus African languages — giving studios access to the fastest-growing mobile gaming market in the world.",
  },
  {
    q: "Do you test localization on actual game builds?",
    a: "Yes. We perform LQA testing on real builds to catch truncation, overlap, context errors, and formatting issues before ship.",
  },
  {
    q: "Can you handle culturally sensitive content in games?",
    a: "Absolutely. Every game localization project can include MarketReady™ cultural validation where real native gamers in the target market confirm the localization feels natural.",
  },
  {
    q: "What file formats do you work with?",
    a: "JSON, XML, CSV, XLIFF, PO, XLSX, custom formats, and direct integration with major game engines.",
  },
];

export default function Page() {
  const url = `${site.url}/services/game-localization`;
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "Game Localization & Translation",
            description: DESCRIPTION,
            url,
            areaServed: "Worldwide",
          }),
          faqSchema(SCHEMA_FAQ),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Services", url: `${site.url}/services` },
            { name: "Game Localization & Translation", url },
          ]),
        ]}
      />
      <ServicePage
        serviceSlug="game-localization"
        eyebrow="Game Localization & Translation"
        title="Bring your game to players worldwide — fully localized, culturally adapted, and ready to launch in 100+ languages."
        intro="End-to-end game localization for studios going global — UI and dialogue, subtitles and voiceover scripts, store and ASO copy, culturalization, and in-context LQA. We plug straight into your engine and pipeline (JSON, XML, .po, .resx, .strings, Unity, Unreal) so every locale ships on the same release as English."
        heroSlideId={img.services.gameLocalization.id}
        heroSlideAlt={img.services.gameLocalization.alt}
        included={INCLUDED}
        useCases={USE_CASES}
        tiers={TIERS}
        faq={FAQ}
      />
    </>
  );
}
