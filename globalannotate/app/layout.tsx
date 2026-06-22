import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/Toast";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { SpeedInsights } from "@vercel/speed-insights/next";

const body = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Brand-only font for the "GlobalAnnotate" wordmark beside the GA monogram
// in the header and footer. Scoped via the .brand-wordmark utility — body
// stays Plus Jakarta Sans, headings stay Bricolage Grotesque.
const brand = Poppins({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const DEFAULT_TITLE = `${site.name} — Translation, AI Annotation, SEO & Digital Marketing`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: DEFAULT_TITLE,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: site.url },
  keywords: [
    "AI annotation",
    "data labeling",
    "translation",
    "localization",
    "multilingual SEO",
    "international SEO",
    "SEO services",
    "digital marketing",
    "Facebook ads",
    "Instagram ads",
    "LLM training data",
    "computer vision data",
    "globalannotate",
  ],
  openGraph: {
    title: DEFAULT_TITLE,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Translation, AI Annotation, SEO & Digital Marketing`,
    description: site.description,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
  // Google Search Console site verification — emitted as
  // <meta name="google-site-verification" content="..."> on every page
  // by Next's root-layout metadata.
  verification: {
    google: "google6092810f1a80faed",
  },
};

export const viewport: Viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} ${brand.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-white text-ink-900">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <ToastProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
