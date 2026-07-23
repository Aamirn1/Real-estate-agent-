"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
];

// Routes that render a dark hero image behind the navbar.
// On these pages the navbar starts transparent (like the home page)
// and only switches to the solid glass background once the user scrolls.
const HERO_IMAGE_ROUTES = [
  "/services",
  "/testimonials",
  "/pricing",
  "/blog",
  "/about",
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const hasHeroImage = HERO_IMAGE_ROUTES.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparent navbar at the top of the home page and any page with a hero image.
  // Switches to solid glass once scrolled or when the mobile menu is open.
  const useDark = !(isHome || hasHeroImage) || scrolled || open;

  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3"
    >
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5",
          useDark
            ? "glass-strong shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]"
            : "border border-transparent bg-transparent"
        )}
      >
        {/* Logo — white text on home hero (dark bg), dark text on sub-pages or when scrolled */}
        <a href="/" className="group flex items-center transition-transform group-hover:scale-[1.02]">
          <img
            src={useDark ? "/logo-light.png" : "/logo-dark.png"}
            alt="Opus Global Solution"
            className="h-10 sm:h-12"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  useDark
                    ? isActive
                      ? "text-[#2563EB]"
                      : "text-black hover:text-black"
                    : isActive
                      ? "text-[#38BDF8]"
                      : "text-white/90 hover:text-white"
                )}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href="/get-started"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#2563EB] to-[#38BDF8] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(37,99,235,0.7)] transition-all hover:shadow-[0_0_30px_-4px_rgba(56,189,248,0.8)]"
          >
            <span className="relative z-10">Get Started</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:hidden",
            useDark ? "text-black hover:bg-black/5" : "text-white hover:bg-white/10"
          )}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu — solid panel beneath the options only (navbar stays visible) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-4 top-[68px] z-50 md:hidden"
          >
            <div className="rounded-2xl border border-black/15 bg-white p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-[#2563EB]/10 text-[#2563EB]"
                        : "text-black hover:bg-black/5 hover:text-black"
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 -rotate-90",
                        isActive ? "text-[#2563EB]" : "text-black/30"
                      )}
                    />
                  </a>
                );
              })}
              <div className="mt-2 border-t border-black/15 pt-3">
                <a
                  href="/get-started"
                  onClick={() => setOpen(false)}
                  className="block rounded-xl bg-gradient-to-r from-[#2563EB] to-[#38BDF8] px-4 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
