"use client";
import { trackPhoneClick, trackEmailClick } from "@/lib/analytics";

export function TrackablePhoneLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return <a href={href} className={className} onClick={trackPhoneClick}>{children}</a>;
}

export function TrackableEmailLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return <a href={href} className={className} onClick={trackEmailClick}>{children}</a>;
}
