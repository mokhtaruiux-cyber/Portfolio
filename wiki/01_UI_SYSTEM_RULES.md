# UI System Rules (Tailwind + Motion) — REQUIRED
**Status:** REQUIRED — single source of truth for UI behavior.  
**Applies to:** Nav + all sections + all routes + all breakpoints.  
**Goal:** Zero drift, zero guessing, consistent across browsers & devices.

---

## 0) Definition of Correct (Non-Negotiable)
A UI change is “correct” only if ALL are true:

1) One container system (same max width + same gutters everywhere)
2) Mobile-first breakpoints (base=mobile; breakpoints enhance)
3) Predictable grid (only approved presets)
4) No horizontal overflow (no sideways scroll anywhere)
5) Unified motion (one source of tokens, same behavior on desktop/tablet/mobile)
6) iPhone parity for StackedCards (projects pinned/stacked like desktop)

---

## 1) Technology Contracts (Mandatory)
### 1.1 TailwindCSS usage contract
- Tailwind utilities are the ONLY layout styling method (no ad-hoc CSS for layout).
- Custom CSS is allowed only for:
  - global resets
  - scrollbar hiding helpers
  - rare browser quirks (must be documented)

### 1.2 React usage contract
- Layout must be component-driven:
  - `components/layout/Container.tsx` is the only width/gutter authority.
  - `components/layout/Section.tsx` is the only section spacing authority.

### 1.3 Motion usage contract
- All motion timing/variants/viewport defaults MUST come from `lib/motionTokens.ts`.
- No duplicate systems (no separate motion config files drifting).

---

## 2) Breakpoints Policy (Repo Standard)
Tailwind is mobile-first. Approved strategy:
- Base (no prefix): mobile (0px+)
- sm: small phones/large phones
- md: tablets/small laptops (main layout shift)
- lg: desktop
- xl/2xl: only when truly needed

Rules:
- Do not jump base → lg without documenting why.
- Card/list sections MUST follow 1→2→3 columns unless justified.

---

## 3) Container Policy (Single Source of Truth)
Required container contract (do not violate):
`mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-10`

Rules:
- Nav MUST use `<Container />` (no duplicated classes).
- All sections MUST use `<Section>` which uses `<Container>`.
- Full-bleed backgrounds are allowed, but content MUST remain in Container.

Acceptance:
- Left edge of nav links == left edge of section titles == left edge of grids/cards (all breakpoints).

---

## 4) Grid Presets (Use Presets Only)
Stop inventing new grids per section.

### 4.1 Card/List sections (Projects/Blog/Testimonials/any list)
Required default:
`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8`

If 2-column is desired:
`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8`

### 4.2 Feature split (text + image / two column)
`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10`

### 4.3 Metrics grid (small stats blocks)
`grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6`

### 4.4 Footer
Preferred:
`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
Allow `xl:grid-cols-4` only if content requires.

Grid rules:
- Avoid extreme gaps like `gap-20` unless approved & documented.
- Avoid fixed pixel widths inside responsive grids unless necessary & documented.

---

## 5) Spacing Rhythm (Global Vertical System)
Target rhythm = 96px between sections.

Section padding:
- strict: `py-24`
- responsive default: `py-16 md:py-24`

Inside-section spacing:
- `space-y-6 md:space-y-8`
- `mt-10 md:mt-12` between title block and content grid

Prohibited:
- `sm:py-48` or similar unless approved.

---

## 6) Typography Safety Rules
- Use `lib/typography.ts` tokens for headings/body everywhere.
- Avoid hardcoded giant sizes per section.
- Prevent layout blow-ups using max width constraints:
  - H1: `max-w-[18ch]`
  - H2: `max-w-[24ch]`
  - Body: `max-w-[60ch]`

---

## 7) Overflow Policy (No Masking)
- Fix overflow at the source. Do not “solve” by hiding it only.

Global guard (allowed):
`html, body { overflow-x: hidden; }`

But you MUST still identify and fix overflow sources:
- marquee/logos
- backgrounds with vw sizes
- fit-content + whitespace-nowrap patterns

---

## 8) Motion Policy (Unified + Fast)
Single source: `lib/motionTokens.ts`

Scroll-linked animations must animate only:
- `transform`
- `opacity`

Avoid during scroll:
- filter/blur/backdrop-filter
- heavy shadows
- layout properties causing reflow

Mobile/tablet must have the same animations as desktop.

---

## 9) StackedCards iPhone Parity (Critical)
To avoid iPhone Safari sticky issues:
1) Container must have deterministic total height based on card count (svh/dvh friendly).
2) No transforms on any ancestor of `position: sticky`.
3) Sticky top should be stable and tested on iPhone.

Acceptance:
- Projects pinned/stacked in-section on iPhone Safari exactly like desktop.
- No late pop-in, no jank after 1–2 cards.
