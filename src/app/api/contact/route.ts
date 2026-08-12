import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/* ============================================================
   Contact Form API
   ------------------------------------------------------------
   Sends form details to info@opusglobalsolution.com via Resend.
   Used by both the /contact page form and the /get-started form.
   ============================================================ */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO_EMAIL = "info@opusglobalsolution.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

type Body = {
  source: "contact" | "get-started" | "home";
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
  services?: string[];
  plan?: string;
  fullName?: string;
  billingAddress?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({})) as Partial<Body>;

    // Basic validation
    if (!body.name && !body.fullName) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!body.email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const name = body.name || body.fullName || "";
    const resend = new Resend(RESEND_API_KEY);

    const sourceLabel = body.source === "get-started" ? "Get Started Page" : body.source === "home" ? "Home Page" : "Contact Page";

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1E293B;">
        <h2 style="color: #2563EB;">New Inquiry from ${sourceLabel}</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><td style="padding: 8px; border: 1px solid #E2E8F0; font-weight: 600; width: 30%;">Name</td><td style="padding: 8px; border: 1px solid #E2E8F0;">${name}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #E2E8F0; font-weight: 600;">Email</td><td style="padding: 8px; border: 1px solid #E2E8F0;">${body.email || ""}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #E2E8F0; font-weight: 600;">Phone</td><td style="padding: 8px; border: 1px solid #E2E8F0;">${body.phone || "Not provided"}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #E2E8F0; font-weight: 600;">Company / Team</td><td style="padding: 8px; border: 1px solid #E2E8F0;">${body.company || "Not provided"}</td></tr>
          ${body.service ? `<tr><td style="padding: 8px; border: 1px solid #E2E8F0; font-weight: 600;">Service of Interest</td><td style="padding: 8px; border: 1px solid #E2E8F0;">${body.service}</td></tr>` : ""}
          ${body.services?.length ? `<tr><td style="padding: 8px; border: 1px solid #E2E8F0; font-weight: 600;">Services Selected</td><td style="padding: 8px; border: 1px solid #E2E8F0;">${body.services.join(", ")}</td></tr>` : ""}
          ${body.plan ? `<tr><td style="padding: 8px; border: 1px solid #E2E8F0; font-weight: 600;">Interested Plan</td><td style="padding: 8px; border: 1px solid #E2E8F0;">${body.plan}</td></tr>` : ""}
        </table>
        ${body.message ? `<h3 style="color: #1E293B;">Message</h3><p style="white-space: pre-wrap;">${body.message}</p>` : ""}
        <p style="color: #64748B; font-size: 12px; margin-top: 24px;">Sent from opusglobalsolution.com — ${sourceLabel} form.</p>
      </div>
    `;

    const text = `New Inquiry from ${sourceLabel}

Name: ${name}
Email: ${body.email || ""}
Phone: ${body.phone || "Not provided"}
Company: ${body.company || "Not provided"}
${body.service ? `Service: ${body.service}\n` : ""}${body.services?.length ? `Services: ${body.services.join(", ")}\n` : ""}${body.plan ? `Plan: ${body.plan}\n` : ""}
${body.message ? `\nMessage:\n${body.message}\n` : ""}
Sent from opusglobalsolution.com`;

    await resend.emails.send({
      from: "Opus Global Solution <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: body.email,
      subject: `New Inquiry from ${sourceLabel} — ${name}`,
      text,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] email send failed:", err);
    return NextResponse.json(
      { error: "Could not send your message. Please try again or email us directly." },
      { status: 500 }
    );
  }
}
