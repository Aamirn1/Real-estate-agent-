"use client";

import { Navbar } from "@/components/leadsphere/Navbar";
import { Hero } from "@/components/leadsphere/Hero";
import { FeaturesSection } from "@/components/leadsphere/sections/TrustStatsFeatures";
import { AboutMission, VirtualAssistantServices, OurWorkflow } from "@/components/leadsphere/sections/AboutVaWorkflow";
import { WhyChooseUs } from "@/components/leadsphere/sections/WhyChooseFeatured";
import { BeforeAfter } from "@/components/leadsphere/sections/BeforeAfter";
import AiProcessMap from "@/components/leadsphere/sections/AiProcessMap";
import CrmIntegrationsTestimonials from "@/components/leadsphere/sections/CrmIntegrationsTestimonials";
import PricingFaqCtaFooter from "@/components/leadsphere/sections/PricingFaqCtaFooter";
import { AiAssistantWidget } from "@/components/leadsphere/AiAssistantWidget";
import { ScrollToTop } from "@/components/leadsphere/ScrollToTop";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink">
      <Navbar />

      {/* 1. Hero (with 4 stats) */}
      <Hero />

      {/* 2. About | "Workflow automation for realtors" */}
      <AboutMission />

      {/* 3. Services grid (12 services) — "How we drive growth for real estate professionals" */}
      <FeaturesSection />

      {/* 4. Why Choose Us | 8 reasons */}
      <WhyChooseUs />

      {/* 5. Process | "How we work" */}
      <AiProcessMap />

      {/* 6. Virtual Assistant Services */}
      <VirtualAssistantServices />

      {/* 7. Our Workflow | Intro Call → Meet VA → Discuss Tasks → Work Started */}
      <OurWorkflow />

      {/* 8. Comparison | Traditional vs Professional workflow support */}
      <BeforeAfter />

      {/* Section image */}
      <section className="relative w-full px-5 py-8 sm:px-8">
        <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-black/8 shadow-lg">
          <img
            src="/sections/handshake.jpg"
            alt="Real estate professional shaking hands with client in front of modern home"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </section>

      {/* 9. Testimonials — "Clients tell the story" */}
      <CrmIntegrationsTestimonials />

      {/* 10. Pricing + FAQ + CTA banner + Footer */}
      <PricingFaqCtaFooter />

      <ScrollToTop />
      <AiAssistantWidget />
    </main>
  );
}
