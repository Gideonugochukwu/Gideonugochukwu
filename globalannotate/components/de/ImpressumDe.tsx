import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { site } from "@/lib/site";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { deLd, DE_HOME } from "@/lib/de";

export const DE_META = {
  title: "Impressum | GlobalAnnotate",
  description:
    "Impressum von GlobalAnnotate: Anbieterkennzeichnung, vertretungsberechtigte Person, Anschrift, Kontaktdaten und Verantwortlicher für den Inhalt.",
};

// Bracketed values are placeholders the operator must fill in before launch.
const PLACEHOLDER = "rounded bg-amber-100 px-1.5 py-0.5 font-medium text-amber-900";

// /de/impressum — German legal notice (Anbieterkennzeichnung). Exists only
// on /de; the other locales 404.
export default function ImpressumDe() {
  const url = `${site.url}/de/impressum`;
  return (
    <>
      <JsonLd
        data={deLd([
          webPageSchema({ name: "Impressum – GlobalAnnotate", description: DE_META.description, url }),
          breadcrumbSchema([
            { name: DE_HOME, url: `${site.url}/de` },
            { name: "Impressum", url },
          ]),
        ])}
      />
      <Section className="pt-16 pb-24">
        <div className="max-w-3xl">
          <Breadcrumbs
            items={[
              { name: DE_HOME, href: "/" },
              { name: "Impressum", href: "/impressum" },
            ]}
            tone="light"
            className="mb-6"
          />
          <span className="badge">Rechtliches</span>
          <h1 className="page-h1 mt-5">Impressum</h1>

          <div
            role="note"
            className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm font-medium text-amber-900"
          >
            Hinweis: Dieses Impressum enthält Platzhalter in eckigen Klammern. Vor der Veröffentlichung
            müssen die Angaben vervollständigt und von einem in Deutschland zugelassenen Rechtsanwalt
            geprüft werden.
          </div>

          <div className="prose-section">
            <h2>Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)</h2>
            <p>
              {site.name}
              <br />
              <span className={PLACEHOLDER}>[Rechtsform des Unternehmens]</span>
              <br />
              <span className={PLACEHOLDER}>[Straße und Hausnummer]</span>
              <br />
              <span className={PLACEHOLDER}>[Postleitzahl und Ort]</span>
              <br />
              <span className={PLACEHOLDER}>[Land]</span>
            </p>

            <h2>Vertreten durch</h2>
            <p>
              <span className={PLACEHOLDER}>[Vor- und Nachname der vertretungsberechtigten Person]</span>
              <br />
              <span className={PLACEHOLDER}>[Funktion, zum Beispiel Inhaber oder Geschäftsführer]</span>
            </p>

            <h2>Kontakt</h2>
            <p>
              Telefon: <span className={PLACEHOLDER}>[Telefonnummer]</span>
              <br />
              E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
              <br />
              Kontaktformular: <Link href="/contact">Kontakt aufnehmen</Link>
            </p>

            <h2>Registereintrag</h2>
            <p>
              Bei SMEDAN (Nigeria) registriert.
              <br />
              Registrierungsnummer: <span className={PLACEHOLDER}>[Registrierungsnummer]</span>
              <br />
              Registerbehörde: <span className={PLACEHOLDER}>[Bezeichnung der Registerbehörde]</span>
            </p>

            <h2>Umsatzsteuer</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer beziehungsweise Steuernummer:{" "}
              <span className={PLACEHOLDER}>[Steuernummer, sofern vorhanden]</span>
            </p>

            <h2>Verantwortlich für den Inhalt</h2>
            <p>
              <span className={PLACEHOLDER}>[Vor- und Nachname]</span>
              <br />
              <span className={PLACEHOLDER}>[Anschrift wie oben]</span>
            </p>

            <h2>Verbraucherstreitbeilegung</h2>
            <p>
              Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.{" "}
              <span className={PLACEHOLDER}>[Angabe vor der Veröffentlichung rechtlich prüfen lassen]</span>
            </p>

            <h2>Haftung für Inhalte</h2>
            <p>
              Wir erstellen die Inhalte dieser Website mit größtmöglicher Sorgfalt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine Gewähr. Verpflichtungen
              zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen
              bleiben hiervon unberührt.
            </p>

            <h2>Haftung für Verweise</h2>
            <p>
              Unsere Website enthält Verweise auf Websites Dritter, auf deren Inhalte wir keinen Einfluss
              haben. Für diese fremden Inhalte ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
              Bei Bekanntwerden von Rechtsverletzungen entfernen wir entsprechende Verweise umgehend.
            </p>

            <h2>Urheberrecht</h2>
            <p>
              Die Inhalte und Werke auf dieser Website unterliegen dem Urheberrecht. Vervielfältigung,
              Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts
              bedürfen der schriftlichen Zustimmung von {site.name}.
            </p>

            <p>
              Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer{" "}
              <Link href="/privacy">Datenschutzerklärung</Link>.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
