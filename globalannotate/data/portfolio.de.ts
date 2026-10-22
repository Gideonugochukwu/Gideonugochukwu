import type { CaseStudyZh } from "./portfolio.zh";

// German copy of every case study, keyed by slug. Same structure as
// data/portfolio.ts; slugs, dates, and image IDs come from the English
// record. Client descriptors stay anonymized exactly as in English.
export type CaseStudyDe = CaseStudyZh;

export const casesDe: Record<string, CaseStudyDe> = {
  "telehealth-app-localized-14-languages": {
    title: "Telemedizin-App in unter drei Wochen in 14 Sprachen lokalisiert",
    client: "Eine Plattform für digitale Gesundheit nach ihrer ersten großen Finanzierungsrunde mit Expansion nach Afrika, in den Nahen Osten und nach Europa",
    industry: "Gesundheitstechnologie",
    service: "Übersetzung und Lokalisierung",
    duration: "19 Tage bis zum Start, danach laufend",
    summary:
      "Wir haben eine Telemedizin-App für Patienten in 19 Tagen von einer englischen Sprachversion auf vierzehn erweitert – mit strenger medizinischer Genauigkeit, vollständiger Rechts-nach-links-Unterstützung für Arabisch, lokalisierten Einträgen in den App-Stores und einer kontinuierlichen Lokalisierung im wöchentlichen Veröffentlichungstakt.",
    challenge:
      "Um eine Zusage gegenüber regionalen Investoren einzuhalten, musste das Team vierzehn Märkte in drei Wochen starten. Medizinische Inhalte lassen keinen Spielraum: Jede Dosierung, jedes Symptom und jede Einwilligungsformulierung musste klinisch korrekt sein. Arabisch erforderte ein Rechts-nach-links-Layout, das das iOS-Team noch nie umgesetzt hatte. App Store und Google Play benötigten pro Markt lokalisierte Titel, Beschreibungen und Bildschirmfotos, und die Entwicklung veröffentlichte jeden Freitag eine neue Version – die Lokalisierung musste also in diesem Takt mitlaufen, ohne den Starttermin zu gefährden.",
    approach: [
      "Aufbau eines Teams muttersprachlicher medizinischer Sprachexperten für jede Zielsprache, jeweils ergänzt um eine medizinische Zweitprüfung, sodass jeder Text eine strenge zweistufige Qualitätssicherung durchlief",
      "Erstellung eines klinischen Glossars und einer Terminologiedatenbank – Wirkstoffnamen, Dosiereinheiten, Anatomie, Formulierungen für Einwilligungen –, vorbefüllt vom medizinischen Beirat des Kunden und im Übersetzungsmanagementsystem verankert, sodass alle Beteiligten mit derselben verbindlichen Quelle arbeiteten",
      "Parallele Lokalisierung von 22.000 Produkttexten und 60.000 Wörtern Patienteninformation über eine Schnittstelle zu den Veröffentlichungszweigen des Kunden auf GitHub",
      "Prüfung der Benutzeroberfläche im Kontext der laufenden iOS- und Android-Versionen – einschließlich eines eigenen Durchgangs für Arabisch mit muttersprachlichen Entwicklern und Sprachexperten, der abgeschnittene Texte, gespiegelte Symbole und die Schreibweise ostarabischer Ziffern aufdeckte",
      "Lokalisierung der Metadaten, Bildschirmfotos und Vorschauvideos in App Store und Google Play in allen 14 Sprachen, mit marktspezifischen Motiven und Optimierung für App-Shops (ASO) für den Nahen Osten und Nordafrika",
      "Einrichtung einer kontinuierlichen Lokalisierung im Freitagsrhythmus: Neue Texte gehen beim Zusammenführen an die Sprachexperten, kommen innerhalb von 48 Stunden geprüft zurück und blockieren nie eine Veröffentlichung",
    ],
    headlineOutcomes: [
      { label: "Ausgelieferte Sprachen", value: "14" },
      { label: "Lieferzeit", value: "19 Tage" },
      { label: "Nicht englischsprachige Registrierungen", value: "+38 %" },
    ],
    outcomes: [
      { label: "Ausgelieferte Sprachen", value: "14" },
      { label: "Lieferzeit", value: "19 Tage" },
      { label: "Nicht englischsprachige Registrierungen", value: "+38 %" },
      { label: "Konversion im App Store", value: "+27 %" },
      { label: "Supportanfragen zur Lokalisierung", value: "−22 %" },
      { label: "Eskalationen zur medizinischen Genauigkeit", value: "0" },
    ],
  },
  "8-market-ecommerce-localization-dtc": {
    title: "Lokalisierung eines Onlineshops für 8 Märkte",
    client: "Eine europäische Mode- und Lebensstilmarke im Direktvertrieb mit Wachstum in der gesamten EU",
    industry: "Onlinehandel",
    service: "Übersetzung und Lokalisierung",
    duration: "10 Wochen bis zum Start, danach laufend",
    summary:
      "Wir haben 20.000 Artikel, die Markenstimme, den Bestellprozess und sämtliche Rechtstexte für acht europäische Märkte lokalisiert – und transkreierte Kampagnentexte sowie eine gepflegte Terminologiedatenbank in dieselbe Veröffentlichung eingebunden wie die internationale Suchmaschinenoptimierung und das bezahlte Marketing.",
    challenge:
      "Die Marke war ihrem einsprachigen Shop entwachsen. Acht EU-Märkte sollten rechtzeitig zur Herbstkampagne starten – mit einheitlicher Markenstimme, marktgerechten Größenangaben, marktspezifischen Zahlungsarten und Rechtstexten, die den jeweiligen Verbraucherschutzvorschriften entsprechen. Allein der Katalog mit 20.000 Artikeln änderte sich wöchentlich mit jeder neuen Kollektion, und frühere Versuche mit maschineller Übersetzung hatten flache, markenferne Texte geliefert, die die Gründer nicht veröffentlichen wollten.",
    approach: [
      "Transkreation von Markenstimme, Kampagnentexten und redaktionellen Inhalten durch erfahrene Texter in jedem Markt – dieselbe Botschaft, lokal geschrieben, nie wörtlich übersetzt",
      "Lokalisierung des Katalogs mit 20.000 Artikeln über eine Schnittstelle zum Redaktionssystem und eine gepflegte Terminologiedatenbank für Stoffe, Passformen und Materialien, sodass jede Produktkarte in jeder Sprache einheitlich wirkte",
      "Muttersprachliche Suchbegriffsrecherche für mehrsprachige Suchmaschinenoptimierung (SEO) je Markt, direkt eingespeist in die Strategie für Kategorien, Kollektionen und Zielseiten",
      "Lokalisierung der gesamten Kaufstrecke – Warenkorb, Kasse, Retouren, Kundenservice sowie marktspezifische Zahlungsarten, Versandregeln und Steuerangaben",
      "Lokalisierung aller Rechtstexte (Geschäftsbedingungen, Datenschutz, Cookies, Widerrufsrecht) nach dem rechtlichen Standard des jeweiligen Marktes, geprüft durch Anwälte vor Ort",
      "Durchgängige Qualitätsprüfung jeder Sprachversion in der Vorabumgebung – Preise, Währungen, Größen, Bildwelt, Zeitpunkt saisonaler Kampagnen und Rechts-nach-links-Darstellung je Markt",
    ],
    headlineOutcomes: [
      { label: "Gestartete Märkte", value: "8" },
      { label: "Umsatz im Ausland", value: "+212 %" },
      { label: "Konversionsrate", value: "+1,9 Prozentpunkte" },
    ],
    outcomes: [
      { label: "Gestartete Märkte", value: "8" },
      { label: "Umsatz im Ausland", value: "+212 %" },
      { label: "Konversionsrate", value: "+1,9 Prozentpunkte" },
      { label: "Organische Zugriffe auf neue Sprachversionen", value: "+160 %" },
      { label: "Kaufabbrüche", value: "−14 %" },
      { label: "Zeit bis zur Markteinführung", value: "−50 %" },
    ],
  },
  "elearning-video-ui-localization-12-languages": {
    title: "Lernplattform in 12 Sprachen lokalisiert – Videos und Benutzeroberfläche",
    client: "Ein weltweit tätiges Bildungstechnologie-Unternehmen mit Lernenden in über 60 Ländern",
    industry: "Bildungstechnologie",
    service: "Übersetzung und Lokalisierung",
    duration: "16-wöchiges Programm",
    summary:
      "Hunderte Stunden Kursvideos untertitelt und synchronisiert, die gesamte Produktoberfläche lokalisiert und eine Terminologiestrecke aufgebaut, die die fachliche Genauigkeit über zwölf Sprachen hinweg sichert – geliefert nach einem straffen Kursstartplan.",
    challenge:
      "Das Unternehmen hatte seinen Katalog auf Englisch aufgebaut und wollte zwölf neue Sprachen anbieten – doch die Aufgabe ging weit über einen Textexport hinaus. Hunderte Stunden Kursvideo brauchten genaue Untertitel und natürlich klingende Vertonung, Fachbegriffe mussten zwischen Video, Transkript und Oberfläche übereinstimmen, Barrierefreiheit (Untertitel für Hörgeschädigte, Transkripte, Audiodeskription) war für die Zielmärkte Pflicht, und das akademische Team hatte die Starttermine der ersten lokalisierten Kurse bereits angekündigt.",
    approach: [
      "Untertitelung des gesamten Videokatalogs in 12 Sprachen mit Prüfung der Zeitsteuerung und Lokalisierung eingeblendeter Texte, dazu professionelle Vertonung durch muttersprachliche Sprecher für die wichtigsten Kurse",
      "Aufbau fachspezifischer Terminologiedatenbanken – Technik, Daten, Gestaltung, Wirtschaft –, abgeleitet aus dem Lehrplan und genutzt von allen Sprachexperten, Sprechern und Prüfern im Programm",
      "Lokalisierung der Produktoberfläche: Einführung, Lernübersichten, Prüfungen, Benachrichtigungen und automatisierte E-Mails, jeweils im Kontext des tatsächlichen Produkts geprüft",
      "Vollständige Barrierefreiheit: Untertitel für Hörgeschädigte und herunterladbare Transkripte in jeder Sprache, Alternativtexte für jede Abbildung und Audiodeskription, wo die Lerninhalte im Bild liegen",
      "Geräteübergreifende Qualitätsprüfung auf Web, iOS, Android und Fernsehgeräten für jede Sprache – mit Kontrolle von Zeitsteuerung der Untertitel, Ersatzschriften, Zeilenumbrüchen und Rechts-nach-links-Darstellung",
      "Kontinuierliche Lokalisierung, sodass neue Kurse in allen 12 Sprachen zeitgleich mit der englischen Version erscheinen statt Wochen später",
    ],
    headlineOutcomes: [
      { label: "Gestartete Sprachen", value: "12" },
      { label: "Kursabschlüsse", value: "+31 %" },
      { label: "Zufriedenheit der Lernenden", value: "+24 %" },
    ],
    outcomes: [
      { label: "Gestartete Sprachen", value: "12" },
      { label: "Lokalisierter Katalog", value: "100 %" },
      { label: "Kursabschlüsse", value: "+31 %" },
      { label: "Zufriedenheit der Lernenden", value: "+24 %" },
      { label: "Startzeit je Sprache", value: "−62 %" },
      { label: "Neu erschlossene Regionen", value: "3" },
    ],
  },
  "linkedin-growth-b2b-social-media": {
    title: "Sechsfaches Wachstum auf LinkedIn und stetige Anfragen für eine B2B-Marke",
    client: "Ein Softwareanbieter für Prozessautomatisierung mit unregelmäßigem, kaum beachtetem Auftritt in sozialen Medien",
    industry: "B2B-Software",
    service: "Betreuung sozialer Medien",
    duration: "6-monatiges Programm",
    summary:
      "Wir haben einen stillen, unregelmäßigen Auftritt in sozialen Medien zu einem echten Vertriebskanal ausgebaut – mit Strategie, Redaktionsplan, markengerechten Vorlagen, täglicher Betreuung der Gemeinschaft, gezielter bezahlter Verstärkung und monatlichen Berichten. Die Zahl der Abonnenten auf LinkedIn hat sich versechsfacht, und soziale Medien liefern nun Vertriebskontakte.",
    challenge:
      "Die Kanäle der Marke wirkten verwaist. Beiträge erschienen nur, wenn jemand im Team daran dachte, Tonfall und Gestaltung wechselten von Woche zu Woche, und über LinkedIn oder Instagram kamen kaum Anfragen. Der Vertrieb trug die gesamte Akquise allein, während Wettbewerber mit schwächeren Produkten in derselben Nische deutlich präsenter waren – die Marke wirkte kleiner, als sie tatsächlich war.",
    approach: [
      "Entwicklung einer Inhaltsstrategie und eines monatlichen Redaktionsplans, abgestimmt auf Produktneuheiten, Kundenerfolge, Branchenthemen und eine feste Auswahl wiederkehrender Formate",
      "Gestaltung einer kleinen Bibliothek markengerechter Vorlagen – Karussells, Einzelbilder, Zitatkarten, Kurzvideos –, damit jeder Beitrag im Nachrichtenstrom sofort erkennbar ist",
      "Texten, Gestalten und Planen von fünf Beiträgen pro Woche auf LinkedIn und Instagram mit einheitlicher Tonalität, Signatur und Gestaltung",
      "Tägliche Betreuung der Gemeinschaft – Antwort auf jeden Kommentar und jede Direktnachricht innerhalb weniger Stunden, Austausch mit Zielkunden und Interessenten, Weiterleitung kaufbereiter Rückmeldungen direkt an den Vertrieb",
      "Gezielte bezahlte Verstärkung der stärksten organischen Beiträge, um die Reichweite bei passenden Entscheidern zu erhöhen",
      "Monatliche Berichte zu Reichweite, Interaktion, Zuwachs an Abonnenten, eingehenden Direktnachrichten und Kontakten, ergänzt um eine kurze Einschätzung, was funktioniert und was entfallen sollte",
    ],
    headlineOutcomes: [
      { label: "Abonnenten auf LinkedIn", value: "+540 %" },
      { label: "Eingehende Anfragen und Direktnachrichten", value: "+180 %" },
      { label: "Monatliche Reichweite", value: "+420 %" },
    ],
    outcomes: [
      { label: "Abonnenten auf LinkedIn", value: "+540 %" },
      { label: "Interaktionsrate", value: "+3,2 Prozentpunkte" },
      { label: "Eingehende Anfragen und Direktnachrichten", value: "+180 %" },
      { label: "Monatliche Reichweite", value: "+420 %" },
      { label: "Veröffentlichungsrhythmus", value: "5 × pro Woche" },
      { label: "Abschlüsse über soziale Medien", value: "3" },
    ],
  },
  "patient-app-14-languages": {
    title: "Patienten-App in 14 Sprachen lokalisiert",
    client: "Eine führende Plattform für digitale Gesundheit",
    industry: "Gesundheitswesen",
    service: "Übersetzung und Lokalisierung",
    duration: "18 Tage bis zur ersten Sprache, danach laufend",
    summary:
      "60.000 Produkttexte und Patienteninformationen in 14 Sprachen übertragen, mit kulturell angepasster Nutzerführung, im Veröffentlichungstakt der Entwicklung geliefert und mit einer Bestehensquote von 99,4 % in der sprachlichen Qualitätsprüfung.",
    challenge:
      "Das Produktteam wollte von einer englischen Sprachversion auf vierzehn Märkte erweitern, ohne den wöchentlichen Veröffentlichungstakt der Entwicklung zu verlangsamen. Die Patienteninformationen waren sensibel, die Terminologie musste marktübergreifend einheitlich sein, und jede Sprachversion musste dieselbe Qualitätsstufe erreichen wie das englische Produkt.",
    approach: [
      "Einsatz muttersprachlicher Sprachexperten und einer zweiten Prüfinstanz je Sprache mit dokumentierter zweistufiger Qualitätssicherung für jeden Text",
      "Aufbau einer klinischen Terminologiedatenbank und eines Übersetzungsspeichers, verankert im Übersetzungsmanagementsystem als verbindliche Quelle für alle Beteiligten",
      "Anbindung einer Schnittstelle für kontinuierliche Lokalisierung an den Veröffentlichungszweig der Entwicklung, sodass neue Texte beim Zusammenführen an die Sprachexperten gehen",
      "Parallele Lokalisierung von 60.000 Produkttexten und Patienteninformationen in allen 14 Sprachen",
      "Prüfung der Benutzeroberfläche im Kontext auf iOS und Android für jede Sprache vor jeder Veröffentlichung",
    ],
    headlineOutcomes: [
      { label: "Gestartete Sprachen", value: "14" },
      { label: "Zeit bis zur ersten Sprache", value: "18 Tage" },
      { label: "Bestehensquote der Sprachprüfung", value: "99,4 %" },
    ],
    outcomes: [
      { label: "Gestartete Sprachen", value: "14" },
      { label: "Zeit bis zur ersten Sprache", value: "18 Tage" },
      { label: "Bestehensquote der Sprachprüfung", value: "99,4 %" },
    ],
  },
  "perception-model-1m-images-annotated": {
    title: "1,2 Mio. Bilder für ein Wahrnehmungsmodell annotiert",
    client: "Ein junges Unternehmen für autonome Robotik",
    industry: "Robotik",
    service: "KI-Datenannotation",
    duration: "Laufendes Programm",
    summary:
      "Eine kontinuierliche Strecke für semantische Segmentierung im Umfang von 1,2 Mio. Bildern mit wöchentlicher Lieferung, Kalibrierung anhand von Goldstandard-Datensätzen und laufender Messung der Übereinstimmung zwischen Annotatoren – Trainingsdaten in Produktionsqualität im Veröffentlichungstakt.",
    challenge:
      "Das Team für Wahrnehmungsmodelle brauchte saubere, einheitliche Annotationen in einem Umfang und Tempo, das ein internes Team nicht dauerhaft leisten konnte. Der Durchsatz bremste die Iterationsgeschwindigkeit des Modells, und Qualitätsschwankungen zwischen einzelnen Lieferungen verschlechterten die Bewertungsergebnisse.",
    approach: [
      "Gemeinsame Entwicklung einer Annotationssystematik und eines Goldstandard-Datensatzes mit dem Modellteam, an dem jeder Annotator vor dem Einsatz an echten Daten kalibriert wurde",
      "Betrieb einer kontinuierlichen Strecke für semantische Segmentierung im Umfang von 1,2 Mio. Bildern mit wöchentlicher Lieferung",
      "Messung der Übereinstimmung zwischen Annotatoren je Klasse und Lieferung eines Qualitätsberichts mit jeder Charge",
      "Anpassung der Richtlinien während des Programms auf Basis der Fehleranalyse des Modells – ein geschlossener Kreislauf zwischen Daten und Vorhersagen",
    ],
    headlineOutcomes: [
      { label: "Annotierte Bilder", value: "1,2 Mio." },
      { label: "Durchsatz", value: "+62 %" },
      { label: "Übereinstimmung zwischen Annotatoren", value: "0,93" },
    ],
    outcomes: [
      { label: "Annotierte Bilder", value: "1,2 Mio." },
      { label: "Durchsatz", value: "+62 %" },
      { label: "Übereinstimmung zwischen Annotatoren", value: "0,93" },
    ],
  },
  "dtc-beauty-brand-roas-4x": {
    title: "Werbeertrag einer nachhaltigen Kosmetikmarke vervierfacht",
    client: "Ein Kosmetikunternehmen aus Paris mit Direktvertrieb",
    industry: "Onlinehandel",
    service: "Digitales Marketing",
    duration: "12-wöchige Intensivphase, danach laufend",
    summary:
      "Neuaufbau des Werbetrichters auf Facebook und Instagram von den Anzeigenmotiven bis zur Zielseite – über 40 Motivvarianten, neu strukturierte Zielgruppen und Abläufe zur Kundenbindung nach dem Kauf, die den gesamten Werbeertrag (ROAS) innerhalb eines Quartals vervierfacht haben.",
    challenge:
      "Die bezahlte Werbung in sozialen Medien stagnierte. Die Motive waren verbraucht, die Zielgruppen zu eng gefasst, und die Zielseiten hielten nicht, was die Anzeigen versprachen – zusammen trieb das die Kundengewinnungskosten Quartal für Quartal nach oben und zwang das Team zur Wahl zwischen Wachstum und Rentabilität.",
    approach: [
      "Prüfung des gesamten Werbekontos und vollständiger Neuaufbau der Trichterarchitektur",
      "Produktion von über 40 Motivvarianten als Standbild, Bewegtbild und im Stil nutzergenerierter Inhalte (UGC), getestet in strukturierten Wellen",
      "Neuordnung der Zielgruppen mit breiter Ausrichtung und motivgetriebenen Tests",
      "Aufbau konversionsstarker Zielseiten, passend zu jedem Motivansatz",
      "Ergänzung eines Ablaufs zur Kundenbindung nach dem Kauf und Ausrichtung der Berichte auf den gesamten Werbeertrag statt nur auf Plattformkennzahlen",
    ],
    headlineOutcomes: [
      { label: "ROAS", value: "4,1-fach" },
      { label: "Senkung der Kundengewinnungskosten", value: "−38 %" },
      { label: "Quartalsumsatz", value: "+212 %" },
    ],
    outcomes: [
      { label: "ROAS", value: "4,1-fach" },
      { label: "Senkung der Kundengewinnungskosten", value: "−38 %" },
      { label: "Quartalsumsatz", value: "+212 %" },
    ],
  },
  "multilingual-rlhf-dataset": {
    title: "Mehrsprachiger RLHF-Datensatz für ein großes Sprachmodell im Unternehmenseinsatz",
    client: "Ein Entwickler von Basismodellen nach seiner zweiten großen Finanzierungsrunde",
    industry: "KI / große Sprachmodelle",
    service: "KI-Datenannotation",
    duration: "10-wöchiges Programm",
    summary:
      "Ein Präferenzdatensatz mit 80.000 Eingaben in 8 Sprachen – einschließlich gezielter Angriffsszenarien und Bewertungen zur Befolgung von Anweisungen –, der die nachgelagerten Bewertungsergebnisse des Modells um 11,6 % verbessert hat. Grundlage war verstärkendes Lernen aus menschlichem Feedback (RLHF).",
    challenge:
      "Das Modellteam brauchte Präferenzdaten, die die Feinheiten beim Befolgen von Anweisungen in acht Sprachen abbilden, einschließlich provokativer und sicherheitskritischer Eingaben. Öffentliche Datensätze waren außerhalb des Englischen dünn und in der Qualität uneinheitlich.",
    approach: [
      "Gemeinsamer Entwurf der Datensatzstruktur mit dem Forschungsteam – Präferenzpaare, Bewertungen zur Befolgung von Anweisungen und provokative Eingaben",
      "Gewinnung muttersprachlicher Annotatoren mit Fachwissen in jeder Zielsprache und Kalibrierung anhand eines zurückgehaltenen Goldstandard-Datensatzes",
      "Erstellung von 80.000 Eingaben in 8 Sprachen mit ausgewogener Verteilung über Absichtskategorien und Schwierigkeitsstufen",
      "Lieferung von Berichten zur Übereinstimmung zwischen Annotatoren je Sprache und Klärung von Grenzfällen mit dem Forschungsteam in wöchentlichen Abstimmungen",
    ],
    headlineOutcomes: [
      { label: "Eingaben", value: "80.000" },
      { label: "Sprachen", value: "8" },
      { label: "Verbesserung der Bewertung", value: "+11,6 %" },
    ],
    outcomes: [
      { label: "Eingaben", value: "80.000" },
      { label: "Sprachen", value: "8" },
      { label: "Verbesserung der Bewertung", value: "+11,6 %" },
    ],
  },
  "uae-arabic-first-beauty-launch": {
    title: "Markteinführung einer Kosmetikmarke in den Emiraten – Arabisch zuerst",
    client: "Ein regionaler Herausforderer im Kosmetikmarkt",
    industry: "Kosmetik",
    service: "Marketing und Lokalisierung",
    duration: "8 Wochen bis zum Start, danach laufend",
    summary:
      "Arabische Transkreation, von Meinungsführern getragene nutzergenerierte Inhalte und ein Wachstumsprogramm auf Facebook und Instagram für die Generation Z – eine regionale Markenstimme, die die Zahl der Abonnenten verdoppelt und innerhalb von zwei Monaten die Gewinnschwelle erreicht hat.",
    challenge:
      "Die Marke trat als regionaler Herausforderer in einen arabischsprachig geprägten Markt ein, den globale Konzerne dominieren. Englische Standardmotive hätten nicht gezündet, und eine wörtliche Übersetzung der Kampagnentexte hätte fremd gewirkt – genau das falsche Signal für ein junges Publikum.",
    approach: [
      "Transkreation von Marken- und Kampagnentexten ins Arabische – dieselbe Botschaft, lokal geschrieben, mit kulturell passenden Bezügen",
      "Aufbau einer Produktionsstrecke für nutzergenerierte Inhalte mit regionalen Meinungsführern in den Emiraten und Saudi-Arabien",
      "Wachstumsprogramm auf Facebook und Instagram für die Generation Z, mit Motivtests entlang regionaler Inhaltstrends",
      "Einführung einer lokalisierten Tonalität im Kundenservice und eines Bewertungsmanagements für arabischsprachige Rückmeldungen",
    ],
    headlineOutcomes: [
      { label: "ROAS", value: "5,8-fach" },
      { label: "Abonnenten", value: "+96.000" },
      { label: "Gewinnschwelle", value: "2 Monate" },
    ],
    outcomes: [
      { label: "ROAS", value: "5,8-fach" },
      { label: "Abonnenten", value: "+96.000" },
      { label: "Gewinnschwelle", value: "2 Monate" },
    ],
  },
  "nlp-intent-dataset-indian-languages": {
    title: "Datensatz zur Absichtserkennung in 8 indischen Sprachen",
    client: "Ein Bildungstechnologie-Unternehmen für den ländlichen Raum in Indien",
    industry: "Bildung",
    service: "KI-Datenannotation",
    duration: "9-wöchiges Programm",
    summary:
      "Ein ausgewogener Datensatz für Absichten und Entitäten in 8 indischen Sprachen – einschließlich der gemischtsprachigen Äußerungen, die echte Nutzer häufig verwenden –, der im Produktivbetrieb den F1-Wert des Modells um 9,2 % gesteigert hat.",
    challenge:
      "Die Sprachverarbeitung des Produkts musste acht indische Sprachen beherrschen, einschließlich der in der ländlichen Nutzerschaft verbreiteten Mischungen aus Hindi und Englisch sowie Tamil und Englisch. Verfügbare Absichtsdaten bildeten die tatsächliche Sprechweise der Nutzer nicht ab, und die schwache Genauigkeit in diesen Sprachen drückte die Gesamtleistung des Assistenten.",
    approach: [
      "Festlegung eines Schemas für Absichten und Entitäten mit dem Produktteam und Gewinnung muttersprachlicher Annotatoren in jeder Sprache",
      "Erhebung und Ausbalancierung von 240.000 Äußerungen in förmlicher, umgangssprachlicher und gemischtsprachiger Ausprägung",
      "Kalibrierung der Annotatoren anhand eines zurückgehaltenen Goldstandard-Datensatzes je Sprache und laufende Messung der Übereinstimmung zwischen Annotatoren",
      "Wöchentliche Lieferungen mit Qualitätsberichten je Sprache, rückgekoppelt an die Fehleranalyse des Modells",
    ],
    headlineOutcomes: [
      { label: "Äußerungen", value: "240.000" },
      { label: "Sprachen", value: "8" },
      { label: "Steigerung des F1-Werts", value: "+9,2 %" },
    ],
    outcomes: [
      { label: "Äußerungen", value: "240.000" },
      { label: "Sprachen", value: "8" },
      { label: "Steigerung des F1-Werts", value: "+9,2 %" },
    ],
  },
  "game-localization-rpg": {
    title: "Lokalisierung eines erzählerischen Rollenspiels in 12 Sprachen",
    client: "Ein unabhängiges Studio, das ein handlungsgetriebenes Rollenspiel weltweit veröffentlicht",
    industry: "Spiele",
    service: "Spielelokalisierung",
    duration: "10 Wochen bis zum Start, danach laufende Updates",
    summary:
      "Ein unabhängiges Studio brauchte für sein dialoglastiges Rollenspiel zwölf gleichzeitige Marktstarts – mit kulturell passendem Humor, verbindlicher Terminologie der Spielwelt und ohne abgeschnittene Texte zum Start. Wir haben das gesamte Programm umgesetzt: spielende Sprachexperten, Glossar, Transkreation und LQA im Kontext echter Spielversionen – passend zum festen Veröffentlichungstermin auf Steam.",
    challenge:
      "Das Erstlingswerk des Studios umfasste 180.000 Wörter verzweigter Dialoge, ein eigenes Vokabular der Spielwelt und Humor, der auf regionale Anspielungen und Wortspiele setzte. Geplant war ein weltweiter Start auf Steam in 10 Wochen in 12 Sprachen, darunter Japanisch, Koreanisch, vereinfachtes Chinesisch, Deutsch, Französisch, lateinamerikanisches Spanisch, brasilianisches Portugiesisch und Arabisch – ohne Spielraum für schlechte Bewertungen wegen fehlerhafter Lokalisierung, falsch übersetzter Witze oder abgeschnittener Oberflächentexte am ersten Wochenende.",
    approach: [
      "Gewinnung muttersprachlicher, selbst spielender Sprachexperten des Genres in jeder Zielsprache und Kalibrierung an einem Probekapitel vor Beginn des Hauptprogramms",
      "Erstellung von Glossar und Stilleitfaden für das Vokabular der Spielwelt, Figurennamen, Fraktionen und Begriffe der Hintergrundgeschichte – verankert im Übersetzungsmanagementsystem als verbindliche Quelle für alle",
      "Transkreation von Witzen, Redewendungen und kulturellen Anspielungen statt wörtlicher Übersetzung, damit der Humor in jedem Markt in der eigenen Sprache zündet",
      "Lokalisierung von Benutzeroberfläche, Spielanzeige, Einführungsabschnitte und Texten für die Shop-Seiten mit sichtbaren Zeichenbegrenzungen und Formatierungsmarken im Kontext – Platzhalter wie {playerName} und %d blieben exakt erhalten",
      "LQA im Kontext der tatsächlichen Spielversion je Sprache – muttersprachliche Sprachexperten spielten durch und erfassten abgeschnittene Texte, fehlerhaft getaktete Untertitel und defekte Variablen direkt im Fehlerverwaltungssystem des Studios",
      "Kontinuierliche Lokalisierung für Aktualisierungen und neue Inhalte nach dem Start im wöchentlichen Veröffentlichungsrhythmus des Studios",
    ],
    headlineOutcomes: [
      { label: "Ausgelieferte Sprachen", value: "12" },
      { label: "Zeitfenster bis zum Start", value: "10 Wochen" },
      { label: "Kritische Textfehler zum Start", value: "0" },
    ],
    outcomes: [
      { label: "Ausgelieferte Sprachen", value: "12" },
      { label: "Zeitfenster bis zum Start", value: "10 Wochen" },
      { label: "Auslandsanteil am Umsatz der ersten Woche", value: "ca. 40 %" },
      { label: "Kritische Textfehler zum Start", value: "0" },
      { label: "Stimmung der Bewertungen nach Region", value: "Durchweg positiv" },
      { label: "Rhythmus der Aktualisierungen", value: "Wöchentlich" },
    ],
  },
  "b2b-saas-organic-revenue-seo": {
    title: "3,4-facher organischer Umsatz für einen B2B-Softwareanbieter",
    client: "Ein nordamerikanischer Softwareanbieter für Prozessautomatisierung nach seiner zweiten großen Finanzierungsrunde",
    industry: "Software",
    service: "Suchmaschinenoptimierung",
    duration: "12-monatiges Programm",
    summary:
      "Wir haben den organischen Kanal dieses Softwareanbieters vollständig neu aufgebaut: einen hreflang-Fehler im Redaktionssystem behoben, der die Platzierungen außerhalb der USA unbemerkt deckelte, 380 dünne Blogartikel zu 42 nach Suchabsicht geordneten Themenseiten zusammengeführt und produktnahe Inhalte für die spezifischen Nischenbegriffe veröffentlicht, nach denen Nutzer tatsächlich suchen. Ab dem neunten Monat war die organische Suche die größte Quelle für Vertriebschancen.",
    challenge:
      "Trotz eines aktiven internen Redaktionsteams stagnierten die organischen Zugriffe seit 18 Monaten. Die Platzierungen außerhalb der USA waren unerklärlich schwach; eine Migration des Redaktionssystems zwei Jahre zuvor hatte verwaiste Adressen, doppelte Vorlagenseiten und eine fehlerhafte Kanonisierung hinterlassen, und die Produktseiten lagen vier Klicks von der Startseite entfernt. Das gesamte Wachstum hing an bezahlter Kundengewinnung.",
    approach: [
      "Vollständige technische Prüfung (Search Console, Sitebulb, Serverprotokolle) – Ermittlung und Behebung einer hreflang-Schleife, die alle Seiten für Großbritannien, Australien und Deutschland aus dem Index drängte",
      "Neuordnung der Informationsarchitektur: Zusammenführung von 380 Blogartikeln zu 42 Themenseiten mit sauberen internen Verlinkungsknoten und klarer Kanonisierung",
      "Suchbegriffsstrategie nach Suchabsicht: 1.400 Zielanfragen, gruppiert nach Kaufphase und Produktbereich, priorisiert nach Umsatzpotenzial statt nur nach Suchvolumen",
      "Produktnahes Inhaltsprogramm: sechs ausführliche Fachartikel pro Monat von erfahrenen Strategen mit Beiträgen des Produktteams sowie 18 Zielseiten für Anwendungsfälle",
      "Digitale Pressearbeit: 24 Veröffentlichungen in Fachmedien über neun Monate zum Aufbau thematischer Autorität im Bereich Prozessautomatisierung",
      "Konversionsarbeit: Neugestaltung der Seiten in der mittleren Trichterphase mit eingebetteten Produkttouren, wodurch die Quote von der Produktvorführung zur Registrierung um 31 % stieg",
    ],
    headlineOutcomes: [
      { label: "Organischer Umsatz", value: "+241 %" },
      { label: "Platzierte Suchbegriffe", value: "+1.800" },
      { label: "Vertriebschancen aus organischer Suche", value: "4,1 Mio. USD" },
    ],
    outcomes: [
      { label: "Organischer Umsatz", value: "+241 %" },
      { label: "Platzierte Suchbegriffe", value: "+1.800" },
      { label: "Durchschnittliche Position", value: "12 → 4,7" },
      { label: "Gebuchte Produktvorführungen pro Monat", value: "+186 %" },
      { label: "Organische Zugriffe außerhalb der USA", value: "+412 %" },
      { label: "Vertriebschancen aus organischer Suche", value: "4,1 Mio. USD" },
    ],
  },
  "international-seo-launch-9-markets": {
    title: "Internationale Suchmaschinenoptimierung für 9 Märkte",
    client: "Eine Onlinemarke mit Direktvertrieb aus dem deutschsprachigen Raum",
    industry: "Onlinehandel",
    service: "Suchmaschinenoptimierung und Lokalisierung",
    duration: "6 Monate bis zum Start, danach laufend",
    summary:
      "Zusammenführung und Neustart von neun Länderseiten: Ablösung verstreuter Länderdomains durch eine einzige starke Domain mit Unterverzeichnissen, Neuaufbau von hreflang und Veröffentlichung muttersprachlicher, lokalisierter Inhalte in neun Sprachen in Abstimmung mit unserem Übersetzungsteam. Der nicht englischsprachige organische Umsatz stieg im ersten Jahr auf mehr als das Vierfache.",
    challenge:
      "Die bisherige Präsenz verteilte sich auf neun getrennte Länderdomains, jede eine kleine Website ohne gemeinsame Autorität. hreflang war in allen Sprachversionen falsch umgesetzt, interne Links reichten nicht über Domaingrenzen hinweg, und die meisten Übersetzungen waren maschinell erzeugt – was Google offensichtlich bemerkt hatte. Außerhalb des Heimatmarktes rankte die Marke kaum für Kategoriebegriffe, geschweige denn für Produkte.",
    approach: [
      "Architekturentscheidung: Migration aller neun Länderdomains in Unterverzeichnisse der stärksten Domain, mit vollständig abgebildetem 301-Weiterleitungsplan und Weiterleitungstests je Sprache, um die Linkautorität zu erhalten",
      "Neuaufbau von hreflang: wechselseitige, selbstreferenzierende Verweise mit Standardverweis (x-default) auf 12.000 Seiten, wöchentlich über den Bericht zur internationalen Ausrichtung in der Search Console geprüft",
      "Lokalisierte Suchbegriffsrecherche je Markt durch Muttersprachler – keine Übersetzung der englischen Liste –, die 2.300 kaufnahe Suchbegriffe aufdeckte, die Wettbewerber übersehen hatten",
      "Neufassung von 640 Kategorie- und Produktseiten durch muttersprachliche Sprachexperten (transkreiert, nicht übersetzt) mit landesspezifischen Bildern, Größen und Währungen",
      "Lokaler Linkaufbau und digitale Pressearbeit in jedem Markt durch Fachleute vor Ort mit insgesamt über 180 Veröffentlichungen in der jeweiligen Landessprache",
      "Optimierung der Ladezeit- und Stabilitätskennzahlen je Sprachversion – Behebung von Layoutverschiebungen durch regionales Schriftladen und springende Titelbilder",
    ],
    headlineOutcomes: [
      { label: "Gestartete Märkte", value: "9" },
      { label: "Organische Zugriffe außerhalb des Englischen", value: "+318 %" },
      { label: "Organischer Umsatz", value: "+274 %" },
    ],
    outcomes: [
      { label: "Gestartete Märkte", value: "9" },
      { label: "Organische Zugriffe außerhalb des Englischen", value: "+318 %" },
      { label: "Indexierte Seiten", value: "+12.000" },
      { label: "Organischer Umsatz", value: "+274 %" },
      { label: "Durchschnittlicher Bestellwert international", value: "+22 %" },
      { label: "Platzierungen auf Seite eins", value: "1.940" },
    ],
  },
};
