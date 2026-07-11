import type { Metadata } from "next";
import { SiteChrome, PageHero } from "@/components/leadsphere/SiteChrome";
import { CTABanner } from "@/components/leadsphere/CTABanner";
import {
  GlassCard,
  SectionShell,
} from "@/components/leadsphere/primitives";
import { Reveal } from "@/components/leadsphere/Reveal";
import { ShieldCheck, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Opus Global Solution",
  description:
    "How Opus Global Solution collects, uses, and protects your information when you use our marketing consulting and outreach services.",
};

/* ----------------------------- Policy sections ----------------------------- */
type PolicySection = {
  heading: string;
  body?: string;
  bullets?: string[];
};

const SECTIONS: PolicySection[] = [
  {
    heading: "1. Introduction",
    body: "Opus Global Solution (\"we\", \"us\", \"our\") is a marketing consulting and support company. This Privacy Policy explains how we collect, use, and protect information when you use our services. By engaging with us, you acknowledge and accept the practices described in this policy.",
  },
  {
    heading: "2. Information We Collect",
    body: "We collect information necessary to deliver and improve our services. This may include:",
    bullets: [
      "Name and contact details (email, phone number)",
      "Company or team information",
      "Campaign and outreach data",
      "CRM and pipeline data you share with us",
      "Billing and payment confirmation (we never store cardholder data)",
    ],
  },
  {
    heading: "3. How We Use Information",
    body: "The information we collect is used strictly for the purposes of operating and improving our services, including:",
    bullets: [
      "Providing outreach support and appointment coordination",
      "Managing CRM setup, organization, and automation",
      "Generating reports and analytics on campaign performance",
      "Delivering services contracted under your selected plan",
      "Communicating with you regarding your account and support",
    ],
  },
  {
    heading: "4. Information Sharing",
    body: "We do not sell, resell, or rent your data to third parties. Information is shared only with your explicit consent, with service providers under appropriate confidentiality agreements, or as required by applicable law.",
  },
  {
    heading: "5. Data Security",
    body: "All payments are processed securely through our PCI-compliant processor's hosted checkout. We maintain documented access controls and never store or directly handle cardholder data. We take reasonable technical and organizational measures to safeguard your information.",
  },
  {
    heading: "6. Your Rights",
    body: "You have the right to access, correct, or delete the personal data we hold about you. To exercise any of these rights, contact us using the details below and we will respond in accordance with applicable law.",
  },
  {
    heading: "7. Cookies",
    body: "Our website uses basic analytics cookies only, used to understand aggregate traffic patterns and improve the site experience. We do not use cookies for targeted advertising.",
  },
  {
    heading: "8. Compliance",
    body: "Our outreach practices comply with TCPA, DNC, CAN-SPAM, and CCPA/CPRA requirements. All outreach is consent-based, human-only, and fully documented. Clients remain responsible for their own regulatory licensing in their jurisdictions.",
  },
  {
    heading: "9. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. Continued use of our services after changes are posted constitutes acceptance of the updated policy. Please check the date below for the most recent revision.",
  },
  {
    heading: "10. Contact",
    body: "If you have any questions about this Privacy Policy, please contact us:",
    bullets: [
      "Email: info@opussolutions.com",
      "Address: 418 Broadway, Ste. R, Albany, NY 12207, United States",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <SiteChrome>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How Opus Global Solution collects, uses, and protects your information."
      />

      <SectionShell id="privacy-policy" className="pt-6 md:pt-8">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <GlassCard strong sheen className="relative overflow-hidden p-7 sm:p-10">
              {/* Ambient corner glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-electric/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-violet/15 blur-3xl" />

              {/* Header row */}
              <div className="relative flex flex-col gap-5 border-b border-white/10 pb-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric/15 ring-1 ring-electric/30">
                    <ShieldCheck className="h-5 w-5 text-electric" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium uppercase tracking-wider text-white/45">
                      Legal
                    </span>
                    <span className="font-heading text-xl font-semibold text-white">
                      Privacy Policy
                    </span>
                  </div>
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                  Last updated: January 2025
                </p>
              </div>

              {/* Sections */}
              <div className="relative flex flex-col gap-8 pt-8">
                {SECTIONS.map((section) => (
                  <section key={section.heading} className="flex flex-col gap-3">
                    <h2 className="font-heading text-lg font-semibold text-white">
                      {section.heading}
                    </h2>
                    {section.body && (
                      <p className="text-sm leading-relaxed text-white/60">
                        {section.body}
                      </p>
                    )}
                    {section.bullets && (
                      <ul className="flex flex-col gap-2 pl-1">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-3 text-sm leading-relaxed text-white/60"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric/70 shadow-[0_0_8px_#3b82f6]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              {/* Contact strip */}
              <div className="relative mt-9 flex flex-col gap-3 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-electric" />
                  <a
                    href="mailto:info@opussolutions.com"
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    info@opussolutions.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-violet" />
                  <span className="text-sm text-white/70">
                    418 Broadway, Ste. R, Albany, NY 12207
                  </span>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </SectionShell>

      {/* Closing CTA */}
      <CTABanner
        title="Questions about privacy?"
        subtitle="Contact our team and we'll be happy to help."
      />
    </SiteChrome>
  );
}
