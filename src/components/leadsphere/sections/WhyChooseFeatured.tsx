"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Headset,
  Award,
  MessagesSquare,
  Maximize2,
  FileBarChart,
  Handshake,
  Scale,
  Star,
  BadgeCheck,
  TrendingUp,
  Quote,
} from "lucide-react";
import {
  GlassCard,
  SectionHeading,
  SectionShell,
} from "@/components/leadsphere/primitives";
import { Reveal } from "@/components/leadsphere/Reveal";

/* ============================================================
   WHY CHOOSE US — 8 large animated cards
   ============================================================ */
const REASONS = [
  {
    icon: ShieldCheck,
    title: "Verified Workflows",
    desc: "Every process is documented, standardized, and repeatable — so nothing slips through the cracks.",
    color: "electric",
  },
  {
    icon: Headset,
    title: "Professional Support",
    desc: "A dedicated account manager and virtual assistant keep your business running smoothly.",
    color: "violet",
  },
  {
    icon: Award,
    title: "Experienced Specialists",
    desc: "Our team brings deep real estate marketing and CRM expertise to every engagement.",
    color: "cyan",
  },
  {
    icon: MessagesSquare,
    title: "Reliable Communication",
    desc: "Regular updates, clear reporting, and a team that picks up the phone when you call.",
    color: "electric",
  },
  {
    icon: Maximize2,
    title: "Scalable Solutions",
    desc: "From solo agents to large brokerages, our support packages grow with your business.",
    color: "violet",
  },
  {
    icon: FileBarChart,
    title: "Transparent Reporting",
    desc: "Monthly milestone reports and clear analytics keep you informed at every step.",
    color: "cyan",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnership",
    desc: "We're more than a service provider — we're a trusted ally invested in your success.",
    color: "electric",
  },
  {
    icon: Scale,
    title: "Compliance-Focused",
    desc: "TCPA, DNC, CAN-SPAM, CCPA/CPRA, and Fair Housing Act compliant — consent-based always.",
    color: "violet",
  },
];

export function WhyChooseUs() {
  return (
    <SectionShell id="why-us" className="relative overflow-hidden">
      {/* ambient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-24 -z-10 h-[420px] w-[420px] rounded-full bg-electric/8 blur-[150px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-24 -z-10 h-[420px] w-[420px] rounded-full bg-violet/8 blur-[150px]"
      />

      <SectionHeading
        eyebrow="Why Choose Us"
        title={
          <>
            Built different,{" "}
            <span className="text-gradient-electric">built to last</span>
          </>
        }
        description="Choosing Opus Solutions means choosing a partner that understands the unique challenges of real estate professionals."
      />

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {REASONS.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.06}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="group h-full"
            >
              <GlassCard className="h-full p-6 transition-all duration-300 hover:border-[#E2E8F0]">
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-${r.color}/15 transition-transform duration-300 group-hover:scale-110`}
                >
                  <r.icon className={`h-6 w-6 text-${r.color}`} strokeWidth={2} />
                </div>
                <h3 className="font-heading text-base font-semibold text-[#1E293B]">
                  {r.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#1E293B]/55">
                  {r.desc}
                </p>
                <div
                  className={`mt-4 h-0.5 w-10 rounded-full bg-${r.color}/50 transition-all duration-300 group-hover:w-20`}
                />
              </GlassCard>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

/* ============================================================
   FEATURED PROFESSIONALS — agent cards + success stories
   ============================================================ */
const PROFESSIONALS = [
  {
    name: "Charisse Mathews",
    location: "Realtor · Florida",
    initials: "CM",
    avatar: "from-electric to-violet",
    specialty: "Residential Listings",
    metric: "14 deals / quarter",
    story:
      "With verified introductions and dedicated outreach support, Charisse scaled from 4 to 14 closings per quarter without cold-calling.",
  },
  {
    name: "Thuan Nguyen",
    location: "Realtor · Texas",
    initials: "TN",
    avatar: "from-cyan to-electric",
    specialty: "Investment Properties",
    metric: "47% lower cost-per-lead",
    story:
      "Human-verified outreach and CRM organization cut Thuan's cost-per-introduction nearly in half in the first month.",
  },
  {
    name: "Jennifer Bianchi",
    location: "Broker · Texas",
    initials: "JB",
    avatar: "from-violet to-fuchsia-500",
    specialty: "Team Brokerage",
    metric: "12 hrs saved / week",
    story:
      "Workflow automation and a dedicated VA freed Jennifer's team from admin work — 12 hours back every week to focus on clients.",
  },
  {
    name: "Kira Asinas",
    location: "Investor · AL/GA/FL",
    initials: "KA",
    avatar: "from-gold to-amber-500",
    specialty: "Off-Market Deals",
    metric: "3 deals / month",
    story:
      "Documented outreach surfaces off-market opportunities before they hit the MLS — Kira closed three deals nobody else knew existed.",
  },
  {
    name: "Carlos Banuelos",
    location: "Realtor · California",
    initials: "CB",
    avatar: "from-emerald-400 to-cyan",
    specialty: "Luxury Markets",
    metric: "41-day close time",
    story:
      "Appointment coordination and client reminders dropped Carlos's listing-to-close time from 90 days to just 41.",
  },
  {
    name: "Victoria Hyatt",
    location: "Realtor · California",
    initials: "VH",
    avatar: "from-electric to-cyan",
    specialty: "High-Volume Teams",
    metric: "3x pipeline growth",
    story:
      "CRM setup, pipeline optimization, and monthly reporting helped Victoria's team triple their active pipeline in one quarter.",
  },
];

export function FeaturedProfessionals() {
  return (
    <SectionShell id="professionals" className="relative">
      <SectionHeading
        eyebrow="Featured Professionals"
        title={
          <>
            Real estate professionals{" "}
            <span className="text-gradient-electric">we support</span>
          </>
        }
        description="Meet the agents, brokers, and investors who grow their businesses with Opus Solutions."
      />

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROFESSIONALS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.07}>
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
              <GlassCard strong sheen className="relative h-full overflow-hidden p-6">
                {/* corner glow */}
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${p.avatar} opacity-15 blur-2xl`}
                />

                {/* header: avatar + name */}
                <div className="relative flex items-center gap-3.5">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${p.avatar} font-heading text-sm font-bold text-[#1E293B] shadow-lg`}
                  >
                    {p.initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading text-base font-semibold text-[#1E293B]">
                      {p.name}
                    </h3>
                    <p className="text-xs text-[#1E293B]/50">{p.location}</p>
                  </div>
                  <BadgeCheck className="ml-auto h-5 w-5 shrink-0 text-electric" />
                </div>

                {/* specialty + metric */}
                <div className="relative mt-5 flex items-center justify-between">
                  <span className="rounded-full border border-[#E2E8F0] bg-[#1E293B]/5 px-2.5 py-1 text-[11px] font-medium text-[#1E293B]/65">
                    {p.specialty}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {p.metric}
                  </span>
                </div>

                {/* story */}
                <div className="relative mt-4 flex gap-2.5">
                  <Quote className="h-4 w-4 shrink-0 text-electric/50" />
                  <p className="text-sm leading-relaxed text-[#1E293B]/60">
                    {p.story}
                  </p>
                </div>

                {/* stars */}
                <div className="relative mt-4 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-3.5 w-3.5 fill-gold text-gold"
                    />
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
