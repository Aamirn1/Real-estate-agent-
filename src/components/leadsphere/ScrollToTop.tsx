"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

/** Fixed scroll-to-top button on the bottom-left. Appears after scrolling down. */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={toTop}
          aria-label="Scroll to top"
          className="group fixed bottom-5 left-5 z-[65] flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-[#f8f9fa]/90 text-[#1a1a1a] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all hover:border-electric/40 hover:bg-[#f1f3f5] hover:shadow-[0_0_24px_-6px_rgba(37,99,235,0.7)] sm:bottom-6 sm:left-6"
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-electric/0 to-[#38BDF8]/0 transition-all group-hover:from-electric/15 group-hover:to-[#38BDF8]/15" />
          <ArrowUp className="relative h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
          {/* progress ring hint */}
          <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/5 transition group-hover:ring-electric/20" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
