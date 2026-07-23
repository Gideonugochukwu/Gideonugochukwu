import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Logo from "./Logo";
import { services, site, activeSocialLinks, founder } from "@/lib/site";
import { SOCIAL_META } from "./SocialIcons";

export default function Footer() {
  const t = useTranslations("footer");
  const ts = useTranslations("services");
  const year = new Date().getFullYear();
  const socials = activeSocialLinks();

  return (
    <footer className="relative mt-24 border-t border-ink-200 bg-ink-50/50">
      <div className="container-wide py-14 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-4 text-sm text-ink-600 max-w-sm leading-relaxed">
            {site.tagline}
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-900 hover:text-brand-700 transition"
            >
              <Mail className="h-4 w-4" />
              {site.email}
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-sm font-semibold text-ink-900">{t("servicesHeading")}</h4>
          <ul className="mt-4 space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-sm text-ink-600 hover:text-brand-700 transition"
                >
                  {ts(`${s.slug}.short`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-sm font-semibold text-ink-900">{t("companyHeading")}</h4>
          <ul className="mt-4 space-y-2.5">
            <li><Link href="/about" className="text-sm text-ink-600 hover:text-brand-700 transition">{t("about")}</Link></li>
            <li><Link href="/portfolio" className="text-sm text-ink-600 hover:text-brand-700 transition">{t("portfolio")}</Link></li>
            <li><Link href="/reviews" className="text-sm text-ink-600 hover:text-brand-700 transition">{t("reviews")}</Link></li>
            <li><Link href="/blog" className="text-sm text-ink-600 hover:text-brand-700 transition">{t("blog")}</Link></li>
            <li><Link href="/freelancers" className="text-sm text-ink-600 hover:text-brand-700 transition">{t("network")}</Link></li>
            <li><Link href="/contact" className="text-sm text-ink-600 hover:text-brand-700 transition">{t("contact")}</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-sm font-semibold text-ink-900">{t("followHeading")}</h4>
          <ul className="mt-4 flex flex-col gap-2.5">
            {socials.map(({ key, href }) => {
              const meta = SOCIAL_META[key];
              if (!meta) return null;
              const Icon = meta.Icon;
              return (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 text-sm text-ink-600 hover:text-brand-700 transition"
                  >
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-white ring-1 ring-ink-200 text-ink-700 group-hover:ring-brand-300 group-hover:text-brand-700 transition">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-medium">{meta.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          <h4 className="mt-6 text-sm font-semibold text-ink-900">{t("legalHeading")}</h4>
          <ul className="mt-4 space-y-2.5">
            <li><Link href="/privacy" className="text-sm text-ink-600 hover:text-brand-700 transition">{t("privacy")}</Link></li>
            <li><Link href="/terms" className="text-sm text-ink-600 hover:text-brand-700 transition">{t("terms")}</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-200">
        <div className="container-wide py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ink-500">
          <p>© {year} {site.name}. {t("rights")}</p>
          <p>
            {t("foundedBy")}{" "}
            <Link
              href="/about#founder"
              className="font-medium text-ink-700 hover:text-brand-700 transition"
            >
              {founder.name}
            </Link>
            .
          </p>
          <p>Precision Across Languages. Intelligence Across Data. Growth Across Markets.</p>
        </div>
      </div>
    </footer>
  );
}
