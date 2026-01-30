# Athos Reference Protocol (Dimensions + Rhythm)
**Status:** REQUIRED — measurement reference only (NO code copying)  
**Source:** https://athos-dark.framer.ai  
**Purpose:** Use Athos as a visual + dimensional benchmark to validate layout, spacing, grid, and motion quality across browsers.

This document defines HOW to measure Athos and HOW to translate those measurements into reusable tokens inside this repo.

---

## 0) What Athos is (and is NOT)

Athos is:
- A **visual rhythm + proportion reference**
- A **cross-browser–proven layout system**
- A benchmark for:
  - container width
  - gutters
  - vertical spacing
  - grid behavior
  - motion subtlety

Athos is NOT:
- A source of copied code
- A source of Framer-specific logic
- A reason to introduce new breakpoints or ad-hoc values

---

## 1) What MUST be measured (no guessing)

Measure ONLY via DevTools → Computed styles.

### Required measurements
For each major section type (Hero, Projects, Logos, Testimonials, Footer):

- Content max width
- Left/right gutters (padding)
- Section vertical spacing (distance to next section)
- Grid:
  - column count per breakpoint
  - row/column gaps
- Card:
  - border-radius
  - border width
  - shadow / elevation
- Buttons:
  - height
  - horizontal padding
  - radius
- Tabs / Segmented controls:
  - height
  - internal padding
  - gap between items
- Motion (qualitative):
  - entrance direction
  - distance (approx px)
  - duration feel (fast / medium / slow)
  - easing feel (linear vs ease-out)

---

## 2) Breakpoints to measure (fixed)

You MUST inspect Athos at these viewport widths:

- **Mobile:** 375px
- **Tablet:** 768px
- **Desktop:** 1280px+

Do NOT invent custom widths.

---

## 3) How to measure (repeatable procedure)

For EACH section type:

1) Inspect the section wrapper
   - Record `max-width`
   - Record `padding-left/right`
2) Inspect grid wrapper
   - Record `grid-template-columns`
   - Record `gap`
3) Inspect a card
   - Record `border-radius`
   - Record `border-width`
   - Record shadow values
4) Inspect buttons / tabs
   - Record `height`
   - Record `padding`
5) Observe motion
   - Direction (Y+ fade / scale / etc.)
   - Approx travel distance
   - Relative duration

Repeat steps at:
- 375px
- 768px
- 1280px+

---

## 4) Translation rules (CRITICAL)

### You are NOT allowed to:
- Add new Tailwind classes ad-hoc
- Hardcode pixel values inside components
- Create section-specific grids or spacing

### You MUST:
Convert Athos measurements into **shared repo tokens only**:

| Athos Measurement | Repo Location |
|------------------|---------------|
| Max width / gutters | `components/layout/Container.tsx` |
| Section spacing | `components/layout/Section.tsx` |
| Grid columns/gaps | grid presets in UI_SYSTEM_RULES |
| Typography scale | `lib/typography.ts` |
| Motion timing/easing | `lib/motionTokens.ts` |
| Tabs height/radius | shared UI components |

If a measurement does not map cleanly → **do NOT use it**.

---

## 5) Motion parity rules (Athos → Motion Tokens)

Athos motion characteristics:
- Subtle
- Short travel
- Ease-out
- No heavy blur during scroll

### Translation rules
- Entrance animations = translateY + opacity only
- Travel distance ≈ 12–24px (max)
- Duration ≈ 0.4–0.6s
- Easing ≈ easeOut / cubic-bezier(0.22, 1, 0.36, 1)

ALL of this must live in:
`lib/motionTokens.ts`

No per-component motion invention allowed.

---

## 6) Safari / Mobile validation (non-negotiable)

Athos works correctly on:
- Desktop Chrome
- Mobile Safari
- Tablet layouts

Therefore, after translation you MUST verify:

- No horizontal scroll
- Same visual rhythm on:
  - desktop
  - mobile emulation
  - real iPhone Safari
- Sticky / stacked behaviors feel identical in intent

If it works on Athos and not here → **our implementation is wrong**.

---

## 7) Acceptance checklist (must pass ALL)

- [ ] Container width + gutters visually match Athos proportions
- [ ] Section spacing feels even and consistent
- [ ] Grid behavior matches Athos at 375 / 768 / 1280
- [ ] Buttons & tabs feel proportionate (not oversized on mobile)
- [ ] Motion feels calm, not jumpy or laggy
- [ ] No sideways scroll at any breakpoint
- [ ] iPhone Safari behavior matches desktop intent

---

## 8) Enforcement rule

If any implementation:
- breaks UI rhythm
- adds ad-hoc spacing
- invents grid rules
- or diverges from tokens

→ it MUST be reverted.

Athos is the visual judge.
Repo tokens are the technical judge.
