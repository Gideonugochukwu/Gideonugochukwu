import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import LegalNotice from "./LegalNotice";
import { site } from "@/lib/site";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { deLd, DE_HOME } from "@/lib/de";

const PRIVACY_EMAIL = "privacy@globalannotate.com";
const LAST_UPDATED = "18. Oktober 2026";

export const DE_META = {
  title: "Datenschutzerklärung | GlobalAnnotate",
  description:
    "Datenschutzerklärung: Wie GlobalAnnotate personenbezogene Daten und Kundeninhalte erhebt, nutzt und schützt – nach DSGVO und weiteren Gesetzen.",
};

// /de/privacy — full German translation of the Privacy Policy.
export default function PrivacyDe() {
  const url = `${site.url}/de/privacy`;
  return (
    <>
      <JsonLd
        data={deLd([
          webPageSchema({ name: "Datenschutzerklärung – GlobalAnnotate", description: DE_META.description, url }),
          breadcrumbSchema([
            { name: DE_HOME, url: `${site.url}/de` },
            { name: "Datenschutz", url },
          ]),
        ])}
      />
      <Section className="pt-16 pb-24">
        <div className="max-w-3xl">
          <Breadcrumbs
            items={[
              { name: DE_HOME, href: "/" },
              { name: "Datenschutz", href: "/privacy" },
            ]}
            tone="light"
            className="mb-6"
          />
          <span className="badge">Rechtliches</span>
          <h1 className="page-h1 mt-5">Datenschutzerklärung</h1>
          <LegalNotice />
          <p className="mt-4 text-sm text-ink-500">Zuletzt aktualisiert:{" "}{LAST_UPDATED}</p>

          <div className="prose-section">
            <h2>1. Wer wir sind</h2>
            <p>
              {site.name}{" "}(„{site.shortName}“, „wir“, „uns“, „unser“) ist ein Unternehmen für Sprachdienstleistungen und KI-Daten und bietet Übersetzung, Lokalisierung, maschinelle Übersetzung mit anschließender Nachbearbeitung (MTPE), Untertitelung, Transkription, linguistische Qualitätssicherung (LQA), Spielelokalisierung, KI-Datenannotation und verstärkendes Lernen aus menschlichem Feedback (RLHF) in über 100 Sprachen an. Wir betreiben die Website{" "}
              <a href={site.url}>{site.domain}</a>
              {" "}und erbringen unsere Leistungen für Kunden weltweit über ein internes Team und ein geprüftes Netzwerk von Sprachexperten in über 30 Ländern.
            </p>
            <p>
              Diese Erklärung beschreibt, welche personenbezogenen Daten wir erheben, warum wir dies tun, wie wir sie schützen und welche Rechte Sie haben. Sie gilt für unsere Website, unsere Kontakt- und Angebotsformulare, Bewerbungen von Freiberuflern und Sprachexperten sowie für personenbezogene Daten in Kundeninhalten, die wir im Auftrag unserer Kunden verarbeiten.
            </p>
            <p>
              <strong>Verantwortlicher:{" "}</strong>
              {site.name}{" "}– eingetragene Anschrift noch zu bestätigen.{" "}<em>[Eingetragene Anschrift – noch zu ergänzen]</em>
            </p>
            <p>
              <strong>Kontakt für Datenschutzanfragen:{" "}</strong>
              <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>
            </p>

            <h2>2. Welche Daten wir erheben</h2>
            <p>Wir erheben folgende Kategorien von Daten:</p>
            <ul>
              <li>
                <strong>Besucher der Website.</strong>{" "}Zusammengefasste, weitgehend anonymisierte Nutzungsdaten (aufgerufene Seiten, ungefähre Region, Geräte- und Browsertyp) sowie Cookie-Daten. Nicht notwendige Analyse-Cookies setzen wir erst nach Ihrer Einwilligung – siehe „Cookies“ weiter unten.
              </li>
              <li>
                <strong>Kontakt- und Angebotsformulare.</strong>{" "}Ihr Name, Ihre geschäftliche E-Mail-Adresse, Ihr Unternehmen (optional), Ihre Projektbeschreibung, Ihr Budget und Ihr Zeitrahmen, wenn Sie ein Angebot anfordern oder uns kontaktieren.
              </li>
              <li>
                <strong>Projektdateien und Inhalte von Kunden.</strong>{" "}Dokumente, Texte, Audio-, Video- und Bilddateien sowie sonstige Materialien, die Kunden uns zur Übersetzung, Lokalisierung, Annotation oder Validierung übermitteln. Diese können personenbezogene Daten der Nutzer oder Beschäftigten des Kunden enthalten (bei manchen Aufträgen auch besondere Kategorien wie Gesundheitsdaten). Für diese Inhalte handeln wir in der Regel als{" "}<strong>Auftragsverarbeiter</strong>{" "}nach Weisung des Kunden.
              </li>
              <li>
                <strong>Bewerbungen von Freiberuflern und Sprachexperten.</strong>{" "}Name, Kontaktdaten, Land, Sprachpaare, Fachgebiete, Honorarsätze, Berufserfahrung, ein Link zu Lebenslauf oder Arbeitsproben sowie – bei beauftragten Sprachexperten – die für die Bezahlung erforderlichen Zahlungs- und Steuerdaten.
              </li>
              <li>
                <strong>Inhalte aus KI-Datenprojekten.</strong>{" "}Texte, Eingaben, Antworten, Bilder, Audiodateien oder sonstige Daten, die zur Annotation, Bewertung oder für verstärkendes Lernen aus menschlichem Feedback bereitgestellt werden und vom Kunden übermittelte personenbezogene Daten enthalten können.
              </li>
              <li>
                <strong>Eingereichte Bewertungen.</strong>{" "}Name, Unternehmen, Land, Bewertung und Bewertungstext, wenn Sie eine Bewertung abgeben.
              </li>
              <li>
                <strong>E-Mail-Korrespondenz.</strong>{" "}Der Inhalt der Nachrichten, die Sie uns senden.
              </li>
            </ul>

            <h2>3. Rechtsgrundlagen und Zwecke der Verarbeitung</h2>
            <p>Soweit die DSGVO, die britische DSGVO oder das nigerianische Datenschutzgesetz von 2023 anwendbar sind, stützen wir uns auf eine oder mehrere der folgenden Rechtsgrundlagen:</p>
            <ul>
              <li>
                <strong>Vertrag</strong>{" "}– zur Erstellung von Angeboten, zur Erbringung und Abrechnung von Leistungen und zur Pflege unserer Beziehung zu Kunden und Sprachexperten.
              </li>
              <li>
                <strong>Einwilligung</strong>{" "}– für nicht notwendige Cookies und optionale Marketingmitteilungen; Sie können Ihre Einwilligung jederzeit widerrufen.
              </li>
              <li>
                <strong>Berechtigte Interessen</strong>{" "}– zum Betrieb, zur Sicherung und Verbesserung unserer Website und Leistungen, zur Betrugsprävention und zur Beantwortung von Anfragen, jeweils abgewogen gegen Ihre Rechte.
              </li>
              <li>
                <strong>Rechtliche Verpflichtung</strong>{" "}– zur Erfüllung steuerlicher, buchhalterischer und sonstiger gesetzlicher Pflichten.
              </li>
            </ul>
            <p>
              <strong>Kundeninhalte nutzen wir ausschließlich für den Auftrag, für den sie bereitgestellt wurden.</strong>
              {" "}Wir verwenden Kundeninhalte oder darin enthaltene Daten nicht zum Training eigener KI-Modelle oder der Modelle Dritter, sofern der Kunde dem nicht schriftlich zugestimmt hat.
            </p>

            <h2>4. Vertraulichkeit und Sicherheit</h2>
            <ul>
              <li>Jedes interne Teammitglied und jeder Sprachexperte im Netzwerk unterzeichnet eine Geheimhaltungsvereinbarung, bevor er Kundenmaterial erhält.</li>
              <li>Der Zugriff auf Projektdateien folgt dem Prinzip der minimalen Rechte – nur die dem Projekt zugeordneten Sprachexperten und die Projektleitung haben Zugriff.</li>
              <li>Dateien werden über verschlüsselte Verbindungen (TLS) übertragen und gespeichert; der Zugang zu unseren Systemen ist durch Authentifizierung geschützt.</li>
              <li>
                <strong>Aufbewahrung und Löschung von Projektdateien:</strong>
                {" "}Wir bewahren Projektdateien von Kunden nur so lange auf, wie es für die Erbringung und Betreuung des Auftrags erforderlich ist. Sofern Vertrag, Leistungsbeschreibung oder gesetzliche Pflichten keinen anderen Zeitraum vorsehen, werden Projektdateien nach Abschluss des Projekts gelöscht oder anonymisiert.
              </li>
              <li>
                <strong>Sensible Daten</strong>{" "}– medizinische und sonstige Gesundheitsinformationen, juristisches Material und personenbezogene Kennungen – werden an geprüfte Fachleute geleitet, unterliegen dem jeweiligen Vertrag und den Geheimhaltungsvereinbarungen sowie strengeren Zugriffs- und Aufbewahrungsregeln. Einzelheiten finden Sie auf unserer Seite{" "}
                <Link href="/security">Sicherheit und Vertraulichkeit</Link>
                .
              </li>
            </ul>

            <h2>5. Unterauftragsverarbeiter und internationale Datenübermittlungen</h2>
            <p>
              Wir setzen eine kleine Zahl geprüfter Unterauftragsverarbeiter ein, um unser Geschäft zu betreiben und Leistungen zu erbringen – etwa Anbieter für Serverbetrieb, Formularzustellung, E-Mail und sichere Dateiübertragung –, und unser Netzwerk von Sprachexperten ist auf viele Länder verteilt. Personenbezogene Daten können daher außerhalb Ihres Wohnsitzlandes übermittelt und verarbeitet werden, auch außerhalb des Europäischen Wirtschaftsraums, des Vereinigten Königreichs oder Nigerias.
            </p>
            <p>
              Bei solchen Übermittlungen stützen wir uns auf geeignete Garantien, darunter die Standardvertragsklauseln der Europäischen Kommission (und, soweit relevant, den britischen Zusatz für internationale Datenübermittlungen) sowie Vertraulichkeits- und Datenschutzbestimmungen in unseren Verträgen mit Unterauftragsverarbeitern und Sprachexperten. Eine aktuelle Liste der Unterauftragsverarbeiter erhalten Kunden auf Anfrage unter{" "}
              <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>
              .
            </p>

            <h2>6. Ihre Rechte</h2>
            <p>
              Je nach Wohnort haben Sie das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten, das Recht auf Widerspruch und Datenübertragbarkeit sowie das Recht, Ihre Einwilligung zu widerrufen. Nach der DSGVO, der britischen DSGVO und dem nigerianischen Datenschutzgesetz von 2023 haben Sie zudem das Recht, sich bei Ihrer Aufsichtsbehörde zu beschweren (in Nigeria bei der nigerianischen Datenschutzkommission).
            </p>
            <p>
              <strong>Einwohner Kaliforniens (CCPA/CPRA):</strong>
              {" "}Sie haben das Recht zu erfahren, welche personenbezogenen Daten wir erheben, deren Löschung und die Berichtigung unrichtiger Angaben zu verlangen und jedem „Verkauf“ oder jeder „Weitergabe“ personenbezogener Daten zu widersprechen. Wir verkaufen oder teilen keine personenbezogenen Daten im Sinne des CCPA und benachteiligen Sie nicht, wenn Sie Ihre Rechte ausüben.
            </p>
            <p>
              Um ein Recht auszuüben, schreiben Sie an{" "}
              <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>
              . Bei personenbezogenen Daten, die wir als Auftragsverarbeiter im Auftrag eines Kunden verarbeiten, leiten wir Ihr Anliegen an den Kunden (den Verantwortlichen) weiter und unterstützen ihn bei der Beantwortung. Wir antworten innerhalb der gesetzlichen Fristen.
            </p>

            <h2>7. Cookies</h2>
            <p>
              Wir setzen nur eine minimale Anzahl von Cookies und ähnlichen Technologien ein. Technisch notwendige Cookies (für grundlegende Funktionen der Website sowie Ihre Einstellungen zu Darstellung und Einwilligung) sind stets aktiv. Nicht notwendige Cookies, einschließlich Analyse-Cookies, setzen wir erst, nachdem Sie über unser Cookie-Banner eingewilligt haben. Sie können Ihre Auswahl jederzeit über die{" "}
              <strong>Cookie-Einstellungen</strong>
              {" "}im Fußbereich ändern. Derzeit laden wir ohne Einwilligung keine Analyse- oder Werbe-Cookies von Drittanbietern.
            </p>

            <h2>8. Daten von Kindern</h2>
            <p>
              Unsere Website und Leistungen richten sich an Unternehmen und Fachleute, nicht an Kinder. Wir erheben wissentlich keine personenbezogenen Daten von Personen unter 18 Jahren. Wenn Sie annehmen, dass ein Minderjähriger uns personenbezogene Daten übermittelt hat, kontaktieren Sie uns, und wir löschen sie.
            </p>

            <h2>9. Änderungen dieser Erklärung</h2>
            <p>Wir können diese Erklärung von Zeit zu Zeit aktualisieren. Wesentliche Änderungen veröffentlichen wir auf dieser Seite mit einem neuen Datum unter „Zuletzt aktualisiert“.</p>

            <h2>10. Kontakt</h2>
            <p>
              Fragen, Anliegen oder Beschwerden zum Datenschutz? Schreiben Sie an{" "}
              <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>
              . Für allgemeine Anfragen nutzen Sie{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>
              {" "}oder unsere{" "}
              <Link href="/contact">Kontaktseite</Link>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
