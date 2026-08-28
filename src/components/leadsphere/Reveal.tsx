"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

/** Scroll-reveal wrapper — GPU-optimized (transform + opacity only, no blur).
 *
 * On mobile (width < 768px), the fade-in animation is disabled and content
 * is shown immediately. This improves mobile page load perception — the
 * fade-in delay makes content feel slow to appear on small screens.
 * Desktop keeps the full fade-in animation.
 * Main section animations (e.g. VA service card carousel, service grid
 * hover effects) are NOT affected — those use their own motion components,
 * not this Reveal wrapper.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
}: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-12% 0px" });

  // Detect mobile viewport — disable fade-in on mobile for faster perceived load
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  // On mobile: skip animation, show immediately
  if (isMobile) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
