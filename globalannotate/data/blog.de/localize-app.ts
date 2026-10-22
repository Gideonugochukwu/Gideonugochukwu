import type { BlogPostZh as BlogPostDe } from "../blog.zh/types";

export const localizeAppDe: BlogPostDe = {
  title: "So lokalisieren Sie Ihre Anwendung oder Website für über 100 Märkte",
  metaTitle: "Lokalisierung für über 100 Märkte",
  description:
    "Lokalisierung von Anwendungen und Websites für über 100 Märkte: Architektur, Arbeitsablauf, Qualitätssicherung und die typischen Stolperfallen.",
  tags: ["Lokalisierung", "Internationalisierung", "Produkt"],
  body: `
<p>„Wir übersetzen einfach die Texte“ ist der teuerste Satz bei internationalen Produkteinführungen. Echte Lokalisierung betrifft Ihren Code, Ihr Gestaltungssystem, Ihren Veröffentlichungsprozess und Ihre Qualitätssicherung. So gehen Teams vor, die tatsächlich in über 100 Märkten präsent sind.</p>

<h2>1. Zuerst die Architektur richtig aufsetzen</h2>
<p>Bevor auch nur ein Text übersetzt wird, muss Ihr Produkt andere Sprachen sicher darstellen können.</p>
<ul>
<li><strong>Lagern Sie jeden sichtbaren Text aus.</strong> Keine fest einprogrammierten Texte. Verwenden Sie ICU MessageFormat oder einen vergleichbaren Standard für Pluralformen und geschlechtsabhängige Formulierungen.</li>
<li><strong>Verwenden Sie durchgängig Unicode (UTF-8)</strong> – in Datenbank, Schnittstellen, Dateien und Kopfzeilen.</li>
<li><strong>Planen Sie Schreibrichtungen von rechts nach links ein.</strong> Arabisch, Hebräisch, Urdu und Persisch brauchen gespiegelte Layouts, nicht nur übersetzten Text.</li>
<li><strong>Setzen Sie Texte nicht aus Bruchstücken zusammen.</strong> Die Wortstellung unterscheidet sich von Sprache zu Sprache erheblich.</li>
<li><strong>Formatieren Sie sprachabhängig:</strong> Datumsangaben, Zahlen, Währungen, Adressen und Telefonnummern. Nutzen Sie die Formatierungsfunktionen der Plattform, statt eigene zu schreiben.</li>
</ul>

<h2>2. Die passende Adressstruktur für das Web wählen</h2>
<p>Es gibt drei sinnvolle Möglichkeiten, geordnet nach Wirkung auf die Suchmaschinenoptimierung und technischem Aufwand:</p>
<ul>
<li><strong>Länderdomains</strong> (example.de, example.fr) – größtes lokales Vertrauen, höchste Kosten.</li>
<li><strong>Unterverzeichnisse</strong> (example.com/de/, example.com/fr/) – für die meisten Unternehmen der beste Kompromiss. Leichter zu verwalten, die gesamte Autorität fließt in eine Domain.</li>
<li><strong>Subdomains</strong> (de.example.com) – der Mittelweg.</li>
</ul>
<p>Unabhängig von Ihrer Wahl müssen Sie <code>hreflang</code> auf jeder Seite korrekt umsetzen – mit einem Verweis auf die Seite selbst und einem <code>x-default</code> für alle übrigen Nutzer.</p>

<h2>3. Einen skalierbaren Übersetzungsablauf aufbauen</h2>
<p>Lokalisierung, die mit dem Unternehmen wächst, hat drei Eigenschaften: Sie läuft kontinuierlich, sie sitzt nah am Code, und sie hat ein Gedächtnis.</p>
<ul>
<li><strong>Kontinuierlich.</strong> Neue Texte gehen an die Übersetzer, sobald sie in den Hauptzweig übernommen wurden. Keine riesigen Pakete zum Quartalsende.</li>
<li><strong>Nah am Code.</strong> Nutzen Sie ein Übersetzungsmanagementsystem mit Anbindung an GitHub, Figma und Ihr Redaktionssystem, damit niemand JSON-Dateien hin- und herkopieren muss.</li>
<li><strong>Mit Gedächtnis.</strong> Ein Übersetzungsspeicher verwendet jede bereits freigegebene Übersetzung wieder, senkt die Kosten und verbessert mit der Zeit die Einheitlichkeit. Eine Terminologiedatenbank legt Marken- und Fachbegriffe verbindlich fest.</li>
</ul>

<h2>4. Bedeutung übersetzen, nicht Wörter</h2>
<p>Echte Lokalisierung ähnelt eher dem Texten als dem Nachschlagen im Wörterbuch:</p>
<ul>
<li><strong>Transkreation</strong> für Marketingtexte – dieselbe Botschaft, neuer kultureller Bezug.</li>
<li><strong>Muttersprachliche Sprachexperten</strong>, die im Markt leben. Ein Übersetzer aus Québec ist kein Übersetzer für Frankreich.</li>
<li><strong>Zweistufige Qualitätssicherung</strong> – Sprachexperte und Prüfer – für alles, was Kunden sehen.</li>
<li><strong>Korrektur im Kontext.</strong> Übersetzer sehen die tatsächliche Oberfläche, nicht nur eine Tabelle mit Texten.</li>
</ul>

<h2>5. Kulturelle und rechtliche Anpassung einplanen</h2>
<p>Die Texte sind der einfache Teil. Schwierig wird es hier:</p>
<ul>
<li>Formulare mit den richtigen Adressfeldern, Postleitzahlen und Steuernummern je Land.</li>
<li>Namen aus einem Teil, aus vier Teilen oder in nichtlateinischen Schriften.</li>
<li>Bilder, Farben und Symbole, die in verschiedenen Kulturen unterschiedlich verstanden werden.</li>
<li>Zahlungsarten, Währungen und Steuerberechnung je Markt.</li>
<li>Datenschutz- und Einwilligungsregeln – DSGVO, LGPD, CCPA und weitere.</li>
</ul>

<h2>6. So testen, wie Nutzer im Markt das Produkt verwenden</h2>
<p>Führen Sie die linguistische Qualitätssicherung im laufenden Produkt durch, auf echten Geräten und mit den Anzeigeeinstellungen des jeweiligen Gebietsschemas. Achten Sie auf:</p>
<ul>
<li>Deutsche Texte, die über Schaltflächen hinauslaufen – Deutsch ist im Schnitt rund 30 % länger als Englisch.</li>
<li>Das Zeilenumbruchverhalten chinesischer Texte in engen Oberflächen.</li>
<li>Arabische und hebräische Layouts, die in der Schreibrichtung von links nach rechts gut aussehen und in der Gegenrichtung zerfallen.</li>
<li>Rechtsbündige Ziffern innerhalb arabischer Sätze.</li>
</ul>

<h2>7. Lokalisierung von Anfang an mit Suchmaschinenoptimierung verbinden</h2>
<p>Eine lokalisierte Website, die niemand findet, ist nur teurer Inhalt. Planen Sie lokalisierte Suchbegriffsrecherche, lokalisierte Metadaten und lokalisierte interne Verlinkung von Beginn an – nicht als Folgeprojekt. Genau hier ergänzt unsere <a href="/de/services/seo">mehrsprachige Suchmaschinenoptimierung (SEO)</a> in der Regel die Übersetzung.</p>

<h2>8. Messen, was zählt</h2>
<p>Erfassen Sie je Gebietsschema: Konversionsrate, Anteil der Supportanfragen, Erstattungsquote und organische Zugriffe im Vergleich zur englischen Ausgangsbasis. Eine „erfolgreiche“ Einführung sollte diese Werte innerhalb von zwei Quartalen in die richtige Richtung bewegen.</p>

<h2>Das Fazit</h2>
<p>Die Lokalisierung für über 100 Märkte ist im Kern kein Übersetzungsprojekt, sondern ein Produkt-, Gestaltungs-, Entwicklungs-, Marketing- und Betriebsprojekt, zu dem Übersetzung gehört. Beginnen Sie mit der Architektur, bauen Sie einen kontinuierlichen Ablauf auf, setzen Sie auf muttersprachliche Sprachexperten und verbinden Sie Lokalisierung mit Suchmaschinenoptimierung. Unsere <a href="/de/services/translation-localization">Übersetzung und Lokalisierung</a> ist genau dafür gemacht – sprechen Sie uns an.</p>
<p>Und belegen Sie vor dem Start, dass es funktioniert: Die <a href="/de/services/marketready">MarketReady™ kulturelle Validierung</a> prüft Ihre lokalisierten Inhalte mit echten Muttersprachlern in jedem Markt – so entdecken Sie eine kulturell unpassende Formulierung im Prüfgremium und nicht in einem viral verbreiteten Bildschirmfoto. Hier lesen Sie, <a href="/de/blog/marketready-cultural-validation">warum eine korrekte Übersetzung allein nicht ausreicht</a>.</p>
`,
};
