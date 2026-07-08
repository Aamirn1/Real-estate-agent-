"use client";

import {
  GlassCard,
  SectionHeading,
  SectionShell,
  CountUp,
} from "@/components/leadsphere/primitives";
import { Reveal } from "@/components/leadsphere/Reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Check,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Rocket,
  Calendar,
  Orbit,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Github,
  ShieldCheck,
  Send,
  Star,
} from "lucide-react";

/* ============================================================
   DATA
============================================================ */

type Plan = {
  name: string;
  tagline: string;
  monthly: number | null;
  annual: number | null;
  custom?: boolean;
  features: string[];
  cta: string;
  ctaVariant: "outline" | "solid" | "ghost";
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    tagline: "For solo agents getting started.",
    monthly: 49,
    annual: 39,
    ctaVariant: "outline",
    cta: "Start free trial",
    features: [
      "1,000 leads / month",
      "Basic CRM",
      "5 MLS areas",
      "Email support",
      "Mobile app",
    ],
  },
  {
    name: "Professional",
    tagline: "For growing agents closing more deals.",
    monthly: 149,
    annual: 119,
    ctaVariant: "solid",
    cta: "Start free trial",
    features: [
      "10,000 leads / month",
      "Full CRM + Pipeline",
      "Unlimited MLS areas",
      "Smart Assistant",
      "Power Dialer",
      "SMS + Email automation",
      "Advanced analytics",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    tagline: "For teams and brokerages.",
    monthly: null,
    annual: null,
    custom: true,
    ctaVariant: "ghost",
    cta: "Book a demo",
    features: [
      "Unlimited leads",
      "Team collaboration",
      "Custom integrations",
      "Dedicated CSM",
      "API access",
      "SSO & SCIM",
      "White-glove onboarding",
      "99.9% uptime SLA",
    ],
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How long is the free trial?",
    a: "Every plan starts with a 14-day free trial — no credit card required. You'll get full access to your chosen tier so you can import leads, test the Smart Assistant, and dial prospects before you ever pay. Cancel anytime during the trial and you won't be charged a cent.",
  },
  {
    q: "Which MLS markets do you cover?",
    a: "Opus connects to over 850 MLS markets across North America, covering 98% of active residential listings. Professional and Enterprise plans unlock unlimited MLS areas, and our team adds new markets every month. Don't see yours? Reach out and we'll prioritize it.",
  },
  {
    q: "How accurate is the lead data?",
    a: "Our platform cross-references 30+ data sources — property records, behavioral signals, life-event triggers, and consented contact data — to score and verify each lead. We refresh contact info nightly and flag unreachable numbers, so you're always dialing high-intent, verified prospects with an average 94% deliverability rate.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Absolutely. There are no long-term contracts on monthly plans — cancel from your dashboard with one click and you won't be billed again. Annual subscribers can cancel anytime and keep access through the end of their billing period. We'll even export your CRM data for free.",
  },
  {
    q: "How do team seats work for brokerages?",
    a: "Enterprise plans include unlimited team seats, role-based permissions, shared pipelines, and broker-level reporting. Assign agents to territories, route leads automatically, and track performance across your entire office. SSO and SCIM provisioning make onboarding new agents take minutes, not days.",
  },
  {
    q: "What can the Smart Assistant actually do?",
    a: "The Smart Assistant drafts personalized outreach across email, SMS, and call scripts, prioritizes your hottest leads, transcribes and summarizes calls, suggests next-best actions, and even books appointments directly to your calendar. It's trained on millions of real estate conversations and learns from every interaction on your account.",
  },
  {
    q: "Which tools does Opus integrate with?",
    a: "We integrate natively with follow-up bosses, kvCORE, Salesforce, HubSpot, Google Workspace, Microsoft 365, Twilio, Zapier, and 200+ other tools. Enterprise customers get a REST API and custom integration support. If you're on a niche platform, ask us — we ship new connectors every month.",
  },
];

const FOOTER_COLUMNS: { title: string; links: string[] }[] = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Integrations", "Demo", "Changelog"],
  },
  {
    title: "Solutions",
    links: ["Agents", "Teams", "Brokerages", "Investors"],
  },
  {
    title: "Resources",
    links: ["Blog", "Guides", "Case Studies", "Videos", "Help Center"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact", "Partners"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security", "DPA"],
  },
];

const SOCIALS = [
  { Icon: Twitter, label: "Twitter / X", href: "#" },
  { Icon: Linkedin, label: "LinkedIn", href: "#" },
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Youtube, label: "YouTube", href: "#" },
  { Icon: Github, label: "GitHub", href: "#" },
];

/* ============================================================
   PRICING CARD
============================================================ */

function PlanPrice({
  plan,
  annual,
}: {
  plan: Plan;
  annual: boolean;
}) {
  if (plan.custom) {
    return (
      <div className="flex items-baseline gap-1">
        <span className="font-heading text-4xl font-semibold text-white sm:text-5xl">
          Custom
        </span>
      </div>
    );
  }
  const value = annual ? plan.annual! : plan.monthly!;
  return (
    <div className="flex items-baseline gap-1">
      <span className="font-heading text-2xl font-semibold text-white/70">
        $
      </span>
      <CountUp
        key={`${plan.name}-${annual ? "annual" : "monthly"}`}
        value={value}
        duration={1400}
        className="font-heading text-5xl font-semibold tracking-tight text-white"
      />
      <span className="text-sm font-medium text-white/45">/mo</span>
    </div>
  );
}

function CtaButton({
  variant,
  children,
}: {
  variant: "outline" | "solid" | "ghost";
  children: React.ReactNode;
}) {
  if (variant === "solid") {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(120deg,#3b82f6,#8b5cf6,#06b6d4)] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-6px_rgba(59,130,246,0.7)] transition-shadow hover:shadow-[0_0_45px_-4px_rgba(139,92,246,0.85)]"
      >
        <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
        <Rocket className="h-4 w-4" />
        <span className="relative">{children}</span>
      </motion.button>
    );
  }
  if (variant === "outline") {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-white/30 hover:bg-white/10"
      >
        <span>{children}</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </motion.button>
    );
  }
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-white/25 hover:text-white"
    >
      <Calendar className="h-4 w-4" />
      <span>{children}</span>
    </motion.button>
  );
}

function PricingCard({
  plan,
  annual,
  highlighted,
  delay,
}: {
  plan: Plan;
  annual: boolean;
  highlighted: boolean;
  delay: number;
}) {
  const features = (
    <ul className="flex flex-col gap-3.5">
      {plan.features.map((f) => (
        <li key={f} className="flex items-start gap-3 text-sm text-white/70">
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
      <h3 className="font-heading text-xl font-semibold text-white">
        {plan.name}
      </h3>
      <p className="text-sm leading-relaxed text-white/50">{plan.tagline}</p>
    </div>
  );

  const priceBlock = (
    <div className="flex flex-col gap-1">
      <PlanPrice plan={plan} annual={annual} />
      {!plan.custom && annual && (
        <span className="text-xs font-medium text-electric/80">
          Billed annually — save 20%
        </span>
      )}
      {!plan.custom && !annual && (
        <span className="text-xs font-medium text-white/40">
          Billed monthly
        </span>
      )}
      {plan.custom && (
        <span className="text-xs font-medium text-white/40">
          Volume pricing tailored to your team
        </span>
      )}
    </div>
  );

  if (highlighted) {
    return (
      <Reveal delay={delay} className="h-full">
        <div className="group relative h-full lg:scale-[1.04] lg:z-10 transition-transform duration-300">
          {/* ambient glow */}
          <div className="absolute -inset-3 rounded-[1.75rem] bg-electric/20 blur-2xl opacity-70" />
          {/* animated gradient border */}
          <div className="absolute -inset-px rounded-2xl bg-[linear-gradient(120deg,#3b82f6,#8b5cf6,#06b6d4,#3b82f6)] animate-gradient-x opacity-95" />
          {/* card body */}
          <GlassCard
            strong
            className="relative flex h-full flex-col rounded-2xl p-6 md:p-8"
          >
            {/* Most Popular badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-1.5 rounded-full border border-gold/40 bg-[#1a1605] px-3.5 py-1.5 shadow-[0_0_20px_-4px_rgba(212,175,55,0.6)]">
                <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                <span className="text-xs font-semibold tracking-wide text-gold">
                  Most Popular
                </span>
              </div>
            </div>

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

  return (
    <Reveal delay={delay} className="h-full">
      <GlassCard
        strong
        className="group relative flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_60px_-20px_rgba(59,130,246,0.35)] md:p-8"
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

/* ============================================================
   FAQ ITEM
============================================================ */

function FaqList() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="faq-0"
      className="flex w-full flex-col gap-3"
    >
      {FAQS.map((faq, i) => (
        <Reveal key={faq.q} delay={Math.min(i * 0.06, 0.36)} className="block">
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
  );
}

/* ============================================================
   CTA BANNER
============================================================ */

function CtaBanner() {
  return (
    <section className="relative w-full px-5 py-12 sm:px-8 md:py-16">
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-3xl border border-white/10">
        {/* animated gradient background */}
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#3b82f6_0%,#8b5cf6_45%,#06b6d4_100%,#3b82f6_150%)] animate-gradient-x" />
        {/* moving grid overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 50%, #000 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 50%, #000 30%, transparent 80%)",
          }}
        />
        {/* dark scrim for contrast */}
        <div className="absolute inset-0 bg-black/30" />
        {/* top glow */}
        <div className="pointer-events-none absolute -top-28 left-1/2 h-64 w-[75%] -translate-x-1/2 rounded-full bg-white/25 blur-3xl" />
        {/* floating orbs */}
        <div className="pointer-events-none absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-cyan/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-violet/30 blur-3xl" />

        {/* content */}
        <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-16 text-center md:py-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-white backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Ready to scale?
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-white text-glow sm:text-5xl md:text-6xl"
          >
            Ready to close more listings?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
          >
            Join 50,000+ agents generating more listings with smart automation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-2 flex flex-col items-center gap-3 sm:flex-row"
          >
            {/* Book Demo — white / outline */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/50 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/20 hover:shadow-[0_0_35px_-6px_rgba(255,255,255,0.6)]"
            >
              <Calendar className="h-4 w-4" />
              Book Demo
            </motion.button>
            {/* Start Free Trial — dark solid with glow */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#050505] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_35px_-6px_rgba(0,0,0,0.8)] ring-1 ring-white/10 transition-all hover:shadow-[0_0_50px_-4px_rgba(255,255,255,0.5)]"
            >
              <Rocket className="h-4 w-4 text-electric" />
              Start Free Trial
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          </motion.div>

          <p className="text-xs text-white/60">
            14-day free trial · No credit card required · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
============================================================ */

function LogoMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#3b82f6,#8b5cf6,#06b6d4)] shadow-[0_0_25px_-6px_rgba(59,130,246,0.7)]">
        <Orbit className="h-5 w-5 text-white" />
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
      </div>
      <span className="font-heading text-lg font-semibold tracking-tight text-white">
        Opus <span className="text-white/50">Solutions</span>
      </span>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative w-full bg-[#070709]">
      {/* gradient divider at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-electric via-violet to-cyan" />
      {/* faint top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-electric/5 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 md:py-20">
        {/* ---------- top row ---------- */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* left: logo + tagline + socials */}
          <div className="flex flex-col gap-6">
            <LogoMark />
            <p className="max-w-sm text-sm leading-relaxed text-white/55">
              More listings. Powered by Opus. The all-in-one platform that finds,
              scores, and converts real estate leads — automatically.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all hover:-translate-y-0.5 hover:border-electric/40 hover:bg-electric/10 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* right: newsletter */}
          <div className="flex flex-col gap-4 lg:items-end lg:text-right">
            <div className="lg:max-w-sm">
              <h3 className="font-heading text-lg font-semibold text-white">
                Stay ahead of the market
              </h3>
              <p className="mt-1.5 text-sm text-white/50">
                Weekly insights on smart prospecting.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full max-w-md flex-col gap-2.5 sm:flex-row lg:self-end"
            >
              <input
                type="email"
                placeholder="you@brokerage.com"
                aria-label="Email address"
                className="w-full flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-electric/50 focus:bg-white/10"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[linear-gradient(120deg,#3b82f6,#8b5cf6)] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_25px_-8px_rgba(59,130,246,0.8)] transition-shadow hover:shadow-[0_0_35px_-6px_rgba(139,92,246,0.85)]"
              >
                <Send className="h-4 w-4" />
                Subscribe
              </motion.button>
            </form>
            <p className="text-xs text-white/35 lg:max-w-sm lg:text-right">
              We respect your inbox. Unsubscribe with one click.
            </p>
          </div>
        </div>

        {/* ---------- divider ---------- */}
        <div className="my-12 h-px w-full bg-white/8 md:my-14" />

        {/* ---------- link columns ---------- */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3.5">
              <h4 className="font-heading text-sm font-semibold tracking-wide text-white">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/55 transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ---------- bottom bar ---------- */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 md:flex-row">
          <p className="text-xs text-white/45">
            © 2025 Opus Solutions. All rights reserved.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <span className="inline-flex items-center gap-1.5 text-xs text-white/45">
              <ShieldCheck className="h-3.5 w-3.5 text-electric/70" />
              Made with care
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              System status: Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   MAIN
============================================================ */

export default function PricingFaqCtaFooter() {
  const [annual, setAnnual] = useState(true);

  return (
    <>
      {/* ============ PRICING ============ */}
      <SectionShell id="pricing" className="md:py-24">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple, transparent pricing"
          description="Start free. Scale as you grow. Cancel anytime."
        />

        {/* billing toggle */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
              <span
                className={cn(
                  "text-sm font-medium transition-colors",
                  !annual ? "text-white" : "text-white/50"
                )}
              >
                Monthly
              </span>
              <Switch
                checked={annual}
                onCheckedChange={setAnnual}
                className="data-[state=checked]:bg-[linear-gradient(120deg,#3b82f6,#8b5cf6)] data-[state=checked]:border-transparent"
              />
              <span
                className={cn(
                  "text-sm font-medium transition-colors",
                  annual ? "text-white" : "text-white/50"
                )}
              >
                Annual
              </span>
              <span className="ml-1 rounded-full border border-electric/30 bg-electric/10 px-2 py-0.5 text-[11px] font-semibold text-electric">
                Save 20%
              </span>
            </div>
          </div>
        </Reveal>

        {/* pricing cards */}
        <div className="mt-12 grid items-stretch gap-6 lg:mt-14 lg:grid-cols-3 lg:gap-6 lg:pt-6">
          {PLANS.map((plan, i) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              annual={annual}
              highlighted={plan.name === "Professional"}
              delay={0.15 + i * 0.1}
            />
          ))}
        </div>

        {/* footnote */}
        <Reveal delay={0.5}>
          <p className="mt-10 text-center text-sm text-white/40">
            All plans include a 14-day free trial. No credit card required.{" "}
            <span className="text-white/60">
              Need something custom?
            </span>{" "}
            <a href="#" className="text-electric hover:text-electric/80 underline-offset-4 hover:underline">
              Talk to sales →
            </a>
          </p>
        </Reveal>
      </SectionShell>

      {/* ============ FAQ ============ */}
      <SectionShell id="faq" className="md:py-24">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          align="center"
        />
        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-3xl">
            <FaqList />
          </div>
        </Reveal>

        {/* contact prompt */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="font-heading text-base font-semibold text-white">
                Still have questions?
              </p>
              <p className="text-sm text-white/50">
                Our team replies within a few hours, 7 days a week.
              </p>
            </div>
            <a
              href="#"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/10"
            >
              Contact support
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </SectionShell>

      {/* ============ CTA BANNER ============ */}
      <CtaBanner />

      {/* ============ FOOTER ============ */}
      <Footer />
    </>
  );
}
