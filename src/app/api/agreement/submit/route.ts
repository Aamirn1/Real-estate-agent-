import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { AGREEMENT_PLANS, COMPANY, type PlanKey } from "@/lib/agreement-plans";

/* ============================================================
   Agreement Submit API
   ------------------------------------------------------------
   1. Validates the form payload.
   2. Emails the full submission (incl. signature PNG) to
      info@opusglobalsolution.com via nodemailer when SMTP is
      configured (env vars SMTP_HOST / SMTP_USER / SMTP_PASS).
      If SMTP isn't configured, the email step is skipped but
      the submission is still logged server-side.
   3. Creates a Coinbase Commerce charge for the plan amount
      and returns the hosted checkout URL.
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

const VALID_PLANS: PlanKey[] = ["Trial", "Gold", "Platinum"];

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
    }
    if (!body.signature || !body.signature.startsWith("data:image/png")) {
      return NextResponse.json({ error: "Valid signature is required." }, { status: 400 });
    }
    const consents = body.consents;
    if (!consents || !consents.terms || !consents.payment || !consents.sms || !consents.marketing) {
      return NextResponse.json({ error: "All four consent boxes must be checked." }, { status: 400 });
    }

    /* ---------- 1. Email the submission ---------- */
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
    }).catch((err) => {
      console.error("[agreement] email send failed:", err?.message ?? err);
    });

    /* ---------- 2. Create Coinbase Commerce charge ---------- */
    const apiKey = process.env.COINBASE_COMMERCE_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Crypto checkout is not configured. Your details have been recorded — our team will contact you to complete payment.",
          configured: false,
        },
        { status: 503 }
      );
    }

    const chargePayload = {
      name: `${plan.name} — Sign-Up`,
      description: `${plan.name} sign-up fee (${plan.priceLabel}). ${plan.referralFee} referral fee on closings. ${plan.leadCount} leads over ${plan.durationDays} days. Opus Global Solution Services LLC.`,
      pricing_type: "fixed_price",
      local_price: {
        amount: plan.price.toFixed(2),
        currency: "USD",
      },
      metadata: {
        plan: plan.key,
        client_name: body.fullName,
        client_email: body.email,
        source: "agreement-form",
      },
      redirect_url: `${req.nextUrl.origin}/pricing?checkout=success&plan=${encodeURIComponent(plan.key)}`,
      cancel_url: `${req.nextUrl.origin}/pricing?checkout=cancelled&plan=${encodeURIComponent(plan.key)}`,
    };

    const resp = await fetch("https://api.commerce.coinbase.com/charges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CC-Api-Key": apiKey,
        "X-CC-Version": "2018-03-22",
      },
      body: JSON.stringify(chargePayload),
    });

    const data = await resp.json().catch(() => null);
    if (!resp.ok) {
      const msg =
        data?.error?.message ||
        data?.errors?.[0]?.message ||
        `Coinbase Commerce request failed (HTTP ${resp.status}).`;
      return NextResponse.json({ error: msg }, { status: resp.status });
    }

    const hostedUrl: string | undefined = data?.data?.hosted_url;
    if (!hostedUrl) {
      return NextResponse.json(
        { error: "Coinbase Commerce response did not include a checkout URL." },
        { status: 502 }
      );
    }

    return NextResponse.json({ hosted_url: hostedUrl, charge_id: data?.data?.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown server error.";
    return NextResponse.json({ error: `Submission failed: ${message}` }, { status: 500 });
  }
}

/* ---------- Email helper ---------- */
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

  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();

  // No SMTP configured → log and return (still proceed to payment)
  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log(`[agreement] (no SMTP configured) New ${plan.name} sign-up:
  Name: ${fullName}
  Phone: ${phone}
  DRE: ${dre}
  Email: ${email}
  Billing: ${billingAddress}
  Service Area: ${serviceArea}
  Consents: ${JSON.stringify(consents)}
  Signature: ${signature.substring(0, 40)}...`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: smtpUser, pass: smtpPass },
  });

  // strip the data URL prefix to get raw base64
  const sigBase64 = signature.replace(/^data:image\/png;base64,/, "");

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1E293B;">
      <h2 style="color: #2563EB;">New ${plan.name} Sign-Up — Agreement Submitted</h2>
      <p>A new client has reviewed and signed the ${plan.name} Terms of Service Agreement and is proceeding to payment.</p>
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

  await transporter.sendMail({
    from: `"Opus Global Solution Website" <${smtpUser}>`,
    to: COMPANY.email,
    replyTo: email,
    subject: `New ${plan.name} Sign-Up — ${fullName}`,
    text,
    html,
    attachments: [
      {
        filename: "signature.png",
        content: sigBase64,
        encoding: "base64",
        cid: "signature",
      },
    ],
  });
}
