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
import TermsZh, { ZH_META } from "@/components/zh/TermsZh";
import TermsDe, { DE_META } from "@/components/de/TermsDe";
import { deMetadata } from "@/lib/de";
import { zhMetadata } from "@/lib/zh";

const TITLE = "Terms of Service";
const DESCRIPTION =
  "The terms that govern use of the GlobalAnnotate website and our general service terms. Signed client contracts, MSAs, and SOWs take precedence.";

const LAST_UPDATED = "18 October 2026";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "zh") return zhMetadata({ path: "/terms", ...ZH_META });
  if (locale === "de") return deMetadata({ path: "/terms", ...DE_META });
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: hreflangAlternates(locale, "/terms"),
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: `${site.url}/terms`,
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

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (locale === "zh") return <TermsZh />;
  if (locale === "de") return <TermsDe />;
  const note = (await getTranslations())("legalNote");
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            name: `${TITLE} — ${site.name}`,
            description: DESCRIPTION,
            url: `${site.url}/terms`,
          }),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Terms of Service", url: `${site.url}/terms` },
          ]),
        ]}
      />
      <Section className="pt-16 pb-24">
        <div className="max-w-3xl">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Terms of Service", href: "/terms" },
            ]}
            tone="light"
            className="mb-6"
          />
          <span className="badge">Legal</span>
          <h1 className="page-h1 mt-5">Terms of Service</h1>
          <p className="mt-4 text-sm text-ink-500">Last updated: {LAST_UPDATED}</p>

          {note && (
            <div className="mt-4 rounded-xl border border-ink-200 bg-ink-50 p-4 text-sm text-ink-600">
              {note} The English version of these Terms is the governing version.
            </div>
          )}

          <div className="prose-section">
            <p>
              These Terms govern your use of the {site.name} website at{" "}
              <Link href={site.url}>{site.domain}</Link> (the
              &ldquo;Website&rdquo;) and set out our general terms for services.
              By using the Website or engaging us, you agree to these Terms.
            </p>

            <h2>1. Precedence of signed contracts</h2>
            <p>
              Where you have signed a separate agreement with us &mdash; such as
              a Master Services Agreement (MSA), a Statement of Work (SOW), a
              Data Processing Agreement (DPA), or a Non-Disclosure Agreement
              (NDA) &mdash; <strong>that signed agreement takes precedence</strong>{" "}
              over these Terms to the extent of any conflict. These Terms apply
              where no signed agreement covers the point in question.
            </p>

            <h2>2. Use of the Website</h2>
            <p>
              You may use the Website for lawful purposes only. You agree not to
              misuse it, interfere with its operation or security, attempt
              unauthorized access, scrape it at scale, or use it to infringe the
              rights of others.
            </p>

            <h2>3. Intellectual property</h2>
            <p>
              The Website and its content &mdash; text, design, graphics, logos,
              and the &ldquo;GlobalAnnotate&rdquo; and
              &ldquo;MarketReady&trade;&rdquo; marks &mdash; are owned by{" "}
              {site.name} or its licensors and are protected by intellectual
              property laws. You may not copy, reproduce, or create derivative
              works from the Website without our permission. Rights in
              deliverables we produce for clients are addressed in section 6.
            </p>

            <h2>4. Acceptable use</h2>
            <p>
              You agree not to submit unlawful content, malware, or content you
              do not have the right to share, and not to use our services to
              produce material that is unlawful or that infringes third-party
              rights.
            </p>

            <h2>5. Quotes, purchase orders &amp; SOWs</h2>
            <p>
              Quotes we provide are estimates based on the scope, volume,
              language pairs, and turnaround you describe, and are valid for the
              period stated (or 30 days if none is stated). Work begins once you
              accept a quote, issue a purchase order, or sign a SOW. The scope,
              fees, and schedule in an accepted quote, PO, or SOW govern that
              engagement.
            </p>

            <h2>6. Payment, revisions &amp; rights</h2>
            <ul>
              <li>
                {/* TODO(Gideon): confirm standard payment terms (net days)
                    and billing currency, and whether deposits apply. */}
                <strong>Payment terms:</strong> invoices are payable within{" "}
                <em>[net days — TODO]</em> of the invoice date, in{" "}
                <em>[currency — TODO]</em>, unless a signed agreement or SOW
                states otherwise. We may require a deposit for new clients or
                large programs.
              </li>
              <li>
                <strong>Revisions:</strong> each deliverable includes reasonable
                revisions to correct work that does not meet the agreed brief or
                specification.
              </li>
              <li>
                <strong>Quality complaints window:</strong> please raise any
                quality concern within{" "}
                <em>[complaints window — TODO, e.g. 14 days]</em> of delivery so
                we can investigate and, where a concern is valid, correct the
                work at no additional cost.
              </li>
              <li>
                <strong>Transfer of rights:</strong> on full payment of the
                applicable fees, all intellectual property rights in the final
                translated or localized deliverables transfer to you, except for
                our pre-existing materials, tools, and any translation memories
                or glossaries we retain to support future work (which we license
                to you for your use).
              </li>
            </ul>

            <h2>7. Client responsibility for final use</h2>
            <p>
              We deliver professional language and data services. However,{" "}
              <strong>
                you remain responsible for the final review, approval, and
                regulatory and legal use of translated or localized content
              </strong>{" "}
              in your market &mdash; including compliance with medical,
              regulatory, legal, labeling, and advertising requirements that
              apply to you. Where required, you should arrange in-market legal
              or regulatory review before publication or submission.
            </p>

            <h2>8. Confidentiality</h2>
            <p>
              We treat client materials as confidential, limit access on a
              need-to-know basis, and bind our team and linguists to NDAs. See
              our <Link href="/security">Security &amp; Confidentiality</Link>{" "}
              page. Each party will protect the other&rsquo;s confidential
              information and use it only to perform the engagement.
            </p>

            <h2>9. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, {site.name} is not liable
              for indirect, incidental, special, or consequential damages, or for
              loss of profits, revenue, or data. Our total aggregate liability
              arising out of or relating to an engagement is limited to the fees
              paid for the specific services giving rise to the claim. Nothing in
              these Terms limits liability that cannot be limited by law.
            </p>

            <h2>10. Warranties &amp; disclaimer</h2>
            <p>
              We provide services with reasonable skill and care in line with our
              quality process. Except as expressly stated, the Website and
              services are provided &ldquo;as is&rdquo; without further
              warranties of any kind.
            </p>

            <h2>11. Force majeure</h2>
            <p>
              Neither party is liable for delay or failure to perform caused by
              events beyond its reasonable control, including natural disasters,
              war, civil unrest, strikes, failures of utilities or
              telecommunications, and government action.
            </p>

            <h2>12. Termination</h2>
            <p>
              Either party may terminate an engagement as set out in the
              applicable SOW or agreement, or on reasonable written notice where
              none applies. You remain responsible for fees for work performed
              and non-cancellable commitments up to the effective date of
              termination. Sections that by their nature should survive
              (including confidentiality, IP, and limitation of liability)
              survive termination.
            </p>

            <h2>13. Freelancers &amp; vendors</h2>
            <p>
              If you apply through our{" "}
              <Link href="/freelancers">linguist network</Link> or vendor
              onboarding, you confirm that the information you provide is accurate
              and that you have the right to share any samples or references.
              Engaged linguists and vendors work under separate agreements and
              NDAs that govern confidentiality, data handling, IP assignment, and
              payment; those agreements take precedence over these Terms for that
              relationship.
            </p>

            <h2>14. Governing law</h2>
            <p>
              {/* TODO(Gideon): confirm governing law / jurisdiction; update to
                  the Estonian EU entity once formed. Kept as a single editable
                  clause for easy change. */}
              These Terms are governed by the laws of the Federal Republic of
              Nigeria, and the courts of Nigeria have jurisdiction, unless a
              signed agreement specifies otherwise. <em>[Governing law — TODO; an
              EU (Estonia) entity is planned and this clause will be updated
              accordingly.]</em>
            </p>

            <h2>15. Changes to these Terms</h2>
            <p>
              We may update these Terms from time to time. The version published
              on this page with the current &ldquo;Last updated&rdquo; date
              applies to your use of the Website.
            </p>

            <h2>16. Contact</h2>
            <p>
              Questions about these Terms? Email{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> or use our{" "}
              <Link href="/contact">contact page</Link>.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
