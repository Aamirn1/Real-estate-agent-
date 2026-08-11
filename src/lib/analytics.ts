"use client";

import { useCallback } from "react";

/* ============================================================
   Analytics — Google Analytics 4 event tracking
   ------------------------------------------------------------
   All event functions are safe no-ops if gtag is not loaded
   (e.g., during development, before GA4 is configured, or if
   the user has ad blockers enabled).

   To activate: set NEXT_PUBLIC_GA_ID in Vercel env vars
   (e.g., NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX)
   ============================================================ */

type GAEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
};

function track({ action, category, label, value }: GAEvent) {
  if (typeof window === "undefined") return;
  if (typeof (window as any).gtag !== "function") return;

  (window as any).gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}

/** Contact form submission */
export function trackContactFormSubmit() {
  track({
    action: "contact_form_submit",
    category: "engagement",
    label: "contact_page",
  });
}

/** Get Started button click (navbar, hero, pricing) */
export function trackGetStartedClick(location: string) {
  track({
    action: "get_started_click",
    category: "engagement",
    label: location,
  });
}

/** Book a Consultation / Book Demo click */
export function trackBookDemoClick(location: string) {
  track({
    action: "book_demo_click",
    category: "engagement",
    label: location,
  });
}

/** Phone number click (tel: link) */
export function trackPhoneClick() {
  track({
    action: "phone_click",
    category: "contact",
    label: "phone",
  });
}

/** Email address click (mailto: link) */
export function trackEmailClick() {
  track({
    action: "email_click",
    category: "contact",
    label: "email",
  });
}

/** Newsletter / Subscribe form submission */
export function trackNewsletterSignup() {
  track({
    action: "newsletter_signup",
    category: "engagement",
    label: "footer_subscribe",
  });
}

/** Checkout / Agreement flow started (pricing plan selected) */
export function trackCheckoutStart(plan: string) {
  track({
    action: "begin_checkout",
    category: "ecommerce",
    label: plan,
  });
}

/** AI Assistant chat opened */
export function trackAIAssistantOpen() {
  track({
    action: "ai_assistant_open",
    category: "engagement",
    label: "chat_widget",
  });
}

/** AI Assistant message sent */
export function trackAIAssistantMessage() {
  track({
    action: "ai_assistant_message",
    category: "engagement",
    label: "chat_widget",
  });
}

/** Generic CTA click tracker */
export function trackCTAClick(ctaName: string, location: string) {
  track({
    action: "cta_click",
    category: "engagement",
    label: `${ctaName} - ${location}`,
  });
}

/** Hook: returns a click handler that tracks + calls the original handler */
export function useTrackClick(event: GAEvent) {
  return useCallback(() => {
    track(event);
  }, [event]);
}
