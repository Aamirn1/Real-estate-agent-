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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Check,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Rocket,
  Calendar,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Github,
  ShieldCheck,
  Send,
  Star,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  X,
} from "lucide-react";
import { LogoImage } from "@/components/leadsphere/LogoIcon";

/* ============================================================
   DATA
============================================================ */

type Plan = {
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

const PLANS: Plan[] = [
  {
    name: "Trial",
    price: "$300",
    period: "One-Time · 90 Days Setup",
    tagline: "Test the waters",
    cta: "Get Started",
    ctaVariant: "outline",
    features: [
      { text: "20% Referral Fee", included: true },
      { text: "6 Qualified, Pre-screened Introductions", included: true },
      { text: "Up to 5 Counties", included: true },
      { text: "10 hr/day Support", included: true },
      { text: "Spreadsheet", included: true },
      { text: "Pipeline Tracking", included: true },
      { text: "No Hidden Charges", included: true },
      { text: "Exclusive Warm Live Transfer", included: false },
      { text: "SMS/WhatsApp Support", included: false },
      { text: "Monthly Activity Summary", included: false },
      { text: "Dedicated Account Manager", included: false },
      { text: "Digital Marketing Services", included: false },
    ],
  },
  {
    name: "Gold",
    price: "$600",
    period: "One-Time · 180 Days Setup",
    tagline: "Most popular choice",
    cta: "Get Started",
    ctaVariant: "solid",
    highlight: "top-selling",
    badge: "Top Selling",
    features: [
      { text: "15% Referral Fee", included: true },
      { text: "12 Qualified, Pre-screened Introductions", included: true },
      { text: "Up to 5 Counties", included: true },
      { text: "10 hr/day Support", included: true },
      { text: "Spreadsheet", included: true },
      { text: "Priority-based Appointment Scheduling", included: true },
      { text: "Call/lead recording (where permitted and with notice)", included: true },
      { text: "Pipeline Tracking", included: true },
      { text: "No Hidden Charges", included: true },
      { text: "Exclusive Warm Live Transfer", included: false },
      { text: "SMS/WhatsApp Support", included: false },
      { text: "Monthly Activity Summary", included: false },
      { text: "Dedicated Account Manager", included: false },
      { text: "Digital Marketing Services", included: false },
    ],
  },
  {
    name: "Platinum",
    price: "$1200",
    period: "One-Time · 365 Days Setup",
    tagline: "High-volume prospecting",
    cta: "Get Started",
    ctaVariant: "outline",
    highlight: "premium",
    badge: "For Premium Realtors",
    features: [
      { text: "10% Referral Fee", included: true },
      { text: "18 Qualified, Pre-screened Introductions", included: true },
      { text: "Up to 10 Counties", included: true },
      { text: "10 hr/day Support", included: true },
      { text: "Priority-based Appointment Scheduling", included: true },
      { text: "Call/lead recording (where permitted and with notice)", included: true },
      { text: "Advanced Pipeline Tracking", included: true },
      { text: "No Hidden Charges", included: true },
      { text: "Exclusive Warm Live Transfer", included: true },
      { text: "SMS/WhatsApp Support", included: true },
      { text: "Monthly Reporting", included: true },
      { text: "Dedicated Account Manager", included: true },
      { text: "Digital Marketing Services", included: true },
    ],
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What does Opus Global Solution do?",
    a: "We provide marketing consulting, CRM support, account management, and virtual assistance for licensed real estate professionals. Our services reduce administrative workload by managing outreach, reporting, scheduling, and digital marketing, allowing professionals to focus on building client relationships and closing deals.",
  },
  {
    q: "Are we a real estate brokerage?",
    a: "No. We are not a brokerage, and we do not list or sell property. We are a support partner that offers administrative, outreach, and marketing solutions designed for real estate professionals.",
  },
  {
    q: "Do we sell data or contacts?",
    a: "No. We do not sell or resell data or contacts. We provide consent-based outreach support, documented records, CRM management, and workflow reporting to help professionals manage their own outreach efficiently.",
  },
  {
    q: "How does our outreach work?",
    a: "We use human-only outreach methods, never autodialers or robocalls. All engagement is consent-based, documented, and reported, giving full transparency into our work and ensuring compliance with applicable regulations.",
  },
  {
    q: "How many professionals do we work with in the same area?",
    a: "We dedicate our resources, account managers, and virtual assistants on an exclusive basis during each active campaign. This ensures our efforts are fully aligned with your goals and territory.",
  },
  {
    q: "Is there a setup fee?",
    a: "Yes. We charge a one-time onboarding fee that covers setup, documentation, and account preparation. This ensures your CRM, reporting, and workflows are properly established before outreach begins.",
  },
  {
    q: "Do we provide support?",
    a: "Yes. Every client is assigned a dedicated account manager and virtual assistant for ongoing communication, reporting, and campaign support. We also provide regular updates and documented reporting throughout the engagement.",
  },
  {
    q: "What compliance standards do we follow?",
    a: "We comply with all applicable regulations, including TCPA, DNC, CAN-SPAM, CCPA/CPRA, and the Fair Housing Act. Clients remain responsible for their own regulatory licensing and compliance obligations.",
  },
  {
    q: "How do we ensure data security?",
    a: "All payments are processed securely through our PCI-compliant processor's hosted checkout. We never store or directly handle cardholder data, and all authorized payments are made only through official invoice links.",
  },
  {
    q: "What makes us different from listing platforms?",
    a: "We are not a marketplace, and we do not distribute inquiries broadly. We provide customized support packages that focus on administrative efficiency, CRM management, and documented outreach tailored to each client.",
  },
  {
    q: "Do we guarantee business results?",
    a: "No. We do not guarantee specific outcomes. Our role is to improve efficiency through marketing support, documentation, and workflow management, enabling professionals to focus on activities that drive results.",
  },
  {
    q: "Can services be cancelled?",
    a: "Yes. Services can be cancelled in accordance with the terms of our Service Agreement. Written notice is required, and billing stops at the end of the active billing cycle.",
  },
];

const FOOTER_COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Pricing", href: "/pricing" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Blog", href: "/blog" },
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Marketing Consulting", href: "/services" },
      { label: "CRM Support", href: "/services" },
      { label: "Workflow Automation", href: "/services" },
      { label: "Virtual Assistance", href: "/services" },
      { label: "Outreach Support", href: "/services" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "FAQs", href: "/faqs" },
      { label: "Case Studies", href: "/testimonials" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQs", href: "/faqs" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
];

const SOCIALS = [
  { Icon: Twitter, label: "Twitter / X", href: "#" },
  { Icon: Linkedin, label: "LinkedIn", href: "#" },
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Youtube, label: "YouTube", href: "#" },
  { Icon: Github, label: "GitHub", href: "#" },
];

const CONTACT_INFO = {
  email: "info@opussolutions.com",
  phones: ["(320) 331-0910", "(320) 331-8501", "(320) 331-3559"],
  addressLines: ["418 Broadway, Ste. R", "Albany, NY 12207", "United States"],
  hours: "10:00 A.M. to 08:00 P.M (EST)",
};

/* ============================================================
   PRICING CARD
============================================================ */

function PlanPrice({ plan }: { plan: Plan }) {
  const num = parseInt(plan.price.replace(/[^0-9]/g, ""), 10);
  return (
    <div className="flex items-baseline gap-1">
      <span className="font-heading text-2xl font-semibold text-[#1a1a1a]/70">
        $
      </span>
      <CountUp
        key={plan.price}
        value={num}
        duration={1400}
        className="font-heading text-5xl font-semibold tracking-tight text-[#1a1a1a]"
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
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(120deg,#2563EB,#38BDF8,#14B8A6)] px-6 py-3 text-sm font-semibold text-[#1a1a1a] shadow-[0_0_30px_-6px_rgba(37,99,235,0.7)] transition-shadow hover:shadow-[0_0_45px_-4px_rgba(56,189,248,0.85)]"
      >
        <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
        <Rocket className="h-4 w-4" />
        <span className="relative">{children}</span>
      </motion.button>
    );
  }
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/15 bg-black/5 px-6 py-3 text-sm font-semibold text-[#1a1a1a] backdrop-blur transition-colors hover:border-black/30 hover:bg-black/10"
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </motion.button>
  );
}

function PricingCard({ plan, delay }: { plan: Plan; delay: number }) {
  const features = (
    <ul className="custom-scroll flex flex-col gap-2.5 overflow-y-auto pr-1 max-h-72">
      {plan.features.map((f, i) => (
        <li
          key={i}
          className={cn(
            "flex items-start gap-3 text-sm",
            f.included ? "text-[#1a1a1a]/70" : "text-[#1a1a1a]/25"
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
              <X className="h-3 w-3 text-[#1a1a1a]/30" />
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
      <h3 className="font-heading text-xl font-semibold text-[#1a1a1a]">
        {plan.name}
      </h3>
      <p className="text-sm leading-relaxed text-[#1a1a1a]/50">{plan.tagline}</p>
    </div>
  );

  const priceBlock = (
    <div className="flex flex-col gap-1">
      <PlanPrice plan={plan} />
      <span className="text-xs font-medium text-[#1a1a1a]/40">{plan.period}</span>
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

  /* Silver Plan, Top Selling (electric gradient border + scale + solid CTA) */
  if (plan.highlight === "top-selling") {
    return (
      <Reveal delay={delay} className="h-full">
        <div className="group relative h-full lg:scale-[1.04] lg:z-10 transition-transform duration-300">
          {/* ambient glow */}
          <div className="absolute -inset-3 rounded-[1.75rem] bg-electric/20 blur-2xl opacity-70" />
          {/* animated gradient border */}
          <div className="absolute -inset-px rounded-2xl bg-[linear-gradient(120deg,#2563EB,#38BDF8,#14B8A6,#2563EB)] animate-gradient-x opacity-95" />
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

  /* Sapphire Plan, Premium (gold gradient border + outline CTA) */
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
        className="group relative flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_20px_60px_-20px_rgba(37,99,235,0.35)] md:p-8"
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
        <Reveal key={faq.q} delay={Math.min(i * 0.04, 0.36)} className="block">
          <AccordionItem
            value={`faq-${i}`}
            className="glass-strong group rounded-2xl border border-black/10 px-5 transition-colors duration-300 data-[state=open]:border-electric/30 sm:px-6"
          >
            <AccordionTrigger
              className="group/trigger hover:no-underline py-5 text-left text-base font-medium text-[#1a1a1a]/90 [&>svg:last-child]:hidden"
            >
              <span className="flex-1 pr-4 font-heading text-[15px] font-semibold leading-snug text-[#1a1a1a] sm:text-base">
                {faq.q}
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 bg-black/5 transition-all duration-300 group-data-[state=open]:border-electric/40 group-data-[state=open]:bg-electric/10">
                <ChevronDown className="h-4 w-4 text-[#1a1a1a]/60 transition-all duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-electric" />
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-[#1a1a1a]/55 sm:text-[15px]">
              <span className="block pr-12 pb-5">{faq.a}</span>
            </AccordionContent>
          </AccordionItem>
        </Reveal>
      ))}
    </Accordion>
  );
}

/* ============================================================
   CONTACT SECTION
============================================================ */

function InfoCard({
  icon: Icon,
  iconTint,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  iconTint: string; // e.g. "text-electric"
  label: string;
  children: React.ReactNode;
}) {
  return (
    <GlassCard
      strong
      className="group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20"
    >
      <div className="flex flex-col gap-3">
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg bg-black/5 ring-1 ring-white/10 transition-colors",
            iconTint
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1a1a1a]/40">
            {label}
          </p>
          <div className="mt-1 text-sm font-medium text-[#1a1a1a] leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function StylizedMap() {
  return (
    <GlassCard
      strong
      className="relative h-full min-h-64 overflow-hidden rounded-2xl p-0"
    >
      {/* dark base */}
      <div className="absolute inset-0 bg-[#070a12]" />
      {/* grid overlay (faded at edges) */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.22) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, #000 30%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, #000 30%, transparent 85%)",
        }}
      />
      {/* secondary finer grid */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.18) 1px, transparent 1px)",
          backgroundSize: "128px 128px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, #000 30%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, #000 30%, transparent 85%)",
        }}
      />
      {/* central radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.25),transparent_60%)]" />

      {/* glowing pin at center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex flex-col items-center">
          {/* pulse rings */}
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 h-14 w-14 rounded-full bg-electric/25 animate-ping" />
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-9 w-9 rounded-full bg-electric/40 animate-pulse" />
          {/* pin */}
          <div className="relative flex h-9 w-9 items-center justify-center">
            <MapPin
              className="h-9 w-9 text-electric drop-shadow-[0_0_14px_rgba(37,99,235,0.95)]"
              fill="rgba(37,99,235,0.45)"
            />
          </div>
          {/* label */}
          <div className="mt-2 rounded-full border border-electric/40 bg-black/70 px-3 py-1 backdrop-blur">
            <span className="text-xs font-semibold tracking-wide text-[#1a1a1a]">
              Albany, NY
            </span>
          </div>
        </div>
      </div>

      {/* corner badges */}
      <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-black/10 bg-black/60 px-3 py-1 backdrop-blur">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
        </span>
        <span className="text-[11px] font-medium text-[#1a1a1a]/80">HQ · Albany</span>
      </div>
      <div className="absolute bottom-4 right-4 rounded-full border border-black/10 bg-black/60 px-3 py-1 backdrop-blur">
        <span className="text-[11px] font-medium text-[#1a1a1a]/60 tnum">
          42.6526° N, 73.7562° W
        </span>
      </div>
    </GlassCard>
  );
}

function ContactSection() {
  return (
    <SectionShell id="contact" className="md:py-24">
      <SectionHeading
        eyebrow="Contact"
        title="Let's do great work together"
        description="Stop wasting time on unqualified leads. We connect you with motivated home sellers in your area who are serious about selling."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
        {/* ---------- LEFT: contact form ---------- */}
        <Reveal delay={0.1} className="h-full">
          <GlassCard
            strong
            className="relative h-full overflow-hidden rounded-2xl p-6 md:p-8"
          >
            {/* ambient glow */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-electric/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-violet/15 blur-3xl" />

            <div className="relative flex h-full flex-col gap-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-electric/15 ring-1 ring-electric/30">
                  <MessageSquare className="h-5 w-5 text-electric" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-[#1a1a1a]">
                    Send us a message
                  </h3>
                  <p className="text-sm text-[#1a1a1a]/50">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-1 flex-col gap-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="name" className="text-[#1a1a1a]/70">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Jane Cooper"
                      className="h-11 rounded-lg border-black/10 bg-black/5 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus-visible:border-electric/50 focus-visible:ring-electric/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email" className="text-[#1a1a1a]/70">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@brokerage.com"
                      className="h-11 rounded-lg border-black/10 bg-black/5 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus-visible:border-electric/50 focus-visible:ring-electric/20"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="phone" className="text-[#1a1a1a]/70">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(320) 331-0910"
                    className="h-11 rounded-lg border-black/10 bg-black/5 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus-visible:border-electric/50 focus-visible:ring-electric/20"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1.5">
                  <Label htmlFor="message" className="text-[#1a1a1a]/70">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your goals and the counties you cover..."
                    className="min-h-32 flex-1 resize-none rounded-lg border-black/10 bg-black/5 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus-visible:border-electric/50 focus-visible:ring-electric/20"
                  />
                </div>
                <Button
                  type="submit"
                  className="group relative h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(120deg,#2563EB,#38BDF8,#14B8A6)] px-6 text-sm font-semibold text-[#1a1a1a] shadow-[0_0_30px_-6px_rgba(37,99,235,0.7)] transition-shadow hover:shadow-[0_0_45px_-4px_rgba(56,189,248,0.85)]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
                  <Send className="relative h-4 w-4" />
                  <span className="relative">Send Message</span>
                </Button>
              </form>
            </div>
          </GlassCard>
        </Reveal>

        {/* ---------- RIGHT: info cards + map ---------- */}
        <Reveal delay={0.2} className="h-full">
          <div className="flex h-full flex-col gap-4">
            {/* 2x2 info cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard icon={Mail} iconTint="text-electric" label="Email">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="break-all transition-colors hover:text-electric"
                >
                  {CONTACT_INFO.email}
                </a>
              </InfoCard>

              <InfoCard icon={Phone} iconTint="text-violet" label="Phones">
                <ul className="flex flex-col gap-0.5">
                  {CONTACT_INFO.phones.map((p) => (
                    <li key={p}>
                      <a
                        href={`tel:${p.replace(/[^0-9+]/g, "")}`}
                        className="tnum transition-colors hover:text-violet"
                      >
                        {p}
                      </a>
                    </li>
                  ))}
                </ul>
              </InfoCard>

              <InfoCard icon={MapPin} iconTint="text-cyan" label="Address">
                <span className="block leading-relaxed">
                  {CONTACT_INFO.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </InfoCard>

              <InfoCard icon={Clock} iconTint="text-gold" label="Office Hours">
                <span className="tnum">{CONTACT_INFO.hours}</span>
              </InfoCard>
            </div>

            {/* stylized map */}
            <div className="flex-1">
              <StylizedMap />
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

/* ============================================================
   CTA BANNER
============================================================ */

function CtaBanner() {
  return (
    <section className="relative w-full px-5 py-12 sm:px-8 md:py-16">
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-3xl border border-black/10">
        {/* animated gradient background */}
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#2563EB_0%,#38BDF8_45%,#14B8A6_100%,#2563EB_150%)] animate-gradient-x" />
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
            className="inline-flex items-center gap-2 rounded-full border border-black/25 bg-black/10 px-4 py-1.5 text-xs font-medium tracking-wide text-[#1a1a1a] backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Ready to scale?
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-[#1a1a1a] text-glow sm:text-5xl md:text-6xl"
          >
            Ready to grow your business?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-xl text-base leading-relaxed text-[#1a1a1a]/85 sm:text-lg"
          >
            Join thousands of real estate professionals who trust Opus Global Solution for verified outreach, dedicated VAs, and documented workflows.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-2 flex flex-col items-center gap-3 sm:flex-row"
          >
            {/* Book Demo, white / outline */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/50 bg-black/10 px-7 py-3.5 text-sm font-semibold text-[#1a1a1a] backdrop-blur transition-all hover:bg-white/20 hover:shadow-[0_0_35px_-6px_rgba(255,255,255,0.6)]"
            >
              <Calendar className="h-4 w-4" />
              Book Demo
            </motion.button>
            {/* Start Free Trial, dark solid with glow */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#1a1a1a] shadow-[0_0_35px_-6px_rgba(0,0,0,0.8)] ring-1 ring-white/10 transition-all hover:shadow-[0_0_50px_-4px_rgba(255,255,255,0.5)]"
            >
              <Rocket className="h-4 w-4 text-electric" />
              Start Free Trial
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          </motion.div>

          <p className="text-xs text-[#1a1a1a]/60">
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
    <div className="flex items-center">
      <LogoImage className="h-11 sm:h-12" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative w-full bg-[#f8f9fa]">
      {/* gradient divider at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#2563EB] via-[#38BDF8] to-[#14B8A6]" />
      {/* faint top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-electric/5 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 md:py-20">
        {/* ---------- top row ---------- */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* left: logo + tagline + socials */}
          <div className="flex flex-col gap-6">
            <LogoMark />
            <p className="max-w-sm text-sm leading-relaxed text-[#1a1a1a]/55">
              Your trusted partner for marketing consulting, outreach
              support, and CRM solutions. Human-verified outreach, dedicated
              virtual assistants, and documented workflows for licensed real
              estate professionals.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/5 text-[#1a1a1a]/60 transition-all hover:-translate-y-0.5 hover:border-electric/40 hover:bg-electric/10 hover:text-[#1a1a1a]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* right: newsletter */}
          <div className="flex flex-col gap-4 lg:items-end lg:text-right">
            <div className="lg:max-w-sm">
              <h3 className="font-heading text-lg font-semibold text-[#1a1a1a]">
                Stay ahead of the market
              </h3>
              <p className="mt-1.5 text-sm text-[#1a1a1a]/50">
                Weekly insights on outreach and prospecting.
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
                className="w-full flex-1 rounded-full border border-black/10 bg-black/5 px-5 py-3 text-sm text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 outline-none transition-colors focus:border-electric/50 focus:bg-black/10"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[linear-gradient(120deg,#2563EB,#38BDF8)] px-5 py-3 text-sm font-semibold text-[#1a1a1a] shadow-[0_0_25px_-8px_rgba(37,99,235,0.8)] transition-shadow hover:shadow-[0_0_35px_-6px_rgba(56,189,248,0.85)]"
              >
                <Send className="h-4 w-4" />
                Subscribe
              </motion.button>
            </form>
            <p className="text-xs text-[#1a1a1a]/35 lg:max-w-sm lg:text-right">
              We respect your inbox. Unsubscribe with one click.
            </p>
          </div>
        </div>

        {/* ---------- divider ---------- */}
        <div className="my-12 h-px w-full bg-black/5 md:my-14" />

        {/* ---------- link columns ---------- */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3.5">
              <h4 className="font-heading text-sm font-semibold tracking-wide text-[#1a1a1a]">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#1a1a1a]/55 transition-colors hover:text-[#1a1a1a]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ---------- bottom bar ---------- */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-black/8 pt-8 md:flex-row">
          <p className="text-xs text-[#1a1a1a]/45">
            © 2025 Opus Global Solution. All rights reserved.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <span className="inline-flex items-center gap-1.5 text-xs text-[#1a1a1a]/45">
              <ShieldCheck className="h-3.5 w-3.5 text-electric/70" />
              Made with care
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs text-[#1a1a1a]/60">
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
  return (
    <>
      {/* ============ PRICING ============ */}
      <SectionShell id="pricing" className="md:py-24">
        <SectionHeading
          eyebrow="Pricing"
          title="We've got a plan that's perfect for you"
          description="Whether you're just starting or need an all-inclusive solution, our plans scale with your goals."
        />

        {/* plan-cadence note (replaces monthly/annual toggle) */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-2 backdrop-blur">
              <Calendar className="h-3.5 w-3.5 text-electric" />
              <span className="text-sm font-medium text-[#1a1a1a]/70">
                One-time setup
              </span>
              <span className="text-[#1a1a1a]/20">·</span>
              <span className="text-sm font-medium text-[#1a1a1a]">
                30-day or 365-day plans
              </span>
            </div>
          </div>
        </Reveal>

        {/* pricing cards, 6 plans, 3-col grid (2 rows of 3) */}
        <div className="mt-12 grid items-stretch gap-6 lg:mt-14 lg:grid-cols-3 lg:gap-6 lg:pt-6">
          {PLANS.map((plan, i) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              delay={0.15 + i * 0.08}
            />
          ))}
        </div>

        {/* disclaimer */}
        <Reveal delay={0.3}>
          <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-[#1a1a1a]/40">
            Opus Global Solution is a marketing consulting and support company. We do
            not act as a brokerage, list or sell property, or resell leads.
            Referral fees apply on successful closings.
          </p>
        </Reveal>
      </SectionShell>

      {/* ============ FAQ ============ */}
      <SectionShell id="faq" className="md:py-24">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Find answers to commonly asked questions about Opus Global Solution."
          align="center"
        />
        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-3xl">
            <FaqList />
          </div>
        </Reveal>

        {/* contact prompt */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-3 rounded-2xl border border-black/8 bg-white/[0.02] px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="font-heading text-base font-semibold text-[#1a1a1a]">
                Still have questions?
              </p>
              <p className="text-sm text-[#1a1a1a]/50">
                Our team replies within a few hours, 7 days a week.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-black/15 bg-black/5 px-5 py-2.5 text-sm font-semibold text-[#1a1a1a] transition-colors hover:border-black/30 hover:bg-black/10"
            >
              Contact support
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </SectionShell>

      {/* ============ CONTACT ============ */}
      <ContactSection />

      {/* ============ CTA BANNER ============ */}
      <CtaBanner />

      {/* ============ FOOTER ============ */}
      <Footer />
    </>
  );
}
