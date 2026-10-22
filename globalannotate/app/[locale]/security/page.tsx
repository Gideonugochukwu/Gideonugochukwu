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
import { ArrowRight, Check, Lock, FileCheck, ShieldCheck, Trash2 } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import SecurityZh, { ZH_META } from "@/components/zh/SecurityZh";
import SecurityDe, { DE_META } from "@/components/de/SecurityDe";
import { deMetadata } from "@/lib/de";
import { zhMetadata } from "@/lib/zh";

// TODO(Gideon): make sure the privacy@ and security@ aliases forward to a
// monitored inbox before this page goes live.
const SECURITY_EMAIL = "security@globalannotate.com";

const TITLE =
  "Security & Confidentiality — GlobalAnnotate | NDAs, Access Control & Data Handling";
const DESCRIPTION =
  "How GlobalAnnotate protects confidential client material: NDAs with every linguist, least-privilege access, encrypted transfer, defined retention and deletion, and careful handling of PHI, PII, and legal data. ISO 17100-aligned QMS; ISO 27001 and SOC 2 planned.";

const URL = `${site.url}/security`;

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
  if (locale === "zh") return zhMetadata({ path: "/security", ...ZH_META });
  if (locale === "de") return deMetadata({ path: "/security", ...DE_META });
  return withHreflang(EN_METADATA, "/security");
}

const CONTROLS = [
  {
    icon: FileCheck,
    title: "NDAs with everyone",
    body: "Every in-house team member and network linguist signs a non-disclosure agreement before receiving any client material. No exceptions.",
  },
  {
    icon: Lock,
    title: "Least-privilege access",
    body: "Only the project lead and the linguists assigned to a project can access its files. Access is granted per project and removed when the project closes.",
  },
  {
    icon: ShieldCheck,
    title: "Encrypted transfer",
    body: "Files are exchanged and stored over encrypted connections (TLS). Sensitive engagements use secure, access-controlled transfer rather than open email attachments.",
  },
  {
    icon: Trash2,
    title: "Retention & deletion",
    body: "Project files are kept only as long as needed to deliver and support the work. Unless a contract requires otherwise, they are deleted or anonymized after the project closes.",
  },
];

const WORKFLOW = [
  {
    step: "01",
    title: "NDA & scoping",
    body: "We sign your NDA (or ours) and scope the work, confirming data sensitivity, access needs, and any regulatory constraints up front.",
  },
  {
    step: "02",
    title: "Secure intake",
    body: "Files are received over an encrypted, access-controlled channel and placed in a project workspace visible only to the assigned team.",
  },
  {
    step: "03",
    title: "Need-to-know delivery",
    body: "Vetted, NDA-bound linguists and reviewers work the project under least-privilege access. Sensitive material is routed to specialists for that domain.",
  },
  {
    step: "04",
    title: "Handover & deletion",
    body: "We deliver through the agreed secure channel, then delete or anonymize project files per the contract and our retention policy.",
  },
];

const SENSITIVE = [
  {
    title: "Medical & PHI",
    body: "Clinical and patient material is handled by specialists under the engagement's confidentiality and data-protection terms, with tighter access and retention controls. We support client DPAs.",
  },
  {
    title: "Personal data (PII)",
    body: "Personal identifiers are processed on the client's instructions as a processor, protected by NDAs, least-privilege access, and defined retention — see our Privacy Policy.",
  },
  {
    title: "Legal & regulated",
    body: "Contracts, filings, and regulated documents are routed to subject-matter linguists and kept confidential, with certified translation available on request.",
  },
];

export default async function SecurityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (locale === "zh") return <SecurityZh />;
  if (locale === "de") return <SecurityDe />;
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: `Security & Confidentiality — ${site.name}`, description: DESCRIPTION, url: URL }),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Security & Confidentiality", url: URL },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Security & Confidentiality"
        title="Your confidential work, handled confidentially."
        subtitle="NDAs with every linguist, least-privilege access, encrypted transfer, and defined retention and deletion — with careful handling of medical, legal, and personal data."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Security & Confidentiality", href: "/security" },
        ]}
        ctas={[
          { label: "Talk to us about security", href: "/contact" },
          { label: "Read our Privacy Policy", href: "/privacy", variant: "ghost" },
        ]}
        slides={servicesHeroSlides}
      />

      {/* Core controls */}
      <Section className="pt-20 md:pt-28">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            How we protect your work
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            Confidentiality built into the workflow.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {CONTROLS.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={(i % 2) * 0.05}>
                <div className="h-full rounded-2xl border border-ink-200 bg-white p-7">
                  <span
                    aria-hidden
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 text-brand-700"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 text-lg md:text-xl font-semibold tracking-tight text-ink-900">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-ink-600 leading-relaxed">{c.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Confidential-work workflow */}
      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            The confidential-work workflow
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            From NDA to deletion.
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {WORKFLOW.map((w, i) => (
            <Reveal key={w.step} delay={(i % 4) * 0.05}>
              <div className="border-l-2 border-brand-200 pl-6 py-1">
                <p className="font-display text-2xl font-semibold text-brand-700">
                  {w.step}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink-900">
                  {w.title}
                </h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Sensitive data */}
      <Section>
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            Sensitive data
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            Medical, legal, and personal data.
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {SENSITIVE.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-ink-200 bg-white p-7">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight text-ink-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Standards & certifications — honest framing */}
      <Section className="bg-card">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
              Standards & certifications
            </p>
            <h2 className="section-h2 mt-4 text-ink-900">
              Honest about where we are.
            </h2>
            <p className="mt-4 text-ink-600 leading-relaxed">
              We run an ISO 17100-aligned quality management system and apply
              recognized security practices. We are transparent about what is in
              place today and what is planned.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 self-start">
            <li className="rounded-xl border border-ink-200 bg-white p-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                <Check className="h-3 w-3" strokeWidth={2.4} /> In place
              </span>
              <p className="mt-3 font-semibold text-ink-900">ISO 17100-aligned QMS</p>
              <p className="mt-1 text-sm text-ink-600">
                Our quality process follows an ISO 17100-aligned workflow. Not a
                certification.
              </p>
            </li>
            <li className="rounded-xl border border-ink-200 bg-white p-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                <Check className="h-3 w-3" strokeWidth={2.4} /> In place
              </span>
              <p className="mt-3 font-semibold text-ink-900">NDAs & access control</p>
              <p className="mt-1 text-sm text-ink-600">
                Signed NDAs, least-privilege access, and encrypted transfer on
                every engagement.
              </p>
            </li>
            <li className="rounded-xl border border-ink-200 bg-white p-5">
              <span className="inline-flex items-center rounded-full border border-ink-200 px-2.5 py-1 text-xs font-medium text-ink-500">
                In progress
              </span>
              <p className="mt-3 font-semibold text-ink-900">SOC 2 Type 1</p>
              <p className="mt-1 text-sm text-ink-600">
                Planned. We are working toward SOC 2 Type 1; not yet attested.
              </p>
            </li>
            <li className="rounded-xl border border-ink-200 bg-white p-5">
              <span className="inline-flex items-center rounded-full border border-ink-200 px-2.5 py-1 text-xs font-medium text-ink-500">
                Planned
              </span>
              <p className="mt-3 font-semibold text-ink-900">ISO 27001 / ISO 13485</p>
              <p className="mt-1 text-sm text-ink-600">
                Not certified. On our roadmap as we grow enterprise and
                life-sciences work.
              </p>
            </li>
          </ul>
        </div>
      </Section>

      {/* Security questionnaires CTA */}
      <Section className="pt-0">
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="section-h2 text-ink-900">
                Security questionnaires & due diligence
              </h2>
              <p className="mt-3 text-lg text-ink-600 leading-relaxed">
                Completing a vendor security assessment or need our data-handling
                details, NDA, or DPA? Email{" "}
                <a
                  href={`mailto:${SECURITY_EMAIL}`}
                  className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
                >
                  {SECURITY_EMAIL}
                </a>{" "}
                and we&apos;ll respond promptly.
              </p>
            </div>
            <Link href="/contact" className="btn-primary text-sm shrink-0">
              Contact us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      <Section className="pb-24 pt-0">
        <CTABand />
      </Section>
    </>
  );
}
