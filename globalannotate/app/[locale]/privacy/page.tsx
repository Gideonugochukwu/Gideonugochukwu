import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hreflangAlternates } from "@/lib/i18n-meta";
import Link from "next/link";
import Section from "@/components/Section";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How GlobalAnnotate collects, uses, and protects information from visitors and clients.";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: hreflangAlternates(locale, "/privacy"),
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: `${site.url}/privacy`,
      type: "article",
    },
    twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const note = (await getTranslations())("legalNote");
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Privacy Policy", url: `${site.url}/privacy` },
        ])}
      />
      <Section className="pt-16 pb-24">
        <div className="max-w-3xl">
          <span className="badge">Legal</span>
          <h1 className="page-h1 mt-5">Privacy Policy</h1>
          <p className="mt-4 text-sm text-ink-500">
            Last updated: January 2026
          </p>

          <div className="mt-4 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-ink-700">
            This page is a starting template, not legal advice. Have it reviewed by a
            qualified lawyer in your jurisdiction before relying on it.
          </div>

          {note && (
            <div className="mt-4 rounded-xl border border-ink-200 bg-ink-50 p-4 text-sm text-ink-600">
              {note}
            </div>
          )}

          <div className="prose-section">
            <h2>Who we are</h2>
            <p>
              {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the website{" "}
              <Link href={site.url}>{site.domain}</Link> and provides translation &
              localization, AI annotation, multilingual SEO, and digital marketing
              services to organizations worldwide.
            </p>

            <h2>Information we collect</h2>
            <ul>
              <li>
                <strong>Contact form data</strong> — your name, business email,
                company name (optional), project description, budget, and timeline
                when you submit a quote or contact request.
              </li>
              <li>
                <strong>Review submissions</strong> — your name, company, country,
                rating, and review text when you leave a review.
              </li>
              <li>
                <strong>Email correspondence</strong> — the content of messages you
                send to {site.email}.
              </li>
              <li>
                <strong>Basic analytics</strong> — anonymized page-view and device
                information collected by our hosting provider and any analytics tool
                we use, in line with applicable consent requirements.
              </li>
            </ul>

            <h2>How we use information</h2>
            <ul>
              <li>To reply to enquiries and prepare proposals.</li>
              <li>To deliver, invoice, and support services you engage us for.</li>
              <li>To moderate and publish reviews (we do not edit review content).</li>
              <li>To improve our website, content, and security.</li>
              <li>To comply with applicable laws and regulations.</li>
            </ul>

            <h2>Legal basis</h2>
            <p>
              Where the GDPR or similar laws apply, we process personal data on the
              basis of (a) your consent, (b) the performance of a contract you are
              party to, (c) our legitimate interests in operating and growing the
              business, and (d) compliance with legal obligations.
            </p>

            <h2>Sharing</h2>
            <p>
              We never sell personal data. We share data only with vetted processors
              that help us run the business — including form delivery, email, hosting,
              and analytics providers — under written agreements. We may disclose
              information when required by law or to protect our rights.
            </p>

            <h2>Retention</h2>
            <p>
              We keep enquiry and project data for as long as needed to provide
              services and meet legal and accounting obligations, then delete or
              anonymize it. Published reviews remain visible unless the author asks
              us to remove them.
            </p>

            <h2>Your rights</h2>
            <p>
              Depending on where you live, you may have the right to access, correct,
              delete, restrict, or object to processing of your personal data, and to
              data portability. Email us at{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> to exercise any of
              these rights. We will respond within the timelines required by
              applicable law.
            </p>

            <h2>Cookies</h2>
            <p>
              We use a minimal set of cookies and similar technologies for site
              functionality and aggregate analytics. Where required, we will ask for
              your consent before setting non-essential cookies.
            </p>

            <h2>International transfers</h2>
            <p>
              We operate globally. Where personal data is transferred across borders,
              we rely on appropriate safeguards such as standard contractual clauses.
            </p>

            <h2>Security</h2>
            <p>
              We use reasonable technical and organizational measures to protect
              personal data, including access controls, encryption in transit, and
              vendor due-diligence. No system is perfectly secure, and we cannot
              guarantee absolute security.
            </p>

            <h2>Children</h2>
            <p>
              Our services are not directed to children. We do not knowingly collect
              personal data from anyone under 16.
            </p>

            <h2>Changes</h2>
            <p>
              We may update this policy from time to time. Material changes will be
              announced on this page with a new &ldquo;last updated&rdquo; date.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about this policy? Email{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
