import type { Metadata } from "next";
import { SiteChrome, PageHero } from "@/components/leadsphere/SiteChrome";
import { CTABanner } from "@/components/leadsphere/CTABanner";
import TrustStatsFeatures from "@/components/leadsphere/sections/TrustStatsFeatures";
import AiProcessMap from "@/components/leadsphere/sections/AiProcessMap";
import {
  VirtualAssistantServices,
} from "@/components/leadsphere/sections/AboutVaWorkflow";
import InteractiveDemo from "@/components/leadsphere/sections/InteractiveDemo";
import { RoiCalculator } from "@/components/leadsphere/sections/RoiCalculator";

export const metadata: Metadata = {
  title: "Services — Opus Solutions",
  description:
    "Lead discovery, outreach, CRM, virtual assistant services, and digital advertising for real estate professionals.",
};

export default function ServicesPage() {
  return (
    <SiteChrome>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Get Started With Online{" "}
            <span className="text-gradient-electric">Lead Generation</span>{" "}
            Services
          </>
        }
        description="Unlock your potential for success with our expert online lead generation services tailored for real estate professionals. We connect you with qualified leads and grow your business."
      />

      {/* 1. Trust + Stats + Services overview grid (id="services") */}
      <TrustStatsFeatures />

      {/* 2. Smart Assistant + Real Estate Process timeline + Interactive Map */}
      <AiProcessMap />

      {/* 3. Virtual Assistant Services — 6 service cards */}
      <VirtualAssistantServices />

      {/* 4. Live platform preview — tabbed dashboard demo */}
      <InteractiveDemo />

      {/* 5. ROI calculator — projected listings & revenue */}
      <RoiCalculator />

      {/* 6. Closing CTA */}
      <CTABanner
        title="Ready to fill your pipeline?"
        subtitle="From lead discovery to closing — Opus Solutions handles the heavy lifting so you can focus on clients."
      />
    </SiteChrome>
  );
}
