import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import AirtableEmbed from "@/components/AirtableEmbed";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { aboutHeroSlides } from "@/lib/images";
import { deSlides } from "@/lib/images.de";
import { deLd, DE_HOME } from "@/lib/de";
import { Briefcase, BadgeDollarSign, Globe2, HeartHandshake } from "lucide-react";

const WHY = [
  {
    icon: Briefcase,
    title: "Echte Projekte, echte Kunden",
    body: "Arbeiten Sie an laufenden Aufträgen für Softwareanbieter, Onlinehändler, Gesundheitswesen, Bildungstechnologie, KI-Labore und Spielestudios – nicht an Testseiten.",
  },
  {
    icon: BadgeDollarSign,
    title: "Faire, transparente Vergütung",
    body: "Klare, vorab vereinbarte Sätze, keine undurchsichtigen Abzüge und verlässliche Zahlung zu den vereinbarten Bedingungen.",
  },
  {
    icon: Globe2,
    title: "Hohe Nachfrage nach seltenen Sprachpaaren",
    body: "Wir suchen gezielt Muttersprachler unterversorgter afrikanischer und asiatischer Sprachen – Ihr Sprachpaar ist bei uns ein Gewinn.",
  },
  {
    icon: HeartHandshake,
    title: "Ein Team, das Sprachexperten wertschätzt",
    body: "Eine verantwortliche Projektleitung, realistische Fristen, vollständiger Kontext sowie die Glossare und Referenzen, die Sie für hervorragende Arbeit brauchen.",
  },
];

const linkCls =
  "font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline";

// /de/freelancers — German intro, benefits, and CTA. The Airtable
// application form itself is embedded unchanged.
export default function FreelancersDe() {
  return (
    <>
      <link rel="preconnect" href="https://airtable.com" />
      <JsonLd
        data={deLd(
          breadcrumbSchema([
            { name: DE_HOME, url: `${site.url}/de` },
            { name: "Netzwerk beitreten", url: `${site.url}/de/freelancers` },
          ])
        )}
      />
      <PageHero
        eyebrow="Netzwerk beitreten"
        breadcrumbs={[
          { name: DE_HOME, href: "/" },
          { name: "Netzwerk beitreten", href: "/freelancers" },
        ]}
        title="Treten Sie dem GlobalAnnotate-Netzwerk für afrikanische Sprachen bei"
        subtitle="Wir bauen ein Netzwerk aus professionellen Übersetzern, Lokalisierungsfachleuten, Annotatoren für KI-Daten und Sprechern auf – insbesondere Muttersprachlern unterversorgter afrikanischer und asiatischer Sprachen. Bewerben Sie sich unten; wir melden uns, sobald Projekte zu Ihren Fähigkeiten passen."
        slides={deSlides(aboutHeroSlides)}
        size="compact"
      />

      <Section className="pt-12 md:pt-16">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">
            Warum mit uns arbeiten
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">Von Sprachexperten für Sprachexperten.</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.05}>
              <div className="card p-6 h-full">
                <w.icon className="h-6 w-6 text-brand-600" />
                <h3 className="mt-4 text-lg font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-4 pb-24">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-24">
            <h2 className="section-h2 text-ink-900">Bewerben Sie sich für das Netzwerk</h2>
            <p className="mt-4 text-ink-600 leading-relaxed">
              Nennen Sie uns Ihre Sprachen, Leistungen und Erfahrung. Pflichtfelder sind mit einem Sternchen gekennzeichnet. Wir speichern Ihre Angaben und melden uns, wenn ein Projekt zu Ihren Fähigkeiten passt.
            </p>
            <p className="mt-4 text-sm text-ink-600 leading-relaxed">
              Möchten Sie uns zuerst kennenlernen? Sehen Sie sich unsere{" "}
              <Link href="/services" className={linkCls}>
                Leistungen
              </Link>
              {" "}an oder lesen Sie mehr über{" "}
              <Link href="/about" className={linkCls}>
                das Team und unseren Gründer
              </Link>
              .
            </p>
          </div>
          <Reveal>
            <AirtableEmbed />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
