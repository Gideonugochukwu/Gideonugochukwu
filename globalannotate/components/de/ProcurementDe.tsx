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
import { ArrowRight, Download, FileText } from "lucide-react";

export const DE_META = {
  title: "Übersetzungsdienstleister als Lieferant | GlobalAnnotate",
  description:
    "Übersetzungsdienstleister Nigeria als Lieferant: Aufnahme in Ihr Lieferantensystem, Registrierungen (UNGM, EU-PIC, SMEDAN) und Leistungsübersicht.",
};

const REGISTRATIONS = [
  { label: "UNGM-Lieferant", value: "1254285", note: "Registrierter Lieferant im Beschaffungsportal der Vereinten Nationen (UNGM)." },
  { label: "EU-Teilnehmer-Identifikationscode", value: "862808308", note: "Teilnehmer-Identifikationscode für Programme und Ausschreibungen der Europäischen Union." },
  {
    label: "Bei SMEDAN (Nigeria) registriert",
    value: "SUID-2318-4705-9712-3682",
    note: "Registriert bei der nigerianischen Behörde zur Förderung kleiner und mittlerer Unternehmen (SMEDAN).",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Erstkontakt und Geheimhaltung",
    body: "Schildern Sie uns Umfang und Anforderungen. Wir unterzeichnen Ihre Geheimhaltungsvereinbarung (oder stellen unsere bereit) und liefern die Unterlagen, die Ihre Beschaffung benötigt.",
  },
  {
    step: "02",
    title: "Lieferantenaufnahme",
    body: "Wir füllen Ihre Lieferantenregistrierung sowie Fragebögen zu Sicherheit und Qualität aus und stellen auf Anfrage Registrierungen, Referenzen und Versicherungsnachweise bereit.",
  },
  {
    step: "03",
    title: "Pilotprojekt oder Rahmenvertrag",
    body: "Wir vereinbaren ein Pilotprojekt oder einen Rahmenvertrag (Dienstleistungsrahmenvertrag mit Leistungsbeschreibung) mit klaren Preisen, Servicezeiten und einem festen Ansprechpartner.",
  },
  {
    step: "04",
    title: "Lieferung und Auswertung",
    body: "Wir liefern gemäß Leistungsbeschreibung mit dokumentierter Qualitätssicherung und besprechen Qualität, Lieferzeiten und Kosten regelmäßig mit Ihnen.",
  },
];

// /de/procurement — German "Working with us" page.
export default function ProcurementDe() {
  const url = `${site.url}/de/procurement`;
  return (
    <>
      <JsonLd
        data={deLd([
          webPageSchema({ name: "Zusammenarbeit – GlobalAnnotate", description: DE_META.description, url }),
          breadcrumbSchema([
            { name: DE_HOME, url: `${site.url}/de` },
            { name: "Zusammenarbeit", url },
          ]),
        ])}
      />

      <PageHero
        eyebrow="Beschaffung · Zusammenarbeit"
        title="Übersetzungsdienstleister Nigeria: unkompliziert als Lieferant aufzunehmen."
        subtitle="Registrierungen, Unterlagen und ein klarer Aufnahmeprozess für Einkäufer aus Unternehmen, Institutionen und der Entwicklungszusammenarbeit."
        breadcrumbs={[
          { name: DE_HOME, href: "/" },
          { name: "Zusammenarbeit", href: "/procurement" },
        ]}
        ctas={[
          { label: "Lieferantenunterlagen anfordern", href: "/contact" },
          { label: "Branchen ansehen", href: "/industries", variant: "ghost" },
        ]}
        slides={deSlides(servicesHeroSlides)}
      />

      <Section className="pt-20 md:pt-28">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">Registrierungen und Kennnummern</p>
          <h2 className="section-h2 mt-4 text-ink-900">Registriert und bereit für Ihre Beschaffung.</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REGISTRATIONS.map((r, i) => (
            <Reveal key={r.label} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-ink-200 bg-white p-7">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-700">{r.label}</p>
                <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink-900 break-words">
                  {r.value}
                </p>
                <p className="mt-3 text-sm text-ink-600 leading-relaxed">{r.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">So nehmen Sie uns auf</p>
          <h2 className="section-h2 mt-4 text-ink-900">Vom ersten Kontakt bis zum Rahmenvertrag.</h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.step} delay={(i % 4) * 0.05}>
              <div className="border-l-2 border-brand-200 pl-6 py-1">
                <p className="font-display text-2xl font-semibold text-brand-700">{s.step}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink-900">{s.title}</h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-brand-700">
                <FileText className="h-3.5 w-3.5" /> Leistungsübersicht
              </p>
              <h2 className="section-h2 mt-4 text-ink-900">Alles, was Ihre Beschaffung braucht.</h2>
              <p className="mt-3 text-lg text-ink-600 leading-relaxed">
                Unsere Leistungsübersicht umfasst Leistungen, Sprachen, Registrierungen, Qualitäts- und Sicherheitspraktiken sowie Referenzen. Die Lieferantenunterlagen ergänzen auf Anfrage unsere Geheimhaltungsvereinbarung, den Auftragsverarbeitungsvertrag und Versicherungsnachweise.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
              <Link href="/contact" className="btn-primary text-sm">
                <Download className="h-4 w-4" /> Leistungsübersicht anfordern
              </Link>
              <Link href="/contact" className="btn-secondary text-sm">
                Lieferantenunterlagen anfordern <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pb-24 pt-0">
        <CTABand />
      </Section>
    </>
  );
}
