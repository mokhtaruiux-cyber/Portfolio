# UI Spacing & Layout Rhythm Audit

Date: 2026-01-26
Scope: Read-only audit of spacing/layout rhythm. No code changes were made.
Skills referenced: baseline-ui, vercel-react-best-practices, vite-react-best-practices, accessibility, web-quality-audit.

## Inventory (current system)
- Section wrapper: `components/layout/Section.tsx` uses `py-16 md:py-24` by default.
- Container wrapper: `components/layout/Container.tsx` uses `max-w-[1200px] px-4 sm:px-6 lg:px-10`.
- Spacing scale used (global): `0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 28, 32, 48`.
- Gap scale used: `0, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 24`.

## Top 10 spacing inconsistencies (with evidence)
1) Hero section vertical padding deviates from standard section rhythm.
   - Evidence: `components/sections/Hero.tsx` uses `pt-24 pb-12 md:pt-32 md:pb-16` while `components/layout/Section.tsx` uses `py-16 md:py-24`.
2) Blog article header adds `pt-28 md:pt-32` on top of a Section wrapper, risking double top padding.
   - Evidence: `components/pages/BlogArticlePage.tsx` uses `<Section className="pt-28 md:pt-32">`.
3) CTA card padding is larger than other cards/panels, creating inconsistent interior spacing.
   - Evidence: `components/sections/CTASection.tsx` uses `p-8 sm:p-12 md:p-16` vs `components/sections/AboutSection.tsx` and `components/sections/HowIHelpSection.tsx` using `p-6 sm:p-8`.
4) Grid gaps vary by section without a shared rhythm.
   - Evidence: `components/sections/AboutSection.tsx` `gap-8 md:gap-10`, `components/sections/BlogSection.tsx` `gap-6 md:gap-8`, `components/sections/HowIHelpSection.tsx` `gap-6 md:gap-8`.
5) Heading-to-body spacing is inconsistent (mb vs mt patterns).
   - Evidence: `components/pages/BlogIndexPage.tsx` uses `mb-6` on heading; `components/sections/Experience.tsx` uses `mt-4` on body.
6) Project card padding scales more aggressively than other cards.
   - Evidence: `components/cards/ProjectCardWrapper.tsx` uses `p-6 sm:p-10 md:p-16 lg:p-20` vs `components/blog/BlogCard.tsx` content `p-8 sm:p-10`.
7) Badge/chip sizing varies between sections.
   - Evidence: `components/sections/Hero.tsx` uses `px-3 py-1`, `components/sections/CTASection.tsx` uses `px-4 py-2`, `components/blog/BlogCard.tsx` uses `px-4 py-2`, `components/cards/ProjectCardWrapper.tsx` uses `px-3 py-1`.
8) Text block max-widths vary by section, leading to uneven line lengths.
   - Evidence: `components/sections/TestimonialsSection.tsx` uses `max-w-xl`, `components/sections/BlogSection.tsx` uses `max-w-2xl`, `components/pages/BlogArticlePage.tsx` uses `max-w-[60ch]`.
9) Section intro spacing uses a mix of `mb-10`, `mb-6`, and `space-y-*` patterns.
   - Evidence: `components/sections/BlogSection.tsx` `mb-10`, `components/pages/BlogIndexPage.tsx` `mb-10`, `components/pages/BlogArticlePage.tsx` `space-y-10`.
10) Small control heights differ between components.
   - Evidence: `components/ui/SegmentTabs.tsx` uses `h-11` container + `h-9` buttons; `components/ui/GlowButton.tsx` uses `h-12` for CTA.

## Proposed normalized spacing scale (Tailwind-friendly)
Use a tighter, consistent set derived from current values:
- Micro: `1, 2, 3, 4`
- Small: `6, 8`
- Medium: `10, 12, 16`
- Large: `20, 24, 32`
- Extra: `48` (only for standout hero/feature sections)

## Proposed rules (no design intent change)
- Sections:
  - Default: `py-16 md:py-24` (keep `Section` default).
  - Hero or feature section exceptions: `pt-24 pb-16 md:pt-32 md:pb-20` only when needed.
- Cards / Panels:
  - Standard card: `p-6 sm:p-8`.
  - Large feature card: `p-8 sm:p-10`.
- Lists / vertical rhythm:
  - Heading-to-body: `mb-4` or `mb-6` consistently; avoid mixing `mt-4` on body unless needed for alignment.
  - Paragraph stacks: `space-y-6` (mobile) and `space-y-8` (desktop) for long-form content.
- Grids:
  - Standard: `gap-6 md:gap-8`.
  - Dense: `gap-4 md:gap-6` (only for compact areas).
- Chips / badges / labels:
  - Standard chip: `px-3 py-1`.
  - Premium badge (CTA): `px-4 py-2` only when it is a featured callout.
- Containers:
  - Keep `max-w-[1200px]` outer container, normalize text blocks to `max-w-2xl` or `max-w-[60ch]` consistently per section type.
- Accessibility:
  - Ensure tap targets are >= 44px (e.g., keep `h-11` or `h-12` for controls).

## Safe change plan (proposal only)
P0 (visual jumps / misalignments)
- Normalize section padding where Section wrappers are overridden (`components/pages/BlogArticlePage.tsx`).
- Align hero section padding to the section rhythm unless the hero truly needs extra height (`components/sections/Hero.tsx`).

P1 (unify section paddings + container widths)
- Align intro spacing (`mb-10`, `mb-6`, `space-y-*`) to a single pattern per section type.
- Standardize text max-widths to one of: `max-w-2xl` for short copy, `max-w-[60ch]` for long-form.

P2 (micro-spacing polish)
- Normalize chip/badge padding sizes across sections.
- Normalize grid gaps (`gap-6 md:gap-8`) in content sections.
- Align small control heights across SegmentTabs and other controls while keeping >=44px tap targets.

