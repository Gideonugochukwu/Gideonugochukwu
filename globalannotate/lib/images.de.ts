// German alt text for every Unsplash photo in lib/images.ts, keyed by photo
// ID. /de pages run their image refs and hero slides through `deImage` /
// `deSlides` so no English alt text reaches the German locale.

type ImageRef = { id: string; alt: string };

export const DE_ALT: Record<string, string> = {
  "1521737711867-e3b97375f902": "Vielfältiges Team arbeitet in einem hellen, modernen Büro gemeinsam am Laptop",
  "1521791136064-7986c2920216": "Hände von Menschen unterschiedlicher Herkunft liegen übereinander – Sinnbild für Übersetzung und Verständigung über Sprachgrenzen hinweg",
  "1573164713988-8665fc963095": "Ingenieurin prüft Programmcode und KI-Trainingsdaten am Arbeitsplatz",
  "1460925895917-afdab827c52f": "Auswertung mit Wachstumskurven auf einem Laptop-Bildschirm",
  "1551288049-bebda4e38f71": "Laptop mit Suchanalysen und Platzierungen von Suchbegriffen – mehrsprachige Suchmaschinenoptimierung",
  "1493711662062-fa541adb3fc8": "Kabelloser Spielecontroller als Symbol für Spielelokalisierung",
  "1522071820081-009f0129c71c": "Gremium muttersprachlicher Nutzer prüft Inhalte vor der Markteinführung",
  "1483985988355-763728e1935b": "Einkaufstüten als Symbol für Onlinehandel",
  "1518770660439-4636190af475": "Makroaufnahme einer grünen Leiterplatte als Symbol für Technologie und Daten",
  "1538108149393-fbbd81895907": "Ärztin bei der Arbeit in einer modernen medizinischen Einrichtung",
  "1611974789855-9c2a0a7236a3": "Börsencharts als Symbol für Finanzwesen und Finanztechnologie",
  "1488646953014-85cb44e25828": "Reiseplanung mit Landkarte, Kamera und Notizbuch",
  "1485846234645-a62644f84728": "Professionelle Filmkamera als Symbol für Medien und Unterhaltung",
  "1523580494863-6f3031224c94": "Studierende arbeiten gemeinsam an einem Tisch – Bildungsbranche",
  "1576091160550-2173dba999ef": "Arzt nutzt ein Tablet für eine Gesundheits-App für Patienten",
  "1591453089816-0fbb971b454c": "Serverreihen in einem Rechenzentrum als Infrastruktur für das Training von Wahrnehmungsmodellen",
  "1571781926291-c477ebfd024b": "Hochwertige Hautpflegeprodukte einer nachhaltigen Kosmetikmarke",
  "1573497019418-b400bb3ab074": "Entwicklerin schreibt Programmcode – Arbeit an Datensätzen für Sprachmodelle",
  "1512453979798-5ea266f8880c": "Moderne Stadtsilhouette von Dubai in der Abenddämmerung – Markteinführung in den Vereinigten Arabischen Emiraten",
  "1509062522246-3755977927d7": "Mehrsprachiges Klassenzimmer – Datensätze für indische Sprachen",
  "1505751172876-fa1923c5c528": "Klinisches Team prüft Patientendaten auf einem Tablet in einer Telemedizin-Anwendung",
  "1441986300917-64674bd600d8": "Kleiderstange einer Boutique – Modemarke im Direktvertrieb",
  "1456406644174-8ddd4cd52a06": "Laptop, Notizbuch und Brille auf einem Schreibtisch – Lernplattform im Internet",
  "1611162617213-7d7a39e9b1d7": "Smartphone mit Beiträgen in sozialen Medien – Inhalte und Betreuung der Online-Gemeinschaft",
  "1451187580459-43490279c0fa": "Die Erde bei Nacht aus dem All mit den Lichtern der Städte – internationale Märkte und mehrsprachige Suchmaschinenoptimierung",
  "1497366216548-37526070297c": "Helles, modernes Büro mit gemeinsamen Arbeitsplätzen",
  "1573497019940-1c28c88b4f3e": "Zwei Kolleginnen arbeiten gemeinsam am Laptop",
};

export function deAlt(id: string, fallback = "Bild von GlobalAnnotate"): string {
  return DE_ALT[id] ?? fallback;
}

export function deImage<T extends ImageRef>(ref: T): T {
  return { ...ref, alt: deAlt(ref.id) };
}

export function deSlides(slides: ImageRef[]): ImageRef[] {
  return slides.map(deImage);
}
