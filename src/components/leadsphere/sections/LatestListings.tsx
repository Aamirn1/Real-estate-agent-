"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * Latest Listings section — displayed directly below the hero on the
 * homepage. Heading + View Listings button (image removed per request).
 */
export function LatestListings() {
  return (
    <section className="relative w-full px-5 py-12 sm:px-8 md:py-16">
      <div className="mx-auto w-full max-w-5xl">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h2 className="font-heading text-2xl font-bold text-black sm:text-3xl md:text-4xl">
            Latest Listings By Our{" "}
            <span className="bg-gradient-to-r from-electric to-cyan bg-clip-text text-transparent">
              Realtors
            </span>
          </h2>
          <p className="mt-2 text-sm text-black/60 sm:text-base">
            Explore our featured properties and recent client success stories
          </p>
        </div>

        {/* View Listings button */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/testimonials"
              className="btn-shimmer group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(120deg,#2563EB,#38BDF8,#14B8A6,#2563EB)] animate-gradient-x bg-[length:200%_200%] px-7 py-3 text-sm font-bold text-white shadow-[0_8px_30px_-4px_rgba(0,0,0,0.5)] transition-all hover:scale-105 hover:shadow-[0_12px_40px_-4px_rgba(37,99,235,0.7)] sm:px-8 sm:py-3.5 sm:text-base"
            >
              <span className="relative z-10">View Listings</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
