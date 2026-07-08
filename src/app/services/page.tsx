import type { Metadata } from "next";
import { SiteChrome, PageHero } from "@/components/leadsphere/SiteChrome";
import { CTABanner } from "@/components/leadsphere/CTABanner";
import TrustStatsFeatures from "@/components/leadsphere/sections/TrustStatsFeatures";
import AiProcessMap from "@/components/leadsphere/sections/AiProcessMap";
import {
  VirtualAssistantServices,
} from "@/components/leadsphere/sections/AboutVaWorkflow";
import { WhyChooseUs } from "@/components/leadsphere/sections/WhyChooseFeatured";

export const metadata: Metadata = {
  title: "Services — Opus Solutions",
  description:
    "Marketing consulting, CRM support, workflow automation, virtual assistance, outreach support, and digital marketing for real estate professionals.",
};

export default function ServicesPage() {
  return (
    <SiteChrome>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Get Started With{" "}
            <span className="text-gradient-electric">Professional Support</span>{" "}
            Services
          </>
        }
        description="Unlock your potential for success with our expert marketing consulting, outreach support, and CRM solutions tailored for licensed real estate professionals."
      />

      {/* 1. Trust + Stats + Services overview grid (id="services") */}
      <TrustStatsFeatures />

      {/* 2. Process timeline — 7 steps */}
      <AiProcessMap />

      {/* 3. Virtual Assistant Services — 6 service cards */}
      <VirtualAssistantServices />

      {/* 4. Why Choose Us — 8 reasons */}
      <WhyChooseUs />

      {/* 5. Closing CTA */}
      <CTABanner
        title="Ready to fill your pipeline?"
        subtitle="From outreach to CRM — Opus Solutions handles the heavy lifting so you can focus on clients."
      />
    </SiteChrome>
  );
}
