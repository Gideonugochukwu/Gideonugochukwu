import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { servicesHeroSlides } from "@/lib/images";
import { deSlides } from "@/lib/images.de";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { deLd, DE_HOME } from "@/lib/de";
import { ArrowRight, HeartPulse, Factory, Scale, Landmark, Cpu } from "lucide-react";

export const DE_META = {
  title: "Fachübersetzungen nach Branchen | GlobalAnnotate",
  description:
    "Fachübersetzung und KI-Daten für regulierte Branchen: Medizin und Biowissenschaften, Technik, Recht, öffentlicher Sektor und KI – in über 100 Sprachen.",
};

const INDUSTRIES = [
  {
    id: "medical",
    icon: HeartPulse,
    name: "Medizin und Biowissenschaften",
    body: "Präzise, regelkonforme Sprache für klinische und regulierte medizinische Inhalte – bearbeitet von spezialisierten Sprachexperten unter Wahrung der Vertraulichkeit.",
    points: [
      "Unterlagen für klinische Studien (Prüfpläne, Einwilligungserklärungen, Prüfbögen)",
      "Gebrauchsanweisungen und Kennzeichnung von Medizinprodukten",
      "Patienteninformationen und Fragebögen",
      "Sprachanforderungen der EU-Verordnungen über Medizinprodukte und In-vitro-Diagnostika in den Sprachen der Mitgliedstaaten",
    ],
  },
  {
    id: "manufacturing",
    icon: Factory,
    name: "Industrie und Technik",
    body: "Technische Genauigkeit für komplexe Produkte, Maschinen und die Dokumentation, die Beschäftigte schützt und Vorschriften erfüllt.",
    points: [
      "Bedienungs- und Wartungsanleitungen",
      "Sicherheitsdokumentation und Unterlagen zu Arbeits-, Gesundheits- und Umweltschutz",
      "Inhalte aus Maschinenbau, Industrie und Ingenieurwesen",
      "Produktlokalisierung für internationale Märkte",
    ],
  },
  {
    id: "legal",
    icon: Scale,
    name: "Recht und Unternehmen",
    body: "Vertrauliche, genaue Übersetzungen für Rechtsabteilungen und Unternehmen – beglaubigte Übersetzungen auf Anfrage.",
    points: [
      "Verträge, Vereinbarungen und Gesellschaftsunterlagen",
      "Unterlagen zu Regelkonformität, Regulierung und Richtlinien",
      "Unterstützung bei elektronischer Beweisaufnahme und in Rechtsstreitigkeiten",
      "Beglaubigte Übersetzung auf Anfrage",
    ],
  },
  {
    id: "public-sector",
    icon: Landmark,
    name: "Öffentlicher Sektor und Nichtregierungsorganisationen",
    body: "Mehrsprachige Kommunikation für Institutionen und Organisationen der Entwicklungszusammenarbeit – mit echter Tiefe bei afrikanischen Sprachen.",
    points: [
      "Programme und Ausschreibungen der Vereinten Nationen und von Entwicklungsbanken",
      "Richtlinien, öffentliche Kommunikation und Berichte",
      "Gesundheits-, humanitäre und bürgernahe Kampagnen",
      "Registrierter Lieferant – siehe „Zusammenarbeit“",
    ],
  },
  {
    id: "ai-tech",
    icon: Cpu,
    name: "KI und Technologie",
    body: "Hochwertige mehrsprachige Daten für Teams, die KI entwickeln und bewerten – auch in Sprachen, die andere nicht abdecken.",
    points: [
      "KI-Datenannotation",
      "Präferenzdaten für verstärkendes Lernen aus menschlichem Feedback (RLHF) und Modellbewertung",
      "Mehrsprachige Datensätze in über 100 Sprachen",
      "Lokalisierung von Software, Apps und Spielen",
    ],
  },
];

// /de/industries — German Industries page.
export default function IndustriesDe() {
  const url = `${site.url}/de/industries`;
  return (
    <>
      <JsonLd
        data={deLd([
          webPageSchema({ name: "Branchen – GlobalAnnotate", description: DE_META.description, url }),
          breadcrumbSchema([
            { name: DE_HOME, url: `${site.url}/de` },
            { name: "Branchen", url },
          ]),
        ])}
      />

      <PageHero
        eyebrow="Branchen"
        title="Fachübersetzung nach Branchen: für regulierte Branchen und Großunternehmen."
        subtitle="Spezialisierte Sprach- und KI-Datendienste für Branchen, in denen Genauigkeit, Vertraulichkeit und Prozesstreue am meisten zählen – in über 100 Sprachen."
        breadcrumbs={[
          { name: DE_HOME, href: "/" },
          { name: "Branchen", href: "/industries" },
        ]}
        ctas={[
          { label: "Angebot anfordern", href: "/contact" },
          { label: "Zusammenarbeit", href: "/procurement", variant: "ghost" },
        ]}
        slides={deSlides(servicesHeroSlides)}
      />

      <Section className="pt-20 md:pt-28">
        <div className="space-y-6">
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            return (
              <Reveal key={ind.id} delay={0}>
                <article
                  id={ind.id}
                  className="scroll-mt-24 rounded-2xl border border-ink-200 bg-white p-7 md:p-9"
                >
                  <div className="grid gap-8 lg:grid-cols-[1.2fr_1.4fr] lg:items-start">
                    <div>
                      <span
                        aria-hidden
                        className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-ink-200 text-brand-700"
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <h2 className="section-h3 mt-5 text-ink-900">{ind.name}</h2>
                      <p className="mt-3 text-ink-600 leading-relaxed">{ind.body}</p>
                      <Link href="/contact" className="btn-primary mt-6 inline-flex text-sm">
                        Angebot anfordern <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <ul className="grid gap-3 sm:grid-cols-1 lg:pt-2">
                      {ind.points.map((pt) => (
                        <li
                          key={pt}
                          className="flex items-start gap-3 border-l-2 border-brand-200 pl-4 py-0.5 text-ink-700 leading-relaxed"
                        >
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section className="pb-24 pt-0">
        <CTABand />
      </Section>
    </>
  );
}
