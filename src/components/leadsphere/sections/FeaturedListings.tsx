"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

/**
 * Featured Listings section — displayed on the Testimonials page just
 * below the hero. Shows 3 property images, each with a "View Listing"
 * button that redirects to the corresponding Zillow property URL.
 *
 * Properties:
 * 1. 1060 NW 82nd Ave, Coral Springs, FL 33071
 * 2. 3115 NW 86th Ave, 2A, Sunrise, FL 33351
 * 3. 5031 SW 94th Way, Cooper City, FL 33328
 */

type Listing = {
  image: string;
  address: string;
  zillowUrl: string;
};

const LISTINGS: Listing[] = [
  {
    image: "/listings/property-1-coral-springs.png",
    address: "1060 NW 82nd Ave, Coral Springs, FL 33071",
    zillowUrl:
      "https://www.zillow.com/homedetails/1060-NW-82nd-Ave-Coral-Springs-FL-33071/42858987_zpid/",
  },
  {
    image: "/listings/property-2-sunrise.png",
    address: "3115 NW 86th Ave, 2A, Sunrise, FL 33351",
    zillowUrl:
      "https://www.zillow.com/homedetails/3115-NW-86th-Ave-2A-Sunrise-FL-33351/66119074_zpid/",
  },
  {
    image: "/listings/property-3-cooper-city.png",
    address: "5031 SW 94th Way, Cooper City, FL 33328",
    zillowUrl:
      "https://www.zillow.com/homedetails/5031-SW-94th-Way-Cooper-City-FL-33328/43187482_zpid/",
  },
];

export function FeaturedListings() {
  return (
    <section className="relative w-full px-5 py-12 sm:px-8 md:py-16">
      <div className="mx-auto w-full max-w-6xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-black sm:text-3xl md:text-4xl">
            Featured Listings By{" "}
            <span className="bg-gradient-to-r from-electric to-cyan bg-clip-text text-transparent">
              Maria Ferrer
            </span>
          </h2>
          <p className="mt-2 text-sm text-black/60 sm:text-base">
            Browse our active property listings — click any listing to view full
            details on Zillow
          </p>
        </div>

        {/* 3 property cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LISTINGS.map((listing, i) => (
            <motion.div
              key={listing.address}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-black/15 bg-white shadow-lg transition-all hover:shadow-2xl"
            >
              {/* Property image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={listing.image}
                  alt={`Property at ${listing.address}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay for button legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Address bar */}
              <div className="flex items-start gap-2 p-4">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
                <p className="text-sm font-medium leading-relaxed text-black">
                  {listing.address}
                </p>
              </div>

              {/* View Listing button */}
              <div className="px-4 pb-4">
                <a
                  href={listing.zillowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(120deg,#2563EB,#38BDF8,#14B8A6,#2563EB)] animate-gradient-x bg-[length:200%_200%] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_-2px_rgba(37,99,235,0.5)] transition-all hover:shadow-[0_8px_20px_-2px_rgba(56,189,248,0.7)]"
                >
                  <span>View Listing</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
