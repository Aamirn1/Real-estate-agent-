"use client";

import { useMemo } from "react";

interface AnimatedBackgroundProps {
  variant?: "hero" | "section" | "ai";
  className?: string;
}

/** Layered animated background: aurora blobs, moving grid, particle dots, light rays. */
export function AnimatedBackground({
  variant = "hero",
  className = "",
}: AnimatedBackgroundProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, () => ({
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
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Aurora blobs */}
      {variant === "hero" && (
        <>
          <div className="absolute -top-40 -left-20 h-[520px] w-[520px] rounded-full bg-[#3b82f6]/25 blur-[120px] animate-aurora" />
          <div className="absolute top-10 right-0 h-[480px] w-[480px] rounded-full bg-[#8b5cf6]/22 blur-[120px] animate-aurora [animation-delay:-6s]" />
          <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[#06b6d4]/18 blur-[120px] animate-aurora [animation-delay:-12s]" />
        </>
      )}
      {variant === "ai" && (
        <>
          <div className="absolute top-1/2 left-1/4 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[#8b5cf6]/20 blur-[140px] animate-aurora" />
          <div className="absolute top-1/3 right-1/4 h-[500px] w-[500px] rounded-full bg-[#3b82f6]/16 blur-[140px] animate-aurora [animation-delay:-8s]" />
        </>
      )}
      {variant === "section" && (
        <div className="absolute top-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[#3b82f6]/12 blur-[140px] animate-aurora" />
      )}

      {/* Moving grid */}
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />

      {/* Light rays */}
      {variant === "hero" && (
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 0%, transparent 0deg, rgba(59,130,246,0.08) 60deg, transparent 120deg, rgba(139,92,246,0.08) 200deg, transparent 280deg)",
          }}
        />
      )}

      {/* Particles */}
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
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

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
    </div>
  );
}
