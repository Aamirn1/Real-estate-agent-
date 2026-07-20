import { NextRequest, NextResponse } from "next/server";

/* ============================================================
   Coinbase Commerce Checkout API
   ------------------------------------------------------------
   Creates a Coinbase Commerce "charge" for a pricing plan and
   returns the hosted checkout URL the frontend should redirect
   the user to.

   Required env var:
     COINBASE_COMMERCE_API_KEY  -> Coinbase Commerce API key
                                   (found in Commerce Dashboard
                                    -> Settings -> API Keys)

   Coinbase Commerce REST API docs:
   https://docs.cdp.coinbase.com/commerce-onchain/docs/api-charges#create-a-charge
   ============================================================ */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Plan = {
  name: string;
  price: string; // e.g. "$300"
  period: string;
};

// Canonical plan registry — the API only trusts these values
// (prevents arbitrary amount/name injection from the client).
const ALLOWED_PLANS: Record<string, Plan> = {
  Trial: { name: "Trial Plan", price: "$300", period: "One-Time · 90 Days Setup" },
  Gold: { name: "Gold Plan", price: "$600", period: "One-Time · 180 Days Setup" },
  Platinum: { name: "Platinum Plan", price: "$1200", period: "One-Time · 365 Days Setup" },
};

function parseAmount(price: string): number {
  const num = parseInt(price.replace(/[^0-9]/g, ""), 10);
  return Number.isFinite(num) ? num : 0;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const planKey: string = typeof body?.plan === "string" ? body.plan : "";

    const plan = ALLOWED_PLANS[planKey];
    if (!plan) {
      return NextResponse.json(
        { error: "Invalid or unknown plan." },
        { status: 400 }
      );
    }

    const amount = parseAmount(plan.price);
    if (amount <= 0) {
      return NextResponse.json(
        { error: "Invalid plan amount." },
        { status: 400 }
      );
    }

    const apiKey = process.env.COINBASE_COMMERCE_API_KEY?.trim();

    // Graceful fallback: if no API key is configured, return a clear,
    // actionable message instead of crashing.
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Coinbase Commerce is not configured. Set COINBASE_COMMERCE_API_KEY in the server environment to enable crypto checkout.",
          configured: false,
        },
        { status: 503 }
      );
    }

    const chargePayload = {
      name: plan.name,
      description: `${plan.name} — ${plan.period}. Marketing consulting & support package from Opus Global Solution.`,
      pricing_type: "fixed_price",
      local_price: {
        amount: amount.toFixed(2),
        currency: "USD",
      },
      metadata: {
        plan: planKey,
        source: "website-pricing",
      },
      redirect_url: `${req.nextUrl.origin}/pricing?checkout=success&plan=${encodeURIComponent(planKey)}`,
      cancel_url: `${req.nextUrl.origin}/pricing?checkout=cancelled&plan=${encodeURIComponent(planKey)}`,
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
      return NextResponse.json(
        { error: msg, configured: true },
        { status: resp.status }
      );
    }

    const hostedUrl: string | undefined = data?.data?.hosted_url;
    const chargeId: string | undefined = data?.data?.id;

    if (!hostedUrl) {
      return NextResponse.json(
        { error: "Coinbase Commerce response did not include a checkout URL." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      hosted_url: hostedUrl,
      charge_id: chargeId,
      configured: true,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown server error.";
    return NextResponse.json(
      { error: `Checkout failed: ${message}` },
      { status: 500 }
    );
  }
}
