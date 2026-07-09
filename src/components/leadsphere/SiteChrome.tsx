"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/leadsphere/Navbar";
import { CursorGlow } from "@/components/leadsphere/CursorGlow";
import { ScrollToTop } from "@/components/leadsphere/ScrollToTop";
import { AiAssistantWidget } from "@/components/leadsphere/AiAssistantWidget";
import { SiteFooter } from "@/components/leadsphere/SiteFooter";
import { AnimatedBackground } from "@/components/leadsphere/AnimatedBackground";

interface SiteChromeProps {
  children: React.ReactNode;
  /** show the ambient animated background behind the page hero area */
  withBackground?: boolean;
}

/** Shared page chrome for sub-pages: navbar, cursor glow, footer, widgets. */
export function SiteChrome({ children, withBackground = true }: SiteChromeProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink">
      <CursorGlow />
      <Navbar />
      {withBackground && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] overflow-hidden">
          <AnimatedBackground variant="section" />
        </div>
      )}
      <div className="relative z-10 pt-24">{children}</div>
      <SiteFooter />
      <ScrollToTop />
      <AiAssistantWidget />
    </main>
  );
}

/** A reusable page header (hero) for sub-pages. */
export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <section className="relative w-full px-5 pb-8 pt-12 sm:px-8 md:pt-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium tracking-wide text-white/70 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_8px_#3b82f6]" />
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
