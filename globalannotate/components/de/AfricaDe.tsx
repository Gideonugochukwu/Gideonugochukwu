import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { servicesHeroSlides } from "@/lib/images";
import { deSlides } from "@/lib/images.de";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { organizationSchemaDe } from "@/lib/schema.de";
import { deLd, DE_HOME } from "@/lib/de";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";

export const DE_META = {
  title: "Übersetzungsagentur Afrika | GlobalAnnotate",
  description:
    "Übersetzungsagentur Afrika: Übersetzung und Lokalisierung in Hausa, Yoruba, Igbo, Wolof, Amharisch, Swahili und mehr – mit kultureller Validierung.",
};

const GAP = [
  {
    stat: "2.000+",
    label: "Sprachen in Afrika",
    body: "Über 500 Mio. Menschen sprechen als Erstsprache weder Englisch noch Französisch – ein Markt, den die meisten Inhalte nie erreichen.",
  },
  {
    stat: "Die meisten Agenturen",
    label: "decken afrikanische Sprachen nicht ab",
    body: "Sie bieten sie entweder gar nicht an oder vergeben sie kurzfristig an ungeprüfte Freiberufler – ohne Verantwortlichkeit.",
  },
  {
    stat: "GlobalAnnotate",
    label: "wurde gegründet, um diese Lücke zu schließen",
    body: "Geprüfte, zur Geheimhaltung verpflichtete muttersprachliche Sprachexperten auf dem ganzen Kontinent – der Spezialist, der afrikanischen Sprachen gefehlt hat.",
  },
];

const REGIONS = [
  { region: "Westafrika", languages: ["Hausa", "Yoruba", "Igbo", "Wolof", "Twi", "Ful", "Ewe", "Mooré"] },
  { region: "Ostafrika", languages: ["Swahili", "Amharisch", "Somali", "Tigrinya", "Oromo", "Kinyarwanda"] },
  { region: "Südliches Afrika", languages: ["Zulu", "Shona", "Xhosa", "Sotho", "Tswana", "Ndebele"] },
  { region: "Zentralafrika", languages: ["Lingala", "Sango", "Kirundi"] },
  { region: "Nordafrika", languages: ["Arabisch (Ägypten)", "Arabisch (Marokko)", "Arabisch (Tunesien)"] },
];

const USE_CASES = [
  "Expansion von Finanztechnologie-Unternehmen in afrikanische Märkte",
  "Inhalte von Nichtregierungsorganisationen und humanitären Organisationen für die Bevölkerung Afrikas",
  "Produktangebote im Onlinehandel für Käufer in Afrika",
  "Kommunikation von Behörden und im öffentlichen Gesundheitswesen",
  "Spielelokalisierung für Afrika und seine Mobilspieler",
  "KI-Trainingsdaten in afrikanischen Sprachen",
  "Untertitelung und Synchronisation für das afrikanische Streamingpublikum",
];

const MARKETREADY = [
  {
    title: "Kulturelle Validierung zählt hier besonders",
    body: "Afrikanische Märkte haben die größten kulturellen Feinheiten und das höchste Risiko unpassender Inhalte – Validierung ist hier keine Option, sondern Pflicht.",
  },
  {
    title: "Echte Muttersprachler bestätigen die Wirkung",
    body: "Gremien in Kano, Lagos, Dakar, Nairobi und Addis Abeba prüfen Ihre Inhalte und bestätigen vor dem Start, dass sie ankommen.",
  },
  {
    title: "Ein unterzeichneter MarketReady™-Bericht",
    body: "Jeder Auftrag endet mit einem dokumentierten, unterzeichneten Bericht, der die Marktreife der Inhalte bestätigt.",
  },
];

// /de/translation-services-africa — German Africa geo page.
export default function AfricaDe() {
  const url = `${site.url}/de/translation-services-africa`;
  return (
    <>
      <JsonLd
        data={deLd([
          organizationSchemaDe(),
          serviceSchema({
            name: "Übersetzung afrikanischer Sprachen",
            description: DE_META.description,
            url,
            areaServed: "Afrika",
            serviceType: "Übersetzung und Lokalisierung",
          }),
          breadcrumbSchema([
            { name: DE_HOME, url: `${site.url}/de` },
            { name: "Übersetzung afrikanischer Sprachen", url },
          ]),
        ])}
      />

      <PageHero
        eyebrow="Übersetzung · Afrika"
        breadcrumbs={[
          { name: DE_HOME, href: "/" },
          { name: "Übersetzung afrikanischer Sprachen", href: "/translation-services-africa" },
        ]}
        title="Übersetzungsagentur Afrika: afrikanische Sprachen, Muttersprachler, marktreife Inhalte."
        subtitle="Die Übersetzungsagentur für die Sprachen Afrikas – von Wolof bis Zulu, von Hausa bis Amharisch. Jedes Projekt umfasst die MarketReady™ kulturelle Validierung."
        ctas={[
          { label: "In den afrikanischen Markt eintreten", href: "/contact" },
          { label: "Alle Sprachen ansehen", href: "/languages", variant: "ghost" },
        ]}
        slides={deSlides(servicesHeroSlides)}
      />

      <Section className="pt-20 md:pt-28">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">Die afrikanische Sprachlücke</p>
          <h2 className="section-h2 mt-4 text-ink-900">Der Kontinent, den die Übersetzungsbranche vergessen hat.</h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {GAP.map((g, i) => (
            <Reveal key={g.label} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-ink-200 bg-white p-7">
                <p className="font-display text-3xl font-semibold tracking-tight text-brand-700">{g.stat}</p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-ink-500">{g.label}</p>
                <p className="mt-4 text-ink-600 leading-relaxed">{g.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">Afrikanische Sprachen, die wir abdecken</p>
          <h2 className="section-h2 mt-4 text-ink-900">Abdeckung in jeder Region des Kontinents.</h2>
        </div>
        <div className="mt-12 space-y-10">
          {REGIONS.map((r) => (
            <Reveal key={r.region}>
              <div className="grid gap-4 lg:grid-cols-[1fr_2.4fr] lg:gap-12">
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink-900">{r.region}</h3>
                <ul className="flex flex-wrap gap-2 content-start">
                  {r.languages.map((l) => (
                    <li
                      key={l}
                      className="inline-flex items-center rounded-full border border-ink-200 bg-white px-3 py-1.5 text-sm font-medium text-ink-800"
                    >
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">Einsatzbereiche</p>
          <h2 className="section-h2 mt-4 text-ink-900">Was Teams mit uns in Afrika umsetzen.</h2>
        </div>
        <ul className="mt-10 grid gap-x-10 gap-y-5 md:grid-cols-2">
          {USE_CASES.map((u, i) => (
            <Reveal key={u} delay={(i % 2) * 0.04}>
              <li className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                </span>
                <span className="text-ink-700 leading-relaxed">{u}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-brand-700">
            <ShieldCheck className="h-3.5 w-3.5" /> MarketReady™
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">MarketReady™ für afrikanische Märkte.</h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {MARKETREADY.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.05}>
              <div className="border-l-2 border-brand-200 pl-6 py-1">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink-900">{m.title}</h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/services/marketready"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-900 hover:text-brand-700 transition"
          >
            So funktioniert MarketReady™ <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-12 text-center">
          <h2 className="section-h2 text-ink-900">Treten Sie mit Zuversicht in den afrikanischen Markt ein</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-ink-600 leading-relaxed">
            Muttersprachliche Übersetzung, kulturelle Validierung und KI-Daten – für jede afrikanische Sprache, von der Ihr Wachstum abhängt. Mehr dazu in unserem{" "}
            <Link href="/blog/african-language-translation-guide" className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline">
              Leitfaden zur Übersetzung afrikanischer Sprachen
            </Link>
            .
          </p>
          <Link href="/contact" className="btn-primary mt-7 inline-flex">
            Beratung anfragen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section className="pb-24 pt-0">
        <CTABand />
      </Section>
    </>
  );
}
