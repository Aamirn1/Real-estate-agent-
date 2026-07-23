/* ============================================================
   Plan-specific Terms of Service Agreement data
   ------------------------------------------------------------
   Each plan has its own agreement text adapted from the
   master template. Company = Opus Global Solution (not V Leads).
   ============================================================ */

export type PlanKey = "Trial" | "Gold" | "Platinum";

export type AgreementPlan = {
  key: PlanKey;
  name: string;
  price: number;
  priceLabel: string;
  referralFee: string;
  leadCount: number;
  durationDays: number;
  counties: string;
  badge?: string;
  // dynamic values interpolated into the agreement body
  signupFee: number;
  includesDigitalMarketing: boolean;
  includesLiveTransfer: boolean;
  includesDedicatedManager: boolean;
  includesMonthlyReporting: boolean;
  includesSMS: boolean;
  includesCallRecording: boolean;
};

export const AGREEMENT_PLANS: Record<PlanKey, AgreementPlan> = {
  Trial: {
    key: "Trial",
    name: "Trial Plan",
    price: 299,
    priceLabel: "$299",
    referralFee: "20%",
    leadCount: 6,
    durationDays: 90,
    counties: "up to 5 counties",
    signupFee: 299,
    includesDigitalMarketing: false,
    includesLiveTransfer: false,
    includesDedicatedManager: false,
    includesMonthlyReporting: false,
    includesSMS: false,
    includesCallRecording: false,
  },
  Gold: {
    key: "Gold",
    name: "Gold Plan",
    price: 599,
    priceLabel: "$599",
    referralFee: "15%",
    leadCount: 12,
    durationDays: 180,
    counties: "up to 5 counties",
    badge: "Top Selling",
    signupFee: 599,
    includesDigitalMarketing: false,
    includesLiveTransfer: false,
    includesDedicatedManager: false,
    includesMonthlyReporting: false,
    includesSMS: false,
    includesCallRecording: true,
  },
  Platinum: {
    key: "Platinum",
    name: "Platinum Plan",
    price: 1199,
    priceLabel: "$1,199",
    referralFee: "10%",
    leadCount: 18,
    durationDays: 365,
    counties: "up to 10 counties",
    badge: "For Premium Realtors",
    signupFee: 1199,
    includesDigitalMarketing: true,
    includesLiveTransfer: true,
    includesDedicatedManager: true,
    includesMonthlyReporting: true,
    includesSMS: true,
    includesCallRecording: true,
  },
};

export const COMPANY = {
  name: "Opus Global Solution",
  legalName: "Opus Global Solution Services LLC",
  email: "info@opusglobalsolution.com",
  phones: ["(320) 331-0910", "(320) 331-8501", "(320) 331-3559"],
};

/** Build the sections of the agreement for a given plan. */
export function getAgreementSections(plan: AgreementPlan) {
  const durationLabel =
    plan.durationDays === 90 ? "90 days" :
    plan.durationDays === 180 ? "180 days" :
    "365 days";

  const additionalServices = [
    "Provision of a lead tracking system through Google Spreadsheets",
    plan.includesCallRecording && "Lead call recordings (where permitted and with notice)",
    "Appointment scheduling",
    plan.includesLiveTransfer && "Real-time live transfers",
    plan.includesMonthlyReporting && "Monthly performance reporting",
    plan.includesDedicatedManager && "Dedicated account manager access (via phone, email, or WhatsApp)",
  ].filter(Boolean) as string[];

  return [
    {
      title: "Scope of Services",
      body: `The Company agrees to provide lead generation services to its Clients, with the goal of delivering qualified, interested, and exclusive seller leads tailored to meet the Client's specific needs under the ${plan.name}.`,
    },
    {
      title: "Payment Terms",
      body: `The Client shall pay a refundable sign-up fee of $${plan.signupFee.toLocaleString()} upfront upon signing this Agreement. The total sign-up fee of $${plan.signupFee.toLocaleString()} will be reimbursed or deducted by the Company upon the Client's first successful closing.`,
    },
    {
      title: "Referral Fees",
      body: `The Broker/Agent agrees to pay the Company a ${plan.referralFee} referral fee from the Realtor's net commission (the amount the Realtor takes home after the broker's split) for any real estate transaction (buying or selling) that occurs through the provided leads during the marketing coverage period.`,
    },
    {
      title: "Lead Delivery",
      body: `The Company will deliver the first lead within a month from the date of signing this Agreement. The Company will deliver ${plan.leadCount} exclusive seller leads over a period of ${durationLabel}. Each provided lead must meet the following criteria to be deemed 'qualified':\n• Located within the client's target market (covering ${plan.counties}).\n• Express a clear intent to sell within the next 3 to 6 months.\n• Is the legal owner or authorized decision-maker.\n• Has given consent to be contacted by the client.\n\nAny lead found invalid, a non-homeowner, uninterested, or unreachable after three attempts within seven days shall be deemed a bad lead and replaced by the Company within the contract period upon the Client's rejection.`,
    },
    {
      title: "Client Responsibilities",
      body: "The Client is responsible for timely follow-up and engagement with each lead. The Client must maintain active communication with the Company and provide feedback on lead quality.",
    },
    {
      title: "Refund Policy",
      body: `The Client may submit a written request for a refund within thirty (30) days from the date of execution of this Agreement, solely in the event of non-fulfillment of lead delivery as specified in the 'Lead Delivery' section. If deemed eligible, the Client shall be entitled to a refund of fifty percent (50%) of the sign-up fee, which shall be processed within sixty (60) business days from the date of the written request.`,
    },
    {
      title: "Refund & Dispute Eligibility",
      body: "After the initial 30-day period, the Client will no longer be eligible to request a refund or initiate a dispute under this agreement.",
    },
    {
      title: "Agreement Validity",
      body: `This Agreement shall remain valid for a period of ${durationLabel} from the date of signing.`,
    },
    {
      title: "Support & Additional Services",
      body: `Dedicated Support: Includes up to ten (10) hours of support per day during the service period.\n\nAdditional Services: ${additionalServices.join("; ")}.\n\nLimitations: This Agreement ${plan.includesDigitalMarketing ? "includes" : "does not include"} digital marketing services.`,
    },
    {
      title: "Holiday Observance",
      body: `${COMPANY.legalName} will observe all national public holidays in the United States. Support and services may be delayed or paused on these days, with timelines adjusted accordingly. Urgent assistance requests on these holidays will be addressed on the next business day, unless otherwise agreed. In addition, if ${COMPANY.legalName} intends to take any additional time off outside of national holidays, the Company will notify the Client at least one week in advance to ensure adequate preparation and continuity of services.`,
    },
    {
      title: "Confidentiality",
      body: "Both parties agree to maintain the confidentiality of any proprietary information shared during the course of this Agreement. Neither party shall disclose this information to any third party without the written consent of the other party.",
    },
    {
      title: "Payment Authorization",
      body: `By submitting payment for this plan, the Client authorizes ${COMPANY.legalName} to process the agreed amount through its secure, PCI-compliant payment processor for the services described in this Agreement. The Client understands that all card details are entered directly on the processor's secure platform and are not stored or handled by ${COMPANY.legalName}. This authorization confirms the Client's approval of the transaction and acknowledgment of the payment terms outlined herein.`,
    },
    {
      title: "Entire Agreement",
      body: "This Agreement constitutes the entire understanding between the parties and supersedes all prior discussions, negotiations, or agreements, whether written or verbal, relating to the subject matter herein.\n\nIN WITNESS WHEREOF, the parties hereto have executed this Service Agreement as of the date first above written.",
    },
  ];
}
