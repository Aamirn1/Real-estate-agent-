"use client";

import { useRef, useState, useEffect } from "react";
import { Eraser } from "lucide-react";

/* ============================================================
   SignaturePad — canvas-based drawn signature
   Exposes the drawn signature as a base64 PNG via onChange.
   ============================================================ */
export function SignaturePad({
  onChange,
  hasContent,
}: {
  onChange: (dataUrl: string | null) => void;
  hasContent: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const lastPtRef = useRef<{ x: number; y: number } | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(ratio, ratio);
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#000000";
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [enabled]);

  function getPt(e: React.PointerEvent) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  function start(e: React.PointerEvent) {
    e.preventDefault();
    if (!enabled) setEnabled(true);
    drawingRef.current = true;
    lastPtRef.current = getPt(e);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function move(e: React.PointerEvent) {
    if (!drawingRef.current) return;
    e.preventDefault();
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const pt = getPt(e);
    const last = lastPtRef.current ?? pt;
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(pt.x, pt.y);
    ctx.stroke();
    lastPtRef.current = pt;
    if (!hasContent) onChange("drawing");
  }

  function end() {
    drawingRef.current = false;
    lastPtRef.current = null;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let hasPixels = false;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] !== 0) { hasPixels = true; break; }
    }
    onChange(hasPixels ? canvas.toDataURL("image/png") : null);
  }

  function clear() {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onChange(null);
  }

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-xl border border-[#94A3B8] bg-white">
        <div className="pointer-events-none absolute inset-x-0 bottom-7 flex items-center justify-center">
          <span className="text-[11px] uppercase tracking-[0.12em] text-[#000000]/30">
            ✕ Sign above this line
          </span>
        </div>
        <canvas
          ref={canvasRef}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
          className={`block h-36 w-full touch-none ${enabled ? "cursor-crosshair" : "cursor-pointer"}`}
        />
      </div>
      <button
        type="button"
        onClick={clear}
        className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#000000]/60 transition-colors hover:text-electric"
      >
        <Eraser className="h-3.5 w-3.5" />
        Clear signature
      </button>
    </div>
  );
}
