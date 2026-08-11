"use client";

import {
  Sparkles,
  ArrowRight,
  PlayCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedBackground } from "@/components/leadsphere/AnimatedBackground";
import { Typewriter } from "@/components/leadsphere/Typewriter";
import { trackGetStartedClick, trackBookDemoClick } from "@/lib/analytics";

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden">
      {/* Full-bleed background image, mobile portrait on small screens, desktop landscape on md+ */}
      <picture className="absolute inset-0 z-0">
        <source media="(min-width: 768px)" srcSet="/hero-bg-desktop.png" />
        <img
          src="/hero-bg-mobile.png"
          alt="Modern luxury home — Opus Global Solution real estate marketing"
          aria-hidden
          width={768}
          height={1344}
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </picture>
      {/* Dark gradient overlays for text legibility + brand cohesion */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent md:bg-gradient-to-r md:from-[#050505]/70 md:via-[#050505]/10 md:to-transparent" />
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-electric/10 via-transparent to-violet/10" />
      {/* Subtle animated particles on top of image for life */}
      <AnimatedBackground variant="hero" className="opacity-20" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-32 sm:px-8 sm:py-40">
        <div className="flex max-w-2xl flex-col items-start">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-electric" />
            </span>
            <Typewriter
              prefix="Human-verified outreach · "
              lines={[
                "No autodialers",
                "Verified contacts",
                "Consent-based",
              ]}
            />
            <Sparkles className="h-3 w-3 text-violet" />
          </div>

          <h1
            className="mt-6 font-heading text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-[3.5rem]"
          >
            Scale Your Real Estate
            <br />
            <span className="text-gradient-electric text-glow">Business with Professional Support.</span>
          </h1>

          <p
            className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
          >
            Your trusted partner for marketing consulting, outreach support,
            CRM assistance, workflow automation, and administrative services,
            all delivered through verified, human-only outreach.
          </p>

          <div
            className="mt-9 flex flex-row items-center gap-2.5"
          >
            <motion.a
              href="/get-started"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => trackGetStartedClick("hero")}
              className="btn-shimmer group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-electric to-violet px-5 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-6px_rgba(59,130,246,0.7)] transition-all hover:shadow-[0_0_40px_-4px_rgba(139,92,246,0.85)]"
            >
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => trackBookDemoClick("hero")}
              className="btn-shimmer group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-all hover:border-white/25 hover:bg-white/10"
            >
              <PlayCircle className="relative z-10 h-4 w-4 text-cyan" />
              <span className="relative z-10 hidden xs:inline sm:inline">Book a Consultation</span>
              <span className="relative z-10 xs:hidden sm:hidden">Book Demo</span>
            </motion.a>
          </div>

          <div
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-white"
          >
            <div className="flex flex-col">
              <span className="font-heading text-2xl font-bold text-white">12</span>
              <span className="text-xs text-white/60">Core Services</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-2xl font-bold text-white">6</span>
              <span className="text-xs text-white/60">VA Specialties</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-2xl font-bold text-white">3</span>
              <span className="text-xs text-white/60">Pricing Plans</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-2xl font-bold text-white">100%</span>
              <span className="text-xs text-white/60">Human-Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue — only animated element, uses CSS not framer-motion */}
      <div
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1.5">
          <span className="h-1.5 w-1 animate-bounce rounded-full bg-white/60" />
        </span>
      </div>
    </section>
  );
}
