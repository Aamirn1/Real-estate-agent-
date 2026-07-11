import type { Metadata } from "next";
import { SiteChrome, PageHero } from "@/components/leadsphere/SiteChrome";
import { CTABanner } from "@/components/leadsphere/CTABanner";
import {
  GlassCard,
  SectionShell,
} from "@/components/leadsphere/primitives";
import { Reveal } from "@/components/leadsphere/Reveal";
import { FileText, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Opus Global Solution",
  description:
    "The terms governing your use of Opus Global Solution' marketing consulting, outreach, and CRM services for real estate professionals.",
};

/* ----------------------------- Terms sections ----------------------------- */
type TermSection = {
  heading: string;
  body?: string;
  bullets?: string[];
};

const SECTIONS: TermSection[] = [
  {
    heading: "1. Acceptance of Terms",
    body: "By engaging Opus Global Solution or using any of our services, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you should not engage our services.",
  },
  {
    heading: "2. Description of Services",
    body: "Opus Global Solution provides marketing consulting and support services for licensed real estate professionals. Our services include:",
    bullets: [
      "Marketing consulting",
      "CRM support and management",
      "Workflow automation",
      "Virtual assistance",
      "Outreach support",
      "Digital marketing",
      "Appointment coordination",
      "Reporting & analytics",
    ],
  },
  {
    heading: "3. Not a Brokerage",
    body: "Opus Global Solution is not a real estate brokerage. We do not list or sell property, and we do not resell leads. We act solely as a marketing consulting and support partner to licensed real estate professionals.",
  },
  {
    heading: "4. Client Responsibilities",
    body: "As a client, you agree to:",
    bullets: [
      "Provide accurate, up-to-date information required for service delivery",
      "Maintain your own regulatory licensing in good standing",
      "Comply with the Fair Housing Act and all applicable federal, state, and local regulations",
      "Notify us promptly of any change affecting your account or service eligibility",
    ],
  },
  {
    heading: "5. Outreach & Compliance",
    body: "All outreach performed on your behalf is human-only | we do not use autodialers or robocalls. Engagement is consent-based and documented. Our practices comply with TCPA, DNC, and CAN-SPAM requirements. You remain responsible for your own regulatory licensing in the jurisdictions you operate.",
  },
  {
    heading: "6. Payment Terms",
    body: "Each plan carries a one-time setup fee according to the tier selected: Custom (Per Lead), Trial ($450), Silver ($900), Gold ($1800), Platinum ($2500), or Sapphire ($4000). Referral fees apply on successful closings as outlined below. All payments are processed securely through our PCI-compliant processor.",
  },
  {
    heading: "7. Referral Fees",
    body: "Referral fees are due on successful closings and vary by plan:",
    bullets: [
      "Custom Plan | 20% referral fee",
      "Trial Plan | 20% referral fee",
      "Silver Plan | 15% referral fee",
      "Gold Plan | 10% referral fee",
      "Platinum Plan | 8% referral fee",
      "Sapphire Plan | 5% referral fee",
    ],
  },
  {
    heading: "8. Cancellation",
    body: "Services may be cancelled with written notice. Billing stops at the end of the active billing cycle, and no further charges are applied after cancellation. Setup fees, once work has begun, are non-refundable as outlined in our Refund Policy.",
  },
  {
    heading: "9. Intellectual Property",
    body: "All materials, workflows, documentation, and methodologies developed by Opus Global Solution remain our intellectual property. Clients receive a limited license to use these materials for the duration of the engagement and for the purposes of the contracted services.",
  },
  {
    heading: "10. Limitation of Liability",
    body: "Opus Global Solution does not guarantee specific business results, lead conversions, or revenue outcomes. Our service improves efficiency through marketing support, documentation, and workflow management. We are not liable for indirect, incidental, or consequential damages arising from the use of our services.",
  },
  {
    heading: "11. Governing Law",
    body: "These Terms & Conditions are governed by the laws of the United States. Any disputes shall be resolved per applicable state law in the jurisdiction where Opus Global Solution operates.",
  },
  {
    heading: "12. Contact",
    body: "If you have any questions about these Terms & Conditions, please contact us:",
    bullets: [
      "Email: info@opussolutions.com",
      "Phone: (320) 331-0910",
    ],
  },
];

export default function TermsPage() {
  return (
    <SiteChrome>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description="The terms governing your use of Opus Global Solution' services."
      />

      <SectionShell id="terms" className="pt-6 md:pt-8">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <GlassCard strong sheen className="relative overflow-hidden p-7 sm:p-10">
              {/* Ambient corner glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-electric/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-cyan/15 blur-3xl" />

              {/* Header row */}
              <div className="relative flex flex-col gap-5 border-b border-white/10 pb-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric/15 ring-1 ring-electric/30">
                    <FileText className="h-5 w-5 text-electric" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium uppercase tracking-wider text-white/45">
                      Legal
                    </span>
                    <span className="font-heading text-xl font-semibold text-white">
                      Terms &amp; Conditions
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
                  <Phone className="h-4 w-4 text-violet" />
                  <a
                    href="tel:+13203310910"
                    className="text-sm text-white/70 transition-colors hover:text-white tnum"
                  >
                    (320) 331-0910
                  </a>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </SectionShell>

      {/* Closing CTA */}
      <CTABanner
        title="Ready to get started?"
        subtitle="Review our plans and choose the one that fits your business."
      />
    </SiteChrome>
  );
}
