import type { Metadata } from "next";
import { SiteChrome, PageHero } from "@/components/leadsphere/SiteChrome";
import { CTABanner } from "@/components/leadsphere/CTABanner";
import TrustStatsFeatures from "@/components/leadsphere/sections/TrustStatsFeatures";
import CrmIntegrationsTestimonials from "@/components/leadsphere/sections/CrmIntegrationsTestimonials";
import {
  GlassCard,
  SectionHeading,
  SectionShell,
} from "@/components/leadsphere/primitives";
import { Reveal } from "@/components/leadsphere/Reveal";
import { Star, BadgeCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Testimonials — Opus Solutions",
  description:
    "Hear directly from real estate professionals who have enhanced their efficiency and grown their businesses with Opus Solutions.",
};

/* ---- Inline "More Client Stories" data ---- */
type ClientStory = {
  quote: string;
  name: string;
  location: string;
  initials: string;
  avatar: string; // tailwind gradient classes (kept as full static strings for scanner)
};

const MORE_STORIES: ClientStory[] = [
  {
    quote:
      "Opus delivers the highest-quality leads I've ever worked with. Every introduction is pre-screened and ready to talk — my close rate across Alabama, Georgia, and Florida has never been higher.",
    name: "Kira Asinas",
    location: "AL/GA/FL",
    initials: "KA",
    avatar: "from-electric to-violet",
  },
  {
    quote:
      "I used to spend every evening cold-calling and chasing dead ends. Opus took that off my plate completely — I now spend that time actually closing deals with my family beside me.",
    name: "John Donahue",
    location: "PA",
    initials: "JD",
    avatar: "from-cyan to-electric",
  },
  {
    quote:
      "My conversion rate jumped from 2% to over 9% in a single quarter. The pre-screened introductions mean I'm only talking to sellers who are genuinely ready to move.",
    name: "Jennifer Bianchi",
    location: "TX",
    initials: "JB",
    avatar: "from-violet to-fuchsia-500",
  },
  {
    quote:
      "Their human-only outreach team handles every touchpoint with care. I've never had a single compliance worry, and my pipeline stays full without me lifting a finger.",
    name: "JC Johnson",
    location: "NV",
    initials: "JJ",
    avatar: "from-gold to-amber-500",
  },
  {
    quote:
      "For every dollar I invest in Opus, I see twelve back in commissions. The ROI is undeniable — it's the single best line item in my business budget every month.",
    name: "Carlos Banuelos",
    location: "CA",
    initials: "CB",
    avatar: "from-emerald-400 to-cyan",
  },
  {
    quote:
      "Having a dedicated account manager and virtual assistant changed everything. They know my business inside out and anticipate what I need before I even ask.",
    name: "Silvana Piadade",
    location: "TN",
    initials: "SP",
    avatar: "from-electric to-cyan",
  },
];

export default function TestimonialsPage() {
  return (
    <SiteChrome>
      <PageHero
        eyebrow="Testimonials"
        title={
          <>
            Clients tell <span className="text-gradient-electric">the story</span>
          </>
        }
        description="At Opus Solutions, our clients' success is our greatest achievement. Hear directly from real estate professionals who have enhanced their efficiency and grown their businesses with our support."
      />

      {/* 1. Trust + Stats + Features grid (social proof: 250M+ leads, 92% conversion, 50K+ agents, 100+ MLS) */}
      <TrustStatsFeatures />

      {/* 2. CRM Kanban + Integrations + Testimonials carousel (id="testimonials") */}
      <CrmIntegrationsTestimonials />

      {/* 3. NEW — More Client Stories (6 verified testimonial cards) */}
      <SectionShell id="more-stories">
        <SectionHeading
          eyebrow="Client Stories"
          title="Real results from real estate professionals"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MORE_STORIES.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.06} className="h-full">
              <GlassCard
                strong
                sheen
                className="group relative flex h-full flex-col overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#E2E8F0] hover:shadow-[0_20px_60px_-20px_rgba(139,92,246,0.35)] sm:p-7"
              >
                {/* soft accent glow */}
                <div
                  className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${s.avatar} opacity-15 blur-2xl transition-opacity duration-300 group-hover:opacity-30`}
                />

                {/* 5 gold stars */}
                <div className="relative flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4 fill-gold text-gold drop-shadow-[0_0_6px_rgba(212,175,55,0.45)]"
                    />
                  ))}
                </div>

                {/* quote */}
                <p className="relative mt-4 flex-1 text-[15px] leading-relaxed text-[#1E293B]/75">
                  &ldquo;{s.quote}&rdquo;
                </p>

                {/* divider */}
                <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

                {/* avatar + name + location + verified badge */}
                <div className="relative flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${s.avatar} text-sm font-semibold text-[#1E293B] shadow-[0_4px_18px_-4px_rgba(59,130,246,0.5)]`}
                  >
                    {s.initials}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-[#1E293B]">
                        {s.name}
                      </span>
                      <BadgeCheck className="h-4 w-4 text-electric drop-shadow-[0_0_6px_rgba(59,130,246,0.55)]" />
                    </div>
                    <span className="text-xs text-[#1E293B]/50">{s.location}</span>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      {/* 4. Closing CTA */}
      <CTABanner
        title="Join 50,000+ agents growing with Opus"
        subtitle="See why top-producing realtors trust Opus Solutions to fill their pipeline."
      />
    </SiteChrome>
  );
}
