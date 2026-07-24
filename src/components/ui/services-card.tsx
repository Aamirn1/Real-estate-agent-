"use client";

import * as React from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ============================================================
   AnimatedServiceCards — Embla carousel + framer-motion reveal
   ------------------------------------------------------------
   Reference: services-card.tsx using useEmblaCarousel +
   EmblaCarouselType + framer-motion useInView.
   Mobile-friendly: 1 slide on mobile, 2 on sm, 3 on lg.
   Auto-advances, with prev/next buttons.
   ============================================================ */

type EmblaApi = UseEmblaCarouselType[1];
type EmblaOptions = Parameters<typeof useEmblaCarousel>[0];

export type AnimatedService = {
  id: string | number;
  title: string;
  description: string;
  color: string; // electric | violet | cyan | gold
  icon: React.ComponentType<{ className?: string }>;
};

type Props = {
  items: AnimatedService[];
  /** Embla options override */
  options?: EmblaOptions;
  /** auto-advance interval (ms). 0 = disabled */
  autoAdvanceMs?: number;
  className?: string;
};

/* Per-color theme tokens */
const THEME: Record<string, {
  text: string;
  iconWrap: string;
  iconGlow: string;
  bar: string;
  orb: string;
  hoverBorder: string;
}> = {
  electric: {
    text: "text-electric",
    iconWrap: "bg-electric/15 ring-1 ring-inset ring-electric/30",
    iconGlow: "shadow-[0_0_26px_-6px_rgba(37,99,235,0.65)]",
    bar: "bg-electric",
    orb: "bg-electric/20",
    hoverBorder: "hover:border-electric/40",
  },
  violet: {
    text: "text-violet",
    iconWrap: "bg-violet/15 ring-1 ring-inset ring-violet/30",
    iconGlow: "shadow-[0_0_26px_-6px_rgba(56,189,248,0.65)]",
    bar: "bg-violet",
    orb: "bg-violet/20",
    hoverBorder: "hover:border-violet/40",
  },
  cyan: {
    text: "text-cyan",
    iconWrap: "bg-cyan/15 ring-1 ring-inset ring-cyan/30",
    iconGlow: "shadow-[0_0_26px_-6px_rgba(6,182,212,0.65)]",
    bar: "bg-cyan",
    orb: "bg-cyan/20",
    hoverBorder: "hover:border-cyan/40",
  },
  gold: {
    text: "text-gold",
    iconWrap: "bg-gold/15 ring-1 ring-inset ring-gold/30",
    iconGlow: "shadow-[0_0_26px_-6px_rgba(212,175,55,0.65)]",
    bar: "bg-gold",
    orb: "bg-gold/20",
    hoverBorder: "hover:border-gold/40",
  },
};

/* Stagger container + child variants for scroll-reveal */
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const slideVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 260, damping: 26 },
  },
};

export function AnimatedServiceCards({
  items,
  options,
  autoAdvanceMs = 3000,
  className,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    ...options,
  });
  const [selected, setSelected] = React.useState(0);
  const [snapCount, setSnapCount] = React.useState(0);

  // Track current slide
  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    setSnapCount(emblaApi.scrollSnapList().length);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-advance
  React.useEffect(() => {
    if (!emblaApi || autoAdvanceMs <= 0) return;
    const id = window.setInterval(() => emblaApi.scrollNext(), autoAdvanceMs);
    return () => window.clearInterval(id);
  }, [emblaApi, autoAdvanceMs]);

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Scroll-reveal trigger
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={sectionRef}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={cn("relative", className)}
    >
      {/* Embla viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex -ml-4">
          {items.map((item, i) => {
            const t = THEME[item.color] ?? THEME.electric;
            const Icon = item.icon;
            const idx = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={item.id}
                variants={slideVariants}
                className={cn(
                  // Responsive basis: 1 on mobile, 2 on sm, 3 on lg
                  "min-w-0 shrink-0 grow-0 basis-full pl-4",
                  "sm:basis-1/2",
                  "lg:basis-1/3"
                )}
              >
                <div
                  className={cn(
                    "group relative h-full overflow-hidden rounded-2xl border border-black/15 bg-white",
                    // Matches Why Choose Us card sizing: p-6, compact
                    "p-6",
                    "transition-colors duration-300",
                    t.hoverBorder
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
                  {/* inner-corner gradient shadow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl"
                    style={{
                      boxShadow:
                        "inset 0 0 30px 6px rgba(37,99,235,0.10), inset 0 0 0 1px rgba(15,23,42,0.06)",
                    }}
                  />
                  {/* corner accent glow */}
                  <div
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100",
                      t.orb
                    )}
                  />

                  {/* icon + index — same sizing as Why Choose Us (h-12 w-12, h-6 w-6 icon) */}
                  <div className="relative flex items-start justify-between">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                        t.iconWrap,
                        t.iconGlow
                      )}
                    >
                      <Icon className={cn("h-6 w-6", t.text)} strokeWidth={2} />
                    </div>
                    <span className="font-heading text-xs font-medium tabular-nums tracking-widest text-black/25">
                      {idx}
                    </span>
                  </div>

                  {/* title — text-base like Why Choose Us */}
                  <h3 className="relative mt-5 font-heading text-base font-semibold text-black">
                    {item.title}
                  </h3>

                  {/* description — text-sm leading-relaxed like Why Choose Us */}
                  <p className="relative mt-2.5 text-sm leading-relaxed text-black">
                    {item.description}
                  </p>

                  {/* accent bar — same as Why Choose Us (h-0.5 w-10, grows to w-20 on hover) */}
                  <div className={cn("relative mt-4 h-0.5 w-10 rounded-full transition-all duration-300 group-hover:w-20", t.bar)} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Prev / Next buttons */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          className="h-9 w-9 rounded-full border-black/15 bg-white text-black hover:bg-black/5"
          aria-label="Previous services"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        {/* dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: snapCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === selected ? 24 : 8,
                backgroundColor:
                  i === selected ? "#2563EB" : "rgba(0,0,0,0.15)",
              }}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          className="h-9 w-9 rounded-full border-black/15 bg-white text-black hover:bg-black/5"
          aria-label="Next services"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
