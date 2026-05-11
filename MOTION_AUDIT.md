# Motion Audit

**Date:** May 11, 2026
**Goal:** Keep the existing visual design unchanged while making section body content reveal with the same premium motion language as the titles.

## Current Motion System

### Shared sources

- `lib/motion/motionTokens.ts` defines easing, durations, distances, stagger values, viewport amounts, Lenis timing, and spring tokens.
- `lib/motion/motionVariants.ts` builds the reusable Framer Motion variant objects.
- `lib/motion/motionPresets.ts` exposes the public presets: `titleReveal`, `titleWordReveal`, `sectionReveal`, `contentReveal`, `staggerContainer`, `cardReveal`, and `mediaReveal`.
- `components/motion/Reveal.tsx` is the shared content/card/media reveal wrapper. It uses `useInView`, shared presets, transform/opacity-only motion, and reduced-motion support.
- `components/motion/BlurIn.tsx` is the title word-reveal renderer. It now uses `titleWordReveal` directly.
- `components/motion/AnimatedSection.tsx` still controls the top-level title/intro cascade, while deeper body/card/media groups use `Reveal` so long sections trigger as they enter the viewport.

### Preserved special motion

- Hero mount choreography remains custom because it is not scroll-triggered.
- Stacked project cards keep their scroll-linked sticky/card behavior.
- Marquees keep CSS transform animation and pause when offscreen or reduced motion is active.
- Navbar/menu, modal, hover, tooltip, and button micro-interactions are preserved.

## What Was Broken

- Section titles were animated well, but supporting copy, cards, lists, media, and CTA blocks often depended on the title section trigger and appeared finished before the user reached them.
- Several groups mixed local `initial` / `whileInView` logic with older variant state names, which made reveal behavior inconsistent.
- Body/card/media reveal distances were too subtle to read as a premium bottom-to-top section reveal.
- Stale wrapper components and hooks remained in the repo even though the active system had moved to shared motion presets.
- `eslint-config-next` was installed but unused, and `@tailwindcss/postcss` was in runtime dependencies even though it is a build tool.

## What Was Fixed

- `Reveal` now owns section body/card/media viewport triggering through `useInView`.
- `contentReveal`, `cardReveal`, and `mediaReveal` now use more visible shared bottom-to-top distances and later viewport amounts.
- Card/list/media groups now use `Reveal` with `staggerContainer` plus `cardReveal` or `mediaReveal`.
- Titles remain on the existing `BlurIn` + `titleReveal` / `titleWordReveal` path.
- Removed unused wrappers: `FadeInUp`, `FadeUp`, `ScaleIn`, and `SectionTitle`.
- Removed unused hooks: `useAppScroll` and `useParallax`.
- Trimmed stale motion barrel exports and unused helper exports.
- Removed the unused `eslint-config-next` dependency and moved `@tailwindcss/postcss` to `devDependencies`.
- Removed untracked local artifacts from previous tool runs: `.agents`, `.playwright-mcp`, `Skills`, `TASK.md`, and `animation-upgrade-guide.md`.

## Section Choreography Pass

| Page / Section | Title animation | Body/content animation | Cards/media animation | Presets used | Remaining issue |
|---|---:|---:|---:|---|---|
| Home hero | Yes | Yes | Yes | `titleReveal`, `titleWordReveal`, `fadeUp`, `scaleIn` | None |
| Companies / logos | Yes | N/A | Yes | `titleReveal`, `titleWordReveal`, `mediaReveal` | None |
| About | Yes | Yes | Yes | `titleReveal`, `titleWordReveal`, `contentReveal`, `staggerContainer`, `cardReveal` | None |
| How I help | Yes | Yes | Yes | `titleReveal`, `titleWordReveal`, `contentReveal`, `staggerContainer`, `cardReveal` | None |
| Experience | Yes | Yes | Yes | `titleReveal`, `titleWordReveal`, `contentReveal`, `staggerContainer`, `cardReveal` | None |
| Process | Yes | Yes | Yes | `titleReveal`, `titleWordReveal`, `contentReveal`, `staggerContainer`, `cardReveal` | None |
| Selected projects | Yes | Yes | Yes | `titleReveal`, `titleWordReveal`, `contentReveal`, `cardReveal`, `mediaReveal` | None |
| Blog preview | Yes | Yes | Yes | `titleReveal`, `titleWordReveal`, `contentReveal`, `staggerContainer`, `cardReveal` | None |
| Testimonials | Yes | Yes | Yes | `titleReveal`, `titleWordReveal`, `contentReveal`, `mediaReveal` | None |
| CTA | Yes | Yes | Yes | `titleReveal`, `titleWordReveal`, `contentReveal`, `staggerContainer`, `scaleIn` | None |
| Projects listing | Yes | Yes | Yes | `titleReveal`, `titleWordReveal`, `contentReveal`, `cardReveal`, `mediaReveal` | None |
| Project detail pages | Yes | Yes | Yes | `titleReveal`, `titleWordReveal`, `contentReveal`, `staggerContainer`, `cardReveal`, `mediaReveal` | None |
| Blog listing | Yes | Yes | Yes | `titleReveal`, `titleWordReveal`, `staggerContainer`, `cardReveal`, `mediaReveal` | None |
| Blog article pages | Yes | Yes | Yes | `titleReveal`, `titleWordReveal`, `contentReveal`, `staggerContainer`, `cardReveal`, `mediaReveal` | None |
| Not found page | Yes | Yes | Yes | `titleReveal`, `titleWordReveal`, `contentReveal`, `cardReveal` | None |

## Lenis Status

- One `ReactLenis` root instance remains in `components/providers/SmoothScrollProvider.tsx`.
- One manual RAF loop remains active with `autoRaf: false`.
- The RAF loop is stopped on cleanup.
- Route changes still restore scroll through `lenis.scrollTo(..., { immediate: true })`.
- Scroll-triggered Framer Motion reveals now use independent `useInView` triggers for section body groups, so Lenis timing does not mask or skip long-section content.

## Cleanup Status

- `npx knip --no-progress` passes with no unused files, dependencies, or exports.
- Runtime dependencies now contain only app runtime libraries.
- Build tooling is in `devDependencies`.

## Validation Results

- `npx knip --no-progress` — passed.
- `npm run lint` — passed.
- `npm run typecheck` — passed.
- `npm run test` — passed, 2 files / 9 tests.
- `npm run build` — passed, 13 static routes generated.
- `npx playwright test` — passed, 14 tests.
- Production browser scroll-through on `http://127.0.0.1:3000` passed across desktop, tablet, and mobile for `/`, `/projects`, `/projects/homecare-medical-app`, `/blog`, `/blog/getbitbang-motion-language`, `/about`, and `/does-not-exist`.
- Browser layout-shift sampling reported `0` CLS for all checked route/viewport combinations.
- No app console errors were found on normal routes. The only warnings observed were from the external Cal.com embed; the intentional 404 route produced expected failed-resource noise.
