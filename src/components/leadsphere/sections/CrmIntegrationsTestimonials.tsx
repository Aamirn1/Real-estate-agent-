"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  closestCorners,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Star,
  BadgeCheck,
  Play,
  GripVertical,
  Chrome,
  AppWindow as WindowIcon,
  Zap,
  Slack,
  Video,
  Calendar,
  Hexagon,
  Cloud,
  Building2,
  Phone,
  CreditCard,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { GlassCard, SectionHeading, SectionShell } from "@/components/leadsphere/primitives";
import { Reveal } from "@/components/leadsphere/Reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

/* ============================================================================
   TYPES & DATA
   ========================================================================== */

type Lead = {
  id: string;
  name: string;
  initials: string;
  value: string;
  score: number;
  tag: string;
  avatar: string; // tailwind gradient classes
};

type Column = {
  id: string;
  name: string;
  color: string; // hex
  leads: Lead[];
};

const INITIAL_COLUMNS: Column[] = [
  {
    id: "new",
    name: "New Lead",
    color: "#06b6d4",
    leads: [
      {
        id: "l-1",
        name: "Sarah Mitchell",
        initials: "SM",
        value: "$850K",
        score: 92,
        tag: "Hot",
        avatar: "from-cyan to-electric",
      },
      {
        id: "l-2",
        name: "James Wilson",
        initials: "JW",
        value: "$1.2M",
        score: 84,
        tag: "Motivated",
        avatar: "from-electric to-violet",
      },
    ],
  },
  {
    id: "contacted",
    name: "Contacted",
    color: "#3b82f6",
    leads: [
      {
        id: "l-3",
        name: "Emma Thompson",
        initials: "ET",
        value: "$675K",
        score: 78,
        tag: "Callback",
        avatar: "from-violet to-fuchsia-500",
      },
      {
        id: "l-4",
        name: "Michael Rodriguez",
        initials: "MR",
        value: "$950K",
        score: 88,
        tag: "VIP",
        avatar: "from-gold to-amber-500",
      },
    ],
  },
  {
    id: "appointment",
    name: "Appointment",
    color: "#8b5cf6",
    leads: [
      {
        id: "l-5",
        name: "David Chen",
        initials: "DC",
        value: "$2.1M",
        score: 95,
        tag: "Hot",
        avatar: "from-violet to-electric",
      },
      {
        id: "l-6",
        name: "Rachel Greene",
        initials: "RG",
        value: "$780K",
        score: 81,
        tag: "Motivated",
        avatar: "from-electric to-cyan",
      },
    ],
  },
  {
    id: "negotiation",
    name: "Negotiation",
    color: "#d4af37",
    leads: [
      {
        id: "l-7",
        name: "Tom Anderson",
        initials: "TA",
        value: "$1.5M",
        score: 90,
        tag: "Cash buyer",
        avatar: "from-gold to-amber-500",
      },
      {
        id: "l-8",
        name: "Lisa Wang",
        initials: "LW",
        value: "$920K",
        score: 83,
        tag: "Hot",
        avatar: "from-emerald-400 to-cyan",
      },
    ],
  },
  {
    id: "closed",
    name: "Closed",
    color: "#34d399",
    leads: [
      {
        id: "l-9",
        name: "Robert Taylor",
        initials: "RT",
        value: "$1.1M",
        score: 96,
        tag: "Won",
        avatar: "from-emerald-400 to-electric",
      },
      {
        id: "l-10",
        name: "Maria Garcia",
        initials: "MG",
        value: "$650K",
        score: 89,
        tag: "Won",
        avatar: "from-cyan to-emerald-400",
      },
    ],
  },
];

const TAG_STYLES: Record<string, string> = {
  Hot: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  Motivated: "bg-electric/15 text-electric border-electric/30",
  Callback: "bg-violet/15 text-violet border-violet/30",
  VIP: "bg-gold/15 text-gold border-gold/30",
  "Cash buyer": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Won: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
  New: "bg-cyan/15 text-cyan border-cyan/30",
};

function scoreStyle(score: number) {
  if (score >= 90) return "bg-gold/15 text-gold border-gold/30";
  if (score >= 80) return "bg-electric/15 text-electric border-electric/30";
  return "bg-cyan/15 text-cyan border-cyan/30";
}

/* ============================================================================
   1. CRM KANBAN
   ========================================================================== */

function SortableLeadCard({ lead }: { lead: Lead }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="touch-none"
    >
      <GlassCard
        sheen
        className={cnCard(isDragging)}
      >
        <div className="flex items-start gap-3 p-3.5">
          <div
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${lead.avatar} text-xs font-semibold text-white shadow-lg`}
          >
            {lead.initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate font-heading text-sm font-medium text-white">
                {lead.name}
              </p>
              <GripVertical className="h-3.5 w-3.5 shrink-0 text-white/25" />
            </div>
            <p className="tnum mt-0.5 text-sm font-semibold text-white/70">
              {lead.value}
            </p>
            <div className="mt-2.5 flex items-center gap-1.5">
              <span
                className={`tnum rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${scoreStyle(
                  lead.score
                )}`}
              >
                {lead.score}
              </span>
              <span
                className={`rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${
                  TAG_STYLES[lead.tag] ?? TAG_STYLES.New
                }`}
              >
                {lead.tag}
              </span>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

function cnCard(isDragging: boolean) {
  return [
    "group cursor-grab active:cursor-grabbing border border-white/10 transition-all duration-200",
    isDragging
      ? "z-50 -rotate-1 scale-[1.03] border-white/25 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.8)] ring-1 ring-white/20"
      : "hover:border-white/20 hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]",
  ].join(" ");
}

function LeadCardStatic({ lead }: { lead: Lead }) {
  return (
    <GlassCard className={cnCard(false)}>
      <div className="flex items-start gap-3 p-3.5">
        <div
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${lead.avatar} text-xs font-semibold text-white shadow-lg`}
        >
          {lead.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-sm font-medium text-white">
            {lead.name}
          </p>
          <p className="tnum mt-0.5 text-sm font-semibold text-white/70">
            {lead.value}
          </p>
          <div className="mt-2.5 flex items-center gap-1.5">
            <span
              className={`tnum rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${scoreStyle(
                lead.score
              )}`}
            >
              {lead.score}
            </span>
            <span
              className={`rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${
                TAG_STYLES[lead.tag] ?? TAG_STYLES.New
              }`}
            >
              {lead.tag}
            </span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function KanbanColumn({ column }: { column: Column }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div className="flex w-64 shrink-0 flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3">
      <div className="mb-3 flex items-center gap-2 px-1">
        <span
          className="h-2 w-2 rounded-full"
          style={{
            backgroundColor: column.color,
            boxShadow: `0 0 10px ${column.color}`,
          }}
        />
        <span className="font-heading text-sm font-medium text-white/80">
          {column.name}
        </span>
        <span className="tnum ml-auto rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/60">
          {column.leads.length}
        </span>
      </div>

      <SortableContext
        items={column.leads.map((l) => l.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className={`flex min-h-[120px] flex-1 flex-col gap-2.5 rounded-xl p-1.5 transition-colors ${
            isOver ? "bg-white/[0.04]" : "bg-transparent"
          }`}
        >
          {column.leads.length === 0 ? (
            <div className="grid flex-1 place-items-center rounded-xl border border-dashed border-white/10 py-8 text-xs text-white/30">
              Drop leads here
            </div>
          ) : (
            column.leads.map((lead) => (
              <SortableLeadCard key={lead.id} lead={lead} />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
}

function CrmKanban() {
  const [columns, setColumns] = useState<Column[]>(INITIAL_COLUMNS);
  const [activeLead, setActiveLead] = useState<Lead | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  function handleDragStart(event: DragStartEvent) {
    const id = String(event.active.id);
    const lead = columns
      .flatMap((c) => c.leads)
      .find((l) => l.id === id);
    setActiveLead(lead ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveLead(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) return;

    setColumns((prev) => {
      const srcCol = prev.find((c) => c.leads.some((l) => l.id === activeId));
      if (!srcCol) return prev;
      const activeLeadCard = srcCol.leads.find((l) => l.id === activeId);
      if (!activeLeadCard) return prev;

      // Dropped onto a column droppable (empty area / end of column)
      const destColById = prev.find((c) => c.id === overId);
      if (destColById) {
        if (destColById.id === srcCol.id) return prev;
        return prev.map((c) => {
          if (c.id === srcCol.id)
            return { ...c, leads: c.leads.filter((l) => l.id !== activeId) };
          if (c.id === destColById.id)
            return { ...c, leads: [...c.leads, activeLeadCard] };
          return c;
        });
      }

      // Dropped onto another card
      const overCol = prev.find((c) => c.leads.some((l) => l.id === overId));
      if (!overCol) return prev;

      if (overCol.id === srcCol.id) {
        const oldIndex = srcCol.leads.findIndex((l) => l.id === activeId);
        const newIndex = srcCol.leads.findIndex((l) => l.id === overId);
        if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex)
          return prev;
        return prev.map((c) =>
          c.id === srcCol.id
            ? { ...c, leads: arrayMove(c.leads, oldIndex, newIndex) }
            : c
        );
      }

      // Cross-column move to a specific index
      const overIndex = overCol.leads.findIndex((l) => l.id === overId);
      return prev.map((c) => {
        if (c.id === srcCol.id)
          return { ...c, leads: c.leads.filter((l) => l.id !== activeId) };
        if (c.id === overCol.id) {
          const next = [...c.leads];
          next.splice(overIndex, 0, activeLeadCard);
          return { ...c, leads: next };
        }
        return c;
      });
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="custom-scroll -mx-1 overflow-x-auto px-1 pb-3">
        <div className="flex items-start gap-3">
          {columns.map((col) => (
            <KanbanColumn key={col.id} column={col} />
          ))}
        </div>
      </div>

      <DragOverlay dropAnimation={{ duration: 220, easing: "cubic-bezier(0.22,1,0.36,1)" }}>
        {activeLead ? (
          <div className="rotate-2 scale-[1.03] opacity-95">
            <LeadCardStatic lead={activeLead} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

/* ============================================================================
   2. INTEGRATIONS
   ========================================================================== */

type Integration = {
  name: string;
  icon: LucideIcon;
  color: string;
};

const INTEGRATIONS: Integration[] = [
  { name: "Google", icon: Chrome, color: "#ea4335" },
  { name: "Microsoft", icon: WindowIcon, color: "#2b8fff" },
  { name: "Zapier", icon: Zap, color: "#ff6a00" },
  { name: "Slack", icon: Slack, color: "#8b5cf6" },
  { name: "Zoom", icon: Video, color: "#2d8cff" },
  { name: "Calendly", icon: Calendar, color: "#06b6d4" },
  { name: "HubSpot", icon: Hexagon, color: "#ff7a59" },
  { name: "Salesforce", icon: Cloud, color: "#00a1e0" },
  { name: "MLS", icon: Building2, color: "#3b82f6" },
  { name: "Twilio", icon: Phone, color: "#f22f46" },
  { name: "Stripe", icon: CreditCard, color: "#8b5cf6" },
  { name: "Mailchimp", icon: Mail, color: "#d4af37" },
];

function IntegrationCard({ item, index }: { item: Integration; index: number }) {
  const Icon = item.icon;
  return (
    <Reveal delay={index * 0.04}>
      <div
        className="group relative flex h-full flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5"
        style={{ boxShadow: "0 1px 0 0 rgba(255,255,255,0.04) inset" }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            boxShadow: `0 0 34px -10px ${item.color}, inset 0 0 0 1px ${item.color}55`,
          }}
        />
        <div
          className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 transition-transform duration-300 group-hover:scale-110"
          style={{
            backgroundColor: `${item.color}1f`,
            color: item.color,
          }}
        >
          <Icon className="h-6 w-6" />
        </div>
        <span className="font-heading text-sm font-medium text-white/80">
          {item.name}
        </span>
      </div>
    </Reveal>
  );
}

function IntegrationsGrid() {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6">
      {INTEGRATIONS.map((item, i) => (
        <IntegrationCard key={item.name} item={item} index={i} />
      ))}
    </div>
  );
}

/* ============================================================================
   3. TESTIMONIALS
   ========================================================================== */

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  avatar: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Opus Solutions transformed my pipeline in 60 days. Their team pre-qualifies every introduction before I even pick up the phone — I closed 14 deals last quarter without cold-calling once.",
    name: "Charisse Mathews",
    role: "Realtor, FL",
    initials: "CM",
    avatar: "from-electric to-violet",
  },
  {
    quote:
      "We cut our cost-per-introduction by 47% in the first month. The verified contacts are incredibly accurate — the ones marked hot close at 4x the rate of our old system. My agents actually fight over the warm ones now.",
    name: "Thuan Nguyen",
    role: "Realtor, TX",
    initials: "TN",
    avatar: "from-cyan to-electric",
  },
  {
    quote:
      "The kanban pipeline alone saved my team 12 hours a week. Drag, drop, done. Add the smart follow-up sequences and we went from 2% to 6.8% conversion in a single quarter.",
    name: "Jennifer Bianchi",
    role: "Realtor, TX",
    initials: "JB",
    avatar: "from-violet to-fuchsia-500",
  },
  {
    quote:
      "I acquire 30+ properties a year. Opus surfaces off-market opportunities before they hit the MLS. I've closed three deals this month that nobody else even knew existed.",
    name: "Kira Asinas",
    role: "Investor, AL/GA/FL",
    initials: "KA",
    avatar: "from-gold to-amber-500",
  },
  {
    quote:
      "Luxury clients expect instant, intelligent response. Opus's smart concierge handles inquiries 24/7 and books showings while I sleep. My listing-to-close time dropped from 90 to 41 days.",
    name: "Victoria Hyatt",
    role: "Realtor, CA",
    initials: "VH",
    avatar: "from-emerald-400 to-cyan",
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <GlassCard sheen strong className="relative overflow-hidden p-8 sm:p-10">
      {/* soft color wash */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.55) 0%, rgba(59,130,246,0.25) 60%, transparent 100%)",
        }}
      />

      {/* video play button overlay */}
      <button
        type="button"
        aria-label="Play video testimonial"
        className="group/play absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 backdrop-blur-md transition-all hover:border-electric/50 hover:bg-electric/10"
      >
        <motion.span
          className="absolute inset-0 rounded-full border border-electric/40"
          animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <Play className="h-4 w-4 fill-electric text-electric transition-transform group-hover/play:scale-110" />
      </button>

      <div className="relative mx-auto max-w-2xl text-center">
        <div className="mb-5 flex items-center justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-5 w-5 fill-gold text-gold"
              style={{ filter: "drop-shadow(0 0 6px rgba(212,175,55,0.45))" }}
            />
          ))}
        </div>

        <blockquote className="font-heading text-xl font-medium leading-relaxed tracking-tight text-white/90 sm:text-2xl">
          &ldquo;{t.quote}&rdquo;
        </blockquote>

        <div className="mx-auto my-6 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="flex items-center justify-center gap-3">
          <div
            className={`grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br ${t.avatar} text-sm font-semibold text-white shadow-lg ring-2 ring-white/10`}
          >
            {t.initials}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-heading text-sm font-semibold text-white">
                {t.name}
              </span>
              <BadgeCheck className="h-4 w-4 text-electric" />
            </div>
            <p className="text-xs text-white/55">{t.role}</p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function TestimonialsCarousel() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    };
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    // Defer initial sync to avoid synchronous setState in the effect body.
    queueMicrotask(onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || paused) return;
    const id = setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => clearInterval(id);
  }, [api, paused]);

  return (
    <div
      className="relative mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Carousel
        opts={{ loop: true, align: "center" }}
        setApi={setApi}
        className="overflow-visible"
      >
        <CarouselContent className="-ml-4">
          {TESTIMONIALS.map((t, i) => (
            <CarouselItem key={t.name} className="basis-full pl-4">
              <TestimonialCard t={t} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-0 top-1/2 hidden h-10 w-10 -translate-y-1/2 border-white/15 bg-black/40 text-white/70 backdrop-blur-md hover:bg-white/10 hover:text-white sm:flex" />
        <CarouselNext className="right-0 top-1/2 hidden h-10 w-10 -translate-y-1/2 border-white/15 bg-black/40 text-white/70 backdrop-blur-md hover:bg-white/10 hover:text-white sm:flex" />
      </Carousel>

      {/* dots */}
      <div className="mt-7 flex items-center justify-center gap-2">
        {Array.from({ length: count || TESTIMONIALS.length }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === current ? 26 : 8,
              backgroundColor:
                i === current ? "#3b82f6" : "rgba(255,255,255,0.2)",
              boxShadow:
                i === current ? "0 0 12px rgba(59,130,246,0.6)" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
   MAIN
   ========================================================================== */

export default function CrmIntegrationsTestimonials() {
  return (
    <>
      {/* TESTIMONIALS */}
      <SectionShell id="testimonials">
        <Reveal className="mb-10">
          <SectionHeading
            eyebrow="Testimonials"
            title="Clients tell the story"
            description="Real results from real estate professionals who trust Opus Solutions."
          />
        </Reveal>
        <TestimonialsCarousel />
      </SectionShell>
    </>
  );
}
