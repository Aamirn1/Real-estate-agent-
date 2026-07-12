"use client";

import { useMemo } from "react";

interface AnimatedBackgroundProps {
  variant?: "hero" | "section" | "ai";
  className?: string;
}

/** Layered animated background: aurora blobs, moving grid, particle dots, light rays.
 *  Optimized: reduced particle count, GPU-only animations, reduced-motion support. */
export function AnimatedBackground({
  variant = "hero",
  className = "",
}: AnimatedBackgroundProps) {
  // Reduced particle count (28 -> 12) for better performance
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 6,
        dur: Math.random() * 8 + 6,
        op: Math.random() * 0.4 + 0.1,
      })),
    []
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden motion-reduce:animate-none ${className}`}
    >
      {/* Base gradient */}
      <div className={`absolute inset-0 ${variant === "hero" ? "bg-transparent" : "bg-white"}`} />

      {/* Aurora blobs — GPU-accelerated via transform/opacity only */}
      {variant === "hero" && (
        <>
          <div className="absolute -top-40 -left-20 h-[520px] w-[520px] rounded-full bg-[#2563EB]/25 blur-[120px] animate-aurora will-change-transform" />
          <div className="absolute top-10 right-0 h-[480px] w-[480px] rounded-full bg-[#38BDF8]/22 blur-[120px] animate-aurora [animation-delay:-6s] will-change-transform" />
          <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[#14B8A6]/18 blur-[120px] animate-aurora [animation-delay:-12s] will-change-transform" />
        </>
      )}
      {variant === "section" && (
        <div className="absolute top-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[#2563EB]/12 blur-[140px] animate-aurora will-change-transform" />
      )}

      {/* Moving grid */}
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />

      {/* Particles — fewer for performance, transform-only animation */}
      <div className="absolute inset-0 motion-reduce:hidden">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white will-change-transform"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              opacity: p.op,
              animation: `float-y ${p.dur}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Bottom fade */}
      <div className={`absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t ${variant === "hero" ? "from-[#050505]" : "from-white"} to-transparent`} />
    </div>
  );
}
