import type { BlogPostZh as BlogPostDe } from "../blog.zh/types";

export const internationalSeoDe: BlogPostDe = {
  title: "Internationale Suchmaschinenoptimierung: So ranken Sie in jeder Verkaufssprache",
  metaTitle: "Internationale SEO in jeder Sprache",
  description:
    "Internationale Suchmaschinenoptimierung: hreflang, Adressstruktur, lokale Suchbegriffsrecherche, Inhalte und Linkaufbau für jeden einzelnen Markt.",
  tags: ["SEO", "International", "Wachstum"],
  body: `
<p>Die meisten Projekte zur internationalen Suchmaschinenoptimierung scheitern auf zwei vorhersehbare Arten: an einem Redaktionssystem, das <code>hreflang</code> falsch ausgibt, und an einer Inhaltsstrategie, die englische Suchbegriffe maschinell in neun Sprachen überträgt und es dabei belässt. So machen Sie es richtig.</p>

<h2>1. Klären Sie, was „international“ für Sie bedeutet</h2>
<p>Internationale Suchmaschinenoptimierung umfasst zwei unterschiedliche Ziele – möglicherweise brauchen Sie beide:</p>
<ul>
<li><strong>Mehrsprachige Suchmaschinenoptimierung (SEO)</strong> – ein Land, mehrere Sprachen, etwa Deutsch und Französisch für den Schweizer Markt.</li>
<li><strong>Mehrregionale Suchmaschinenoptimierung</strong> – mehrere Länder, die sich teilweise eine Sprache teilen, etwa Deutschland, Österreich und die Schweiz.</li>
</ul>
<p>Architektur, Suchbegriffsrecherche und Inhalte unterscheiden sich je nachdem, welches Ziel Sie verfolgen.</p>

<h2>2. Die richtige Adressstruktur wählen</h2>
<p>Es gilt dieselbe Abwägung wie bei der Lokalisierung:</p>
<ul>
<li><strong>Länderdomains</strong> (example.de) – stärkstes Ländersignal, höchste Kosten.</li>
<li><strong>Unterverzeichnisse</strong> (example.com/de/) – für die meisten die beste Wahl. Die Autorität fließt in eine Domain.</li>
<li><strong>Subdomains</strong> (de.example.com) – der Mittelweg, allerdings behandelt Google sie eher wie eigenständige Websites.</li>
</ul>
<p>Für die meisten wachsenden Unternehmen setzen sich Unterverzeichnisse auf einer einzigen starken Domain durch.</p>

<h2>3. hreflang korrekt umsetzen – hier scheitern fast alle</h2>
<p>hreflang teilt Google mit, welche Fassung einer Seite einem Nutzer in einer bestimmten Sprache und einem bestimmten Land angezeigt werden soll. Drei Regeln:</p>
<ol>
<li><strong>Jede Seite verweist auf alle anderen Fassungen</strong> und auf sich selbst – wechselseitig.</li>
<li><strong>Geben Sie immer <code>x-default</code> an</strong> – für Nutzer, die Sie nicht ausdrücklich ansprechen.</li>
<li><strong>Verwenden Sie die richtigen Codes</strong> – ISO 639-1 für die Sprache, ISO 3166-1 Alpha-2 für die Region. Also <code>de-AT</code> und nicht <code>de-at</code> mit falscher Region oder erfundene Kürzel.</li>
</ol>
<p>Prüfen Sie hreflang in der Woche des Starts und danach monatlich in der Search Console und mit einem Prüfprogramm, das Ihre Website durchsucht.</p>

<h2>4. Lokale Suchbegriffsrecherche – gründlich</h2>
<p>Die englische Suchbegriffsliste zu übersetzen, ist der häufigste Fehler in der internationalen Suchmaschinenoptimierung. Gehen Sie stattdessen so vor:</p>
<ul>
<li><strong>Beginnen Sie beim muttersprachlichen Suchverhalten.</strong> Was geben Nutzer in diesem Land und in dieser Sprache tatsächlich ein?</li>
<li><strong>Erfassen Sie die Suchabsicht, nicht nur das Volumen.</strong> Die deutsche Entsprechung eines englischen Hauptbegriffs kann seltener gesucht werden, aber eine höhere Kaufabsicht haben – oder umgekehrt.</li>
<li><strong>Achten Sie auf Synonyme und regionale Varianten.</strong> „Jänner“ oder „Januar“, „Velo“ oder „Fahrrad“, „Paradeiser“ oder „Tomate“ – wählen Sie das Wort, das zum Markt passt.</li>
<li><strong>Berücksichtigen Sie englische Begriffe im Ausland.</strong> Manche Fachbegriffe bleiben auch in anderen Märkten englisch, und lokale Nutzer suchen teilweise auf Englisch.</li>
</ul>

<h2>5. Inhalte für den Markt schreiben, nicht für den Übersetzer</h2>
<p>Jede lokalisierte Zielseite sollte:</p>
<ul>
<li>von einem Muttersprachler im jeweiligen Markt geschrieben oder transkreiert sein,</li>
<li>auf die <em>lokale</em> Suchabsicht zielen – lokale Wettbewerber, lokale Einwände, lokale Beispiele,</li>
<li>intern auf andere lokalisierte Seiten derselben Sprache verlinken,</li>
<li>mit lokalisierten Metadaten, strukturierten Daten und Bildbeschreibungen optimiert sein.</li>
</ul>

<h2>6. Verlinkungen im Markt gewinnen</h2>
<p>Platzierungen in einem Land hängen vor allem von der Autorität in diesem Land ab. Eine deutsche Seite, die bei Google.de aufsteigen soll, braucht Verweise von deutschsprachigen Websites, die deutsche Nutzer tatsächlich lesen. Planen Sie lokale digitale Pressearbeit, Partnerschaften und gemeinsame Inhalte für jeden Markt.</p>

<h2>7. Lokale Suchmaschinenoptimierung nicht vergessen</h2>
<p>Wenn Sie Standorte betreiben oder bestimmte Städte bedienen, ergänzen Sie lokale Suchmaschinenoptimierung: Google-Unternehmensprofile je Standort, lokalisierte Zielseiten je Stadt, einheitliche Angaben zu Name, Adresse und Telefonnummer in allen Verzeichnissen sowie aktive Pflege von Bewertungen.</p>

<h2>8. Technische Suchmaschinenoptimierung gilt überall – und verzeiht nichts</h2>
<p>Ladezeit- und Stabilitätskennzahlen, Crawlbarkeit, Indexierung, interne Verlinkung und strukturierte Daten bleiben wichtig – nur mit höherer Komplexität. Einige schnelle Verbesserungen:</p>
<ul>
<li>Rendern Sie lokalisierte Seiten auf dem Server oder generieren Sie sie statisch, damit Google sie ohne JavaScript indexieren kann.</li>
<li>Setzen Sie auf jeder Seite das korrekte <code>lang</code>-Attribut.</li>
<li>Nutzen Sie die Länderausrichtung in der Search Console, wenn Sie ohne Länderdomains arbeiten.</li>
<li>Leiten Sie Nutzer nicht automatisch anhand der IP-Adresse um – lassen Sie sie die Sprachfassung wählen und merken Sie sich die Wahl.</li>
</ul>

<h2>9. Je Markt messen, nicht in der Summe</h2>
<p>Eine einzige weltweite Platzierungsübersicht verdeckt alles, was zählt. Erfassen Sie Impressionen, Klicks, Klickrate, Konversionen und Umsatz <em>je Gebietsschema</em>. Ein Trend wie „weltweit bessere Platzierungen“ verbirgt meist einen starken Markt, der die übrigen mitzieht.</p>

<h2>Das Fazit</h2>
<p>Internationale Suchmaschinenoptimierung ist ebenso eine Frage der Abstimmung wie der Technik – Übersetzer, Entwickler, Marketing und Suchmaschinenspezialisten müssen in dieselbe Richtung arbeiten. Unsere <a href="/de/services/seo">mehrsprachige Suchmaschinenoptimierung (SEO)</a> ist genau auf diese Abstimmung ausgelegt und stützt sich auf unser Übersetzungs- und Lokalisierungsteam für muttersprachliche Inhalte in jedem Markt. Wenn Sie in mehr als einer Sprache ranken möchten, sprechen Sie uns an.</p>
<p>Platzierungen sind nur die halbe Miete – die Zielseite muss auch überzeugen. Lokalisierte Inhalte wirken am besten, wenn echte Nutzer sie validiert haben. Genau das leistet die <a href="/de/services/marketready">MarketReady™ kulturelle Validierung</a> vor dem Start – damit Inhalte, die ranken, auch konvertieren. Mehr dazu, <a href="/de/blog/marketready-cultural-validation">warum eine korrekte Übersetzung nicht ausreicht</a>.</p>
`,
};
