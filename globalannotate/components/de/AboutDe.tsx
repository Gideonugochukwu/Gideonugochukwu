import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { Compass, HeartHandshake, Sparkles, Globe2 } from "lucide-react";
import { img, imageBg, unsplash, aboutHeroSlides } from "@/lib/images";
import { deAlt, deSlides } from "@/lib/images.de";
import { site, founder } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { personSchemaDe, DE_FOUNDER_ROLE } from "@/lib/schema.de";
import { deLd, DE_HOME } from "@/lib/de";

const values = [
  { icon: HeartHandshake, title: "Ehrlich aus Prinzip", body: "Wir sagen unseren Kunden die Wahrheit – auch dann, wenn ein Projekt nicht zu uns passt." },
  { icon: Sparkles, title: "Qualität ist nicht verhandelbar", body: "Jedes Ergebnis wird geprüft, bevor es unser Haus verlässt." },
  { icon: Globe2, title: "Weltweit – in der Praxis", body: "Muttersprachliche Fachleute, die in den Märkten leben, die wir bedienen." },
  { icon: Compass, title: "Erfahrene Ansprechpartner ab dem ersten Tag", body: "Sie arbeiten direkt mit einer erfahrenen Projektleitung. Keine Übergaben." },
];

const linkCls =
  "font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline";

// /de/about — German About page, including the founder section.
export default function AboutDe() {
  return (
    <>
      <JsonLd
        data={deLd([
          personSchemaDe(),
          breadcrumbSchema([
            { name: DE_HOME, url: `${site.url}/de` },
            { name: "Über uns", url: `${site.url}/de/about` },
          ]),
        ])}
      />
      <PageHero
        eyebrow="Über GlobalAnnotate"
        breadcrumbs={[
          { name: DE_HOME, href: "/" },
          { name: "Über uns", href: "/about" },
        ]}
        title="Übersetzungsdienstleister aus Nigeria – das Bindeglied für Ihr internationales Wachstum."
        subtitle="Ein Team für Übersetzung, KI-Trainingsdaten, mehrsprachige Suchmaschinenoptimierung und Marketing – mit der Sorgfalt eines Produktunternehmens."
        slides={deSlides(aboutHeroSlides)}
      />

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <h2 className="section-h2 text-ink-900">Unsere Mission</h2>
            <p className="mt-5 text-lg text-ink-600 leading-relaxed">
              Wir helfen ambitionierten Teams, jeden Markt zu erreichen, der ihnen wichtig ist – mit Inhalten, die ankommen, Daten, die überzeugen, und Wachstum, das sich aufbaut. Entdecken Sie die{" "}
              <Link href="/services" className={linkCls}>
                fünf Leistungen
              </Link>
              , die wir in einem einzigen Qualitätssystem erbringen.
            </p>
            <p className="mt-4 text-ink-600 leading-relaxed">
              Hervorragende{" "}
              <Link href="/services/translation-localization" className={linkCls}>
                Lokalisierung
              </Link>
              {" "}und verlässliche{" "}
              <Link href="/services/ai-annotation" className={linkCls}>
                KI-Trainingsdaten
              </Link>
              {" "}sollten nicht Konzernen mit Billionenbewertung vorbehalten sein. Sie sollten jedem zur Verfügung stehen, der etwas Veröffentlichenswertes entwickelt – zu fairen Preisen und in jedem Umfang. Sehen Sie sich die{" "}
              <Link href="/portfolio" className={linkCls}>
                Ergebnisse für unsere Kunden
              </Link>
              {" "}aus Gesundheitstechnologie, Onlinehandel, Bildungstechnologie und KI-Forschung an.
            </p>
          </div>
          <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${imageBg}`}>
            <Image
              src={unsplash(img.about.office.id, 1600)}
              alt={deAlt(img.about.office.id)}
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover photo-treat"
            />
          </div>
        </div>
      </Section>

      <Section id="founder" className="bg-card border-y border-ink-200/70">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <figure
            className={`relative aspect-[4/3] rounded-2xl overflow-hidden lg:order-1 ${imageBg}`}
          >
            <Image
              src="/gideon.jpeg"
              alt="Gideon Ugochukwu, Gründer und leitender Sprachexperte von GlobalAnnotate"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover object-top"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(15,23,42,0) 45%, rgba(15,23,42,0.75) 100%)",
              }}
            />
            <figcaption className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">
              <div className="font-display text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                {founder.name}
              </div>
              <div className="mt-1 text-sm text-white/75">
                {DE_FOUNDER_ROLE}, GlobalAnnotate
              </div>
            </figcaption>
          </figure>
          <div className="lg:order-0">
            <p className="text-sm font-medium uppercase tracking-[0.20em] text-brand-700">
              Gründer
            </p>
            <h2 className="section-h2 mt-3 text-ink-900">{founder.name}</h2>
            <p className="mt-2 text-base sm:text-lg font-medium text-ink-700">
              {DE_FOUNDER_ROLE}, GlobalAnnotate
            </p>
            <p className="mt-6 text-ink-700 leading-relaxed">
              Gideon Ugochukwu ist Gründer und leitender Sprachexperte von GlobalAnnotate. Als freiberuflicher Sprachexperte und Übersetzer hat er die Agentur gegründet, damit Teams jeder Größe hochwertige Lokalisierung und verlässliche Trainingsdaten erhalten. Er leitet ein verteiltes Team muttersprachlicher Fachleute in über 30 Ländern.
            </p>
            <p className="mt-4 text-ink-700 leading-relaxed">
              Seine Arbeit umfasst{" "}
              <Link href="/services/translation-localization" className={linkCls}>
                Übersetzung und Lokalisierung
              </Link>
              ,{" "}
              <Link href="/services/ai-annotation" className={linkCls}>
                KI-Datenannotation
              </Link>
              ,{" "}
              <Link href="/services/digital-marketing" className={linkCls}>
                digitales Marketing
              </Link>
              {" "}und{" "}
              <Link href="/services/seo" className={linkCls}>
                mehrsprachige Suchmaschinenoptimierung (SEO)
              </Link>
              {" "}in über 100 Sprachen sowie{" "}
              <Link href="/services/game-localization" className={linkCls}>
                Spielelokalisierung
              </Link>
              {" "}– die fünf Leistungen, die GlobalAnnotate in einem Qualitätssystem erbringt. Vor der Gründung arbeitete Gideon als selbstständiger Übersetzer und Sprachexperte und stieß immer wieder auf dasselbe Problem: Jedes grenzüberschreitende Projekt brauchte drei Dienstleister, drei Auftragsbeschreibungen und drei Qualitätsmaßstäbe. GlobalAnnotate gibt es, um diese Reibung zu beseitigen.
            </p>
            <p className="mt-4 text-ink-700 leading-relaxed">
              Heute arbeiten er und sein Team mit Softwareanbietern, Onlinehändlern, Plattformen für digitale Gesundheit, Bildungstechnologie-Unternehmen und KI-Laboren zusammen, um Produkte und Inhalte in jedem relevanten Markt zu veröffentlichen. Das Prinzip ist einfach: eine erfahrene Projektleitung ab dem ersten Tag, Muttersprachler für jede Sprache und ein dokumentierter Prozess der Qualitätssicherung hinter jedem Ergebnis. Lesen Sie,{" "}
              <Link href="/reviews" className={linkCls}>
                was unsere Kunden sagen
              </Link>
              , oder{" "}
              <Link href="/contact" className={linkCls}>
                starten Sie ein Projekt
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-2xl">
          <span className="badge">Unsere Werte</span>
          <h2 className="section-h2 mt-4 text-ink-900">Wie wir auftreten – gegenüber Kunden und untereinander.</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <div className="card p-6 h-full">
                <v.icon className="h-6 w-6 text-brand-600" />
                <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pb-24">
        <CTABand />
      </Section>
    </>
  );
}
