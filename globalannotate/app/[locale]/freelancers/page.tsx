import type { Metadata } from "next";
import { buildMetadata } from "@/lib/i18n-meta";
import Link from "next/link";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import AirtableEmbed from "@/components/AirtableEmbed";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import { aboutHeroSlides } from "@/lib/images";
import { Briefcase, BadgeDollarSign, Globe2, HeartHandshake } from "lucide-react";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, path: "/freelancers", metaKey: "freelancers" });
}

const WHY = [
  {
    icon: Briefcase,
    title: "Real projects, real clients",
    body: "Work on live engagements for B2B SaaS, e-commerce, health, EdTech, AI labs, and game studios — not test pages.",
  },
  {
    icon: BadgeDollarSign,
    title: "Fair, transparent pay",
    body: "Clear rates agreed up front, no opaque deductions, and reliable payment on agreed terms.",
  },
  {
    icon: Globe2,
    title: "High demand for rare pairs",
    body: "We actively seek native speakers of underserved African and Asian languages — your language pair is an asset here.",
  },
  {
    icon: HeartHandshake,
    title: "A team that respects linguists",
    body: "One accountable project lead, realistic deadlines, full context, and the glossaries and references you need to do great work.",
  },
];

export default function FreelancersPage() {
  return (
    <>
      {/* Warm up the connection to Airtable so the embedded form loads faster. */}
      <link rel="preconnect" href="https://airtable.com" />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Join Our Network", url: `${site.url}/freelancers` },
        ])}
      />
      <PageHero
        eyebrow="Join Our Network"
        title="Join the GlobalAnnotate Network"
        subtitle="We're building a network of professional translators, localizers, annotators and voiceover talent — especially native speakers of underserved African and Asian languages. Apply below and we'll reach out when projects match your skills."
        slides={aboutHeroSlides}
        size="compact"
      />

      {/* Why work with us */}
      <Section className="pt-12 md:pt-16">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-700">
            Why work with us
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            Built by linguists, for linguists.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.05}>
              <div className="card p-6 h-full">
                <w.icon className="h-6 w-6 text-brand-600" />
                <h3 className="mt-4 text-lg font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">
                  {w.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Application form */}
      <Section className="pt-4 pb-24">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-24">
            <h2 className="section-h2 text-ink-900">Apply to the network</h2>
            <p className="mt-4 text-ink-600 leading-relaxed">
              Tell us about your languages, services, and experience. Required
              fields are marked with an asterisk. We&apos;ll keep your details on
              file and reach out when a project matches your skills.
            </p>
            <p className="mt-4 text-sm text-ink-600 leading-relaxed">
              Curious what we do first? Explore our{" "}
              <Link
                href="/services"
                className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
              >
                services
              </Link>{" "}
              or read about{" "}
              <Link
                href="/about"
                className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
              >
                the team and our founder
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
