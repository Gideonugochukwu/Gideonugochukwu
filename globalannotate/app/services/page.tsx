import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import ServiceCard, { ServiceIcon } from "@/components/ServiceCard";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { services, site } from "@/lib/site";
import { img, unsplash } from "@/lib/images";
import { breadcrumbSchema } from "@/lib/schema";
import { ArrowRight } from "lucide-react";

const TITLE = "Services — Translation, AI Annotation, SEO & Digital Marketing";
const DESCRIPTION =
  "Four integrated services to help you grow globally: translation & localization, AI annotation, multilingual SEO, and performance digital marketing.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${site.url}/services` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${site.url}/services`,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SERVICE_IMAGES = {
  "translation-localization": img.services.translation,
  "ai-annotation": img.services.aiAnnotation,
  "digital-marketing": img.services.digitalMarketing,
  seo: img.services.seo,
} as const;

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Services", url: `${site.url}/services` },
        ])}
      />
      <Section className="pt-16">
        <div className="max-w-3xl">
          <span className="badge">Services</span>
          <h1 className="display-hero mt-5 text-4xl md:text-6xl lg:text-7xl">
            One toolkit. Every market.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-ink-600 leading-relaxed">
            Four core services that work together — or independently — to help your team move faster across markets.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const image = SERVICE_IMAGES[s.slug as keyof typeof SERVICE_IMAGES];
            return (
              <Reveal key={s.slug} delay={i * 0.05}>
                <ServiceCard
                  slug={s.slug}
                  title={s.title}
                  summary={s.summary}
                  icon={s.icon as ServiceIcon}
                  image={unsplash(image.id, 1200)}
                  alt={image.alt}
                />
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="space-y-6">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.04}>
              <Link
                href={`/services/${s.slug}`}
                id={s.slug}
                className="card p-7 md:p-9 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="max-w-2xl">
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                    {s.title}
                  </h2>
                  <p className="mt-2 text-ink-600 leading-relaxed">{s.summary}</p>
                </div>
                <span className="inline-flex items-center gap-2 font-semibold text-brand-700 group-hover:gap-3 transition-all whitespace-nowrap">
                  View details <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
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
