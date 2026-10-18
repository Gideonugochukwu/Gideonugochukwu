import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { ogImages, OG_IMAGE_URL } from "@/lib/i18n-meta";
import { servicesHeroSlides } from "@/lib/images";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { ArrowRight, Download, FileText } from "lucide-react";

const TITLE =
  "Working With Us — GlobalAnnotate | Vendor Onboarding, Registrations & Capability Statement";
const DESCRIPTION =
  "How to engage GlobalAnnotate as a vendor: onboarding steps, our registrations (UNGM, EU PIC, SMEDAN), capability statement, and how to request our vendor pack for procurement and tenders.";

const URL = `${site.url}/procurement`;

export const metadata: Metadata = {
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

// TODO(Gideon): replace with the real capability statement PDF once finalized
// (upload to /public and point this at it, e.g. /globalannotate-capability-statement.pdf).
const CAPABILITY_STATEMENT_URL = "";

const REGISTRATIONS = [
  {
    label: "UNGM Vendor",
    value: "1254285",
    note: "United Nations Global Marketplace registered vendor.",
  },
  {
    label: "EU PIC",
    value: "862808308",
    note: "Participant Identification Code for EU programs and tenders.",
  },
  {
    label: "SMEDAN",
    value: "SUID-2318-4705-9712-3682",
    note: "Registered with Nigeria's Small and Medium Enterprises Development Agency.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Introductions & NDA",
    body: "Tell us your scope and requirements. We sign your NDA (or provide ours) and share the documents your procurement team needs.",
  },
  {
    step: "02",
    title: "Vendor setup",
    body: "We complete your vendor registration and security/quality questionnaires, and provide our registrations, references, and insurance details on request.",
  },
  {
    step: "03",
    title: "Pilot or framework",
    body: "We scope a pilot or framework agreement (MSA + SOW) with clear rates, SLAs, and a single point of contact.",
  },
  {
    step: "04",
    title: "Delivery & review",
    body: "We deliver against the SOW with documented QA, then hold regular reviews to track quality, turnaround, and spend.",
  },
];

export default function ProcurementPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: `Working With Us — ${site.name}`, description: DESCRIPTION, url: URL }),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Working with us", url: URL },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Procurement · Working with us"
        title="An easy vendor to onboard."
        subtitle="Registrations, documentation, and a clear onboarding path for enterprise, institutional, and development-sector buyers."
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Working with us", href: "/procurement" },
        ]}
        ctas={[
          { label: "Request our vendor pack", href: "/contact" },
          { label: "See industries", href: "/industries", variant: "ghost" },
        ]}
        slides={servicesHeroSlides}
      />

      {/* Registrations */}
      <Section className="pt-20 md:pt-28">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            Registrations & IDs
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            Registered and ready for procurement.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REGISTRATIONS.map((r, i) => (
            <Reveal key={r.label} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-ink-200 bg-white p-7">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-700">
                  {r.label}
                </p>
                <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink-900 break-words">
                  {r.value}
                </p>
                <p className="mt-3 text-sm text-ink-600 leading-relaxed">
                  {r.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Onboarding steps */}
      <Section className="bg-card">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.20em] text-brand-700">
            How we onboard
          </p>
          <h2 className="section-h2 mt-4 text-ink-900">
            From first contact to framework.
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.step} delay={(i % 4) * 0.05}>
              <div className="border-l-2 border-brand-200 pl-6 py-1">
                <p className="font-display text-2xl font-semibold text-brand-700">
                  {s.step}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-ink-600 leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Capability statement + vendor pack */}
      <Section className="pt-0">
        <div className="rounded-3xl border border-brand-200 bg-brand-50/40 p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-brand-700">
                <FileText className="h-3.5 w-3.5" /> Capability statement
              </p>
              <h2 className="section-h2 mt-4 text-ink-900">
                Get what your procurement team needs.
              </h2>
              <p className="mt-3 text-lg text-ink-600 leading-relaxed">
                Our capability statement covers services, languages,
                registrations, quality and security practices, and references.
                Our vendor pack adds our NDA, DPA, and insurance details on
                request.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
              {CAPABILITY_STATEMENT_URL ? (
                <a
                  href={CAPABILITY_STATEMENT_URL}
                  className="btn-primary text-sm"
                  download
                >
                  <Download className="h-4 w-4" /> Download capability statement
                </a>
              ) : (
                // TODO(Gideon): once the capability statement PDF is uploaded,
                // set CAPABILITY_STATEMENT_URL above to enable this download.
                <Link href="/contact" className="btn-primary text-sm">
                  <Download className="h-4 w-4" /> Request capability statement
                </Link>
              )}
              <Link href="/contact" className="btn-secondary text-sm">
                Request vendor pack <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pb-24 pt-0">
        <CTABand />
      </Section>
    </>
  );
}
