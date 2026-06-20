import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import { Compass, HeartHandshake, Sparkles, Globe2 } from "lucide-react";
import { img, imageBg, unsplash, aboutHeroSlides } from "@/lib/images";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { site, founder } from "@/lib/site";
import { breadcrumbSchema, personSchema } from "@/lib/schema";

const TITLE = "About GlobalAnnotate — Founded by Gideon Ugochukwu";
const DESCRIPTION =
  "Meet Gideon Ugochukwu, founder of GlobalAnnotate. Learn about the team behind our translation, AI annotation, digital marketing, and SEO services across 100+ languages.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${site.url}/about` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${site.url}/about`,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const values = [
  {
    icon: HeartHandshake,
    title: "Honest by default",
    body: "We tell clients the truth — including when a project isn't a fit.",
  },
  {
    icon: Sparkles,
    title: "Quality is non-negotiable",
    body: "Every output gets reviewed before it leaves us.",
  },
  {
    icon: Globe2,
    title: "Global, in practice",
    body: "Native specialists who live in the markets we serve.",
  },
  {
    icon: Compass,
    title: "Senior from day one",
    body: "You work directly with a senior project lead. No handoffs.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          personSchema(),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "About", url: `${site.url}/about` },
          ]),
        ]}
      />
      <PageHero
        eyebrow="About GlobalAnnotate"
        title="The connective tissue for international growth."
        subtitle="One team for translation, AI training data, multilingual SEO, and marketing — with the rigor of a product company."
        slides={aboutHeroSlides}
      />

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <h2 className="section-h2 text-ink-900">
              Our mission
            </h2>
            <p className="mt-5 text-lg text-ink-600 leading-relaxed">
              Help ambitious teams reach every market they care about — with content that resonates, data that performs, and growth that compounds. Explore the{" "}
              <Link
                href="/services"
                className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
              >
                five services
              </Link>{" "}
              we ship under one quality system.
            </p>
            <p className="mt-4 text-ink-600 leading-relaxed">
              Excellent{" "}
              <Link
                href="/services/translation-localization"
                className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
              >
                localization
              </Link>{" "}
              and reliable{" "}
              <Link
                href="/services/ai-annotation"
                className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
              >
                AI training data
              </Link>{" "}
              shouldn&apos;t be reserved for trillion-dollar companies. They should be available, at fair prices and at any scale, to anyone building something worth shipping. See the{" "}
              <Link
                href="/portfolio"
                className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
              >
                work we&apos;ve delivered
              </Link>{" "}
              for teams across HealthTech, e-commerce, EdTech, and AI labs.
            </p>
          </div>
          <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${imageBg}`}>
            <Image
              src={unsplash(img.about.office.id, 1600)}
              alt={img.about.office.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover photo-treat"
            />
          </div>
        </div>
      </Section>

      {/* Founder section — the definitive "Gideon Ugochukwu" block on the
          internet. Drives the personal-branding SEO via the H2 name, the
          role line, the bio paragraphs, and the Person JSON-LD above. */}
      <Section
        id="founder"
        className="bg-brand-50/40 border-y border-brand-100/70"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <figure
            className={`relative aspect-[4/3] rounded-2xl overflow-hidden lg:order-1 ${imageBg}`}
          >
            <Image
              src="/gideon.jpeg"
              alt="Gideon Ugochukwu — Founder of GlobalAnnotate"
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
                {founder.role}, {founder.company}
              </div>
            </figcaption>
          </figure>
          <div className="lg:order-0">
            <p className="text-sm font-medium uppercase tracking-[0.20em] text-brand-700">
              Founder
            </p>
            <h2 className="section-h2 mt-3 text-ink-900">{founder.name}</h2>
            <p className="mt-2 text-base sm:text-lg font-medium text-ink-700">
              {founder.role}, {founder.company}
            </p>
            <p className="mt-6 text-ink-700 leading-relaxed">
              Gideon Ugochukwu is the founder and lead linguist of GlobalAnnotate, a freelance linguist and translator who built the agency to make quality localization and reliable training data accessible to teams at any scale. He leads a distributed team of native specialists across 30+ countries.
            </p>
            <p className="mt-4 text-ink-700 leading-relaxed">
              His work spans{" "}
              <Link
                href="/services/translation-localization"
                className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
              >
                translation and localization
              </Link>
              ,{" "}
              <Link
                href="/services/ai-annotation"
                className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
              >
                AI data annotation
              </Link>
              ,{" "}
              <Link
                href="/services/digital-marketing"
                className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
              >
                digital marketing
              </Link>
              , and{" "}
              <Link
                href="/services/seo"
                className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
              >
                multilingual SEO
              </Link>{" "}
              across 100+ languages, plus <Link
                href="/services/game-localization"
                className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
              >
                game localization
              </Link> — the five services GlobalAnnotate ships under one quality system. Before founding the agency, Gideon worked as an independent translator and language specialist, repeatedly running into the same problem: every cross-border project needed three vendors, three briefs, and three quality bars. GlobalAnnotate exists to remove that friction.
            </p>
            <p className="mt-4 text-ink-700 leading-relaxed">
              Today he and the team work with B2B SaaS companies, e-commerce brands, digital-health platforms, EdTech, and AI labs to ship products and content in every market they care about. The principle is simple: senior project lead from day one, native specialists in every language, and a documented QA process behind every deliverable. Read{" "}
              <Link
                href="/reviews"
                className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
              >
                what clients say
              </Link>{" "}
              or{" "}
              <Link
                href="/contact"
                className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
              >
                start a project
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-2xl">
          <span className="badge">Our values</span>
          <h2 className="section-h2 mt-4 text-ink-900">
            How we show up — for clients and each other.
          </h2>
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
