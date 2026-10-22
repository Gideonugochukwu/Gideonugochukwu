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
import { ArrowRight, Check } from "lucide-react";

export const DE_META = {
  title: "Qualitätssicherung bei Übersetzungen | GlobalAnnotate",
  description:
    "Qualitätssicherung nach ISO 17100: Übersetzung durch Muttersprachler, unabhängige Revision und Endkontrolle, Terminologiemanagement und LQA.",
};

const TEP = [
  {
    step: "01",
    title: "Übersetzung",
    body: "Ein qualifizierter muttersprachlicher Sprachexperte mit passendem Fachgebiet übersetzt anhand Ihrer freigegebenen Terminologie und Referenzmaterialien.",
  },
  {
    step: "02",
    title: "Unabhängige Revision",
    body: "Ein zweiter, gleich qualifizierter Sprachexperte prüft die Übersetzung im Abgleich mit dem Ausgangstext auf Genauigkeit, Terminologie und Stil – die zweisprachige Revision, die das Herzstück von ISO 17100 bildet.",
  },
  {
    step: "03",
    title: "Endkontrolle",
    body: "Automatisierte und manuelle Prüfungen von Zahlen, Markierungen, Einheitlichkeit und Formatierung sowie ein dokumentierter Qualitätsbericht vor der Lieferung.",
  },
];

const PILLARS = [
  {
    title: "Auswahl der Sprachexperten",
    body: "Übersetzer werden auf Qualifikation, muttersprachliche Kompetenz und Fachkenntnis geprüft und unterzeichnen vor jeder Tätigkeit eine Geheimhaltungsvereinbarung. Die Qualität prüfen wir laufend nach.",
  },
  {
    title: "Passendes Fachgebiet",
    body: "Wir setzen Sprachexperten nach Fachgebiet ein – Medizin, Recht, Technik, Marketing, Spiele –, damit die Person, die Ihre Inhalte übersetzt, sie auch versteht.",
  },
  {
    title: "Terminologie und Glossare",
    body: "Wir erstellen und pflegen Kundenglossare und Übersetzungsspeicher, damit die Terminologie einheitlich bleibt und mit jedem Projekt besser wird.",
  },
  {
    title: "Linguistische Qualitätssicherung (LQA)",
    body: "Bei Software, Apps und Spielen führen wir LQA an echten Versionen durch und finden abgeschnittene Texte, Überlappungen sowie Kontext- und Formatierungsfehler vor der Veröffentlichung.",
  },
  {
    title: "MTPE – ausgerichtet an ISO 18587",
    body: "Wo maschinelle Übersetzung sinnvoll ist, folgt unsere Nachbearbeitung einem an ISO 18587 ausgerichteten Ablauf: Qualifizierte Fachleute bringen die maschinelle Übersetzung mit anschließender Nachbearbeitung (MTPE) auf das vereinbarte Qualitätsniveau.",
  },
  {
    title: "Dokumentierte Qualitätsberichte",
    body: "Jedes Programm enthält klare Berichte, damit Sie nachvollziehen können, wie die Qualität geprüft wurde – hilfreich für Prüfungen und Beschaffung.",
  },
];

// /de/quality — German Quality Process page.
export default function QualityDe() {
  const url = `${site.url}/de/quality`;
  return (
    <>
      <JsonLd
        data={deLd([
          webPageSchema({ name: "Qualitätsprozess – GlobalAnnotate", description: DE_META.description, url }),
          breadcrumbSchema([
            { name: DE_HOME, url: `${site.url}/de` },
            { name: "Qualität", url },
          ]),
        ])}
      />

      <PageHero
        eyebrow="Qualität"
        title="Qualitätssicherung bei Übersetzungen: ein an ISO 17100 ausgerichteter Prozess in jedem Projekt."
        subtitle="Übersetzung durch Muttersprachler, unabhängige Revision und Endkontrolle – gestützt auf die Auswahl der Sprachexperten, passende Fachgebiete, Terminologiemanagement und LQA."
        breadcrumbs={[
          { name: DE_HOME, href: "/" },
          { name: "Qualität", href: "/quality" },
        ]}
        ctas={[
          { label: "Beratung anfragen", href: "/contact" },
          { label: "Unsere Leistungen ansehen", href: "/services", variant: "ghost" },
        ]}
        slides={deSlides(servicesHeroSlides)}
      />

      <Section className="pt-20 md:pt-28">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">Übersetzen · Revidieren · Prüfen</p>
          <h2 className="section-h2 mt-4 text-ink-900">Der Kern von ISO 17100: immer ein zweiter Sprachexperte.</h2>
          <p className="mt-4 text-lg text-ink-600 leading-relaxed">
            Jede Standardübersetzung durchläuft drei Stufen. Die unabhängige Revision – ein zweiter qualifizierter Sprachexperte prüft den ersten – unterscheidet einen professionellen Prozess von einem einzigen Durchgang.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {TEP.map((t, i) => (
            <Reveal key={t.step} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-ink-200 bg-white p-7">
                <p className="font-display text-3xl font-semibold text-brand-700">{t.step}</p>
                <h3 className="mt-3 text-lg md:text-xl font-semibold tracking-tight text-ink-900">{t.title}</h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">Was hinter dem Prozess steht</p>
          <h2 className="section-h2 mt-4 text-ink-900">Qualität ist ein System, kein einzelner Schritt.</h2>
        </div>
        <div className="mt-12 grid gap-8 md:gap-10 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.04}>
              <div className="border-l-2 border-brand-200 pl-6 py-1">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink-900">{p.title}</h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-10">
          <div className="flex items-start gap-4">
            <span
              aria-hidden
              className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"
            >
              <Check className="h-4 w-4" strokeWidth={2.4} />
            </span>
            <div className="max-w-3xl">
              <h2 className="section-h3 text-ink-900">„Ausgerichtet“, ehrlich formuliert</h2>
              <p className="mt-2 text-ink-600 leading-relaxed">
                Wir betreiben ein{" "}<strong>an ISO 17100 ausgerichtetes</strong>{" "}Qualitätsmanagementsystem und einen{" "}<strong>an ISO 18587 ausgerichteten</strong>{" "}Ablauf für maschinelle Übersetzung mit anschließender Nachbearbeitung (MTPE). Das bedeutet, dass unser Prozess diesen Normen folgt. Eine Zertifizierung nach ISO 17100 oder ISO 18587 besitzen wir derzeit nicht, und wir bezeichnen uns auch nie als zertifiziert. Wenn eine Zertifizierung Teil Ihrer Beschaffungsvorgaben ist, sprechen Sie uns auf unseren Fahrplan an.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-12 text-center">
          <h2 className="section-h2 text-ink-900">Benötigen Sie unseren Qualitätsprozess schriftlich?</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-ink-600 leading-relaxed">
            Gern stellen wir Ihnen unsere Methodik zur Qualitätssicherung, Musterberichte und Referenzen für Ihre Bewertung zur Verfügung.
          </p>
          <Link href="/contact" className="btn-primary mt-7 inline-flex">
            Angebot anfordern <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section className="pb-24 pt-0">
        <CTABand />
      </Section>
    </>
  );
}
