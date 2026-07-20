"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Rocket, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/* ============================================================
   CheckoutButton
   ------------------------------------------------------------
   Replaces the old static CtaButton on pricing cards.
   On click → POST /api/checkout { plan } → redirect to the
   Coinbase Commerce hosted checkout URL returned by the API.

   variant:
     - "solid"   : blue gradient button (matches Hero/AI-assistant
                   gradient: #2563EB -> #38BDF8 -> #14B8A6)
     - "outline" : subtle bordered button
   ============================================================ */

type Props = {
  plan: string; // "Trial" | "Gold" | "Platinum" (validated server-side)
  variant: "outline" | "solid";
  children: React.ReactNode;
  className?: string;
};

export function CheckoutButton({ plan, variant, children, className }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleCheckout() {
    if (status === "loading") return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const resp = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await resp.json().catch(() => ({}));

      if (!resp.ok || !data?.hosted_url) {
        const msg =
          data?.error ||
          (resp.status === 503
            ? "Crypto checkout is not configured yet. Please try again later or contact us."
            : "Could not start checkout. Please try again.");
        setStatus("error");
        setErrorMsg(msg);
        // auto-reset after a few seconds so the user can retry
        setTimeout(() => setStatus("idle"), 4000);
        return;
      }
      // Redirect to Coinbase Commerce hosted checkout
      window.location.href = data.hosted_url;
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  const base =
    "group relative inline-flex w-full items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed";

  const variantCls =
    variant === "solid"
      ? "overflow-hidden bg-[linear-gradient(120deg,#2563EB,#38BDF8,#14B8A6)] text-white shadow-[0_0_30px_-6px_rgba(37,99,235,0.7)] hover:shadow-[0_0_45px_-4px_rgba(56,189,248,0.85)]"
      : "border border-black/15 bg-black/5 text-black backdrop-blur hover:border-black/30 hover:bg-black/10";

  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      <motion.button
        type="button"
        onClick={handleCheckout}
        disabled={status === "loading"}
        whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
        whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
        className={cn(base, variantCls)}
        aria-label={`Pay for ${plan} plan with crypto via Coinbase Commerce`}
      >
        {variant === "solid" && status !== "loading" && (
          <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
        )}
        {status === "loading" ? (
          <>
            <Loader2 className="relative h-4 w-4 animate-spin" />
            <span className="relative">Redirecting…</span>
          </>
        ) : status === "error" ? (
          <>
            <AlertCircle className="relative h-4 w-4" />
            <span className="relative">Try again</span>
          </>
        ) : variant === "solid" ? (
          <>
            <Rocket className="relative h-4 w-4" />
            <span className="relative">{children}</span>
          </>
        ) : (
          <>
            <span>{children}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </>
        )}
      </motion.button>
      {status === "error" && errorMsg && (
        <p className="text-[11px] leading-tight text-red-500">{errorMsg}</p>
      )}
    </div>
  );
}
