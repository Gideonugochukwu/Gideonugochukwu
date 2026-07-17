// Blog posts data. To add a new post, push a new entry to POSTS — each post
// owns its own title, meta description, hero image, and body content.
// Body is plain HTML (kept simple on purpose so the editor doesn't need MDX).
// Use <h2>/<h3>, <p>, <ul>/<li>, <a>, <strong>, <em>, <blockquote>, <code>.

import { img } from "@/lib/images";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  author: string;
  readMinutes: number;
  tags: string[];
  // Either an Unsplash image ref from lib/images, or a full URL.
  heroImage: { id: string; alt: string };
  body: string;
};

export const posts: BlogPost[] = [
  {
    slug: "what-is-ai-data-annotation",
    title: "What Is AI Data Annotation? A Practical Guide for ML Teams",
    description:
      "A clear, practical guide to AI data annotation for ML teams — what it is, how it works, the main annotation types, quality controls, and how to scale without breaking your budget.",
    date: "2026-01-12",
    author: "Gideon Ugochukwu",
    readMinutes: 8,
    tags: ["AI", "Annotation", "Machine Learning"],
    heroImage: img.services.aiAnnotation,
    body: `
<p>If you're training a model — computer vision, speech, NLP, or a fine-tuned LLM — your performance ceiling is almost always set by your data, not your architecture. AI data annotation is the practice of turning raw inputs (images, audio, text, video) into structured, labeled examples that your model can learn from. Done well, it's the difference between a demo and a product.</p>

<h2>What "annotation" actually means</h2>
<p>Annotation is the process of attaching labels, attributes, or structure to raw data so a model can learn the mapping from input to output. Examples:</p>
<ul>
<li><strong>Bounding boxes</strong> around every car in a street scene, for object detection.</li>
<li><strong>Pixel masks</strong> for semantic segmentation — drawing the exact outline of a tumor, a road, or a person.</li>
<li><strong>Transcripts and speaker labels</strong> for speech recognition and diarization.</li>
<li><strong>Intent and entity labels</strong> on customer messages, for NLP and chat routing.</li>
<li><strong>Preference rankings</strong> between two model responses, for RLHF and DPO training.</li>
</ul>
<p>If your model has to make a decision, somewhere upstream a human has shown it tens of thousands of correctly decided examples.</p>

<h2>The five annotation types ML teams use most</h2>
<h3>1. Image annotation</h3>
<p>Bounding boxes, polygons, keypoints, and 3D cuboids. Used in autonomous driving, retail analytics, agriculture, sports, and security.</p>
<h3>2. Semantic and instance segmentation</h3>
<p>Pixel-precise masks. Slower and more expensive than bounding boxes, but essential when your model needs the exact shape, not just the rough location.</p>
<h3>3. Audio annotation</h3>
<p>Transcription, speaker diarization, emotion tagging, and event detection. The hardest part is consistency across accents and noisy environments — which is where native annotators matter.</p>
<h3>4. Text and NLP annotation</h3>
<p>Intent labels, named-entity extraction, sentiment, toxicity, factuality. Long-tail edge cases (sarcasm, code-mixed languages, slang) are usually where models fail in production.</p>
<h3>5. LLM preference data</h3>
<p>Pairwise comparisons, instruction-following ratings, harmlessness reviews, red-team prompts, and domain-specific evals. Every modern aligned LLM depends on this kind of data.</p>

<h2>Quality controls that actually matter</h2>
<p>You can run an annotation program one of two ways: ship raw labels and hope, or build a real QA loop. We strongly recommend the second:</p>
<ul>
<li><strong>Gold-set calibration.</strong> Annotators must hit a target accuracy on a hidden set of correctly-labeled items before they touch real data.</li>
<li><strong>Inter-annotator agreement (IAA).</strong> The same items are labeled by multiple annotators and compared. Low IAA means your task is ambiguous — fix the guidelines, not the people.</li>
<li><strong>Multi-pass review.</strong> A senior reviewer audits a sample (and 100% of edge cases) before delivery.</li>
<li><strong>Per-batch QA reports.</strong> A short report with class-level accuracy, IAA, and known issues should ship with every delivery.</li>
</ul>

<h2>How to scope your first annotation project</h2>
<ol>
<li><strong>Write a clear ontology.</strong> What are the labels? What's the difference between class A and class B? Edge cases?</li>
<li><strong>Build a tiny gold set.</strong> 100–500 perfectly-labeled examples, owned by you, used to evaluate every vendor and annotator.</li>
<li><strong>Pilot before you scale.</strong> 1,000–5,000 items, one task type, full QA loop. Measure accuracy and IAA.</li>
<li><strong>Then scale.</strong> Lock in pricing, throughput, and a weekly delivery cadence.</li>
</ol>

<h2>Build vs buy</h2>
<p>Hiring and training an in-house annotation team is feasible if you have stable, very-high-volume needs and the management bandwidth. For everything else — bursty pilots, multilingual projects, specialist domains (medical imaging, legal NLP, low-resource languages) — a vendor is faster, cheaper, and produces better data because the QA system already exists.</p>

<h2>Where this fits with multilingual AI</h2>
<p>If your model needs to work in more than one language, you also need annotators who actually <em>speak</em> those languages. This is one of the most common failure modes we see in production: training data is heavily English, the model is shipped globally, and quality silently collapses outside English-speaking markets. Plan for native annotators in every language you care about from day one.</p>

<h2>The bottom line</h2>
<p>Great models come from great data, and great data comes from disciplined annotation. Treat your labels as a first-class engineering artifact: versioned, evaluated, and continuously improved. If you want a partner to run this for you, our <a href="/services/ai-annotation">AI annotation service</a> handles the full loop end to end.</p>
`,
  },
  {
    slug: "localize-your-app-for-100-markets",
    title: "How to Localize Your App or Website for 100+ Markets",
    description:
      "A practical playbook for localizing an app or website into 100+ markets — architecture, workflow, QA, and the gotchas that quietly break user experience in new languages.",
    date: "2026-01-26",
    author: "Gideon Ugochukwu",
    readMinutes: 9,
    tags: ["Localization", "i18n", "Product"],
    heroImage: img.services.translation,
    body: `
<p>"We'll just translate the strings" is the most expensive sentence in international product launches. Real localization touches your code, your design system, your release process, and your QA. Here's how teams that actually ship to 100+ markets do it.</p>

<h2>1. Get the architecture right first</h2>
<p>Before a single string is translated, make sure your product can express other languages safely.</p>
<ul>
<li><strong>Externalize every user-facing string.</strong> No hardcoded copy. Use ICU MessageFormat or a similar standard for pluralization and gendered text.</li>
<li><strong>Use Unicode (UTF-8) everywhere</strong> — database, APIs, files, headers.</li>
<li><strong>Plan for RTL.</strong> Arabic, Hebrew, Urdu, and Farsi need mirrored layouts, not just translated text.</li>
<li><strong>Avoid concatenating strings.</strong> Word order varies wildly across languages.</li>
<li><strong>Locale-aware formatting</strong> for dates, numbers, currencies, addresses, and phone numbers. Use the platform formatters; don't roll your own.</li>
</ul>

<h2>2. Pick the right URL strategy for the web</h2>
<p>You have three real options, in order of SEO power and engineering cost:</p>
<ul>
<li><strong>ccTLDs</strong> (example.de, example.fr) — strongest local trust, highest cost.</li>
<li><strong>Subdirectories</strong> (example.com/de/, example.com/fr/) — best balance for most companies. Easier to manage, all SEO authority flows to one domain.</li>
<li><strong>Subdomains</strong> (de.example.com) — middle ground.</li>
</ul>
<p>Whichever you pick, implement <code>hreflang</code> tags correctly across every page, with a self-referential entry and an <code>x-default</code> for unmatched users.</p>

<h2>3. Build a translation workflow that scales</h2>
<p>Localization that survives growth has three properties: it's continuous, it lives next to code, and it has memory.</p>
<ul>
<li><strong>Continuous.</strong> New strings flow to translators as soon as they're merged. No giant end-of-quarter batches.</li>
<li><strong>Next to code.</strong> Use a TMS that integrates with GitHub, Figma, and your CMS so engineers never copy-paste JSON files around.</li>
<li><strong>Has memory.</strong> A translation memory (TM) reuses every previously approved translation, lowering cost and improving consistency over time. A termbase locks brand and domain terms.</li>
</ul>

<h2>4. Translate for meaning, not for words</h2>
<p>Real localization is closer to copywriting than to dictionary lookup:</p>
<ul>
<li><strong>Transcreation</strong> for marketing copy — same message, new cultural reference.</li>
<li><strong>Native linguists</strong> who live in the market. A French-Canadian translator is not a French-French translator.</li>
<li><strong>Two-step QA</strong> — linguist + reviewer — for anything customer-facing.</li>
<li><strong>In-context proofing.</strong> Translators see the actual UI, not a spreadsheet of strings.</li>
</ul>

<h2>5. Plan for cultural and legal adaptation</h2>
<p>Strings are the easy part. The hard part:</p>
<ul>
<li>Forms that ask for the right address fields, postcodes, and tax IDs per country.</li>
<li>Names with one part, four parts, or non-Latin scripts.</li>
<li>Imagery, color, and iconography that read differently across cultures.</li>
<li>Payments, currencies, and tax handling per market.</li>
<li>Privacy and consent rules — GDPR, LGPD, CCPA, and the rest.</li>
</ul>

<h2>6. Test like users in that market actually use it</h2>
<p>Run linguistic QA in the live product, on real devices, in the locale's display settings. Watch out for:</p>
<ul>
<li>German strings that overflow buttons (German is ~30% longer than English on average).</li>
<li>Chinese line-break behavior in cramped UI.</li>
<li>Arabic and Hebrew layouts that look fine in LTR mode and break in RTL.</li>
<li>Right-aligned numerals inside Arabic sentences.</li>
</ul>

<h2>7. Tie localization to SEO from day one</h2>
<p>A localized site that isn't found is just expensive content. Plan localized keyword research, localized metadata, and localized internal linking from the start — not as a follow-up project. This is where our <a href="/services/seo">multilingual SEO program</a> typically slots in next to translation.</p>

<h2>8. Measure what matters</h2>
<p>Per locale, track: conversion rate, support ticket rate, refund rate, and organic traffic vs. the English baseline. A "successful" launch should move these in the right direction within two quarters.</p>

<h2>The bottom line</h2>
<p>Localizing to 100+ markets isn't really a translation project; it's a product, design, engineering, marketing, and operations project that involves translation. Start with the architecture, build a continuous workflow, hire native linguists, and tie localization to SEO. Our <a href="/services/translation-localization">translation and localization service</a> exists exactly for this — talk to us.</p>
<p>And before you launch, prove it works: <a href="/services/marketready">MarketReady™</a> validates your localized content with real native users in each market — so you catch a culturally off-key phrase in a review panel, not in a viral screenshot.</p>
`,
  },
  {
    slug: "international-seo-rank-in-every-language",
    title: "International SEO: How to Rank in Every Language You Sell In",
    description:
      "A practical guide to international SEO — hreflang, URL strategy, localized keyword research, content, and link building that actually move rankings in every market.",
    date: "2026-02-09",
    author: "Gideon Ugochukwu",
    readMinutes: 9,
    tags: ["SEO", "International", "Growth"],
    heroImage: img.services.seo,
    body: `
<p>Most "international SEO" projects fail in two predictable ways: a CMS that botches <code>hreflang</code>, and a content strategy that machine-translates English keywords into nine other languages and calls it done. Here's how to do it properly.</p>

<h2>1. Decide what "international" means for you</h2>
<p>International SEO splits into two distinct goals — and you may need both:</p>
<ul>
<li><strong>Multilingual SEO</strong> — same country, multiple languages (e.g. English + Spanish for the US market).</li>
<li><strong>Multiregional SEO</strong> — multiple countries, sometimes sharing a language (e.g. UK English, US English, Australian English).</li>
</ul>
<p>The architecture, keyword research, and content all change depending on which one you're doing.</p>

<h2>2. Pick the right URL structure</h2>
<p>Same trade-off as for localization:</p>
<ul>
<li><strong>ccTLDs</strong> (example.de) — strongest country signal, highest cost.</li>
<li><strong>Subdirectories</strong> (example.com/de/) — best for most. Authority flows to one domain.</li>
<li><strong>Subdomains</strong> (de.example.com) — middle ground, but Google treats them more like separate sites.</li>
</ul>
<p>For most growth-stage companies, subdirectories on a single high-authority domain win.</p>

<h2>3. Get hreflang right (this is where everyone breaks)</h2>
<p>Hreflang tells Google which version of a page to show to a user in a given language and country. Three rules:</p>
<ol>
<li><strong>Every page references every other version</strong>, including itself. Reciprocal.</li>
<li><strong>Always include <code>x-default</code></strong> for users you haven't explicitly targeted.</li>
<li><strong>Use the right codes</strong> — ISO 639-1 for language, ISO 3166-1 Alpha-2 for region. <code>en-GB</code> not <code>en-uk</code>.</li>
</ol>
<p>Audit hreflang in Search Console's International Targeting report (and in a crawl tool) the week you launch and once a month after.</p>

<h2>4. Do localized keyword research — properly</h2>
<p>Translating your English keyword list is the most common mistake in international SEO. Do this instead:</p>
<ul>
<li><strong>Start with native search behavior.</strong> What do users in that country, in that language, actually type?</li>
<li><strong>Map intent, not just volume.</strong> The Spanish translation of an English head term may be lower volume but higher intent — or vice versa.</li>
<li><strong>Watch for synonyms and dialect.</strong> "Lift" vs "elevator", "móvil" vs "celular", "boot" vs "trunk" — pick the one that matches the market.</li>
<li><strong>Account for English usage abroad.</strong> Some technical terms stay in English even in non-English markets. Local users may search in English.</li>
</ul>

<h2>5. Build content for the market, not for the translator</h2>
<p>Every localized landing page should be:</p>
<ul>
<li>Written or transcreated by a native speaker in that market.</li>
<li>Targeting <em>local</em> intent — local competitors, local objections, local examples.</li>
<li>Internally linked to other localized pages in the same language.</li>
<li>Optimized with localized metadata, schema, and image alt text.</li>
</ul>

<h2>6. Earn links in the market</h2>
<p>Rankings in a country are mostly a function of authority in that country. A German page that rises in Google.de needs links from German-language sites that German users actually read. Plan local digital PR, partnerships, and content collaborations per market.</p>

<h2>7. Don't ignore local SEO</h2>
<p>If you have physical locations or serve specific cities, layer local SEO on top: Google Business Profiles per location, localized landing pages per city, consistent NAP (name, address, phone) across citations, and active review management.</p>

<h2>8. Technical SEO is universal — and unforgiving</h2>
<p>Core Web Vitals, crawlability, indexation, internal linking, and structured data still matter — just at higher complexity. Some quick wins:</p>
<ul>
<li>Render localized pages server-side or with proper SSR/SSG so Google can index them without JavaScript.</li>
<li>Set the correct <code>lang</code> attribute on each page.</li>
<li>Use country targeting in Search Console for ccTLD-free setups.</li>
<li>Avoid auto-redirecting users based on IP — let them pick the locale, and remember it.</li>
</ul>

<h2>9. Measure per market, not in aggregate</h2>
<p>One global rankings dashboard hides everything that matters. Track impressions, clicks, CTR, conversions, and revenue <em>per locale</em>. A "global rankings up" trend usually masks one strong market dragging the rest along.</p>

<h2>The bottom line</h2>
<p>International SEO is a coordination problem as much as a technical one — translators, engineers, marketers, and SEOs all have to ship in the same direction. We built our <a href="/services/seo">SEO service</a> exactly around this coordination, leaning on our translation and localization team for native-quality content in every market. If you're trying to rank in more than one language, talk to us.</p>
<p>Ranking is only half the battle — the landing page still has to land. <a href="/services/marketready">MarketReady™</a> puts your localized pages in front of real native users before launch, so the content that ranks also converts.</p>
`,
  },
  {
    slug: "game-localization-guide",
    title: "Game Localization: The Complete Guide for Studios Going Global (2026)",
    description:
      "A practical 2026 guide to game localization — what it really is vs translation, what to localize, the biggest mistakes studios make, how to prepare your game, the modern workflow, and where AI fits in.",
    date: "2026-06-18",
    author: "Gideon Ugochukwu",
    readMinutes: 11,
    tags: ["Games", "Localization", "i18n", "Global Launch"],
    heroImage: img.services.gameLocalization,
    body: `
<p>Most studios discover game localization the hard way: somewhere between a soft launch in Japan that gets review-bombed for broken Kanji, an indie hit whose German players can't read half the menu because the strings overflow the buttons, and a Steam page in Brazilian Portuguese that quietly converts at a third of the English one. None of those are translation problems. They're <em>localization</em> problems — and they're entirely fixable if you plan for them before the build is locked.</p>

<p>This guide is the playbook we wish more studios had on day one. It covers what game localization actually is, what needs to be localized, where studios consistently get it wrong, how to prepare your game so localization isn't painful, and how AI and human linguists sit together in a modern workflow in 2026.</p>

<h2>What game localization actually is — vs translation</h2>
<p>Translation converts words from one language to another. Localization adapts your <strong>entire game experience</strong> for a new market — language, culture, UI, audio, store page, and rating compliance — so a player in Tokyo, São Paulo, or Riyadh feels the game was made for them.</p>
<p>It helps to separate the four layers explicitly:</p>
<ul>
<li><strong>Translation</strong> — turning English source strings into another language at a sentence level.</li>
<li><strong>Localization</strong> — adapting UI, formatting, voice, references, names, currency, units, and pacing so the game reads naturally in the target locale.</li>
<li><strong>Culturalization</strong> — reviewing content for cultural, religious, political, or regulatory issues that could get the game blocked, edited, or backlash-reviewed in a given market.</li>
<li><strong>LQA (Linguistic Quality Assurance)</strong> — native gamer-linguists actually playing the build in each locale and filing bugs against UI truncation, broken variables, mistimed subtitles, and tone issues.</li>
</ul>
<p>Cut any one of those four and you'll see it in your reviews.</p>

<h2>What actually needs localizing in a modern game</h2>
<p>It's a longer list than most teams plan for:</p>
<ul>
<li><strong>In-game text</strong> — UI, HUD, tooltips, settings, error states, tutorials, system messages.</li>
<li><strong>Narrative and dialogue</strong> — story beats, character voice, branching choices, barks.</li>
<li><strong>Subtitles and closed captions</strong> — timed correctly, with speaker labels and sound cues.</li>
<li><strong>Voiceover scripts</strong> — written for performance, with lip-sync notes and emotional direction.</li>
<li><strong>Store and ASO copy</strong> — Steam, App Store, Google Play, Epic, console listings. Title, description, keywords, screenshot text.</li>
<li><strong>Marketing assets</strong> — trailers, social, key art copy, press releases, community posts.</li>
<li><strong>Legal and compliance</strong> — EULA, privacy policy, age-rating-driven content warnings.</li>
<li><strong>Live-ops content</strong> — patch notes, season passes, event banners, push notifications.</li>
</ul>

<h2>The biggest mistakes studios make</h2>
<p>Across hundreds of localization projects, the same five mistakes show up over and over:</p>
<h3>1. String concatenation</h3>
<p>Code like <code>"You killed " + count + " enemies"</code> looks fine in English and falls apart everywhere else. Word order, plural rules, and grammatical gender don't translate piece by piece. Use a real string-formatting standard (ICU MessageFormat is the right answer) and pass variables as named placeholders the linguist can move.</p>
<h3>2. Hard-coded text</h3>
<p>Strings baked into textures, prefabs, source code, or art assets are the single most expensive localization bug to fix. Externalize every user-facing string — including UI text inside images — before content lock.</p>
<h3>3. No character limits and no context</h3>
<p>"Start" is four characters in English and ten in German ("Starten"… or more). Buttons truncate, dialogue overlaps portraits, subtitles run off the screen. Ship linguists the character limit per string and a screenshot of where it appears, or they're guessing.</p>
<h3>4. Ignoring culturalization</h3>
<p>A red cross on a health pack, a gesture that's friendly in one country and offensive in another, a religious symbol on a faction banner, alcohol or gore where the local rating board doesn't allow it — these don't get caught by translation, they get caught by a culturalization review. Run that review <em>before</em> the build is locked, not after submission.</p>
<h3>5. Skipping LQA</h3>
<p>Every spreadsheet of strings looks fine in a spreadsheet. The bugs only appear in the build: text behind UI, wrong gender for the player character, untranslated strings the linguists never saw, audio playing over subtitles. Budget for in-context LQA on the real build in every locale — it's the single highest-ROI line item in a localization budget.</p>

<h2>Preparing your game so localization is painless</h2>
<p>The studios who launch globally without drama all do roughly the same things during development:</p>
<ul>
<li><strong>Externalize every user-facing string</strong> into a single localization table (JSON, XML, .po, .resx, .strings, Unity Localization, Unreal StringTables, Godot CSV — pick one and stick with it).</li>
<li><strong>Leave UI text-expansion room.</strong> Plan for at least 30% growth from English. Some languages need more.</li>
<li><strong>Use a real i18n formatter</strong> for plurals, genders, dates, numbers, and currencies.</li>
<li><strong>Tag every string with context</strong> — what screen, what character, what tone, what character limit, and which variables it accepts.</li>
<li><strong>Provide screenshots</strong> for the in-game UI. Linguists translating a 4-character button with no screenshot will produce a 12-character word every time.</li>
<li><strong>Maintain a glossary and style guide</strong> for your world: character names, faction names, item names, lore terms. Lock these once, change them rarely.</li>
<li><strong>Wire your localization pipeline into version control.</strong> Strings flow out on every merge, come back reviewed, and never block a build.</li>
</ul>

<h2>Choosing which languages to launch in</h2>
<p>You don't have to ship all 100+ languages on day one. We usually recommend a two-track approach.</p>
<p><strong>High-ROI launch set</strong> — Japanese, Korean, Simplified Chinese, German, French, European Spanish, Brazilian Portuguese, Italian, Russian. These markets are large, monetise well, and players actively penalise English-only releases in store reviews.</p>
<p><strong>Underserved-but-loyal markets</strong> — Latin American Spanish (different from European), Polish, Turkish, Arabic, Vietnamese, Indonesian, and major African languages like Swahili, Hausa, and Yoruba. Localization here is cheap relative to the audience reach, and players in these markets are vocally grateful when a studio shows up properly.</p>
<p>Pair the launch set with a content tier strategy: full localization (text + VO) for hero markets, text-only with subtitled cinematics for the next tier, and store-page-only for markets you want to test conversion in before committing further.</p>

<h2>The workflow, step by step</h2>
<ol>
<li><strong>Scope and quote.</strong> Word count by content type (UI, narrative, marketing, legal), language list, VO needs, LQA hours per locale.</li>
<li><strong>Glossary and style guide.</strong> Lock character names, world terms, tone, formality (T-V distinction matters in French, German, Spanish, and many other languages).</li>
<li><strong>Native gamer-linguists.</strong> Real players of your genre in every target language, calibrated on a sample before the main programme starts.</li>
<li><strong>Translation with context.</strong> In a TMS connected to your engine. Linguists see character limits, placeholders, and screenshots; translation memory reuses prior decisions automatically.</li>
<li><strong>Senior review.</strong> A second native linguist reviews every customer-facing string. Edge cases get adjudicated with the studio.</li>
<li><strong>In-context LQA.</strong> Linguists play the actual build per locale, logging bugs in your tracker. UI truncation, broken variables, wrong tone, mistimed subs — all caught before launch.</li>
<li><strong>Final QA report and sign-off.</strong> Per-language bug status, fixes verified, ready-to-ship sign-off.</li>
<li><strong>Live-ops loop.</strong> New strings flow from every patch into the same pipeline, ship in every language on the same release as English.</li>
</ol>

<h2>AI and humans in game localization, in 2026</h2>
<p>Machine translation and multilingual TTS have both gotten genuinely good. They are <strong>tools</strong> that change the economics of localization — they don't replace native gamer-linguists or LQA, and any studio that thinks they do learns the hard way at launch.</p>
<p>What actually works in 2026:</p>
<ul>
<li><strong>AI for speed at scale.</strong> Use modern MT to pre-translate large volumes of low-risk text (system messages, repetitive UI, patch notes) so human linguists focus their attention on narrative, hero copy, and marketing.</li>
<li><strong>Human for judgment.</strong> Tone, humour, lore, character voice, branching choices, and anything emotional needs a native linguist. No exceptions.</li>
<li><strong>TTS for prototypes and procedural lines.</strong> Multilingual TTS is excellent for placeholder VO and large-scale NPC barks — under human direction with native-speaker review on the final audio.</li>
<li><strong>Human VO for hero characters and cinematics.</strong> Performance still belongs to actors. Always will.</li>
<li><strong>LQA is non-negotiable.</strong> AI doesn't know your build is shipping a truncated button. A linguist playing the game in their language does.</li>
</ul>

<h2>A pre-launch localization checklist</h2>
<ul>
<li>All user-facing strings externalized to a localization table.</li>
<li>ICU MessageFormat (or equivalent) for plurals, gender, dates, currency.</li>
<li>Character limits documented per string. UI tested at +30% expansion.</li>
<li>Screenshots and context attached to every string in the TMS.</li>
<li>Glossary, style guide, and tone notes signed off per language.</li>
<li>Native gamer-linguists calibrated on a sample chapter.</li>
<li>Culturalization review completed before content lock.</li>
<li>Subtitles timed, hearing-impaired captions if applicable.</li>
<li>VO scripts with lip-sync notes for dub markets; talent cast and directed.</li>
<li>Store-page copy localized per market, not just translated.</li>
<li>In-context LQA on the real build in every locale. Bugs filed, fixed, verified.</li>
<li>Continuous-localization pipeline wired up for post-launch patches.</li>
</ul>

<h2>Where to go next</h2>
<p>If you're a studio planning a global launch, the cheapest mistake is the one you don't ship. Get the architecture right, hire native gamer-linguists, run real LQA, and treat localization as a first-class part of the build — not a step you bolt on at the end. That is the difference between a launch and a relaunch.</p>
<p>Our <a href="/services/game-localization">Game Localization & Translation service</a> exists exactly for this — UI and dialogue, subtitles and VO scripts, store and ASO copy, culturalization, and in-context LQA in 100+ languages. See how it played out for a <a href="/portfolio/game-localization-rpg">narrative RPG that launched into 12 languages in 10 weeks</a>, or <a href="/contact">talk to an expert</a> about your title.</p>
`,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function allSlugs(): string[] {
  return posts.map((p) => p.slug);
}
