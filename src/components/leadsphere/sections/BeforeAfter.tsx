"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Search,
  Phone,
  XCircle,
  Zap,
  Brain,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import {
  GlassCard,
  SectionHeading,
  SectionShell,
} from "@/components/leadsphere/primitives";
import { Reveal } from "@/components/leadsphere/Reveal";

const TRADITIONAL = [
  { icon: Search, text: "Manual neighborhood research", time: "~5 hrs/day" },
  { icon: Phone, text: "Cold-calling unverified numbers", time: "60+ dials/day" },
  { icon: Clock, text: "Reactive follow-ups", time: "2–3 day lag" },
  { icon: XCircle, text: "1–3% close rate", time: "Low ROI" },
];

const AI_POWERED = [
  { icon: Brain, text: "Opus finds motivated sellers automatically", time: "Real-time" },
  { icon: Zap, text: "Skip-traced, verified contacts", time: "1 click" },
  { icon: TrendingUp, text: "Smart-triggered follow-ups at the perfect moment", time: "Instant" },
  { icon: CheckCircle2, text: "8–12% close rate", time: "3x ROI" },
];

export function BeforeAfter() {
  return (
    <SectionShell id="comparison">
      <SectionHeading
        eyebrow="The Difference"
        title={
          <>
            Traditional prospecting vs.{" "}
            <span className="text-gradient-electric">Opus-powered</span>
          </>
        }
        description="Stop grinding for leads. Let Opus do the heavy lifting so you can focus on closing."
      />

      <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr]">
        {/* Before */}
        <Reveal>
          <GlassCard className="h-full p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5">
                  <Clock className="h-4.5 w-4.5 text-white/50" />
                </span>
                <h3 className="font-heading text-lg font-semibold text-white/70">
                  The old way
                </h3>
              </div>
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white/40">
                Manual
              </span>
            </div>

            <div className="space-y-3">
              {TRADITIONAL.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-3.5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                    <item.icon className="h-4 w-4 text-red-400/80" />
                  </span>
                  <span className="flex-1 text-sm text-white/60">{item.text}</span>
                  <span className="text-[11px] font-medium text-white/35">{item.time}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-red-500/5 p-4 text-center">
              <div className="text-xs uppercase tracking-wide text-white/35">Avg result</div>
              <div className="mt-1 font-heading text-2xl font-bold text-white/50 tnum">
                2 listings / mo
              </div>
            </div>
          </GlassCard>
        </Reveal>

        {/* Center divider with arrow */}
        <div className="flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.2 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-electric to-violet shadow-[0_0_30px_-4px_rgba(59,130,246,0.7)] lg:h-14 lg:w-14"
          >
            <ArrowRight className="h-5 w-5 text-white lg:rotate-0" />
          </motion.div>
        </div>

        {/* After */}
        <Reveal delay={0.15}>
          <GlassCard strong sheen className="relative h-full overflow-hidden p-6 sm:p-8">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-electric/20 blur-3xl" />
            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-violet">
                    <Zap className="h-4.5 w-4.5 text-white" />
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-white">
                    The Opus way
                  </h3>
                </div>
                <span className="rounded-full border border-electric/30 bg-electric/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-electric">
                  Opus-Powered
                </span>
              </div>

              <div className="space-y-3">
                {AI_POWERED.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.15, duration: 0.5 }}
                    className="flex items-center gap-3 rounded-xl border border-electric/15 bg-electric/[0.04] p-3.5"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10">
                      <item.icon className="h-4 w-4 text-emerald-400" />
                    </span>
                    <span className="flex-1 text-sm text-white/85">{item.text}</span>
                    <span className="text-[11px] font-medium text-electric">{item.time}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 rounded-xl bg-gradient-to-br from-electric/15 to-violet/15 p-4 text-center">
                <div className="text-xs uppercase tracking-wide text-white/55">Avg result</div>
                <div className="mt-1 font-heading text-2xl font-bold text-white tnum">
                  8 listings / mo
                </div>
                <div className="mt-0.5 text-[11px] font-medium text-emerald-400">
                  +300% more listings
                </div>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </SectionShell>
  );
}
