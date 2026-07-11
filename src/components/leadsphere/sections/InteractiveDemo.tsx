"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Map,
  BarChart3,
  Mail,
  Phone,
  Calendar,
  FileText,
  Search,
  MapPin,
  Send,
  PhoneCall,
  Thermometer,
  TrendingUp,
  DollarSign,
  Plus,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  Flame,
  Zap,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  GlassCard,
  SectionHeading,
  SectionShell,
  CountUp,
} from "@/components/leadsphere/primitives";

/* =========================================================
   Sample data
   ========================================================= */
const CRM_LEADS = [
  { name: "Sarah Mitchell", status: "Motivated Seller", score: 94, lastContact: "2h ago", value: "$890K", tone: "rose" },
  { name: "David Chen", status: "Pre-approved Buyer", score: 87, lastContact: "5h ago", value: "$1.2M", tone: "emerald" },
  { name: "Maria Rodriguez", status: "New Listing", score: 78, lastContact: "1d ago", value: "$650K", tone: "cyan" },
  { name: "James Wilson", status: "Cash Buyer", score: 91, lastContact: "3h ago", value: "$2.1M", tone: "gold" },
  { name: "Emily Thompson", status: "Divorce Sale", score: 85, lastContact: "8h ago", value: "$475K", tone: "violet" },
  { name: "Robert Garcia", status: "Relocation", score: 72, lastContact: "1d ago", value: "$920K", tone: "electric" },
] as const;

const TONE_BADGE: Record<string, string> = {
  rose: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  cyan: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  gold: "bg-gold/15 text-gold border-gold/30",
  violet: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  electric: "bg-electric/15 text-electric border-electric/30",
};
const TONE_BAR: Record<string, string> = {
  rose: "from-rose-500 to-orange-400",
  emerald: "from-emerald-500 to-teal-400",
  cyan: "from-cyan-500 to-sky-400",
  gold: "from-gold to-amber-400",
  violet: "from-[#38BDF8]-500 to-fuchsia-400",
  electric: "from-electric to-cyan-400",
};

const PIPELINE_COLUMNS = [
  {
    key: "New",
    accent: "bg-cyan",
    glow: "shadow-[0_0_18px_-2px_rgba(6,182,212,0.6)]",
    cards: [
      { name: "Linda Park", value: "$540K", initials: "LP", color: "bg-cyan/20 text-cyan-300" },
      { name: "Marcus Webb", value: "$1.05M", initials: "MW", color: "bg-electric/20 text-electric" },
      { name: "Aisha Khan", value: "$720K", initials: "AK", color: "bg-violet/20 text-violet-300" },
    ],
  },
  {
    key: "Contacted",
    accent: "bg-electric",
    glow: "shadow-[0_0_18px_-2px_rgba(37,99,235,0.6)]",
    cards: [
      { name: "Thomas Reed", value: "$880K", initials: "TR", color: "bg-electric/20 text-electric" },
      { name: "Nora Bailey", value: "$1.4M", initials: "NB", color: "bg-gold/20 text-gold" },
    ],
  },
  {
    key: "Appointment",
    accent: "bg-violet",
    glow: "shadow-[0_0_18px_-2px_rgba(56,189,248,0.6)]",
    cards: [
      { name: "Elena Cruz", value: "$2.2M", initials: "EC", color: "bg-violet/20 text-violet-300" },
      { name: "Henry Adams", value: "$675K", initials: "HA", color: "bg-emerald-500/20 text-emerald-300" },
      { name: "Priya Nair", value: "$990K", initials: "PN", color: "bg-cyan/20 text-cyan-300" },
    ],
  },
  {
    key: "Closed",
    accent: "bg-gold",
    glow: "shadow-[0_0_18px_-2px_rgba(212,175,55,0.6)]",
    cards: [
      { name: "Olivia Stone", value: "$3.1M", initials: "OS", color: "bg-gold/20 text-gold" },
      { name: "Victor Hale", value: "$1.25M", initials: "VH", color: "bg-rose-500/20 text-rose-300" },
    ],
  },
];

const MAP_PINS = [
  { x: "18%", y: "32%", color: "#2563EB", label: "$890K" },
  { x: "32%", y: "58%", color: "#38BDF8", label: "$1.2M" },
  { x: "44%", y: "22%", color: "#14B8A6", label: "$540K" },
  { x: "58%", y: "44%", color: "#d4af37", label: "$2.1M" },
  { x: "66%", y: "68%", color: "#ec4899", label: "$990K" },
  { x: "74%", y: "28%", color: "#2563EB", label: "$1.4M" },
  { x: "82%", y: "54%", color: "#14B8A6", label: "$720K" },
  { x: "26%", y: "76%", color: "#38BDF8", label: "$650K" },
];
const MAP_CLUSTERS = [
  { x: "40%", y: "38%", count: 12, color: "rgba(37,99,235,0.85)" },
  { x: "70%", y: "48%", count: 7, color: "rgba(56,189,248,0.85)" },
];

const LEADS_AREA_DATA = [
  { m: "Jan", v: 980 },
  { m: "Feb", v: 1240 },
  { m: "Mar", v: 1120 },
  { m: "Apr", v: 1680 },
  { m: "May", v: 2010 },
  { m: "Jun", v: 2380 },
  { m: "Jul", v: 2920 },
];
const SOURCE_BAR_DATA = [
  { name: "Referral", v: 318 },
  { name: "Zillow", v: 412 },
  { name: "Social", v: 264 },
  { name: "Direct Mail", v: 176 },
];

const CAMPAIGNS = [
  { name: "Spring Sellers Blast", channel: "Email", progress: 78, sent: 4820, tone: "electric" },
  { name: "Open House Reminders", channel: "SMS", progress: 92, sent: 1240, tone: "violet" },
  { name: "Buyer Nurture Sequence", channel: "Email", progress: 54, sent: 3110, tone: "cyan" },
] as const;

const RECENT_CALLS = [
  { name: "Diane Foster", number: "+1 (415) 555-0148", status: "Connected", time: "2m ago", tone: "emerald" },
  { name: "Patrick Lee", number: "+1 (415) 555-0192", status: "Voicemail", time: "8m ago", tone: "cyan" },
  { name: "Grace Kim", number: "+1 (415) 555-0173", status: "Connected", time: "14m ago", tone: "emerald" },
  { name: "Marcus Bell", number: "+1 (415) 555-0166", status: "No Answer", time: "21m ago", tone: "rose" },
];

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "CRM" },
  { icon: Map, label: "Lead Map" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Mail, label: "Marketing" },
  { icon: Phone, label: "Dialer" },
  { icon: Calendar, label: "Calendar" },
  { icon: FileText, label: "Reports" },
];

/* =========================================================
   Small subcomponents
   ========================================================= */
function KpiTile({
  icon: Icon,
  label,
  value,
  suffix,
  prefix,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  accent: string;
}) {
  return (
    <GlassCard className="flex items-center gap-3 p-4">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${accent}`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-[#1E293B]/45">
          {label}
        </div>
        <div className="font-heading text-xl font-semibold tnum text-[#1E293B]">
          <CountUp value={value} prefix={prefix} suffix={suffix} />
        </div>
      </div>
    </GlassCard>
  );
}

function SidebarIcon({
  icon: Icon,
  label,
  active,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      aria-label={label}
      className={`group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
        active
          ? "bg-electric text-[#1E293B] shadow-[0_0_18px_-2px_rgba(37,99,235,0.7)]"
          : "text-[#1E293B]/45 hover:bg-[#1E293B]/5 hover:text-[#1E293B]"
      }`}
    >
      <Icon className="h-[18px] w-[18px]" />
      <span className="pointer-events-none absolute left-12 z-50 hidden whitespace-nowrap rounded-md border border-[#E2E8F0] bg-graphite/95 px-2 py-1 text-xs text-[#1E293B] shadow-lg group-hover:block">
        {label}
      </span>
    </button>
  );
}

/* =========================================================
   Tab content panels
   ========================================================= */
function CrmPanel() {
  const [query, setQuery] = useState("");
  const filtered = CRM_LEADS.filter((l) =>
    l.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-heading text-lg font-semibold text-[#1E293B]">
            Lead Inbox
          </h3>
          <p className="text-xs text-[#1E293B]/45">
            {filtered.length} leads · sorted by score
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1E293B]/40" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search leads..."
            className="h-9 border-[#E2E8F0] bg-[#1E293B]/5 pl-9 text-sm text-[#1E293B] placeholder:text-[#1E293B]/40 focus-visible:border-electric/50"
          />
        </div>
      </div>

      <div className="overflow-x-auto scroll-thin rounded-xl border border-[#E2E8F0]">
        <Table>
          <TableHeader>
            <TableRow className="border-[#E2E8F0] hover:bg-transparent">
              <TableHead className="text-[#1E293B]/45 text-xs uppercase tracking-wider">Name</TableHead>
              <TableHead className="text-[#1E293B]/45 text-xs uppercase tracking-wider">Status</TableHead>
              <TableHead className="text-[#1E293B]/45 text-xs uppercase tracking-wider">Score</TableHead>
              <TableHead className="text-[#1E293B]/45 text-xs uppercase tracking-wider">Last Contact</TableHead>
              <TableHead className="text-[#1E293B]/45 text-xs uppercase tracking-wider text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((lead) => (
              <TableRow
                key={lead.name}
                className="border-[#E2E8F0] transition-colors hover:bg-white/[0.03] data-[state=selected]:bg-[#1E293B]/5"
              >
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border border-[#E2E8F0]">
                      <AvatarFallback className="bg-[#1E293B]/5 text-[11px] text-[#1E293B]/70">
                        {lead.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-[#1E293B]">
                      {lead.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${TONE_BADGE[lead.tone]}`}
                  >
                    {lead.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-[#1E293B]/8">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${TONE_BAR[lead.tone]}`}
                        style={{ width: `${lead.score}%` }}
                      />
                    </div>
                    <span className="tnum text-xs font-semibold text-[#1E293B]/80">
                      {lead.score}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-[#1E293B]/55">{lead.lastContact}</TableCell>
                <TableCell className="tnum text-right text-sm font-semibold text-[#1E293B]">
                  {lead.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function PipelinePanel() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading text-lg font-semibold text-[#1E293B]">
            Sales Pipeline
          </h3>
          <p className="text-xs text-[#1E293B]/45">10 active deals · $19.4M in pipeline</p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#1E293B]/5 px-3 py-1.5 text-xs font-medium text-[#1E293B]/80 transition-colors hover:bg-[#1E293B]/8">
          <Plus className="h-3.5 w-3.5" /> Add deal
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {PIPELINE_COLUMNS.map((col) => (
          <div
            key={col.key}
            className="flex flex-col overflow-hidden rounded-xl border border-[#E2E8F0] bg-white/[0.02]"
          >
            <div className={`h-1 w-full ${col.accent} ${col.glow}`} />
            <div className="flex items-center justify-between px-3 py-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1E293B]/70">
                {col.key}
              </span>
              <span className="rounded-full bg-[#1E293B]/5 px-2 py-0.5 text-[10px] tnum text-[#1E293B]/55">
                {col.cards.length}
              </span>
            </div>
            <div className="flex flex-col gap-2 px-2 pb-2">
              {col.cards.map((c) => (
                <motion.div
                  key={c.name}
                  whileHover={{ y: -2 }}
                  className="group cursor-pointer rounded-lg border border-[#E2E8F0] bg-graphite/60 p-3 transition-colors hover:border-[#E2E8F0]"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold ${c.color}`}
                    >
                      {c.initials}
                    </div>
                    <span className="truncate text-xs font-medium text-[#1E293B]">
                      {c.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="tnum text-sm font-semibold text-[#1E293B]">
                      {c.value}
                    </span>
                    <MoreHorizontal className="h-3.5 w-3.5 text-[#1E293B]/30 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeadMapPanel() {
  const [heatmap, setHeatmap] = useState(false);
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-heading text-lg font-semibold text-[#1E293B]">
            Lead Heat Map
          </h3>
          <p className="text-xs text-[#1E293B]/45">Bay Area · 8 active properties</p>
        </div>
        <button
          onClick={() => setHeatmap((v) => !v)}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
            heatmap
              ? "border-rose-500/40 bg-rose-500/15 text-rose-300"
              : "border-[#E2E8F0] bg-[#1E293B]/5 text-[#1E293B]/70"
          }`}
        >
          <Thermometer className="h-3.5 w-3.5" /> Heatmap
        </button>
      </div>

      <div className="relative h-full min-h-[280px] overflow-hidden rounded-xl border border-[#E2E8F0] bg-white">
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.08),transparent_70%)]" />

        {/* Heatmap blobs */}
        {heatmap && (
          <>
            <div className="absolute left-[35%] top-[30%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/30 blur-3xl" />
            <div className="absolute left-[68%] top-[55%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/25 blur-3xl" />
            <div className="absolute left-[22%] top-[65%] h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/25 blur-3xl" />
          </>
        )}

        {/* Pins */}
        {MAP_PINS.map((pin, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06, type: "spring", stiffness: 200 }}
            className="group absolute -translate-x-1/2 -translate-y-full"
            style={{ left: pin.x, top: pin.y }}
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-md"
                style={{ background: pin.color, opacity: 0.6 }}
              />
              <MapPin
                className="relative h-6 w-6 drop-shadow-lg"
                style={{ color: pin.color, fill: pin.color }}
              />
              <span className="pointer-events-none absolute left-1/2 top-[-22px] -translate-x-1/2 whitespace-nowrap rounded-md border border-[#E2E8F0] bg-graphite/95 px-1.5 py-0.5 text-[10px] font-semibold text-[#1E293B] opacity-0 transition-opacity group-hover:opacity-100">
                {pin.label}
              </span>
            </div>
          </motion.div>
        ))}

        {/* Cluster circles */}
        {MAP_CLUSTERS.map((c, i) => (
          <div
            key={i}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[11px] font-bold text-[#1E293B] ring-2 ring-white/20"
            style={{
              left: c.x,
              top: c.y,
              width: 36,
              height: 36,
              background: c.color,
              boxShadow: `0 0 24px -4px ${c.color}`,
            }}
          >
            {c.count}
          </div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-3 rounded-lg border border-[#E2E8F0] bg-graphite/80 px-3 py-2 backdrop-blur">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-electric" />
            <span className="text-[10px] text-[#1E293B]/60">Buyer</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-violet" />
            <span className="text-[10px] text-[#1E293B]/60">Seller</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-gold" />
            <span className="text-[10px] text-[#1E293B]/60">High Value</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan" />
            <span className="text-[10px] text-[#1E293B]/60">New Lead</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsPanel() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div>
        <h3 className="font-heading text-lg font-semibold text-[#1E293B]">
          Performance Analytics
        </h3>
        <p className="text-xs text-[#1E293B]/45">Last 7 months · updated 3m ago</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <KpiTile
          icon={Users}
          label="Total Leads"
          value={12840}
          accent="bg-electric/15 text-electric"
        />
        <KpiTile
          icon={TrendingUp}
          label="Conversion"
          value={92}
          suffix="%"
          accent="bg-emerald-500/15 text-emerald-300"
        />
        <KpiTile
          icon={DollarSign}
          label="Revenue"
          value={4.2}
          prefix="$"
          suffix="M"
          accent="bg-gold/15 text-gold"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-5">
        <GlassCard className="p-4 lg:col-span-3">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-[#1E293B]">Leads Generated</h4>
              <p className="text-[11px] text-[#1E293B]/45">Monthly trend</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
              <TrendingUp className="h-3 w-3" /> +28%
            </span>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={LEADS_AREA_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="leadFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity={0.55} />
                    <stop offset="50%" stopColor="#38BDF8" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="leadStroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#38BDF8" />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis
                  dataKey="m"
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ stroke: "rgba(255,255,255,0.15)" }}
                  contentStyle={{
                    background: "rgba(13,13,16,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 10,
                    fontSize: 12,
                    color: "#fff",
                  }}
                  labelStyle={{ color: "rgba(255,255,255,0.6)" }}
                />
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="url(#leadStroke)"
                  strokeWidth={2.5}
                  fill="url(#leadFill)"
                  activeDot={{ r: 4, fill: "#38BDF8", stroke: "#fff", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-4 lg:col-span-2">
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-[#1E293B]">Conversions by Source</h4>
            <p className="text-[11px] text-[#1E293B]/45">This quarter</p>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SOURCE_BAR_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                  tickLine={false}
                  interval={0}
                />
                <YAxis
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  contentStyle={{
                    background: "rgba(13,13,16,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 10,
                    fontSize: 12,
                    color: "#fff",
                  }}
                  labelStyle={{ color: "rgba(255,255,255,0.6)" }}
                />
                <Bar dataKey="v" fill="url(#barFill)" radius={[6, 6, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function MarketingPanel() {
  return (
    <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-2">
      {/* Left: campaigns */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-semibold text-[#1E293B]">
            Active Campaigns
          </h3>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#1E293B]/5 px-3 py-1.5 text-xs font-medium text-[#1E293B]/80 transition-colors hover:bg-[#1E293B]/8">
            <Plus className="h-3.5 w-3.5" /> New
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {CAMPAIGNS.map((c) => (
            <motion.div
              key={c.name}
              whileHover={{ y: -2 }}
              className="rounded-xl border border-[#E2E8F0] bg-white/[0.02] p-4 transition-colors hover:border-[#E2E8F0]"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold text-[#1E293B]">{c.name}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${
                        c.channel === "Email"
                          ? "border-electric/30 bg-electric/10 text-electric"
                          : "border-violet/30 bg-violet/10 text-violet-300"
                      }`}
                    >
                      {c.channel === "Email" ? <Mail className="h-2.5 w-2.5" /> : <Phone className="h-2.5 w-2.5" />}
                      {c.channel}
                    </span>
                    <span className="tnum text-[11px] text-[#1E293B]/45">
                      {c.sent.toLocaleString()} sent
                    </span>
                  </div>
                </div>
                <span className="tnum text-xs font-semibold text-[#1E293B]/80">
                  {c.progress}%
                </span>
              </div>
              <Progress
                value={c.progress}
                className="h-1.5 bg-[#1E293B]/8"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right: email preview */}
      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-lg font-semibold text-[#1E293B]">
          Email Preview
        </h3>
        <GlassCard strong className="flex flex-1 flex-col p-4">
          <div className="mb-3 flex items-center gap-2 border-b border-[#E2E8F0] pb-3">
            <Avatar className="h-8 w-8 border border-[#E2E8F0]">
              <AvatarFallback className="bg-electric/15 text-[11px] font-semibold text-electric">
                OS
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-[#1E293B]">Opus Solutions</div>
              <div className="truncate text-[11px] text-[#1E293B]/45">noreply@opussolutions.com</div>
            </div>
            <span className="ml-auto rounded-md bg-[#1E293B]/5 px-2 py-0.5 text-[10px] text-[#1E293B]/45">
              Draft
            </span>
          </div>

          <div className="mb-2">
            <div className="text-[10px] uppercase tracking-wider text-[#1E293B]/40">
              Subject
            </div>
            <div className="text-sm font-semibold text-[#1E293B]">
              Your home valuation is ready, Sarah 🏡
            </div>
          </div>

          <div className="mt-1 flex-1 overflow-y-auto scroll-thin text-[13px] leading-relaxed text-[#1E293B]/65">
            <p>Hi Sarah,</p>
            <p className="mt-2">
              Based on recent comparable sales in your neighborhood, your
              property at <span className="text-[#1E293B]/85">248 Maple Ridge Dr</span> is
              now estimated at <span className="font-semibold text-[#1E293B]">$890,000</span> —
              up <span className="text-emerald-300">4.2%</span> in the last quarter.
            </p>
            <p className="mt-2">
              Motivated buyers are actively searching in your zone. Want to see
              the full report and schedule a call?
            </p>
            <p className="mt-3 text-[#1E293B]/45">— The Opus Team</p>
          </div>

          <button className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-electric px-4 py-2.5 text-sm font-semibold text-[#1E293B] shadow-[0_0_24px_-6px_rgba(37,99,235,0.8)] transition-all hover:bg-electric/90 hover:shadow-[0_0_30px_-4px_rgba(37,99,235,0.9)]">
            <Send className="h-4 w-4" /> Send Campaign
          </button>
        </GlassCard>
      </div>
    </div>
  );
}

function DialerPanel() {
  return (
    <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-5">
      {/* Center: contact + call */}
      <GlassCard strong className="flex flex-col items-center justify-center gap-5 p-6 lg:col-span-2">
        <div className="text-center">
          <div className="text-[11px] uppercase tracking-wider text-[#1E293B]/40">
            Now dialing
          </div>
        </div>

        <div className="relative">
          {/* Pulse rings */}
          <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-pulse-ring" />
          <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-pulse-ring" style={{ animationDelay: "1.2s" }} />
          <Avatar className="relative h-20 w-20 border-2 border-emerald-400/40 shadow-[0_0_30px_-4px_rgba(16,185,129,0.6)]">
            <AvatarFallback className="bg-emerald-500/15 text-lg font-semibold text-emerald-300">
              JR
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="text-center">
          <div className="font-heading text-xl font-semibold text-[#1E293B]">
            John Reynolds
          </div>
          <div className="tnum mt-1 text-sm text-[#1E293B]/55">+1 (415) 555-0182</div>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
            <Flame className="h-3 w-3" /> Property $1.45M
          </div>
        </div>

        <button
          aria-label="Start call"
          className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-[#1E293B] shadow-[0_0_36px_-4px_rgba(16,185,129,0.8)] transition-transform hover:scale-105 active:scale-95"
        >
          <PhoneCall className="h-7 w-7" />
        </button>

        <div className="grid w-full grid-cols-3 gap-2 border-t border-[#E2E8F0] pt-4">
          <div className="text-center">
            <div className="tnum font-heading text-lg font-semibold text-[#1E293B]">47</div>
            <div className="text-[10px] uppercase tracking-wider text-[#1E293B]/40">Calls</div>
          </div>
          <div className="text-center">
            <div className="tnum font-heading text-lg font-semibold text-emerald-300">31</div>
            <div className="text-[10px] uppercase tracking-wider text-[#1E293B]/40">Connected</div>
          </div>
          <div className="text-center">
            <div className="tnum font-heading text-lg font-semibold text-[#1E293B]">4:22</div>
            <div className="text-[10px] uppercase tracking-wider text-[#1E293B]/40">Avg</div>
          </div>
        </div>
      </GlassCard>

      {/* Right: recent calls */}
      <div className="flex flex-col gap-3 lg:col-span-3">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-semibold text-[#1E293B]">
            Recent Calls
          </h3>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
            <Zap className="h-3 w-3" /> Power dialer on
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {RECENT_CALLS.map((call) => (
            <motion.div
              key={call.name}
              whileHover={{ x: 2 }}
              className="flex items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white/[0.02] p-3 transition-colors hover:border-[#E2E8F0]"
            >
              <Avatar className="h-9 w-9 border border-[#E2E8F0]">
                <AvatarFallback className="bg-[#1E293B]/5 text-[11px] text-[#1E293B]/70">
                  {call.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-[#1E293B]">{call.name}</div>
                <div className="tnum text-[11px] text-[#1E293B]/45">{call.number}</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span
                  className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium ${
                    call.tone === "emerald"
                      ? "bg-emerald-500/15 text-emerald-300"
                      : call.tone === "cyan"
                      ? "bg-cyan-500/15 text-cyan-300"
                      : "bg-rose-500/15 text-rose-300"
                  }`}
                >
                  {call.tone === "emerald" && <CheckCircle2 className="h-2.5 w-2.5" />}
                  {call.status}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-[#1E293B]/40">
                  <Clock className="h-2.5 w-2.5" /> {call.time}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-auto rounded-xl border border-[#E2E8F0] bg-gradient-to-r from-electric/10 to-[#38BDF8]/10 p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-[#1E293B]">Next in queue</div>
              <div className="text-[11px] text-[#1E293B]/55">Diane Foster · motivated seller</div>
            </div>
            <button className="rounded-lg bg-[#1E293B]/8 px-3 py-1.5 text-xs font-medium text-[#1E293B] transition-colors hover:bg-white/20">
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Main component
   ========================================================= */
export default function InteractiveDemo() {
  const [tab, setTab] = useState("crm");

  return (
    <SectionShell id="demo">
      <SectionHeading
        eyebrow="Live Demo"
        title="Explore the platform"
        description="A real, interactive preview of the Opus dashboard."
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12"
      >
        <GlassCard
          strong
          sheen
          className="overflow-hidden rounded-3xl p-0 shadow-[0_30px_120px_-30px_rgba(37,99,235,0.35)]"
        >
          {/* Browser / app top bar */}
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] bg-white/[0.02] px-4 py-3">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="mx-auto flex items-center gap-2 rounded-lg border border-[#E2E8F0] bg-graphite/60 px-3 py-1 text-xs text-[#1E293B]/55">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="tnum">app.opussolutions.com/dashboard</span>
            </div>
            <Avatar className="h-7 w-7 border border-[#E2E8F0]">
              <AvatarFallback className="bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-[10px] font-semibold text-[#1E293B]">
                AK
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Body: sidebar + content */}
          <div className="flex">
            {/* Sidebar (md+) */}
            <aside className="hidden md:flex w-16 shrink-0 flex-col items-center gap-1.5 border-r border-[#E2E8F0] bg-graphite/40 py-4">
              {NAV_ITEMS.map((item) => (
                <SidebarIcon
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  active={item.active}
                />
              ))}
            </aside>

            {/* Main content */}
            <div className="flex min-w-0 flex-1 flex-col">
              <Tabs
                value={tab}
                onValueChange={setTab}
                defaultValue="crm"
                className="flex flex-1 flex-col gap-0"
              >
                {/* Horizontal tab bar */}
                <div className="border-b border-[#E2E8F0] px-3 py-2 overflow-x-auto no-scrollbar">
                  <TabsList className="h-9 w-full justify-start gap-1 rounded-lg border border-[#E2E8F0] bg-graphite/50 p-1 sm:w-auto">
                    <TabsTrigger
                      value="crm"
                      className="data-[state=active]:bg-electric data-[state=active]:text-[#1E293B] data-[state=active]:shadow-[0_0_16px_-4px_rgba(37,99,235,0.8)] text-[#1E293B]/55"
                    >
                      CRM
                    </TabsTrigger>
                    <TabsTrigger
                      value="pipeline"
                      className="data-[state=active]:bg-electric data-[state=active]:text-[#1E293B] data-[state=active]:shadow-[0_0_16px_-4px_rgba(37,99,235,0.8)] text-[#1E293B]/55"
                    >
                      Pipeline
                    </TabsTrigger>
                    <TabsTrigger
                      value="map"
                      className="data-[state=active]:bg-electric data-[state=active]:text-[#1E293B] data-[state=active]:shadow-[0_0_16px_-4px_rgba(37,99,235,0.8)] text-[#1E293B]/55"
                    >
                      Lead Map
                    </TabsTrigger>
                    <TabsTrigger
                      value="analytics"
                      className="data-[state=active]:bg-electric data-[state=active]:text-[#1E293B] data-[state=active]:shadow-[0_0_16px_-4px_rgba(37,99,235,0.8)] text-[#1E293B]/55"
                    >
                      Analytics
                    </TabsTrigger>
                    <TabsTrigger
                      value="marketing"
                      className="data-[state=active]:bg-electric data-[state=active]:text-[#1E293B] data-[state=active]:shadow-[0_0_16px_-4px_rgba(37,99,235,0.8)] text-[#1E293B]/55"
                    >
                      Marketing
                    </TabsTrigger>
                    <TabsTrigger
                      value="dialer"
                      className="data-[state=active]:bg-electric data-[state=active]:text-[#1E293B] data-[state=active]:shadow-[0_0_16px_-4px_rgba(37,99,235,0.8)] text-[#1E293B]/55"
                    >
                      Dialer
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Scrollable content */}
                <div className="scroll-thin h-[460px] overflow-y-auto p-4 md:h-[552px] md:p-6">
                  <TabsContent value="crm" className="mt-0">
                    <motion.div
                      key={tab}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CrmPanel />
                    </motion.div>
                  </TabsContent>
                  <TabsContent value="pipeline" className="mt-0">
                    <motion.div
                      key={tab}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <PipelinePanel />
                    </motion.div>
                  </TabsContent>
                  <TabsContent value="map" className="mt-0">
                    <motion.div
                      key={tab}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <LeadMapPanel />
                    </motion.div>
                  </TabsContent>
                  <TabsContent value="analytics" className="mt-0">
                    <motion.div
                      key={tab}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AnalyticsPanel />
                    </motion.div>
                  </TabsContent>
                  <TabsContent value="marketing" className="mt-0">
                    <motion.div
                      key={tab}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <MarketingPanel />
                    </motion.div>
                  </TabsContent>
                  <TabsContent value="dialer" className="mt-0">
                    <motion.div
                      key={tab}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <DialerPanel />
                    </motion.div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <p className="mt-6 text-center text-xs text-[#1E293B]/40">
        Fully interactive — click through every tab. No screenshots, just real components.
      </p>
    </SectionShell>
  );
}
