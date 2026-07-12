import type { Metadata } from "next";
import { SiteChrome, PageHero } from "@/components/leadsphere/SiteChrome";
import { CTABanner } from "@/components/leadsphere/CTABanner";
import {
  GlassCard,
  SectionShell,
} from "@/components/leadsphere/primitives";
import { Reveal } from "@/components/leadsphere/Reveal";
import { Receipt, Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund Policy | Opus Global Solution",
  description:
    "Our policy on refunds, cancellations, setup fees, and billing for Opus Global Solution' marketing support services.",
};

/* ----------------------------- Refund policy sections ----------------------------- */
type RefundSection = {
  heading: string;
  body?: string;
  bullets?: string[];
};

const SECTIONS: RefundSection[] = [
  {
    heading: "1. Overview",
    body: "Opus Global Solution offers marketing consulting and support services with one-time setup plans. This Refund Policy outlines the terms governing refunds, cancellations, and billing for all our service plans.",
  },
  {
    heading: "2. Setup Fees",
    body: "One-time onboarding and setup fees are non-refundable once work has begun. These fees cover setup, documentation, and account preparation prior to the start of outreach activities.",
  },
  {
    heading: "3. Cancellation",
    body: "Services can be cancelled at any time with written notice. Billing stops at the end of the active billing cycle. No charges are applied after cancellation has been processed.",
  },
  {
    heading: "4. Referral Fees",
    body: "Referral fees apply only on successful closings. If a closing does not occur, no referral fee is owed. Referral fee percentages vary by plan and are outlined in our Terms & Conditions.",
  },
  {
    heading: "5. Pro-Rata Refunds",
    body: "If cancellation occurs mid-cycle, no pro-rata refund of the setup fee is issued. However, no future billing occurs after cancellation, and any pending outreach for the cancelled period is closed out at the end of the active billing cycle.",
  },
  {
    heading: "6. Service Discontinuation",
    body: "If services are discontinued, campaign activity and reporting close at the end of the active billing cycle. All documentation and completed records from the active campaign are provided to the client upon request.",
  },
  {
    heading: "7. Dispute Resolution",
    body: "If you believe a billing charge is incorrect, contact us within 14 days of the disputed billing date. We aim to resolve all disputes promptly and in good faith. Disputes raised after the 14-day window may be limited in the remedies available.",
  },
  {
    heading: "8. Compliance",
    body: "All payments are processed securely through our PCI-compliant processor's hosted checkout. We never store or directly handle cardholder data. Our billing practices comply with applicable payment and consumer protection regulations.",
  },
  {
    heading: "9. Contact",
    body: "If you have any questions about this Refund Policy, please contact us:",
    bullets: [
      "Email: info@opussolutions.com",
      "Phone: (320) 331-0910",
      "Address: 418 Broadway, Ste. R, Albany, NY 12207, United States",
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <SiteChrome>
      <PageHero
        eyebrow="Legal"
        title="Refund Policy"
        description="Our policy on refunds, cancellations, and billing."
      />

      <SectionShell id="refund-policy" className="pt-6 md:pt-8">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <GlassCard strong sheen className="relative overflow-hidden p-7 sm:p-10">
              {/* Ambient corner glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-electric/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-gold/15 blur-3xl" />

              {/* Header row */}
              <div className="relative flex flex-col gap-5 border-b border-black/15 pb-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric/15 ring-1 ring-electric/30">
                    <Receipt className="h-5 w-5 text-electric" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium uppercase tracking-wider text-black/45">
                      Legal
                    </span>
                    <span className="font-heading text-xl font-semibold text-black">
                      Refund Policy
                    </span>
                  </div>
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-black/45">
                  Last updated: January 2025
                </p>
              </div>

              {/* Sections */}
              <div className="relative flex flex-col gap-8 pt-8">
                {SECTIONS.map((section) => (
                  <section key={section.heading} className="flex flex-col gap-3">
                    <h2 className="font-heading text-lg font-semibold text-black">
                      {section.heading}
                    </h2>
                    {section.body && (
                      <p className="text-sm leading-relaxed text-black/60">
                        {section.body}
                      </p>
                    )}
                    {section.bullets && (
                      <ul className="flex flex-col gap-2 pl-1">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-3 text-sm leading-relaxed text-black/60"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric/70 shadow-[0_0_8px_#2563EB]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              {/* Contact strip */}
              <div className="relative mt-9 flex flex-col gap-3 border-t border-black/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-electric" />
                  <a
                    href="mailto:info@opussolutions.com"
                    className="text-sm text-black/70 transition-colors hover:text-black"
                  >
                    info@opussolutions.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-violet" />
                  <a
                    href="tel:+13203310910"
                    className="text-sm text-black/70 transition-colors hover:text-black tnum"
                  >
                    (320) 331-0910
                  </a>
                </div>
              </div>

              {/* Address row */}
              <div className="relative mt-4 flex items-center gap-3 border-t border-white/5 pt-5">
                <MapPin className="h-4 w-4 text-cyan" />
                <span className="text-sm text-black/70">
                  418 Broadway, Ste. R, Albany, NY 12207, United States
                </span>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </SectionShell>

      {/* Closing CTA */}
      <CTABanner
        title="Questions about billing?"
        subtitle="Our team is happy to clarify any policy details."
      />
    </SiteChrome>
  );
}
