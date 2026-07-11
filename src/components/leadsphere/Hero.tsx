"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  PlayCircle,
  CheckCircle2,
} from "lucide-react";
import { AnimatedBackground } from "@/components/leadsphere/AnimatedBackground";
import { MagneticButton } from "@/components/leadsphere/MagneticButton";

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden">
      {/* Full-bleed background image — mobile portrait on small screens, desktop landscape on md+ */}
      <picture className="absolute inset-0 z-0">
        <source media="(min-width: 768px)" srcSet="/hero-bg-desktop.png" />
        <img
          src="/hero-bg-mobile.png"
          alt=""
          aria-hidden
          className="h-full w-full object-cover"
        />
      </picture>
      {/* Dark gradient overlays for text legibility + brand cohesion */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/40 md:bg-gradient-to-r md:from-[#050505] md:via-[#050505]/60 md:to-[#050505]/20" />
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-electric/10 via-transparent to-violet/10" />
      {/* Subtle animated particles on top of image for life */}
      <AnimatedBackground variant="hero" className="opacity-40" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-32 sm:px-8 sm:py-40">
        <div className="flex max-w-2xl flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-electric" />
            </span>
            Human-verified outreach · No autodialers
            <Sparkles className="h-3 w-3 text-violet" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-heading text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-[3.5rem]"
          >
            Scale Your Real Estate
            <br />
            <span className="text-gradient-electric text-glow">Business with Professional Support.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            Your trusted partner for marketing consulting, outreach support,
            CRM assistance, workflow automation, and administrative services —
            all delivered through verified, human-only outreach.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <MagneticButton>
              <a
                href="/signup"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-electric to-violet px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_-6px_rgba(59,130,246,0.7)] transition-all hover:shadow-[0_0_40px_-4px_rgba(139,92,246,0.85)]"
              >
                <span className="relative z-10">Get Started</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
            </MagneticButton>
            <MagneticButton strength={0.3}>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:border-white/25 hover:bg-white/10"
              >
                <PlayCircle className="h-4.5 w-4.5 text-cyan" />
                Book a Consultation
              </a>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white/45"
          >
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Not a brokerage
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Human-only outreach
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Verified contacts
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Compliance-first
            </span>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-white/60"
          />
        </span>
      </motion.div>
    </section>
  );
}

