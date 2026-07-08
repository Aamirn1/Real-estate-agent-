"use client";

import { Navbar } from "@/components/leadsphere/Navbar";
import { Hero } from "@/components/leadsphere/Hero";
import TrustStatsFeatures from "@/components/leadsphere/sections/TrustStatsFeatures";
import { AboutMission, VirtualAssistantServices, OurWorkflow } from "@/components/leadsphere/sections/AboutVaWorkflow";
import { WhyChooseUs, FeaturedProfessionals } from "@/components/leadsphere/sections/WhyChooseFeatured";
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
      <Navbar />

      {/* 1. Hero */}
      <Hero />

      {/* 2. Trust + Stats + Services */}
      <TrustStatsFeatures />

      {/* 3. About — Mission, Vision, Benefits, Why Different, Achievements */}
      <AboutMission />

      {/* 4. Why Choose Us — 8 reasons */}
      <WhyChooseUs />

      {/* 5. Interactive Demo */}
      <InteractiveDemo />

      {/* 6. Process — 7 steps (Discovery → ... → Business Growth) */}
      <AiProcessMap />

      {/* 7. Virtual Assistant Services */}
      <VirtualAssistantServices />

      {/* 8. Our Workflow — Intro Call → Meet VA → Discuss Tasks → Work Started */}
      <OurWorkflow />

      {/* 9. Comparison — Traditional vs Professional workflow support */}
      <BeforeAfter />

      {/* 10. Featured Professionals — agent cards + success stories */}
      <FeaturedProfessionals />

      {/* 11. ROI Calculator */}
      <RoiCalculator />

      {/* 12. CRM Kanban + Integrations + Testimonials */}
      <CrmIntegrationsTestimonials />

      {/* 13. Pricing + FAQ + CTA banner + Footer */}
      <PricingFaqCtaFooter />

      <ScrollToTop />
      <AiAssistantWidget />
    </main>
  );
}
