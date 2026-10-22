import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { deSlides } from "@/lib/images.de";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { deLd, DE_HOME } from "@/lib/de";
import { ArrowRight } from "lucide-react";

type ImageRef = { id: string; alt: string };

export type DeLandingContent = {
  meta: { title: string; description: string };
  crumb: string;
  eyebrow: string;
  h1: string;
  intro: string;
  serviceName: string;
  serviceType: string;
  areaServed: string;
  // Article body as HTML (h2/h3/p/ul/ol/a), rendered with .prose-section.
  // Internal links use /de/… paths.
  body: string;
  faq: { q: string; a: string }[];
  ctaHeading: string;
  ctaBody: string;
};

// Long-form German landing page (/de/uebersetzung-afrika,
// /de/lokalisierung-spiele): hero, article body, FAQ (FAQPage schema) and a
// call to action pointing to /de/contact.
export default function DeLandingPage({
  path,
  content,
  slides,
}: {
  path: string;
  content: DeLandingContent;
  slides: ImageRef[];
}) {
  const url = `${site.url}/de${path}`;
  return (
    <>
      <JsonLd
        data={deLd([
          serviceSchema({
            name: content.serviceName,
            description: content.meta.description,
            url,
            areaServed: content.areaServed,
            serviceType: content.serviceType,
          }),
          faqSchema(content.faq),
          breadcrumbSchema([
            { name: DE_HOME, url: `${site.url}/de` },
            { name: content.crumb, url },
          ]),
        ])}
      />

      <PageHero
        eyebrow={content.eyebrow}
        breadcrumbs={[
          { name: DE_HOME, href: "/" },
          { name: content.crumb, href: path },
        ]}
        title={content.h1}
        subtitle={content.intro}
        ctas={[
          { label: "Angebot anfordern", href: "/contact" },
          { label: "Alle Sprachen ansehen", href: "/languages", variant: "ghost" },
        ]}
        slides={deSlides(slides)}
      />

      <Section className="pt-16 md:pt-24">
        <article className="prose-section max-w-3xl">
          <div dangerouslySetInnerHTML={{ __html: content.body }} />
        </article>
      </Section>

      <Section className="bg-card border-y border-ink-200/70">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">Häufige Fragen</p>
          <h2 className="section-h2 mt-4 text-ink-900">Antworten auf die wichtigsten Fragen</h2>
          <dl className="mt-10 divide-y divide-ink-200/70">
            {content.faq.map((f) => (
              <div key={f.q} className="py-6">
                <dt className="text-lg font-semibold text-ink-900">{f.q}</dt>
                <dd className="mt-3 text-ink-600 leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-12">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="section-h2 text-ink-900">{content.ctaHeading}</h2>
              <p className="mt-4 text-ink-700 leading-relaxed">{content.ctaBody}</p>
            </div>
            <div className="lg:text-right">
              <Link href="/contact" className="btn-primary text-sm">
                Projekt besprechen <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pb-24">
        <CTABand />
      </Section>
    </>
  );
}
