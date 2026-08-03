import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans, Poppins, Noto_Sans_SC } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getMessages, getTranslations } from "next-intl/server";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/Toast";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { routing } from "@/i18n/routing";
import { hreflangAlternates, OG_LOCALE, ogAlternateLocales, HTML_LANG, ogImages, OG_IMAGE_URL } from "@/lib/i18n-meta";

const body = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

// Display serif — Fraunces variable, with the optical-size axis loaded so
// large headlines render with the display cut and small ones stay readable.
const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

// Brand-only font for the "GlobalAnnotate" wordmark beside the GA monogram.
const brand = Poppins({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

// CJK font for Simplified Chinese. Fraunces and Plus Jakarta Sans have no
// Chinese glyphs, so the zh locale swaps both display and body to Noto Sans
// SC via the `.lang-zh` class (see globals.css). `preload: false` keeps this
// large font off the critical path for EN/DE — the browser only fetches it
// when `.lang-zh` actually renders Chinese text.
const notoSC = Noto_Sans_SC({
  variable: "--font-noto-sc",
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t("home.title"),
      template: `%s · ${site.name}`,
    },
    description: t("home.description"),
    alternates: hreflangAlternates(locale, ""),
    keywords: [
      "AI annotation",
      "data labeling",
      "translation",
      "localization",
      "multilingual SEO",
      "digital marketing",
      "MarketReady",
      "globalannotate",
    ],
    openGraph: {
      title: t("home.title"),
      description: t("home.description"),
      url: site.url,
      siteName: site.name,
      locale: OG_LOCALE[locale] ?? "en_US",
      alternateLocale: ogAlternateLocales(locale),
      type: "website",
      images: ogImages(),
    },
    twitter: {
      card: "summary_large_image",
      title: t("home.title"),
      description: t("home.description"),
      images: [OG_IMAGE_URL],
    },
    icons: {
      icon: [{ url: "/favicon.ico", sizes: "any" }],
      apple: "/apple-touch-icon.png",
    },
    robots: { index: true, follow: true },
    verification: { google: "google6092810f1a80faed" },
  };
}

export const viewport: Viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
};

// Applies the saved theme (or the OS preference) before first paint.
const THEME_INIT = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})()`;

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  // Chinese swaps the whole type system to Noto Sans SC via `.lang-zh`; the
  // font variable is only attached (and thus only downloaded) for that locale.
  const isZh = locale === "zh";

  return (
    <html
      lang={HTML_LANG[locale] ?? locale}
      suppressHydrationWarning
      className={`${body.variable} ${display.variable} ${brand.variable}${
        isZh ? ` ${notoSC.variable} lang-zh` : ""
      }`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body className="min-h-screen flex flex-col text-ink-900">
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={[organizationSchema(), websiteSchema()]} />
          <ToastProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
