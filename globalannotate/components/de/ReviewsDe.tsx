import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Stars from "@/components/Stars";
import ReviewForm from "@/components/ReviewForm";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import ReviewAuthor from "@/components/ReviewAuthor";
import PageHero from "@/components/PageHero";
import { reviews } from "@/data/reviews";
import { localizeReview } from "@/data/reviews.zh";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { portfolioHeroSlides } from "@/lib/images";
import { deSlides } from "@/lib/images.de";
import { deLd, DE_HOME } from "@/lib/de";

const linkCls =
  "font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline";

// /de/reviews — German client reviews page.
export default function ReviewsDe() {
  const list = reviews.map((r) => localizeReview(r, "de"));
  const avg = list.length ? list.reduce((sum, r) => sum + r.rating, 0) / list.length : 0;

  return (
    <>
      <JsonLd
        data={deLd(
          breadcrumbSchema([
            { name: DE_HOME, url: `${site.url}/de` },
            { name: "Kundenbewertungen", url: `${site.url}/de/reviews` },
          ])
        )}
      />
      <PageHero
        eyebrow="Kundenbewertungen"
        breadcrumbs={[
          { name: DE_HOME, href: "/" },
          { name: "Kundenbewertungen", href: "/reviews" },
        ]}
        title="Kundenbewertungen zu Übersetzung und Lokalisierung: Vertrauen weltweiter Teams."
        subtitle="Was Kunden nach der Zusammenarbeit mit uns sagen."
        slides={deSlides(portfolioHeroSlides)}
        size="compact"
      />

      <Section className="pt-12 md:pt-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-4 rounded-xl border border-ink-200 bg-white px-5 py-3">
            <div>
              <div className="font-display text-2xl font-semibold leading-none">
                {avg.toFixed(1)}
                <span className="text-ink-400 text-base font-normal"> / 5</span>
              </div>
              <div className="mt-1.5">
                <Stars value={avg} />
              </div>
            </div>
            <div className="h-10 w-px bg-ink-200" />
            <div className="text-sm text-ink-600">
              Basierend auf <span className="font-semibold text-ink-900">{list.length}</span> Kundenbewertungen.
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((r, i) => (
            <Reveal key={`${r.name}-${i}`} delay={i * 0.04}>
              <article className="card p-6 h-full flex flex-col">
                <Stars value={r.rating} />
                <p className="mt-4 text-ink-800 leading-relaxed flex-1">„{r.quote}“</p>
                <div className="mt-5 pt-4 border-t border-ink-100">
                  <ReviewAuthor review={r} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-card border-y border-ink-200/70 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="badge">Bewertung abgeben</span>
            <h2 className="section-h2 mt-4 text-ink-900">Haben Sie mit uns gearbeitet? Wir freuen uns auf Ihre Rückmeldung.</h2>
            <p className="mt-4 text-ink-600 leading-relaxed">
              Ehrliches Feedback hilft künftigen Kunden. Jede Einsendung wird vor der Veröffentlichung geprüft. Neu hier? Sehen Sie sich unsere{" "}
              <Link href="/services" className={linkCls}>
                Leistungen
              </Link>
              ,{" "}
              <Link href="/portfolio" className={linkCls}>
                Referenzen
              </Link>
              {" "}an oder{" "}
              <Link href="/about" className={linkCls}>
                lernen Sie das Team kennen
              </Link>
              .
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink-700">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" />
                Ehrliche Rückmeldungen sind ausdrücklich erwünscht – positive wie kritische.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" />
                Wir bearbeiten keine Bewertungen. Beiträge, die gegen unsere Richtlinien verstoßen, können wir ablehnen.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500" />
                Sie bestimmen, wie Ihr Name erscheint – vollständig, mit Initiale, nur mit Funktion oder ganz anonym.
              </li>
            </ul>
          </div>

          <ReviewForm />
        </div>
      </Section>
    </>
  );
}

export const DE_META = {
  title: "Kundenbewertungen Übersetzung | GlobalAnnotate",
  description:
    "Kundenbewertungen zur Übersetzung afrikanischer Sprachen, Lokalisierung, KI-Datenannotation, SEO und digitalem Marketing von GlobalAnnotate.",
};
