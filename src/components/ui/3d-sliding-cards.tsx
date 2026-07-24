"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

/* ============================================================
   FloatingCards — 3D sliding cards carousel
   ------------------------------------------------------------
   Reference: a fan of cards arranged in 3D (rotateX/rotateY/
   rotateZ) that slides vertically on scroll. This adapted
   version also supports:
     • click-to-front  — clicking any card brings it to position 1
     • auto-advance    — cards cycle to front every `intervalMs` ms
     • custom renderer — pass a `renderCard(item, active)` function
   ============================================================ */

export type FloatingCardItem = {
  id: string | number;
  // free-form payload so callers can pass icons, titles, etc.
  [key: string]: unknown;
};

type Props<T extends FloatingCardItem> = {
  items: T[];
  /** ms between auto-advance steps (0 = disable auto-advance) */
  intervalMs?: number;
  /** pause auto-advance when the user hovers the stage */
  pauseOnHover?: boolean;
  /** custom card renderer */
  renderCard?: (item: T, active: boolean, index: number) => React.ReactNode;
  className?: string;
};

export function FloatingCards<T extends FloatingCardItem>({
  items,
  intervalMs = 2600,
  pauseOnHover = true,
  renderCard,
  className,
}: Props<T>) {
  // `front` = index of the card currently in position 1 (front of the fan)
  const [front, setFront] = useState(0);
  const [hovering, setHovering] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const len = items.length;

  const bringToFront = useCallback(
    (index: number) => {
      if (len === 0) return;
      setFront(((index % len) + len) % len);
    },
    [len]
  );

  // auto-advance
  useEffect(() => {
    if (!intervalMs || intervalMs <= 0) return;
    if (len <= 1) return;
    if (pauseOnHover && hovering) return;

    const id = window.setInterval(() => {
      setFront((f) => (f + 1) % len);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [intervalMs, hovering, pauseOnHover, len]);

  // scroll-driven vertical slide on the whole stage (matches the reference)
  useEffect(() => {
    const handleScroll = () => {
      const slider = sliderRef.current;
      if (!slider) return;

      const initialTransform =
        "translate3d(-50%, -50%, 0) rotateX(0deg) rotateY(-25deg) rotateZ(-120deg)";
      const zOffset = window.scrollY * 0.18;
      slider.style.transform = `${initialTransform} translateY(${zOffset}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (len === 0) return null;

  return (
    <div
      className={cn("floating-cards-stage", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      aria-label="3D services slider"
    >
      <div ref={sliderRef} className="slider">
        {items.map((item, i) => {
          // position in the fan (0 = front, 1 = second, ...)
          const pos = ((i - front) % len + len) % len;
          const isActive = pos === 0;
          return (
            <div
              key={item.id}
              className={cn("card", `card-pos-${pos}`, isActive && "card-active")}
              style={{ ["--pos" as string]: pos }}
              onClick={() => bringToFront(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  bringToFront(i);
                }
              }}
              aria-label={`Card ${i + 1}${isActive ? " (active)" : ""}`}
            >
              {renderCard ? (
                renderCard(item, isActive, i)
              ) : (
                <DefaultCard item={item} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DefaultCard({ item }: { item: FloatingCardItem }) {
  const title = (item.title as string) ?? `Card ${item.id}`;
  const imgSrc = item.imgSrc as string | undefined;
  return (
    <div className="relative h-full w-full">
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-slate-900 text-white">
          {title}
        </div>
      )}
    </div>
  );
}
