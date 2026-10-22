/*
 * ─────────────────────────────────────────────────────────────────────────
 *  DRAFT prepared with AI. Needs legal review before relying on it.
 *  (Internal note for the team — intentionally NOT rendered on the live page.)
 * ─────────────────────────────────────────────────────────────────────────
 */
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { hreflangAlternates, ogImages, OG_IMAGE_URL } from "@/lib/i18n-meta";
import Link from "next/link";
import Section from "@/components/Section";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { site } from "@/lib/site";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import PrivacyZh, { ZH_META } from "@/components/zh/PrivacyZh";
import PrivacyDe, { DE_META } from "@/components/de/PrivacyDe";
import { deMetadata } from "@/lib/de";
import { zhMetadata } from "@/lib/zh";

const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How GlobalAnnotate collects, uses, shares, and protects personal data and client content — covering GDPR/UK GDPR, the Nigeria Data Protection Act 2023, and CCPA.";

// Privacy matters are handled at a dedicated address, separate from the
// general enquiry inbox.
const PRIVACY_EMAIL = "privacy@globalannotate.com";
const LAST_UPDATED = "18 October 2026";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "zh") return zhMetadata({ path: "/privacy", ...ZH_META });
  if (locale === "de") return deMetadata({ path: "/privacy", ...DE_META });
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: hreflangAlternates(locale, "/privacy"),
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: `${site.url}/privacy`,
      type: "article",
      images: ogImages(),
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
      images: [OG_IMAGE_URL],
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (locale === "zh") return <PrivacyZh />;
  if (locale === "de") return <PrivacyDe />;
  const note = (await getTranslations())("legalNote");
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            name: `${TITLE} — ${site.name}`,
            description: DESCRIPTION,
            url: `${site.url}/privacy`,
          }),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Privacy Policy", url: `${site.url}/privacy` },
          ]),
        ]}
      />
      <Section className="pt-16 pb-24">
        <div className="max-w-3xl">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Privacy Policy", href: "/privacy" },
            ]}
            tone="light"
            className="mb-6"
          />
          <span className="badge">Legal</span>
          <h1 className="page-h1 mt-5">Privacy Policy</h1>
          <p className="mt-4 text-sm text-ink-500">Last updated: {LAST_UPDATED}</p>

          {note && (
            <div className="mt-4 rounded-xl border border-ink-200 bg-ink-50 p-4 text-sm text-ink-600">
              {note} The English version of this Privacy Policy is the governing
              version.
            </div>
          )}

          <div className="prose-section">
            <h2>1. Who we are</h2>
            <p>
              {site.name} (&ldquo;{site.shortName}&rdquo;, &ldquo;we&rdquo;,
              &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a language services and AI
              data company providing translation, localization, MTPE,
              subtitling, transcription, LQA, game localization, AI data
              annotation, and RLHF across 100+ languages. We operate the website{" "}
              <Link href={site.url}>{site.domain}</Link> and deliver services to
              clients worldwide through an in-house team and a vetted network of
              linguists in 30+ countries.
            </p>
            <p>
              This policy explains what personal data we collect, why, how we
              protect it, and the rights you have. It applies to our website,
              our contact and quote forms, our freelancer and linguist
              applications, and the personal data contained in client project
              content we process on our clients&rsquo; behalf.
            </p>
            {/* TODO(Gideon): Add the registered company name + address of the
                data controller here (and the Estonian EU entity once formed). */}
            <p>
              <strong>Data controller:</strong> {site.name} &mdash; registered
              address to be confirmed. <em>[Registered address — TODO]</em>
            </p>
            <p>
              <strong>Privacy contact:</strong>{" "}
              <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>
            </p>

            <h2>2. The information we collect</h2>
            <p>We collect the following categories of information:</p>
            <ul>
              <li>
                <strong>Website visitors.</strong> Aggregate, largely anonymized
                analytics (pages viewed, approximate region, device/browser
                type) and cookie data. Non-essential analytics cookies are set
                only after you consent &mdash; see &ldquo;Cookies&rdquo; below.
              </li>
              <li>
                <strong>Contact &amp; quote forms.</strong> Your name, business
                email, company (optional), project description, budget, and
                timeline when you request a quote or contact us.
              </li>
              <li>
                <strong>Client project files &amp; content.</strong> Documents,
                strings, audio, video, images, and other materials a client
                sends us to translate, localize, annotate, or validate. These
                may contain personal data (and, in some engagements, special
                categories such as health data) belonging to the client&rsquo;s
                own users or employees. For this content we normally act as a{" "}
                <strong>processor</strong> on the client&rsquo;s instructions.
              </li>
              <li>
                <strong>Freelancer &amp; linguist applications.</strong> Name,
                contact details, country, language pairs, specializations, rates,
                experience, a link to a CV or portfolio, and &mdash; for
                engaged linguists &mdash; the payment and tax details needed to
                pay you.
              </li>
              <li>
                <strong>AI data project content.</strong> Text, prompts,
                responses, images, audio, or other data provided for annotation,
                evaluation, or RLHF, which may include personal data supplied by
                the client.
              </li>
              <li>
                <strong>Review submissions.</strong> Name, company, country,
                rating, and review text when you choose to leave a review.
              </li>
              <li>
                <strong>Email correspondence.</strong> The content of messages
                you send to us.
              </li>
            </ul>

            <h2>3. Lawful bases and how we use data</h2>
            <p>
              Where the GDPR, UK GDPR, or the Nigeria Data Protection Act 2023
              applies, we rely on one or more of the following lawful bases:
            </p>
            <ul>
              <li>
                <strong>Contract</strong> &mdash; to prepare proposals, deliver
                and invoice services, and manage our relationship with clients
                and linguists.
              </li>
              <li>
                <strong>Consent</strong> &mdash; for non-essential cookies and
                for optional marketing communications, which you can withdraw at
                any time.
              </li>
              <li>
                <strong>Legitimate interests</strong> &mdash; to operate, secure,
                and improve our website and services, prevent fraud, and respond
                to enquiries, balanced against your rights.
              </li>
              <li>
                <strong>Legal obligation</strong> &mdash; to meet tax,
                accounting, and other legal requirements.
              </li>
            </ul>
            <p>
              <strong>
                Client content is used only to deliver the engagement it was
                provided for.
              </strong>{" "}
              We do not use client content, or data contained within it, to
              train our own or any third party&rsquo;s AI models unless the
              client has agreed to that use in writing.
            </p>

            <h2>4. Confidentiality &amp; security</h2>
            <ul>
              <li>
                Every in-house team member and network linguist works under a
                signed non-disclosure agreement (NDA) before receiving any client
                material.
              </li>
              <li>
                Access to project files follows the principle of least privilege
                &mdash; only the linguists and project leads assigned to a
                project can access its content.
              </li>
              <li>
                Files are transferred and stored over encrypted connections
                (TLS), and access to our systems is protected by authentication
                controls.
              </li>
              <li>
                <strong>Retention &amp; deletion of project files:</strong> we
                keep client project files only as long as needed to deliver and
                support the engagement. Unless a contract, SOW, or legal
                obligation requires a different period, project files are deleted
                or anonymized after the project closes.
              </li>
              <li>
                <strong>Sensitive data</strong> &mdash; medical and other health
                information (including PHI), legal material, and personal
                identifiers (PII) &mdash; is routed to vetted specialists,
                handled under the relevant contract and NDAs, and subject to
                tighter access and retention controls. See our{" "}
                <Link href="/security">Security &amp; Confidentiality</Link> page
                for details.
              </li>
            </ul>

            <h2>5. Subprocessors &amp; international transfers</h2>
            <p>
              We use a small set of vetted subprocessors to run the business and
              deliver services &mdash; for example, hosting, form delivery,
              email, and secure file transfer providers &mdash; and our network
              of linguists is distributed across many countries. This means
              personal data may be transferred and processed outside your country
              of residence, including outside the EEA, the UK, or Nigeria.
            </p>
            <p>
              Where such transfers happen, we rely on appropriate safeguards,
              including the European Commission&rsquo;s Standard Contractual
              Clauses (and the UK International Data Transfer Addendum where
              relevant), together with confidentiality and data-protection terms
              in our subprocessor and linguist agreements. A current list of
              subprocessors is available to clients on request at{" "}
              <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>.
            </p>

            <h2>6. Your rights</h2>
            <p>
              Depending on where you live, you may have the right to access,
              correct, delete, restrict, or object to the processing of your
              personal data, to data portability, and to withdraw consent. Under
              the GDPR/UK GDPR and the Nigeria Data Protection Act 2023 you also
              have the right to lodge a complaint with your supervisory authority
              (in Nigeria, the Nigeria Data Protection Commission).
            </p>
            <p>
              <strong>California residents (CCPA/CPRA):</strong> you have the
              right to know what personal information we collect, to request
              deletion, to correct inaccurate information, and to opt out of any
              &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal
              information. We do not sell or share personal information as those
              terms are defined under the CCPA, and we do not discriminate
              against you for exercising your rights.
            </p>
            <p>
              To exercise any right, email{" "}
              <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>. For
              personal data we process as a processor on a client&rsquo;s behalf,
              we will refer your request to that client (the controller) and
              support them in responding. We respond within the timelines
              required by applicable law.
            </p>

            <h2>7. Cookies</h2>
            <p>
              We use a minimal set of cookies and similar technologies.
              Strictly necessary cookies (for core site functionality and your
              theme/consent preferences) are always on. Non-essential cookies,
              including any analytics, are set only after you consent through our
              cookie banner. You can change your choice at any time via{" "}
              <strong>Cookie settings</strong> in the footer. At present we do
              not load third-party analytics or advertising cookies without
              consent.
            </p>

            <h2>8. Children&rsquo;s data</h2>
            <p>
              Our website and services are intended for businesses and
              professionals and are not directed to children. We do not knowingly
              collect personal data from anyone under 18. If you believe a minor
              has provided us personal data, contact us and we will delete it.
            </p>

            <h2>9. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. Material changes will
              be posted on this page with a new &ldquo;Last updated&rdquo; date.
            </p>

            <h2>10. Contact</h2>
            <p>
              Questions, requests, or complaints about privacy? Email{" "}
              <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>. For general
              enquiries, use{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> or our{" "}
              <Link href="/contact">contact page</Link>.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
