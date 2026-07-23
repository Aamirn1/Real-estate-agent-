import type { Metadata } from "next";
import { SiteChrome, PageHero } from "@/components/leadsphere/SiteChrome";
import { CTABanner } from "@/components/leadsphere/CTABanner";
import {
  AboutMission,
  OurWorkflow,
} from "@/components/leadsphere/sections/AboutVaWorkflow";
import { BeforeAfter } from "@/components/leadsphere/sections/BeforeAfter";
import {
  GlassCard,
  CountUp,
  SectionHeading,
  SectionShell,
} from "@/components/leadsphere/primitives";
import { Reveal } from "@/components/leadsphere/Reveal";
import { ContactForm } from "./ContactForm";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Users,
  Network,
  TrendingUp,
  Database,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Opus Global Solution | Real Estate Marketing Experts",
  description:
    "Opus Global Solution provides professional marketing and administrative support for real estate professionals. Learn about our mission, vision, and what makes us different.",
};

/* ---- Inline data for the Achievements stats grid ---- */
type StatColor = "electric" | "violet" | "cyan" | "gold";

const STAT_THEME: Record<
  StatColor,
  { iconWrap: string; icon: string; glow: string; value: string }
> = {
  electric: {
    iconWrap: "bg-electric/15",
    icon: "text-electric",
    glow: "shadow-[0_0_40px_-10px_rgba(37,99,235,0.55)]",
    value: "text-black",
  },
  violet: {
    iconWrap: "bg-violet/15",
    icon: "text-violet",
    glow: "shadow-[0_0_40px_-10px_rgba(56,189,248,0.55)]",
    value: "text-black",
  },
  cyan: {
    iconWrap: "bg-cyan/15",
    icon: "text-cyan",
    glow: "shadow-[0_0_40px_-10px_rgba(6,182,212,0.55)]",
    value: "text-black",
  },
  gold: {
    iconWrap: "bg-gold/15",
    icon: "text-gold",
    glow: "shadow-[0_0_40px_-10px_rgba(212,175,55,0.55)]",
    value: "text-black",
  },
};

const STATS: {
  icon: typeof Users;
  value: number;
  suffix: string;
  label: string;
  color: StatColor;
}[] = [
  { icon: Users, value: 50, suffix: "K+", label: "Active Agents", color: "electric" },
  { icon: Network, value: 100, suffix: "+", label: "MLS Integrations", color: "violet" },
  { icon: TrendingUp, value: 92, suffix: "%", label: "Conversion Improvement", color: "cyan" },
  { icon: Database, value: 250, suffix: "M+", label: "Lead Records", color: "gold" },
];

const CONTACT_ROWS: { icon: typeof Mail; label: string; value: string }[] = [
  {
    icon: Mail,
    label: "Email",
    value: "info@opussolutions.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(320) 331-0910  ·  (320) 331-8501  ·  (320) 331-3559",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "418 Broadway, Ste. R, Albany, NY 12207, United States",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "10:00 A.M. to 08:00 P.M (EST)",
  },
];

export default function AboutPage() {
  return (
    <SiteChrome withBackground={false} flushTop>
      <PageHero
        heroImage="/heroes/about-home.jpg"
        eyebrow="About Us"
        title={
          <>
            A group of experts helping you{" "}
            <span className="text-gradient-electric">own your local market</span>
          </>
        }
        description="We provide professional marketing and administrative support for real estate professionals. Our mission is to help licensed agents and brokerages stay organized, save time, and grow stronger businesses."
      />

      {/* 1. Who We Are (Mission / Vision / Who We Serve) + Benefits + Why Different + Achievements banner */}
      <AboutMission />

      {/* Team image */}
      <section className="relative w-full px-5 pb-4 sm:px-8">
        <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-black/15 shadow-lg">
          <img
            src="/sections/about-team.jpg"
            alt="Opus Global Solution team collaborating in modern office"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </section>

      {/* 2. Our Workflow | 4-step onboarding */}
      <OurWorkflow />

      {/* 3. Traditional vs Opus-powered comparison */}
      <BeforeAfter />

      {/* 4. NEW | Our Achievements / Stats grid */}
      <SectionShell id="achievements">
        <SectionHeading
          eyebrow="Our Achievements"
          title="Fast-growing partner network nationwide"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => {
            const theme = STAT_THEME[stat.color];
            const Icon = stat.icon;
            return (
              <Reveal key={stat.label} delay={i * 0.08}>
                <GlassCard
                  strong
                  className={`group relative h-full overflow-hidden p-7 ${theme.glow}`}
                >
                  {/* soft corner glow */}
                  <div
                    className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-40 blur-2xl ${theme.iconWrap}`}
                  />
                  <span
                    className={`relative flex h-12 w-12 items-center justify-center rounded-xl ${theme.iconWrap}`}
                  >
                    <Icon className={`h-6 w-6 ${theme.icon}`} />
                  </span>
                  <div
                    className={`relative mt-6 font-heading text-4xl font-semibold tracking-tight ${theme.value} tnum`}
                  >
                    <CountUp
                      value={stat.value}
                      suffix={stat.suffix}
                      duration={1800}
                    />
                  </div>
                  <p className="relative mt-2 text-sm font-medium text-black">
                    {stat.label}
                  </p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-base leading-relaxed text-black">
            As a fast-growing partner network, our goal is to introduce agents to
            practical tools, workflows, and technology that improve response
            times and win rates.
          </p>
        </Reveal>
      </SectionShell>

      {/* 5. NEW | Contact section */}
      <SectionShell id="contact">
        <SectionHeading
          eyebrow="Contact"
          title="Let's do great work together"
          description="Tell us about your goals and we'll show you how Opus Global Solution can fit into your workflow."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {/* LEFT | contact info */}
          <Reveal>
            <GlassCard strong className="flex h-full flex-col p-7 sm:p-8">
              <h3 className="font-heading text-2xl font-semibold text-black">
                Reach out directly
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-black">
                Prefer to skip the form? Use any of the channels below | our team
                responds within one business day.
              </p>

              <div className="mt-8 flex flex-col gap-5">
                {CONTACT_ROWS.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div key={row.label} className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black/5 ring-1 ring-white/10">
                        <Icon className="h-5 w-5 text-electric" />
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-medium uppercase tracking-wider text-black">
                          {row.label}
                        </span>
                        <span className="text-sm leading-relaxed text-black">
                          {row.value}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto pt-8">
                <div className="rounded-xl border border-black/15 bg-white/[0.03] p-4">
                  <p className="text-xs leading-relaxed text-black">
                    Opus Global Solution is a marketing consulting and support company.
                    We do not act as a brokerage, list or sell property, or
                    resell leads.
                  </p>
                </div>
              </div>
            </GlassCard>
          </Reveal>

          {/* RIGHT | contact form (client component) */}
          <Reveal delay={0.08}>
            <GlassCard strong className="h-full p-0">
              <ContactForm />
            </GlassCard>
          </Reveal>
        </div>
      </SectionShell>

      {/* 6. Closing CTA */}
      <CTABanner
        title="Partner with Opus Global Solution"
        subtitle="Long-term support, documented workflows, and a team that scales with your goals."
      />
    </SiteChrome>
  );
}
