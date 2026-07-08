"use client";

import { LoadingScreen } from "@/components/leadsphere/LoadingScreen";
import { CursorGlow } from "@/components/leadsphere/CursorGlow";
import { Navbar } from "@/components/leadsphere/Navbar";
import { Hero } from "@/components/leadsphere/Hero";
import TrustStatsFeatures from "@/components/leadsphere/sections/TrustStatsFeatures";
import InteractiveDemo from "@/components/leadsphere/sections/InteractiveDemo";
import { BeforeAfter } from "@/components/leadsphere/sections/BeforeAfter";
import AiProcessMap from "@/components/leadsphere/sections/AiProcessMap";
import CrmIntegrationsTestimonials from "@/components/leadsphere/sections/CrmIntegrationsTestimonials";
import { RoiCalculator } from "@/components/leadsphere/sections/RoiCalculator";
import PricingFaqCtaFooter from "@/components/leadsphere/sections/PricingFaqCtaFooter";
import { AiAssistantWidget } from "@/components/leadsphere/AiAssistantWidget";
import { ScrollToTop } from "@/components/leadsphere/ScrollToTop";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink">
      <LoadingScreen />
      <CursorGlow />
      <Navbar />

      <Hero />
      <TrustStatsFeatures />
      <InteractiveDemo />
      <BeforeAfter />
      <AiProcessMap />
      <CrmIntegrationsTestimonials />
      <RoiCalculator />
      <PricingFaqCtaFooter />

      <ScrollToTop />
      <AiAssistantWidget />
    </main>
  );
}
