# UI Bugs

Date: 2026-01-10

## Scope
- Visual and interaction regressions reported in the UI bug list.
- Fixes are limited to system-compliant Tailwind classes and existing components.

## Status

### Nav
- Nav glassiness stronger (more transparent glass). — FIXED
- All nav links are scroll-based and map to in-page sections (no page jumps). — FIXED

### Hero
- CTA padding symmetry (right equals left). — FIXED
- CTA buttons full width on mobile/tablet (not half width). — FIXED
- Portrait size +20% on mobile only. — FIXED
- Desktop burger hidden + Book a Call action visible. — FIXED

### Proud to have worked with
- Hover toast shows full company name without cropping. — FIXED

### Featured Works
- Segment tabs are smooth-corner (not pill) and fit their content width (not full-width bar). — FIXED
- Spacing between tabs and stacked cards matches title/body spacing (~32px). — FIXED

### Voices of Impact
- Scroll lag reduced by lighter transforms and tighter marquee layout. — FIXED
- Vertical spacing between rows reduced and aligned. — FIXED
- Card radius increased to 40px with smooth corners. — FIXED

### Internal pages
- Sticky back button added for project detail and blog article pages. — FIXED

### Global motion
- Section entrance animation (content from bottom to top) applied consistently. — FIXED

## Tests
- `npm run build` — success (2026-01-10)
