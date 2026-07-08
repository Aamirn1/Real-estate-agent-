import type { Metadata } from "next";
import { AuthForm } from "@/components/leadsphere/AuthForm";

export const metadata: Metadata = {
  title: "Sign In — Opus Solutions",
  description: "Sign in to your Opus Solutions account.",
};

export default function SigninPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-5 py-28 sm:px-8">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/15 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-violet/15 blur-[120px]" />
      </div>
      <AuthForm mode="signin" />
    </main>
  );
}
