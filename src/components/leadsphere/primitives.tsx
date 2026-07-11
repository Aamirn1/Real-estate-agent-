"use client";

import { motion } from "framer-motion";
import { useCountUp } from "@/lib/leadsphere/hooks";
import { useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ---------- GlassCard ---------- */
interface GlassCardProps {
  children: ReactNode;
  className?: string;
  strong?: boolean;
  sheen?: boolean;
}
export function GlassCard({
  children,
  className,
  strong = false,
  sheen = false,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl",
        strong ? "glass-strong" : "glass-card",
        sheen && "glass-sheen",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ---------- CountUp ---------- */
interface CountUpProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}
export function CountUp({
  value,
  duration = 1800,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const v = useCountUp(value, duration, inView);
  return (
    <span ref={ref} className={cn("tnum", className)}>
      {prefix}
      {v.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* ---------- SectionHeading ---------- */
interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center mx-auto max-w-2xl" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-medium tracking-wide text-[#1a1a1a]/70 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_8px_#3b82f6]" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="font-heading text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-xl text-base leading-relaxed text-[#1a1a1a]/55 sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

/* ---------- SectionShell ---------- */
export function SectionShell({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative w-full px-5 py-20 sm:px-8 md:py-28", className)}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}
