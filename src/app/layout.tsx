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
  title: "LeadSphere AI — More Listings. Powered by AI.",
  description:
    "Generate high-quality seller leads, automate prospecting, and close more deals with LeadSphere AI — the intelligent real estate lead generation platform.",
  keywords: [
    "real estate leads",
    "AI lead generation",
    "real estate CRM",
    "prospecting",
    "skip tracing",
    "seller leads",
  ],
  authors: [{ name: "LeadSphere AI" }],
  metadataBase: new URL("https://leadsphere.ai"),
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon-32.png",
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ url: "/favicon-512.png", sizes: "512x512", type: "image/png" }],
  },
  openGraph: {
    title: "LeadSphere AI — More Listings. Powered by AI.",
    description:
      "The AI-powered real estate lead generation platform for modern agents and teams. Generate high-quality seller leads, automate prospecting, and close more deals.",
    siteName: "LeadSphere AI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1344,
        height: 768,
        alt: "LeadSphere AI — More Listings. Powered by AI.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LeadSphere AI — More Listings. Powered by AI.",
    description:
      "The AI-powered real estate lead generation platform for modern agents and teams.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-body antialiased bg-ink text-white selection:bg-electric/30 selection:text-white overflow-x-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
