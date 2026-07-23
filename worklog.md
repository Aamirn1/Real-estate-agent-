# LeadSphere AI — Worklog & Design System

## Project Overview
Building "LeadSphere AI" — a premium AI-powered Real Estate Lead Generation SaaS landing page. Single route `/` in `src/app/page.tsx`. Dark luxury SaaS aesthetic.

## Design System (ALL AGENTS MUST FOLLOW)

### Theme
- Deep black base `#050505`, dark graphite `#0d0d10`
- Accent palette (use as Tailwind arbitrary values or theme colors):
  - Electric blue `#3b82f6` → `bg-electric`, `text-electric`
  - Violet `#8b5cf6` → `bg-violet`, `text-violet`
  - Cyan `#06b6d4` → `bg-cyan`, `text-cyan`
  - Gold `#d4af37` → `text-gold` (premium badges ONLY)
- White text `#f5f5f7`, muted `text-white/55`, `text-white/70`

### Typography
- Headings: `font-heading` class (Space Grotesk) — use `font-heading` on h1-h6
- Body: default `font-body` (Inter)
- Numbers: add `tnum` class for tabular nums

### Shared primitives (IMPORT from these, do NOT recreate)
```tsx
import { GlassCard, CountUp, SectionHeading, SectionShell } from "@/components/leadsphere/primitives";
import { Reveal } from "@/components/leadsphere/Reveal";
import { TiltCard } from "@/components/leadsphere/TiltCard";
import { MagneticButton } from "@/components/leadsphere/MagneticButton";
import { AnimatedBackground } from "@/components/leadsphere/AnimatedBackground";
```
- `GlassCard` props: `{ className?, strong?, sheen?, children }`
- `CountUp` props: `{ value, duration?, decimals?, prefix?, suffix?, className? }`
- `SectionHeading` props: `{ eyebrow?, title, description?, align?: 'left'|'center', className? }`
- `SectionShell` props: `{ children, className?, id? }` — use to wrap each section
- `Reveal` props: `{ children, className?, delay?, y? }` — scroll reveal wrapper

### Glassmorphism utility classes (in globals.css)
- `.glass` — subtle glass
- `.glass-strong` — darker strong glass
- `.glass-card` — gradient glass card
- `.glass-sheen` — add reflection sheen (use as wrapper)

### Animation classes (in globals.css)
- `.animate-aurora`, `.animate-float-y`, `.animate-float-y-slow`, `.animate-pulse-ring`
- `.animate-shimmer`, `.animate-gradient-x`, `.animate-spin-slow`, `.animate-marquee`, `.animate-orb-breathe`
- `.bg-grid`, `.bg-grid-fade`, `.noise`

### Gradient text helpers
- `.text-gradient` — white→indigo→cyan
- `.text-gradient-electric` — blue→violet→cyan

### Glow helpers
- `.glow-electric`, `.glow-violet`, `.glow-soft`, `.text-glow`

### Existing shadcn/ui components available
All in `src/components/ui/`. Common: button, card, tabs, accordion, badge, avatar, input, textarea, progress, slider, tooltip, dialog, sheet, carousel, etc. Prefer these over custom.

### Tech
- Next.js 16 App Router, TypeScript, Tailwind CSS 4, framer-motion (motion), lucide-react icons, recharts for charts
- All section components MUST start with `"use client";`
- Mobile-first responsive. Use `sm:`, `md:`, `lg:` breakpoints
- Use framer-motion `whileInView` with `viewport={{ once: true }}` for scroll animations

### File naming
Each section lives in `src/components/leadsphere/sections/<SectionName>.tsx` and exports a default component.

---
Task ID: 0
Agent: orchestrator
Task: Set up foundation & design system

Work Log:
- Updated layout.tsx with Space Grotesk + Inter fonts, dark theme class on html
- Wrote globals.css with full dark luxury theme, glassmorphism utilities, animation keyframes
- Created core hooks: useMouseParallax, useInView, useCountUp in src/lib/leadsphere/hooks.ts
- Created primitives.tsx: GlassCard, CountUp, SectionHeading, SectionShell
- Created Reveal.tsx, TiltCard.tsx, MagneticButton.tsx, CursorGlow.tsx, AnimatedBackground.tsx
- Dev server running on port 3000

Stage Summary:
- Design system ready. Subagents should import shared primitives and follow the design system above.
- Sections to be built by subagents in parallel, then assembled in page.tsx.

---
Task ID: 2
Agent: full-stack-developer
Task: Build Interactive Demo section (tabbed SaaS dashboard)

Work Log:
- Read worklog.md and primitives.tsx to align with design system (glass-strong, bg-electric/violet/cyan/gold tokens, tnum, font-heading)
- Created /src/components/leadsphere/sections/InteractiveDemo.tsx (default export, "use client")
- Built a glass-strong rounded-3xl panel with a fake browser top bar (red/yellow/green dots, app.leadsphere.ai/dashboard URL pill with live indicator, gradient avatar)
- Added a md+ left sidebar (hidden on mobile) with 8 lucide nav icons (LayoutDashboard, Users, Map, BarChart3, Mail, Phone, Calendar, FileText) using SidebarIcon subcomponent; active item uses bg-electric with glow and hover tooltip
- Used shadcn Tabs (Tabs/TabsList/TabsTrigger/TabsContent) with 6 tabs: CRM, Pipeline, Lead Map, Analytics, Marketing, Dialer; tab bar scrolls horizontally on mobile (no-scrollbar); active trigger uses electric bg + glow
- Tracked active tab via onValueChange; wrapped each TabsContent in motion.div key={tab} with initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.3}} for animated content swap
- CRM tab: shadcn Table with 6 realistic leads, status badges (per-tone color), score progress bars (gradient), search Input filtering by name
- Pipeline tab: 4-column Kanban (New/Contacted/Appointment/Closed) with colored top borders + glow per column, 2-3 avatar cards each, hover lift
- Lead Map tab: stylized dark grid panel with 8 MapPin pins (colored glows + hover price tooltips), 2 cluster circles with counts, legend, and a heatmap toggle pill that toggles blurred heat blobs
- Analytics tab: 3 KPI tiles using CountUp (Total Leads 12,840 / Conversion 92% / Revenue $4.2M), recharts AreaChart (electric→violet gradient fill + stroke) and BarChart (conversions by source) — grid strokes rgba(255,255,255,0.06), ticks rgba(255,255,255,0.4) fontSize 11, transparent bg
- Marketing tab: left column 3 active campaigns (channel badge Email/SMS, Progress bar, sent count), right column glass-strong email preview card (subject, body, Send Campaign button with electric glow)
- Dialer tab: center contact card with avatar + pulse-ring animation (animate-pulse-ring), John Reynolds, $1.45M property, circular green call button with glow, call stats row (47/31/4:22), recent calls list with status badges, next-in-queue footer
- Set dashboard content area to h-[460px] md:h-[552px] with scroll-thin overflow; whole panel capped reasonably via internal scroll; mobile-first responsive (sidebar hidden, tabs scroll, charts full-width, grids stack)
- Updated /src/app/page.tsx to render InteractiveDemo for live preview validation
- Verified: dev.log shows "✓ Compiled in 5s", curl returns HTTP 200; lint clean on new files (only pre-existing CursorGlow.tsx error remains, unrelated)

Stage Summary:
- InteractiveDemo section complete and rendering on `/` (HTTP 200, compiles in 5s)
- Real, fully interactive dashboard with 6 working tabs, framer-motion transitions, recharts charts, CountUp KPIs, pulse-ring dialer animation, heatmap toggle, and live CRM search — all following the dark luxury glass design system
- Ready for orchestrator to compose alongside other sections in page.tsx

---
Task ID: 1
Agent: full-stack-developer
Task: Build Trust, Stats, Features sections

Work Log:
- Read worklog.md to absorb the design system (dark theme, electric/violet/cyan/gold palette, glassmorphism utilities, shared primitives API).
- Inspected primitives.tsx (GlassCard, CountUp, SectionHeading, SectionShell) and Reveal.tsx to confirm prop signatures before usage.
- Verified all 16 required lucide-react icons exist (Sparkles, Clock, Home, Map, Search, LayoutDashboard, Phone, Mail, MessageSquare, BellRing, BarChart3, UsersRound, Database, TrendingUp, Users, Network).
- Created /src/components/leadsphere/sections/TrustStatsFeatures.tsx with three stacked sections wrapped in a <> fragment:
  1. TrustSection — "Trusted by 50,000+ real estate professionals" label, 8 stylized wordmark logos (each with a bespoke geometric SVG Mark + cycled electric/violet/cyan hover accent). Mobile uses a duplicated-content `.animate-marquee` track; desktop uses a static `justify-between` row. Edge-faded with a linear-gradient mask. Wrapped in Reveal.
  2. StatsSection — SectionHeading (eyebrow "By the Numbers", title "Metrics that move your pipeline"), 4 GlassCards in a 1/2/4-col responsive grid. Each card: colored glowing icon square (Database/TrendingUp/Users/Network), big CountUp number (250M+, 92%, 50K+, 100+), label, and an accent progress bar. Cards lift (-2) on hover via framer-motion whileHover with matching border glow. Ambient electric orb behind.
  3. FeaturesSection — SectionHeading (eyebrow "Platform", title "Everything you need to fill your pipeline", description "Twelve powerful tools..."). 12 GlassCards in 1/2/3-col grid, each with colored gradient icon square (cycled electric/violet/cyan), index badge "01"–"12", title, description, and a hover-reveal accent line that wipes to full width. Wrapped in SectionShell. Each card wrapped in Reveal with staggered delay (index * 0.05) and motion.div whileHover lift (-4). Two ambient violet/cyan orbs for depth.
- Built a THEME token map with fully static Tailwind class strings (text-electric, bg-violet/15, hover:border-cyan/40, etc.) so the Tailwind v4 scanner picks them up; color cycling done by indexing the map, not template strings.
- Temporarily wired TrustStatsFeatures into page.tsx (below InteractiveDemo) to validate compile + render, then confirmed via dev.log and HTML grep that all section copy (Trusted by, By the Numbers, Metrics that move, Everything you need, AI Lead Discovery, Lead Records, MLS Integrations) renders server-side with HTTP 200 and clean compile.
- Ran `bun run lint` — no errors in the new file (only a pre-existing error in CursorGlow.tsx from Task 0, unrelated).

Stage Summary:
- TrustStatsFeatures.tsx complete and verified rendering on `/`. Exports default `TrustStatsFeatures` rendering Trust + Stats + Features sections in a fragment.
- Uses shared primitives (GlassCard, CountUp, SectionHeading, SectionShell, Reveal), framer-motion whileHover, lucide-react icons, and the electric/violet/cyan/gold theme per the design system.
- Page.tsx currently renders InteractiveDemo + TrustStatsFeatures stacked; orchestrator may reorder/assemble with other sections as needed.
- All three sections are mobile-first responsive (1/2/4-col stats, 1/2/3-col features, marquee-on-mobile trust row) with glassmorphism, subtle glows, and staggered scroll reveals.

---
Task ID: 4
Agent: full-stack-developer
Task: Build CRM Kanban, Integrations, Testimonials

Work Log:
- Read worklog.md + primitives.tsx + Reveal.tsx + carousel.tsx to confirm exact APIs and theme tokens (electric/violet/cyan/gold).
- Created src/components/leadsphere/sections/CrmIntegrationsTestimonials.tsx exporting default `CrmIntegrationsTestimonials` (three stacked sections).
- Section 1 — CRM Kanban (id="crm"): real cross-column drag-and-drop using @dnd-kit (DndContext + closestCorners + PointerSensor with 6px activation, useSortable per card, SortableContext + verticalListSortingStrategy per column, useDroppable per column, arrayMove for reorders). 5 columns (New/Contacted/Appointment/Negotiation/Closed) with colored dots + count badges; 10 sample leads (2 per column) as glass cards with gradient initial avatars, property value, score pill (color by score), and tag pill. DragOverlay renders a rotated/elevated clone; dragging card lifts with -rotate-1 scale-1.03 ring + shadow. Horizontal scroll on mobile with custom gradient scrollbar.
- Section 2 — Integrations (id="integrations"): 12 glass logo cards (Google, Microsoft, Zapier, Slack, Zoom, Calendly, HubSpot, Salesforce, MLS, Twilio, Stripe, Mailchimp) in a 3/4/6-col responsive grid. Each card uses a distinct hex color, colored lucide icon in tinted rounded square, name below. Hover lifts (-translate-y-1.5) + per-color border/shadow glow + icon scale-110. Reveal wrapper with staggered delay = index * 0.04.
- Section 3 — Testimonials (id="testimonials"): shadcn Carousel with loop:true + align:center, 5s autoplay (pause on hover), 5 realistic testimonials. Each slide = large strong glass card (max-w-3xl, centered) with 5 gold filled stars, large quote (text-xl/2xl font-heading), gradient divider, gradient avatar w/ initials + name + role + electric BadgeCheck "verified". Premium non-functional Play button overlay (top-right) with pulsing motion ring. Custom dark-theme dot indicators (active = electric with glow, wider) wired to api.scrollTo.
- Added `.custom-scroll` utility to globals.css (thin gradient scrollbar for the kanban horizontal scroll).
- Wired CrmIntegrationsTestimonials into src/app/page.tsx so it renders on `/`.
- Fixed lucide import: `Window` is not exported by lucide-react@0.525 → aliased `AppWindow as WindowIcon` (verified all icons present via node check).
- Fixed lint: deferred carousel api state sync with queueMicrotask to satisfy react-hooks/set-state-in-effect rule. My file now lints clean (only pre-existing CursorGlow.tsx error from Task 0 remains).
- Verified dev server: GET / 200, SSR compiles and renders without errors.

Stage Summary:
- One file delivered: src/components/leadsphere/sections/CrmIntegrationsTestimonials.tsx (default export `CrmIntegrationsTestimonials`).
- Kanban DnD is genuinely functional — cards move/reorder across all 5 columns; logic handles same-column reorder (arrayMove), cross-column drop on a card (insert at index), and drop on empty column area (append).
- Integrations grid + testimonials carousel are responsive, animated, and on-theme (dark luxury, electric/violet/cyan/gold accents).
- Page renders 200 on `/`; component is lint-clean. Ready for orchestrator to keep/adjust placement in page.tsx.

---
Task ID: 3
Agent: full-stack-developer
Task: Build AI section, Process timeline, Interactive Map

Work Log:
- Read worklog.md + reviewed primitives, Reveal, AnimatedBackground, hooks, globals.css to match the shared design system.
- Created src/components/leadsphere/sections/AiProcessMap.tsx ("use client") exporting default AiProcessMap (3 stacked sections).
- Section 1 (AI Assistant, id="ai"): AnimatedBackground variant="ai" + custom NeuralNetwork (12 dot nodes in %, 17 SVG lines with non-scaling-stroke, framer-motion pulse). Centered AiOrb: 180px radial-gradient (electric→violet→cyan), .animate-orb-breathe, 3 rotating dashed rings (.animate-spin-slow, varied duration/direction), 3 pulse-ring circles, specular highlight, floating "Live · 1,247 leads" badge. Orb translates via useMouseParallax. SectionHeading center + 8 glass feature pills (2/4 grid, staggered Reveal, hover glow).
- Section 2 (Process, id="process"): SectionHeading + 5 steps (Find Leads/Search, Verify/BadgeCheck, Outreach/Send, Appointments/CalendarCheck, Close/Trophy). Desktop = horizontal 5-col grid with glowing gradient base line + framer-motion shimmer comet. Mobile = vertical stack with left vertical gradient line + vertical comet. Gradient numbered circles with glow, staggered Reveal.
- Section 3 (Map, id="map"): Large GlassCard panel = left filter sidebar (w-60) + map canvas (flex-1). Sidebar: header, working search input, 5 clickable filter chips (All/Motivated/Expired/FSBO/High Value) with active gradient+ring state + counts. Canvas: tilted (perspective rotateX 7deg) backdrop with dotted grid, stylized SVG NA landmass, 3 blurred heatmap blobs. Flat pins layer: 12 MapPin pins (colored per type, drop-shadow glow, pulse ring at tip), hover/tap tooltip (address+value+type) with arrow, dim non-matching pins when filter/search active. 3 cluster circles (248/156/92) with pulse+glow. Top-right glass legend. Bottom-left live status chip. Pure CSS/SVG/divs.
- Wired AiProcessMap into src/app/page.tsx (between TrustStatsFeatures and CrmIntegrationsTestimonials).
- Verified: eslint on file = 0 errors; tsc --noEmit = clean; dev server HTTP 200; SSR HTML contains id="ai"/"process"/"map" + all headlines.

Stage Summary:
- AiProcessMap.tsx complete and live on /. Three premium dark-glass sections with glows, framer-motion, full mobile responsiveness, and an interactive map (filter chips + search both dim non-matching pins live). ~12-node neural net + 12 pins + 3 clusters + 3 heatmap blobs — performance-conscious. No external map libs. Ready for orchestrator assembly.

---
Task ID: 5
Agent: full-stack-developer
Task: Build Pricing, FAQ, CTA banner, Footer

Work Log:
- Read worklog.md to learn the design system (dark luxury theme, glass utilities, brand palette, shared primitives).
- Inspected primitives.tsx (GlassCard/CountUp/SectionHeading/SectionShell), Reveal.tsx, MagneticButton.tsx, shadcn accordion.tsx + switch.tsx, and globals.css to confirm available classes (.glass-strong, .animate-gradient-x, .text-glow, .gradient-border, brand color vars).
- Verified lucide-react exports needed (Twitter, Linkedin, Instagram, Youtube, Github, Orbit, Check, ChevronDown, Sparkles, ArrowRight, Rocket, Calendar, ShieldCheck, Send, Star) all present.
- Created `src/components/leadsphere/sections/PricingFaqCtaFooter.tsx` exporting default `PricingFaqCtaFooter` that stacks 4 sections:
  1. Pricing (SectionShell id="pricing"): SectionHeading + Switch-based monthly/annual toggle (annual = ~20% off, "Save 20%" badge) + 3 glass-strong cards. Starter ($49/$39, outline CTA), Professional ($149/$119) highlighted center card with gold "Most Popular" badge, animated gradient border (wrapper div with animate-gradient-x + glass-strong inner), lg:scale-[1.04] + z-10 + ambient glow, solid electric-gradient CTA button with shimmer sweep + glow. Enterprise (Custom, ghost CTA). Feature lists use Check icons in electric pill circles. CountUp animates prices (keyed by billing cycle to re-animate on toggle). Reveal staggered delays. Card grid items-stretch + h-full for equal heights.
  2. FAQ (SectionShell id="faq"): SectionHeading center + shadcn Accordion type="single" collapsible (first item open by default). Each AccordionItem styled as glass-strong card with border; default chevron hidden via [&>svg:last-child]:hidden, custom ChevronDown in a circle that rotates 180deg + turns electric via group-data-[state=open]. 7 realistic Q&As (trial length, MLS coverage, data accuracy, cancel anytime, team seats, AI features, integrations). Reveal stagger. Bonus "Still have questions?" contact strip.
  3. CTA Banner: edge-to-edge section (NOT inside SectionShell max-w) with rounded-3xl container. Animated gradient bg (electric→violet→cyan, animate-gradient-x), moving grid overlay (masked), dark scrim for contrast, top glow + side orbs. Centered eyebrow pill "Ready to scale?", huge headline "Ready to close more listings?" (font-heading, text-4xl→6xl, text-glow), subtext, two magnetic-feel buttons (Book Demo = white/outline hover glow; Start Free Trial = dark solid #050505 with white glow). py-16 md:py-24.
  4. Footer: dark #070709, gradient divider line at top (electric→violet→cyan) + faint top glow. Top row: LogoMark (rounded-xl gradient square + Orbit icon + "LeadSphere AI" wordmark) + tagline + 5 social icons in glass circles (hover lift + electric). Right: newsletter glass input + electric-gradient Subscribe button + helper text. Middle: 5 link columns (Product, Solutions, Resources, Company, Legal) with white/55 hover:white links. Bottom bar: copyright + "Made with AI" (ShieldCheck) + "System status: Operational" pill with animated pinging green dot. Footer naturally sits at page bottom, no extra gap.
- Added PricingFaqCtaFooter to src/app/page.tsx (appended after the 4 existing sections) so it renders and could be verified; orchestrator can finalize ordering.
- Ran `bun run lint` — my file passes with 0 errors (only pre-existing CursorGlow.tsx set-state-in-effect warning remains, not my file).
- Ran `npx tsc --noEmit` — no type errors in my file.
- Verified dev server: page returns HTTP 200 with my component included (SSR render ~337ms), no errors mentioning PricingFaqCtaFooter in dev.log.

Stage Summary:
- PricingFaqCtaFooter.tsx complete (~660 lines). All 4 sections built with dark glassmorphism, brand colors (electric/violet/cyan + gold for the Most Popular badge), CountUp animated prices, Reveal staggered scroll-ins, framer-motion hover/tap micro-interactions, and full mobile-first responsiveness.
- Lint clean, types clean, renders 200 with no runtime errors.
- File exports default `PricingFaqCtaFooter`; orchestrator can import from `@/components/leadsphere/sections/PricingFaqCtaFooter`.

---
Task ID: 6
Agent: orchestrator
Task: Build Navbar, Hero, portfolio features (AI Assistant, ROI calculator, before/after, loading screen), assemble page.tsx, verify with Agent Browser

Work Log:
- Built Navbar.tsx: scroll-aware glass styling, desktop nav links, mobile menu with AnimatePresence, gradient logo mark, CTA buttons with shimmer sweep
- Built Hero.tsx: split layout, "More Listings. Powered by AI." heading with gradient + glow, dual CTAs (magnetic), floating 3D dashboard with 6 glass cards (main panel with KPIs+chart+pipeline, lead notification, mini analytics donut, AI assistant bubble, activity timeline, property pin) all with mouse-parallax depth layers and float animations, AnimatedBackground hero variant (aurora blobs, grid, particles, light rays, noise)
- Built LoadingScreen.tsx: branded 3D animation with orbiting rings, breathing orb, gradient progress bar, wordmark
- Built AI Assistant: /api/ai-assistant/route.ts (z-ai-web-dev-sdk LLM with system prompt for lead qualification, in-memory session store, suggestion generator) + AiAssistantWidget.tsx (floating launcher with pulse, chat panel with message bubbles, typing indicator, quick-prompt suggestions, error handling)
- Built RoiCalculator.tsx: 3 interactive sliders (leads, commission, close rate) with custom gradient thumbs, live computed results (listings, revenue, cost, profit, ROI multiple) with CountUp animation, electric/violet/cyan theming
- Built BeforeAfter.tsx: traditional vs AI-powered comparison with staggered reveal, center gradient arrow, result cards (2 vs 8 listings/mo, +300%)
- Assembled page.tsx: LoadingScreen, CursorGlow, Navbar, Hero, TrustStatsFeatures, InteractiveDemo, BeforeAfter, AiProcessMap, CrmIntegrationsTestimonials, RoiCalculator, PricingFaqCtaFooter, AiAssistantWidget
- Fixed CursorGlow lint error (setState-in-effect) by gating render on pos state
- Verified with Agent Browser: HTTP 200, all sections render, demo tabs work (CRM + Analytics), AI Assistant sends message and receives LLM response (recommended Professional plan for 5-agent team), FAQ accordion opens, pricing toggle clickable, mobile responsive (390px) with working mobile menu, footer at bottom, no runtime errors, lint clean

Stage Summary:
- Site fully functional and verified end-to-end via Agent Browser
- LLM-backed AI Assistant confirmed working (POST /api/ai-assistant 200, relevant responses)
- All 16+ sections rendering: Hero, Trust, Stats, Features, Interactive Demo (6 tabs), Before/After, AI Assistant section, Process timeline, Interactive Map, CRM Kanban (drag-drop), Integrations, Testimonials (carousel), ROI Calculator, Pricing (3 tiers + toggle), FAQ, CTA banner, Footer
- Portfolio enhancements delivered: AI conversational assistant, ROI calculator, before/after comparison, branded loading screen, live KPI dashboard, 3D-ish interactive map
- Lint: 0 errors. Dev server: clean, no runtime errors.

---
Task ID: 2
Agent: rebrand-editor
Task: Rebrand "LeadSphere AI" → "Opus Solutions" and remove all user-visible "AI" mentions from 3 section files

Work Log:
- Read worklog.md to align with the design system and prior agent work.
- Read all 3 target files: TrustStatsFeatures.tsx, BeforeAfter.tsx, RoiCalculator.tsx.

- File 1 — TrustStatsFeatures.tsx:
  - Renamed feature "AI Lead Discovery" → "Lead Discovery" (icon/color unchanged).
  - Renamed feature "AI Follow-up" → "Smart Follow-up" (icon/color unchanged).
  - Audited all 12 feature descriptions, stats labels, and trust copy — no other AI/LeadSphere mentions found.
  - File had no "LeadSphere" mentions to begin with (branding lives in Navbar/Hero/Footer, not this file).

- File 2 — BeforeAfter.tsx:
  - Title: "Traditional prospecting vs. AI-powered" → "Traditional prospecting vs. Opus-powered".
  - Description: "Let AI do the heavy lifting" → "Let Opus do the heavy lifting".
  - AI_POWERED array item 1: "AI finds motivated sellers automatically" → "Opus finds motivated sellers automatically".
  - AI_POWERED array item 3: "AI-triggered follow-ups at the perfect moment" → "Smart-triggered follow-ups at the perfect moment".
  - After-card heading: "The LeadSphere way" → "The Opus way".
  - After-card badge: "AI-Powered" → "Opus-Powered".
  - NOTE: Variable/array name `AI_POWERED` was intentionally NOT changed (internal identifier, not user-visible), per rule #3.

- File 3 — RoiCalculator.tsx:
  - Section description: "with LeadSphere AI" → "with Opus Solutions".
  - Helper text: "LeadSphere agents average" → "Opus agents average"; "thanks to AI lead scoring" → "thanks to smart lead scoring".
  - ROI multiple helper: "For every $1 spent on LeadSphere" → "For every $1 spent on Opus".
  - CTA "Start your free trial" left untouched as instructed.
  - No wordmark `<span class="text-electric"> AI</span>` pattern existed in this file; brand name already inline in prose.

- Verification:
  - Ripgrep for `\b(AI|Ai)\b` in all 3 files: 0 matches.
  - Ripgrep for `LeadSphere` in all 3 files: 0 matches.
  - Ripgrep for `Sphere` in all 3 files: 0 matches (no standalone "LeadSphere" lingering).
  - `bun run lint` → exit 0, zero errors/warnings introduced.
  - No file names, component function names, import paths, CSS class names, or variable names (including `AI_POWERED`) were changed. Icons, colors, glassmorphism styling, framer-motion animations, CountUp, Reveal, and all feature functionality remain intact.

Stage Summary:
- All 3 files rebranded to "Opus Solutions" with zero user-visible "AI" text remaining.
- Brand voice preserved contextually ("Opus-powered", "Smart Follow-up", "smart lead scoring", "The Opus way", "Opus finds motivated sellers", "Opus agents average").
- Lint clean (exit 0). Premium dark design system untouched. Ready for orchestrator review.

---
Task ID: 3
Agent: full-stack-developer
Task: Rebrand "LeadSphere AI" → "Opus Solutions" and strip all user-visible "AI" text from InteractiveDemo.tsx and CrmIntegrationsTestimonials.tsx

Work Log:
- Read worklog.md to absorb the design system + history (kept dark luxury glass aesthetic, electric/violet/cyan/gold palette, all features intact).
- Read both target files in full (~1058 lines InteractiveDemo.tsx, ~797 lines CrmIntegrationsTestimonials.tsx).
- Grepped both files for AI|LeadSphere|Sphere and for word-boundary \bAI\b|\bai\b|\bAi\b to enumerate every user-visible brand/AI mention (excluding names like "Aisha", "Bailey", "Nair" and channel words like "Mail"/"Email" which are letters-within-words, not the AI acronym).
- InteractiveDemo.tsx edits (6 targeted text changes, NO code identifier / class / import / filename / function-name changes):
  • Marketing tab → Email Preview sender avatar initials "LS" → "OS" (matches new brand "Opus Solutions")
  • Email Preview sender name "LeadSphere AI" → "Opus Solutions"
  • Email Preview sender email "noreply@leadsphere.ai" → "noreply@opussolutions.com"
  • Email body sign-off "— The LeadSphere Team" → "— The Opus Team"
  • SectionHeading description "A real, interactive preview of the LeadSphere dashboard." → "A real, interactive preview of the Opus dashboard."
  • Browser top-bar URL pill "app.leadsphere.ai/dashboard" → "app.opussolutions.com/dashboard"
- CrmIntegrationsTestimonials.tsx edits (4 testimonial quote text changes; CRM Kanban lead cards/tags, Integrations grid, and section headings already had zero AI/LeadSphere mentions):
  • Testimonial 1 (Jennifer Hayes): "LeadSphere AI transformed my pipeline..." → "Opus Solutions transformed my pipeline..."; "The AI assistant pre-qualifies..." → "The smart assistant pre-qualifies..."
  • Testimonial 3 (Priya Patel): "Add the AI follow-up sequences..." → "Add the smart follow-up sequences..."
  • Testimonial 4 (David Okonkwo): "LeadSphere surfaces off-market opportunities..." → "Opus surfaces off-market opportunities..."
  • Testimonial 5 (Sofia Ramirez): "LeadSphere's AI concierge handles inquiries 24/7..." → "Opus's smart concierge handles inquiries 24/7..."
- Verified: post-edit grep for AI|LeadSphere|Sphere and \bAI\b|\bai\b|\bAi\b in BOTH files returns zero matches.
- Ran `bun run lint 2>&1 | tail -5` → output was just "$ eslint ." with NO errors/warnings. Clean.
- Did NOT change: file names, component function names (InteractiveDemo, CrmIntegrationsTestimonials, SortableLeadCard, etc.), import paths, CSS class names, variable names, theme tokens, chart data, drag-and-drop logic, carousel autoplay, or any feature/animation. Only user-visible text was edited.

Stage Summary:
- Rebrand complete on both files. Every user-visible "LeadSphere AI" / "LeadSphere" / standalone "AI" mention has been replaced contextually (Opus Solutions, Opus, smart assistant, smart follow-up, smart concierge) per the global rules. No "AI" remains in any heading, label, description, button text, alt text, tooltip, table cell, campaign name, tab label, testimonial quote, sender name, or URL pill in either file.
- All features intact: 6-tab interactive dashboard, CRM table search, Pipeline Kanban, Lead Map with heatmap toggle, Analytics charts (recharts), Marketing email preview, Dialer with pulse rings, @dnd-kit drag-and-drop CRM Kanban, Integrations grid, autoplay testimonials carousel.
- Lint: 0 errors. No type errors introduced (text-only edits). Dev server unaffected.

---
Task ID: 4
Agent: full-stack-developer
Task: Rebrand LeadSphere AI → Opus Solutions, remove all user-visible "AI" mentions (AiProcessMap.tsx + PricingFaqCtaFooter.tsx)

Work Log:
- Read worklog.md to learn the design system + brand context, then read both target section files in full (AiProcessMap.tsx ~852 lines, PricingFaqCtaFooter.tsx ~753 lines).
- Grepped both files for `AI|Ai`, `LeadSphere|Sphere` (case-insensitive, word-boundary) to enumerate every occurrence; classified each as user-visible text vs. internal (comments, variable names, component function names, import paths, prop variant values, section anchor ids) — only user-visible text was changed per the rules.
- AiProcessMap.tsx edits (3 user-visible changes; feature pills, map chips, pin tooltips, legend, status bar all already AI-free):
  - Section 1 eyebrow: "AI Assistant" → "Smart Assistant"
  - Section 1 title span: "AI sales assistant" → "smart sales assistant" (full title now reads "Meet your smart sales assistant")
  - Process timeline step 4 description: "AI schedules meetings straight into your calendar." → "Smart scheduling books meetings straight into your calendar."
  - Verified all 8 feature pills (Predict hot leads, Summarize conversations, Generate scripts, Follow-up reminders, Best call time, Email drafting, Lead scoring, Smart recommendations) — no AI text, untouched.
  - Verified Interactive Map filter chips (All Leads/Motivated/Expired/FSBO/High Value), pin tooltips, legend ("Pin legend"), bottom status ("{n} of {n} pins shown") — no AI text, untouched.
  - Left untouched (per rules): comment "SECTION 1 — AI Sales Assistant", `AI_FEATURES` const, `AiOrb`, `AiAssistantSection`, `AiProcessMap` function names, `<SectionShell id="ai">`, `<AnimatedBackground variant="ai" />`. No "LeadSphere"/"Sphere" existed in user-visible text in this file.
- PricingFaqCtaFooter.tsx edits (12 user-visible changes; pricing eyebrow/title/description, plan taglines, CTAs, billing toggle, FAQ contact strip, CTA banner eyebrow/headline/buttons all already AI-free):
  - Professional plan feature: "AI Assistant" → "Smart Assistant"
  - FAQ #1 answer: "test the AI Assistant" → "test the Smart Assistant"
  - FAQ #2 answer: "LeadSphere connects to over 850 MLS markets" → "Opus connects to over 850 MLS markets"
  - FAQ #3 question: "How accurate is the AI lead data?" → "How accurate is the lead data?"
  - FAQ #3 answer: "Our AI cross-references 30+ data sources" → "Our platform cross-references 30+ data sources"
  - FAQ #6 question: "What can the AI Assistant actually do?" → "What can the Smart Assistant actually do?"
  - FAQ #6 answer: "The AI Assistant drafts personalized outreach…" → "The Smart Assistant drafts personalized outreach…"
  - FAQ #7 question: "Which tools does LeadSphere integrate with?" → "Which tools does Opus integrate with?"
  - CTA banner subtext: "Join 50,000+ agents generating more listings with AI." → "Join 50,000+ agents generating more listings with smart automation."
  - Footer LogoMark wordmark: `LeadSphere <span>AI</span>` → `Opus <span>Solutions</span>`
  - Footer tagline: "More listings. Powered by AI." → "More listings. Powered by Opus."
  - Newsletter helper text: "Weekly insights on AI-powered prospecting." → "Weekly insights on smart prospecting."
  - Bottom-bar copyright: "© 2025 LeadSphere AI. All rights reserved." → "© 2025 Opus Solutions. All rights reserved."
  - Bottom-bar badge: "Made with AI" → "Made with care"
  - Left untouched: code comment "MAIN" (line 635, not user-visible), all variable names, function names, CSS classes, import paths. All 7 FAQ answers remain realistic & helpful; pricing feature lists, accordion behavior, monthly/annual toggle, magnetic buttons, animated gradient borders, and dark luxury design all preserved.
- Verification: re-grepped both files — remaining `AI|Ai` matches are ONLY internal identifiers (AI_FEATURES, AiOrb, AiAssistantSection, AiProcessMap, comment "SECTION 1 — AI Sales Assistant", comment "MAIN"). No `LeadSphere` or `Sphere` remains in either file. No user-visible "AI"/"ai"/"Ai" text remains.
- Ran `cd /home/z/my-project && bun run lint 2>&1 | tail -5` → clean, 0 errors.

Stage Summary:
- Rebrand complete on both files. Brand wordmarks now read "Opus Solutions", standalone brand references say "Opus", and every user-visible "AI" mention (eyebrows, headings, descriptions, feature pills, FAQ Q&As, pricing feature lists, CTA subtext, footer tagline, newsletter text, copyright, "Made with care" badge) has been removed or contextually replaced with "Smart"/"Opus"/"smart automation".
- All features, animations, accordion, pricing toggle, map interactivity, and the premium dark glass design are 100% intact. No file names, component function names, import paths, CSS class names, or variable names were changed.
- Lint clean. Ready for orchestrator/preview.

---
Task ID: 6
Agent: section-enricher
Task: Expand AboutMission (AboutVaWorkflow.tsx) with Benefits block, Why We Are Different grid, and Achievements banner

Work Log:
- Read worklog.md to confirm design system (dark glassmorphism, electric/violet/cyan palette, GlassCard/CountUp/SectionHeading/SectionShell + Reveal primitives, brand = "Opus Solutions", no "AI" / no "LeadSphere" in user-visible text).
- Read target file src/components/leadsphere/sections/AboutVaWorkflow.tsx (3 exported sections: AboutMission, VirtualAssistantServices, OurWorkflow).
- Read primitives.tsx to confirm exact prop signatures for GlassCard (className/strong/sheen/children), CountUp (value/duration/decimals/prefix/suffix/className), SectionHeading (eyebrow/title/description/align/className), SectionShell (children/className/id).
- Imports extended (lucide-react): added CheckCircle2, ShieldCheck, PiggyBank, Handshake, TrendingUp. Imports extended (primitives): added CountUp alongside existing GlassCard/SectionHeading/SectionShell. Existing Reveal import kept.

- AboutMission SectionHeading description updated to the new exact copy: "Opus Solutions provides professional marketing and administrative support for real estate professionals. Our mission is to help licensed agents and brokerages stay organized, save time, and grow stronger businesses." (No LeadSphere / no AI.)

- NEW BLOCK 1 — "Benefits of Professional Outreach Support" (inserted AFTER the 3-card mission/vision/who-we-serve grid, still inside the same SectionShell):
  • Single strong+sheel GlassCard with `p-0` wrapper, internal `relative grid lg:grid-cols-2` content area with `p-8 sm:p-10` and `lg:gap-14`.
  • Ambient glow layer: two `pointer-events-none absolute` blur-3xl orbs (electric bottom-left, violet top-right).
  • LEFT column: electric "Benefits" pill (CheckCircle2 + label), gradient headline "Benefits of Professional Outreach Support" (text-gradient-electric span), the exact required paragraph ("Outsourcing your outreach support with Opus Solutions saves valuable time by providing verified and standardized contact records. Our documented workflows make follow-ups faster and more consistent — so you can focus on clients, not data entry."), and a decorative electric→violet→cyan gradient underline.
  • RIGHT column: 4-item checklist built from an array via .map (motion.li with staggered x:16→0 reveal). Each item: bordered bg-white/[0.02] rounded-xl card, CheckCircle2 icon in text-electric with drop-shadow glow + group-hover scale-110, bold title, white/55 description. Hover state lights up border to electric/30.
  • 4 items exactly match the spec: Documented workflows / Verified & standardized contacts / CRM setup & support / Digital advertising campaigns (descriptions verbatim).

- NEW BLOCK 2 — "Why We Are Different" (inserted below Block 1, still inside SectionShell):
  • Centered eyebrow pill (violet dot + "Why We Are Different") + heading "Built different, built to last" (gradient span on "last") + short subhead mentioning Opus Solutions.
  • 3-col md:grid of strong GlassCards, each with: ambient color glow (absolute blur-3xl, group-hover opacity-150), colored icon tile (h-12 w-12 rounded-xl bg-{color}/15, group-hover scale-110), title (font-heading text-lg), description (text-sm white/60), and a colored underline (h-0.5 w-10 group-hover:w-20). motion.div wrapper with whileHover y:-4 lift.
  • Card 1: ShieldCheck / electric / "Verified & Documented Outreach" — full reference copy ("consent-based channels...no autodialers or robocalls").
  • Card 2: PiggyBank / violet / "Cost-Effective Support Packages" — full reference copy (mentions "Opus Solutions").
  • Card 3: Handshake / cyan / "Long-Term Partnership" — full reference copy ("workflow playbooks, and strategic guidance that scale with your goals").

- NEW Achievements banner (inserted below Block 2, still inside SectionShell):
  • Horizontal highlight band GlassCard (sheen, p-0 wrapper). Internal gradient overlay (electric→violet→cyan at low opacity) + two side blur-3xl orbs (electric left, cyan right).
  • Left side: TrendingUp icon in electric-tinted bordered tile + label block ("OUR ACHIEVEMENTS" uppercase + "Fast-growing partner network nationwide" caption).
  • Right side: 3-stat grid (sm:grid-cols-3) using CountUp (duration 2000). Each stat = colored big number (font-heading text-3xl sm:text-4xl in text-electric/text-violet/text-cyan) + label. Staggered motion.div reveal (y:12→0).
  • Stats exactly as specified: 50K+ Active Agents, 100+ MLS Integrations, 92% Conversion Improvement.
  • Responsive: stacks vertically on mobile (flex-col), horizontal band on md+ (md:flex-row md:justify-between).

- All three new blocks use existing primitives (GlassCard, CountUp, Reveal) and the same dynamic Tailwind color class convention (`bg-${color}/15`, `text-${color}`) already used by VA_SERVICES / WORKFLOW_STEPS elsewhere in the file — no new patterns introduced.

- Verification:
  • `cd /home/z/my-project && bun run lint 2>&1 | tail -5` → clean (`$ eslint .`, exit 0, zero errors/warnings).
  • Checked dev.log: dev server compiling cleanly, GET / 200 responses, no errors mentioning AboutVaWorkflow / AboutMission / CountUp / icon imports.
  • Brand rule respected: zero user-visible "AI" or "LeadSphere"/"Sphere" text introduced. "Opus Solutions" / "Opus" used contextually.
  • Existing exports (AboutMission, VirtualAssistantServices, OurWorkflow) and section ids (about, va-services, workflow) preserved — only AboutMission internals were expanded.
  • Existing 3-card mission/vision/who-we-serve grid kept untouched above the new blocks.

Stage Summary:
- AboutMission section (id="about") now contains 4 logical blocks on the page: (1) the original Mission/Vision/Who-We-Serve 3-card grid, (2) the new "Benefits of Professional Outreach Support" 2-column glass card with 4-item checklist, (3) the new "Why We Are Different" 3-card grid (ShieldCheck/PiggyBank/Handshake), and (4) the new "Our Achievements" highlight band with 3 CountUp stats (50K+, 100+, 92%).
- Premium dark glassmorphism preserved throughout; existing animations (Reveal, motion hover-lift) extended consistently to the new content.
- Lint clean (exit 0). Dev server returning HTTP 200 with no runtime errors. No file names, component names, or export signatures changed. Ready for orchestrator preview.

---
Task ID: 5
Agent: full-stack-developer
Task: Enrich PricingFaqCtaFooter.tsx with REAL content from vleadservice.com — rewrite Pricing (6 plans), rewrite FAQ (12 Q&As), and add a new Contact section.

Work Log:
- Read worklog.md to absorb the design system (dark luxury glassmorphism, electric/violet/cyan/gold palette, shared primitives, custom-scroll utility, animate-gradient-x, text-glow, etc.).
- Read the full target file (753 lines) to understand existing structure: imports, PLANS data, FAQS data, PlanPrice/CtaButton/PricingCard components, FaqList, CtaBanner, Footer, and main export.
- Confirmed shadcn primitives available (Input, Textarea, Label, Button) and verified `custom-scroll` utility + `GlassCard` API (`{ className?, strong?, sheen?, children }` — no default padding).
- TASK 1 — Pricing rewrite:
  • Replaced 3-tier Starter/Professional/Enterprise with the 6 real reference plans: Custom Plan (Per Lead), Trial ($450/30d), Silver ($900/30d, "Top Selling" gold badge, electric gradient border, lg:scale-[1.04] lg:z-10, solid gradient CTA with glow), Gold ($1800/30d), Platinum ($2500/30d), Sapphire ($4000/365d, "For Premium Realtors" gold badge, animated gold gradient border `linear-gradient(120deg,#d4af37,#f5d77a,#d4af37,#f5d77a)`, outline "Book a Demo" CTA).
  • Rewrote Plan type: removed `monthly/annual/custom/ctaVariant:"ghost"`; added `price: string` ("Per Lead" or "$450"), `period: string`, `highlight?: "top-selling" | "premium"`, `badge?: string`.
  • Rewrote PlanPrice: renders "Per Lead" as plain text; for "$N" prices parses int and uses CountUp (keyed on price) with $ prefix. Removed `annual` prop entirely.
  • Simplified CtaButton to just `outline` | `solid` variants (dropped `ghost` variant — no longer used).
  • Rewrote PricingCard to branch on `plan.highlight`: top-selling (electric gradient border + scale + solid CTA + white divider), premium (gold gradient border + outline CTA + gold-tinted divider), standard (default GlassCard hover lift).
  • Each card's features list now wrapped in `max-h-72 overflow-y-auto pr-1 custom-scroll` for scroll-when-needed behavior.
  • Removed the Switch-based monthly/annual toggle entirely. Replaced with a centered glass pill note: Calendar icon + "One-time setup · 30-day or 365-day plans".
  • Updated SectionHeading: eyebrow "Pricing", title "We've got a plan that's perfect for you", description "Whether you're just starting or need an all-inclusive solution, our plans scale with your goals."
  • Grid layout: `lg:grid-cols-3` (2 rows × 3 cols for 6 plans, naturally centered second row).
  • Added disclaimer line below grid in muted text: "Opus Solutions is a marketing consulting and support company. We do not act as a brokerage, list or sell property, or resell leads. Referral fees apply on successful closings."
- TASK 2 — FAQ rewrite:
  • Replaced the 7 SaaS-style FAQs with the 12 real reference FAQs (brokerage clarification, data/reselling, human-only outreach, exclusivity, setup fee, support model, TCPA/DNC/CAN-SPAM/CCPA/Fair Housing compliance, PCI-compliant payments, listing-platform differentiation, no-results guarantee, cancellation terms).
  • Kept SectionHeading eyebrow "FAQ", title "Frequently asked questions", description "Find answers to commonly asked questions about Opus Solutions." (added description).
  • FaqList component unchanged (still uses Reveal + Accordion + ChevronDown rotate-on-open); only the FAQS data array changed. Capped stagger delay at 0.36s (changed per-item multiplier from 0.06 → 0.04 to keep 12 items snappy).
  • FAQ contact prompt strip: changed CTA href from "#" → "#contact" so it now scrolls to the new contact section.
- TASK 3 — New Contact section:
  • Added `ContactSection` sub-component (placed BETWEEN FAQ and CTA banner in main render: Pricing → FAQ → Contact → CTA → Footer; flows naturally since FAQ strip already prompts "Still have questions? Contact support" → links to #contact).
  • SectionShell id="contact" with SectionHeading eyebrow "Contact", title "Let's do great work together", description with the motivated-sellers subtext.
  • 2-column grid (lg:grid-cols-2):
    - LEFT: GlassCard strong contact form using shadcn Input/Textarea/Label/Button. Fields: Name + Email (2-col on sm), Phone, Message textarea (flex-1 min-h-32). Submit = shadcn Button with custom gradient bg + shimmer sweep + glow (matches CtaButton solid styling for visual consistency). onSubmit preventDefault. Ambient electric + violet blur orbs in card corners. MessageSquare icon header.
    - RIGHT: vertical stack of (2×2 info-card grid) + (flex-1 stylized map panel).
      · InfoCard sub-component: small GlassCard with icon chip + uppercase label + value. Email card (Mail, text-electric, mailto link, break-all), Phone card (Phone, text-violet, 3 tel links, tnum), Address card (MapPin, text-cyan, 3 address lines), Office Hours card (Clock, text-gold, tnum).
      · StylizedMap sub-component: pure CSS/SVG — dark bg `#070a12`, two layered grid overlays (32px electric + 128px violet) both with radial mask for fade-at-edges, central radial glow, glowing MapPin at center with `drop-shadow-[0_0_14px_rgba(59,130,246,0.95)]` + dual pulse rings (animate-ping outer + animate-pulse inner) + "Albany, NY" pill label. Corner badges: top-left "HQ · Albany" with green status dot, bottom-right "42.6526° N, 73.7562° W" coordinates (tnum).
  • Real contact info wired: info@opussolutions.com, three phone numbers (320) 331-0910 / 8501 / 3559, 418 Broadway Ste. R Albany NY 12207, hours 10:00 A.M. to 08:00 P.M (EST). Stored in a CONTACT_INFO constant for cleanliness.
- Imports audit:
  • Removed: `Switch` (no longer used after toggle removal), `useState` (no longer needed).
  • Added: `Input`, `Textarea`, `Label`, `Button` (shadcn, used in contact form).
  • Added icons: `Mail`, `Phone`, `MapPin`, `Clock`, `MessageSquare` (lucide-react, used in contact section).
  • Kept all previously-used icons (Check, ChevronDown, Sparkles, ArrowRight, Rocket, Calendar, Orbit, Twitter, Linkedin, Instagram, Youtube, Github, ShieldCheck, Send, Star) and motion/CN/CountUp/GlassCard/SectionHeading/SectionShell/Reveal/Accordion* imports.
- Footer touch-ups (kept structure intact, only column data evolved):
  • FOOTER_COLUMNS first column "Product" → "Plans" with links ["Custom","Trial","Silver","Gold","Platinum","Sapphire"] so the footer reflects the new pricing tiers.
  • LogoMark wordmark ("Opus Solutions"), tagline, newsletter form, socials, copyright, status badge — all preserved from Task 4 rebrand (no AI/LeadSphere reintroduced).
- Branding check: grepped file for `\b(AI|Ai)\b|LeadSphere|Sphere` → 0 matches. No user-visible "AI" or "LeadSphere" anywhere. Brand consistently "Opus Solutions" / "Opus".
- Verification:
  • `cd /home/z/my-project && bun run lint 2>&1 | tail -8` → output `$ eslint .` only, exit 0, zero errors/warnings.
  • Dev server (`bun run dev` auto-running) log shows successful recompiles, GET / 200 responses, no runtime errors after edits.
  • Default export name `PricingFaqCtaFooter` unchanged. All import paths intact. Premium dark glassmorphism, framer-motion animations, gradient borders, glow effects, custom-scroll, Reveal stagger, Accordion behavior — all preserved.

Stage Summary:
- Pricing now shows 6 real one-time-setup plans with the Silver (Top Selling) and Sapphire (For Premium Realtors) cards visually highlighted via gradient borders + gold badges.
- FAQ now has the 12 real compliance/services Q&As from the reference site.
- New Contact section adds a styled contact form (shadcn Input/Textarea/Label/Button), 4 info cards (email/3 phones/address/hours) with the real Opus Solutions contact data, and a pure-CSS stylized map with a glowing Albany, NY pin.
- File flow: Pricing → FAQ → Contact → CTA → Footer. Lint clean. Brand clean. Design system preserved.

---

## Task 7 — Sub-pages: `/services` and `/about` (Opus Solutions)

**Agent:** page-route builder | **Files created:**
- `src/app/services/page.tsx` (Server Component, exports `metadata`)
- `src/app/about/page.tsx` (Server Component, exports `metadata`)
- `src/app/about/ContactForm.tsx` (`"use client"` — extracted for form interactivity)

### Design-system adherence
- Both pages wrapped in `<SiteChrome>` (navbar + cursor glow + animated bg + footer + scroll-to-top + assistant widget) and lead with `<PageHero>`, close with `<CTABanner />`.
- Reused all shared section components per the brief — no duplication of existing sections.
- Premium dark glassmorphism preserved: `GlassCard strong`, `text-gradient-electric` hero spans, `Reveal` stagger, `CountUp` tnum figures, electric/violet/cyan/gold accent tokens via Tailwind theme colors (`bg-electric/15`, `text-violet`, etc.).
- No "LeadSphere", no user-visible "AI" — brand consistently "Opus Solutions" / "Opus".

### Architecture decision (metadata vs "use client")
- The brief suggested adding `"use client"` to the whole about page, but Next.js 16 forbids exporting `metadata` from a Client Component. To satisfy BOTH requirements (SEO `metadata` export + an interactive contact form), I kept `about/page.tsx` as a **Server Component** and extracted only the interactive form into `ContactForm.tsx` (`"use client"`).
- The inline Achievements section and the Contact info card render client primitives (`CountUp`, `GlassCard`, `Reveal`) directly from the server component — this is allowed and needs no `"use client"` since they manage their own client state internally. Only the form (needs `onSubmit` + `useState`) required extraction.

### PAGE 1 — `/services`
- **metadata:** title "Services — Opus Solutions", description per brief.
- **PageHero:** eyebrow "Services", title "Get Started With Online **Lead Generation** Services" (`text-gradient-electric` span on "Lead Generation"), description per brief.
- **Body order:**
  1. `<TrustStatsFeatures />` (default import) — Trust + Stats + Services grid (`id="services"`).
  2. `<AiProcessMap />` (default import) — Smart Assistant + Real Estate Process timeline + Interactive Map.
  3. `<VirtualAssistantServices />` (named import from `AboutVaWorkflow`) — 6 VA service cards.
  4. `<InteractiveDemo />` (default import) — tabbed dashboard preview.
  5. `<RoiCalculator />` (named import) — projected listings & revenue.
  6. `<CTABanner title="Ready to fill your pipeline?" subtitle="From lead discovery to closing — Opus Solutions handles the heavy lifting so you can focus on clients." />`

### PAGE 2 — `/about`
- **metadata:** title "About Us — Opus Solutions", description per brief.
- **PageHero:** eyebrow "About Us", title "A group of experts helping you **own your local market**" (`text-gradient-electric` span on "own your local market"), description per brief.
- **Body order:**
  1. `<AboutMission />` (named import) — Who We Are + Benefits + Why Different + Achievements banner.
  2. `<OurWorkflow />` (named import) — 4-step onboarding (Intro Call → Meet VA → Discuss Tasks → Work Started).
  3. `<BeforeAfter />` (named import) — Traditional vs Opus-powered comparison.
  4. **NEW inline Achievements section** — `<SectionShell id="achievements">` + `<SectionHeading eyebrow="Our Achievements" title="Fast-growing partner network nationwide">`. 4-stat responsive grid (`sm:grid-cols-2 lg:grid-cols-4`) of `GlassCard strong` cards, each with a color-themed icon chip + corner glow + `CountUp` figure:
     - 50K+ Active Agents (Users, electric)
     - 100+ MLS Integrations (Network, violet)
     - 92% Conversion Improvement (TrendingUp, cyan)
     - 250M+ Lead Records (Database, gold)
     A `STAT_THEME` record maps each color → static class strings (iconWrap/icon/glow) so Tailwind JIT picks them up. Closes with the brief's paragraph: "As a fast-growing partner network, our goal is to introduce agents to practical tools, workflows, and technology that improve response times and win rates."
  5. **NEW inline Contact section** — `<SectionShell id="contact">` + `<SectionHeading eyebrow="Contact" title="Let's do great work together">`. 2-col `lg:grid-cols-2`:
     - LEFT `GlassCard strong`: 4 contact info rows (Mail → info@opussolutions.com; Phone → (320) 331-0910 · 8501 · 3559; MapPin → 418 Broadway, Ste. R, Albany, NY 12207; Clock → 10:00 A.M. to 08:00 P.M (EST)), each with an electric icon chip + uppercase label + value. Footer disclaimer block: "Opus Solutions is a marketing consulting and support company. We do not act as a brokerage, list or sell property, or resell leads."
     - RIGHT `GlassCard strong` wrapping `<ContactForm />` (client component). Form fields: Name + Email (2-col on sm), Phone, Message textarea, gradient "Send Message" button (electric→violet, glow shadow, Send icon). `onSubmit` preventDefault → swaps to a success state (CheckCircle2 + "Message received" + "Send another message" reset button) via `useState`.
  6. `<CTABanner title="Partner with Opus Solutions" subtitle="Long-term support, documented workflows, and a team that scales with your goals." />`

### Imports
- Shared chrome: `SiteChrome`, `PageHero` from `@/components/leadsphere/SiteChrome`; `CTABanner` from `@/components/leadsphere/CTABanner`.
- Section default exports: `TrustStatsFeatures`, `AiProcessMap`, `InteractiveDemo`.
- Section named exports: `AboutMission`, `VirtualAssistantServices`, `OurWorkflow` (from `AboutVaWorkflow`); `BeforeAfter`; `RoiCalculator`.
- Primitives: `GlassCard`, `CountUp`, `SectionHeading`, `SectionShell` from `@/components/leadsphere/primitives`; `Reveal` from `@/components/leadsphere/Reveal`.
- shadcn ui (in ContactForm only): `Input`, `Textarea`, `Label`, `Button`.
- lucide-react: `Mail`, `Phone`, `MapPin`, `Clock`, `Users`, `Network`, `TrendingUp`, `Database`, `Send`, `CheckCircle2`.
- framer-motion: `motion` (used in ContactForm success state).

### Verification
- `cd /home/z/my-project && bun run lint 2>&1 | tail -8` → `$ eslint .` only, exit 0, zero errors/warnings.
- Dev server (auto-running) compiled both new routes cleanly: `GET /services 200` (compile 2.8s) and `GET /about 200` (compile 1.1s), no runtime errors in `dev.log`.
- Both pages are Server Components exporting typed `Metadata`; the only client island is `ContactForm`. Premium dark glassmorphism, gradient hero spans, CountUp stats, Reveal stagger, glow effects, responsive grids (mobile-first `sm:`/`lg:`) all intact.

---
Task ID: 9
Agent: full-stack-developer
Task: Build the /blog page (Opus Solutions blog index) — premium dark glassmorphism

Work Log:
- Read worklog.md to absorb the design system (deep black #050505 base, electric/violet/cyan/gold palette, glass-strong/glass-card/glass-sheen utilities, font-heading/tnum helpers, text-gradient-electric, glow helpers) and confirmed exact prop signatures for shared primitives by reading SiteChrome.tsx (SiteChrome + PageHero), CTABanner.tsx, primitives.tsx (GlassCard/SectionHeading/SectionShell), and Reveal.tsx.
- Verified all required lucide-react icons exist via node check on the installed lucide-react@0.525: Moon, Target, Handshake, Cake, Megaphone, Search, TrendingUp, Sparkles, ArrowRight, Clock, Calendar — all present (also confirmed `LucideIcon` type is exported).
- Created /src/app/blog/ directory.

- Created /src/app/blog/layout.tsx (server component, NO "use client"):
  • Exports `metadata` with `title: "Blog — Opus Solutions"` and the required description.
  • Pass-through layout that just returns `children`. This is the cleanest way to satisfy BOTH the "metadata export" requirement AND the "use client at the top of blog/page.tsx" requirement, since Next.js forbids exporting `metadata` from a `"use client"` file.

- Created /src/app/blog/page.tsx ("use client"):
  • Imports: motion from framer-motion; 11 lucide-react icons + `type LucideIcon`; SiteChrome + PageHero from "@/components/leadsphere/SiteChrome"; CTABanner from "@/components/leadsphere/CTABanner"; GlassCard + SectionHeading + SectionShell from "@/components/leadsphere/primitives"; Reveal from "@/components/leadsphere/Reveal".
  • Wraps everything in <SiteChrome> (navbar + cursor glow + ambient section background + footer + scroll-to-top + assistant widget).
  • <PageHero eyebrow="Blog" title={<>Our <span className="text-gradient-electric">Latest News</span></>} description="Stay updated with the latest trends, tips, and insights in real estate lead generation. At Opus Solutions, we share strategies that help agents and brokerages grow stronger businesses." />
  • <SectionShell id="blog" className="pt-10 md:pt-12">:
    - <SectionHeading eyebrow="Blog" title="Insights for real estate professionals" description="Strategies, tips, and stories from the front lines of real estate lead generation." />
    - Responsive grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` with `gap-6 sm:gap-7`. mt-14 from heading.
    - 8 posts rendered from a `POSTS: BlogPost[]` array. Each post has the exact title/excerpt/category/readTime/date/icon/color specified in the brief (titles are the REAL vleadservice.com blog post titles, excerpts are realistic 1-2 sentence summaries about VA teams, prospecting, warm introductions, the 5-year anniversary, paid ads, off-market deals, conversion, and customer experience).
    - Each card wrapped in <Reveal delay={i * 0.06} className="h-full"> for staggered scroll-in.
    - Inside: <motion.article whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 280, damping: 22 }} className="group h-full"> — lifts 8px (≈ -translate-y-2) on hover with a smooth spring.
    - Card = <GlassCard sheen className="flex h-full flex-col overflow-hidden border border-white/8 transition-colors duration-300 ${c.hoverBorder}"> — strong glass, sheen reflection, full-height flex column, hover border-color + drop-shadow glow in the post's brand color (electric/violet/cyan/gold), achieved via a static COLOR_STYLES record so Tailwind v4's scanner reliably picks up every brand class.
    - THUMBNAIL (h-40): `bg-gradient-to-br ${c.gradient}` (electric→#1e3a8a / violet→#4c1d95 / cyan→#0e7490 / gold→#7a5a16), plus (a) a masked 32px white grid overlay at 25% opacity for depth, (b) two ambient blur-2xl orbs in the post color (top-right + bottom-left, the second at 60% opacity), (c) a centered 16×16 rounded-2xl icon tile (bg-white/10 backdrop-blur + 1px white/25 border + 1px brand-colored ring) holding the post's lucide icon at 8×8 in white with a drop-shadow glow; the icon tile scales to 1.08 on hover via a nested motion.div, (d) a category pill in the top-left corner with a 1.5px brand-colored dot + label, styled as `bg-{color}/15 text-{color} border-{color}/30` rounded-full backdrop-blur.
    - BODY (p-5 sm:p-6, flex-1 flex-col): title (font-heading text-lg font-semibold leading-snug text-white, transitions to the post's brand color on group-hover), excerpt (text-sm leading-relaxed text-white/55, line-clamp-3), then a footer row with top border-white/8 and pt-4: left = Calendar icon + date (tnum) + "·" separator + Clock icon + readTime; right = "Read more" + ArrowRight that translates x:0.5 on group-hover and turns brand-colored.
    - COLOR_STYLES record (keyed by ColorKey "electric"|"violet"|"cyan"|"gold") contains fully-static class strings for: gradient, pill, iconTile, ring, orb, hoverBorder (border + shadow glow), hoverTitle, hoverArrow, accentDot. No template-literal color interpolation — every brand class is a literal string so Tailwind v4 detects it.
    - LOAD MORE block (mt-14, flex-col items-center gap-6): a non-functional styled outline button (border-white/15 bg-white/5 backdrop-blur, hover:border-electric/40 + electric glow shadow, motion whileHover y:-2 + whileTap scale 0.98 spring) with "Load More Articles" + ArrowRight. Below: a max-w-2xl text-center text-xs text-white/35 disclaimer: "Opus Solutions is a marketing consulting and support company. We do not act as a brokerage, list or sell property, or resell leads."
  • <CTABanner title="Ready to put these insights to work?" subtitle="Join thousands of agents who trust Opus Solutions to fill their pipeline." /> at the bottom (reusable gradient CTA banner with animated gradient bg, grid overlay, dual magnetic buttons).

- Brand/voice check: zero user-visible "AI" or "LeadSphere"/"Sphere" anywhere. Only "Opus Solutions" / "Opus" used. Verified by reading the file in full before linting.
- File names, component function names, import paths, CSS class names, and shared-component APIs all preserved/unchanged.

- Verification:
  • `cd /home/z/my-project && bun run lint 2>&1 | tail -8` → output was just `$ eslint .` (exit 0, zero errors/warnings). Clean.
  • `curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:3000/blog` → `HTTP 200` (initial compile ~1174ms, render ~538ms).
  • `curl -s http://localhost:3000/blog | grep -oE "<title>[^<]+</title>"` → `<title>Blog — Opus Solutions</title>` ✓ (metadata correctly inherited from blog/layout.tsx).
  • SSR HTML contains every required string: "Latest News" (hero gradient span), "Blog" eyebrow, "Insights for real estate professionals", all 8 post titles (e.g. "How a Dedicated VA Team", "5 Anniversary Celebration of Opus Solutions", "Enhancing Customer Experience"), "Load More Articles", the brokerage disclaimer, and the CTA banner headline "Ready to put these insights to work?".
  • Dev log shows `GET /blog 200 in 1712ms (compile: 1174ms, render: 538ms)` with no runtime errors.

Stage Summary:
- Delivered two files: /src/app/blog/layout.tsx (server, exports metadata) and /src/app/blog/page.tsx ("use client", full blog index).
- Premium dark glassmorphism blog index with 8 real vleadservice.com blog posts in a 1/2/3-col responsive grid, staggered Reveal scroll-ins, per-post gradient thumbnails with brand-colored glows + ambient orbs + masked grid overlay, hover lift (y:-8 spring), hover border-color shift + drop-shadow glow in the post's brand color, hover title color shift, "Read more →" with sliding arrow, styled non-functional Load More button, the brokerage disclaimer, and the reusable gradient CTABanner at the bottom.
- All shared infrastructure reused (SiteChrome, PageHero, CTABanner, GlassCard, SectionHeading, SectionShell, Reveal) — no recreation. Lint clean, HTTP 200, metadata title correct, all required copy present in SSR HTML. Ready for preview.

---
Task ID: 8
Agent: full-stack-developer
Task: Build two new Next.js page routes for Opus Solutions — `/testimonials` and `/pricing` (premium dark glassmorphism, compose shared infra)

Work Log:
- Read worklog.md (Tasks 0–7) to absorb the design system (deep black #050505 base, electric/violet/cyan/gold palette, glass-strong/glass-card utilities, text-gradient-electric, animate-gradient-x, custom-scroll) and the shared infrastructure contracts (SiteChrome, PageHero, CTABanner, TrustStatsFeatures, CrmIntegrationsTestimonials, RoiCalculator, GlassCard/CountUp/SectionHeading/SectionShell, Reveal, shadcn Accordion).
- Verified existing multi-page pattern by reading src/app/about/page.tsx and src/app/services/page.tsx — both are SERVER components (no "use client") that export `metadata` and compose client components (SiteChrome, PageHero, GlassCard, CountUp, Reveal) inline. Followed this exact pattern so `metadata` export works (impossible to combine with a top-of-file "use client" in Next.js App Router). Client interactivity is handled by the composed client components (CountUp hooks, Accordion state, Reveal motion) — no hooks/motion used directly in either page.tsx.
- Inspected PricingFaqCtaFooter.tsx (PricingCard / PlanPrice / CtaButton / FaqList sub-components) and CrmIntegrationsTestimonials.tsx (TESTIMONIALS data with avatar gradient strings) to match existing pricing-card styling (electric gradient border + scale for top-selling, gold gradient border for premium, gold Star badge, Check-in-electric-ring feature lists, custom-scroll max-h-72) and avatar gradient conventions (from-electric to-violet, from-cyan to-electric, from-violet to-fuchsia-500, from-gold to-amber-500, from-emerald-400 to-cyan).
- Created `src/app/testimonials/page.tsx` (server component, exports metadata title "Testimonials — Opus Solutions"):
  • PageHero: eyebrow "Testimonials", title "Clients tell the story" (gradient span on "the story"), description verbatim from spec.
  • Body order: TrustStatsFeatures → CrmIntegrationsTestimonials → NEW "More Client Stories" inline section → CTABanner.
  • NEW inline section: SectionShell id="more-stories" + SectionHeading (eyebrow "Client Stories", title "Real results from real estate professionals"). Responsive 1/2/3-col grid of 6 GlassCard (strong+sheel) cards. Each card: 5 gold filled Star icons (with gold drop-shadow glow), quote (curly quotes), gradient divider, then avatar circle (gradient bg with initials, per-spec gradient per person) + name + electric BadgeCheck verified icon + location. Cards wrapped in Reveal (staggered delay = i*0.06), hover lift + violet shadow, soft accent glow that brightens on hover.
  • 6 real client stories with realistic varied quotes (lead quality / time saved / conversion / outreach support / ROI / dedicated VA), exact names + locations + initials + avatar gradients from spec: Kira Asinas (AL/GA/FL, KA, electric→violet), John Donahue (PA, JD, cyan→electric), Jennifer Bianchi (TX, JB, violet→fuchsia-500), JC Johnson (NV, JJ, gold→amber-500), Carlos Banuelos (CA, CB, emerald-400→cyan), Silvana Piadade (TN, SP, electric→cyan).
  • CTABanner with title "Join 50,000+ agents growing with Opus" + subtitle "See why top-producing realtors trust Opus Solutions to fill their pipeline."
- Created `src/app/pricing/page.tsx` (server component, exports metadata title "Pricing — Opus Solutions"):
  • PageHero: eyebrow "Pricing", title "We've got a plan that's perfect for you" (gradient span on "perfect for you", apostrophes escaped as &apos;), description verbatim from spec.
  • Body order: NEW inline Pricing section (id="pricing") → RoiCalculator → NEW inline FAQ section (id="faq") → CTABanner.
  • NEW Pricing section (Option A — built inline, did NOT import PricingFaqCtaFooter to avoid its bundled footer): SectionShell id="pricing" + SectionHeading (eyebrow "Pricing", title with gradient span) + centered glass pill note (Calendar icon + "One-time setup · 30-day or 365-day plans") + responsive 3-col grid (md:2 / lg:3, items-stretch) of 6 PricingCards + centered muted disclaimer.
  • 6 exact plans from spec: Custom Plan (Per Lead, outline), Trial Plan ($450, outline), Silver Plan ($900, HIGHLIGHTED top-selling — electric animated gradient border + lg:scale-105 + lg:z-10 + ambient electric glow + gold "Top Selling" Star badge + solid electric-gradient CTA with shimmer sweep + white divider), Gold Plan ($1800, outline), Platinum Plan ($2500, outline), Sapphire Plan ($4000, PREMIUM — gold animated gradient border + gold ambient glow + gold "For Premium Realtors" Star badge + outline "Book a Demo" CTA + gold-tinted divider). Prices animated with CountUp (keyed on price string); "Per Lead" rendered as plain text. Feature lists use Check icon in electric pill ring, wrapped in custom-scroll max-h-72 overflow. CTA buttons are plain `<button type="button">` with CSS transitions (no motion in server component) — solid variant has shimmer sweep pseudo-element, outline variant has ArrowRight that nudges on hover.
  • Disclaimer verbatim: "Opus Solutions is a marketing consulting and support company. We do not act as a brokerage, list or sell property, or resell leads. Referral fees apply on successful closings."
  • RoiCalculator reused as-is (interactive sliders + CountUp results).
  • NEW FAQ section: SectionShell id="faq" + SectionHeading (eyebrow "FAQ", title "Frequently asked questions", description) + max-w-3xl Accordion (type="single" collapsible, defaultValue="faq-0") with 12 exact Q&As from spec. Each AccordionItem styled as glass-strong card (matches PricingFaqCtaFooter FaqList): default chevron hidden via [&>svg:last-child]:hidden, custom ChevronDown in a circle that rotates 180deg + turns electric on group-data-[state=open]. Wrapped each item in Reveal (staggered delay capped at 0.36s).
  • CTABanner with title "Ready to close more listings?" + subtitle "Choose your plan and start generating qualified leads today."
- Branding check: ripgrepped both new files for `LeadSphere|\bSphere\b` and `\bAI\b|\bAi\b` → 0 matches. All user-visible text uses "Opus Solutions" / "Opus". No "LeadSphere" or standalone "AI" anywhere.
- Verification:
  • `cd /home/z/my-project && bun run lint 2>&1 | tail -8` → output `$ eslint .` only, exit 0, zero errors/warnings.
  • `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/testimonials` → 200 (compile 993ms, render 673ms).
  • `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/pricing` → 200 (compile 900ms, render 574ms).
  • curl-grep of testimonials HTML confirmed all 6 client names + "Clients tell" + "the story" + "Real results from real estate professionals" + "Join 50,000+ agents growing with Opus" render server-side.
  • curl-grep of pricing HTML confirmed all 6 plan names + "Top Selling" + "For Premium Realtors" + "Per Lead" + "perfect for you" + "Frequently asked questions" + "How do we get started" + "Ready to close more listings" + "marketing consulting and support company" render server-side.
  • dev.log shows clean compiles, GET /testimonials 200, GET /pricing 200, no runtime errors.

Stage Summary:
- Two new page routes delivered: `/testimonials` (src/app/testimonials/page.tsx) and `/pricing` (src/app/pricing/page.tsx). Both are server components that export `metadata` and compose shared client infrastructure (SiteChrome, PageHero, CTABanner) + existing section components (TrustStatsFeatures, CrmIntegrationsTestimonials, RoiCalculator) + new inline sections built from shared primitives (GlassCard, CountUp, SectionHeading, SectionShell, Reveal) and shadcn Accordion.
- Testimonials page composes Trust + Stats + Features, the CRM/Integrations/Testimonials-carousel section, a NEW 6-card "More Client Stories" grid (real names, gold stars, verified badges, gradient avatars), and the CTA banner.
- Pricing page builds a NEW 6-plan pricing grid inline (Custom/Trial/Silver[highlighted]/Gold/Platinum/Sapphire[premium]) with CountUp-animated prices, animated gradient borders on highlighted plans, the interactive RoiCalculator, a NEW 12-Q&A FAQ accordion, and the CTA banner.
- Premium dark glassmorphism preserved throughout (electric/violet/cyan/gold palette, glass-strong cards, animate-gradient-x borders, custom-scroll feature lists, Reveal scroll-ins, framer-motion via client components). Fully responsive (1/2/3-col grids, mobile-first). Lint clean (exit 0). Both routes return HTTP 200 with all specified content rendering server-side. No "LeadSphere" or user-visible "AI" text. No file names, component names, or existing import paths changed.

---
Task ID: 10
Agent: full-stack-developer
Task: Build 5 new Next.js page routes for Opus Solutions — /contact, /faqs, /privacy-policy, /terms, /refund-policy (premium dark glassmorphism)

Work Log:
- Read worklog.md (Tasks 0–9) to absorb the design system (deep black #050505 base, electric/violet/cyan/gold palette, glass-strong/glass-card utilities, text-gradient-electric, animate-ping/pulse, custom-scroll, tnum) and confirm shared infrastructure contracts (SiteChrome + PageHero from @/components/leadsphere/SiteChrome; CTABanner from @/components/leadsphere/CTABanner; GlassCard / SectionHeading / SectionShell / CountUp from @/components/leadsphere/primitives; Reveal from @/components/leadsphere/Reveal; shadcn Accordion / Input / Textarea / Label / Button / Select).
- Reviewed prior multi-page patterns by reading src/app/about/page.tsx, src/app/services/page.tsx, src/app/pricing/page.tsx, src/app/blog/layout.tsx, src/app/blog/page.tsx, and src/app/about/ContactForm.tsx — confirmed the established Server-Component-with-metadata pattern (no "use client" at the top of page.tsx), with interactive bits extracted into separate client components (ContactForm pattern).
- Read primitives.tsx (GlassCard/CountUp/SectionHeading/SectionShell), Reveal.tsx, SiteChrome.tsx, CTABanner.tsx, accordion.tsx, and select.tsx to confirm exact prop signatures before usage.

- Created directories: src/app/contact/, src/app/faqs/, src/app/privacy-policy/, src/app/terms/, src/app/refund-policy/.

- PAGE 1 — /contact (src/app/contact/page.tsx + src/app/contact/ContactFormSection.tsx):
  • page.tsx = SERVER component exporting metadata (title "Contact — Opus Solutions" + required description). Imports SiteChrome + PageHero + CTABanner + GlassCard + SectionShell + Reveal + lucide Mail/Phone/MapPin/Clock icons.
  • PageHero: eyebrow "Contact", title with `text-gradient-electric` span on "great work" (full title: "Let's do great work together"), description verbatim from spec.
  • Body = 2-column grid (lg:grid-cols-2) inside SectionShell id="contact":
    - LEFT: GlassCard strong+sheel (p-0 wrapper, internal padding) with ambient electric + violet blur orbs in corners, wrapping `<ContactFormSection />`.
    - RIGHT: vertical stack of (2×2 info-card grid) + (StylizedMap sub-component, flex-1 min-h-[280px]).
      · INFO_THEME record (electric/violet/cyan/gold → static iconWrap/icon/glow classes) so Tailwind v4 picks them up.
      · 4 info cards (Email/Mail/electric → info@opussolutions.com mailto link; Phone/Phone/violet → 3 tel links for (320) 331-0910 / 8501 / 3559; Address/MapPin/cyan → 3 address lines; Office Hours/Clock/gold → "10:00 A.M. to 08:00 P.M (EST)"). Each card: ambient corner blur orb in card color, icon chip, uppercase label, value lines. Hover lifts (-translate-y-1) + drop-shadow glow in the card's brand color.
      · StylizedMap: pure CSS/SVG — dark base #070a12, two layered grid overlays (32px electric at 40% opacity, 128px violet at 30% opacity) both with radial mask for fade-at-edges, central radial glow (electric→violet), glowing MapPin at center with drop-shadow filter + dual pulse rings (animate-ping outer + animate-pulse inner blur) + "Albany, NY" label pill in a dark glass bg. Top-left "HQ · Albany" badge with animated pinging green dot. Bottom-right "42.6526° N, 73.7562° W" coordinates (tnum).
  • ContactFormSection.tsx = CLIENT component ("use client"): shadcn Input/Textarea/Label/Button + shadcn Select (SelectTrigger/SelectContent/SelectItem/SelectValue). Fields: Name + Email (2-col on sm), Phone + Company/Team (2-col on sm), Service of Interest (Select dropdown with the 8 services: Marketing Consulting, CRM Support, Workflow Automation, Virtual Assistance, Outreach Support, Digital Marketing, Appointment Coordination, Reporting & Analytics), Message textarea (min-h-[140px]). Header row with MessageSquare icon + "Send us a message" title + "We reply within one business day." subtitle. Submit triggers preventDefault → swaps to success state (motion.div fade+scale, CheckCircle2 in electric ring, "Message received" + "Send another message" reset button that also clears the service select). Send Message button uses gradient bg (electric→violet) + shimmer-free glow shadow matching About page ContactForm.
  • Closing: `<CTABanner title="Ready to get started?" subtitle="Book a free consultation and discover how Opus Solutions can help your business grow." />`

- PAGE 2 — /faqs (src/app/faqs/page.tsx):
  • SERVER component exporting metadata (title "FAQs — Opus Solutions" + required description). No "use client" needed — shadcn Accordion is itself a client component so the server component can use it directly (same pattern as src/app/pricing/page.tsx).
  • PageHero: eyebrow "FAQs", title with `text-gradient-electric` span on "Frequently asked" (full title: "Frequently asked questions"), description verbatim from spec.
  • Body = SectionShell id="faqs" with SectionHeading (eyebrow "Questions", title "Everything you need to know", description). max-w-3xl container with Accordion type="single" collapsible defaultValue="faq-0". 14 FAQ items rendered from FAQS data array (Services list / Not a brokerage / Don't sell data / Human-only outreach / CRM setup / Dedicated account manager / TCPA DNC CAN-SPAM CCPA/CPRA Fair Housing / PCI-compliant payments / 6 pricing plans / One-time setup fee / Calendar & appointments / Digital marketing / Cancellation / Getting started) — all answers realistic 1-3 sentences verbatim per spec.
  • Each AccordionItem styled as glass-strong card with border; default chevron hidden via [&>svg:last-child]:hidden, custom ChevronDown in a circle that rotates 180deg + turns electric on group-data-[state=open] (matches existing pricing-page FaqList styling). Wrapped each item in Reveal with staggered delay = Math.min(i * 0.04, 0.4).
  • Closing: `<CTABanner title="Still have questions?" subtitle="Our team replies within a few hours, 7 days a week. Reach out and we'll help." />`

- PAGE 3 — /privacy-policy (src/app/privacy-policy/page.tsx):
  • SERVER component exporting metadata (title "Privacy Policy — Opus Solutions").
  • PageHero: eyebrow "Legal", title "Privacy Policy" (no gradient span per spec), description "How Opus Solutions collects, uses, and protects your information."
  • Body = SectionShell id="privacy-policy" with max-w-3xl container wrapping a single GlassCard strong+sheel (p-7 sm:p-10). Ambient electric (top-right) + violet (bottom-left) blur-3xl corner orbs. Header row: ShieldCheck icon in electric chip + "Legal" eyebrow + "Privacy Policy" title + "Last updated: January 2025" caption. Sections rendered from SECTIONS array (10 sections: Introduction, Information We Collect [5 bullets], How We Use Information [5 bullets], Information Sharing, Data Security, Your Rights, Cookies, Compliance, Changes to This Policy, Contact [2 bullets: email + address]).
  • Section prose: h2 = font-heading text-lg font-semibold text-white; p = text-sm leading-relaxed text-white/60; bullets = electric glowing dot bullets (h-1.5 w-1.5 bg-electric/70 with shadow-[0_0_8px_#3b82f6]).
  • Footer contact strip below sections (border-top): Mail icon + info@opussolutions.com mailto link, MapPin icon + "418 Broadway, Ste. R, Albany, NY 12207" address.
  • Closing: `<CTABanner title="Questions about privacy?" subtitle="Contact our team and we'll be happy to help." />`

- PAGE 4 — /terms (src/app/terms/page.tsx):
  • SERVER component exporting metadata (title "Terms & Conditions — Opus Solutions").
  • PageHero: eyebrow "Legal", title "Terms & Conditions" (no gradient), description "The terms governing your use of Opus Solutions' services."
  • Body = same structure as privacy policy (SectionShell + max-w-3xl + single GlassCard strong+sheel + ambient electric/cyan corner orbs). Header icon = FileText in electric chip. "Last updated: January 2025" caption.
  • 12 sections rendered from SECTIONS array: Acceptance of Terms, Description of Services [8 service bullets], Not a Brokerage, Client Responsibilities [4 bullets], Outreach & Compliance, Payment Terms (mentions all 6 plans: Custom / Trial $450 / Silver $900 / Gold $1800 / Platinum $2500 / Sapphire $4000), Referral Fees [6 bullets: Custom 20% / Trial 20% / Silver 15% / Gold 10% / Platinum 8% / Sapphire 5%], Cancellation, Intellectual Property, Limitation of Liability, Governing Law, Contact [email + phone bullets].
  • Footer contact strip: Mail icon → info@opussolutions.com mailto link, Phone icon → (320) 331-0910 tel link (tnum).
  • Closing: `<CTABanner title="Ready to get started?" subtitle="Review our plans and choose the one that fits your business." />`

- PAGE 5 — /refund-policy (src/app/refund-policy/page.tsx):
  • SERVER component exporting metadata (title "Refund Policy — Opus Solutions").
  • PageHero: eyebrow "Legal", title "Refund Policy" (no gradient), description "Our policy on refunds, cancellations, and billing."
  • Body = same structure as privacy/terms. Header icon = Receipt in electric chip. Ambient electric (top-right) + gold (bottom-left) blur-3xl corner orbs (subtle visual differentiation from the other two legal pages while staying on-brand). "Last updated: January 2025" caption.
  • 9 sections rendered from SECTIONS array: Overview, Setup Fees (non-refundable once work begins), Cancellation (written notice + billing stops at end of cycle), Referral Fees (only on successful closings), Pro-Rata Refunds (no pro-rata refund of setup fee; no future billing), Service Discontinuation (campaign + reporting close at end of cycle; documentation provided to client), Dispute Resolution (14-day window), Compliance (PCI-compliant processor; no cardholder data stored), Contact [email + phone + address bullets].
  • Footer: Mail icon → info@opussolutions.com mailto link, Phone icon → (320) 331-0910 tel link (tnum). Second row below border-top: MapPin icon → "418 Broadway, Ste. R, Albany, NY 12207, United States" address (spec asked for all 3 contact methods).
  • Closing: `<CTABanner title="Questions about billing?" subtitle="Our team is happy to clarify any policy details." />`

- Brand/voice check: ripgrepped all 5 new files (and the ContactFormSection.tsx) for `\b(AI|Ai)\b|LeadSphere|Sphere` → 0 matches. All user-visible text uses "Opus Solutions" / "Opus" contextually. No "AI" or "LeadSphere" anywhere.
- File names, component function names, import paths, CSS class names, and shared-component APIs all preserved/unchanged. Only new files created — no existing files modified.

- Verification:
  • `cd /home/z/my-project && bun run lint 2>&1 | tail -8` → output was just `$ eslint .` (exit 0, zero errors/warnings). Clean.
  • `curl -s -o /dev/null -w "%{http_code}"` for all 5 routes:
    - GET /contact → 200 (compile 2.7s, render 784ms on first hit; subsequent ~125ms)
    - GET /faqs → 200 (compile 1076ms, render 299ms; subsequent ~170ms)
    - GET /privacy-policy → 200 (compile 933ms, render 302ms; subsequent ~100ms)
    - GET /terms → 200 (compile 777ms, render 341ms; subsequent ~160ms)
    - GET /refund-policy → 200 (compile 720ms, render 173ms; subsequent ~160ms)
  • curl-grep of metadata titles confirmed all 5 render correctly: `<title>Contact — Opus Solutions</title>`, `<title>FAQs — Opus Solutions</title>`, `<title>Privacy Policy — Opus Solutions</title>`, `<title>Terms &amp; Conditions — Opus Solutions</title>`, `<title>Refund Policy — Opus Solutions</title>`.
  • curl-grep of page bodies confirmed all required content renders server-side:
    - /contact: "great work" gradient span, "Send us a message", "info@opussolutions.com", "Albany, NY" map label.
    - /faqs: "Frequently asked" gradient span, "Everything you need to know", 14 unique `faq-0`..`faq-13` accordion items, "Still have questions?" CTA.
    - /privacy-policy: "Last updated: January 2025", all 10 section headings (Introduction through Changes to This Policy), "Questions about privacy?" CTA.
    - /terms: "Last updated: January 2025", all 12 section headings (Acceptance of Terms through Governing Law + Contact), "Ready to get started?" CTA.
    - /refund-policy: "Last updated: January 2025", all 9 section headings (Overview through Compliance + Contact), "Questions about billing?" CTA.
  • dev.log shows clean compiles for all 5 routes, no runtime errors, no warnings.

Stage Summary:
- 5 new page routes delivered (6 files total): /contact (page.tsx + ContactFormSection.tsx), /faqs (page.tsx), /privacy-policy (page.tsx), /terms (page.tsx), /refund-policy (page.tsx).
- All 5 pages are Server Components that export typed `metadata` (Next.js 16 compatible — metadata export is forbidden from "use client" files, so interactive bits isolated into a separate client component only on /contact; /faqs uses shadcn Accordion (itself a "use client" component) directly from the server page; the 3 legal pages are pure server components with no client interactivity needed).
- All pages wrapped in `<SiteChrome>`, lead with `<PageHero>`, close with `<CTABanner />` per the brief.
- Premium dark glassmorphism preserved throughout: glass-strong cards with sheen, electric/violet/cyan/gold accent palette, ambient blur orbs, glowing electric dot bullets, gradient text spans (where spec'd), Reveal scroll-ins stagger, framer-motion success-state animation on the contact form, animated pinging green status dot on the stylized map, custom ChevronDown rotate-on-open accordion trigger.
- The contact page features a fully-interactive form (Name / Email / Phone / Company-Team / Service-of-Interest shadcn Select dropdown with all 8 services / Message textarea) with preventDefault submit → success state, plus 4 color-coded info cards (real email + 3 phone numbers + 3-line address + office hours) and a pure-CSS/SVG stylized map with a glowing centered Albany pin and dual pulse rings.
- The faqs page features all 14 required Q&As in a single-collapsible accordion with a rotating chevron pill, wrapped in Reveal stagger.
- The 3 legal pages share a consistent layout (single wide glass-strong card, header row with icon+title+last-updated caption, structured prose sections with optional electric-dot bullet lists, footer contact strip) for visual cohesion, with subtle accent-color differentiation in the corner orbs (privacy = electric+violet, terms = electric+cyan, refund = electric+gold).
- Lint clean (exit 0). All 5 routes return HTTP 200 with all required copy rendering server-side. No "LeadSphere" or user-visible "AI" text anywhere. No file names, component names, or existing import paths changed. Ready for preview.

---
Task ID: 5
Agent: main
Task: 4 UI changes — (1) Why We Are Different: remove white shade + change text to white; (2) animated blue gradient border on all cards; (3) reorder pricing cards to price → points → Get Started button; (4) make Get Started buttons work with Coinbase Commerce checkout.

Work Log:
- Task 1: Edited src/components/leadsphere/sections/AboutVaWorkflow.tsx "Why We Are Different" block — removed `<div className="absolute inset-0 bg-white/60" />` (white shade), replaced with dark gradient overlay `bg-gradient-to-br from-black/80 via-black/70 to-black/80`. Changed all `text-black` → `text-white`/`text-white/80` for heading, description, card titles, card descriptions. Updated card surface to `border-white/10 bg-white/5 backdrop-blur-md` and boosted accent orb/underline opacities for dark-bg legibility. Container border changed `border-black/15` → `border-white/10`.
- Task 2: Added new `.card-border-glow` utility in src/app/globals.css — uses `::after` pseudo-element with `padding: 1.5px`, the brand gradient `linear-gradient(120deg,#2563EB,#38BDF8,#14B8A6,#2563EB)`, `background-size: 200% 200%`, `animation: gradient-x 6s ease infinite`, and the `mask-composite: exclude` technique so only the 1.5px ring paints. `border-color: transparent !important` neutralises the existing glass border. Applied to GlassCard in src/components/leadsphere/primitives.tsx (so ALL GlassCard-based cards inherit it) AND to both FAQ AccordionItem lists (home + /pricing) via direct class add.
- Task 3: Reordered the PricingCard render in BOTH src/components/leadsphere/sections/PricingFaqCtaFooter.tsx (home) and src/app/pricing/page.tsx. New order: header → priceBlock → divider → features → CTA. Applied to all 3 variants (standard, top-selling, premium). Old order had CTA between price and features.
- Task 4: Coinbase Commerce crypto checkout:
  • Created src/app/api/checkout/route.ts (Node runtime, force-dynamic) — POST handler with an ALLOWED_PLANS whitelist (Trial $300 / Gold $600 / Platinum $1200) so the client can't inject arbitrary amounts. Calls `POST https://api.commerce.coinbase.com/charges` with `X-CC-Api-Key` + `X-CC-Version: 2018-03-22` headers, `pricing_type: fixed_price`, `local_price` in USD, redirect_url/cancel_url back to /pricing. Returns `{ hosted_url, charge_id }`. Graceful 503 when `COINBASE_COMMERCE_API_KEY` env var is unset; 400 for unknown plans; 502 if response lacks hosted_url.
  • Created src/components/leadsphere/CheckoutButton.tsx ("use client") — replaces the old static CtaButton. Manages idle/loading/error states, on click POSTs to /api/checkout and `window.location.href = hosted_url` to redirect to Coinbase hosted checkout. Loading shows spinner + "Redirecting…", error shows "Try again" + inline message that auto-resets after 4s. Solid variant keeps the brand gradient + shimmer; outline variant keeps the subtle border. aria-label includes plan name + "crypto via Coinbase Commerce".
  • Removed the local CtaButton function from both pricing files and swapped all 6 usages (3 per file) for `<CheckoutButton plan={plan.name} variant=...>`.
  • Added `COINBASE_COMMERCE_API_KEY=` (empty) to .env with a comment pointing to the Commerce Dashboard.
- Fixed a regression: removing `ArrowRight`/`Rocket` from the lucide imports in PricingFaqCtaFooter.tsx broke the page (they were still used at lines 810 + 1038). Re-added both imports.
- Verification: `bun run lint` → exit 0, zero errors. curl HTTP checks: GET / → 200, GET /pricing → 200, POST /api/checkout {plan:Gold} → 503 JSON (expected, no key), POST /api/checkout {plan:Hacker} → 400 JSON (expected, invalid). Agent Browser + VLM confirmed: Why-We-Are-Different section now has white text on dark background (no white shade); pricing cards (white bg) show the blue/teal animated gradient border; DOM order of home-page pricing card = [header, price, divider, features-UL, Get-Started-button] exactly as requested; clicking a Get-Started button flips it to "Try again" + "Coinbase Commerce is not configured…" message (graceful fallback). All 3 checkout buttons present on both / and /pricing with correct aria-labels.

Stage Summary:
- 4 files edited (AboutVaWorkflow.tsx, globals.css, primitives.tsx, PricingFaqCtaFooter.tsx, pricing/page.tsx, .env) + 2 new files (api/checkout/route.ts, CheckoutButton.tsx).
- All cards across the site now share the animated blue gradient border via the GlassCard primitive.
- Pricing card flow on both home and /pricing is now: name → price → divider → feature list → Get Started (Coinbase Commerce) button.
- Coinbase Commerce integration is fully wired — drop a real API key into `COINBASE_COMMERCE_API_KEY` and the buttons will create real charges and redirect to Coinbase's hosted checkout. Until then, buttons fail gracefully with an actionable message.

---
Task ID: 6
Agent: main
Task: 6 UI fixes — (1) Why We Are Different: remove black shade + fix invisible card content; (2) undo gradient border on pricing packages; (3) undo gradient border on blog cards; (4) fix invisible workflow connecting line; (5) Get Started page: wrap in SiteChrome + solid form borders; (6) fix desktop favicon stale cache.

Work Log:
- Task 1: Root cause = `glass-strong` CSS sets `background: rgba(255,255,255,0.98)` (white) which overrides `bg-white/5`, so white text on white cards was invisible. Fix: replaced `<GlassCard strong>` with a plain `<div className="... bg-slate-900/85 ...">` for the 3 "Why We Are Different" cards so the dark background is not overridden. Removed the section-level dark overlay (`bg-gradient-to-br from-black/80 via-black/70 to-black/80`). Added `drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]` to the heading/description for readability over the raw background image. Added a translucent `bg-black/40 backdrop-blur-sm` pill behind the "Why We Are Different" eyebrow badge. VLM-verified: cards are dark with readable white text, background image visible without heavy overlay.
- Task 2: Added a `glow?: boolean` prop (default `true`) to `GlassCard` in primitives.tsx. When `glow={false}`, the `card-border-glow` class is omitted. Passed `glow={false}` to all 6 pricing card GlassCard instances (3 in PricingFaqCtaFooter.tsx home + 3 in pricing/page.tsx). The top-selling and premium cards still keep their own custom animated border divs (electric/gold) as before — only the generic card-border-glow is removed.
- Task 3: Passed `glow={false}` to the blog post `<GlassCard sheen>` in blog/page.tsx. VLM-verified: blog cards now have normal simple borders, no animated gradient.
- Task 4: The workflow connecting line was `h-px bg-gradient-to-r from-electric/0 via-electric/40 to-electric/0` (1px, 40% max opacity = nearly invisible on white). Changed to `h-0.5 bg-gradient-to-r from-electric/20 via-electric/70 to-cyan/20 rounded-full` (2px, 70% max opacity, rounded). Also adjusted horizontal extent from `left-0 right-0` to `left-8 right-8` so the line starts/ends closer to the first/last icons. VLM-verified: line is now clearly visible.
- Task 5: Rewrote `get-started/page.tsx` to wrap the form in `<SiteChrome>` + `<PageHero>` + `<SectionShell>` + `<CTABanner>` — now matches the standard page layout (navbar, hero, footer) like /contact, /pricing, etc. In `GetStartedForm.tsx`: replaced all `border-[#E2E8F0]` (light gray, invisible on white) with `border-[#94A3B8]` (slate-400, solid visible). Replaced `bg-[#1E293B]/5` (translucent dark) with `bg-white` for input fields. Removed the "Back" link (navbar provides navigation). Removed unused `ArrowLeft` import. Card border also bumped from `#E2E8F0` to `#94A3B8`.
- Task 6: Root cause = `src/app/icon.svg` is auto-detected by Next.js App Router and injected as `<link rel="icon" href="/icon.svg">` WITHOUT a cache-busting query parameter. Desktop browsers cache SVG favicons aggressively, so the old cached version persists even after the file content was updated. Mobile browsers typically use the PNG favicons from `metadata.icons` (which have `?v=4` cache-busting). Fix: deleted `src/app/icon.svg` so Next.js no longer auto-injects it. Bumped all 5 favicon version parameters from `?v=4` to `?v=5` in `layout.tsx` metadata.icons (favicon-32, favicon-512, logo.svg, shortcut, apple-icon). Verified via DOM: all `<link rel=icon>` tags now use `?v=5` and there is no `/icon.svg` in the head.
- Verification: `bun run lint` → exit 0. All routes return 200 (/, /pricing, /blog, /get-started). Agent Browser + VLM confirmed all 6 fixes.

Stage Summary:
- 6 files edited (AboutVaWorkflow.tsx, primitives.tsx, PricingFaqCtaFooter.tsx, pricing/page.tsx, blog/page.tsx, get-started/page.tsx, get-started/GetStartedForm.tsx, layout.tsx) + 1 file deleted (app/icon.svg).
- GlassCard now has a `glow` prop for selectively toggling the animated gradient border.
- Why We Are Different cards use plain dark divs (not GlassCard) to avoid the white-background override.
- Workflow line is now 2px / 70% opacity / rounded (was 1px / 40% / square).
- Get Started page now has full SiteChrome (navbar + hero + footer) and solid form field borders.
- Desktop favicon stale-cache issue fixed by removing app/icon.svg and bumping cache-busting version to v=5.

---
Task ID: 7
Agent: main
Task: 5 UI changes — (1) flip FAQ/Contact order in home (form first); (2) remove map+address card from home Contact, update email; (3) remove pricing feature scroll + reduce card height; (4) remove testimonials carousel arrows; (5) add generated home hero images to Testimonials/Pricing/Blog/About pages.

Work Log:
- Task 1: In PricingFaqCtaFooter.tsx main export, moved `<ContactSection />` ABOVE the FAQ SectionShell. Also removed the "Still have questions? Contact support" prompt block from inside the FAQ section (no longer needed since Contact is right above). VLM/DOM-verified: Contact at y=11010, FAQ at y=11925.
- Task 2: Updated CONTACT_INFO.email from "info@opussolutions.com" → "info@opusglobalsolution.com". Removed the Address InfoCard and the StylizedMap component call from ContactSection's right column. Right column now shows only: Email card + Phones card + Office Hours card (3 cards in a 2-col grid, no map). VLM-verified: email updated, map/address removed.
- Task 3: Removed `custom-scroll overflow-y-auto max-h-72` from the features `<ul>` in both PricingFaqCtaFooter.tsx (home) and pricing/page.tsx — features now render in full without internal scrolling (page scroll handles it). Reduced card padding from `p-6 md:p-8` → `p-5 md:p-6` and internal gap from `gap-6` → `gap-5` across all 3 card variants (standard, top-selling, premium) in both files. DOM-verified: hasScroll=false, 12 features visible in first card.
- Task 4: Removed `<CarouselPrevious>` and `<CarouselNext>` from the TestimonialsCarousel in CrmIntegrationsTestimonials.tsx. Removed the now-unused `CarouselPrevious`/`CarouselNext` imports. The auto-scroll (3s interval) + dots pagination remain. This component is used by BOTH the home page and the /testimonials page, so the fix applies to both. DOM-verified: 0 arrow buttons, dots still present.
- Task 5: Generated 4 professional real estate home images (1344x768 landscape) via z-ai image CLI → saved to /public/heroes/{testimonials,pricing,blog,about}-home.jpg. Enhanced the `PageHero` component in SiteChrome.tsx with an optional `heroImage?: string` prop — when provided, renders a full-bleed `<img>` background with a `from-black/55 via-black/45 to-white` gradient overlay, switches heading text to white with drop-shadow, switches eyebrow pill to dark translucent glass. Added `heroImage` to all 4 pages (testimonials, pricing, blog, about) and set `withBackground={false}` on their `<SiteChrome>` so the default animated background doesn't conflict. VLM-verified on /testimonials: home image visible, white heading/description readable over the image.
- Verification: `bun run lint` → exit 0. All 5 routes return 200 (/, /pricing, /blog, /testimonials, /about). Agent Browser + VLM confirmed all 5 fixes.

Stage Summary:
- 7 files edited (PricingFaqCtaFooter.tsx, CrmIntegrationsTestimonials.tsx, SiteChrome.tsx, pricing/page.tsx, blog/page.tsx, about/page.tsx, testimonials/page.tsx) + 4 new images generated (/public/heroes/*.jpg).
- Home page section order is now: Pricing → Contact → FAQ → CTA → Footer (was Pricing → FAQ → Contact → CTA → Footer).
- Pricing cards show all features without internal scroll; cards are more compact (p-5/p-6, gap-5).
- Testimonials carousel on both home and /testimonials has no arrows (auto-scroll + dots only).
- 4 sub-page heroes now feature professional real estate home photography with readable white text overlay.
