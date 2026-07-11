import type { Metadata } from "next";
import { GetStartedForm } from "./GetStartedForm";

export const metadata: Metadata = {
  title: "Get Started | Opus Global Solution",
  description:
    "Fill out the form and our team will reach out within 24 hours to help you scale your real estate business with professional marketing and outreach support.",
};

export default function GetStartedPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-5 py-28 sm:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/15 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-violet/15 blur-[120px]" />
      </div>
      <GetStartedForm />
    </main>
  );
}
