import { organizationSchema, websiteSchema } from "./schema";
import { founder, site } from "./site";
import { deLd } from "./de";

// German copies of the site-wide Organization + WebSite JSON-LD rendered by
// the layout on /de. Types, URLs, logo, and sameAs are unchanged; only the
// human-readable fields are translated, and each block carries inLanguage.
export const DE_ORG_DESCRIPTION =
  "GlobalAnnotate ist eine Übersetzungsagentur mit Schwerpunkt auf afrikanischen Sprachen: Übersetzung, Lokalisierung, KI-Datenannotation, mehrsprachige Suchmaschinenoptimierung und digitales Marketing in über 100 Sprachen – abgesichert durch die MarketReady™ kulturelle Validierung.";

export const DE_FOUNDER_ROLE = "Gründer und leitender Sprachexperte";

export function organizationSchemaDe() {
  const org = organizationSchema();
  return {
    ...org,
    description: DE_ORG_DESCRIPTION,
    founder: { ...org.founder, jobTitle: DE_FOUNDER_ROLE },
    contactPoint: {
      ...org.contactPoint,
      contactType: "Kundenservice",
      areaServed: "Weltweit",
      availableLanguage: ["Englisch", "Deutsch", "Chinesisch"],
    },
  };
}

export function personSchemaDe() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: founder.name,
    jobTitle: DE_FOUNDER_ROLE,
    worksFor: { "@type": "Organization", name: site.name, url: site.url },
    url: `${site.url}/de/about`,
    image: founder.image,
    sameAs: founder.sameAs,
    description:
      "Gideon Ugochukwu ist Gründer und leitender Sprachexperte von GlobalAnnotate und verantwortet Übersetzung, KI-Datenannotation, digitales Marketing und Suchmaschinenoptimierung in über 100 Sprachen.",
  };
}

export function siteSchemasDe() {
  return deLd([organizationSchemaDe(), websiteSchema()]);
}
