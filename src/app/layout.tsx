import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Real Estate Lead Generation & Marketing Support | Opus Global Solution",
  description:
    "Opus Global Solution helps US real estate agents generate seller leads, manage CRM, and automate outreach with human-verified, compliance-first marketing support. Get started today.",
  keywords: [
    "real estate lead generation",
    "real estate marketing",
    "seller leads",
    "CRM for real estate",
    "outreach support",
    "virtual assistant real estate",
    "real estate CRM support",
    "workflow automation real estate",
    "human-verified outreach",
    "real estate marketing services",
  ],
  authors: [{ name: "Opus Global Solution" }],
  // Publicly-accessible base so OG/Twitter image URLs resolve as absolute.
  // Uses the GitHub raw URL so link previews work even before you deploy.
  // After deploying to Vercel, you can change this to your production URL.
  metadataBase: new URL("https://raw.githubusercontent.com/Aamirn1/Real-estate-agent-/main/public"),
  icons: {
    icon: [
      { url: "/favicon-32.png?v=4", sizes: "32x32", type: "image/png" },
      { url: "/favicon-512.png?v=4", sizes: "512x512", type: "image/png" },
      { url: "/logo.svg?v=4", type: "image/svg+xml" },
    ],
    shortcut: "/favicon-32.png?v=4",
    apple: [{ url: "/apple-icon.png?v=4", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Opus Global Solution | Workflow Automation for Realtors",
    description:
      "Your trusted partner for marketing consulting, outreach support, and CRM solutions designed for licensed real estate professionals. Human-verified outreach, virtual assistants, and documented workflows.",
    siteName: "Opus Global Solution",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://raw.githubusercontent.com/Aamirn1/Real-estate-agent-/main/public/og-image.jpg",
        width: 1344,
        height: 768,
        alt: "Opus Global Solution | Workflow Automation for Realtors",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Opus Global Solution | Workflow Automation for Realtors",
    description:
      "Your trusted partner for marketing consulting, outreach support, and CRM solutions for licensed real estate professionals.",
    images: ["https://raw.githubusercontent.com/Aamirn1/Real-estate-agent-/main/public/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://raw.githubusercontent.com" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-body antialiased bg-ink text-black selection:bg-electric/30 selection:text-black overflow-x-hidden`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
              name: "Opus Global Solution",
              description: "Professional real estate marketing consulting and outreach support company for licensed real estate professionals.",
              url: "https://opus-globalsolution.com",
              telephone: "+1-320-331-0910",
              email: "info@opussolutions.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "418 Broadway, Ste. R",
                addressLocality: "Albany",
                addressRegion: "NY",
                postalCode: "12207",
                addressCountry: "US",
              },
              areaServed: { "@type": "Country", name: "United States" },
              sameAs: [],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Opus Global Solution",
              url: "https://opus-globalsolution.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://opus-globalsolution.com/blog?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
