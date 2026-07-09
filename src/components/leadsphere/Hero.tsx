"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  PlayCircle,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Bell,
  Bot,
  CheckCircle2,
  DollarSign,
  Users,
  Activity,
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

/* ============================================================ */
/* Hero Image (with parallax float + glass frame)               */
/* ============================================================ */

function HeroImage({ mx, my }: { mx: number; my: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{
        x: mx * 18,
        y: my * 18,
      }}
      className="relative h-full w-full"
    >
      {/* Glow behind image */}
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-electric/30 via-violet/20 to-cyan/20 blur-3xl" />

      {/* Main image in glass frame */}
      <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 glass-strong glass-sheen shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
        <img
          src="/hero-image.png"
          alt="Opus Solutions team — professional real estate marketing and outreach support"
          className="h-full w-full object-cover"
          loading="eager"
        />
        {/* Gradient overlay for text legibility + brand cohesion */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-electric/10 via-transparent to-violet/10" />

        {/* Floating badge — top left */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-[#050505]/70 px-3 py-1.5 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[11px] font-medium text-white/85">Team available now</span>
        </motion.div>

        {/* Floating stat card — bottom left */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-white/15 bg-[#050505]/75 p-3 backdrop-blur-md"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-electric">
            <TrendingUp className="h-4 w-4 text-white" />
          </span>
          <div>
            <div className="font-heading text-sm font-bold text-white tnum">98% Satisfaction</div>
            <div className="text-[10px] text-white/55">Across 4+ agent teams</div>
          </div>
        </motion.div>

        {/* Floating intro card — bottom right */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-4 right-4 flex items-center gap-2.5 rounded-2xl border border-white/15 bg-[#050505]/75 p-3 backdrop-blur-md"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-electric to-violet">
            <Bell className="h-3.5 w-3.5 text-white" />
          </span>
          <div>
            <div className="text-[11px] font-semibold text-white">New verified intro</div>
            <div className="text-[9px] text-white/55">142 Maple Ave · 2m ago</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ============================================================ */
/* Floating Dashboard (kept for fallback — not rendered)        */
/* ============================================================ */

function FloatingDashboard({ mx, my }: { mx: number; my: number }) {
  // depth factors — farther cards move more
  const layer = (depth: number) => ({
    x: mx * depth * 40,
    y: my * depth * 40,
  });

  return (
    <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
      {/* Main dashboard card */}
      <Floaty style={layer(0.5)} className="absolute left-1/2 top-1/2 w-[88%] -translate-x-1/2 -translate-y-1/2 sm:w-[78%]">
        <MainPanel />
      </Floaty>

      {/* Live lead notification - top left */}
      <Floaty style={layer(1.4)} className="absolute left-0 top-4 w-[62%] sm:w-[52%] animate-float-y [animation-delay:-1s]">
        <LeadNotification />
      </Floaty>

      {/* Mini analytics - top right */}
      <Floaty style={layer(1.7)} className="absolute right-0 top-0 w-[46%] sm:w-[42%] animate-float-y-slow">
        <MiniAnalytics />
      </Floaty>

      {/* AI assistant - bottom left */}
      <Floaty style={layer(1.6)} className="absolute bottom-6 left-2 w-[58%] sm:w-[50%] animate-float-y [animation-delay:-3s]">
        <AiAssistant />
      </Floaty>

      {/* Activity timeline - bottom right */}
      <Floaty style={layer(1.3)} className="absolute bottom-2 right-0 w-[44%] sm:w-[40%] animate-float-y-slow [animation-delay:-2s]">
        <ActivityCard />
      </Floaty>

      {/* Property pin floating */}
      <Floaty style={layer(2.0)} className="absolute right-6 top-1/3 hidden sm:block">
        <PropertyPin />
      </Floaty>
    </div>
  );
}

function Floaty({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ----- Main Panel: pipeline + chart ----- */
function MainPanel() {
  return (
    <div className="glass-strong glass-sheen relative overflow-hidden rounded-2xl p-4 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
      {/* top bar */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/80" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
        </div>
        <span className="text-[10px] font-medium text-white/40">app.opussolutions.com</span>
        <div className="h-5 w-5 rounded-full bg-gradient-to-br from-electric to-violet" />
      </div>

      {/* KPI row */}
      <div className="mb-3 grid grid-cols-3 gap-2">
        {[
          { label: "Intros", val: "12,840", icon: Users, c: "text-electric" },
          { label: "Satisfaction", val: "98%", icon: TrendingUp, c: "text-emerald-400" },
          { label: "Teams", val: "4+", icon: DollarSign, c: "text-gold" },
        ].map((k) => (
          <div key={k.label} className="rounded-xl border border-white/8 bg-white/[0.03] p-2.5">
            <div className="flex items-center gap-1.5">
              <k.icon className={`h-3 w-3 ${k.c}`} />
              <span className="text-[9px] uppercase tracking-wide text-white/40">{k.label}</span>
            </div>
            <div className="mt-1 font-heading text-base font-semibold text-white tnum">{k.val}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-medium text-white/50">Introductions · 7d</span>
          <span className="rounded-full bg-emerald-400/10 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-400">+24%</span>
        </div>
        <div className="flex h-16 items-end gap-1.5">
          {[40, 65, 48, 80, 58, 92, 72].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.08, ease: "easeOut" }}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-electric/40 to-violet"
            />
          ))}
        </div>
      </div>

      {/* Pipeline strip */}
      <div className="mt-3 flex gap-1.5">
        {[
          { n: "New", c: "bg-cyan/20 text-cyan" },
          { n: "Contact", c: "bg-electric/20 text-electric" },
          { n: "Appt", c: "bg-violet/20 text-violet" },
          { n: "Close", c: "bg-gold/20 text-gold" },
        ].map((s) => (
          <div key={s.n} className={`flex-1 rounded-lg px-2 py-1.5 text-center text-[9px] font-semibold ${s.c}`}>
            {s.n}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----- Lead Notification ----- */
function LeadNotification() {
  return (
    <div className="glass-strong relative overflow-hidden rounded-2xl p-3.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2">
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-electric">
          <Bell className="h-3.5 w-3.5 text-white" />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0d0d10]" />
        </span>
        <div className="min-w-0">
          <div className="text-[10px] font-semibold text-white">New verified introduction</div>
          <div className="truncate text-[9px] text-white/50">142 Maple Ave · 2m ago</div>
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-between">
        <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[9px] font-semibold text-emerald-400">Verified · Ready</span>
        <span className="font-heading text-sm font-semibold text-white tnum">$890K</span>
      </div>
    </div>
  );
}

/* ----- Mini Analytics ----- */
function MiniAnalytics() {
  return (
    <div className="glass-strong relative overflow-hidden rounded-2xl p-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]">
      <div className="mb-2 flex items-center gap-1.5">
        <Activity className="h-3 w-3 text-violet" />
        <span className="text-[9px] font-medium text-white/60">Conversion</span>
      </div>
      {/* Donut */}
      <div className="relative mx-auto h-16 w-16">
        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
          <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3.5" />
          <motion.circle
            cx="18" cy="18" r="15.5" fill="none" stroke="url(#dg)" strokeWidth="3.5" strokeLinecap="round"
            strokeDasharray="97.4"
            initial={{ strokeDashoffset: 97.4 }}
            animate={{ strokeDashoffset: 97.4 * (1 - 0.92) }}
            transition={{ duration: 1.4, delay: 0.8, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="dg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading text-sm font-bold text-white tnum">92%</span>
        </div>
      </div>
      <div className="mt-1 text-center text-[8px] text-white/40">vs 48% industry</div>
    </div>
  );
}

/* ----- AI Assistant ----- */
function AiAssistant() {
  return (
    <div className="glass-strong relative overflow-hidden rounded-2xl p-3.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2">
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet to-electric">
          <Bot className="h-4 w-4 text-white" />
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-violet/40" />
        </span>
        <div>
          <div className="text-[10px] font-semibold text-white">Your Virtual Assistant</div>
          <div className="flex items-center gap-1 text-[8px] text-emerald-400">
            <span className="h-1 w-1 rounded-full bg-emerald-400" /> Online
          </div>
        </div>
      </div>
      <div className="mt-2.5 rounded-xl rounded-tl-sm bg-white/[0.05] p-2.5">
        <p className="text-[9.5px] leading-relaxed text-white/75">
          Sarah from Maple Ave is <span className="text-electric font-medium">verified and ready to talk</span>. Best time to call: today 4–6pm.
        </p>
      </div>
      <div className="mt-2 flex gap-1.5">
        <span className="flex-1 rounded-lg bg-electric/15 py-1 text-center text-[8.5px] font-medium text-electric">Call now</span>
        <span className="flex-1 rounded-lg bg-white/8 py-1 text-center text-[8.5px] font-medium text-white/60">Draft email</span>
      </div>
    </div>
  );
}

/* ----- Activity Timeline ----- */
function ActivityCard() {
  const items = [
    { i: Phone, c: "text-electric", t: "Call · J. Reynolds", s: "3m" },
    { i: Mail, c: "text-violet", t: "Email · S. Mitchell", s: "12m" },
    { i: CheckCircle2, c: "text-emerald-400", t: "Closed · $1.2M", s: "1h" },
  ];
  return (
    <div className="glass-strong relative overflow-hidden rounded-2xl p-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]">
      <div className="mb-2 text-[9px] font-semibold uppercase tracking-wide text-white/45">Activity</div>
      <div className="space-y-2">
        {items.map((it, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/5">
              <it.i className={`h-3 w-3 ${it.c}`} />
            </span>
            <span className="flex-1 truncate text-[9px] text-white/70">{it.t}</span>
            <span className="text-[8px] text-white/35">{it.s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----- Floating Property Pin ----- */
function PropertyPin() {
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-electric/40" />
      </div>
      <div className="glass-strong flex items-center gap-2 rounded-full px-3 py-1.5 shadow-[0_10px_30px_-8px_rgba(59,130,246,0.5)]">
        <MapPin className="h-3.5 w-3.5 text-electric" />
        <span className="text-[9px] font-semibold text-white tnum">$1.45M</span>
      </div>
    </div>
  );
}
