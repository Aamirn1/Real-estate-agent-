import type { Metadata } from "next";
import { SiteChrome, PageHero } from "@/components/leadsphere/SiteChrome";
import { CTABanner } from "@/components/leadsphere/CTABanner";
import { SectionShell } from "@/components/leadsphere/primitives";
import { GetStartedForm } from "./GetStartedForm";

export const metadata: Metadata = {
  title: "Get Started | Opus Global Solution",
  description:
    "Fill out the form and our team will reach out within 24 hours to help you scale your real estate business with professional marketing and outreach support.",
};

export default function GetStartedPage() {
  return (
    <SiteChrome>
      <PageHero
        eyebrow="Get Started"
        title={
          <>
            Let&apos;s{" "}
            <span className="text-gradient-electric">grow together</span>
          </>
        }
        description="Fill out the form below and our team will reach out within 24 hours to help you scale your real estate business with professional marketing and outreach support."
      />

      <SectionShell id="get-started">
        <div className="mx-auto max-w-2xl">
          <GetStartedForm />
        </div>
      </SectionShell>

      <CTABanner
        title="Prefer to talk to a human?"
        subtitle="Call us at (320) 331-0910 or email info@opussolutions.com — we reply within one business day."
      />
    </SiteChrome>
  );
}
