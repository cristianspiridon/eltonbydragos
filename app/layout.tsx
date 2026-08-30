import type { Metadata, Viewport } from "next";
import { Archivo, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileBookingBar } from "@/components/layout/MobileBookingBar";
import { siteConfig } from "@/lib/site";

/**
 * High-contrast Didone for display type, the West End poster voice.
 *
 * latin-ext is required, not optional: the biography sets "Dragoș Moștenescu"
 * at display size and the comma-below S lives in that range. Splitting it into
 * a separate unpreloaded instance was measured and came out slower, so the two
 * subsets stay in one preloaded file.
 */
const bodoni = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bodoni",
  display: "swap",
});

/** Clean grotesque for UI and body copy. latin-ext carries "Dragoș". */
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-archivo",
  display: "swap",
});

const description = `${siteConfig.brand.name} is a live Elton John tribute show for theatres, festivals, weddings, corporate and private events across the UK. Watch the performance and check availability.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.brand.name} | Elton John Tribute Show | UK Bookings`,
    template: `%s | ${siteConfig.brand.name}`,
  },
  description,
  applicationName: siteConfig.brand.name,
  keywords: [
    "Elton John tribute act",
    "Elton John tribute UK",
    "Elton John tribute show",
    "Elton John tribute singer",
    "Elton John tribute pianist",
    "Elton John tribute for weddings",
    "Elton John tribute for events",
    "live tribute band booking",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteConfig.url,
    siteName: siteConfig.brand.name,
    title: `${siteConfig.brand.name} | ${siteConfig.brand.subtitle}`,
    description,
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: `Live performance photograph from ${siteConfig.brand.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.brand.name} | ${siteConfig.brand.subtitle}`,
    description,
    images: ["/opengraph-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "entertainment",
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

/**
 * Structured data. Deliberately limited to facts supplied by the client.
 * No reviews, awards, venues or ratings are asserted.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.brand.name,
      description,
      inLanguage: "en-GB",
      publisher: { "@id": `${siteConfig.url}/#act` },
    },
    {
      "@type": "MusicGroup",
      "@id": `${siteConfig.url}/#act`,
      name: siteConfig.brand.name,
      alternateName: siteConfig.brand.subtitle,
      description,
      url: siteConfig.url,
      image: `${siteConfig.url}/opengraph-image.jpg`,
      genre: ["Pop", "Rock", "Tribute"],
      areaServed: { "@type": "Country", name: "United Kingdom" },
      email: siteConfig.contact.email,
      sameAs: [siteConfig.social.youtube],
      member: { "@type": "Person", name: siteConfig.performer.name },
      makesOffer: [
        "Theatre and venue performances",
        "Festival performances",
        "Wedding and celebration performances",
        "Corporate and private event performances",
      ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${bodoni.variable} ${archivo.variable}`}>
      <body className="grain min-h-screen bg-ink antialiased">
        <a
          href="#the-show"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-champagne focus:px-5 focus:py-3 focus:font-sans focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.2em] focus:text-ink"
        >
          Skip to content
        </a>

        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <MobileBookingBar />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
