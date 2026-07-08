"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
        >
          {/* Ambient glow */}
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/20 blur-[120px]" />

          {/* Animated logo mark */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Orbit rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 -m-10"
            >
              <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_12px_#06b6d4]" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 -m-16"
            >
              <div className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-violet shadow-[0_0_12px_#8b5cf6]" />
            </motion.div>

            {/* Core orb */}
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-electric via-violet to-cyan shadow-[0_0_50px_-8px_rgba(59,130,246,0.8)]"
            >
              <Sparkles className="h-9 w-9 text-white" strokeWidth={2.2} />
            </motion.div>
          </motion.div>

          {/* Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative mt-8 text-center"
          >
            <div className="font-heading text-2xl font-semibold tracking-tight text-white">
              Opus<span className="text-electric"> Solutions</span>
            </div>
            <div className="mt-1 text-xs text-white/40">More listings. Powered by Opus.</div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative mt-8 h-0.5 w-44 overflow-hidden rounded-full bg-white/10"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full rounded-full bg-gradient-to-r from-electric via-violet to-cyan"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
