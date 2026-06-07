export type Review = {
  name: string;
  company: string;
  country: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  date: string;
};

export const reviews: Review[] = [
  {
    name: "Amara Okafor",
    company: "Beam Health",
    country: "Nigeria",
    rating: 5,
    comment:
      "GlobalAnnotate localized our patient app into 14 languages in under three weeks. The cultural nuance was spot on — and the project management was the best I've worked with.",
    date: "2025-02-14",
  },
  {
    name: "Daniel Park",
    company: "Northwind AI",
    country: "South Korea",
    rating: 5,
    comment:
      "We benchmarked four annotation vendors. GlobalAnnotate delivered the cleanest data with the fastest turnaround, and their QA reports are best-in-class.",
    date: "2025-01-22",
  },
  {
    name: "Sophie Martin",
    company: "Maison Verte",
    country: "France",
    rating: 5,
    comment:
      "Their Meta ads strategy quadrupled our return on ad spend in the first quarter. Transparent reporting and a team that actually understands DTC.",
    date: "2024-12-09",
  },
  {
    name: "Rafael Mendoza",
    company: "Tribu Studios",
    country: "Mexico",
    rating: 4,
    comment:
      "Solid subtitling and dubbing localization for our Latin American launch. A couple of small turnaround hiccups, but the quality was excellent.",
    date: "2024-11-18",
  },
  {
    name: "Priya Raghavan",
    company: "LumenLearn",
    country: "India",
    rating: 5,
    comment:
      "We needed NLP training data in eight Indian languages with very specific intent labels. GlobalAnnotate scoped it carefully and delivered ahead of schedule.",
    date: "2024-10-30",
  },
  {
    name: "Lina Haddad",
    company: "Noor Cosmetics",
    country: "United Arab Emirates",
    rating: 5,
    comment:
      "From Arabic ad creatives to influencer strategy — they treat our brand like their own. Our ROAS doubled in two months.",
    date: "2024-10-04",
  },
];
