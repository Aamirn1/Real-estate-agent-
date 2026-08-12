import type { Metadata } from "next";
import { SiteChrome, PageHero } from "@/components/leadsphere/SiteChrome";
import { CTABanner } from "@/components/leadsphere/CTABanner";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import {
  VirtualAssistantServices,
} from "@/components/leadsphere/sections/AboutVaWorkflow";
import {
  GlassCard,
  SectionHeading,
  SectionShell,
  CountUp,
} from "@/components/leadsphere/primitives";
import { Reveal } from "@/components/leadsphere/Reveal";
import { CheckoutButton } from "@/components/leadsphere/CheckoutButton";
import { Check, Star, Calendar, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Real Estate Virtual Assistant Services | Opus Global Solution",
  description:
    "Dedicated virtual assistants for real estate professionals. Customer support, prospect calling, calendar management, CRM management, social media, and website management.",
  alternates: { canonical: "https://opusglobalsolution.com/virtual-assistance" },
};

/* ============================================================
   VA Pricing Plans — monthly subscriptions
   ============================================================ */
type VAPlan = {
  name: string;
  price: string;
  period: string;
  tagline: string;
  features: { text: string; included: boolean }[];
  cta: string;
  ctaVariant: "outline" | "solid";
  highlight?: "top-selling" | "premium";
  badge?: string;
};

const VA_PLANS: VAPlan[] = [
  {
    name: "Gold",
    price: "$750",
    period: "Per Month",
    tagline: "Most popular choice",
    cta: "Get Started",
    ctaVariant: "solid",
    highlight: "top-selling",
    badge: "Top Selling",
    features: [
      { text: "Dedicated Virtual Assistant", included: true },
      { text: "Up to 10 Hours/week", included: true },
      { text: "Admin + Social Media Help", included: true },
      { text: "Daily Task Reporting", included: true },
      { text: "Priority Response", included: true },
      { text: "3 Revisions per Task", included: true },
      { text: "CRM Tasks", included: true },
      { text: "Real-Time Chat Access", included: true },
      { text: "Weekly Performance Reports", included: true },
      { text: "Unlimited Revisions", included: true },
    ],
  },
  {
    name: "Platinum",
    price: "$1500",
    period: "Per Month",
    tagline: "Full-service VA for high-volume teams",
    cta: "Get Started",
    ctaVariant: "outline",
    highlight: "premium",
    badge: "Premium",
    features: [
      { text: "Full-Service Virtual Assistant", included: true },
      { text: "Up to 40 Hours/week", included: true },
      { text: "Admin, Social Media & CRM Tasks", included: true },
      { text: "Real-Time Chat Access", included: true },
      { text: "Weekly Performance Reports", included: true },
      { text: "Unlimited Revisions", included: true },
      { text: "CRM Tasks", included: true },
      { text: "Weekly Performance Reports", included: true },
    ],
  },
];

function VAPricingCard({ plan, delay }: { plan: VAPlan; delay: number }) {
  const features = (
    <ul className="flex flex-col gap-2.5 pr-1">
      {plan.features.map((f, i) => (
        <li
          key={i}
          className={cn(
            "flex items-start gap-3 text-sm",
            f.included ? "text-black" : "text-black/25"
          )}
        >
          <span
            className={cn(
              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-1",
              f.included
                ? "bg-emerald-400/15 ring-emerald-400/30"
                : "bg-black/5 ring-white/10"
            )}
          >
            {f.included ? (
              <Check className="h-3 w-3 text-emerald-400" />
            ) : (
              <span className="h-1 w-1 rounded-full bg-black/20" />
            )}
          </span>
          <span className={cn("leading-relaxed", !f.included && "line-through")}>
            {f.text}
          </span>
        </li>
      ))}
    </ul>
  );

  const header = (
    <div className="flex flex-col gap-2">
      <h3 className="font-heading text-xl font-semibold text-black">
        {plan.name}
      </h3>
      <p className="text-sm leading-relaxed text-black">{plan.tagline}</p>
    </div>
  );

  const priceBlock = (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline gap-1">
        <span className="font-heading text-2xl font-semibold text-black">
          $
        </span>
        <CountUp
          key={plan.price}
          value={parseInt(plan.price.replace(/[^0-9]/g, ""), 10)}
          duration={1400}
          className="font-heading text-5xl font-semibold tracking-tight text-black tnum"
        />
      </div>
      <span className="text-xs font-medium text-black">{plan.period}</span>
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

  /* Top Selling (electric gradient border + scale + solid CTA) */
  if (plan.highlight === "top-selling") {
    return (
      <Reveal delay={delay} className="h-full">
        <div className="group relative h-full lg:scale-105 lg:z-10 transition-transform duration-300">
          <div className="absolute -inset-3 rounded-[1.75rem] bg-electric/20 blur-2xl opacity-70" />
          <div className="absolute -inset-px rounded-2xl bg-[linear-gradient(120deg,#2563EB,#38BDF8,#14B8A6,#2563EB)] animate-gradient-x opacity-95" />
          <GlassCard
            strong
            glow={false}
            className="relative flex h-full flex-col rounded-2xl p-5 md:p-6"
          >
            {badge}
            <div className="flex flex-1 flex-col gap-5 pt-2">
              {header}
              {priceBlock}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />
              {features}
              <CheckoutButton plan={`VA-${plan.name}` as const} variant="solid">
                {plan.cta}
              </CheckoutButton>
            </div>
          </GlassCard>
        </div>
      </Reveal>
    );
  }

  /* Premium (gold gradient border + outline CTA) */
  if (plan.highlight === "premium") {
    return (
      <Reveal delay={delay} className="h-full">
        <div className="group relative h-full transition-transform duration-300">
          <div className="absolute -inset-3 rounded-[1.75rem] bg-gold/15 blur-2xl opacity-70" />
          <div className="absolute -inset-px rounded-2xl bg-[linear-gradient(120deg,#d4af37,#f5d77a,#d4af37,#f5d77a)] animate-gradient-x opacity-95" />
          <GlassCard
            strong
            glow={false}
            className="relative flex h-full flex-col rounded-2xl p-5 md:p-6"
          >
            {badge}
            <div className="flex flex-1 flex-col gap-5 pt-2">
              {header}
              {priceBlock}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
              {features}
              <CheckoutButton plan={`VA-${plan.name}` as const} variant="outline">
                {plan.cta}
              </CheckoutButton>
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
        glow={false}
        className="group relative flex h-full flex-col rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(37,99,235,0.35)] md:p-6"
      >
        <div className="flex flex-1 flex-col gap-5">
          {header}
          {priceBlock}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />
          {features}
          <CheckoutButton plan={`VA-${plan.name}` as const} variant={plan.ctaVariant}>
            {plan.cta}
          </CheckoutButton>
        </div>
      </GlassCard>
    </Reveal>
  );
}

export default function VirtualAssistancePage() {
  return (
    <SiteChrome withBackground={false} flushTop>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://opusglobalsolution.com" },
          { name: "Virtual Assistance", url: "https://opusglobalsolution.com/virtual-assistance" },
        ]}
      />
      <PageHero
        heroImage="/heroes/va-home.jpg"
        eyebrow="Virtual Assistance"
        title={
          <>
            Your Dedicated{" "}
            <span className="text-gradient-electric">Real Estate Virtual Assistant</span>{" "}
            Team
          </>
        }
        description="Reduce your admin workload so you can focus on clients. Our virtual assistants handle customer support, prospect calling, calendar management, CRM, social media, and website management."
      />

      {/* 1. Virtual Assistant Services — 6 service cards (heading hidden, PageHero shows it) */}
      <VirtualAssistantServices showHeading={false} />

      {/* 2. VA Pricing Packages */}
      <SectionShell id="va-pricing">
        <SectionHeading
          eyebrow="VA Pricing"
          title={
            <>
              Simple{" "}
              <span className="text-gradient-electric">monthly plans</span>
            </>
          }
          description="Choose the plan that fits your workload. All plans include a dedicated virtual assistant."
        />

        {/* billing note */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/5 px-4 py-2 text-xs text-black backdrop-blur">
            <Calendar className="h-3.5 w-3.5 text-electric" />
            Monthly subscription · Cancel anytime
          </div>
        </div>

        {/* plans grid */}
        <div className="mt-12 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {VA_PLANS.map((plan, i) => (
            <VAPricingCard key={plan.name} plan={plan} delay={i * 0.05} />
          ))}
        </div>

        {/* disclaimer */}
        <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-black">
          Opus Global Solution is a marketing consulting and support company. We do
          not act as a brokerage, list or sell property, or resell leads.
        </p>
      </SectionShell>

      {/* 3. Closing CTA */}
      <CTABanner
        title="Ready to get your time back?"
        subtitle="Get a dedicated virtual assistant and focus on what matters most — closing deals."
      />
    </SiteChrome>
  );
}
