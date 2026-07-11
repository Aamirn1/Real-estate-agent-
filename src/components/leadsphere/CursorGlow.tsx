"use client";

import { useEffect, useState } from "react";

/** A soft glow that follows the cursor across the page (desktop only). */
export function CursorGlow() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const cur = { x: -500, y: -500 };
    const tgt = { x: -500, y: -500 };
    let started = false;
    const onMove = (e: MouseEvent) => {
      tgt.x = e.clientX;
      tgt.y = e.clientY;
      if (!started) {
        started = true;
        cur.x = e.clientX;
        cur.y = e.clientY;
        setPos({ x: cur.x, y: cur.y });
      }
    };
    const loop = () => {
      cur.x += (tgt.x - cur.x) * 0.12;
      cur.y += (tgt.y - cur.y) * 0.12;
      setPos({ x: cur.x, y: cur.y });
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!pos) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-screen"
      style={{
        background: `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, rgba(37,99,235,0.10), rgba(56,189,248,0.06) 35%, transparent 70%)`,
      }}
    />
  );
}
