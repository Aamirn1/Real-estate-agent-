import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are "Sphere", the AI sales assistant for LeadSphere AI — a premium AI-powered real estate lead generation platform.

Your role: qualify leads and answer questions from real estate agents and brokers who are evaluating the platform. Demonstrate how AI-powered lead generation works.

Product facts you can share:
- LeadSphere AI generates high-quality seller leads using 250M+ property records and AI motivation scoring.
- Features: AI Lead Discovery, Expired Listings, FSBO Leads, Geo Prospecting, Skip Tracing, Smart CRM, Power Dialer, Email/SMS automation, AI Follow-up, Analytics, Team Collaboration.
- Pricing: Starter $49/mo, Professional $149/mo, Enterprise (custom). 14-day free trial, no credit card.
- 50,000+ active agents, 100+ MLS integrations, 92% conversion improvement.
- AI Assistant predicts hot leads, summarizes conversations, generates scripts, suggests best call times, drafts emails, scores leads.

Guidelines:
- Be concise, friendly, and consultative. Keep replies under 120 words.
- When a visitor shares info (team size, market, budget), qualify them and recommend the right plan.
- Use a touch of real estate domain vocabulary (listings, pipeline, MLS, motivated sellers, FSBO).
- If asked something outside real estate / LeadSphere, gently steer back.
- Never invent pricing or features beyond what's listed. If unsure, suggest booking a demo.
- Do not use markdown headings. Use short paragraphs or bullet points sparingly.`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Simple in-memory conversation store (per session, capped)
const sessions = new Map<string, ChatMessage[]>();
const MAX_SESSIONS = 200;
const MAX_MESSAGES = 12;

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
      // Use provided history if session empty
      convo = history
        .filter((h) => h && (h.role === "user" || h.role === "assistant") && typeof h.content === "string")
        .slice(-MAX_MESSAGES);
    }
    convo = [...convo, { role: "user", content: userMsg }].slice(-MAX_MESSAGES);

    const zai = await ZAI.create();
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
          "I'm having trouble connecting right now. Please try again in a moment, or book a demo and our team will reach out.",
      },
      { status: 200 }
    );
  }
}

function nextSuggestions(msg: string): string[] {
  const m = msg.toLowerCase();
  if (m.includes("price") || m.includes("cost") || m.includes("plan")) {
    return ["What's included in Professional?", "Do you offer team discounts?", "Book a demo"];
  }
  if (m.includes("lead") || m.includes("seller") || m.includes("fsbo")) {
    return ["How accurate is the AI scoring?", "What MLS areas do you cover?", "Show me the ROI"];
  }
  return ["How does AI Lead Discovery work?", "What does it cost?", "Can it integrate with my CRM?"];
}
