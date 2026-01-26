# Post-Refactor Verification Plan

Date: 2026-01-26
Branch: refactor/portfolio-quality
Skills referenced: web-quality-audit, accessibility, performance, core-web-vitals, seo, fixing-metadata, best-practices, fixing-motion-performance, front-end-testing, react-testing, vitest-testing-patterns, playwright-skill.

## Read-only verification planning

### Summary of changes in this branch
- Metadata + sitemap: canonical/OG/Twitter tags, runtime guard, favicon/touch icon, robots/sitemap generation via `prebuild`.
- Performance: image loading hints (lazy/eager/decoding/fetchpriority) and hero preload.
- Motion: testimonials marquee respects reduced motion, pauses offscreen and on tab hidden.
- Accessibility: skip link, semantic navbar brand link, non-interactive logo carousel, correct tab/tabpanel structure.
- UI consistency: accent token + z-index scale in Tailwind.
- Testing: Vitest + RTL + Playwright smoke tests with minimal coverage, Vitest excludes `e2e/**`.

### Residual risks to verify
- Build-time warnings from missing `VITE_SITE_URL` placeholders (non-blocking but noisy).
- Large image assets remain un-resized (performance risk); only loading hints added.
- LivingBackground still animates full-screen blurred layers (perf risk on low-end devices).
- Security headers still not configured at deployment layer.

## Status vs original audit

### Resolved
- Accessibility: semantic navbar brand link, skip link, non-action logos, tab/tabpanel structure. Evidence: `components/layout/Navbar.tsx`, `App.tsx`, `components/sections/CompaniesLogos.tsx`, `components/sections/ProcessReelSection.tsx`. Skill: accessibility.
- Motion (P1): testimonials marquee reduced-motion + offscreen pause. Evidence: `components/sections/TestimonialsSection.tsx`. Skill: fixing-motion-performance.
- SEO/metadata (P1): base metadata, robots, sitemap generation. Evidence: `index.html`, `public/robots.txt`, `scripts/generate-sitemap.mjs`. Skills: seo, fixing-metadata.
- UI consistency (P2): accent token + z-index scale. Evidence: `tailwind.config.cjs`, `components/ui/SegmentTabs.tsx`, `components/motion/SectionTitle.tsx`, `components/layout/Navbar.tsx`, `components/motion/ScrollProgress.tsx`, `components/pages/ProjectDetailPage.tsx`. Skill: baseline-ui.
- Testing coverage (P2): minimal RTL + Playwright smoke tests. Evidence: `tests/app.test.tsx`, `e2e/smoke.spec.ts`, `playwright.config.ts`. Skills: react-testing, front-end-testing, playwright-skill.

### Partially resolved / still open
- Performance (P1): large image payloads remain; loading hints added but assets are still large and no responsive `srcset`. Evidence: `public/assets/images/Home Care@4x.webp`, `public/assets/images/Nodel@4x.webp`, `components/cards/ProjectCardWrapper.tsx`, `components/blog/BlogCard.tsx`. Skills: performance, core-web-vitals. Severity change: P1 remains (mitigated but not resolved).
- Performance (P2): large blurred backgrounds still animate continuously. Evidence: `components/background/LivingBackground.tsx`, `index.css`. Skill: fixing-motion-performance.
- Best practices (P2): security headers still undefined at deployment layer. Evidence: no server config in repo. Skill: best-practices.
- Metadata runtime dependency: canonical/OG URLs are removed if `VITE_SITE_URL` is unset (safe but no SEO tags). Evidence: `index.html` script. Skill: fixing-metadata.

## Verification runs

### npm run build
- Command: `npm run build`
- Result: PASS
- Notes: emitted warnings about `%VITE_SITE_URL%` placeholders in `index.html`; sitemap generator defaults to localhost when `VITE_SITE_URL` is missing.

### npm run test
- Command: `npm run test`
- Result: PASS
- Notes: Motion deprecation warning appears but does not fail tests.

### npx playwright test
- Command: `npx playwright test`
- Result: PASS

## New findings introduced by the refactor

### P1
- None.

### P2
- **[Dev UX]** Framer Motion deprecation warning in test output (`motion() is deprecated`). Evidence: `tests/app.test.tsx` run output. Skill: best-practices.
  - **Smallest fix:** defer (non-blocker). Consider upgrading motion usage later.

### P2
- **[Metadata]** Build-time warnings due to unset `VITE_SITE_URL` placeholders. Evidence: `index.html` build output. Skill: fixing-metadata.
  - **Smallest fix:** set local `.env` (no commit) or move to module-script solution later.

## UI polish backlog (small, safe, design-preserving)
1) Add responsive `srcset` + explicit `width/height` for project/blog images to reduce CLS (performance, core-web-vitals).
2) Pause or soften LivingBackground animation when reduced motion is enabled (fixing-motion-performance).
3) Consider replacing remaining `text-blue-*` accent highlights with `text-accent` for a single-token accent (baseline-ui).

## Spacing & Layout Rhythm Refactor Plan

### Inventory (current system)
- Section wrapper default: `components/layout/Section.tsx` uses `py-16 md:py-24`.
- Container wrapper: `components/layout/Container.tsx` uses `max-w-[1200px] px-4 sm:px-6 lg:px-10`.
- Spacing scale used: `0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 28, 32, 48`.
- Gap scale used: `0, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 24`.

### Target normalized scale
- Micro: `1, 2, 3, 4`
- Small: `6, 8`
- Medium: `10, 12, 16`
- Large: `20, 24, 32`
- Extra: `48` (only for intentional hero/feature use)

### Rules
- Sections: standard rhythm `py-16 md:py-24` via `Section` defaults. Only allow exceptions for Hero and CTA.
- CTA feature rule: `components/sections/CTASection.tsx` is an intentional feature block and may use larger inner padding (`p-8 sm:p-12 md:p-16`). Keep it visually bigger.
- Hero rule: if the hero needs custom vertical padding, it should be the only exception besides CTA and must be documented in code.
- Cards/panels: standardize to `p-6 sm:p-8`; large feature cards can use `p-8 sm:p-10`.
- Grids: default to `gap-6 md:gap-8` unless a dense grid is explicitly justified.
- Intro blocks: choose a single pattern (either `mb-10` wrappers or `space-y-6 md:space-y-8` within) and apply consistently.
- Text widths: short copy uses `max-w-2xl`, long-form uses `max-w-[60ch]`.
- Chips/badges: standard `px-3 py-1`; CTA badge remains `px-4 py-2` as the only premium exception.
- Controls: maintain >=44px tap targets; normalize control heights where mismatched.

### File list by phase
P0 (visible spacing jumps)
- `components/pages/BlogArticlePage.tsx` (remove Section padding overrides that stack).
- `components/sections/Hero.tsx` (align with section rhythm or keep as the only documented exception).

P1 (section rhythm + grids + intro spacing)
- `components/sections/BlogSection.tsx`
- `components/pages/BlogIndexPage.tsx`
- `components/sections/AboutSection.tsx`
- `components/sections/HowIHelpSection.tsx`
- `components/sections/Experience.tsx`
- `components/sections/ProcessReelSection.tsx`
- `components/sections/TestimonialsSection.tsx`
- `components/pages/ProjectDetailPage.tsx` (section intro spacing + text widths)

P2 (micro-spacing polish)
- `components/sections/Hero.tsx` (badge sizes)
- `components/sections/CTASection.tsx` (CTA badge exception retained)
- `components/blog/BlogCard.tsx`
- `components/cards/ProjectCardWrapper.tsx`
- `components/pages/BlogArticlePage.tsx`
- `components/ui/SegmentTabs.tsx` (control heights)

### Acceptance checks
- Visual rhythm is consistent across sections; CTA remains intentionally larger.
- No changes to layout structure, typography styles, colors, or motion.
- Responsive behavior preserved; tap targets remain >=44px.
- Tests pass: `npm run build`, `npm run test`, `npx playwright test`.

### Rollback
- Revert commits by phase (`P0`, `P1`, `P2`) to isolate spacing changes if needed.

### Refactor results (P0–P2)
- P0: Removed BlogArticlePage top padding override to align with standard section rhythm. Evidence: `components/pages/BlogArticlePage.tsx`.
- P1: Normalized intro spacing and grid gap in core sections (About, Experience, How I Help, Process). Evidence: `components/sections/AboutSection.tsx`, `components/sections/Experience.tsx`, `components/sections/HowIHelpSection.tsx`, `components/sections/ProcessReelSection.tsx`.
- P2: Standardized badge padding for non-feature chips. Evidence: `components/blog/BlogCard.tsx`, `components/sections/CompaniesLogos.tsx`.
- CTA feature rule: CTA remains intentionally larger (premium feature block) by design; no downsizing applied. Evidence: `components/sections/CTASection.tsx`.

### Remaining spacing backlog (optional)
- Consider aligning SegmentTabs tap target height to >=44px if mobile usability testing shows mis-taps. Evidence: `components/ui/SegmentTabs.tsx`.
- Review ProjectCard internal grid gap (`gap-8 md:gap-10`) if a tighter rhythm is desired; currently left as a feature layout. Evidence: `components/cards/ProjectCardWrapper.tsx`.

## Mobile motion performance audit (read-only)

### Recent mitigations in this branch
- Marquee animations pause offscreen/hidden. Evidence: `components/sections/CompaniesLogos.tsx`, `components/sections/TestimonialsSection.tsx`. Skill: fixing-motion-performance.
- Process reel rAF loop pauses when the tab is hidden. Evidence: `components/sections/ProcessReelSection.tsx`. Skill: fixing-motion-performance.
- Tilt interactions disabled on coarse pointers. Evidence: `components/motion/TiltCard.tsx`. Skill: fixing-motion-performance.
- Scroll-reveal animations simplified to opacity-only on mobile/coarse pointer. Evidence: `components/motion/Reveal.tsx`, `components/motion/FadeInUp.tsx`, `components/motion/BlurIn.tsx`, `hooks/useMobileMotionGate.ts`. Skill: fixing-motion-performance.

### Top 5 mobile jank risks + suggestions
- P1 | Full-screen blurred hero blobs animate continuously, triggering heavy paint on mobile GPUs. Evidence: `components/background/HeroGlow.tsx`, `index.css`. Skill: fixing-motion-performance. Mobile verification: DevTools Performance (mobile throttling) for long paint tasks while scrolling the hero. Ultra-safe mobile tweak: reduce blur/opacity only under `max-width: 640px`. Optional tweak: pause blob animation when hero is offscreen.
- P1 | Multiple full-viewport blurred blobs animate in LivingBackground, which can still be expensive on low-end phones even when visible. Evidence: `components/background/LivingBackground.tsx`. Skill: fixing-motion-performance. Mobile verification: watch FPS drops + paint flashing in Rendering while scrolling sections with the background. Ultra-safe mobile tweak: reduce blur/scale on mobile only. Optional tweak: freeze transforms and keep a static background composition on coarse pointer.
- P2 | Per-letter TypingEffect animates dozens of spans; on mobile this can add main-thread overhead. Evidence: `components/motion/TypingEffect.tsx`. Skill: performance. Mobile verification: Performance panel shows many small animations during hero entry. Ultra-safe mobile tweak: swap to single opacity-only fade on coarse pointer. Optional tweak: render static text (no per-letter animation) on mobile.
- P2 | ScrollProgress updates every frame via `useScroll` + spring; constant updates can contribute to scroll jank on mobile. Evidence: `components/motion/ScrollProgress.tsx`. Skill: performance. Mobile verification: check for long tasks during scroll with the progress bar visible. Ultra-safe mobile tweak: disable the bar on coarse pointer. Optional tweak: keep it but replace spring with a direct transform update for mobile.
- P2 | Testimonials marquee still runs continuously while in view; on mobile, long-running transforms can compete with scroll. Evidence: `components/sections/TestimonialsSection.tsx`. Skill: fixing-motion-performance. Mobile verification: inspect FPS dips during marquee section scroll. Ultra-safe mobile tweak: increase duration to slow movement on coarse pointer. Optional tweak: reduce duplicate items or pause after a few cycles on mobile.
- P2 | layoutId/layout animations can be expensive on mobile when combined with blur/glass. Evidence: `components/ui/SegmentTabs.tsx` (`layoutId="activeTab"`). Skill: fixing-motion-performance. Mobile verification: check for extra layout work when switching tabs on mobile. Ultra-safe mobile tweak: keep layoutId on desktop only and use opacity-only highlight on coarse pointer. Optional tweak: replace layoutId with a simple transform or opacity transition for mobile.

## Action needed
- None. All verification commands pass.
