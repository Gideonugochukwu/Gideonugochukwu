import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { servicesHeroSlides } from "@/lib/images";
import { deSlides } from "@/lib/images.de";
import { breadcrumbSchema, localBusinessSchema, serviceSchema } from "@/lib/schema";
import { deLd, DE_HOME } from "@/lib/de";
import { ArrowRight, Check } from "lucide-react";

export const DE_META = {
  title: "Übersetzungsdienstleister Nigeria | GlobalAnnotate",
  description:
    "Übersetzungsdienstleister Nigeria mit Sitz in Ibadan: Übersetzung Hausa, Yoruba und Igbo, Lokalisierung, MTPE und KI-Datenannotation weltweit.",
};

const WHY = [
  { title: "Sitz in Ibadan, Nigeria", body: "Tief im lokalen Markt verwurzelt – kein entfernter Dienstleister, der den Kontext von einem anderen Kontinent aus erraten muss." },
  { title: "Muttersprachler jeder großen Sprache Nigerias", body: "Geprüfte, zur Geheimhaltung verpflichtete Sprachexperten für Hausa, Yoruba, Igbo und weitere Sprachen – einsatzbereit, nicht kurzfristig gesucht." },
  { title: "Wir verstehen den nigerianischen Markt", body: "Geschäftskultur, regulatorisches Umfeld und lokale Marktdynamik fließen in jedes Projekt ein." },
  { title: "Bei SMEDAN (Nigeria) registriert", body: "Ein registriertes nigerianisches Unternehmen (Nr. SUID-2318-4705-9712-3682), mit dem Sie bedenkenlos Verträge schließen können." },
];

const MAJOR_LANGUAGES = [
  { name: "Hausa", detail: "Nordnigeria · über 80 Mio. Sprecher" },
  { name: "Yoruba", detail: "Südwestnigeria · über 47 Mio. Sprecher" },
  { name: "Igbo", detail: "Südostnigeria · über 45 Mio. Sprecher" },
  { name: "Nigerianisches Pidgin", detail: "Informelle und geschäftliche Verständigung" },
];

const OTHER_LANGUAGES = ["Fulfulde", "Kanuri", "Tiv", "Efik", "Ibibio", "Edo", "Nupe", "Ijaw"];

const SERVICES = [
  "Übersetzung für nigerianische Unternehmen mit internationaler Expansion",
  "Lokalisierung für internationale Unternehmen beim Markteintritt in Nigeria",
  "Beglaubigte Übersetzung von Dokumenten für Einwanderung, Recht und Ausbildung",
  "KI-Datenannotation in nigerianischen Sprachen",
  "MarketReady™ kulturelle Validierung für Inhalte, die sich an nigerianische Zielgruppen richten",
  "Mehrsprachige Suchmaschinenoptimierung für nigerianische Märkte",
];

const INDUSTRIES = [
  { title: "Finanztechnologie", body: "Lokalisierung von App-Oberflächen, Kontoeröffnungsabläufen, Geschäftsbedingungen und Kundenservice-Inhalten für Produkte der finanziellen Teilhabe." },
  { title: "Onlinehandel", body: "Übersetzung von Produktangeboten, Lokalisierung des Bestellprozesses und suchmaschinenoptimierte Beschreibungen für lokale Käufer." },
  { title: "Banken und Finanzen", body: "Übersetzungen zur Regelkonformität, regulatorische Dokumente und interne Kommunikation." },
  { title: "Öl und Gas", body: "Fachübersetzungen, Sicherheitsdokumentation, Handbücher für Arbeits-, Gesundheits- und Umweltschutz sowie Einsatzberichte." },
  { title: "Behörden und Nichtregierungsorganisationen", body: "Öffentliche Kommunikation, Grundsatzdokumente, Gesundheitskampagnen und mehrsprachige Bürgerdienste." },
  { title: "Technologie-Gründungen", body: "App-Lokalisierung, Marketinginhalte und Unterlagen für Investoren." },
  { title: "Gesundheitswesen", body: "Klinische Dokumente, Patienteninformationen, pharmazeutische Inhalte und Kampagnen zur öffentlichen Gesundheit." },
];

// /de/translation-services-nigeria — German Nigeria geo page.
export default function NigeriaDe() {
  const url = `${site.url}/de/translation-services-nigeria`;
  return (
    <>
      <JsonLd
        data={deLd([
          localBusinessSchema({
            description: DE_META.description,
            url,
            addressLocality: "Ibadan",
            addressRegion: "Oyo",
            addressCountry: "NG",
            areaServed: "Nigeria",
            serviceType: ["Übersetzung", "Lokalisierung", "KI-Datenannotation"],
          }),
          serviceSchema({
            name: "Übersetzungsdienstleistungen in Nigeria",
            description: DE_META.description,
            url,
            areaServed: "Nigeria",
            serviceType: "Übersetzung und Lokalisierung",
          }),
          breadcrumbSchema([
            { name: DE_HOME, url: `${site.url}/de` },
            { name: "Übersetzungsdienstleistungen in Nigeria", url },
          ]),
        ])}
      />

      <PageHero
        eyebrow="Übersetzung · Nigeria"
        breadcrumbs={[
          { name: DE_HOME, href: "/" },
          { name: "Übersetzungsdienstleistungen in Nigeria", href: "/translation-services-nigeria" },
        ]}
        title="Übersetzungsdienstleister Nigeria: Ihr Partner für Übersetzung und Lokalisierung"
        subtitle="Mit Sitz in Ibadan – im Einsatz für die ganze Welt. Muttersprachliche Übersetzung in jeder Sprache Nigerias und in über 100 internationalen Sprachpaaren."
        ctas={[
          { label: "Kostenloses Angebot anfordern", href: "/contact" },
          { label: "Alle Sprachen ansehen", href: "/languages", variant: "ghost" },
        ]}
        slides={deSlides(servicesHeroSlides)}
      />

      <Section className="pt-20 md:pt-28">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">Warum GlobalAnnotate</p>
            <h2 className="section-h2 mt-4 text-ink-900">
              Ein nigerianisches Unternehmen,
              <br />
              gemacht für Aufträge in Nigeria.
            </h2>
          </div>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {WHY.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.04}>
                <li className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"
                  >
                    <Check className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold tracking-tight text-ink-900">{item.title}</h3>
                    <p className="mt-1.5 text-ink-600 leading-relaxed">{item.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">Nigerianische Sprachen, die wir abdecken</p>
          <h2 className="section-h2 mt-4 text-ink-900">Jede große Sprache Nigerias – muttersprachlich.</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MAJOR_LANGUAGES.map((lang, i) => (
            <Reveal key={lang.name} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-ink-200 bg-white p-6">
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink-900">{lang.name}</h3>
                <p className="mt-2 text-sm text-ink-600">{lang.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <p className="text-sm font-medium text-ink-700">Außerdem muttersprachlich abgedeckt:</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {OTHER_LANGUAGES.map((l) => (
              <li
                key={l}
                className="inline-flex items-center rounded-full border border-ink-200 bg-white px-3 py-1.5 text-sm font-medium text-ink-800"
              >
                {l}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">Leistungen für Unternehmen in Nigeria</p>
          <h2 className="section-h2 mt-4 text-ink-900">In welche Richtung Sie auch wachsen.</h2>
        </div>
        <ul className="mt-10 grid gap-x-10 gap-y-5 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s} delay={(i % 2) * 0.04}>
              <li className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                </span>
                <span className="text-ink-700 leading-relaxed">{s}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">Branchen, die wir in Nigeria betreuen</p>
          <h2 className="section-h2 mt-4 text-ink-900">Branchenwissen statt Übersetzung von der Stange.</h2>
        </div>
        <div className="mt-12 grid gap-8 md:gap-10 md:grid-cols-2">
          {INDUSTRIES.map((u, i) => (
            <Reveal key={u.title} delay={(i % 2) * 0.04}>
              <div className="border-l-2 border-brand-200 pl-6 py-1">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink-900">{u.title}</h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{u.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-12 text-center">
          <h2 className="section-h2 text-ink-900">Kostenloses Angebot für Ihr Übersetzungsprojekt in Nigeria</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-ink-600 leading-relaxed">
            Nennen Sie uns Sprachpaar, Inhaltsart und Umfang – Sie erhalten ein konkretes Angebot.
          </p>
          <Link href="/contact" className="btn-primary mt-7 inline-flex">
            Kostenloses Angebot anfordern <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section className="pb-24 pt-0">
        <CTABand />
      </Section>
    </>
  );
}
