// How each review's author is presented publicly. The actual data we hold
// internally (full name + role + company) can stay the same; this just
// controls which slice we show on the site.
//
//   'named'    — full name · company · country               most credible / least private
//   'initial'  — first name + last initial · role · country
//   'role'     — role, industry — country (no name at all)
//   'verified' — "Verified client" · industry · country      most private
//
// Set `verified: true` to show a small "Verified client" trust mark next to
// the author line. Use it for reviews where we can vouch for the engagement
// (signed SOW, public case study, etc.) — not as decoration.
export type ReviewDisplayMode = "named" | "initial" | "role" | "verified";

export type Review = {
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  name: string;
  firstName: string;
  lastInitial: string;
  role: string;
  company: string;
  industry: string;
  country: string;
  displayMode: ReviewDisplayMode;
  verified: boolean;
  date: string;
};

export const reviews: Review[] = [
  {
    quote:
      "GlobalAnnotate localized our patient app into 14 languages in under three weeks. The cultural nuance was spot on — and the project management was the best I've worked with.",
    rating: 5,
    name: "Amara Okafor",
    firstName: "Amara",
    lastInitial: "O.",
    role: "Head of Localization",
    company: "Beam Health",
    industry: "HealthTech",
    country: "Nigeria",
    displayMode: "named",
    verified: true,
    date: "2025-02-14",
  },
  {
    quote:
      "We benchmarked four annotation vendors. GlobalAnnotate delivered the cleanest data with the fastest turnaround, and their QA reports are best-in-class.",
    rating: 5,
    name: "Daniel Park",
    firstName: "Daniel",
    lastInitial: "P.",
    role: "ML Lead",
    company: "Northwind AI",
    industry: "AI / LLM",
    country: "South Korea",
    displayMode: "initial",
    verified: true,
    date: "2025-01-22",
  },
  {
    quote:
      "Their Meta ads strategy quadrupled our return on ad spend in the first quarter. Transparent reporting and a team that actually understands DTC.",
    rating: 5,
    name: "Sophie Martin",
    firstName: "Sophie",
    lastInitial: "M.",
    role: "Founder",
    company: "Maison Verte",
    industry: "Beauty & DTC",
    country: "France",
    displayMode: "named",
    verified: false,
    date: "2024-12-09",
  },
  {
    quote:
      "Solid subtitling and dubbing localization for our Latin American launch. A couple of small turnaround hiccups, but the quality was excellent.",
    rating: 4,
    name: "Rafael Mendoza",
    firstName: "Rafael",
    lastInitial: "M.",
    role: "Head of Content",
    company: "Tribu Studios",
    industry: "Media & Entertainment",
    country: "Mexico",
    displayMode: "role",
    verified: false,
    date: "2024-11-18",
  },
  {
    quote:
      "We needed NLP training data in eight Indian languages with very specific intent labels. GlobalAnnotate scoped it carefully and delivered ahead of schedule.",
    rating: 5,
    name: "Priya Raghavan",
    firstName: "Priya",
    lastInitial: "R.",
    role: "Director of AI",
    company: "LumenLearn",
    industry: "EdTech",
    country: "India",
    displayMode: "initial",
    verified: true,
    date: "2024-10-30",
  },
  {
    quote:
      "From Arabic ad creatives to influencer strategy — they treat our brand like their own. Our ROAS doubled in two months.",
    rating: 5,
    name: "Lina Haddad",
    firstName: "Lina",
    lastInitial: "H.",
    role: "Growth Lead",
    company: "Noor Cosmetics",
    industry: "Beauty & Cosmetics",
    country: "United Arab Emirates",
    displayMode: "verified",
    verified: true,
    date: "2024-10-04",
  },
];

// What to show as the author. Centralized so the homepage testimonials and
// the /reviews page never drift apart.
export type AuthorDisplay = {
  primary: string;
  secondary: string;
  // The "person" string used for Schema.org Review author. Mirrors what the
  // public sees so SEO does not leak data the page is hiding.
  schemaAuthor: string;
};

export function authorDisplay(r: Review): AuthorDisplay {
  switch (r.displayMode) {
    case "named":
      return {
        primary: r.name,
        secondary: `${r.company} · ${r.country}`,
        schemaAuthor: r.name,
      };
    case "initial": {
      const masked = `${r.firstName} ${r.lastInitial}`;
      return {
        primary: masked,
        secondary: `${r.role} · ${r.country}`,
        schemaAuthor: masked,
      };
    }
    case "role":
      return {
        primary: `${r.role}, ${r.industry}`,
        secondary: r.country,
        schemaAuthor: `${r.role}, ${r.industry}`,
      };
    case "verified":
      return {
        primary: "Verified client",
        secondary: `${r.industry} · ${r.country}`,
        schemaAuthor: "Verified client",
      };
  }
}
