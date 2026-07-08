"use client";

import { Navbar } from "@/components/leadsphere/Navbar";
import { Hero } from "@/components/leadsphere/Hero";
import TrustStatsFeatures from "@/components/leadsphere/sections/TrustStatsFeatures";
import { AboutMission, VirtualAssistantServices, OurWorkflow } from "@/components/leadsphere/sections/AboutVaWorkflow";
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

      {/* 1. Hero — "Workflow Automation For Realtors" */}
      <Hero />

      {/* 2. Trust + Stats — trusted by real estate professionals */}
      <TrustStatsFeatures />

      {/* 3. Who We Are — Mission, Vision, Who We Serve */}
      <AboutMission />

      {/* 4. Services — How we drive growth (lead gen + outreach + CRM + campaigns) */}
      {/* (contained inside TrustStatsFeatures as the Features grid) */}

      {/* 5. Interactive Demo — live platform preview */}
      <InteractiveDemo />

      {/* 6. Real Estate Process — Research → Qualification → Scheduling → Reporting */}
      <AiProcessMap />

      {/* 7. Virtual Assistant Services — Customer Support, Prospect Calling, etc. */}
      <VirtualAssistantServices />

      {/* 8. Our Workflow — Intro Call → Meet VA → Discuss Tasks → Work Started */}
      <OurWorkflow />

      {/* 9. Before/After comparison — traditional vs Opus-powered */}
      <BeforeAfter />

      {/* 10. ROI Calculator — projected listings & revenue */}
      <RoiCalculator />

      {/* 11. CRM Kanban + Integrations + Testimonials — "Clients Tell The Story" */}
      <CrmIntegrationsTestimonials />

      {/* 12. Pricing + FAQ + CTA banner + Footer */}
      <PricingFaqCtaFooter />

      <ScrollToTop />
      <AiAssistantWidget />
    </main>
  );
}
