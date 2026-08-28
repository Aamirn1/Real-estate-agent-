"use client";

import Image from "next/image";

/**
 * Latest Listings section — displayed directly below the hero on the
 * homepage. Shows the agent property showcase image (clean, no overlay
 * button — the image is a complete design on its own).
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

        {/* Clean image — no overlay button (image is a complete design) */}
        <div className="relative w-full overflow-hidden rounded-3xl border border-black/10 shadow-2xl">
          <div className="relative aspect-[3/2] w-full">
            <Image
              src="/listings/latest-listings.png"
              alt="Featured real estate property listings showcase with agent Maria Ferrer"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
