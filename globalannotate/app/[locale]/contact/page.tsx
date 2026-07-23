import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import QuoteForm from "@/components/QuoteForm";
import JsonLd from "@/components/JsonLd";
import { Mail, Globe2, Clock4 } from "lucide-react";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import PageHero from "@/components/PageHero";
import { aboutHeroSlides } from "@/lib/images";
import { buildMetadata } from "@/lib/i18n-meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, path: "/contact", metaKey: "contact" });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Contact", url: `${site.url}/contact` },
        ])}
      />
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("heading")}
        subtitle={t("subhead")}
        slides={aboutHeroSlides}
        size="compact"
      />

      <Section className="pt-12 md:pt-16 pb-24">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10">
          <div className="space-y-6">
            <div className="card p-6">
              <Mail className="h-5 w-5 text-brand-600" />
              <h3 className="mt-3 font-semibold">{t("emailUsHeading")}</h3>
              <p className="mt-1 text-sm text-ink-600">{t("emailUsBody")}</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 inline-block font-medium text-ink-900 hover:text-brand-700 transition"
              >
                {site.email}
              </a>
            </div>

            <div className="card p-6">
              <Clock4 className="h-5 w-5 text-brand-600" />
              <h3 className="mt-3 font-semibold">{t("responseHeading")}</h3>
              <p className="mt-1 text-sm text-ink-600">{t("responseBody")}</p>
            </div>

            <div className="card p-6">
              <Globe2 className="h-5 w-5 text-brand-600" />
              <h3 className="mt-3 font-semibold">{t("whereHeading")}</h3>
              <p className="mt-1 text-sm text-ink-600">{t("whereBody")}</p>
            </div>
          </div>

          <div>
            <h2 className="section-h2 text-ink-900">{t("formHeading")}</h2>
            <p className="mt-3 text-ink-600">
              {t.rich("formIntro", {
                services: (chunks) => (
                  <Link
                    href="/services"
                    className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
                  >
                    {chunks}
                  </Link>
                ),
                cases: (chunks) => (
                  <Link
                    href="/portfolio"
                    className="font-semibold text-brand-700 hover:text-brand-900 underline-offset-4 hover:underline"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>
            <div className="mt-6">
              <QuoteForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
