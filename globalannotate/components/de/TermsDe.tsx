import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import LegalNotice from "./LegalNotice";
import { site } from "@/lib/site";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { deLd, DE_HOME } from "@/lib/de";

const LAST_UPDATED = "18. Oktober 2026";

export const DE_META = {
  title: "Nutzungsbedingungen | GlobalAnnotate",
  description:
    "Nutzungsbedingungen der Website von GlobalAnnotate und allgemeine Leistungsbedingungen. Unterzeichnete Verträge haben im Zweifel stets Vorrang.",
};

// /de/terms — full German translation of the Terms of Service.
export default function TermsDe() {
  const url = `${site.url}/de/terms`;
  return (
    <>
      <JsonLd
        data={deLd([
          webPageSchema({ name: "Nutzungsbedingungen – GlobalAnnotate", description: DE_META.description, url }),
          breadcrumbSchema([
            { name: DE_HOME, url: `${site.url}/de` },
            { name: "Nutzungsbedingungen", url },
          ]),
        ])}
      />
      <Section className="pt-16 pb-24">
        <div className="max-w-3xl">
          <Breadcrumbs
            items={[
              { name: DE_HOME, href: "/" },
              { name: "Nutzungsbedingungen", href: "/terms" },
            ]}
            tone="light"
            className="mb-6"
          />
          <span className="badge">Rechtliches</span>
          <h1 className="page-h1 mt-5">Nutzungsbedingungen</h1>
          <LegalNotice />
          <p className="mt-4 text-sm text-ink-500">Zuletzt aktualisiert:{" "}{LAST_UPDATED}</p>

          <div className="prose-section">
            <p>
              Diese Bedingungen regeln Ihre Nutzung der Website von {site.name} unter{" "}
              <a href={site.url}>{site.domain}</a>
              {" "}(die „Website“) und legen unsere allgemeinen Leistungsbedingungen fest. Mit der Nutzung der Website oder der Beauftragung unserer Leistungen erklären Sie sich mit diesen Bedingungen einverstanden.
            </p>

            <h2>1. Vorrang unterzeichneter Verträge</h2>
            <p>
              Haben Sie mit uns eine gesonderte Vereinbarung unterzeichnet – etwa einen Dienstleistungsrahmenvertrag, eine Leistungsbeschreibung, einen Auftragsverarbeitungsvertrag oder eine Geheimhaltungsvereinbarung –,{" "}
              <strong>hat diese unterzeichnete Vereinbarung Vorrang</strong>
              {" "}vor diesen Bedingungen, soweit sie einander widersprechen. Diese Bedingungen gelten, wo keine unterzeichnete Vereinbarung den jeweiligen Punkt regelt.
            </p>

            <h2>2. Nutzung der Website</h2>
            <p>
              Sie dürfen die Website nur zu rechtmäßigen Zwecken nutzen. Sie verpflichten sich, sie nicht zu missbrauchen, ihren Betrieb oder ihre Sicherheit nicht zu beeinträchtigen, keinen unbefugten Zugriff zu versuchen, sie nicht in großem Umfang automatisiert auszulesen und sie nicht zur Verletzung der Rechte anderer zu nutzen.
            </p>

            <h2>3. Geistiges Eigentum</h2>
            <p>
              Die Website und ihre Inhalte – Texte, Gestaltung, Grafiken, Logos sowie die Kennzeichen „GlobalAnnotate“ und „MarketReady™“ – stehen im Eigentum von {site.name} oder seinen Lizenzgebern und sind durch Gesetze zum Schutz des geistigen Eigentums geschützt. Ohne unsere Zustimmung dürfen Sie die Website weder kopieren noch vervielfältigen oder abgeleitete Werke daraus erstellen. Die Rechte an Arbeitsergebnissen, die wir für Kunden erstellen, regelt Abschnitt 6.
            </p>

            <h2>4. Zulässige Nutzung</h2>
            <p>Sie verpflichten sich, keine rechtswidrigen Inhalte, Schadsoftware oder Inhalte einzureichen, zu deren Weitergabe Sie nicht berechtigt sind, und unsere Leistungen nicht zur Erstellung rechtswidriger oder rechtsverletzender Materialien zu nutzen.</p>

            <h2>5. Angebote, Bestellungen und Leistungsbeschreibungen</h2>
            <p>
              Unsere Angebote sind Schätzungen auf Grundlage des von Ihnen beschriebenen Umfangs, Volumens, der Sprachpaare und der Lieferzeit und gelten für den angegebenen Zeitraum (ohne Angabe 30 Tage). Die Arbeit beginnt, sobald Sie ein Angebot annehmen, eine Bestellung aufgeben oder eine Leistungsbeschreibung unterzeichnen. Für den jeweiligen Auftrag gelten Umfang, Preise und Zeitplan aus dem angenommenen Angebot, der Bestellung oder der Leistungsbeschreibung.
            </p>

            <h2>6. Zahlung, Korrekturen und Rechte</h2>
            <ul>
              <li>
                <strong>Zahlungsbedingungen:</strong>
                {" "}Rechnungen sind innerhalb von{" "}
                <em>[Zahlungsziel in Tagen – noch zu ergänzen]</em>
                {" "}ab Rechnungsdatum in{" "}
                <em>[Währung – noch zu ergänzen]</em>
                {" "}zu begleichen, sofern eine unterzeichnete Vereinbarung oder Leistungsbeschreibung nichts anderes vorsieht. Von Neukunden oder bei großen Programmen können wir eine Anzahlung verlangen.
              </li>
              <li>
                <strong>Korrekturen:</strong>
                {" "}Jedes Arbeitsergebnis umfasst angemessene Korrekturen, um Arbeiten zu berichtigen, die nicht dem vereinbarten Auftrag oder der Spezifikation entsprechen.
              </li>
              <li>
                <strong>Frist für Qualitätsbeanstandungen:</strong>
                {" "}Bitte melden Sie Qualitätsbedenken innerhalb von{" "}
                <em>[Beanstandungsfrist – noch zu ergänzen, z. B. 14 Tage]</em>
                {" "}nach Lieferung, damit wir sie prüfen und berechtigte Mängel kostenfrei beheben können.
              </li>
              <li>
                <strong>Übertragung der Rechte:</strong>
                {" "}Mit vollständiger Zahlung der Vergütung gehen sämtliche Rechte des geistigen Eigentums an den endgültigen übersetzten oder lokalisierten Arbeitsergebnissen auf Sie über – ausgenommen unsere bereits bestehenden Materialien und Werkzeuge sowie Übersetzungsspeicher oder Glossare, die wir zur Unterstützung künftiger Arbeiten behalten (und Ihnen zur Nutzung lizenzieren).
              </li>
            </ul>

            <h2>7. Verantwortung des Kunden für die endgültige Verwendung</h2>
            <p>
              Wir erbringen professionelle Sprach- und Datendienstleistungen.{" "}
              <strong>Die abschließende Prüfung, Freigabe sowie die regulatorische und rechtliche Verwendung übersetzter oder lokalisierter Inhalte in Ihrem Markt liegen jedoch in Ihrer Verantwortung</strong>
              {" "}– einschließlich der Einhaltung medizinischer, regulatorischer, rechtlicher, kennzeichnungs- und werberechtlicher Vorgaben, die für Sie gelten. Wo erforderlich, sollten Sie vor Veröffentlichung oder Einreichung eine rechtliche oder regulatorische Prüfung vor Ort veranlassen.
            </p>

            <h2>8. Vertraulichkeit</h2>
            <p>
              Wir behandeln Kundenmaterial vertraulich, beschränken den Zugriff auf das Notwendige und verpflichten unser Team und unsere Sprachexperten durch Geheimhaltungsvereinbarungen. Siehe unsere Seite{" "}
              <Link href="/security">Sicherheit und Vertraulichkeit</Link>
              . Jede Partei schützt die vertraulichen Informationen der anderen und nutzt sie ausschließlich zur Durchführung des Auftrags.
            </p>

            <h2>9. Haftungsbeschränkung</h2>
            <p>
              Soweit gesetzlich zulässig, haftet {site.name} nicht für indirekte, beiläufige, besondere oder Folgeschäden oder für entgangenen Gewinn, Umsatz oder Datenverlust. Unsere Gesamthaftung aus oder im Zusammenhang mit einem Auftrag ist auf die Vergütung für die konkreten Leistungen begrenzt, die den Anspruch begründen. Diese Bedingungen beschränken keine Haftung, die gesetzlich nicht beschränkt werden kann.
            </p>

            <h2>10. Gewährleistung und Haftungsausschluss</h2>
            <p>Wir erbringen unsere Leistungen mit angemessener Sachkunde und Sorgfalt gemäß unserem Qualitätsprozess. Soweit nicht ausdrücklich angegeben, werden Website und Leistungen „wie besehen“ und ohne weitere Gewährleistung jeglicher Art bereitgestellt.</p>

            <h2>11. Höhere Gewalt</h2>
            <p>Keine Partei haftet für Verzögerungen oder Nichterfüllung infolge von Ereignissen außerhalb ihrer zumutbaren Kontrolle, darunter Naturkatastrophen, Krieg, Unruhen, Streiks, Ausfälle von Versorgungs- oder Telekommunikationsdiensten und behördliche Maßnahmen.</p>

            <h2>12. Kündigung</h2>
            <p>
              Jede Partei kann einen Auftrag gemäß der anwendbaren Leistungsbeschreibung oder Vereinbarung kündigen oder, wenn keine solche besteht, mit angemessener schriftlicher Frist. Sie bleiben zur Zahlung der bis zum Wirksamwerden der Kündigung erbrachten Leistungen und nicht stornierbaren Verpflichtungen verpflichtet. Bestimmungen, die ihrer Natur nach fortgelten sollen (einschließlich Vertraulichkeit, geistiges Eigentum und Haftungsbeschränkung), bleiben nach der Kündigung wirksam.
            </p>

            <h2>13. Freiberufler und Lieferanten</h2>
            <p>
              Wenn Sie sich über unser{" "}
              <Link href="/freelancers">Netzwerk für Sprachexperten</Link>
              {" "}oder unsere Lieferantenaufnahme bewerben, bestätigen Sie, dass Ihre Angaben zutreffen und Sie berechtigt sind, eingereichte Arbeitsproben oder Referenzen zu teilen. Beauftragte Sprachexperten und Lieferanten arbeiten auf Grundlage gesonderter Verträge und Geheimhaltungsvereinbarungen, die Vertraulichkeit, Datenverarbeitung, Rechteübertragung und Vergütung regeln; diese Verträge haben für das jeweilige Verhältnis Vorrang vor diesen Bedingungen.
            </p>

            <h2>14. Anwendbares Recht</h2>
            <p>
              Diese Bedingungen unterliegen dem Recht der Bundesrepublik Nigeria; zuständig sind die Gerichte Nigerias, sofern eine unterzeichnete Vereinbarung nichts anderes vorsieht.{" "}
              <em>[Anwendbares Recht – noch zu ergänzen; eine Gesellschaft in der EU (Estland) ist geplant, und diese Klausel wird entsprechend angepasst.]</em>
            </p>

            <h2>15. Änderungen dieser Bedingungen</h2>
            <p>Wir können diese Bedingungen von Zeit zu Zeit aktualisieren. Für Ihre Nutzung der Website gilt die auf dieser Seite veröffentlichte Fassung mit dem aktuellen Datum unter „Zuletzt aktualisiert“.</p>

            <h2>16. Kontakt</h2>
            <p>
              Fragen zu diesen Bedingungen? Schreiben Sie an{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>
              {" "}oder nutzen Sie unsere{" "}
              <Link href="/contact">Kontaktseite</Link>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
