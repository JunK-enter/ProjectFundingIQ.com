import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { MotionLayer } from "@/components/MotionLayer";
import { Navbar } from "@/components/Navbar";
import { defaultDescription, defaultTitle, ogImage, siteUrl } from "@/lib/seo";
import "lenis/dist/lenis.css";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | ProjectFundingIQ",
  },
  description: defaultDescription,
  applicationName: "ProjectFundingIQ",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ProjectFundingIQ",
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [ogImage.url],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ProjectFundingIQ",
  url: siteUrl,
  description: defaultDescription,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MotionLayer />
      </body>
    </html>
  );
}
