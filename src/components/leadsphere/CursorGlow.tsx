"use client";

import { useEffect, useRef } from "react";

/** A soft glow that follows the cursor (desktop only).
 *  Optimized: uses refs + direct DOM manipulation instead of React state
 *  to avoid re-renders on every mouse move. Passive listener. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const cur = { x: -500, y: -500 };
    const tgt = { x: -500, y: -500 };

    const onMove = (e: MouseEvent) => {
      tgt.x = e.clientX;
      tgt.y = e.clientY;
      if (cur.x < -400) {
        cur.x = e.clientX;
        cur.y = e.clientY;
      }
    };

    const loop = () => {
      cur.x += (tgt.x - cur.x) * 0.12;
      cur.y += (tgt.y - cur.y) * 0.12;
      el.style.background = `radial-gradient(280px circle at ${cur.x}px ${cur.y}px, rgba(37,99,235,0.10), rgba(56,189,248,0.06) 35%, transparent 70%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-screen"
    />
  );
}
