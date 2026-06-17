import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import QuoteForm from "@/components/QuoteForm";
import JsonLd from "@/components/JsonLd";
import { Mail, Globe2, Clock4 } from "lucide-react";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
import { aboutHeroSlides } from "@/lib/images";

const TITLE = "Contact — Talk to an Expert";
const DESCRIPTION =
  "Tell us about your project and we'll get back to you within one business day with a tailored proposal.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${site.url}/contact` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${site.url}/contact`,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Contact", url: `${site.url}/contact` },
        ])}
      />
      <PageHero
        eyebrow="Get in touch"
        title="Talk to an expert."
        subtitle="Tell us about your project and we'll get back to you within one business day."
        slides={aboutHeroSlides}
        size="compact"
      />

      <Section className="pt-12 md:pt-16 pb-24">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10">
          <div className="space-y-6">
            <div className="card p-6">
              <Mail className="h-5 w-5 text-brand-600" />
              <h3 className="mt-3 font-semibold">Email us directly</h3>
              <p className="mt-1 text-sm text-ink-600">
                General questions, partnerships, or careers.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 inline-block font-medium text-ink-900 hover:text-brand-700 transition"
              >
                {site.email}
              </a>
            </div>

            <div className="card p-6">
              <Clock4 className="h-5 w-5 text-brand-600" />
              <h3 className="mt-3 font-semibold">Response time</h3>
              <p className="mt-1 text-sm text-ink-600">
                Within one business day. Most replies are same-day.
              </p>
            </div>

            <div className="card p-6">
              <Globe2 className="h-5 w-5 text-brand-600" />
              <h3 className="mt-3 font-semibold">Where we work</h3>
              <p className="mt-1 text-sm text-ink-600">
                Native specialists across 30+ countries. Aligned to your time zone.
              </p>
            </div>
          </div>

          <div>
            <h2 className="section-h2 text-ink-900">
              Tell us about your project
            </h2>
            <p className="mt-3 text-ink-600">
              The more context you share, the sharper our proposal. A senior project lead will reply within one business day. Not sure where to start? Skim our{" "}
              <Link
                href="/services"
                className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
              >
                services
              </Link>{" "}
              or recent{" "}
              <Link
                href="/portfolio"
                className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
              >
                case studies
              </Link>{" "}
              first.
            </p>
            <div className="mt-6">
              <QuoteForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
