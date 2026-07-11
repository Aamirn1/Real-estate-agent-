import type { Metadata } from "next";
import { SiteChrome, PageHero } from "@/components/leadsphere/SiteChrome";
import { CTABanner } from "@/components/leadsphere/CTABanner";
import { RoiCalculator } from "@/components/leadsphere/sections/RoiCalculator";
import {
  GlassCard,
  CountUp,
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
import {
  Check,
  Star,
  ChevronDown,
  Calendar,
  Rocket,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — Opus Solutions",
  description:
    "Flexible lead generation pricing for real estate agents. Choose from trial to premium plans with referrals, lead transfers, and dedicated support.",
};

/* ============================================================================
   PRICING DATA — 6 real plans
   ========================================================================== */

type Plan = {
  name: string;
  price: string; // "Per Lead" or "$450"
  period: string;
  tagline: string;
  features: string[];
  cta: string;
  ctaVariant: "outline" | "solid";
  highlight?: "top-selling" | "premium";
  badge?: string;
};

const PLANS: Plan[] = [
  {
    name: "Trial Plan",
    price: "$450",
    period: "One-Time · 30 Days",
    tagline: "Test the waters",
    features: [
      "20% Referral Fee",
      "9 Pre-screened introductions",
      "Up to 3 Counties",
      "10 hr/day Support",
      "No Hidden Charges",
      "Pipeline Tracking",
      "Appointment Scheduling",
      "Call/lead recording",
      "Dedicated Account Manager",
      "Real-time Live Transfer",
    ],
    cta: "Get Started",
    ctaVariant: "outline",
  },
  {
    name: "Silver Plan",
    price: "$900",
    period: "One-Time · 30 Days",
    tagline: "Most popular choice",
    features: [
      "15% referral fee",
      "18 qualified pre-screened introductions",
      "Up to 5 Counties",
      "10 hr/day Support",
      "Appointment Scheduling",
      "Call/lead recording",
      "No Hidden Charges",
    ],
    cta: "Get Started",
    ctaVariant: "solid",
    highlight: "top-selling",
    badge: "Top Selling",
  },
  {
    name: "Gold Plan",
    price: "$1800",
    period: "One-Time · 30 Days",
    tagline: "For growing teams",
    features: [
      "10% referral fee",
      "27 qualified pre-screened introductions",
      "Up to 10 Counties",
      "10 hr/day Support",
      "Appointment Scheduling",
      "Dedicated Account Manager",
      "Warm live transfer",
      "Pipeline tracking",
    ],
    cta: "Get Started",
    ctaVariant: "outline",
  },
  {
    name: "Platinum Plan",
    price: "$2500",
    period: "One-Time · 30 Days",
    tagline: "High-volume prospecting",
    features: [
      "8% referral fee",
      "54 qualified pre-screened introductions",
      "Up to 10 Counties",
      "10 hr/day Support",
      "Priority Appointment Scheduling",
      "Senior Dedicated Account Manager",
      "Exclusive warm live transfer",
    ],
    cta: "Book a Demo",
    ctaVariant: "outline",
    highlight: "premium",
    badge: "For Premium Realtors",
  },
];

/* ============================================================================
   FAQ DATA — 12 real Q&As
   ========================================================================== */

const FAQS: { q: string; a: string }[] = [
  {
    q: "What does Opus Solutions do?",
    a: "We provide marketing consulting, CRM support, account management, and virtual assistance for licensed real estate professionals. Our services reduce administrative workload by managing outreach, reporting, scheduling, and digital marketing.",
  },
  {
    q: "Are we a real estate brokerage?",
    a: "No. We are not a brokerage, and we do not list or sell property. We are a support partner that offers administrative, outreach, and marketing solutions for real estate professionals.",
  },
  {
    q: "Do we sell data or contacts?",
    a: "No. We do not sell or resell data. We provide consent-based outreach support, documented records, CRM management, and workflow reporting.",
  },
  {
    q: "How does our outreach work?",
    a: "We use human-only outreach methods — never autodialers or robocalls. All engagement is consent-based, documented, and reported.",
  },
  {
    q: "Is there a setup fee?",
    a: "Yes. We charge a one-time onboarding fee that covers setup, documentation, and account preparation before outreach begins.",
  },
  {
    q: "Do we provide support?",
    a: "Yes. Every client is assigned a dedicated account manager and virtual assistant for ongoing communication, reporting, and campaign support.",
  },
  {
    q: "What compliance standards do we follow?",
    a: "We comply with TCPA, DNC, CAN-SPAM, CCPA/CPRA, and the Fair Housing Act. Clients remain responsible for their own regulatory licensing.",
  },
  {
    q: "How do we ensure data security?",
    a: "All payments are processed securely through our PCI-compliant processor's hosted checkout. We never store or directly handle cardholder data.",
  },
  {
    q: "What makes us different from listing platforms?",
    a: "We are not a marketplace. We provide customized support packages focused on administrative efficiency, CRM management, and documented outreach.",
  },
  {
    q: "Do we guarantee business results?",
    a: "No. We improve efficiency through marketing support, documentation, and workflow management, enabling professionals to focus on activities that drive results.",
  },
  {
    q: "Can services be cancelled?",
    a: "Yes. Services can be cancelled per our Service Agreement. Written notice is required, and billing stops at the end of the active billing cycle.",
  },
  {
    q: "How do we get started?",
    a: "Reach us through our website, request a quote, or contact our team directly. We assign a dedicated account manager and virtual assistant once we understand your needs.",
  },
];

/* ============================================================================
   PRICING CARD
   ========================================================================== */

function PlanPrice({ plan }: { plan: Plan }) {
  const num = parseInt(plan.price.replace(/[^0-9]/g, ""), 10);
  return (
    <div className="flex items-baseline gap-1">
      <span className="font-heading text-2xl font-semibold text-[#1E293B]/70">
        $
      </span>
      <CountUp
        key={plan.price}
        value={num}
        duration={1400}
        className="font-heading text-5xl font-semibold tracking-tight text-[#1E293B] tnum"
      />
    </div>
  );
}

function CtaButton({
  variant,
  children,
}: {
  variant: "outline" | "solid";
  children: React.ReactNode;
}) {
  if (variant === "solid") {
    return (
      <button
        type="button"
        className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(120deg,#3b82f6,#8b5cf6,#06b6d4)] px-6 py-3 text-sm font-semibold text-[#1E293B] shadow-[0_0_30px_-6px_rgba(59,130,246,0.7)] transition-shadow duration-300 hover:shadow-[0_0_45px_-4px_rgba(139,92,246,0.85)]"
      >
        <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
        <Rocket className="relative h-4 w-4" />
        <span className="relative">{children}</span>
      </button>
    );
  }
  return (
    <button
      type="button"
      className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#E2E8F0] bg-[#1E293B]/5 px-6 py-3 text-sm font-semibold text-[#1E293B] backdrop-blur transition-colors duration-300 hover:border-[#CBD5E1] hover:bg-[#1E293B]/8"
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </button>
  );
}

function PricingCard({ plan, delay }: { plan: Plan; delay: number }) {
  const features = (
    <ul className="custom-scroll flex flex-col gap-3.5 overflow-y-auto pr-1 max-h-72">
      {plan.features.map((f) => (
        <li key={f} className="flex items-start gap-3 text-sm text-[#1E293B]/70">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-electric/15 ring-1 ring-electric/30">
            <Check className="h-3 w-3 text-electric" />
          </span>
          <span className="leading-relaxed">{f}</span>
        </li>
      ))}
    </ul>
  );

  const header = (
    <div className="flex flex-col gap-2">
      <h3 className="font-heading text-xl font-semibold text-[#1E293B]">
        {plan.name}
      </h3>
      <p className="text-sm leading-relaxed text-[#1E293B]/50">{plan.tagline}</p>
    </div>
  );

  const priceBlock = (
    <div className="flex flex-col gap-1">
      <PlanPrice plan={plan} />
      <span className="text-xs font-medium text-[#1E293B]/40">{plan.period}</span>
    </div>
  );

  const badge = plan.badge ? (
    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
      <div className="flex items-center gap-1.5 rounded-full border border-gold/40 bg-[#1a1605] px-3.5 py-1.5 shadow-[0_0_20px_-4px_rgba(212,175,55,0.6)]">
        <Star className="h-3.5 w-3.5 fill-gold text-gold" />
        <span className="text-xs font-semibold tracking-wide text-gold">
          {plan.badge}
        </span>
      </div>
    </div>
  ) : null;

  /* Silver Plan — Top Selling (electric gradient border + scale + solid CTA) */
  if (plan.highlight === "top-selling") {
    return (
      <Reveal delay={delay} className="h-full">
        <div className="group relative h-full lg:scale-105 lg:z-10 transition-transform duration-300">
          {/* ambient glow */}
          <div className="absolute -inset-3 rounded-[1.75rem] bg-electric/20 blur-2xl opacity-70" />
          {/* animated gradient border */}
          <div className="absolute -inset-px rounded-2xl bg-[linear-gradient(120deg,#3b82f6,#8b5cf6,#06b6d4,#3b82f6)] animate-gradient-x opacity-95" />
          {/* card body */}
          <GlassCard
            strong
            className="relative flex h-full flex-col rounded-2xl p-6 md:p-8"
          >
            {badge}
            <div className="flex flex-1 flex-col gap-6 pt-2">
              {header}
              {priceBlock}
              <CtaButton variant="solid">{plan.cta}</CtaButton>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              {features}
            </div>
          </GlassCard>
        </div>
      </Reveal>
    );
  }

  /* Sapphire Plan — Premium (gold gradient border + outline CTA) */
  if (plan.highlight === "premium") {
    return (
      <Reveal delay={delay} className="h-full">
        <div className="group relative h-full transition-transform duration-300">
          {/* ambient glow */}
          <div className="absolute -inset-3 rounded-[1.75rem] bg-gold/15 blur-2xl opacity-70" />
          {/* animated gold gradient border */}
          <div className="absolute -inset-px rounded-2xl bg-[linear-gradient(120deg,#d4af37,#f5d77a,#d4af37,#f5d77a)] animate-gradient-x opacity-95" />
          {/* card body */}
          <GlassCard
            strong
            className="relative flex h-full flex-col rounded-2xl p-6 md:p-8"
          >
            {badge}
            <div className="flex flex-1 flex-col gap-6 pt-2">
              {header}
              {priceBlock}
              <CtaButton variant="outline">{plan.cta}</CtaButton>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
              {features}
            </div>
          </GlassCard>
        </div>
      </Reveal>
    );
  }

  /* Standard card */
  return (
    <Reveal delay={delay} className="h-full">
      <GlassCard
        strong
        className="group relative flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#E2E8F0] hover:shadow-[0_20px_60px_-20px_rgba(59,130,246,0.35)] md:p-8"
      >
        <div className="flex flex-1 flex-col gap-6">
          {header}
          {priceBlock}
          <CtaButton variant={plan.ctaVariant}>{plan.cta}</CtaButton>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          {features}
        </div>
      </GlassCard>
    </Reveal>
  );
}

/* ============================================================================
   PAGE
   ========================================================================== */

export default function PricingPage() {
  return (
    <SiteChrome>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            We&apos;ve got a plan that&apos;s{" "}
            <span className="text-gradient-electric">perfect for you</span>
          </>
        }
        description="Whether you're just starting or need an all-inclusive solution, our plans scale with your goals. One-time setup, 30-day or 365-day plans available."
      />

      {/* 1. Pricing section (6 plans) */}
      <SectionShell id="pricing">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              We&apos;ve got a plan that&apos;s{" "}
              <span className="text-gradient-electric">perfect for you</span>
            </>
          }
          description="Whether you're just starting or need an all-inclusive solution, our plans scale with your goals."
        />

        {/* billing note */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-[#1E293B]/5 px-4 py-2 text-xs text-[#1E293B]/60 backdrop-blur">
            <Calendar className="h-3.5 w-3.5 text-electric" />
            One-time setup · 30-day or 365-day plans
          </div>
        </div>

        {/* plans grid */}
        <div className="mt-12 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} delay={i * 0.05} />
          ))}
        </div>

        {/* disclaimer */}
        <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-[#1E293B]/40">
          Opus Solutions is a marketing consulting and support company. We do
          not act as a brokerage, list or sell property, or resell leads.
          Referral fees apply on successful closings.
        </p>
      </SectionShell>

      {/* 2. Interactive ROI Calculator */}
      <RoiCalculator />

      {/* 3. FAQ section (12 Q&As) */}
      <SectionShell id="faq">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Find answers to commonly asked questions about Opus Solutions."
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
                delay={Math.min(i * 0.04, 0.36)}
                className="block"
              >
                <AccordionItem
                  value={`faq-${i}`}
                  className="glass-strong group rounded-2xl border border-[#E2E8F0] px-5 transition-colors duration-300 data-[state=open]:border-electric/30 sm:px-6"
                >
                  <AccordionTrigger
                    className="group/trigger hover:no-underline py-5 text-left text-base font-medium text-[#1E293B]/90 [&>svg:last-child]:hidden"
                  >
                    <span className="flex-1 pr-4 font-heading text-[15px] font-semibold leading-snug text-[#1E293B] sm:text-base">
                      {faq.q}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E2E8F0] bg-[#1E293B]/5 transition-all duration-300 group-data-[state=open]:border-electric/40 group-data-[state=open]:bg-electric/10">
                      <ChevronDown className="h-4 w-4 text-[#1E293B]/60 transition-all duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-electric" />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-[#1E293B]/55 sm:text-[15px]">
                    <span className="block pr-12 pb-5">{faq.a}</span>
                  </AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </div>
      </SectionShell>

      {/* 4. Closing CTA */}
      <CTABanner
        title="Ready to close more listings?"
        subtitle="Choose your plan and start generating qualified leads today."
      />
    </SiteChrome>
  );
}
