/** Reusable logo mark — circular emblem with building towers (matching reference logo). */
export function LogoIcon({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="oi-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      {/* Partial circular ring (open at bottom) */}
      <path
        d="M 32 6 A 26 26 0 1 1 14 49"
        fill="none"
        stroke="url(#oi-ring)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Left building (shorter, wider, dark blue) */}
      <rect x="21" y="26" width="9" height="20" rx="1.5" fill="#1e3a8a" />
      {/* Right building (taller, narrower, bright blue) */}
      <rect x="33" y="20" width="9" height="26" rx="1.5" fill="#3b82f6" />
      {/* Wave base connecting ring ends */}
      <path
        d="M 14 50 Q 24 47 32 50 T 50 50"
        fill="none"
        stroke="url(#oi-ring)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The actual reference logo image (icon + stacked OPUS / GLOBAL SOLUTION text), optimized for dark backgrounds. */
export function LogoImage({
  className = "h-9",
}: {
  className?: string;
}) {
  return (
    <img
      src="/logo-dark.png"
      alt="Opus Global Solution"
      className={className}
    />
  );
}

/** Stacked wordmark: "OPUS" (gradient, large) over "GLOBAL SOLUTION" (gray, small, letter-spaced). */
export function LogoWordmark({
  className = "",
  opusClassName = "text-lg",
  subClassName = "text-[9px]",
}: {
  className?: string;
  opusClassName?: string;
  subClassName?: string;
}) {
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span
        className={`font-heading font-bold tracking-tight ${opusClassName} bg-clip-text text-transparent`}
        style={{ backgroundImage: "linear-gradient(90deg, #7c3aed, #2563eb)" }}
      >
        OPUS
      </span>
      <span
        className={`font-heading font-medium uppercase text-[#1a1a1a]/45 ${subClassName}`}
        style={{ letterSpacing: "0.18em" }}
      >
        Global Solution
      </span>
    </span>
  );
}
