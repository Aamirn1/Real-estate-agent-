import type { Metadata } from "next";
import { SiteChrome, PageHero } from "@/components/leadsphere/SiteChrome";
import { CTABanner } from "@/components/leadsphere/CTABanner";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
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
import {
  Users,
  Network,
  TrendingUp,
  Database,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Opus Global Solution | Real Estate Marketing Experts",
  description:
    "Opus Global Solution provides professional marketing and administrative support for real estate professionals. Learn about our mission, vision, and what makes us different.",
  alternates: { canonical: "https://opusglobalsolution.com/about" },
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
  { icon: Users, value: 12, suffix: "", label: "Core Services Offered", color: "electric" },
  { icon: Network, value: 6, suffix: "", label: "VA Specialties", color: "violet" },
  { icon: TrendingUp, value: 100, suffix: "%", label: "Human-Verified Outreach", color: "cyan" },
  { icon: Database, value: 3, suffix: "", label: "Flexible Pricing Plans", color: "gold" },
];

export default function AboutPage() {
  return (
    <SiteChrome withBackground={false} flushTop>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://opusglobalsolution.com" },
          { name: "About Us", url: "https://opusglobalsolution.com/about" },
        ]}
      />
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

      {/* 1. Who We Are (Mission / Vision / Who We Serve) + Benefits (Why We Are Different removed from About page) */}
      <AboutMission showWhyDifferent={false} />

      {/* 2. Our Workflow | 4-step onboarding */}
      <OurWorkflow />

      {/* 3. Traditional vs Opus-powered comparison */}
      <BeforeAfter />

      {/* 4. Our Achievements / Stats grid */}
      <SectionShell id="achievements">
        <SectionHeading
          eyebrow="Our Achievements"
          title="A growing partner network nationwide"
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

      {/* 5. Closing CTA */}
      <CTABanner
        title="Partner with Opus Global Solution"
        subtitle="Long-term support, documented workflows, and a team that scales with your goals."
      />
    </SiteChrome>
  );
}
