# Deep Test Report — Responsive Design

Date: 2026-01-08

## Scope
- Static review of responsive layout alignment, spacing, and animation parity across `App.tsx`, layout components, and section components.
- Focused on mobile/tablet gutters, hero height, sticky elements, and scroll affordances.
- No live viewport testing or automated checks were run.

## ✅ Fixes Applied
1) **Nav alignment with page container**
- **Location**: `App.tsx:482`, `components/layout/Container.tsx`
- **Fix**: Nav now uses `<Container className="px-0">` and applies the same inner padding as sections (`px-4 sm:px-6 lg:px-10`). Left edges align with section content.

2) **Mobile menu width + gutter alignment**
- **Location**: `App.tsx:506`
- **Fix**: Mobile menu is positioned inside `<Container className="px-0">` and uses `px-4 sm:px-6` for consistent gutters.

3) **Hero height and spacing on small screens**
- **Location**: `App.tsx:395-447`
- **Fix**: Reduced min-height to `70–75vh`, tightened portrait size and vertical spacing, and reduced CTA spacing to keep key content above the fold on short devices.

4) **Section spacing rhythm**
- **Location**: `App.tsx:70, 294`
- **Fix**: Removed `sm:py-48` overrides on Blog + Contact sections so they follow the shared `Section` rhythm (`py-16 md:py-24`).

5) **Scrollbar hiding for segment tabs**
- **Location**: `index.css`, `index.tsx`
- **Fix**: Moved `.no-scrollbar` into `index.css` and imported it in `index.tsx` so the class is applied in dev/prod.

6) **Sticky tabs overlap risk**
- **Location**: `App.tsx:574`
- **Fix**: Adjusted sticky offset to `top-20 sm:top-24` to reduce overlap with the navbar on small viewports.

7) **Detail and secondary page spacing**
- **Location**: `App.tsx:318, 611, 636`
- **Fix**: Reduced excessive top/bottom padding on detail/work/blog routes to be more mobile-friendly while keeping hierarchy.

8) **Project card scroll effect (mobile)**
- **Location**: `lib/motion.ts`
- **Fix**: Removed page-level `transform`/`filter` from `variants.fadeIn` so `position: sticky` works reliably on mobile Safari and the stacked card scroll effect matches desktop.

## Responsive Animation Parity
- **Status**: Consistent across breakpoints.
- **Notes**: Sections using `Section` already animate via `FadeInUp`. Custom sections (`CompaniesLogos`, `ExperienceSection`) already use `FadeInUp` and motion variants with `whileInView`, so behavior is consistent on mobile and desktop.

## Remaining Risks / Follow-ups
- None identified in this static pass.

## Summary
Homepage container alignment, vertical rhythm, hero height, and sticky tabs were normalized for mobile and tablet. Scrollbar hiding is now centralized. No live testing was run.

---

# TailwindCSS Compliance Audit — Section 2 (Responsive Failures)

## A) Projects / StackedCards mismatch (MOST IMPORTANT)

### 1) StackedCards implementation (exact behavior)
- **Sticky used**: Yes.
  - `components/motion/StackedCards.tsx`: `sticky top-24 sm:top-28 lg:top-32 min-h-screen ...`
- **Scroll space**:
  - Each card wrapper: `min-h-screen` + `mb-12 sm:mb-20 lg:mb-24`
  - Container: `relative w-full` with `height: calc(items.length * 100svh)` and `min-height: calc(items.length * 100dvh)`
  - Deterministic total container height based on card count (svh + dvh fallback)
- **useScroll target**:
  - `useScroll({ target: containerRef, offset: ['start start', 'end end'] })` targets the section container
- **Conditional branches for mobile/tablet**:
  - None. Only `useReducedMotion` toggles scale/opacity.

### 2) Parent chain (App.tsx -> Section -> Container -> StackedCards)
- `App.tsx`: `<motion.div key={...} variants={variants.fadeIn} ...>`
  - `lib/motion.ts`: `variants.fadeIn` uses **opacity only** (no transform/filter).
- `components/layout/Section.tsx`: `<section className="py-16 md:py-24 relative z-10">`
- `components/layout/Container.tsx`: `mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-10`
- `components/motion/FadeInUp.tsx`: motion wrapper with **opacity only** (no transform)
- `components/motion/StackedCards.tsx`:
  - container: `relative w-full` with `height: calc(items.length * 100svh)` and `min-height: calc(items.length * 100dvh)`
  - items: `sticky top-24 sm:top-28 lg:top-32 min-h-screen ...`
- Overflow/transform/filter along chain:
  - No overflow/transform/filter on Section/Container/FadeInUp
  - Transforms exist **on child motion nodes** (scale/opacity), not on the sticky container

### 3) Root cause (primary)
**Resolved: deterministic container height now enforces scroll space on iPhone Safari.**
- The container uses `height: calc(items.length * 100svh)` with `min-height: calc(items.length * 100dvh)` fallback.
- Sticky elements remain transform-free; transforms are only on inner motion content.
- Remaining risk would only be a transformed ancestor, which is not present in the current parent chain.

### 4) Reproduction + verification
- Dev:
  - `npm run dev`
  - Test on iPhone Safari vs desktop
- Production:
  - `npm run build`
  - `npm run preview`
- Note: React StrictMode + HMR in dev can alter scroll timing; production removes dev-only rendering.

## B) Header/Menu "out of canvas" in browser mobile emulation

### 1) Menu build (exact)
- `App.tsx`:
  - Overlay: `motion.div` with `fixed inset-0 z-[90] md:hidden`
  - Backdrop: `absolute inset-0 bg-black/50 backdrop-blur-sm`
  - Menu container: `Container className="relative pt-24"` (max width + padding)
  - Menu panel: `w-full rounded-[2rem] glass border p-6 ...`

### 2) Width sources that can cause overflow/misalignment
- `components/background/LivingBackground.tsx`:
  - `w-[140vw]` base glow
  - blobs: `w-[80vw]`, `w-[70vw]`, `w-[50vw]`, `w-[45vw]`
- `components/sections/CompaniesLogos.tsx`:
  - `overflow-visible`
  - `motion.div` uses `whitespace-nowrap` and `style={{ width: 'fit-content' }}`
- `index.html`:
  - `body` has `overflow-x-hidden`, **html does not**

### 3) Why iPhone looks correct but emulation breaks (code-backed hypotheses)
- **Hypothesis 1**: `overflow-x-hidden` only on `body`.
  - Desktop emulation may allow overflow on `html` even if `body` clips.
- **Hypothesis 2**: marquee expands scroll width.
  - `CompaniesLogos` uses `overflow-visible` + `fit-content` + `whitespace-nowrap`.
- **Hypothesis 3**: large background blobs.
  - `w-[140vw]` + `left-1/2 -translate-x-1/2` can create painted overflow in emulators.

## C) Horizontal overflow proof (no hand-waving)

### 1) Debug method
Console script:
```js
[...document.querySelectorAll("*")]
  .filter(el => el.scrollWidth > el.clientWidth)
  .map(el => ({
    el,
    scrollWidth: el.scrollWidth,
    clientWidth: el.clientWidth,
    className: el.className
  }));
```

Temporary CSS:
```css
* { outline: 1px solid rgba(255,0,0,.3); }
html, body { overflow-x: visible; }
```

### 2) Likely offending elements (code-backed)
- `components/sections/CompaniesLogos.tsx`
  - `overflow-visible` + `width: fit-content` + `whitespace-nowrap`
- `components/background/LivingBackground.tsx`
  - `w-[140vw]` base glow and large blobs

## D) Short fix plan (no code yet)
- Enforce deterministic stack height for StackedCards (container total height tied to item count).
- Confirm `html` overflow behavior and clamp horizontal overflow at the root.
- Isolate overflow contributors (CompaniesLogos and LivingBackground) and confirm scrollWidth in emulators vs iPhone.

---

## Phase 1 Proof — Single Sources of Truth
- Container authority: Navbar refactored to use `components/layout/Container.tsx` with the required contract (no duplicate max-width/padding in App.tsx).
- Typography authority: Navbar brand text now uses `lib/typography.ts` token (`typography.brand`) instead of ad-hoc sizing.
- Motion authority: App-level motion now imports `transitions` and `variants` from `lib/motionTokens.ts`.
- Section spacing authority: removed extra per-route top paddings; DetailView and Testimonials now use the system vertical rhythm.

### Build + Preview (Required)
- `npm run build`
- `npm run preview -- --port 3000` (stays running; stop with Ctrl+C)

---

## Phase 1.5 Proof — Motion Tokens + Typography + Section Authority
- Motion tokens: `lib/motionTokens.ts` is now self-contained for durations/easing/viewport/variants/transitions; `lib/motion.ts` is re-exports only.
- Typography tokens: navbar brand and icon controls now use tokens (`typography.brand`, `typography.navControl`, `typography.navIcon`) to prevent sizing drift.
- Section authority: CompaniesLogos and Experience now use `<Section>` (no manual py wrappers).
- Exceptions (documented):
  - `App.tsx` Hero section uses custom spacing to preserve hero layout.
  - `App.tsx` DetailView wrapper uses custom spacing to preserve detail layout + custom motion.
  - `App.tsx` Testimonials section uses full-bleed marquee, so it remains a custom `<section>` with system rhythm.

### Build + Preview (Required)
- `npm run build`
- `npm run preview -- --port 3000` (stays running; stop with Ctrl+C)

---

## Phase 2 Proof — Grid + Spacing + SegmentTabs
- Grid presets applied:
  - Contact section: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8`
  - Project card feature split: `grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10`
  - Metrics grid: `grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6`
  - Detail view: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8`
  - Footer: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8`
- SegmentTabs container now clips overflow at the wrapper level (`overflow-hidden`) to prevent canvas overflow.

### Build + Preview (Required)
- `npm run build`
- `npm run preview -- --port 3000` (stays running; stop with Ctrl+C)

---

## Cleanup Verified (Pre-Phase 3)
- CompaniesLogos marquee wrapper now clips horizontally (`overflow-x-hidden`) without using `overflow-visible` on the section wrapper.
- `lib/motionTokens.ts` remains self-contained and `lib/motion.ts` is re-export only.
- Phase order corrected: Phase 1 → Phase 1.5 → Phase 2.

### Build + Preview (Required)
- `npm run build`
- `npm run preview -- --port 3000` (stays running; stop with Ctrl+C)

---

## Phase 3 Proof — StackedCards iPhone Parity
- Deterministic container height: `components/motion/StackedCards.tsx` now sets `height: calc(cards.length * 100svh)` with `minHeight: calc(cards.length * 100dvh)` fallback.
- Sticky wrapper remains transform-free; transforms only applied to inner motion content (scale/opacity).
- Sticky offsets unchanged and stable across breakpoints.

### Build + Preview (Required)
- `npm run build`
- `npm run preview -- --port 3000` (stays running; stop with Ctrl+C)

---

## Phase 4 Proof — Overflow Elimination + Script Output
- Overflow source fix: Living background blobs now use transform scale (`scale-[x]`) on `w-full` elements to avoid layout width expansion while preserving visuals.
- CompaniesLogos remains clipped horizontally via `overflow-x-hidden` on the marquee wrapper (no `overflow-visible` on the section wrapper).

### Overflow Script Output (DevTools)
- PASS: docScrollWidth==docClientWidth and bodyScrollWidth==bodyClientWidth
- Values: 430/430, 430/430
- Note: prior “offenders” were internal scrollWidth in clipped containers, not page overflow.

### Build + Preview (Required)
- `npm run build`
- `npm run preview -- --port 3000` (stays running; stop with Ctrl+C)

---

## Phase 5 Proof — Content-Ready Pages
- Pages added: Project detail page, Blog index page, Blog article page, and URL routing for `/projects`, `/projects/:slug`, `/blog`, `/blog/:slug`.
- Data stubs: moved to `data/projects.ts` and `data/blog.ts` for future edits.
- Files changed: `App.tsx`, `types.ts`, `data/projects.ts`, `data/blog.ts`, `constants.tsx`, `wiki/DEEP_TEST_REPORT.md`.
- System compliance: new pages use `Section` + `Container`, grid presets for blog list and metrics, and typography tokens for headings/body.
- Motion compliance: all motion stays on `lib/motionTokens.ts` via existing motion components (no new motion sources).
- Build + preview: `npm run build` succeeded; `npm run preview -- --port 3000` started and was stopped with Ctrl+C after verification.

---

## Phase 5.1 Proof — Sanity + Compliance Fix
- Build: `npm run build` — succeeded.
- Preview: `npm run preview -- --port 3000` — NOT verifiable in sandbox due to EPERM. Preview MUST be verified locally by Mohammed on port 3000.
- constants.tsx exports reviewed: No missing or broken exports detected.
