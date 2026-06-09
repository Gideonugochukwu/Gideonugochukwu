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
    author: "GlobalAnnotate Team",
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
    author: "GlobalAnnotate Team",
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
`,
  },
  {
    slug: "international-seo-rank-in-every-language",
    title: "International SEO: How to Rank in Every Language You Sell In",
    description:
      "A practical guide to international SEO — hreflang, URL strategy, localized keyword research, content, and link building that actually move rankings in every market.",
    date: "2026-02-09",
    author: "GlobalAnnotate Team",
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
`,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function allSlugs(): string[] {
  return posts.map((p) => p.slug);
}
