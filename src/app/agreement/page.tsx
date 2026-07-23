import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteChrome, PageHero } from "@/components/leadsphere/SiteChrome";
import { SectionShell } from "@/components/leadsphere/primitives";
import { Reveal } from "@/components/leadsphere/Reveal";
import { Check } from "lucide-react";
import { AGREEMENT_PLANS, getAgreementSections, COMPANY, type PlanKey } from "@/lib/agreement-plans";
import { AgreementForm } from "./AgreementForm";

export const metadata: Metadata = {
  title: "Service Agreement | Opus Global Solution",
  description:
    "Review and sign the service agreement for your selected plan, then proceed to secure payment.",
};

const VALID_PLANS: PlanKey[] = ["Trial", "Gold", "Platinum"];

export default function AgreementPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  // Read plan from search params (async in Next 16)
  // We resolve synchronously via a wrapper since this is a server component.
  return <AgreementRenderer searchParams={searchParams} />;
}

async function AgreementRenderer({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const params = await searchParams;
  const planKey = (params.plan ?? "") as PlanKey;
  if (!VALID_PLANS.includes(planKey)) {
    notFound();
  }
  const plan = AGREEMENT_PLANS[planKey];
  const sections = getAgreementSections(plan);

  return (
    <SiteChrome withBackground={false} flushTop>
      <PageHero
        heroImage="/heroes/get-started-home.jpg"
        eyebrow="Service Agreement"
        title={
          <>
            {plan.name} — <span className="text-gradient-electric">Terms of Service</span>
          </>
        }
        description="Please review the agreement below carefully, then complete the sign-up form to proceed to secure payment."
      />

      <SectionShell id="agreement" className="md:py-16">
        <div className="mx-auto max-w-4xl">
          {/* ============ AGREEMENT BODY ============ */}
          <Reveal>
            <div className="rounded-3xl border border-[#94A3B8] bg-white p-7 shadow-[0_30px_80px_-20px_rgba(30,41,59,0.12)] sm:p-10">
              {/* header */}
              <div className="mb-8 border-b border-[#E2E8F0] pb-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-3 py-1 text-xs font-medium tracking-wide text-electric">
                  <Check className="h-3.5 w-3.5" />
                  {plan.name}
                  {plan.badge && (
                    <>
                      <span className="text-electric/40">·</span>
                      {plan.badge}
                    </>
                  )}
                </span>
                <h2 className="mt-4 font-heading text-2xl font-semibold text-[#281000] sm:text-3xl">
                  {plan.name} — Terms of Service Agreement
                </h2>
                <p className="mt-2 text-sm text-[#281000]/55">
                  Between {COMPANY.legalName} (&quot;the Company&quot;) and the Client
                  (&quot;the Client&quot;). Effective as of the date of signing.
                </p>
              </div>

              {/* quick facts */}
              <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Fact label="Sign-Up Fee" value={plan.priceLabel} />
                <Fact label="Referral Fee" value={plan.referralFee} />
                <Fact label="Leads" value={`${plan.leadCount}`} />
                <Fact label="Duration" value={`${plan.durationDays} days`} />
              </div>

              {/* sections */}
              <div className="flex flex-col gap-6">
                {sections.map((s, i) => (
                  <section key={i}>
                    <h3 className="font-heading text-base font-semibold text-[#281000]">
                      {i + 1}. {s.title}
                    </h3>
                    <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-[#281000]/70">
                      {s.body}
                    </p>
                  </section>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ============ SIGN-UP FORM ============ */}
          <div className="mt-10">
            <Reveal>
              <AgreementForm plan={plan} />
            </Reveal>
          </div>
        </div>
      </SectionShell>
    </SiteChrome>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#281000]/45">
        {label}
      </p>
      <p className="mt-1 font-heading text-lg font-semibold text-[#281000]">
        {value}
      </p>
    </div>
  );
}
