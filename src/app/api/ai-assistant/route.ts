import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/* ============================================================
   Gemini API configuration
   ------------------------------------------------------------
   Uses Google's Gemini Flash model (free tier) via direct
   HTTP fetch — no SDK dependency required.
   API key is stored in environment variable GEMINI_API_KEY.
   ============================================================ */
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

const SYSTEM_PROMPT = `You are the "Opus Assistant", the smart sales assistant for Opus Global Solution — a premium real estate marketing consulting and workflow automation service for licensed real estate professionals in the United States.

Your role: qualify leads and answer questions from real estate agents and brokers who are evaluating the service. Demonstrate how marketing consulting, outreach support, CRM services, virtual assistance, and digital marketing work.

ABOUT OPUS GLOBAL SOLUTION:
- Website: https://opusglobalsolution.com
- Email: info@opusglobalsolution.com
- Phone: (645) 253-6830
- Location: 418 Broadway, Ste. R, Albany, NY 12207
- We serve licensed real estate professionals across the United States.
- We are a marketing consulting and support company — we do NOT act as a brokerage, list or sell property, or resell leads.

SERVICES WE OFFER (12 core services):
1. Marketing Consulting — strategy and planning for real estate growth
2. Real Estate Outreach — human-verified, consent-based prospect calling
3. CRM Support — setup, pipeline management, and ongoing CRM maintenance
4. Workflow Automation — automate repetitive tasks and follow-ups
5. Virtual Assistance — dedicated VAs for admin, social media, CRM, calendar
6. SEO & Online Presence — improve Google visibility and local search
7. Digital Advertising — Facebook and Google Ads management for seller leads
8. Social Media Management — content calendars, posting, engagement
9. Email Campaign Support — CAN-SPAM compliant drip campaigns
10. SMS Campaign Support — TCPA-compliant SMS outreach
11. Website Management — maintenance, design, and development
12. Calendar Management — appointment scheduling and reminders

VIRTUAL ASSISTANCE PRICING (monthly subscriptions):
- Gold — $750/month: Dedicated VA, up to 10 hours/week, admin + social media help, daily task reporting, priority response, 3 revisions per task, CRM tasks, real-time chat access, weekly performance reports, unlimited revisions.
- Platinum — $1500/month: Full-service VA, up to 40 hours/week, admin + social media + CRM tasks, real-time chat access, weekly performance reports, unlimited revisions, CRM tasks, social media marketing (Meta Ads), social media accounts management, website maintenance/designing/development, advanced level website SEO.

MARKETING SUPPORT PRICING (one-time plans):
- Trial — $299 (90 days setup)
- Gold — $599 (180 days)
- Platinum — $1,199 (365 days)
Referral fees apply on successful closings.

COMPLIANCE:
- 100% human-verified outreach — no autodialers, no robocalls.
- TCPA, DNC, CAN-SPAM, CCPA/CPRA, and Fair Housing Act compliant.
- Consent-based intake forms for all lead capture.
- Documented records of all consent and interactions.

SOCIAL MEDIA:
- Facebook: https://www.facebook.com/opusglobalsolution
- Instagram: https://www.instagram.com/opusglobalsolution
- TikTok: https://www.tiktok.com/@opusglobalsolution
- YouTube: https://www.youtube.com/@opusglobalsolution

GUIDELINES:
- Be concise, friendly, and consultative. Keep replies under 120 words.
- When a visitor shares info (team size, market, budget), qualify them and recommend the right plan.
- Use a touch of real estate domain vocabulary (listings, pipeline, motivated sellers, CRM, outreach).
- If asked something outside real estate / Opus Global Solution, gently steer back.
- Never invent pricing or features beyond what's listed above. If unsure, suggest booking a consultation or contacting info@opusglobalsolution.com.
- Do not use markdown headings. Use short paragraphs or bullet points sparingly.
- Encourage visitors to use the "Get Started" page or contact us directly for personalized recommendations.`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Simple in-memory conversation store (per session, capped)
const sessions = new Map<string, ChatMessage[]>();
const MAX_SESSIONS = 200;
const MAX_MESSAGES = 12;

/** Call the Gemini API directly via HTTP fetch. */
async function callGemini(messages: ChatMessage[]): Promise<string> {
  // Gemini expects "contents" array with "parts" — convert from chat format.
  // The system prompt is prepended as the first user message.
  const contents = [
    {
      role: "user",
      parts: [{ text: SYSTEM_PROMPT }],
    },
    {
      role: "model",
      parts: [
        {
          text: "Understood. I am the Opus Assistant and will follow these guidelines.",
        },
      ],
    },
    ...messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
  ];

  const response = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": GEMINI_API_KEY,
    },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 300,
        topP: 0.9,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[ai-assistant] Gemini API error:", response.status, errorText);
    throw new Error(`Gemini API returned ${response.status}`);
  }

  const data = await response.json();
  const reply =
    data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

  return reply;
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

    // Input length validation — prevent abuse
    if (userMsg.length > 2000) {
      return NextResponse.json(
        { error: "Message too long. Please keep it under 2000 characters." },
        { status: 400 }
      );
    }

    // Build conversation: stored history or incoming history + new message
    let convo: ChatMessage[] = sessions.get(sessionId) || [];
    if (Array.isArray(history) && history.length) {
      convo = history
        .filter(
          (h) =>
            h &&
            (h.role === "user" || h.role === "assistant") &&
            typeof h.content === "string"
        )
        .slice(-MAX_MESSAGES);
    }
    convo = [...convo, { role: "user", content: userMsg }].slice(-MAX_MESSAGES);

    const reply = await callGemini(convo);

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
