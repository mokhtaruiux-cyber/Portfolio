# Implementation Playbook (How to Apply UI System Repo-wide)
**Status:** REQUIRED — follow this process in order.  
**Goal:** Apply the UI system without wasting time or causing regressions.

---

## Phase 0 — Prep
1) Work on a new branch.
2) Do not redesign. This is a systems refactor:
   - container alignment
   - grid presets
   - spacing rhythm
   - unified motion tokens
   - overflow fixes
   - iPhone stacked cards parity

---

## Phase 1 — Container Unification
### What to do
- Ensure Navbar and Mobile Menu use `components/layout/Container.tsx` directly.
- Remove duplicated `max-w-[1200px] px-*` blocks from App.tsx.

### Expected outcome
- Any section title aligns with nav links on every breakpoint.

---

## Phase 2 — Grid Normalization (All Sections)
### Step 1: Classify each section
For every section/route, classify as:
- Card/List section → use grid preset 4.1
- Feature split → use preset 4.2
- Metrics sub-grid → use preset 4.3
- Footer → preset 4.4

### Step 2: Replace ad-hoc grids
- Replace any `grid-cols-1 lg:grid-cols-*` patterns that skip md (unless documented).
- Normalize gaps to `gap-6 md:gap-8` or the approved preset.

### Do not
- Do not introduce new presets.
- Do not hardcode pixel widths in grid items unless necessary.

---

## Phase 3 — Spacing Rhythm
### What to do
- Make all sections follow:
  - `py-24` (preferred)
  - or `py-16 md:py-24` (allowed)
- Remove section-specific extreme padding classes.

### Expected outcome
- Scroll rhythm feels consistent like a premium template.

---

## Phase 4 — Typography Tokenization
### What to do
- Replace inline heading classes with `lib/typography.ts` tokens.
- Apply max-width constraints to headings for predictable wrapping:
  - H1 `max-w-[18ch]`
  - H2 `max-w-[24ch]`

### Expected outcome
- Typography feels consistent across all sections and devices.

---

## Phase 5 — Motion Unification
### What to do
- Consolidate to ONE motion source:
  - `lib/motionTokens.ts`
- Update motion components to use these tokens:
  - SectionTitle reveal
  - FadeInUp/Reveal wrappers
  - Any whileInView variants

### Rules
- Content motion should feel consistent on desktop/tablet/mobile.
- Heavy background/blur effects may be gated on mobile for performance (document the exception).

### Performance guardrails
- Scroll-linked animations must animate only transform/opacity.
- Avoid blur/backdrop-filter during scroll.

---

## Phase 6 — Overflow Elimination (Source Fix, Not Masking)
### What to do
1) Identify offending elements using the overflow proof script (see QA doc).
2) Fix the source:
   - Logos/marquee: outer wrapper must be overflow-hidden; remove overflow-visible in layout wrappers.
   - Background blobs: must be inside overflow-hidden wrapper and must not contribute to layout width.
3) Re-run the script until zero offenders remain (except expected internal scroll containers).

---

## Phase 7 — StackedCards iPhone Parity
### What to do
- Make StackedCards container height deterministic:
  - total height depends on card count (svh/dvh friendly).
- Ensure no ancestor of sticky uses transform.
- Keep motion transforms on children, not sticky wrapper.

### Expected outcome
- iPhone Safari behaves like desktop: pinned/stacked, smooth, no pop-in.

---

## Output Requirements
After finishing, deliver:
1) A short report listing:
   - Which sections mapped to which grid presets
   - Which files changed for Container unification
   - Which motion files now import from motionTokens
   - Which overflow offenders were removed and how
2) Proof checks completed (see `03_QA_AND_PROOF.md`)
