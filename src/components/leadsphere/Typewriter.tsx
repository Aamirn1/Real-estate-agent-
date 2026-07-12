"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  /** Static text shown before the animated portion (does not type/delete). */
  prefix?: string;
  /** Lines that cycle with the type/delete effect (shown after the prefix). */
  lines: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  className?: string;
}

/**
 * Cycles through lines with a type/delete effect.
 * If `prefix` is provided, it stays fixed and only the suffix animates.
 */
export function Typewriter({
  prefix = "",
  lines,
  typingSpeed = 55,
  deletingSpeed = 30,
  pauseTime = 1800,
  className = "",
}: TypewriterProps) {
  const [display, setDisplay] = useState({ text: "", idx: 0, deleting: false });

  useEffect(() => {
    const current = lines[display.idx % lines.length] || "";
    let timeout: ReturnType<typeof setTimeout>;

    if (!display.deleting && display.text === current) {
      timeout = setTimeout(() => {
        setDisplay((d) => ({ ...d, deleting: true }));
      }, pauseTime);
    } else if (display.deleting && display.text === "") {
      timeout = setTimeout(() => {
        setDisplay((d) => ({ text: "", idx: d.idx + 1, deleting: false }));
      }, 80);
    } else {
      timeout = setTimeout(() => {
        setDisplay((d) => {
          const cur = lines[d.idx % lines.length] || "";
          const next = d.deleting
            ? cur.substring(0, d.text.length - 1)
            : cur.substring(0, d.text.length + 1);
          return { ...d, text: next };
        });
      }, display.deleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [display, lines, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={className}>
      {prefix && <span className="text-white/90">{prefix}</span>}
      {display.text}
      <span
        className="ml-0.5 inline-block w-[2px] animate-pulse bg-current align-middle"
        style={{ height: "1em" }}
      />
    </span>
  );
}
