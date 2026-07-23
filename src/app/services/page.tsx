import type { Metadata } from "next";
import { SiteChrome, PageHero } from "@/components/leadsphere/SiteChrome";
import { CTABanner } from "@/components/leadsphere/CTABanner";
import { FeaturesSection } from "@/components/leadsphere/sections/TrustStatsFeatures";
import AiProcessMap from "@/components/leadsphere/sections/AiProcessMap";
import {
  VirtualAssistantServices,
} from "@/components/leadsphere/sections/AboutVaWorkflow";
import { WhyChooseUs } from "@/components/leadsphere/sections/WhyChooseFeatured";

export const metadata: Metadata = {
  title: "Real Estate Marketing Services | Opus Global Solution",
  description: "Professional marketing consulting, CRM support, outreach, virtual assistants, and digital advertising for licensed US real estate professionals.",
};

export default function ServicesPage() {
  return (
    <SiteChrome withBackground={false} flushTop>
      <PageHero
        heroImage="/heroes/services-home.jpg"
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

      {/* 1. Services overview grid (12 services) — stats section removed */}
      <FeaturesSection />

      {/* 2. Virtual Assistant Services | 6 service cards */}
      <VirtualAssistantServices />

      {/* 3. Why Choose Us | 8 reasons ("Built different, built to last") */}
      <WhyChooseUs />

      {/* 4. Process timeline ("How we work") — moved below Why Choose Us */}
      <AiProcessMap />

      {/* 5. Closing CTA */}
      <CTABanner
        title="Ready to fill your pipeline?"
        subtitle="From outreach to CRM | Opus Global Solution handles the heavy lifting so you can focus on clients."
      />
    </SiteChrome>
  );
}
