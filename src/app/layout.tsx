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
  title: "Opus Global Solution | Workflow Automation for Realtors",
  description:
    "Your trusted partner for marketing consulting, outreach support, and CRM solutions designed for licensed real estate professionals. Human-verified outreach, virtual assistants, and documented workflows.",
  keywords: [
    "real estate leads",
    "lead generation",
    "real estate CRM",
    "prospecting",
    "skip tracing",
    "seller leads",
    "workflow automation",
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
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-body antialiased bg-ink text-white selection:bg-electric/30 selection:text-white overflow-x-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
