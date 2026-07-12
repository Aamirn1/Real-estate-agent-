"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/leadsphere/Reveal";

/** Reusable gradient CTA banner for sub-pages. */
export function CTABanner({
  title = "Ready to grow your business?",
  subtitle = "Join thousands of real estate professionals who trust Opus Global Solution for verified outreach, dedicated VAs, and documented workflows.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative w-full px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl">
            {/* animated gradient bg */}
            <div className="absolute inset-0 animate-gradient-x bg-[linear-gradient(120deg,#2563EB,#38BDF8,#14B8A6,#2563EB)] bg-[length:200%_200%]" />
            {/* grid overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage:
                  "radial-gradient(ellipse 70% 60% at 50% 50%,#000 30%,transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 70% 60% at 50% 50%,#000 30%,transparent 75%)",
              }}
            />
            {/* dark scrim */}
            <div className="absolute inset-0 bg-black/30" />
            {/* top glow */}
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[600px] -translate-x-1/2 rounded-full bg-white/20 blur-[80px]" />

            <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-16 text-center sm:px-10 md:py-24">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur"
              >
                Ready to scale?
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-white text-glow sm:text-5xl md:text-6xl"
              >
                {title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="max-w-xl text-base text-white/90 sm:text-lg"
              >
                {subtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-2 flex flex-col gap-3 sm:flex-row"
              >
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
                >
                  <PlayCircle className="h-4 w-4" />
                  Book Demo
                </Link>
                <Link
                  href="/pricing"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#2563EB] shadow-[0_0_24px_-6px_rgba(255,255,255,0.5)] transition-all hover:shadow-[0_0_32px_-4px_rgba(255,255,255,0.7)]"
                >
                  Start Free Trial
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
