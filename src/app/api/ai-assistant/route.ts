import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are the "Opus Assistant", the smart sales assistant for Opus Global Solution — a premium real estate marketing consulting and workflow automation service for licensed real estate professionals.

Your role: qualify leads and answer questions from real estate agents and brokers who are evaluating the service. Demonstrate how marketing consulting, outreach support, and CRM services work.

Product facts you can share:
- Opus Global Solution provides marketing consulting, CRM support, outreach support, virtual assistance, digital marketing, appointment coordination, and reporting & analytics for real estate professionals.
- Virtual Assistant services include: Customer Support, Prospect Calling, Calendar Management, CRM Management, Social Media Management, Website Management.
- Pricing: Trial $299 (one-time, 90 days), Gold $599 (one-time, 180 days), Platinum $1,199 (one-time, 365 days). Referral fees apply on successful closings.
- Virtual Assistance packages: Trial $599/mo, Gold $899/mo, Platinum $1,499/mo.
- Human-verified, consent-based outreach. TCPA, DNC, CAN-SPAM, CCPA/CPRA, and Fair Housing Act compliant.
- Contact: info@opusglobalsolution.com or (645) 253-6830.

Guidelines:
- Be concise, friendly, and consultative. Keep replies under 120 words.
- When a visitor shares info (team size, market, budget), qualify them and recommend the right plan.
- Use a touch of real estate domain vocabulary (listings, pipeline, motivated sellers, CRM, outreach).
- If asked something outside real estate / Opus Global Solution, gently steer back.
- Never invent pricing or features beyond what's listed. If unsure, suggest booking a consultation.
- Do not use markdown headings. Use short paragraphs or bullet points sparingly.`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Simple in-memory conversation store (per session, capped)
const sessions = new Map<string, ChatMessage[]>();
const MAX_SESSIONS = 200;
const MAX_MESSAGES = 12;

/** Build a ZAI instance from environment variables (works in production
 *  without the .z-ai-config file). Falls back to ZAI.create() for local dev. */
async function getZAI() {
  const baseUrl = process.env.ZAI_BASE_URL;
  const apiKey = process.env.ZAI_API_KEY;
  if (baseUrl && apiKey) {
    // Construct directly — bypasses the .z-ai-config file lookup
    return new ZAI({
      baseUrl,
      apiKey,
      chatId: process.env.ZAI_CHAT_ID,
      userId: process.env.ZAI_USER_ID,
      token: process.env.ZAI_TOKEN,
    } as any);
  }
  // Fallback: use config file (local dev / sandbox)
  return ZAI.create();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { message, sessionId = "anon", history }: {
      message?: string;
      sessionId?: string;
      history?: ChatMessage[];
    } = body;

    const userMsg = (message || "").toString().trim();
    if (!userMsg) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    // Build conversation: system + stored history + incoming history + new message
    let convo: ChatMessage[] = sessions.get(sessionId) || [];
    if (Array.isArray(history) && history.length) {
      convo = history
        .filter((h) => h && (h.role === "user" || h.role === "assistant") && typeof h.content === "string")
        .slice(-MAX_MESSAGES);
    }
    convo = [...convo, { role: "user", content: userMsg }].slice(-MAX_MESSAGES);

    const zai = await getZAI();
    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: SYSTEM_PROMPT },
        ...convo.map((m) => ({ role: m.role, content: m.content })),
      ],
      thinking: { type: "disabled" },
    });

    const reply = completion.choices?.[0]?.message?.content?.trim() || "";
    if (!reply) {
      return NextResponse.json(
        { error: "I couldn't generate a response. Please try again." },
        { status: 502 }
      );
    }

    // store updated history
    const updated = [...convo, { role: "assistant" as const, content: reply }];
    sessions.set(sessionId, updated.slice(-MAX_MESSAGES));

    // crude session GC
    if (sessions.size > MAX_SESSIONS) {
      const firstKey = sessions.keys().next().value;
      if (firstKey) sessions.delete(firstKey);
    }

    return NextResponse.json({
      reply,
      sessionId,
      suggestions: nextSuggestions(userMsg),
    });
  } catch (err) {
    console.error("[ai-assistant] error:", err);
    return NextResponse.json(
      {
        error: "The assistant is temporarily unavailable.",
        reply:
          "I'm having trouble connecting right now. Please try again in a moment, or contact us at (645) 253-6830 and our team will reach out.",
      },
      { status: 200 }
    );
  }
}

function nextSuggestions(msg: string): string[] {
  const m = msg.toLowerCase();
  if (m.includes("price") || m.includes("cost") || m.includes("plan")) {
    return ["What's included in the Gold plan?", "Do you offer team discounts?", "Book a consultation"];
  }
  if (m.includes("lead") || m.includes("seller") || m.includes("outreach")) {
    return ["How does your outreach work?", "What areas do you cover?", "Show me the ROI"];
  }
  if (m.includes("virtual") || m.includes("assistant") || m.includes("va")) {
    return ["What does a VA do?", "How much does VA service cost?", "Can I get a dedicated VA?"];
  }
  return ["What services do you offer?", "What does it cost?", "Can you integrate with my CRM?"];
}
