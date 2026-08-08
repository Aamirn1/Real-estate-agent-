import type { Metadata } from "next";
import { SiteChrome, PageHero } from "@/components/leadsphere/SiteChrome";
import { CTABanner } from "@/components/leadsphere/CTABanner";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FeaturesSection } from "@/components/leadsphere/sections/TrustStatsFeatures";
import {
  VirtualAssistantServices,
} from "@/components/leadsphere/sections/AboutVaWorkflow";

export const metadata: Metadata = {
  title: "Real Estate Marketing Services | Opus Global Solution",
  description: "Real estate marketing services for US agents: CRM support, outreach, workflow automation, virtual assistants, and digital advertising. Compliance-first, human-verified.",
  alternates: { canonical: "https://opusglobalsolution.com/services" },
};

export default function ServicesPage() {
  return (
    <SiteChrome withBackground={false} flushTop>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://opusglobalsolution.com" },
          { name: "Services", url: "https://opusglobalsolution.com/services" },
        ]}
      />
      <PageHero
        heroImage="/heroes/services-home.jpg"
        eyebrow="Services"
        title={
          <>
            Real Estate{" "}
            <span className="text-gradient-electric">Marketing Services</span>{" "}
            for Licensed Agents
          </>
        }
        description="Unlock your potential for success with our expert marketing consulting, outreach support, and CRM solutions tailored for licensed real estate professionals."
      />

      {/* 1. Services overview grid (12 services) — heading hidden (PageHero already shows it) */}
      <FeaturesSection showHeading={false} />

      {/* 2. Virtual Assistant Services | 6 service cards */}
      <VirtualAssistantServices />

      {/* 3. Closing CTA */}
      <CTABanner
        title="Ready to fill your pipeline?"
        subtitle="From outreach to CRM | Opus Global Solution handles the heavy lifting so you can focus on clients."
      />
    </SiteChrome>
  );
}
