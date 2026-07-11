"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ScrollText,
  FileText,
  BellRing,
  Clock,
  Mail,
  Gauge,
  Lightbulb,
  Search,
  ClipboardList,
  PhoneCall,
  BarChart3,
  MapPin,
  Layers,
  Crosshair,
} from "lucide-react";
import {
  GlassCard,
  SectionHeading,
  SectionShell,
} from "@/components/leadsphere/primitives";
import { Reveal } from "@/components/leadsphere/Reveal";
import { AnimatedBackground } from "@/components/leadsphere/AnimatedBackground";
import { useMouseParallax } from "@/lib/leadsphere/hooks";

/* ============================================================================
 * SECTION 1 — AI Sales Assistant
 * ========================================================================== */

const AI_FEATURES = [
  { icon: Sparkles, label: "Predict hot leads" },
  { icon: ScrollText, label: "Summarize conversations" },
  { icon: FileText, label: "Generate scripts" },
  { icon: BellRing, label: "Follow-up reminders" },
  { icon: Clock, label: "Best call time" },
  { icon: Mail, label: "Email drafting" },
  { icon: Gauge, label: "Lead scoring" },
  { icon: Lightbulb, label: "Smart recommendations" },
];

/** 12 neural-net nodes positioned in % across the section background. */
const NEURAL_NODES = [
  { x: 8, y: 18 },
  { x: 18, y: 55 },
  { x: 12, y: 84 },
  { x: 32, y: 12 },
  { x: 28, y: 78 },
  { x: 45, y: 8 },
  { x: 55, y: 92 },
  { x: 68, y: 14 },
  { x: 72, y: 80 },
  { x: 88, y: 22 },
  { x: 82, y: 58 },
  { x: 92, y: 86 },
];

const NEURAL_EDGES: Array<[number, number]> = [
  [0, 3],
  [0, 1],
  [1, 2],
  [1, 4],
  [2, 4],
  [3, 10],
  [3, 5],
  [4, 6],
  [4, 11],
  [5, 7],
  [5, 10],
  [6, 8],
  [6, 9],
  [7, 8],
  [8, 9],
  [10, 11],
  [7, 10],
];

function NeuralNetwork() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Connecting lines via non-scaling-stroke SVG */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="nn-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        {NEURAL_EDGES.map(([a, b], i) => {
          const na = NEURAL_NODES[a];
          const nb = NEURAL_NODES[b];
          return (
            <motion.line
              key={`e-${i}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke="url(#nn-grad)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.06, 0.32, 0.06] }}
              transition={{
                duration: 4 + (i % 5),
                repeat: Infinity,
                delay: i * 0.18,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>

      {/* Nodes as round dots (avoid SVG ellipse distortion) */}
      {NEURAL_NODES.map((n, i) => (
        <motion.span
          key={`n-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            width: 5,
            height: 5,
            transform: "translate(-50%, -50%)",
            background:
              i % 3 === 0
                ? "#60a5fa"
                : i % 3 === 1
                ? "#a78bfa"
                : "#22d3ee",
            boxShadow: "0 0 8px currentColor",
          }}
          animate={{
            opacity: [0.35, 1, 0.35],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + (i % 4),
            repeat: Infinity,
            delay: i * 0.25,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function AiOrb() {
  const mouse = useMouseParallax(1);
  return (
    <div className="relative flex h-[300px] w-full items-center justify-center">
      <motion.div
        style={{ x: mouse.x * 22, y: mouse.y * 22 }}
        className="relative flex items-center justify-center"
      >
        {/* Pulse rings */}
        <span className="absolute h-[150px] w-[150px] rounded-full bg-electric/25 animate-pulse-ring" />
        <span className="absolute h-[150px] w-[150px] rounded-full bg-violet/25 animate-pulse-ring [animation-delay:1.1s]" />
        <span className="absolute h-[150px] w-[150px] rounded-full bg-cyan/25 animate-pulse-ring [animation-delay:2.1s]" />

        {/* Rotating rings */}
        <span className="absolute h-[200px] w-[200px] rounded-full border border-dashed border-electric/30 animate-spin-slow" />
        <span className="absolute h-[240px] w-[240px] rounded-full border border-violet/20 animate-spin-slow [animation-direction:reverse] [animation-duration:32s]" />
        <span className="absolute h-[280px] w-[280px] rounded-full border border-cyan/15 animate-spin-slow [animation-duration:40s]" />

        {/* The orb */}
        <div
          className="animate-orb-breathe relative flex h-[180px] w-[180px] items-center justify-center rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 28%, #bfdbfe 0%, #3b82f6 24%, #8b5cf6 58%, #06b6d4 100%)",
            boxShadow:
              "0 0 60px -8px rgba(59,130,246,0.6), 0 0 140px -24px rgba(139,92,246,0.55), inset 0 0 50px rgba(255,255,255,0.18)",
          }}
        >
          {/* Specular highlight */}
          <div
            className="absolute inset-0 rounded-full opacity-70"
            style={{
              background:
                "radial-gradient(circle at 30% 22%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 42%)",
            }}
          />
          {/* Inner rings */}
          <div className="absolute inset-5 rounded-full border border-[#E2E8F0]" />
          <div className="absolute inset-10 rounded-full border border-[#E2E8F0]" />
          {/* Center sparkle */}
          <Sparkles className="relative h-7 w-7 text-[#1E293B] drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        </div>

        {/* Floating "Live" badge */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="absolute -right-2 top-6 sm:right-6"
        >
          <GlassCard
            strong
            className="flex items-center gap-2 px-3 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            <span className="text-[11px] font-medium tracking-wide text-[#1E293B]/70">
              Live · 1,247 leads
            </span>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
}

function AiAssistantSection() {
  return (
    <SectionShell id="ai" className="overflow-hidden">
      <AnimatedBackground variant="ai" />
      <NeuralNetwork />

      <div className="relative z-10 flex flex-col items-center gap-10">
        <Reveal>
          <AiOrb />
        </Reveal>

        <SectionHeading
          eyebrow="Smart Assistant"
          title={
            <>
              Meet your{" "}
              <span className="text-gradient-electric">smart sales assistant</span>
            </>
          }
          description="Predict hot leads, draft emails, and never miss a follow-up."
        />

        {/* Feature pills */}
        <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {AI_FEATURES.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.05} className="h-full">
              <GlassCard
                sheen
                className="group flex h-full items-center gap-3 p-3 transition-all duration-300 hover:border-[#E2E8F0] hover:shadow-[0_0_34px_-10px_rgba(59,130,246,0.55)] sm:p-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-electric/25 to-violet/25 text-cyan transition-transform duration-300 group-hover:scale-110">
                  <f.icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium leading-tight text-[#1E293B]/80 sm:text-sm">
                  {f.label}
                </span>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

/* ============================================================================
 * SECTION 2 — Lead Generation Process Timeline
 * ========================================================================== */

const STEPS = [
  {
    n: 1,
    title: "Research & Identification",
    desc: "We analyze data and market trends to help identify potential contacts that align with your target audience.",
    icon: Search,
  },
  {
    n: 2,
    title: "Qualification & Verification",
    desc: "Our team verifies interest levels through professional conversations and standardized intake methods, ensuring contacts are relevant before they reach your CRM.",
    icon: ClipboardList,
  },
  {
    n: 3,
    title: "Scheduling & Handoff",
    desc: "Verified contacts are documented and either scheduled into your calendar or added into your CRM for your direct follow-up. All interactions respect compliance rules (DNC, TCPA, opt-out).",
    icon: PhoneCall,
  },
  {
    n: 4,
    title: "Ongoing Reporting & Support",
    desc: "We provide clear, monthly milestone reports and continuous administrative support, giving your team the freedom to focus on relationship-building and successful client outcomes.",
    icon: BarChart3,
  },
];

function StepNumber({ n }: { n: number }) {
  return (
    <div className="relative flex h-14 w-14 items-center justify-center">
      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-electric via-violet to-cyan opacity-60 blur-md" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-electric via-violet to-cyan font-heading text-lg font-semibold text-[#1E293B] shadow-[0_0_30px_-6px_rgba(139,92,246,0.75)]">
        {n}
      </span>
    </div>
  );
}

function ProcessTimelineSection() {
  return (
    <SectionShell id="process" className="overflow-hidden">
      <AnimatedBackground variant="section" />

      <div className="relative z-10 flex flex-col gap-14">
        <SectionHeading
          eyebrow="Our Process"
          title={
            <>
              How we <span className="text-gradient-electric">work</span>
            </>
          }
        />

        {/* Desktop — horizontal timeline */}
        <div className="relative hidden md:block">
          {/* Base gradient line */}
          <div className="absolute left-0 right-0 top-7 h-[2px] rounded-full bg-gradient-to-r from-electric via-violet to-cyan opacity-40" />
          {/* Animated shimmer comet */}
          <motion.div
            className="absolute left-0 right-0 top-7 h-[2px] overflow-hidden rounded-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white to-transparent"
              initial={{ x: "-30%" }}
              animate={{ x: "420%" }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          {/* Steps */}
          <div className="relative grid grid-cols-4 gap-4">
            {STEPS.map((s, i) => (
              <Reveal
                key={s.n}
                delay={i * 0.12}
                className="flex flex-col items-center text-center"
              >
                <StepNumber n={s.n} />
                <GlassCard sheen className="mt-6 w-full p-4">
                  <s.icon className="mx-auto mb-3 h-5 w-5 text-cyan" />
                  <h3 className="font-heading text-sm font-semibold sm:text-base">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#1E293B]/55">
                    {s.desc}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile — vertical timeline */}
        <div className="relative md:hidden">
          <div className="absolute bottom-2 left-6 top-2 w-[2px] rounded-full bg-gradient-to-b from-electric via-violet to-cyan opacity-40" />
          <motion.div
            className="absolute bottom-2 left-6 top-2 w-[2px] overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="absolute inset-x-0 h-1/4 bg-gradient-to-b from-transparent via-white to-transparent"
              initial={{ y: "-30%" }}
              animate={{ y: "420%" }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          <div className="relative space-y-5">
            {STEPS.map((s, i) => (
              <Reveal
                key={s.n}
                delay={i * 0.1}
                className="relative pl-16"
              >
                <div className="absolute left-0 top-0">
                  <StepNumber n={s.n} />
                </div>
                <GlassCard sheen className="p-4">
                  <div className="flex items-center gap-2">
                    <s.icon className="h-4 w-4 text-cyan" />
                    <h3 className="font-heading text-sm font-semibold">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#1E293B]/55">
                    {s.desc}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

/* ============================================================================
 * SECTION 3 — Interactive Geo Prospecting Map
 * ========================================================================== */

type PinType = "motivated" | "expired" | "fsbo" | "highValue";

const PIN_COLORS: Record<PinType, string> = {
  motivated: "#3b82f6",
  expired: "#8b5cf6",
  fsbo: "#06b6d4",
  highValue: "#d4af37",
};

const PIN_LABELS: Record<PinType, string> = {
  motivated: "Motivated",
  expired: "Expired",
  fsbo: "FSBO",
  highValue: "High Value",
};

const PINS: Array<{
  x: number;
  y: number;
  type: PinType;
  address: string;
  value: string;
}> = [
  { x: 24, y: 32, type: "motivated", address: "1420 Vine St · Austin, TX", value: "$485K" },
  { x: 38, y: 22, type: "highValue", address: "88 Sunset Blvd · Beverly Hills, CA", value: "$2.4M" },
  { x: 31, y: 48, type: "fsbo", address: "512 Cedar Ave · Phoenix, AZ", value: "$612K" },
  { x: 46, y: 38, type: "expired", address: "77 Lakeshore Dr · Chicago, IL", value: "$740K" },
  { x: 55, y: 28, type: "motivated", address: "9 Park Pl · Denver, CO", value: "$528K" },
  { x: 62, y: 44, type: "highValue", address: "1 Ocean Dr · Miami, FL", value: "$1.9M" },
  { x: 68, y: 24, type: "fsbo", address: "230 Hill Rd · Seattle, WA", value: "$865K" },
  { x: 73, y: 56, type: "expired", address: "14 Magnolia St · Atlanta, GA", value: "$445K" },
  { x: 80, y: 34, type: "motivated", address: "601 Elm Way · Boston, MA", value: "$980K" },
  { x: 84, y: 50, type: "highValue", address: "5 Fifth Ave · New York, NY", value: "$3.2M" },
  { x: 50, y: 66, type: "fsbo", address: "321 Bay St · Houston, TX", value: "$395K" },
  { x: 42, y: 72, type: "motivated", address: "18 Mesa Ln · Albuquerque, NM", value: "$358K" },
];

const CLUSTERS: Array<{ x: number; y: number; count: number; color: string }> = [
  { x: 33, y: 30, count: 248, color: "#3b82f6" },
  { x: 58, y: 40, count: 156, color: "#8b5cf6" },
  { x: 80, y: 48, count: 92, color: "#06b6d4" },
];

const FILTERS: Array<{ id: "all" | PinType; label: string; count: number }> = [
  { id: "all", label: "All Leads", count: 1247 },
  { id: "motivated", label: "Motivated", count: 312 },
  { id: "expired", label: "Expired", count: 184 },
  { id: "fsbo", label: "FSBO", count: 96 },
  { id: "highValue", label: "High Value", count: 58 },
];

function InteractiveMapSection() {
  const [active, setActive] = useState<"all" | PinType>("all");
  const [query, setQuery] = useState("");
  const [hovered, setHovered] = useState<number | null>(null);

  const visiblePins = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PINS.map((p, i) => {
      const chipOk = active === "all" || p.type === active;
      const queryOk = q === "" || p.address.toLowerCase().includes(q);
      return { ...p, i, dim: !(chipOk && queryOk) };
    });
  }, [active, query]);

  return (
    <SectionShell id="map" className="overflow-hidden">
      <AnimatedBackground variant="section" />

      <div className="relative z-10 flex flex-col gap-12">
        <SectionHeading
          eyebrow="Geo Prospecting"
          title={
            <>
              Find leads{" "}
              <span className="text-gradient-electric">anywhere on the map</span>
            </>
          }
          description="Stylized heatmaps, property clusters and live lead pins across North America."
        />

        <Reveal y={36}>
          <GlassCard
            strong
            sheen
            className="overflow-hidden p-0"
          >
            <div className="flex flex-col md:flex-row">
              {/* ---------- Sidebar ---------- */}
              <aside className="flex w-full shrink-0 flex-col gap-4 border-b border-[#E2E8F0] p-4 md:w-60 md:border-b-0 md:border-r">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-cyan" />
                    <span className="font-heading text-sm font-semibold">
                      Filters
                    </span>
                  </div>
                  <span className="rounded-full bg-[#1E293B]/5 px-2 py-0.5 text-[10px] text-[#1E293B]/55">
                    1,247 active
                  </span>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#1E293B]/40" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search address…"
                    className="w-full rounded-lg border border-[#E2E8F0] bg-[#1E293B]/5 py-2 pl-8 pr-3 text-xs text-[#1E293B]/80 outline-none transition placeholder:text-[#1E293B]/35 focus:border-electric/50 focus:bg-[#1E293B]/5"
                  />
                </div>

                {/* Filter chips */}
                <div className="flex flex-col gap-1.5">
                  {FILTERS.map((f) => {
                    const isActive = active === f.id;
                    return (
                      <button
                        key={f.id}
                        onClick={() => setActive(f.id)}
                        className={[
                          "group flex items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-all duration-200",
                          isActive
                            ? "bg-gradient-to-r from-electric/25 to-violet/20 text-[#1E293B] shadow-[0_0_24px_-10px_rgba(59,130,246,0.7)] ring-1 ring-inset ring-white/15"
                            : "text-[#1E293B]/60 hover:bg-[#1E293B]/5 hover:text-[#1E293B]/85",
                        ].join(" ")}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full transition-shadow"
                            style={{
                              background:
                                f.id === "all" ? "#f5f5f7" : PIN_COLORS[f.id],
                              boxShadow:
                                isActive && f.id !== "all"
                                  ? `0 0 8px ${PIN_COLORS[f.id]}`
                                  : "none",
                            }}
                          />
                          {f.label}
                        </span>
                        <span className="tnum text-[10px] text-[#1E293B]/45">
                          {f.count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-auto hidden border-t border-[#E2E8F0] pt-3 md:block">
                  <div className="flex items-center gap-2 text-[10px] text-[#1E293B]/40">
                    <Crosshair className="h-3 w-3" />
                    Live data · refreshed 2m ago
                  </div>
                </div>
              </aside>

              {/* ---------- Map canvas ---------- */}
              <div className="relative h-[440px] flex-1 overflow-hidden sm:h-[540px]">
                {/* Tilted backdrop layer (3D-ish) */}
                <div
                  className="absolute inset-0"
                  style={{
                    transform:
                      "perspective(1400px) rotateX(7deg)",
                    transformOrigin: "center 75%",
                  }}
                >
                  {/* Dotted grid pattern */}
                  <div
                    className="absolute inset-0 opacity-70"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1.4px)",
                      backgroundSize: "22px 22px",
                    }}
                  />
                  {/* Stylized continent silhouette */}
                  <svg
                    aria-hidden
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 400 320"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <defs>
                      <linearGradient id="land-grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.18" />
                        <stop offset="55%" stopColor="#8b5cf6" stopOpacity="0.14" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.10" />
                      </linearGradient>
                      <linearGradient id="land-stroke" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.35" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 70 60 C 130 38, 220 40, 270 58 L 305 82 L 312 124 L 296 162 L 270 192 L 238 220 L 212 250 L 196 288 L 184 262 L 172 238 L 150 214 L 124 192 L 100 168 L 80 138 L 70 100 Z"
                      fill="url(#land-grad)"
                      stroke="url(#land-stroke)"
                      strokeWidth="1.2"
                      opacity="0.9"
                    />
                  </svg>

                  {/* Heatmap density blobs */}
                  <div
                    className="absolute h-[220px] w-[220px] rounded-full blur-[60px]"
                    style={{
                      left: "22%",
                      top: "22%",
                      background:
                        "radial-gradient(circle, rgba(59,130,246,0.55) 0%, rgba(59,130,246,0) 70%)",
                    }}
                  />
                  <div
                    className="absolute h-[260px] w-[260px] rounded-full blur-[70px]"
                    style={{
                      left: "48%",
                      top: "30%",
                      background:
                        "radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(139,92,246,0) 70%)",
                    }}
                  />
                  <div
                    className="absolute h-[200px] w-[200px] rounded-full blur-[60px]"
                    style={{
                      left: "70%",
                      top: "38%",
                      background:
                        "radial-gradient(circle, rgba(6,182,212,0.45) 0%, rgba(6,182,212,0) 70%)",
                    }}
                  />
                </div>

                {/* Top horizon gradient for depth */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#070708] to-transparent" />

                {/* ---------- Pins layer (flat, not tilted) ---------- */}
                <div className="absolute inset-0">
                  {visiblePins.map((p) => {
                    const isHovered = hovered === p.i;
                    return (
                      <button
                        key={p.i}
                        onMouseEnter={() => setHovered(p.i)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() =>
                          setHovered((h) => (h === p.i ? null : p.i))
                        }
                        className="group absolute -translate-x-1/2 -translate-y-full transition-opacity duration-300"
                        style={{
                          left: `${p.x}%`,
                          top: `${p.y}%`,
                          opacity: p.dim ? 0.22 : 1,
                          zIndex: isHovered ? 30 : 10,
                        }}
                        aria-label={`${PIN_LABELS[p.type]} lead at ${p.address}`}
                      >
                        <div className="relative">
                          {/* Pulse ring at the pin tip */}
                          <span
                            className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full animate-pulse-ring"
                            style={{ background: PIN_COLORS[p.type] }}
                          />
                          <MapPin
                            className="relative h-7 w-7 transition-transform duration-300 group-hover:scale-115"
                            style={{
                              color: PIN_COLORS[p.type],
                              filter: `drop-shadow(0 0 10px ${PIN_COLORS[p.type]})`,
                            }}
                            fill="currentColor"
                          />

                          {/* Hover tooltip */}
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 6, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ duration: 0.18 }}
                              className="absolute bottom-full left-1/2 z-40 mb-2 -translate-x-1/2 whitespace-nowrap"
                            >
                              <GlassCard
                                strong
                                className="px-3 py-2"
                              >
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className="h-1.5 w-1.5 rounded-full"
                                    style={{
                                      background: PIN_COLORS[p.type],
                                      boxShadow: `0 0 6px ${PIN_COLORS[p.type]}`,
                                    }}
                                  />
                                  <span className="text-[11px] font-medium text-[#1E293B]/90">
                                    {p.address}
                                  </span>
                                </div>
                                <div className="mt-0.5 pl-3 text-[10px] text-[#1E293B]/55">
                                  Est. value{" "}
                                  <span className="tnum font-medium text-[#1E293B]/80">
                                    {p.value}
                                  </span>{" "}
                                  · {PIN_LABELS[p.type]}
                                </div>
                              </GlassCard>
                              {/* Tooltip arrow */}
                              <span className="absolute left-1/2 top-full -mt-1 h-2 w-2 -translate-x-1/2 rotate-45 bg-[rgba(13,13,16,0.85)] ring-1 ring-white/10" />
                            </motion.div>
                          )}
                        </div>
                      </button>
                    );
                  })}

                  {/* ---------- Clusters ---------- */}
                  {CLUSTERS.map((c, i) => (
                    <div
                      key={i}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${c.x}%`, top: `${c.y}%`, zIndex: 20 }}
                    >
                      <div className="relative flex h-14 w-14 items-center justify-center">
                        <span
                          className="absolute inset-0 rounded-full animate-pulse-ring"
                          style={{ background: c.color, opacity: 0.4 }}
                        />
                        <span
                          className="absolute inset-0 rounded-full blur-md opacity-50"
                          style={{ background: c.color }}
                        />
                        <div
                          className="glass-strong relative flex h-14 w-14 items-center justify-center rounded-full ring-1 ring-white/15"
                          style={{ boxShadow: `0 0 28px -6px ${c.color}` }}
                        >
                          <span
                            className="tnum font-heading text-sm font-semibold"
                            style={{ color: c.color }}
                          >
                            {c.count}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ---------- Legend (top-right) ---------- */}
                <div className="absolute right-3 top-3 z-40 sm:right-4 sm:top-4">
                  <GlassCard strong className="px-3 py-2.5">
                    <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-[#1E293B]/45">
                      Pin legend
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {(Object.keys(PIN_COLORS) as PinType[]).map((t) => (
                        <div
                          key={t}
                          className="flex items-center gap-2 text-[11px] text-[#1E293B]/70"
                        >
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{
                              background: PIN_COLORS[t],
                              boxShadow: `0 0 6px ${PIN_COLORS[t]}`,
                            }}
                          />
                          {PIN_LABELS[t]}
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>

                {/* ---------- Bottom status bar ---------- */}
                <div className="absolute bottom-3 left-3 z-40 flex items-center gap-2 sm:bottom-4 sm:left-4">
                  <GlassCard className="flex items-center gap-2 px-3 py-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
                    </span>
                    <span className="text-[10px] text-[#1E293B]/60">
                      {visiblePins.filter((p) => !p.dim).length} of{" "}
                      {PINS.length} pins shown
                    </span>
                  </GlassCard>
                </div>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </SectionShell>
  );
}

/* ============================================================================
 * DEFAULT EXPORT — three stacked sections
 * ========================================================================== */

export default function AiProcessMap() {
  return (
    <>
      <ProcessTimelineSection />
    </>
  );
}
