import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

const TITLE = "Terms of Service";
const DESCRIPTION =
  "The terms that govern your use of the GlobalAnnotate website and services.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${site.url}/terms` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${site.url}/terms`,
    type: "article",
  },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
};

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Terms of Service", url: `${site.url}/terms` },
        ])}
      />
      <Section className="pt-16 pb-24">
        <div className="max-w-3xl">
          <span className="badge">Legal</span>
          <h1 className="page-h1 mt-5">Terms of Service</h1>
          <p className="mt-4 text-sm text-ink-500">Last updated: January 2026</p>

          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            This page is a starting template, not legal advice. Have it reviewed by a
            qualified lawyer in your jurisdiction before relying on it.
          </div>

          <div className="prose-section">
            <h2>1. Agreement</h2>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and
              use of the {site.name} website at{" "}
              <Link href={site.url}>{site.domain}</Link> and any services you engage
              us for. By using the site or our services, you agree to these Terms.
            </p>

            <h2>2. Services</h2>
            <p>
              {site.name} provides translation & localization, AI annotation & data
              labeling, multilingual SEO & search visibility, and digital marketing
              services. Each engagement is governed by a separate written proposal
              or statement of work that controls in case of conflict with these
              Terms.
            </p>

            <h2>3. Quotes and proposals</h2>
            <p>
              Quotes are valid for 30 days unless stated otherwise. Final scope,
              timeline, and fees are confirmed in a signed proposal or statement of
              work.
            </p>

            <h2>4. Fees and payment</h2>
            <p>
              Invoices are due within 14 days of issue unless otherwise agreed. Late
              payments may accrue interest at the lower of 1.5% per month or the
              maximum rate permitted by law. Recurring engagements may require a
              deposit or retainer.
            </p>

            <h2>5. Client responsibilities</h2>
            <p>
              You agree to provide accurate information, source files, access, and
              timely feedback needed for us to deliver the work. Delays or missing
              inputs may shift agreed timelines.
            </p>

            <h2>6. Intellectual property</h2>
            <p>
              On full payment, you own the final deliverables produced specifically
              for you. We retain ownership of our pre-existing methods, templates,
              tools, and know-how. We may reference engagements in case studies in
              anonymized form unless you opt out in writing.
            </p>

            <h2>7. Confidentiality</h2>
            <p>
              Each party agrees to keep the other&rsquo;s confidential information
              confidential and to use it only to perform under the engagement. We
              are happy to sign mutual NDAs on request.
            </p>

            <h2>8. Acceptable use of the website</h2>
            <p>
              You agree not to abuse, disrupt, or attempt to gain unauthorized access
              to the site, and not to submit unlawful content via our forms.
            </p>

            <h2>9. Warranties and disclaimers</h2>
            <p>
              We perform services with reasonable skill and care. The website and any
              free resources are provided &ldquo;as is&rdquo; without warranties of
              any kind to the fullest extent permitted by law.
            </p>

            <h2>10. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, neither party will be liable
              for indirect, incidental, consequential, or punitive damages. Each
              party&rsquo;s total liability arising out of or related to an engagement
              is capped at the fees paid for that engagement in the 12 months
              preceding the claim.
            </p>

            <h2>11. Termination</h2>
            <p>
              Either party may terminate an engagement for material breach that
              remains uncured after 15 days&rsquo; written notice. You will pay for
              work completed up to the termination date.
            </p>

            <h2>12. Governing law</h2>
            <p>
              Unless otherwise agreed in a signed proposal, these Terms are governed
              by the laws of England and Wales, without regard to conflict-of-laws
              principles. Disputes are subject to the exclusive jurisdiction of the
              courts of London, England.
            </p>

            <h2>13. Changes</h2>
            <p>
              We may update these Terms from time to time. Material changes will be
              announced on this page with a new &ldquo;last updated&rdquo; date.
            </p>

            <h2>14. Contact</h2>
            <p>
              Questions about these Terms? Email{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
