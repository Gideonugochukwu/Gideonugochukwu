import type { Metadata } from "next";
import Image from "next/image";
import Section from "@/components/Section";
import CTABand from "@/components/CTABand";
import Reveal from "@/components/Reveal";
import { Compass, HeartHandshake, Sparkles, Globe2 } from "lucide-react";
import { img, imageBg, unsplash } from "@/lib/images";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

const TITLE = "About GlobalAnnotate";
const DESCRIPTION =
  "GlobalAnnotate is a global team of linguists, annotators, SEO strategists, and marketers building the connective tissue for international growth.";

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
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "About", url: `${site.url}/about` },
        ])}
      />
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-ink-950 via-ink-900 to-brand-900 text-white">
        <Image
          src={unsplash(img.about.team.id, 2400)}
          alt={img.about.team.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover photo-treat-dark opacity-45"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(2,6,23,0.80) 0%, rgba(2,6,23,0.60) 50%, rgba(2,6,23,0.92) 100%), radial-gradient(50% 50% at 50% 0%, rgba(16,185,129,0.25), transparent 65%)",
          }}
        />
        <div aria-hidden className="absolute inset-0 hero-grid opacity-40" />
        <div className="container-wide relative pt-20 pb-24">
          <span className="badge-light">About GlobalAnnotate</span>
          <h1 className="display-hero mt-5 max-w-4xl text-4xl md:text-6xl lg:text-7xl text-white">
            The connective tissue for international growth.
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-white/80 leading-relaxed">
            One team for translation, AI training data, multilingual SEO, and marketing — with the rigor of a product company.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
              Our mission
            </h2>
            <p className="mt-5 text-lg text-ink-600 leading-relaxed">
              Help ambitious teams reach every market they care about — with content that resonates, data that performs, and growth that compounds.
            </p>
            <p className="mt-4 text-ink-600 leading-relaxed">
              Excellent localization and reliable training data shouldn&apos;t be reserved for trillion-dollar companies. They should be available, at fair prices and at any scale, to anyone building something worth shipping.
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

      <Section className="bg-ink-50/60 border-y border-ink-200/60">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <figure className={`relative aspect-[4/3] rounded-2xl overflow-hidden lg:order-1 ${imageBg}`}>
            <Image
              src="/gideon.jpeg"
              alt="Gideon Ugochukwu, Founder & Lead Linguist"
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
                Gideon Ugochukwu
              </div>
              <div className="mt-1 text-sm text-white/75">
                Founder &amp; Lead Linguist
              </div>
            </figcaption>
          </figure>
          <div className="lg:order-0">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
              How we started
            </h2>
            <p className="mt-5 text-ink-600 leading-relaxed">
              GlobalAnnotate was founded by linguists, ML engineers, and growth marketers who kept running into the same problem: every cross-border project required three vendors, three briefs, and three quality bars.
            </p>
            <p className="mt-4 text-ink-600 leading-relaxed">
              We brought all three under one roof, with a shared QA culture and one senior lead per client. The result is faster delivery, better quality, and far less overhead.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-2xl">
          <span className="badge">Our values</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">
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
