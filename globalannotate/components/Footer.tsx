import Link from "next/link";
import { Mail } from "lucide-react";
import Logo from "./Logo";
import { services, site } from "@/lib/site";
import {
  LinkedInIcon,
  TwitterIcon,
  InstagramIcon,
  FacebookIcon,
} from "./SocialIcons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-ink-200 bg-ink-50/50">
      <div className="container-wide py-14 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-4 text-sm text-ink-600 max-w-sm leading-relaxed">
            {site.tagline}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink-900 hover:text-brand-700 transition"
          >
            <Mail className="h-4 w-4" />
            {site.email}
          </a>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-sm font-semibold text-ink-900">Services</h4>
          <ul className="mt-4 space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-sm text-ink-600 hover:text-brand-700 transition"
                >
                  {s.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-sm font-semibold text-ink-900">Company</h4>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/about" className="text-sm text-ink-600 hover:text-brand-700 transition">About</Link>
            </li>
            <li>
              <Link href="/portfolio" className="text-sm text-ink-600 hover:text-brand-700 transition">Portfolio</Link>
            </li>
            <li>
              <Link href="/reviews" className="text-sm text-ink-600 hover:text-brand-700 transition">Reviews</Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-ink-600 hover:text-brand-700 transition">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-sm font-semibold text-ink-900">Follow</h4>
          <div className="mt-4 flex items-center gap-2">
            <SocialIcon href={site.social.linkedin} label="LinkedIn">
              <LinkedInIcon className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href={site.social.twitter} label="Twitter / X">
              <TwitterIcon className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href={site.social.instagram} label="Instagram">
              <InstagramIcon className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href={site.social.facebook} label="Facebook">
              <FacebookIcon className="h-4 w-4" />
            </SocialIcon>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-200">
        <div className="container-wide py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-500">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="text-xs text-ink-500">
            Precision Across Languages. Intelligence Across Data. Growth Across Markets.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 bg-white text-ink-600 hover:text-brand-700 hover:border-brand-300 transition"
    >
      {children}
    </a>
  );
}
