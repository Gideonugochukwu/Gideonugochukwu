import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import { site } from "@/lib/site";
import { servicesHeroSlides } from "@/lib/images";
import { deAlt, deSlides } from "@/lib/images.de";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { deLd, DE_HOME } from "@/lib/de";
import {
  AlertTriangle,
  Users,
  Wrench,
  FileCheck2,
  ShieldCheck,
  Globe2,
  Layers,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const DESCRIPTION =
  "Der einzige Übersetzungsdienst, der Ihre Inhalte vor der Markteinführung mit echten muttersprachlichen Nutzern prüft. Vermeiden Sie kostspielige kulturelle Fehltritte und erhalten Sie bestätigt marktreife Inhalte.";

const STATS = [
  { value: "39%", body: "der Marketingverantwortlichen geben an, dass ihr schwerster Lokalisierungsfehler mehr als 10.000 USD gekostet hat." },
  { value: "29%", body: "sagen, dass eine schlechte Übersetzung dem Ruf ihrer Marke geschadet hat." },
  { value: "55%", body: "der Nutzer geben an, dass maschinelle Übersetzung sie in informellen Zusammenhängen im Stich lässt." },
];

const MISTAKES = [
  { brand: "HSBC", line: "Der weltweite Slogan „Assume Nothing“ wurde in mehreren Märkten zu „Tu nichts“." },
  { brand: "KFC", line: "„Finger-lickin’ good“ kam in China Berichten zufolge als „Iss deine Finger auf“ an." },
];

const STEPS = [
  {
    icon: Layers,
    tag: "Schritt 1",
    title: "Übersetzung und linguistische Qualitätssicherung",
    body: "Muttersprachliche Sprachexperten übersetzen, eine zweite Prüfinstanz kontrolliert Genauigkeit, Terminologie und Einheitlichkeit – der Schritt, den jede seriöse Agentur geht.",
  },
  {
    icon: Users,
    tag: "Schritt 2",
    title: "Gremium zur kulturellen Validierung",
    body: "3–5 echte Muttersprachler in Ihrem Zielmarkt – keine Übersetzer – prüfen die Inhalte im Blindtest und bewerten Natürlichkeit, kulturelle Passung, Tonalität, Verständlichkeit und Sensibilität. Diesen Schritt geht sonst niemand.",
  },
  {
    icon: Wrench,
    tag: "Schritt 3",
    title: "Behebung der Befunde",
    body: "Kritische und schwerwiegende Befunde des Gremiums werden von unseren Sprachexperten behoben und erneut geprüft – so werden Probleme vor der Markteinführung gefunden und geschlossen, nicht danach.",
  },
  {
    icon: FileCheck2,
    tag: "Schritt 4",
    title: "Bericht zur Marktreife",
    body: "Sie erhalten eine unterzeichnete Bestätigung: ein greifbares Dokument, das belegt, dass echte Nutzer die Inhalte geprüft und für Ihren Markt freigegeben haben.",
  },
];

const WHY = [
  {
    icon: FileCheck2,
    title: "Ein greifbarer Nachweis",
    body: "Legen Sie den MarketReady-Bericht Ihrer Marketingleitung, Ihrer Rechtsabteilung oder Ihrem Vorstand vor: „Diese Inhalte wurden vor der Markteinführung mit echten Nutzern getestet.“ Sicherheit, die Sie schwarz auf weiß haben.",
  },
  {
    icon: ShieldCheck,
    title: "Günstiger als eine Krise",
    body: "Ein Gremium aus fünf Personen kostet nur einen Bruchteil einer Markenkrise, eines Rückrufs oder eines eiligen Rebrandings nach dem Start.",
  },
  {
    icon: Globe2,
    title: "Entscheidend für schwierige Märkte",
    body: "Besonders wichtig in afrikanischen, asiatischen und nahöstlichen Märkten – dort, wo kulturelle Feinheiten am größten und qualifizierte Prüfer am schwersten zu finden sind.",
  },
];

const EDGE = [
  {
    title: "Gremien, die andere nicht erreichen",
    body: "Muttersprachliche Prüfgremien in Märkten, die sonst niemand abdeckt – Hausa, Yoruba, Wolof, Igbo, Amharisch, Swahili, Somali und Zulu – sowie in den großen europäischen, asiatischen und nahöstlichen Märkten.",
  },
  {
    title: "Echte Verbraucher statt Sprachexperten",
    body: "Keine Übersetzer, sondern echte Menschen vor Ort, die Ihre tatsächliche Zielgruppe repräsentieren und so reagieren wie Ihre Kunden.",
  },
  {
    title: "Ein Team, ein Bericht",
    body: "Von der Übersetzung bis zur Validierung: ein Team und ein Prozess – mit einem einzigen unterzeichneten Bericht zur Marktreife am Ende.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Was ist MarketReady, und worin unterscheidet es sich vom Korrekturlesen?",
    a: "MarketReady ist eine kulturelle Validierung vor der Markteinführung. Das Korrekturlesen prüft, ob die Wörter sprachlich korrekt sind; MarketReady prüft, ob die Inhalte tatsächlich wirken. Drei bis fünf echte Muttersprachler in Ihrem Zielmarkt prüfen sie im Blindtest und bewerten Natürlichkeit, kulturelle Passung, Tonalität, Verständlichkeit und Sensibilität – bevor Sie starten.",
  },
  {
    q: "Wer sitzt in den Gremien, und wie werden die Mitglieder ausgewählt?",
    a: "Echte Verbraucher, die im Zielmarkt leben und zu Ihrer Zielgruppe passen – keine Übersetzer oder Sprachexperten. Wir gewinnen und prüfen sie für jedes Projekt nach Markt, Bevölkerungsgruppe und Sprachebene, damit ihre Reaktion der Ihrer tatsächlichen Kunden entspricht.",
  },
  {
    q: "Um wie viel verlängert sich mein Projekt?",
    a: "In der Regel um 3–5 Werktage für die Zusammenstellung des Gremiums, den Blindtest und den Bericht – meist parallel zur abschließenden Qualitätssicherung, sodass sich Ihr Starttermin selten verschiebt. Größere Programme für mehrere Märkte planen wir vorab.",
  },
  {
    q: "Kann ich MarketReady auch für Inhalte nutzen, die eine andere Agentur übersetzt hat?",
    a: "Ja. MarketReady funktioniert als eigenständige Validierungsstufe für beliebige Inhalte, auch für bereits vorhandene Übersetzungen. Wir lassen sie von Muttersprachlern prüfen und liefern denselben unterzeichneten Bericht zur Marktreife.",
  },
  {
    q: "Für welche Märkte können Sie validieren?",
    a: "Für über 100 Sprachen, mit Gremien in Märkten, die die meisten Agenturen nicht erreichen – darunter Hausa, Yoruba, Wolof, Igbo, Amharisch, Swahili, Somali und Zulu – sowie in den großen europäischen, asiatischen und nahöstlichen Märkten.",
  },
];

const SCHEMA_FAQ = [
  {
    q: "Was ist die MarketReady™ kulturelle Validierung?",
    a: "MarketReady ist das eigene Verfahren von GlobalAnnotate zur kulturellen Validierung vor der Markteinführung. Vor der Lieferung prüfen 3–5 echte Muttersprachler im Zielmarkt die übersetzten Inhalte und bestätigen, dass sie wirken.",
  },
  {
    q: "Worin unterscheidet sich MarketReady vom Korrekturlesen?",
    a: "Das Korrekturlesen prüft die sprachliche Richtigkeit. MarketReady testet, ob die Inhalte bei echten Menschen funktionieren – mit Blick auf Natürlichkeit, kulturelle Angemessenheit, Tonalität, Verständlichkeit und Sensibilität.",
  },
  {
    q: "Um wie viel verlängert MarketReady die Projektlaufzeit?",
    a: "Das Prüfgremium benötigt in der Regel 24–48 Stunden, je nach Sprache und Inhaltsart.",
  },
  {
    q: "Kann ich MarketReady für Inhalte nutzen, die eine andere Agentur übersetzt hat?",
    a: "Ja. MarketReady kann jede übersetzte Fassung validieren – unabhängig davon, wer sie übersetzt hat.",
  },
  {
    q: "Welche Sprachen kann GlobalAnnotate validieren?",
    a: "Alle über 100 Sprachen, die wir abdecken, mit besonderer Tiefe bei afrikanischen Sprachen, in denen kulturelle Feinheiten am größten und qualifizierte Prüfer am schwersten zu finden sind.",
  },
];

// /de/services/marketready — German MarketReady™ page.
export default function MarketReadyDe() {
  const url = `${site.url}/de/services/marketready`;
  const heroId = "1522071820081-009f0129c71c";
  const heroSlides = [{ id: heroId, alt: deAlt(heroId) }, ...deSlides(servicesHeroSlides)];

  return (
    <>
      <JsonLd
        data={deLd([
          serviceSchema({
            name: "MarketReady™ kulturelle Validierung",
            description: DESCRIPTION,
            url,
            areaServed: "Weltweit",
            serviceType: "Kulturelle Validierung vor der Markteinführung",
          }),
          faqSchema(SCHEMA_FAQ),
          breadcrumbSchema([
            { name: DE_HOME, url: `${site.url}/de` },
            { name: "Leistungen", url: `${site.url}/de/services` },
            { name: "MarketReady™ kulturelle Validierung", url },
          ]),
        ])}
      />

      <PageHero
        eyebrow="MarketReady™ · Kulturelle Validierung"
        breadcrumbs={[
          { name: DE_HOME, href: "/" },
          { name: "Leistungen", href: "/services" },
          { name: "MarketReady™ kulturelle Validierung", href: "/services/marketready" },
        ]}
        title="Kulturelle Validierung Ihrer Übersetzung: MarketReady™ ist der einzige Übersetzungsdienst, der garantiert, dass Ihre Inhalte im Zielmarkt wirken."
        subtitle="Andere Agenturen liefern Übersetzungen. Wir liefern marktreife Inhalte – geprüft von echten Muttersprachlern, bevor Sie starten."
        ctas={[
          { label: "Beratung anfragen", href: "/contact" },
          { label: "Alle Leistungen", href: "/services", variant: "ghost" },
        ]}
        slides={heroSlides}
      />

      <Section className="pt-24 md:pt-32">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            <AlertTriangle className="h-4 w-4" /> Das Problem
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">Auch eine „korrekte“ Übersetzung kann Ihrer Marke schaden.</h2>
          <p className="mt-5 text-lg text-ink-600 leading-relaxed">
            Jede Übersetzungsagentur prüft, ob die Wörter stimmen. Kaum jemand prüft, ob die Inhalte bei echten Menschen funktionieren – und genau in dieser Lücke entstehen teure, öffentliche Fehler.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal key={s.value} delay={i * 0.05}>
              <div className="card h-full p-7">
                <div className="display-num text-4xl md:text-5xl">{s.value}</div>
                <p className="mt-3 text-sm text-ink-600 leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {MISTAKES.map((m) => (
            <div key={m.brand} className="rounded-2xl border border-ink-200/80 bg-white p-6">
              <p className="text-sm font-semibold text-ink-900">{m.brand}</p>
              <p className="mt-1.5 text-ink-600 leading-relaxed">{m.line}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-ink-600 leading-relaxed">
          Jede dieser Übersetzungen war sprachlich „korrekt“ und hat dennoch dem Markenbild geschadet – denn die Ursache ist nicht schlechte Grammatik, sondern dass niemand die Inhalte mit den Menschen getestet hat, für die sie bestimmt waren.
        </p>
      </Section>

      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            Die Lösung · MarketReady™
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">In vier Schritten von der Übersetzung zur bestätigten Marktreife.</h2>
          <p className="mt-5 text-lg text-ink-600 leading-relaxed">
            MarketReady ergänzt den einen Schritt, den alle anderen Agenturen auslassen – echte Muttersprachler – und endet mit einer unterzeichneten Bestätigung, auf die Sie sich stützen können.
          </p>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-2">
          {STEPS.map((s, i) => {
            const highlight = i === 1;
            return (
              <Reveal key={s.title} delay={i * 0.05}>
                <li
                  className={
                    "h-full rounded-2xl p-7 " +
                    (highlight
                      ? "border-2 border-brand-500 bg-white shadow-[0_20px_60px_-25px_rgba(16,185,129,0.45)]"
                      : "border border-ink-200 bg-white")
                  }
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        "inline-flex h-10 w-10 items-center justify-center rounded-xl " +
                        (highlight ? "bg-brand-500 text-white" : "bg-brand-50 text-brand-700")
                      }
                    >
                      <s.icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand-700">
                      {s.tag}
                      {highlight && (
                        <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] text-brand-700">
                          Unser Unterschied
                        </span>
                      )}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink-900">{s.title}</h3>
                  <p className="mt-2 text-ink-600 leading-relaxed">{s.body}</p>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </Section>

      <Section>
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">Warum es zählt</p>
          <h2 className="section-h2 mt-4 text-ink-900">Ein Nachweis, den Sie Ihrem Vorstand vorlegen können.</h2>
        </div>
        <div className="mt-12 grid gap-8 md:gap-10 md:grid-cols-3">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.05}>
              <div className="border-l-2 border-brand-200 pl-6 py-1">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                  <w.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink-900">{w.title}</h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-card">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
              Der Vorteil von GlobalAnnotate
            </p>
            <h2 className="section-h2 mt-4 text-ink-900">Prüfer, die sonst niemand erreicht.</h2>
            <p className="mt-5 text-ink-600 leading-relaxed">
              Gerade in den Märkten, in denen kulturelle Feinheiten am größten und qualifizierte Prüfer am schwersten zu finden sind.
            </p>
          </div>
          <ul className="grid gap-6 sm:grid-cols-1">
            {EDGE.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.05}>
                <li className="flex items-start gap-4">
                  <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                    <CheckCircle2 className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold tracking-tight text-ink-900">
                      {e.title}
                    </h3>
                    <p className="mt-1.5 text-ink-600 leading-relaxed">{e.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-12">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">Preise</p>
              <h2 className="section-h2 mt-4 text-ink-900">Einfach – und oft bereits enthalten.</h2>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3 text-ink-700">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-600" strokeWidth={2.2} />
                  <span>
                    Bei allen Projekten über 5.000 USD{" "}
                    <strong className="font-semibold text-ink-900">standardmäßig enthalten</strong>
                    .
                  </span>
                </li>
                <li className="flex items-start gap-3 text-ink-700">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-600" strokeWidth={2.2} />
                  <span>
                    Für jedes Übersetzungsprojekt{" "}
                    <strong className="font-semibold text-ink-900">als Zusatzleistung buchbar</strong>
                    {" "}– zu einem festen Preis pro Sprache.
                  </span>
                </li>
              </ul>
            </div>
            <div className="lg:text-right">
              <Link href="/contact" className="btn-primary text-sm">
                Beratung anfragen <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">Häufige Fragen</p>
          <h2 className="section-h2 mt-4 text-ink-900">Ihre Fragen, beantwortet.</h2>
        </div>
        <div className="mt-12 max-w-3xl">
          <FAQ items={FAQ_ITEMS} />
        </div>
      </Section>

      <Section className="pb-24">
        <CTABand />
      </Section>
    </>
  );
}
