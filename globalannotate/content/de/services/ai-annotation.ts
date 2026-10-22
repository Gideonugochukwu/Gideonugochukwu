import type { DeServiceContent } from "../types";

export const aiAnnotationDe: DeServiceContent = {
  meta: {
    title: "KI-Datenannotation mehrsprachig | GlobalAnnotate",
    description:
      "KI-Datenannotation mehrsprachig für Teams im maschinellen Lernen: Bild-, Text- und Audiodaten, RLHF-Präferenzdaten und afrikanische Sprachen.",
  },
  schemaName: "KI-Datenannotation",
  schemaDescription:
    "Präzise Trainingsdaten für Teams in den Bereichen Bildverarbeitung, Sprachverarbeitung und große Sprachmodelle: Begrenzungsrahmen, semantische Segmentierung, Audio- und Textannotation mit strenger Qualitätssicherung.",
  schemaFaq: [
    {
      q: "Was ist KI-Datenannotation?",
      a: "KI-Datenannotation bezeichnet das Kennzeichnen von Daten – Text, Bilder, Audio, Video –, damit Modelle des maschinellen Lernens daraus lernen können. Dazu gehören Aufgaben wie Stimmungsanalyse, Eigennamenerkennung, Bildklassifizierung und Sprachtranskription.",
    },
    {
      q: "In welchen Sprachen annotieren Sie?",
      a: "Wir annotieren in über 100 Sprachen mit Muttersprachlern, darunter afrikanische Sprachen wie Hausa, Yoruba, Amharisch und Swahili, die die meisten Annotationsanbieter nicht abdecken.",
    },
    {
      q: "Welche Qualitätsstandards gelten für die Annotation?",
      a: "Wir arbeiten in jedem Projekt mit Kalibrierung anhand von Goldstandard-Datensätzen, messen die Übereinstimmung zwischen Annotatoren und liefern dokumentierte Qualitätsberichte.",
    },
    {
      q: "Welche Annotationsarten unterstützen Sie?",
      a: "Textklassifizierung, Stimmungsanalyse, Eigennamenerkennung, Absichtserkennung, Präferenzpaare für verstärkendes Lernen aus menschlichem Feedback (RLHF), Sicherheitsbewertungen, Bildannotation, Audiotranskription und Sprachbewertung.",
    },
    {
      q: "Wie groß muss ein Projekt mindestens sein?",
      a: "Wir übernehmen Projekte von 500 bis über 100.000 Datenpunkte. Nennen Sie uns Ihre Anforderungen für ein individuelles Angebot.",
    },
  ],
  eyebrow: "KI-Datenannotation",
  title: "KI-Datenannotation mehrsprachig: Trainingsdaten, denen Ihre Modelle vertrauen können.",
  intro:
    "Saubere, einheitliche und gut dokumentierte Annotationen für Teams in Bildverarbeitung, Sprachverarbeitung und großen Sprachmodellen – vom Pilotprojekt bis zum Produktivbetrieb, in über 100 Sprachen.",
  included: [
    { title: "Bildannotation", body: "Begrenzungsrahmen, Polygone, Schlüsselpunkte, 3D-Quader – in jedem Umfang, mit Qualitätssicherung je Klasse." },
    { title: "Semantische und Instanzsegmentierung", body: "Pixelgenaue Masken für autonomes Fahren, medizinische Bildgebung und Einzelhandel." },
    { title: "Daten für Sprachverarbeitung und Sprachmodelle", body: "Absichtskennzeichnung, Entitätsextraktion, Präferenzdaten, verstärkendes Lernen aus menschlichem Feedback (RLHF) und Modellbewertungen." },
    { title: "Audioannotation", body: "Transkription, Sprechertrennung sowie Kennzeichnung von Emotionen und Ereignissen in über 50 Sprachen." },
    { title: "Videoannotation", body: "Objektverfolgung Bild für Bild, Handlungsklassifizierung und zeitliche Segmentierung." },
    { title: "Qualitätssicherung und Kalibrierung", body: "Mehrstufige Prüfung, Kalibrierung anhand von Goldstandard-Datensätzen und Berichte zur Übereinstimmung zwischen Annotatoren." },
  ],
  useCases: [
    { title: "Teams für Bildverarbeitung", body: "Datensätze in Produktionsqualität für Objekterkennung, Segmentierung, Texterkennung und Posenschätzung." },
    { title: "Teams für Sprachmodelle und wissensgestützte Generierung", body: "Präferenzpaare, Modellbewertungen, gezielte Angriffsszenarien und fachspezifische Anweisungen." },
    { title: "Sprach- und Audio-KI", body: "Mehrsprachige Transkription, nach Akzenten ausgewogene Datensätze und Kennzeichnung von Audioereignissen." },
    { title: "Robotik und autonome Systeme", body: "3D-Quader, Punktwolkenannotation und Kennzeichnungen für Sensorfusion im großen Maßstab." },
  ],
  tiers: [
    {
      name: "Pilot",
      price: "ab 499 USD",
      cadence: "/ Charge",
      description: "Pilotprojekte in passender Größe, um die Qualität vor dem Ausbau zu prüfen.",
      features: ["Bis zu 1.000 Datenpunkte", "Eine Aufgabenart", "Kalibrierung anhand von Goldstandard-Datensätzen", "Qualitätsbericht inklusive"],
    },
    {
      name: "Produktion",
      price: "ab 0,05 USD",
      cadence: "/ Datenpunkt",
      description: "Fortlaufende Annotationsstrecken für die aktive Modellentwicklung.",
      features: [
        "Festes Annotationsteam",
        "Wöchentliche Lieferung",
        "Berichte zur Übereinstimmung zwischen Annotatoren",
        "Individuelle Schemata und Werkzeuge",
        "Abstimmung über einen gemeinsamen Teamkanal",
      ],
      highlighted: true,
    },
    {
      name: "Unternehmen",
      price: "Individuell",
      description: "Regulierte, sensible oder sehr umfangreiche Programme.",
      features: [
        "Lieferung vor Ort oder in Ihrer privaten Cloud",
        "Kontrollen nach anerkannten Sicherheitsstandards",
        "Datenspeicherung in Ihrer Region",
        "Programmbetreuung rund um die Uhr",
        "Individuelle Werkzeuganbindungen",
      ],
    },
  ],
  faq: [
    {
      q: "Mit welchen Werkzeugen arbeiten Sie?",
      a: "Wir arbeiten in Ihren Werkzeugen (Labelbox, CVAT, Scale, V7, Roboflow, Encord, Label Studio) oder richten eigene Annotationsstrecken ein.",
    },
    {
      q: "Wie sichern Sie die Qualität?",
      a: "Jedes Programm umfasst Kalibrierung anhand von Goldstandard-Datensätzen, mehrstufige Prüfung und laufende Messung der Übereinstimmung zwischen Annotatoren – mit einem Qualitätsbericht je Charge.",
    },
    {
      q: "Wie schnell können Sie skalieren?",
      a: "Innerhalb von zwei Wochen wachsen wir von einem fünfköpfigen Fachteam auf über 100 Annotatoren – ohne Qualitätsverlust.",
    },
    {
      q: "Können Sie sensible Daten verarbeiten?",
      a: "Ja – mit Geheimhaltungsvereinbarungen, rollenbasierten Zugriffsrechten, Prüfprotokollen und regionaler Datenverarbeitung.",
    },
    {
      q: "Erstellen Sie RLHF- und Präferenzdaten für Sprachmodelle?",
      a: "Ja. Befolgung von Anweisungen, Prüfungen auf Unbedenklichkeit, Rangfolgen, gezielte Angriffsszenarien und fachspezifische Bewertungen gehören zu unseren Kernkompetenzen.",
    },
  ],
};
