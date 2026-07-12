import Link from "next/link";
import { ArrowRight, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-5 py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563EB]/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-[#38BDF8]/10 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="font-heading text-7xl font-bold text-[#2563EB] sm:text-9xl">
          404
        </h1>
        <h2 className="mt-4 font-heading text-2xl font-semibold text-black sm:text-3xl">
          Page Not Found
        </h2>
        <p className="mt-3 max-w-md text-base text-black/55">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#38BDF8] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(37,99,235,0.3)] transition-all hover:shadow-[0_0_32px_-4px_rgba(56,189,248,0.4)]"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#1a1a1a]/5 px-6 py-3 text-sm font-semibold text-black transition-all hover:border-[#CBD5E1] hover:bg-[#1a1a1a]/8"
          >
            <Search className="h-4 w-4" />
            Browse Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link href="/blog" className="text-[#2563EB] hover:underline">Blog</Link>
          <Link href="/pricing" className="text-[#2563EB] hover:underline">Pricing</Link>
          <Link href="/about" className="text-[#2563EB] hover:underline">About</Link>
          <Link href="/contact" className="text-[#2563EB] hover:underline">Contact</Link>
          <Link href="/faqs" className="text-[#2563EB] hover:underline">FAQs</Link>
        </div>
      </div>
    </main>
  );
}
