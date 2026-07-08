"use client";

import { motion } from "framer-motion";
import {
  Megaphone,
  Table2,
  Workflow,
  Headset,
  PhoneCall,
  Share2,
  CalendarClock,
  BarChart3,
  Handshake,
  Users,
  TrendingUp,
  Network,
} from "lucide-react";
import {
  GlassCard,
  CountUp,
  SectionHeading,
  SectionShell,
} from "@/components/leadsphere/primitives";
import { Reveal } from "@/components/leadsphere/Reveal";

/* ============================================================
   Color theme tokens — static class strings so Tailwind picks
   them up at build time.
   ============================================================ */
type ColorKey = "electric" | "violet" | "cyan";

const THEME: Record<
  ColorKey,
  {
    text: string;
    iconWrap: string;
    iconGlow: string;
    cardBorder: string;
    cardGlow: string;
    bar: string;
    orb: string;
  }
> = {
  electric: {
    text: "text-electric",
    iconWrap: "bg-electric/15 ring-1 ring-inset ring-electric/30",
    iconGlow: "shadow-[0_0_26px_-6px_rgba(59,130,246,0.65)]",
    cardBorder: "hover:border-electric/40",
    cardGlow: "hover:shadow-[0_0_50px_-14px_rgba(59,130,246,0.55)]",
    bar: "bg-electric",
    orb: "bg-electric/20",
  },
  violet: {
    text: "text-violet",
    iconWrap: "bg-violet/15 ring-1 ring-inset ring-violet/30",
    iconGlow: "shadow-[0_0_26px_-6px_rgba(139,92,246,0.65)]",
    cardBorder: "hover:border-violet/40",
    cardGlow: "hover:shadow-[0_0_50px_-14px_rgba(139,92,246,0.55)]",
    bar: "bg-violet",
    orb: "bg-violet/20",
  },
  cyan: {
    text: "text-cyan",
    iconWrap: "bg-cyan/15 ring-1 ring-inset ring-cyan/30",
    iconGlow: "shadow-[0_0_26px_-6px_rgba(6,182,212,0.65)]",
    cardBorder: "hover:border-cyan/40",
    cardGlow: "hover:shadow-[0_0_50px_-14px_rgba(6,182,212,0.55)]",
    bar: "bg-cyan",
    orb: "bg-cyan/20",
  },
};

/* ============================================================
   1. TRUST SECTION
   ============================================================ */
const LOGOS = [
  "Caldwell Group",
  "Meridian Realty",
  "Summit Homes",
  "Vantage Partners",
  "Northstar",
  "BlueOcean",
  "Apex Estates",
  "Crest & Co.",
];

// Static hover color classes per logo (cycled electric / violet / cyan)
const LOGO_ACCENT: string[] = [
  "group-hover/logo:text-electric",
  "group-hover/logo:text-violet",
  "group-hover/logo:text-cyan",
  "group-hover/logo:text-electric",
  "group-hover/logo:text-violet",
  "group-hover/logo:text-cyan",
  "group-hover/logo:text-electric",
  "group-hover/logo:text-violet",
];

/** 8 unique geometric brand marks rendered with currentColor. */
function Mark({
  variant,
  className,
}: {
  variant: number;
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true" as const,
  };
  switch (variant % 8) {
    case 0:
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="8" cy="8" r="2.4" fill="currentColor" />
        </svg>
      );
    case 1:
      return (
        <svg {...common}>
          <rect x="1.5" y="1.5" width="9" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
          <rect
            x="5.5"
            y="5.5"
            width="9"
            height="9"
            rx="1.6"
            fill="currentColor"
            fillOpacity="0.25"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      );
    case 2:
      return (
        <svg {...common}>
          <path d="M8 1.2 L14.8 8 L8 14.8 L1.2 8 Z" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 5 L11 8 L8 11 L5 8 Z" fill="currentColor" />
        </svg>
      );
    case 3:
      return (
        <svg {...common}>
          <path
            d="M3 5 L8 10 L13 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 9 L8 14 L13 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />
        </svg>
      );
    case 4:
      return (
        <svg {...common}>
          <path
            d="M8 1 L9.2 6.8 L15 8 L9.2 9.2 L8 15 L6.8 9.2 L1 8 L6.8 6.8 Z"
            fill="currentColor"
          />
        </svg>
      );
    case 5:
      return (
        <svg {...common}>
          <path
            d="M1.5 6.2 Q4 3.7 6.5 6.2 T11.5 6.2 T15 6.2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M1.5 10.5 Q4 8 6.5 10.5 T11.5 10.5 T15 10.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
      );
    case 6:
      return (
        <svg {...common}>
          <path
            d="M8 1.5 L14.5 13.5 L1.5 13.5 Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M8 6 L11 11 L5 11 Z" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M8 4.4 L8 11.6 M4.4 8 L11.6 8"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

function Logo({ name, index }: { name: string; index: number }) {
  const accent = LOGO_ACCENT[index] ?? "group-hover/logo:text-electric";
  return (
    <div className="group/logo flex items-center gap-2.5 whitespace-nowrap px-3 transition-all duration-300 sm:px-4">
      <Mark
        variant={index}
        className={`h-4 w-4 text-white/40 transition-colors duration-300 ${accent}`}
      />
      <span
        className={`font-heading text-base font-semibold tracking-tight text-white/40 transition-colors duration-300 group-hover/logo:text-white sm:text-[1.05rem] ${accent}`}
      >
        {name}
      </span>
    </div>
  );
}

function TrustSection() {
  return (
    <SectionShell className="py-14 md:py-16">
      <Reveal className="flex flex-col items-center gap-8">
        <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-white/45">
          <span className="h-px w-6 bg-gradient-to-r from-transparent to-white/30" />
          Trusted by 50,000+ real estate professionals
          <span className="h-px w-6 bg-gradient-to-l from-transparent to-white/30" />
        </span>

        {/* Logos row: mobile marquee + desktop static */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
          {/* Mobile marquee (duplicated content) */}
          <div className="flex w-max animate-marquee sm:hidden">
            {[...LOGOS, ...LOGOS].map((name, i) => (
              <Logo key={`m-${i}`} name={name} index={i % LOGOS.length} />
            ))}
          </div>
          {/* Desktop static row */}
          <div className="hidden w-full items-center justify-between gap-4 sm:flex">
            {LOGOS.map((name, i) => (
              <Logo key={`d-${i}`} name={name} index={i} />
            ))}
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}

/* ============================================================
   2. ANIMATED STATISTICS SECTION
   ============================================================ */
const STATS: {
  icon: typeof Handshake;
  color: ColorKey;
  value: number;
  suffix: string;
  label: string;
}[] = [
  { icon: Handshake, color: "electric", value: 12, suffix: "K+", label: "Warm Introductions" },
  { icon: Users, color: "violet", value: 4, suffix: "+", label: "Agent Teams Supported" },
  { icon: Network, color: "cyan", value: 850, suffix: "+", label: "Campaigns Managed" },
  { icon: TrendingUp, color: "electric", value: 98, suffix: "%", label: "Satisfaction Rate" },
];

function StatsSection() {
  return (
    <SectionShell className="relative overflow-hidden">
      {/* decorative ambient orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-electric/10 blur-[140px]"
      />
      <SectionHeading
        eyebrow="By the Numbers"
        title="Results that speak for themselves"
      />

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => {
          const t = THEME[stat.color];
          const Icon = stat.icon;
          return (
            <Reveal key={stat.label} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
              >
                <GlassCard
                  sheen
                  className={`h-full border border-white/10 p-6 transition-all duration-300 ${t.cardBorder} ${t.cardGlow}`}
                >
                  {/* Icon */}
                  <div
                    className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${t.iconWrap} ${t.iconGlow}`}
                  >
                    <Icon className={`h-5 w-5 ${t.text}`} strokeWidth={2} />
                  </div>

                  {/* Number */}
                  <div className="font-heading text-4xl font-semibold leading-none tracking-tight text-white sm:text-[2.75rem]">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Label */}
                  <p className="mt-2.5 text-sm font-medium text-white/55">
                    {stat.label}
                  </p>

                  {/* Accent bar */}
                  <div className="mt-5 h-px w-full bg-white/5">
                    <div
                      className={`h-px w-1/3 ${t.bar} opacity-70 transition-all duration-500`}
                    />
                  </div>
                </GlassCard>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}

/* ============================================================
   3. INTERACTIVE FEATURES SECTION
   ============================================================ */
const FEATURES: {
  icon: typeof Megaphone;
  color: ColorKey;
  title: string;
  desc: string;
}[] = [
  {
    icon: Megaphone,
    color: "electric",
    title: "Marketing Consulting",
    desc: "Campaign planning, growth strategy, and brand positioning tailored to your market.",
  },
  {
    icon: Table2,
    color: "violet",
    title: "CRM Support",
    desc: "CRM setup, lead organization, pipeline optimization, and automation.",
  },
  {
    icon: Workflow,
    color: "cyan",
    title: "Workflow Automation",
    desc: "Automate repetitive tasks, lead tracking, reminders, and follow-ups.",
  },
  {
    icon: Headset,
    color: "electric",
    title: "Virtual Assistance",
    desc: "Administrative support, scheduling, data organization, and client communication.",
  },
  {
    icon: PhoneCall,
    color: "violet",
    title: "Outreach Support",
    desc: "Human-based, verified communication with documented follow-up processes.",
  },
  {
    icon: Share2,
    color: "cyan",
    title: "Digital Marketing",
    desc: "Social campaigns, email marketing, landing pages, and lead funnels.",
  },
  {
    icon: CalendarClock,
    color: "electric",
    title: "Appointment Coordination",
    desc: "Scheduling, calendar management, and client reminders handled for you.",
  },
  {
    icon: BarChart3,
    color: "violet",
    title: "Reporting & Analytics",
    desc: "Campaign reports, monthly performance tracking, and growth insights.",
  },
];

function FeaturesSection() {
  return (
    <SectionShell id="services" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-24 -z-10 h-[420px] w-[420px] rounded-full bg-violet/10 blur-[150px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-24 -z-10 h-[420px] w-[420px] rounded-full bg-cyan/10 blur-[150px]"
      />

      <SectionHeading
        eyebrow="Services"
        title="How we drive growth for real estate professionals"
        description="Outreach support, digital advertising, CRM management, and virtual assistants — twelve services working together to fill your pipeline."
      />

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => {
          const t = THEME[f.color];
          const Icon = f.icon;
          const idx = String(i + 1).padStart(2, "0");
          return (
            <Reveal key={f.title} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="h-full"
              >
                <GlassCard
                  sheen
                  className={`group relative h-full overflow-hidden border border-white/10 p-6 transition-all duration-300 ${t.cardBorder} ${t.cardGlow}`}
                >
                  {/* corner accent glow on hover */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full ${t.orb} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                  />

                  {/* top row: icon + index */}
                  <div className="relative flex items-start justify-between">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${t.iconWrap} ${t.iconGlow} transition-transform duration-300 group-hover:scale-105`}
                    >
                      <Icon className={`h-5 w-5 ${t.text}`} strokeWidth={2} />
                    </div>
                    <span className="font-heading text-xs font-medium tabular-nums tracking-widest text-white/25">
                      {idx}
                    </span>
                  </div>

                  {/* title */}
                  <h3 className="relative mt-5 font-heading text-lg font-semibold tracking-tight text-white">
                    {f.title}
                  </h3>

                  {/* description */}
                  <p className="relative mt-2 text-sm leading-relaxed text-white/55">
                    {f.desc}
                  </p>

                  {/* bottom accent line */}
                  <div className="relative mt-5 h-px w-full bg-white/5">
                    <div
                      className={`h-px w-0 ${t.bar} transition-all duration-500 group-hover:w-full`}
                    />
                  </div>
                </GlassCard>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}

/* ============================================================
   Default export — three stacked sections
   ============================================================ */
export default function TrustStatsFeatures() {
  return (
    <>
      <TrustSection />
      <StatsSection />
      <FeaturesSection />
    </>
  );
}
