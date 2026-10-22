import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { ogImages, OG_IMAGE_URL, withHreflang } from "@/lib/i18n-meta";
import { servicesHeroSlides } from "@/lib/images";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { ArrowRight, Check } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import QualityZh, { ZH_META } from "@/components/zh/QualityZh";
import { zhMetadata } from "@/lib/zh";

const TITLE =
  "Quality Process — GlobalAnnotate | ISO 17100-aligned Translation, Revision & QA";
const DESCRIPTION =
  "GlobalAnnotate's ISO 17100-aligned quality process: native-speaker translation, independent revision, and final QA — with linguist vetting, subject-matter matching, terminology management, LQA, and an ISO 18587-aligned MTPE workflow. Aligned, not certified.";

const URL = `${site.url}/quality`;

const EN_METADATA: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: "website",
    images: ogImages(),
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "zh") return zhMetadata({ path: "/quality", ...ZH_META });
  return withHreflang(EN_METADATA, "/quality");
}

const TEP = [
  {
    step: "01",
    title: "Translation",
    body: "A qualified native-speaker linguist, matched to your subject area, translates using your approved terminology and reference material.",
  },
  {
    step: "02",
    title: "Independent revision",
    body: "A second, equally qualified linguist revises the translation against the source for accuracy, terminology, and style — the bilingual revision step at the heart of ISO 17100.",
  },
  {
    step: "03",
    title: "Final QA",
    body: "Automated and manual checks for numbers, tags, consistency, and formatting, plus a documented QA report before delivery.",
  },
];

const PILLARS = [
  {
    title: "Linguist vetting",
    body: "Translators are screened for qualifications, native proficiency, and domain experience, and sign NDAs before any work. We re-check quality through ongoing review.",
  },
  {
    title: "Subject-matter matching",
    body: "We assign linguists by field — medical, legal, technical, marketing, gaming — so the person translating your content understands it.",
  },
  {
    title: "Terminology & glossaries",
    body: "We build and maintain client glossaries and translation memories so terminology stays consistent and improves with every project.",
  },
  {
    title: "LQA (Linguistic Quality Assurance)",
    body: "For software, apps, and games we run LQA on real builds to catch truncation, overlap, context, and formatting issues before ship.",
  },
  {
    title: "MTPE — ISO 18587-aligned",
    body: "Where machine translation fits, our post-editing follows an ISO 18587-aligned workflow: qualified human post-editors bring MT output to the agreed quality level.",
  },
  {
    title: "Documented QA reporting",
    body: "Every program includes clear reporting, so you can see how quality was checked — useful for audits and procurement.",
  },
];

export default async function QualityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (locale === "zh") return <QualityZh />;
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: `Quality Process — ${site.name}`, description: DESCRIPTION, url: URL }),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Quality", url: URL },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Quality"
        title="An ISO 17100-aligned process, on every project."
        subtitle="Native-speaker translation, independent revision, and final QA — backed by linguist vetting, subject-matter matching, terminology management, and LQA."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Quality", href: "/quality" },
        ]}
        ctas={[
          { label: "Talk to an expert", href: "/contact" },
          { label: "See our services", href: "/services", variant: "ghost" },
        ]}
        slides={servicesHeroSlides}
      />

      {/* TEP process */}
      <Section className="pt-20 md:pt-28">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            Translate · Revise · QA
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            The core of ISO 17100: a second linguist, always.
          </h2>
          <p className="mt-4 text-lg text-ink-600 leading-relaxed">
            Every standard translation runs through three stages. The
            independent revision step — a second qualified linguist checking the
            first — is what separates a professional process from a single pass.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {TEP.map((t, i) => (
            <Reveal key={t.step} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-ink-200 bg-white p-7">
                <p className="font-display text-3xl font-semibold text-brand-700">
                  {t.step}
                </p>
                <h3 className="mt-3 text-lg md:text-xl font-semibold tracking-tight text-ink-900">
                  {t.title}
                </h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Pillars */}
      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            What backs the process
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            Quality is a system, not a step.
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:gap-10 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.04}>
              <div className="border-l-2 border-brand-200 pl-6 py-1">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink-900">
                  {p.title}
                </h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Honest standards note */}
      <Section className="pt-0">
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-10">
          <div className="flex items-start gap-4">
            <span
              aria-hidden
              className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"
            >
              <Check className="h-4 w-4" strokeWidth={2.4} />
            </span>
            <div className="max-w-3xl">
              <h2 className="section-h3 text-ink-900">
                &ldquo;Aligned&rdquo;, stated honestly
              </h2>
              <p className="mt-2 text-ink-600 leading-relaxed">
                We operate an <strong>ISO 17100-aligned</strong> quality
                management system and an <strong>ISO 18587-aligned</strong> MTPE
                workflow. This means our process follows these standards. We do
                not currently hold ISO 17100 or ISO 18587 certification, and we
                never describe ourselves as certified. If certification is a
                procurement requirement, talk to us about our roadmap.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="pt-0">
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-12 text-center">
          <h2 className="section-h2 text-ink-900">
            Need our quality process in writing?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-ink-600 leading-relaxed">
            We&apos;re glad to share our QA methodology, sample reports, and
            references for your evaluation.
          </p>
          <Link href="/contact" className="btn-primary mt-7 inline-flex">
            Request a quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section className="pb-24 pt-0">
        <CTABand />
      </Section>
    </>
  );
}
