import { img } from "@/lib/images";

// One typed source of truth for case studies. Powers both the /portfolio
// index (concise image-led cards) and the /portfolio/[slug] detail page
// (full editorial layout).

export type Outcome = { label: string; value: string };

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  service: string;
  duration: string;
  // ISO yyyy-mm-dd. Used as <lastmod> in the sitemap for /portfolio/[slug].
  lastUpdated: string;
  // 1–2 sentence summary used on both the card and the detail page intro.
  summary: string;
  // Full Challenge paragraph and "What we did" steps — detail page only.
  challenge: string;
  approach: string[];
  // The 2–3 metrics surfaced on the index card.
  headlineOutcomes: Outcome[];
  // The full set of metrics shown on the detail page.
  outcomes: Outcome[];
  image: { id: string; alt: string };
};

export const cases: CaseStudy[] = [
  {
    slug: "telehealth-app-localized-14-languages",
    title: "Telehealth app localized into 14 languages in under three weeks",
    client: "A Series-A digital-health platform expanding across Africa, the Middle East and Europe",
    industry: "HealthTech",
    service: "Translation & Localization",
    duration: "19-day launch + ongoing",
    lastUpdated: "2026-05-12",
    summary:
      "We took a patient telehealth app from one English locale to fourteen in nineteen days — strict medical accuracy, full RTL support for Arabic, localized app-store listings, and a continuous-localization pipeline tied to the weekly release.",
    challenge:
      "The team needed to launch fourteen markets in three weeks to meet a regional investor commitment. Medical content can't be approximated — every dose, symptom, and consent line had to be clinically accurate. Arabic added right-to-left layout work the iOS team had never shipped. The App Store and Play Store needed localized titles, descriptions, and screenshots per market, and engineering was committing to a release every Friday, so localization had to land on that cadence without slipping the launch date.",
    approach: [
      "Stood up a team of native medical linguists in every target language, each paired with a second medical reviewer for a strict two-step QA pass on every string",
      "Built a clinical glossary and termbase — drug names, dosage units, anatomy, consent phrasing — seeded by the client's medical advisory board and locked into the TMS so every translator and reviewer worked from the same source of truth",
      "Localized 22k product strings and 60k words of patient-education content in parallel via a connector wired into their GitHub release branches",
      "Ran in-context UI review in the live iOS and Android builds — including a dedicated RTL pass for Arabic with native Arabic engineers and linguists, catching truncation, mirrored icons, and Eastern-Arabic numeral formatting",
      "Localized App Store and Play Store metadata, screenshots and preview videos in all 14 languages, with market-specific imagery and ASO copy for MENA",
      "Shipped a continuous-localization pipeline tied to their Friday release: new strings flow to linguists on merge, return reviewed within 48 hours, and never block a deploy",
    ],
    headlineOutcomes: [
      { label: "Languages shipped", value: "14" },
      { label: "Delivery time", value: "19 days" },
      { label: "Non-English signups", value: "+38%" },
    ],
    outcomes: [
      { label: "Languages shipped", value: "14" },
      { label: "Delivery time", value: "19 days" },
      { label: "Non-English signups", value: "+38%" },
      { label: "App-store conversion", value: "+27%" },
      { label: "Localized support tickets", value: "−22%" },
      { label: "Medical-accuracy escalations", value: "0" },
    ],
    image: img.portfolio.telehealthApp,
  },
  {
    slug: "8-market-ecommerce-localization-dtc",
    title: "8-market e-commerce localization for a DTC brand",
    client: "A European direct-to-consumer fashion and lifestyle brand scaling across the EU",
    industry: "E-commerce",
    service: "Translation & Localization",
    duration: "10-week launch + ongoing",
    lastUpdated: "2026-04-18",
    summary:
      "We localized 20k SKUs, the brand voice, the checkout, and every legal page across eight European markets — wiring transcreated campaign copy and a managed termbase into the same release as international SEO and paid marketing.",
    challenge:
      "The brand had outgrown its single-language store. Eight EU markets needed to launch in time for the autumn campaign, with consistent brand voice, market-correct sizing, market-specific payment methods, and legal content that satisfied each local consumer-protection regime. The product catalogue alone — 20k SKUs across seasonal drops — was changing weekly, and earlier machine-translation attempts had produced flat, off-brand copy that the founders refused to ship.",
    approach: [
      "Transcreated brand voice, campaign copy and editorial content with senior copywriters in each market — same message, locally written, never literal",
      "Localized the 20k-SKU catalogue at scale via a CMS connector and a managed termbase for fabric, fit and material terms, so every product card read consistently in every language",
      "Ran native-language multilingual SEO keyword research per market and fed it directly into the team's category, collection, and landing-page strategy",
      "Localized the full purchase journey — cart, checkout, returns, customer service, and market-specific payment methods, shipping rules and tax content",
      "Localized every legal page (T&Cs, privacy, cookies, withdrawal rights) to the regulatory standard of each market, reviewed by in-country counsel",
      "End-to-end locale QA on live staging — pricing, currency, sizing, imagery, seasonal campaign timing, and RTL handling per market",
    ],
    headlineOutcomes: [
      { label: "Markets launched", value: "8" },
      { label: "Non-domestic revenue", value: "+212%" },
      { label: "Conversion rate", value: "+1.9 pts" },
    ],
    outcomes: [
      { label: "Markets launched", value: "8" },
      { label: "Non-domestic revenue", value: "+212%" },
      { label: "Conversion rate", value: "+1.9 pts" },
      { label: "New-locale organic traffic", value: "+160%" },
      { label: "Cart abandonment", value: "−14%" },
      { label: "Time-to-market", value: "−50%" },
    ],
    image: img.portfolio.dtcEcommerce,
  },
  {
    slug: "elearning-video-ui-localization-12-languages",
    title: "E-learning platform localized (video + UI) into 12 languages",
    client: "A global EdTech company serving learners in 60+ countries",
    industry: "EdTech",
    service: "Translation & Localization",
    duration: "16-week programme",
    lastUpdated: "2026-03-22",
    summary:
      "Hundreds of hours of course video subtitled and dubbed, the full product UI localized, and a terminology pipeline that holds technical accuracy across twelve languages — shipped to a strict course-launch schedule.",
    challenge:
      "The company had built its catalogue in English and was ready to open up twelve new languages, but the work was much larger than a string export. Hundreds of hours of course video needed accurate subtitles and natural-sounding voice-over, technical terms had to stay consistent between video, transcript and UI, accessibility (closed captions, transcripts, descriptive audio) was non-negotiable for the markets they were entering, and the academic team had already announced launch dates for the first wave of localized courses.",
    approach: [
      "Subtitled the full video catalogue in 12 languages with timing QA and on-screen-text localization, plus professional voice-over by native talent on flagship courses",
      "Built subject-specific termbases — engineering, data, design, business — seeded from the course curriculum and used by every linguist, voice actor and reviewer on the programme",
      "Localized the product UI: onboarding, learner dashboards, assessments, notifications and lifecycle emails, all reviewed in context inside the actual product",
      "Shipped full accessibility: closed captions and downloadable transcripts in every language, alt text on every illustration, and descriptive audio where the visual carried the lesson",
      "Cross-device QA across web, iOS, Android and TV apps for every locale — checking subtitle timing, font fallbacks, line-break behaviour and RTL handling",
      "Ran a continuous-localization cadence so new courses ship in all 12 languages on the same release as English, not weeks behind",
    ],
    headlineOutcomes: [
      { label: "Languages launched", value: "12" },
      { label: "Course completion", value: "+31%" },
      { label: "Learner satisfaction", value: "+24%" },
    ],
    outcomes: [
      { label: "Languages launched", value: "12" },
      { label: "Catalogue localized", value: "100%" },
      { label: "Course completion", value: "+31%" },
      { label: "Learner satisfaction", value: "+24%" },
      { label: "Per-language launch time", value: "−62%" },
      { label: "New regions opened", value: "3" },
    ],
    image: img.portfolio.eLearning,
  },
  {
    slug: "linkedin-growth-b2b-social-media",
    title: "6× LinkedIn growth and a steady inbound pipeline for a B2B brand",
    client: "A B2B SaaS company in workflow automation with an inconsistent, low-engagement social presence",
    industry: "B2B SaaS",
    service: "Social Media Management",
    duration: "6-month programme",
    lastUpdated: "2026-06-10",
    summary:
      "We took a quiet, inconsistent social presence and built it into a real demand channel — strategy, calendar, on-brand templates, daily community management, light paid boost, and monthly reporting. LinkedIn followers grew 6× and social started feeding the pipeline.",
    challenge:
      "The brand's social channels looked dead. Posts went out only when someone on the team remembered, the tone and visual identity changed from week to week, and almost no inbound flowed in from LinkedIn or Instagram. Sales was carrying the entire pipeline, and competitors with weaker products had louder presences in the same niche — making the brand look smaller than it actually was.",
    approach: [
      "Built a content strategy and a monthly editorial calendar tied to product launches, customer wins, sector themes, and a tight roster of recurring formats",
      "Designed a small library of on-brand post templates — carousels, single-image, quote cards, short-form video — so every post felt instantly recognisable in the feed",
      "Wrote, designed, and scheduled posts five times a week across LinkedIn and Instagram with a consistent voice, sign-off, and visual identity",
      "Ran daily community management — responding to every comment and DM within hours, engaging with target accounts and prospects, surfacing high-intent replies straight to the sales team",
      "Layered light paid boosting on top of the strongest organic performers to extend reach with high-fit decision-maker audiences",
      "Reported monthly on reach, engagement, follower growth, inbound DMs and leads, plus a short qualitative read on what's working and what to drop",
    ],
    headlineOutcomes: [
      { label: "LinkedIn followers", value: "+540%" },
      { label: "Inbound leads / DMs", value: "+180%" },
      { label: "Monthly reach", value: "+420%" },
    ],
    outcomes: [
      { label: "LinkedIn followers", value: "+540%" },
      { label: "Engagement rate", value: "+3.2 pts" },
      { label: "Inbound leads / DMs", value: "+180%" },
      { label: "Monthly reach", value: "+420%" },
      { label: "Posting cadence", value: "5×/week" },
      { label: "Deals attributed to social", value: "3" },
    ],
    image: img.portfolio.socialMedia,
  },
  {
    slug: "patient-app-14-languages",
    title: "Localized a patient app into 14 languages",
    client: "A leading digital health platform",
    industry: "Healthcare",
    service: "Translation & Localization",
    duration: "18-day first locale + ongoing",
    lastUpdated: "2025-09-08",
    summary:
      "Migrated 60k product strings and patient-education materials into 14 languages with culturally adapted UX, shipped on the engineering release cycle with a 99.4% linguist QA pass rate.",
    challenge:
      "The product team needed to move from a single English locale to fourteen markets without slowing the weekly release cadence engineering had committed to. Patient-education content was sensitive, the term base across markets had to be consistent, and every locale needed to ship behind the same QA bar as the English product.",
    approach: [
      "Stood up native linguists and a second-pair reviewer per language, with a documented two-step QA process on every string",
      "Built a clinical termbase and translation memory and locked them into the TMS so every contributor worked from one source of truth",
      "Wired a continuous-localization connector into the engineering release branch so new strings flow to linguists on merge",
      "Localized 60k product strings and patient-education materials in parallel across all 14 languages",
      "Ran in-context UI review on iOS and Android for every locale before each release went live",
    ],
    headlineOutcomes: [
      { label: "Languages launched", value: "14" },
      { label: "Time to first locale", value: "18 days" },
      { label: "Linguist QA pass rate", value: "99.4%" },
    ],
    outcomes: [
      { label: "Languages launched", value: "14" },
      { label: "Time to first locale", value: "18 days" },
      { label: "Linguist QA pass rate", value: "99.4%" },
    ],
    image: img.portfolio.healthApp,
  },
  {
    slug: "perception-model-1m-images-annotated",
    title: "Annotated 1.2M images for a perception model",
    client: "An autonomous robotics startup",
    industry: "Robotics",
    service: "AI Annotation",
    duration: "Continuous programme",
    lastUpdated: "2025-10-15",
    summary:
      "A continuous semantic-segmentation pipeline at 1.2M-image scale with weekly delivery, gold-set calibration, and inter-annotator agreement tracking — production-grade training data on a release cadence.",
    challenge:
      "Their perception team needed clean, consistent labels at a scale and cadence that an in-house team couldn't sustain. Throughput was capping the rate at which they could iterate on the model, and quality drift between batches was hurting eval scores.",
    approach: [
      "Designed a labelling ontology and gold-set in collaboration with the model team, used to calibrate every annotator before they touched real data",
      "Ran a continuous semantic-segmentation pipeline at 1.2M-image scale with weekly delivery",
      "Tracked inter-annotator agreement per class and shipped a QA report alongside every batch",
      "Tuned guidelines mid-programme based on model-error analysis, closing the loop between data and predictions",
    ],
    headlineOutcomes: [
      { label: "Images labeled", value: "1.2M" },
      { label: "Throughput", value: "+62%" },
      { label: "IAA score", value: "0.93" },
    ],
    outcomes: [
      { label: "Images labeled", value: "1.2M" },
      { label: "Throughput", value: "+62%" },
      { label: "IAA score", value: "0.93" },
    ],
    image: img.portfolio.robotics,
  },
  {
    slug: "dtc-beauty-brand-roas-4x",
    title: "Quadrupled ROAS for a sustainable beauty brand",
    client: "A Paris-based DTC cosmetics company",
    industry: "E-commerce",
    service: "Digital Marketing",
    duration: "12-week sprint + ongoing",
    lastUpdated: "2025-11-04",
    summary:
      "Rebuilt the Meta funnel from creative to landing pages — 40+ creative variants, restructured audiences, and post-purchase retention flows that quadrupled blended ROAS in one quarter.",
    challenge:
      "Paid social had stalled. Creative was tired, audiences were over-narrow, and landing pages weren't matching the ad promise — together pushing CAC up quarter on quarter and forcing the team to choose between scale and profitability.",
    approach: [
      "Audited the full Meta account and rebuilt the funnel architecture top to bottom",
      "Produced 40+ creative variants across static, motion and UGC, tested in disciplined waves",
      "Restructured audiences with broad targeting and creative-led testing",
      "Built conversion-tuned landing pages matched to each creative angle",
      "Added a post-purchase retention flow and tied reporting back to blended ROAS, not just platform metrics",
    ],
    headlineOutcomes: [
      { label: "ROAS", value: "4.1x" },
      { label: "CAC reduction", value: "−38%" },
      { label: "Quarterly revenue", value: "+212%" },
    ],
    outcomes: [
      { label: "ROAS", value: "4.1x" },
      { label: "CAC reduction", value: "−38%" },
      { label: "Quarterly revenue", value: "+212%" },
    ],
    image: img.portfolio.beautyBrand,
  },
  {
    slug: "multilingual-rlhf-dataset",
    title: "Multilingual RLHF dataset for an enterprise LLM",
    client: "A Series-B foundation-model company",
    industry: "AI / LLM",
    service: "AI Annotation",
    duration: "10-week programme",
    lastUpdated: "2025-12-02",
    summary:
      "An 80k-prompt preference dataset across 8 languages — including red-team adversarial prompts and instruction-following evals — that lifted the model's downstream evals by 11.6%.",
    challenge:
      "The model team needed preference data that captured real instruction-following nuance across eight languages, including coverage of adversarial and safety-critical prompts. Existing public datasets were thin outside English and inconsistent in quality.",
    approach: [
      "Designed the dataset schema with the research team — preference pairs, instruction-following labels, and adversarial prompts",
      "Recruited native annotators with subject-matter expertise in every target language and ran calibration on a held-out gold set",
      "Generated 80k prompts across 8 languages with a balanced mix of intent categories and difficulty bands",
      "Shipped per-language IAA reports and adjudicated edge cases with the research team in weekly review sessions",
    ],
    headlineOutcomes: [
      { label: "Prompts", value: "80k" },
      { label: "Languages", value: "8" },
      { label: "Eval lift", value: "+11.6%" },
    ],
    outcomes: [
      { label: "Prompts", value: "80k" },
      { label: "Languages", value: "8" },
      { label: "Eval lift", value: "+11.6%" },
    ],
    image: img.portfolio.llmDataset,
  },
  {
    slug: "uae-arabic-first-beauty-launch",
    title: "Arabic-first launch for a UAE beauty brand",
    client: "A regional cosmetics challenger",
    industry: "Beauty",
    service: "Marketing + Localization",
    duration: "8-week launch + ongoing",
    lastUpdated: "2026-01-20",
    summary:
      "Arabic transcreation, influencer-led UGC creative, and a Meta growth programme tuned for Gen-Z buyers — a region-specific brand voice that doubled followers and broke even inside two months.",
    challenge:
      "The brand was a regional challenger entering an Arabic-first market dominated by global incumbents. Off-the-shelf English creative wasn't going to land, and a literal translation of campaign copy would have read as foreign — exactly the wrong signal for a Gen-Z audience.",
    approach: [
      "Transcreated brand and campaign copy into Arabic — same message, locally written, with culturally specific references",
      "Built an influencer-led UGC pipeline with regional creators across UAE and KSA",
      "Ran a Meta growth programme targeted at Gen-Z, with creative testing tuned to regional content trends",
      "Set up a localized customer-service voice and review-management process for Arabic feedback",
    ],
    headlineOutcomes: [
      { label: "ROAS", value: "5.8x" },
      { label: "Followers", value: "+96k" },
      { label: "Break-even", value: "2 months" },
    ],
    outcomes: [
      { label: "ROAS", value: "5.8x" },
      { label: "Followers", value: "+96k" },
      { label: "Break-even", value: "2 months" },
    ],
    image: img.portfolio.uaeLaunch,
  },
  {
    slug: "nlp-intent-dataset-indian-languages",
    title: "NLP intent dataset across 8 Indian languages",
    client: "An ed-tech company serving rural India",
    industry: "Education",
    service: "AI Annotation",
    duration: "9-week programme",
    lastUpdated: "2026-02-14",
    summary:
      "A balanced intent-and-entity dataset across 8 Indian languages — including code-mixed utterances common in real users — that delivered a 9.2% model F1 lift in production.",
    challenge:
      "The product team's NLP needed to handle eight Indian languages, including code-mixed Hinglish and Tanglish utterances common in their rural-user base. Off-the-shelf intent data didn't reflect how their users actually spoke, and accuracy in those locales was dragging down the assistant's overall performance.",
    approach: [
      "Defined an intent-and-entity schema with the product team and recruited native annotators in each language",
      "Sourced and balanced 240k utterances across formal, informal, and code-mixed registers",
      "Calibrated annotators on a held-out gold set per language and tracked inter-annotator agreement throughout",
      "Delivered weekly batches with per-language QA reports tied back to model-error analysis",
    ],
    headlineOutcomes: [
      { label: "Utterances", value: "240k" },
      { label: "Languages", value: "8" },
      { label: "Model F1 lift", value: "+9.2%" },
    ],
    outcomes: [
      { label: "Utterances", value: "240k" },
      { label: "Languages", value: "8" },
      { label: "Model F1 lift", value: "+9.2%" },
    ],
    image: img.portfolio.indiaNlp,
  },
  {
    slug: "game-localization-rpg",
    title: "Localizing a narrative RPG into 12 languages",
    client: "An indie studio launching a story-driven RPG globally",
    industry: "Games",
    service: "Game Localization",
    duration: "10-week launch + ongoing live-ops",
    lastUpdated: "2026-06-18",
    summary:
      "An indie studio with a heavily dialogue-driven RPG needed 12 simultaneous market launches with culturally specific humour, lore-locked terminology, and zero text-truncation bugs at ship. We ran the full programme — gamer-linguists, glossary, transcreation, in-context LQA on real builds — to a fixed Steam release date.",
    challenge:
      "The studio's debut RPG had 180k words of branching dialogue, a custom in-world lexicon, and humour that leaned on regional references and wordplay. They were committed to a global Steam launch in 10 weeks, in 12 languages including Japanese, Korean, Simplified Chinese, German, French, Spanish (LatAm), Brazilian Portuguese, and Arabic — with no margin for one-star reviews about broken localization, mistranslated jokes, or truncated UI in the first weekend.",
    approach: [
      "Recruited native gamer-linguists — players of the genre in every target language — and ran calibration on a sample chapter before the main programme started",
      "Built a glossary and style guide for the in-world lexicon, character names, factions, and lore terms — locked into the TMS so every linguist and reviewer worked from the same source of truth",
      "Transcreated jokes, idioms, and culturally specific references rather than translating literally, so each market got humour that landed in its own voice",
      "Localized UI, HUD, tutorials, and store-listing copy with character limits and rich-text tags visible in-context — placeholders like {playerName} and %d preserved exactly",
      "Ran in-context LQA on the actual build per locale — playthroughs by native linguists logging UI truncation, mis-timed subtitles, and broken variables straight into the studio's issue tracker",
      "Shipped continuous localization for post-launch patches and live-ops content drops on the studio's weekly release cadence",
    ],
    headlineOutcomes: [
      { label: "Languages shipped", value: "12" },
      { label: "Launch window", value: "10 weeks" },
      { label: "Critical text bugs at launch", value: "0" },
    ],
    outcomes: [
      { label: "Languages shipped", value: "12" },
      { label: "Launch window", value: "10 weeks" },
      { label: "First-week intl. revenue share", value: "~40%" },
      { label: "Critical text bugs at launch", value: "0" },
      { label: "Review sentiment by region", value: "Consistent" },
      { label: "Live-ops cadence", value: "Weekly" },
    ],
    image: img.industries.gaming,
  },
  {
    slug: "b2b-saas-organic-revenue-seo",
    title: "3.4x organic revenue for a B2B SaaS",
    client: "A Series-B workflow-automation SaaS, North America",
    industry: "SaaS",
    service: "SEO",
    duration: "12-month programme",
    lastUpdated: "2026-06-20",
    summary:
      "We rebuilt this SaaS company's organic channel end to end — fixing a CMS-level hreflang bug that was silently capping rankings outside the US, consolidating 380 thin blog posts into 42 intent-mapped pillar pages, and shipping product-led content for the long-tail terms their users actually searched for. Organic became their single largest pipeline source by month nine.",
    challenge:
      "Organic traffic had been flat for eighteen months despite a busy in-house content team. Non-US rankings were inexplicably weak, a CMS migration two years earlier had left orphan URLs, duplicate templated pages, and a broken canonical strategy, and product pages were buried four clicks from the homepage. Paid acquisition was carrying the entire growth number.",
    approach: [
      "Full technical audit (Search Console, Sitebulb, server logs) — identified and fixed a hreflang loop that was de-indexing all en-GB, en-AU and de-DE pages",
      "Information-architecture rewrite: collapsed 380 blog posts into 42 pillar pages with proper internal-linking hubs and a clean canonical tree",
      "Intent-mapped keyword strategy: 1,400 target queries clustered by buyer stage and product surface, prioritised by revenue potential not just volume",
      "Product-led content programme: 6 long-form articles per month written by senior strategists with input from the product team, plus 18 use-case landing pages",
      "Digital PR: 24 placements in industry publications over 9 months, building topical authority on workflow automation",
      "Conversion work: redesigned mid-funnel pages with embedded product tours, lifting demo-to-signup rate by 31%",
    ],
    headlineOutcomes: [
      { label: "Organic revenue", value: "+241%" },
      { label: "Ranking keywords", value: "+1.8k" },
      { label: "Pipeline from organic", value: "$4.1M" },
    ],
    outcomes: [
      { label: "Organic revenue", value: "+241%" },
      { label: "Ranking keywords", value: "+1.8k" },
      { label: "Avg. position", value: "12 → 4.7" },
      { label: "Demos booked / mo", value: "+186%" },
      { label: "Non-US organic", value: "+412%" },
      { label: "Pipeline from organic", value: "$4.1M" },
    ],
    image: img.portfolio.seoGrowth,
  },
  {
    slug: "international-seo-launch-9-markets",
    title: "International SEO launch across 9 markets",
    client: "A DACH-origin direct-to-consumer e-commerce brand",
    industry: "E-commerce",
    service: "SEO + Localization",
    duration: "6-month launch + ongoing",
    lastUpdated: "2026-06-05",
    summary:
      "A consolidation and re-launch of nine country sites — replacing fragmented ccTLDs with a single high-authority domain on a subdirectory architecture, rebuilding hreflang from scratch, and shipping native-quality localized content in nine languages in coordination with our translation team. Non-English organic revenue grew more than 4x in the first year.",
    challenge:
      "Existing presence sat on nine separate ccTLDs, each acting as its own tiny site with no shared authority. Hreflang was incorrectly implemented across every locale, internal linking didn't cross domains, and most translated content had been machine-generated — which Google had clearly noticed. Outside the home market, the brand barely ranked for category terms, never mind product ones.",
    approach: [
      "Architecture decision: migrated all nine ccTLDs into subdirectories under the strongest domain, preserving link equity with a fully-mapped 301 plan and per-locale redirect tests",
      "Hreflang rebuild: reciprocal, self-referential tags with x-default fallbacks across 12k pages, validated weekly via Search Console's International Targeting report",
      "Localized keyword research per market by native speakers — not translations of the English list — surfacing 2,300 high-intent terms competitors had missed",
      "Content rewrite: 640 category and product pages rewritten by native linguists (transcreated, not translated), with locale-specific imagery, sizing, and currency",
      "Local link building and digital PR in each market via in-country specialists, totalling 180+ in-language placements",
      "Per-locale Core Web Vitals work — fixing CLS regressions caused by region-specific font loading and shifting hero imagery",
    ],
    headlineOutcomes: [
      { label: "Markets launched", value: "9" },
      { label: "Non-EN organic", value: "+318%" },
      { label: "Organic revenue", value: "+274%" },
    ],
    outcomes: [
      { label: "Markets launched", value: "9" },
      { label: "Non-EN organic", value: "+318%" },
      { label: "Indexed pages", value: "+12k" },
      { label: "Organic revenue", value: "+274%" },
      { label: "International AOV", value: "+22%" },
      { label: "First-page rankings", value: "1,940" },
    ],
    image: img.portfolio.internationalSeo,
  },
];

export function getCase(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}

export function allCaseSlugs(): string[] {
  return cases.map((c) => c.slug);
}

// Maps each /services/[slug] page to the substrings in CaseStudy.service that
// count as "related". Powers the "Related case studies" section we render at
// the bottom of every service page.
const SERVICE_KEYWORDS: Record<string, string[]> = {
  "translation-localization": ["Translation", "Localization"],
  "ai-annotation": ["AI Annotation", "Annotation"],
  "digital-marketing": ["Digital Marketing", "Marketing"],
  seo: ["SEO"],
  "game-localization": ["Game Localization", "Game"],
};

export function relatedCasesForService(
  serviceSlug: string,
  limit = 3
): CaseStudy[] {
  const keywords = SERVICE_KEYWORDS[serviceSlug] ?? [];
  if (keywords.length === 0) return [];

  // First pass: exact match on CaseStudy.service.
  const direct = cases.filter((c) =>
    keywords.some((k) => c.service.includes(k))
  );
  if (direct.length >= limit) return direct.slice(0, limit);

  // Fallback: search the summary / challenge / approach text. Useful for
  // services like SEO where the work shows up inside multilingual /
  // localization engagements but the case study is tagged Translation.
  const lowerKeywords = keywords.map((k) => k.toLowerCase());
  const indirect = cases.filter((c) => {
    if (direct.includes(c)) return false;
    const haystack = [c.summary, c.challenge, c.approach.join(" ")]
      .join(" ")
      .toLowerCase();
    return lowerKeywords.some((k) => haystack.includes(k));
  });
  return [...direct, ...indirect].slice(0, limit);
}
