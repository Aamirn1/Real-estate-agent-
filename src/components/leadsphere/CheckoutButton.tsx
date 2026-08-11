"use client";

import { motion } from "framer-motion";
import { Rocket, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackCheckoutStart } from "@/lib/analytics";

/* ============================================================
   CheckoutButton
   ------------------------------------------------------------
   On click → navigates to /agreement?plan=<plan> where the
   user reviews the plan-specific Terms of Service Agreement,
   fills the sign-up form, and then proceeds to Coinbase
   Commerce payment.

   variant:
     - "solid"   : blue gradient button
     - "outline" : subtle bordered button
   ============================================================ */

type Props = {
  plan: string; // "Trial" | "Gold" | "Platinum"
  variant: "outline" | "solid";
  children: React.ReactNode;
  className?: string;
};

export function CheckoutButton({ plan, variant, children, className }: Props) {
  const href = `/agreement?plan=${encodeURIComponent(plan)}`;

  const base =
    "btn-shimmer group relative inline-flex w-full items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300";

  const variantCls =
    variant === "solid"
      ? "overflow-hidden bg-[linear-gradient(120deg,#2563EB,#38BDF8,#14B8A6)] text-white shadow-[0_0_30px_-6px_rgba(37,99,235,0.7)] hover:shadow-[0_0_45px_-4px_rgba(56,189,248,0.85)]"
      : "border border-black/15 bg-black/5 text-black backdrop-blur hover:border-black/30 hover:bg-black/10";

  return (
    <div className={cn("flex w-full mt-auto", className)}>
      <motion.a
        href={href}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => trackCheckoutStart(plan)}
        className={cn(base, variantCls)}
        aria-label={`Get started with the ${plan} plan`}
      >
        {variant === "solid" ? (
          <>
            <Rocket className="relative z-10 h-4 w-4" />
            <span className="relative z-10">{children}</span>
          </>
        ) : (
          <>
            <span className="relative z-10">{children}</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </>
        )}
      </motion.a>
    </div>
  );
}
