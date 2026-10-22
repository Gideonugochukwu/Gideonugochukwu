import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { servicesHeroSlides } from "@/lib/images";
import { deSlides } from "@/lib/images.de";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { deLd, DE_HOME } from "@/lib/de";
import {
  africanLanguagesDe,
  regionalGroupsDe,
  servicesEveryLanguageDe,
  DE_SERVICE_TAGS,
} from "@/lib/language-coverage.de";
import { ArrowRight, Check, Globe, MapPin, Users, Type } from "lucide-react";

export const DE_META = {
  title: "Afrikanische Sprachen Übersetzung | GlobalAnnotate",
  description:
    "Afrikanische Sprachen Übersetzung: Hausa, Yoruba, Igbo, Swahili, Amharisch, Wolof und über 100 weitere Sprachen mit Regionen und Sprecherzahlen.",
};

const FAQ = [
  {
    q: "Wie viele Sprachen deckt GlobalAnnotate ab?",
    a: "GlobalAnnotate deckt über 100 Sprachen ab – für Übersetzung, Lokalisierung, maschinelle Übersetzung mit anschließender Nachbearbeitung (MTPE), KI-Datenannotation und die MarketReady™ kulturelle Validierung, über afrikanische, europäische, asiatische, nahöstliche und zentralasiatische Sprachfamilien hinweg.",
  },
  {
    q: "Welche afrikanischen Sprachen übersetzt GlobalAnnotate?",
    a: "Wir bieten muttersprachliche Qualität in Hausa, Yoruba, Igbo, Wolof, Amharisch, Swahili, Somali, Zulu, Shona, Twi, Ful (Fulfulde), Tigrinya, Oromo, Kinyarwanda, Lingala, Madagassisch und weiteren Sprachen – mit geprüften, zur Geheimhaltung verpflichteten Sprachexperten statt kurzfristig gesuchter Freiberufler.",
  },
  {
    q: "Bietet GlobalAnnotate KI-Datenannotation in afrikanischen Sprachen an?",
    a: "Ja. Wir liefern KI-Datenannotation – Textklassifizierung, Stimmungsanalyse, Eigennamenerkennung, Präferenzpaare für verstärkendes Lernen aus menschlichem Feedback (RLHF), Audiotranskription und Sprachbewertung – in afrikanischen Sprachen wie Hausa, Yoruba, Amharisch und Swahili, die die meisten Annotationsanbieter nicht abdecken.",
  },
  {
    q: "Was ist die MarketReady™ kulturelle Validierung?",
    a: "MarketReady™ ist das eigene Verfahren von GlobalAnnotate vor der Markteinführung: 3–5 echte Muttersprachler im Zielmarkt prüfen die übersetzten Inhalte und bewerten Natürlichkeit, kulturelle Angemessenheit, Tonalität, Verständlichkeit und Sensibilität, bevor Sie veröffentlichen.",
  },
  {
    q: "Wie erhalte ich ein Angebot für eine bestimmte Sprache?",
    a: "Nennen Sie uns über das Anfrageformular Sprachpaar, Inhaltsart und Umfang – Sie erhalten ein konkretes Angebot. Wenn eine Sprache gesprochen wird, können wir sie mit hoher Wahrscheinlichkeit abdecken. Fragen Sie also auch dann, wenn sie nicht aufgeführt ist.",
  },
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-ink-200 bg-white px-3 py-1.5 text-sm font-medium text-ink-800">
      {children}
    </span>
  );
}

// /de/languages
export default function LanguagesDe() {
  const url = `${site.url}/de/languages`;
  const items = [
    ...africanLanguagesDe.map((l) => `${l.name} (${l.countries}; ${l.speakers} Sprecher)`),
    ...regionalGroupsDe.flatMap((g) =>
      g.languages.map((l) => `${l.name} (${l.regions}; ${l.speakers} Sprecher)`)
    ),
  ];
  return (
    <>
      <JsonLd
        data={deLd([
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Afrikanische Sprachen Übersetzung – Sprachenliste",
            description:
              "Die über 100 Sprachen, in denen GlobalAnnotate Übersetzung, Lokalisierung, MTPE, KI-Datenannotation und die MarketReady™ kulturelle Validierung anbietet.",
            url,
            numberOfItems: items.length,
            itemListElement: items.map((name, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name,
            })),
          },
          faqSchema(FAQ),
          breadcrumbSchema([
            { name: DE_HOME, url: `${site.url}/de` },
            { name: "Sprachen", url },
          ]),
        ])}
      />

      <PageHero
        eyebrow="Sprachen"
        breadcrumbs={[
          { name: DE_HOME, href: "/" },
          { name: "Sprachen", href: "/languages" },
        ]}
        title="Afrikanische Sprachen Übersetzung: über 100 Sprachen, ein Team."
        subtitle="Übersetzung, Lokalisierung, KI-Datenannotation und die MarketReady™ kulturelle Validierung – in jeder Sprache, die Ihr Unternehmen braucht."
        ctas={[
          { label: "Angebot anfordern", href: "/contact" },
          { label: "Alle Leistungen", href: "/services", variant: "ghost" },
        ]}
        slides={deSlides(servicesHeroSlides)}
      />

      <Section className="pt-20 md:pt-28">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            Afrikanische Sprachen – unsere Spezialität
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">Übersetzung afrikanischer Sprachen, die die meisten Agenturen nicht leisten können.</h2>
          <p className="mt-4 text-lg text-ink-600 leading-relaxed">
            Wir bieten muttersprachliche Qualität in afrikanischen Sprachen, für die die meisten Agenturen kein Personal haben. Das sind keine Sprachen nach dem Motto „Wir versuchen, jemanden zu finden“ – sondern Sprachen, für die geprüfte, zur Geheimhaltung verpflichtete und erfahrene Sprachexperten bereitstehen.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {africanLanguagesDe.map((lang, i) => (
            <Reveal key={lang.name} delay={(i % 3) * 0.05}>
              <div className="h-full rounded-2xl border border-ink-200 bg-white p-6 transition hover:border-brand-300">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-ink-900">
                    {lang.keyword ?? lang.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                    <Type className="h-3 w-3" /> {lang.script}
                  </span>
                </div>
                <dl className="mt-4 space-y-2 text-sm text-ink-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    <dd>{lang.countries}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 shrink-0 text-brand-600" />
                    <dd>{lang.speakers} Sprecher</dd>
                  </div>
                </dl>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {DE_SERVICE_TAGS.map((s) => (
                    <li
                      key={s}
                      className="inline-flex items-center gap-1 rounded-md bg-ink-50 px-2 py-1 text-xs font-medium text-ink-700"
                    >
                      <Check className="h-3 w-3 text-brand-600" strokeWidth={2.4} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">Leistungen je Sprache</p>
          <h2 className="section-h2 mt-4 text-ink-900">Jede Leistung in jeder Sprache, die wir abdecken.</h2>
          <p className="mt-4 text-lg text-ink-600 leading-relaxed">
            Jede der folgenden Sprachen steht mit unserem gesamten Leistungsangebot zur Verfügung. Fehlt Ihnen eine Kombination, fragen Sie uns – wir stellen ständig individuelle Programme zusammen.
          </p>
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {servicesEveryLanguageDe.map((s, i) => (
            <Reveal key={s} delay={(i % 3) * 0.04}>
              <li className="flex items-center gap-3 rounded-xl border border-ink-200 bg-white px-4 py-3.5">
                <span
                  aria-hidden
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"
                >
                  <Check className="h-4 w-4" strokeWidth={2.4} />
                </span>
                <span className="font-medium text-ink-900">{s}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">Weltweite Abdeckung</p>
          <h2 className="section-h2 mt-4 text-ink-900">Europäische, asiatische, nahöstliche und zentralasiatische Sprachen.</h2>
        </div>
        <div className="mt-12 space-y-14">
          {regionalGroupsDe.map((group) => (
            <Reveal key={group.region}>
              <div className="grid gap-6 lg:grid-cols-[1fr_2.4fr] lg:gap-12">
                <div>
                  <h3 className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-ink-900">
                    <Globe className="h-5 w-5 text-brand-600" strokeWidth={1.6} />
                    {group.region}
                  </h3>
                  <p className="mt-2 text-sm text-ink-600 leading-relaxed">{group.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.languages.slice(0, 6).map((l) => (
                      <li key={l.name}>
                        <Chip>{l.name}</Chip>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="overflow-x-auto rounded-xl border border-ink-200 bg-white">
                  <table className="w-full text-left text-sm">
                    <caption className="sr-only">{group.region}: Sprachen, Verbreitungsgebiete und Sprecherzahlen</caption>
                    <thead className="bg-ink-50 text-ink-700">
                      <tr>
                        <th scope="col" className="px-4 py-2.5 font-semibold">Sprache</th>
                        <th scope="col" className="px-4 py-2.5 font-semibold">Hauptverbreitungsgebiete</th>
                        <th scope="col" className="px-4 py-2.5 font-semibold whitespace-nowrap">Sprecher</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink-100 text-ink-700">
                      {group.languages.map((l) => (
                        <tr key={l.name}>
                          <td className="px-4 py-2 font-medium text-ink-900">{l.name}</td>
                          <td className="px-4 py-2">{l.regions}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{l.speakers}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-xs text-ink-500">
          Sprecherzahlen sind Näherungswerte für Erst- und Zweitsprachler.
        </p>
      </Section>

      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">Häufige Fragen</p>
          <h2 className="section-h2 mt-4 text-ink-900">Fragen zur Sprachabdeckung.</h2>
        </div>
        <div className="mt-10 max-w-3xl divide-y divide-ink-200 rounded-2xl border border-ink-200 bg-white">
          {FAQ.map((f) => (
            <div key={f.q} className="p-5 md:p-6">
              <h3 className="font-semibold text-ink-900">{f.q}</h3>
              <p className="mt-2 text-ink-600 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-16">
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-12 text-center">
          <h2 className="section-h2 text-ink-900">Ihre Sprache ist nicht dabei?</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-ink-600 leading-relaxed">
            Sprechen Sie uns an – wenn sie gesprochen wird, können wir sie wahrscheinlich abdecken. Jeden Monat nehmen wir neue Sprachen in laufende Programme auf. Mehr zum afrikanischen Markt lesen Sie in unserem{" "}
            <Link href="/blog/african-language-translation-guide" className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline">
              Leitfaden zur Übersetzung afrikanischer Sprachen
            </Link>
            .
          </p>
          <Link href="/contact" className="btn-primary mt-7 inline-flex">
            Kontakt aufnehmen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section className="pb-24 pt-0">
        <CTABand />
      </Section>
    </>
  );
}
