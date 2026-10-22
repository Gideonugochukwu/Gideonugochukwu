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
import { ArrowRight, Check, Lock, FileCheck, ShieldCheck, Trash2 } from "lucide-react";

const SECURITY_EMAIL = "security@globalannotate.com";

export const DE_META = {
  title: "Vertrauliche Übersetzung | GlobalAnnotate",
  description:
    "Vertrauliche Übersetzung bei GlobalAnnotate: Geheimhaltung mit jedem Sprachexperten, minimale Zugriffsrechte, Verschlüsselung und klare Löschfristen.",
};

const DESCRIPTION = DE_META.description;

const CONTROLS = [
  {
    icon: FileCheck,
    title: "Geheimhaltungsvereinbarungen mit allen",
    body: "Jedes interne Teammitglied und jeder Sprachexperte im Netzwerk unterzeichnet eine Geheimhaltungsvereinbarung, bevor er Kundenmaterial erhält. Ohne Ausnahme.",
  },
  {
    icon: Lock,
    title: "Minimale Zugriffsrechte",
    body: "Nur die Projektleitung und die dem Projekt zugeordneten Sprachexperten können auf die Dateien zugreifen. Zugriff wird pro Projekt erteilt und mit Projektabschluss entzogen.",
  },
  {
    icon: ShieldCheck,
    title: "Verschlüsselte Übertragung",
    body: "Dateien werden über verschlüsselte Verbindungen (TLS) ausgetauscht und gespeichert. Sensible Aufträge nutzen sichere, zugriffsgeschützte Übertragungswege statt offener E-Mail-Anhänge.",
  },
  {
    icon: Trash2,
    title: "Aufbewahrung und Löschung",
    body: "Projektdateien werden nur so lange aufbewahrt, wie es für Lieferung und Nachbetreuung nötig ist. Sofern der Vertrag nichts anderes vorsieht, werden sie nach Projektabschluss gelöscht oder anonymisiert.",
  },
];

const WORKFLOW = [
  {
    step: "01",
    title: "Geheimhaltung und Projektumfang",
    body: "Wir unterzeichnen Ihre Geheimhaltungsvereinbarung (oder stellen unsere bereit), klären den Umfang und legen Datensensibilität, Zugriffsbedarf und regulatorische Vorgaben vorab fest.",
  },
  {
    step: "02",
    title: "Sichere Annahme",
    body: "Dateien gehen über einen verschlüsselten, zugriffsgeschützten Kanal ein und landen in einem Projektbereich, den nur das zugeordnete Team sieht.",
  },
  {
    step: "03",
    title: "Zugriff nur bei sachlicher Notwendigkeit",
    body: "Geprüfte, zur Geheimhaltung verpflichtete Sprachexperten und Prüfer arbeiten mit minimalen Zugriffsrechten. Sensibles Material geht an Fachleute des jeweiligen Gebiets.",
  },
  {
    step: "04",
    title: "Übergabe und Löschung",
    body: "Wir liefern über den vereinbarten sicheren Kanal und löschen oder anonymisieren die Projektdateien anschließend gemäß Vertrag und Aufbewahrungsrichtlinie.",
  },
];

const SENSITIVE = [
  {
    title: "Medizin und Gesundheitsdaten",
    body: "Klinische Unterlagen und Patientenmaterial bearbeiten Fachleute nach den Vertraulichkeits- und Datenschutzbestimmungen des Auftrags, mit strengeren Zugriffs- und Aufbewahrungsregeln. Wir unterstützen Auftragsverarbeitungsverträge unserer Kunden.",
  },
  {
    title: "Personenbezogene Daten",
    body: "Personenbezogene Daten verarbeiten wir als Auftragsverarbeiter nach Weisung des Kunden, geschützt durch Geheimhaltungsvereinbarungen, minimale Zugriffsrechte und klare Aufbewahrungsfristen – siehe unsere Datenschutzerklärung.",
  },
  {
    title: "Recht und regulierte Dokumente",
    body: "Verträge, Schriftsätze und regulierte Dokumente gehen an fachkundige Sprachexperten und werden vertraulich behandelt; beglaubigte Übersetzungen sind auf Anfrage möglich.",
  },
];

// /de/security — German Security & Confidentiality page.
export default function SecurityDe() {
  const url = `${site.url}/de/security`;
  return (
    <>
      <JsonLd
        data={deLd([
          webPageSchema({ name: "Sicherheit und Vertraulichkeit – GlobalAnnotate", description: DESCRIPTION, url }),
          breadcrumbSchema([
            { name: DE_HOME, url: `${site.url}/de` },
            { name: "Sicherheit und Vertraulichkeit", url },
          ]),
        ])}
      />

      <PageHero
        eyebrow="Sicherheit und Vertraulichkeit"
        title="Vertraulichkeit bei Übersetzungen: Ihre vertraulichen Inhalte in sicheren Händen."
        subtitle="Geheimhaltungsvereinbarungen mit jedem Sprachexperten, minimale Zugriffsrechte, verschlüsselte Übertragung sowie klare Aufbewahrungs- und Löschfristen – mit besonderer Sorgfalt bei medizinischen, rechtlichen und personenbezogenen Daten."
        breadcrumbs={[
          { name: DE_HOME, href: "/" },
          { name: "Sicherheit und Vertraulichkeit", href: "/security" },
        ]}
        ctas={[
          { label: "Zu Sicherheitsfragen beraten lassen", href: "/contact" },
          { label: "Datenschutzerklärung lesen", href: "/privacy", variant: "ghost" },
        ]}
        slides={deSlides(servicesHeroSlides)}
      />

      <Section className="pt-20 md:pt-28">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">So schützen wir Ihre Arbeit</p>
          <h2 className="section-h2 mt-4 text-ink-900">Vertraulichkeit als fester Bestandteil des Ablaufs.</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {CONTROLS.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={(i % 2) * 0.05}>
                <div className="h-full rounded-2xl border border-ink-200 bg-white p-7">
                  <span
                    aria-hidden
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 text-brand-700"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 text-lg md:text-xl font-semibold tracking-tight text-ink-900">{c.title}</h3>
                  <p className="mt-2 text-ink-600 leading-relaxed">{c.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">Der Ablauf für vertrauliche Aufträge</p>
          <h2 className="section-h2 mt-4 text-ink-900">Von der Geheimhaltungsvereinbarung bis zur Löschung.</h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {WORKFLOW.map((w, i) => (
            <Reveal key={w.step} delay={(i % 4) * 0.05}>
              <div className="border-l-2 border-brand-200 pl-6 py-1">
                <p className="font-display text-2xl font-semibold text-brand-700">{w.step}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink-900">{w.title}</h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">Sensible Daten</p>
          <h2 className="section-h2 mt-4 text-ink-900">Medizinische, rechtliche und personenbezogene Daten.</h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {SENSITIVE.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-ink-200 bg-white p-7">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink-900">{s.title}</h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-card">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">Normen und Zertifizierungen</p>
            <h2 className="section-h2 mt-4 text-ink-900">Ehrlich, wo wir stehen.</h2>
            <p className="mt-4 text-ink-600 leading-relaxed">
              Wir betreiben ein an ISO 17100 ausgerichtetes Qualitätsmanagementsystem und wenden anerkannte Sicherheitspraktiken an. Was heute umgesetzt ist und was geplant ist, legen wir offen.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 self-start">
            <li className="rounded-xl border border-ink-200 bg-white p-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                <Check className="h-3 w-3" strokeWidth={2.4} /> Umgesetzt
              </span>
              <p className="mt-3 font-semibold text-ink-900">An ISO 17100 ausgerichtetes Qualitätsmanagement</p>
              <p className="mt-1 text-sm text-ink-600">Unser Qualitätsprozess folgt einem an ISO 17100 ausgerichteten Ablauf. Dies ist keine Zertifizierung.</p>
            </li>
            <li className="rounded-xl border border-ink-200 bg-white p-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                <Check className="h-3 w-3" strokeWidth={2.4} /> Umgesetzt
              </span>
              <p className="mt-3 font-semibold text-ink-900">Geheimhaltung und Zugriffskontrolle</p>
              <p className="mt-1 text-sm text-ink-600">Unterzeichnete Geheimhaltungsvereinbarungen, minimale Zugriffsrechte und verschlüsselte Übertragung bei jedem Auftrag.</p>
            </li>
            <li className="rounded-xl border border-ink-200 bg-white p-5">
              <span className="inline-flex items-center rounded-full border border-ink-200 px-2.5 py-1 text-xs font-medium text-ink-500">
                In Arbeit
              </span>
              <p className="mt-3 font-semibold text-ink-900">Prüfung nach SOC 2 Typ 1</p>
              <p className="mt-1 text-sm text-ink-600">Geplant. Wir arbeiten auf eine Prüfung nach SOC 2 Typ 1 hin; ein Testat liegt noch nicht vor.</p>
            </li>
            <li className="rounded-xl border border-ink-200 bg-white p-5">
              <span className="inline-flex items-center rounded-full border border-ink-200 px-2.5 py-1 text-xs font-medium text-ink-500">
                Geplant
              </span>
              <p className="mt-3 font-semibold text-ink-900">ISO 27001 / ISO 13485</p>
              <p className="mt-1 text-sm text-ink-600">Nicht zertifiziert. Auf unserem Fahrplan, während unsere Arbeit für Großunternehmen und Biowissenschaften wächst.</p>
            </li>
          </ul>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="section-h2 text-ink-900">Sicherheitsfragebögen und Lieferantenprüfung</h2>
              <p className="mt-3 text-lg text-ink-600 leading-relaxed">
                Sie bearbeiten eine Sicherheitsbewertung für Lieferanten oder benötigen Angaben zur Datenverarbeitung, unsere Geheimhaltungsvereinbarung oder einen Auftragsverarbeitungsvertrag? Schreiben Sie an{" "}
                <a
                  href={`mailto:${SECURITY_EMAIL}`}
                  className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
                >
                  {SECURITY_EMAIL}
                </a>
                {" "}– wir antworten umgehend.
              </p>
            </div>
            <Link href="/contact" className="btn-primary text-sm shrink-0">
              Kontakt aufnehmen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      <Section className="pb-24 pt-0">
        <CTABand />
      </Section>
    </>
  );
}
