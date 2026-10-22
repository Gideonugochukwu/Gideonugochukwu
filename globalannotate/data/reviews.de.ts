import type { Review } from "./reviews";

// German copy of each review, keyed by the reviewer's name. Quotes are
// translated (site copy on /de); people's and company names keep their
// original spelling.
type DeReviewFields = Pick<Review, "quote" | "role" | "industry" | "country">;

export const reviewsDe: Record<string, DeReviewFields> = {
  "Amara Okafor": {
    quote:
      "GlobalAnnotate hat unsere Patienten-App in weniger als drei Wochen in 14 Sprachen lokalisiert. Die kulturellen Feinheiten saßen perfekt – und das Projektmanagement war das beste, das ich je erlebt habe.",
    role: "Leiterin Lokalisierung",
    industry: "Gesundheitstechnologie",
    country: "Nigeria",
  },
  "Daniel Park": {
    quote:
      "Wir haben vier Anbieter für Datenannotation verglichen. GlobalAnnotate lieferte die saubersten Daten in der kürzesten Zeit, und die Qualitätsberichte sind die besten der Branche.",
    role: "Leiter maschinelles Lernen",
    industry: "KI / große Sprachmodelle",
    country: "Südkorea",
  },
  "Sophie Martin": {
    quote:
      "Ihre Werbestrategie auf Facebook und Instagram hat unseren Werbeertrag im ersten Quartal vervierfacht. Transparente Berichte und ein Team, das den Direktvertrieb wirklich versteht.",
    role: "Gründerin",
    industry: "Kosmetik und Direktvertrieb",
    country: "Frankreich",
  },
  "Rafael Mendoza": {
    quote:
      "Solide Untertitelung und Synchronisation für unseren Start in Lateinamerika. Bei den Lieferzeiten gab es kleinere Verzögerungen, die Qualität war jedoch ausgezeichnet.",
    role: "Leiter Inhalte",
    industry: "Medien und Unterhaltung",
    country: "Mexiko",
  },
  "Priya Raghavan": {
    quote:
      "Wir brauchten Trainingsdaten zur Sprachverarbeitung in acht indischen Sprachen mit sehr spezifischen Absichtskategorien. GlobalAnnotate hat den Umfang sorgfältig geplant und vor dem Termin geliefert.",
    role: "Leiterin KI",
    industry: "Bildungstechnologie",
    country: "Indien",
  },
  "Lina Haddad": {
    quote:
      "Von arabischen Anzeigenmotiven bis zur Strategie mit Meinungsführern – sie behandeln unsere Marke wie ihre eigene. Unser Werbeertrag hat sich in zwei Monaten verdoppelt.",
    role: "Leiterin Wachstum",
    industry: "Kosmetik",
    country: "Vereinigte Arabische Emirate",
  },
};
