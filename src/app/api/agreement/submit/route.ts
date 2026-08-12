import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { AGREEMENT_PLANS, type PlanKey } from "@/lib/agreement-plans";

/* ============================================================
   Agreement Submit API
   ------------------------------------------------------------
   1. Validates the form payload.
   2. Emails the full submission (incl. signature PNG) to
      talalrajamuhammad@gmail.com via Resend.
   3. Returns success — the frontend shows a thank-you message
      informing the client they'll receive a Payoneer invoice.
   ============================================================ */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ConsentKeys = "terms" | "payment" | "sms" | "marketing";

type Body = {
  plan: string;
  fullName: string;
  phone: string;
  dre: string;
  email: string;
  billingAddress: string;
  serviceArea: string;
  signature: string; // base64 PNG data URL
  consents: Record<ConsentKeys, boolean>;
};

const VALID_PLANS: PlanKey[] = ["Trial", "Gold", "Platinum", "VA-Trial", "VA-Gold", "VA-Platinum"];

const MANAGEMENT_EMAIL = "talalrajamuhammad@gmail.com";
const FROM_EMAIL = "Opus Global Solution <noreply@opusglobalsolution.com>";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({})) as Partial<Body>;
    const planKey = body.plan as PlanKey;

    if (!VALID_PLANS.includes(planKey)) {
      return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
    }
    const plan = AGREEMENT_PLANS[planKey];

    const required = ["fullName", "phone", "dre", "email", "billingAddress", "serviceArea"] as const;
    for (const k of required) {
      if (typeof body[k] !== "string" || !body[k]?.trim()) {
        return NextResponse.json({ error: `Missing required field: ${k}` }, { status: 400 });
      }
      if (body[k]!.length > 1000) {
        return NextResponse.json({ error: `Field too long: ${k}` }, { status: 400 });
      }
    }
    if (!body.signature || !body.signature.startsWith("data:image/png")) {
      return NextResponse.json({ error: "Valid signature is required." }, { status: 400 });
    }
    const consents = body.consents;
    if (!consents || !consents.terms || !consents.payment || !consents.sms || !consents.marketing) {
      return NextResponse.json({ error: "All four consent boxes must be checked." }, { status: 400 });
    }

    /* ---------- Email the submission to management ---------- */
    try {
      await sendAgreementEmail({
        plan,
        fullName: body.fullName!,
        phone: body.phone!,
        dre: body.dre!,
        email: body.email!,
        billingAddress: body.billingAddress!,
        serviceArea: body.serviceArea!,
        signature: body.signature,
        consents,
      });
    } catch (emailErr) {
      console.error("[agreement] email send failed:", emailErr);
      return NextResponse.json(
        { error: "We couldn't process your submission. Please try again or contact us directly." },
        { status: 500 }
      );
    }

    /* ---------- Send confirmation email to client ---------- */
    try {
      await sendClientConfirmationEmail({
        plan,
        fullName: body.fullName!,
        email: body.email!,
      });
    } catch (emailErr) {
      console.error("[agreement] client confirmation email failed:", emailErr);
      // Don't fail the request — management email was already sent
    }

    /* ---------- Return success ---------- */
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown server error.";
    return NextResponse.json({ error: `Submission failed: ${message}` }, { status: 500 });
  }
}

/* ---------- Send confirmation email to the client ---------- */
async function sendClientConfirmationEmail(args: {
  plan: typeof AGREEMENT_PLANS[PlanKey];
  fullName: string;
  email: string;
}) {
  const { plan, fullName, email } = args;
  const resend = new Resend(RESEND_API_KEY);

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #000000;">
      <h2 style="color: #2563EB;">Thank you, ${fullName}!</h2>
      <p>We have received your ${plan.name} subscription details and agreement.</p>
      <p>Our funding manager will send you the billing details via Payoneer shortly to complete your subscription payment.</p>
      <p>If you have any questions in the meantime, please don't hesitate to contact us at <a href="mailto:info@opusglobalsolution.com" style="color: #2563EB;">info@opusglobalsolution.com</a> or call us at (645) 253-6830.</p>
      <p style="margin-top: 24px; font-weight: bold;">Best regards,<br>Opus Global Solution Team</p>
      <p style="color: #64748B; font-size: 12px; margin-top: 24px;">Opus Global Solution — Professional marketing and administrative support for real estate professionals.</p>
    </div>
  `;

  const text = `Thank you, ${fullName}!

We have received your ${plan.name} subscription details and agreement.

Our funding manager will send you the billing details via Payoneer shortly to complete your subscription payment.

If you have any questions, please contact us at info@opusglobalsolution.com or (645) 253-6830.

Best regards,
Opus Global Solution Team`;

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `Thank you for your ${plan.name} subscription — Opus Global Solution`,
    text,
    html,
  });

  if (error) {
    console.error("[agreement] client confirmation rejected by Resend:", error);
    throw new Error(typeof error === "object" && "message" in error ? String(error.message) : "Resend rejected the client email");
  }
  console.log("[agreement] client confirmation sent:", data?.id, "->", email);
}

/* ---------- Email helper using Resend ---------- */
async function sendAgreementEmail(args: {
  plan: typeof AGREEMENT_PLANS[PlanKey];
  fullName: string;
  phone: string;
  dre: string;
  email: string;
  billingAddress: string;
  serviceArea: string;
  signature: string;
  consents: Record<ConsentKeys, boolean>;
}) {
  const { plan, fullName, phone, dre, email, billingAddress, serviceArea, signature, consents } = args;

  const resend = new Resend(RESEND_API_KEY);

  // Extract base64 data from the data URL for attachment
  const sigBase64 = signature.replace(/^data:image\/png;base64,/, "");

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1E293B;">
      <h2 style="color: #2563EB;">New ${plan.name} Sign-Up — Agreement Submitted</h2>
      <p>A new client has reviewed and signed the ${plan.name} Terms of Service Agreement.</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr><td style="padding: 8px; border: 1px solid #E2E8F0; font-weight: 600; width: 35%;">Plan</td><td style="padding: 8px; border: 1px solid #E2E8F0;">${plan.name} (${plan.priceLabel})</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #E2E8F0; font-weight: 600;">Full Name</td><td style="padding: 8px; border: 1px solid #E2E8F0;">${fullName}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #E2E8F0; font-weight: 600;">Phone</td><td style="padding: 8px; border: 1px solid #E2E8F0;">${phone}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #E2E8F0; font-weight: 600;">DRE / License #</td><td style="padding: 8px; border: 1px solid #E2E8F0;">${dre}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #E2E8F0; font-weight: 600;">Email</td><td style="padding: 8px; border: 1px solid #E2E8F0;">${email}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #E2E8F0; font-weight: 600;">Billing Address</td><td style="padding: 8px; border: 1px solid #E2E8F0;">${billingAddress}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #E2E8F0; font-weight: 600;">Service Area</td><td style="padding: 8px; border: 1px solid #E2E8F0;">${serviceArea}</td></tr>
      </table>
      <h3 style="color: #1E293B;">Consents</h3>
      <ul>
        <li>Terms &amp; Privacy: ${consents.terms ? "✓ Agreed" : "✗"}</li>
        <li>Payment Authorization: ${consents.payment ? "✓ Agreed" : "✗"}</li>
        <li>SMS Notifications: ${consents.sms ? "✓ Agreed" : "✗"}</li>
        <li>Marketing Messages: ${consents.marketing ? "✓ Agreed" : "✗"}</li>
      </ul>
      <h3 style="color: #1E293B;">Signature</h3>
      <img src="cid:signature" alt="Client signature" style="border: 1px solid #E2E8F0; max-width: 400px;" />
      <p style="color: #64748B; font-size: 12px; margin-top: 24px;">Sent from opusglobalsolution.com — Agreement form submission.</p>
    </div>
  `;

  const text = `New ${plan.name} Sign-Up

Plan: ${plan.name} (${plan.priceLabel})
Name: ${fullName}
Phone: ${phone}
DRE: ${dre}
Email: ${email}
Billing Address: ${billingAddress}
Service Area: ${serviceArea}

Consents:
- Terms & Privacy: ${consents.terms ? "Agreed" : "No"}
- Payment Authorization: ${consents.payment ? "Agreed" : "No"}
- SMS Notifications: ${consents.sms ? "Agreed" : "No"}
- Marketing Messages: ${consents.marketing ? "Agreed" : "No"}

(Signature attached as PNG)
`;

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: MANAGEMENT_EMAIL,
    replyTo: email,
    subject: `New ${plan.name} Sign-Up — ${fullName}`,
    text,
    html,
    attachments: [
      {
        filename: "signature.png",
        content: sigBase64,
      },
    ],
  });

  if (error) {
    console.error("[agreement] admin email rejected by Resend:", error);
    throw new Error(typeof error === "object" && "message" in error ? String(error.message) : "Resend rejected the admin email");
  }
  console.log("[agreement] admin email sent:", data?.id, "->", MANAGEMENT_EMAIL);
}
