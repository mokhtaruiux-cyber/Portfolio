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

## Action needed
- None. All verification commands pass.
