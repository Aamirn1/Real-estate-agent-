"use client";

import * as React from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/* ============================================================
   AnimatedServiceCards — mobile-friendly scroll-reveal grid
   ------------------------------------------------------------
   Each card animates in on scroll (staggered spring entrance
   with blur→clear + 3D tilt pop) and tilts in 3D on hover.
   Responsive: 1 column on mobile (compact cards), 2 on sm,
   3 on lg. Card padding/sizing shrinks on small screens so
   the animation reads well at every breakpoint.
   ============================================================ */

export type AnimatedService = {
  id: string | number;
  title: string;
  description: string;
  /** tailwind color key — electric | violet | cyan | gold */
  color: string;
  /** lucide icon component */
  icon: React.ComponentType<{ className?: string }>;
};

type Props = {
  items: AnimatedService[];
  className?: string;
};

/* Stagger container + child variants */
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    filter: "blur(8px)",
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 26,
    },
  },
};

/* Per-color theme tokens (static class strings for Tailwind) */
const THEME: Record<string, {
  text: string;
  iconWrap: string;
  iconGlow: string;
  bar: string;
  orb: string;
  hoverBorder: string;
  hoverGlow: string;
}> = {
  electric: {
    text: "text-electric",
    iconWrap: "bg-electric/15 ring-1 ring-inset ring-electric/30",
    iconGlow: "shadow-[0_0_26px_-6px_rgba(37,99,235,0.65)]",
    bar: "bg-electric",
    orb: "bg-electric/20",
    hoverBorder: "hover:border-electric/40",
    hoverGlow: "hover:shadow-[0_0_50px_-14px_rgba(37,99,235,0.55)]",
  },
  violet: {
    text: "text-violet",
    iconWrap: "bg-violet/15 ring-1 ring-inset ring-violet/30",
    iconGlow: "shadow-[0_0_26px_-6px_rgba(56,189,248,0.65)]",
    bar: "bg-violet",
    orb: "bg-violet/20",
    hoverBorder: "hover:border-violet/40",
    hoverGlow: "hover:shadow-[0_0_50px_-14px_rgba(56,189,248,0.55)]",
  },
  cyan: {
    text: "text-cyan",
    iconWrap: "bg-cyan/15 ring-1 ring-inset ring-cyan/30",
    iconGlow: "shadow-[0_0_26px_-6px_rgba(6,182,212,0.65)]",
    bar: "bg-cyan",
    orb: "bg-cyan/20",
    hoverBorder: "hover:border-cyan/40",
    hoverGlow: "hover:shadow-[0_0_50px_-14px_rgba(6,182,212,0.55)]",
  },
  gold: {
    text: "text-gold",
    iconWrap: "bg-gold/15 ring-1 ring-inset ring-gold/30",
    iconGlow: "shadow-[0_0_26px_-6px_rgba(212,175,55,0.65)]",
    bar: "bg-gold",
    orb: "bg-gold/20",
    hoverBorder: "hover:border-gold/40",
    hoverGlow: "hover:shadow-[0_0_50px_-14px_rgba(212,175,55,0.55)]",
  },
};

export function AnimatedServiceCards({ items, className }: Props) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={cn(
        // Responsive grid: 1 col mobile, 2 sm, 3 lg
        "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-5",
        className
      )}
    >
      {items.map((item, i) => {
        const t = THEME[item.color] ?? THEME.electric;
        const Icon = item.icon;
        const idx = String(i + 1).padStart(2, "0");
        return (
          <motion.div
            key={item.id}
            variants={cardVariants}
            whileHover={{ y: -6, rotateX: 4, rotateY: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            style={{ transformStyle: "preserve-3d", transformPerspective: 900 }}
            className={cn(
              "group relative h-full overflow-hidden rounded-2xl border border-black/15 bg-white",
              // Mobile: smaller padding. Desktop: standard.
              "p-5 sm:p-6",
              "transition-colors duration-300",
              t.hoverBorder,
              t.hoverGlow
            )}
          >
            {/* gradient border ring */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                padding: 2,
                background:
                  "linear-gradient(135deg, rgba(37,99,235,0.7), rgba(56,189,248,0.5), rgba(20,184,166,0.7))",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            {/* inner-corner gradient shadow for depth */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                boxShadow:
                  "inset 0 0 30px 6px rgba(37,99,235,0.10), inset 0 0 0 1px rgba(15,23,42,0.06)",
              }}
            />
            {/* corner accent glow on hover */}
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100",
                t.orb
              )}
            />

            {/* icon + index */}
            <div className="relative flex items-start justify-between">
              <span
                className={cn(
                  // smaller icon on mobile
                  "flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                  "h-10 w-10 sm:h-12 sm:w-12",
                  t.iconWrap,
                  t.iconGlow
                )}
              >
                <Icon className={cn("h-5 w-5 sm:h-6 sm:w-6", t.text)} />
              </span>
              <span className="font-heading text-xs font-medium tabular-nums tracking-widest text-black/25 sm:text-sm">
                {idx}
              </span>
            </div>

            {/* title */}
            <h3 className="relative mt-4 font-heading text-base font-semibold tracking-tight text-black sm:mt-5 sm:text-lg">
              {item.title}
            </h3>

            {/* description */}
            <p className="relative mt-2 text-xs leading-relaxed text-black sm:mt-2.5 sm:text-sm">
              {item.description}
            </p>

            {/* bottom accent line — grows on hover */}
            <div className="relative mt-4 h-px w-full bg-black/5 sm:mt-5">
              <div
                className={cn(
                  "h-px w-0 transition-all duration-500 group-hover:w-full",
                  t.bar
                )}
              />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
