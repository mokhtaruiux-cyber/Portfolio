# Motion Audit

**Date:** May 11, 2026
**Scope:** Brief-driven GetBitBang-style scroll reveal pass for the sections listed in `codex-animation-brief.docx`.

## Source Of Truth

- `lib/motion/tokens.ts` defines the single timing, easing, distance, stagger, and viewport threshold source.
- `lib/motion/variants.ts` exports `fadeUp`, `fadeUpSubtle`, `scaleReveal`, `staggerParent`, and `sectionOrchestrator`.
- `lib/motion/presets.ts` exports the `reveal` preset object used by sections and child content.

`presets.ts` keeps the brief API exactly, but uses static ES imports so the existing Vitest/Next toolchain can compile it without CommonJS `require` failures.

## What Was Broken

- Section titles had visible reveal motion, but body copy, cards, CTAs, and media often remained hidden until they suddenly appeared or were already static by the time the user reached them.
- Portfolio cards and final CTA were not part of one clear reveal sequence.
- Reduced-motion mode could hydrate without errors after removing full-tree reduced-motion swaps, but server-rendered hidden reveal styles still needed a reduced-motion visibility override.
- Lenis had been migrated away from the brief's requested setup.

## What Was Fixed

- Added the brief motion files: `tokens.ts`, `variants.ts`, and `presets.ts`.
- Rebuilt the listed sections around one section trigger plus inherited child variants.
- Hero now uses the brief's above-the-fold mount exception with `animate`, not `whileInView`.
- About, Services, Portfolio, Testimonials, and Contact now reveal heading, body, cards/media, and CTA content progressively.
- Portfolio final `View All Work` CTA now lives inside the same card-grid reveal sequence and appears after the project cards begin cascading.
- Lenis now uses one `@studio-freight/lenis` instance and one manual RAF loop in `components/providers/SmoothScrollProvider.tsx`.
- Removed active `lenis` package usage and replaced old `useLenis` scroll calls with native scroll calls.
- Reduced motion now forces reveal-hidden inline styles visible with no transform, while preserving stable initial HTML.

## Section Choreography Pass

| Section | Title animation | Body/content animation | Cards/media animation | Presets used | Remaining issue |
|---|---:|---:|---:|---|---|
| Hero | Yes | Yes | Yes | `reveal.heading`, `reveal.body`, `reveal.cardGrid`, `reveal.card` | None |
| About | Yes | Yes | Yes | `reveal.heading`, `reveal.body`, `reveal.cardGrid`, `reveal.card` | None |
| Portfolio | Yes | Yes | Yes | `reveal.heading`, `reveal.body`, `reveal.cta`, `reveal.cardGrid`, `reveal.card` | None |
| Services | Yes | Yes | Yes | `reveal.heading`, `reveal.body`, `reveal.cardGrid`, `reveal.card`, `reveal.cta` | None |
| Testimonials | Yes | Yes | Yes | `reveal.heading`, `reveal.body`, `reveal.cardGrid`, `reveal.card` | None |
| Contact | Yes | Yes | N/A | `reveal.heading`, `reveal.body`, `reveal.cta` | None |

## Browser Observations

- Desktop `1440x900`: hero H1 moved from opacity `0.599`, y `11.2` at 80ms to opacity `1`, y `0` by 900ms. Hero buttons remained hidden at 180ms, then staggered at 360ms (`0.763` / `0.344` opacity).
- About: before scroll, heading/body/cards were opacity `0` with y offsets. During reveal, heading reached `0.741` opacity before body `0.135`, then cards followed (`card0 0.947`, `card1 0.854` at 760ms).
- Services: heading/body revealed first, cards staggered, and CTA remained hidden until later in the sequence.
- Portfolio: heading and filters revealed before cards; project card 0 began before card 1; final `View All Work` CTA stayed hidden until the card cascade was underway.
- Testimonials: heading/body revealed before testimonial cards; card 0 began before card 1.
- Contact: heading/body revealed before CTA; CTA reached opacity `0.639` at 460ms after heading/body had already started.
- Re-entering About after scrolling away kept heading/body/card visible at opacity `1`, y `0`; no repeat animation.
- Reduced motion: hero, About, Services, Portfolio, and Testimonials headings were all opacity `1`, transform `none`; no console errors and no page errors.
- Tablet `768x1024`: hero animated from opacity `0.358`, y `17.5` to opacity `0.998`, y `0`; About heading/body/card revealed on scroll; no console/page errors and no overflowing text.
- Mobile `390x844`: hero animated from opacity `0.181`, y `22.8` to opacity `0.998`, y `0.1`; About heading/body/card revealed on scroll; no console/page errors and no overflowing text.

## Section 9 Checklist

1. `tokens.ts` exists: observed at `lib/motion/tokens.ts`.
2. `variants.ts` exports the required variants: observed `fadeUp`, `fadeUpSubtle`, `scaleReveal`, `staggerParent`, `sectionOrchestrator`.
3. `presets.ts` exports `reveal`: observed.
4. Hero headline fades up on load: observed opacity/y progression in desktop, tablet, and mobile.
5. Hero buttons stagger: observed primary button ahead of secondary button at 360ms.
6. About body text appears after heading: observed heading opacity ahead of body at 260ms.
7. Portfolio cards stagger: observed card 0 ahead of card 1.
8. Portfolio view-all button appears last: observed hidden while heading/filter/card sequence starts, then revealing after cards are underway.
9. Services cards stagger: observed card 0 ahead of card 1.
10. Testimonials items stagger: observed card 0 ahead of card 1.
11. Contact button appears after text: observed CTA starting after heading/body.
12. No section reanimates on scroll up: observed About re-entry stayed opacity `1`, y `0`.
13. Reduced motion all visible: observed opacity `1`, transform `none`.
14. Lenis smooth scroll no pop-in: observed normal desktop/tablet/mobile scroll-triggered reveal with no missed section triggers.
15. TypeScript exit 0: `npx tsc --noEmit` passed.
16. Build exit 0: `npm run build` passed.

## Commands Run

- `npx tsc --noEmit` — passed.
- `npm run lint` — passed.
- `npm run test` — passed, 2 files / 9 tests.
- `npm run build` — passed, 13 routes generated.
- `npx playwright test` — passed, 14 tests.

## Remaining Risks

- The brief requested `@studio-freight/lenis`, so the implementation follows that package even though it is older than the newer `lenis` package.
- Older non-brief route/page animations still exist elsewhere in the repo and were not redesigned in this brief pass.
