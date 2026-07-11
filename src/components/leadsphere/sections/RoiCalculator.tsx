"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Home,
  Zap,
  ArrowRight,
} from "lucide-react";
import {
  GlassCard,
  SectionHeading,
  SectionShell,
  CountUp,
} from "@/components/leadsphere/primitives";
import { Reveal } from "@/components/leadsphere/Reveal";

export function RoiCalculator() {
  const [leadsPerMonth, setLeadsPerMonth] = useState(500);
  const [avgCommission, setAvgCommission] = useState(12000);
  const [closeRate, setCloseRate] = useState(8); // %

  const { listings, revenue, cost, profit, roiMultiple } = useMemo(() => {
    const listings = Math.round((leadsPerMonth * closeRate) / 100);
    const revenue = listings * avgCommission;
    const cost = 149; // Professional plan
    const profit = revenue - cost;
    const roiMultiple = revenue / cost;
    return { listings, revenue, profit, cost, roiMultiple };
  }, [leadsPerMonth, avgCommission, closeRate]);

  return (
    <SectionShell id="roi">
      <SectionHeading
        eyebrow="ROI Calculator"
        title={
          <>
            See your <span className="text-gradient-electric">estimated return</span>
          </>
        }
        description="Adjust the sliders to project your listings and revenue with Opus Global Solution."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {/* Controls */}
        <Reveal>
          <GlassCard strong className="p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-electric/15">
                <Calculator className="h-4.5 w-4.5 text-electric" />
              </span>
              <h3 className="font-heading text-lg font-semibold text-[#1a1a1a]">
                Your assumptions
              </h3>
            </div>

            <Slider
              label="Leads per month"
              value={leadsPerMonth}
              min={50}
              max={5000}
              step={50}
              onChange={setLeadsPerMonth}
              format={(v) => v.toLocaleString()}
              icon={Home}
              color="electric"
            />
            <Slider
              label="Avg commission per listing"
              value={avgCommission}
              min={3000}
              max={50000}
              step={500}
              onChange={setAvgCommission}
              format={(v) => `$${v.toLocaleString()}`}
              icon={DollarSign}
              color="violet"
            />
            <Slider
              label="Close rate"
              value={closeRate}
              min={1}
              max={20}
              step={0.5}
              onChange={setCloseRate}
              format={(v) => `${v}%`}
              icon={TrendingUp}
              color="cyan"
            />

            <div className="mt-6 flex items-center gap-2 rounded-xl border border-electric/20 bg-electric/5 p-3.5">
              <Zap className="h-4 w-4 shrink-0 text-electric" />
              <p className="text-xs leading-relaxed text-[#1a1a1a]/65">
                Industry average close rate is 1–3%. Opus agents average{" "}
                <span className="font-semibold text-electric">8–12%</span> thanks
                to smart lead scoring.
              </p>
            </div>
          </GlassCard>
        </Reveal>

        {/* Results */}
        <Reveal delay={0.12}>
          <GlassCard strong sheen className="relative overflow-hidden p-6 sm:p-8">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-electric/20 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-violet/20 blur-3xl" />

            <div className="relative">
              <div className="mb-6 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#38BDF8]">
                  <TrendingUp className="h-4.5 w-4.5 text-[#1a1a1a]" />
                </span>
                <h3 className="font-heading text-lg font-semibold text-[#1a1a1a]">
                  Projected monthly results
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <ResultCard
                  label="Listings closed"
                  value={listings}
                  suffix=""
                  icon={Home}
                  tint="text-cyan"
                />
                <ResultCard
                  label="Revenue generated"
                  value={revenue}
                  prefix="$"
                  icon={DollarSign}
                  tint="text-emerald-400"
                />
                <ResultCard
                  label="Platform cost"
                  value={cost}
                  prefix="$"
                  icon={Calculator}
                  tint="text-[#1a1a1a]/60"
                />
                <ResultCard
                  label="Net profit"
                  value={profit}
                  prefix="$"
                  icon={TrendingUp}
                  tint="text-gold"
                />
              </div>

              <div className="mt-5 rounded-2xl border border-electric/25 bg-gradient-to-br from-electric/10 to-[#38BDF8]/10 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#1a1a1a]/65">Return on investment</span>
                  <span className="rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                    {roiMultiple.toFixed(0)}x ROI
                  </span>
                </div>
                <div className="mt-2 font-heading text-3xl font-bold text-[#1a1a1a] tnum sm:text-4xl">
                  <CountUp value={roiMultiple} prefix="" suffix="x" duration={900} />
                </div>
                <p className="mt-2 text-xs text-[#1a1a1a]/50">
                  For every $1 spent on Opus, you could generate{" "}
                  <span className="font-semibold text-emerald-400">
                    ${roiMultiple.toFixed(0)}
                  </span>{" "}
                  in commissions.
                </p>
              </div>

              <a
                href="#pricing"
                className="group mt-5 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#38BDF8] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(37,99,235,0.6)] transition-all hover:shadow-[0_0_32px_-4px_rgba(56,189,248,0.8)]"
              >
                Start your free trial
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </SectionShell>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
  icon: React.ElementType;
  color: "electric" | "violet" | "cyan";
}) {
  const pct = ((value - min) / (max - min)) * 100;
  const colorMap = {
    electric: "#2563EB",
    violet: "#38BDF8",
    cyan: "#14B8A6",
  };
  return (
    <div className="mb-6">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm text-[#1a1a1a]/70">
          <Icon className={`h-3.5 w-3.5 text-${color}`} />
          {label}
        </span>
        <span className="font-heading text-base font-semibold text-[#1a1a1a] tnum">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full outline-none"
        style={{
          background: `linear-gradient(to right, ${colorMap[color]} 0%, ${colorMap[color]} ${pct}%, rgba(255,255,255,0.1) ${pct}%, rgba(255,255,255,0.1) 100%)`,
        }}
      />
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 9999px;
          background: #ffffff;
          border: 3px solid ${colorMap[color]};
          box-shadow: 0 0 12px -2px ${colorMap[color]};
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          height: 18px;
          width: 18px;
          border-radius: 9999px;
          background: #ffffff;
          border: 3px solid ${colorMap[color]};
          box-shadow: 0 0 12px -2px ${colorMap[color]};
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

function ResultCard({
  label,
  value,
  prefix = "",
  suffix = "",
  icon: Icon,
  tint,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: React.ElementType;
  tint: string;
}) {
  return (
    <motion.div
      key={`${label}-${value}`}
      initial={{ opacity: 0.6, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-black/8 bg-white/[0.03] p-4"
    >
      <div className="mb-2 flex items-center gap-1.5">
        <Icon className={`h-3.5 w-3.5 ${tint}`} />
        <span className="text-[11px] uppercase tracking-wide text-[#1a1a1a]/45">
          {label}
        </span>
      </div>
      <div className="font-heading text-xl font-bold text-[#1a1a1a] tnum sm:text-2xl">
        <CountUp value={value} prefix={prefix} suffix={suffix} duration={700} />
      </div>
    </motion.div>
  );
}
