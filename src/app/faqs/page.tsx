import type { Metadata } from "next";
import { SiteChrome, PageHero } from "@/components/leadsphere/SiteChrome";
import { CTABanner } from "@/components/leadsphere/CTABanner";
import {
  SectionHeading,
  SectionShell,
} from "@/components/leadsphere/primitives";
import { Reveal } from "@/components/leadsphere/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQs — Opus Solutions",
  description:
    "Find answers to commonly asked questions about Opus Solutions' services, CRM support, marketing, scheduling, pricing, and compliance.",
};

/* ----------------------------- 14 FAQs ----------------------------- */
const FAQS: { q: string; a: string }[] = [
  {
    q: "What services does Opus Solutions offer?",
    a: "We provide eight core services for licensed real estate professionals: Marketing Consulting, CRM Support, Workflow Automation, Virtual Assistance, Outreach Support, Digital Marketing, Appointment Coordination, and Reporting & Analytics.",
  },
  {
    q: "Are you a real estate brokerage?",
    a: "No. We are a marketing consulting and support company. We do not list or sell property, and we do not act as a brokerage under any circumstances.",
  },
  {
    q: "Do you sell data or contacts?",
    a: "No. We do not sell or resell data. We provide consent-based outreach support, documented records, and ongoing CRM management for our clients.",
  },
  {
    q: "How does your outreach work?",
    a: "All outreach is human-only — no autodialers or robocalls. Every engagement is consent-based, documented, and reported back to you with full transparency.",
  },
  {
    q: "Can you set up my CRM?",
    a: "Yes. We handle CRM setup, lead organization, pipeline optimization, and workflow automation so your team can focus on closing rather than data entry.",
  },
  {
    q: "Do you provide a dedicated account manager?",
    a: "Yes. Every client receives a dedicated account manager and a virtual assistant to ensure consistent communication, reporting, and campaign support.",
  },
  {
    q: "What compliance standards do you follow?",
    a: "We adhere to TCPA, DNC, CAN-SPAM, CCPA/CPRA, and the Fair Housing Act. Clients remain responsible for their own regulatory licensing in their jurisdictions.",
  },
  {
    q: "How do you handle data security?",
    a: "All payments are processed securely through our PCI-compliant processor's hosted checkout. We never store or directly handle cardholder data.",
  },
  {
    q: "What are your pricing plans?",
    a: "We offer six plans: Custom (Per Lead), Trial at $450, Silver at $900, Gold at $1800, Platinum at $2500, and Sapphire at $4000. Plans are one-time setup with 30-day or 365-day durations.",
  },
  {
    q: "Is there a setup fee?",
    a: "Yes. A one-time onboarding fee covers setup, documentation, and account preparation before outreach begins. This fee is outlined in your service agreement.",
  },
  {
    q: "Can you manage my calendar and appointments?",
    a: "Yes. Our virtual assistants handle scheduling, calendar management, appointment setting, and client reminders so you never miss a follow-up.",
  },
  {
    q: "Do you offer digital marketing services?",
    a: "Yes. We provide social campaigns, email marketing, landing pages, and lead funnels — all designed to complement your outreach and fill your pipeline.",
  },
  {
    q: "Can services be cancelled?",
    a: "Yes. Services can be cancelled with written notice. Billing stops at the end of the active billing cycle, and no further charges are applied after cancellation.",
  },
  {
    q: "How do I get started?",
    a: "Reach out via our contact form or by phone. We assign a dedicated account manager and virtual assistant once we understand your needs and goals.",
  },
];

export default function FaqsPage() {
  return (
    <SiteChrome>
      <PageHero
        eyebrow="FAQs"
        title={
          <>
            <span className="text-gradient-electric">Frequently asked</span>{" "}
            questions
          </>
        }
        description="Find answers to commonly asked questions about Opus Solutions — our services, process, compliance, and how we support licensed real estate professionals."
      />

      <SectionShell id="faqs">
        <SectionHeading
          eyebrow="Questions"
          title="Everything you need to know"
          description="Browse our most commonly asked questions below. If you can't find what you're looking for, reach out and we'll be glad to help."
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion
            type="single"
            collapsible
            defaultValue="faq-0"
            className="flex w-full flex-col gap-3"
          >
            {FAQS.map((faq, i) => (
              <Reveal
                key={faq.q}
                delay={Math.min(i * 0.04, 0.4)}
                className="block"
              >
                <AccordionItem
                  value={`faq-${i}`}
                  className="glass-strong group rounded-2xl border border-white/10 px-5 transition-colors duration-300 data-[state=open]:border-electric/30 sm:px-6"
                >
                  <AccordionTrigger
                    className="group/trigger hover:no-underline py-5 text-left text-base font-medium text-white/90 [&>svg:last-child]:hidden"
                  >
                    <span className="flex-1 pr-4 font-heading text-[15px] font-semibold leading-snug text-white sm:text-base">
                      {faq.q}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-data-[state=open]:border-electric/40 group-data-[state=open]:bg-electric/10">
                      <ChevronDown className="h-4 w-4 text-white/60 transition-all duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-electric" />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-white/55 sm:text-[15px]">
                    <span className="block pr-12 pb-5">{faq.a}</span>
                  </AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </div>
      </SectionShell>

      {/* Closing CTA */}
      <CTABanner
        title="Still have questions?"
        subtitle="Our team replies within a few hours, 7 days a week. Reach out and we'll help."
      />
    </SiteChrome>
  );
}
