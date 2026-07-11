"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Headset, Send, X, Sparkles, Loader2 } from "lucide-react";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const QUICK_PROMPTS = [
  "How does Smart Lead Discovery work?",
  "What does it cost?",
  "Can it find expired listings?",
  "How accurate is skip tracing?",
];

const WELCOME: Msg = {
  role: "assistant",
  content:
    "Hi! I'm the Opus Assistant. I can show you how Opus Solutions finds motivated sellers, automates outreach, and fills your pipeline. What would you like to know?",
};

export function AiAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(QUICK_PROMPTS);
  const [unread, setUnread] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Pulse the launcher after a delay to draw attention
  useEffect(() => {
    const t = setTimeout(() => setUnread(true), 6000);
    return () => clearTimeout(t);
  }, []);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;
    setInput("");
    setLoading(true);
    setUnread(false);
    setSuggestions([]);
    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          sessionId: "widget",
          history: next.slice(-8),
        }),
      });
      const data = await res.json();
      const reply =
        data.reply ||
        data.error ||
        "Sorry, I couldn't respond right now. Please try again.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      if (Array.isArray(data.suggestions) && data.suggestions.length) {
        setSuggestions(data.suggestions);
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, type: "spring", stiffness: 220, damping: 16 }}
        onClick={() => {
          setOpen((v) => !v);
          setUnread(false);
        }}
        aria-label="Open assistant"
        className="fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-electric via-violet to-cyan shadow-[0_10px_40px_-8px_rgba(59,130,246,0.7)] transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-electric to-violet opacity-60 blur-md" />
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="relative"
            >
              <X className="h-6 w-6 text-[#1E293B]" />
            </motion.span>
          ) : (
            <motion.span
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative"
            >
              <Headset className="h-6 w-6 text-[#1E293B]" />
            </motion.span>
          )}
        </AnimatePresence>
        {unread && !open && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-[#1E293B] ring-2 ring-white">
            1
          </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 z-[70] flex h-[520px] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:right-6"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] bg-gradient-to-r from-electric/10 to-violet/10 p-4">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-electric to-violet">
                <Headset className="h-5 w-5 text-[#1E293B]" />
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-electric/30" />
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-1.5 font-heading text-sm font-semibold text-[#1E293B]">
                  Opus Assistant
                  <Sparkles className="h-3 w-3 text-violet" />
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online · replies instantly
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="scroll-thin flex-1 space-y-3 overflow-y-auto p-4"
            >
              {messages.map((msg, i) => (
                <MessageBubble key={i} msg={msg} />
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-xs text-[#1E293B]/50">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-electric to-violet">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-[#1E293B]" />
                  </span>
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#1E293B]/50 [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#1E293B]/50 [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#1E293B]/50" />
                  </span>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && !loading && (
              <div className="flex flex-wrap gap-1.5 px-3 pb-2">
                {suggestions.slice(0, 3).map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-[#E2E8F0] bg-[#1E293B]/5 px-2.5 py-1 text-[11px] text-[#1E293B]/70 transition-colors hover:border-electric/40 hover:bg-electric/10 hover:text-[#1E293B]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-[#E2E8F0] p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Opus anything…"
                className="flex-1 rounded-xl border border-[#E2E8F0] bg-[#1E293B]/5 px-3.5 py-2.5 text-sm text-[#1E293B] placeholder:text-[#1E293B]/35 focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/30"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-violet text-[#1E293B] transition-all hover:shadow-[0_0_20px_-4px_rgba(59,130,246,0.7)] disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
          isUser
            ? "rounded-br-md bg-gradient-to-br from-electric to-violet text-[#1E293B]"
            : "rounded-bl-md border border-[#E2E8F0] bg-white/[0.04] text-[#1E293B]/85"
        }`}
      >
        {msg.content}
      </div>
    </motion.div>
  );
}
