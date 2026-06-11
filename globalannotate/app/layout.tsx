import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/Toast";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";

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
  icons: { icon: "/favicon.svg" },
  robots: { index: true, follow: true },
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
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-ink-900">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <ToastProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
