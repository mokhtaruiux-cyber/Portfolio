> Archived: historical snapshot. For current status see `../2026-01-30-qa-report.md` and `../2026-01-30-animation-performance-audit.md`.

# Portfolio Audit Report

Date: 2026-01-26
Scope: Read-only code review of the repository. No runtime tests or builds were executed.

Primary skills referenced: web-quality-audit, accessibility, performance, core-web-vitals, seo, fixing-metadata, best-practices, fixing-motion-performance, baseline-ui, front-end-testing.

## Inventory
- App entry point: `index.html`, `index.tsx`, `App.tsx`.
- Routing strategy: React Router (`BrowserRouter`) with route-based rendering in `App.tsx`.
- Main pages / sections: Home (Hero, Companies, About, How I Help, Experience, Process, Work, Blog, Testimonials), Work archive, Project detail, Blog index, Blog article, About, CTA, Footer.
- Styling system: Tailwind CSS (`index.css`, `tailwind.config.cjs`) plus inline styles in `index.html` and typography tokens in `lib/typography.ts`.
- Motion usage: Framer Motion across reveal/blur/tilt/stacked cards, looping marquees, scroll progress, and animated backgrounds.
- Content sources: `content.ts` plus `data/*.ts` and static assets in `public/assets/images`.
- Testing setup: No test framework or test scripts in `package.json`; no test files found.

## Findings

### UI consistency
- P2 | Accent color values are inconsistent between Tailwind tokens and hard-coded hex values, which risks visual drift. Evidence: `components/ui/SegmentTabs.tsx:40-43`, `components/sections/BlogSection.tsx:9-18`, `components/sections/TestimonialsSection.tsx:79-83`. Skill: `baseline-ui`. Fix: centralize accent colors via Tailwind theme or CSS variables and replace hard-coded hex usage.
- P2 | Arbitrary z-index values are used across components, which makes layering harder to reason about. Evidence: `components/motion/ScrollProgress.tsx:14`, `components/layout/Navbar.tsx:90-94`, `components/pages/ProjectDetailPage.tsx:46-56`. Skill: `baseline-ui`. Fix: define a consistent z-index scale and replace ad-hoc values.

### Accessibility
- P1 | The brand logo is a clickable `<div>` without keyboard semantics, making it unreachable for keyboard users. Evidence: `components/layout/Navbar.tsx:118-128`. Skill: `accessibility`. Fix: use an `<a href="/">` or `<button>` with proper focus styles.
- P2 | No skip link is provided to jump directly to main content. Evidence: `App.tsx` root layout and `index.html` lack a skip link. Skill: `accessibility`. Fix: add a visually-hidden "Skip to main content" link before navigation that targets the `<main>` element.
- P2 | Logo carousel uses focusable `<button>` elements that perform no action, which can confuse assistive tech users. Evidence: `components/sections/CompaniesLogos.tsx:81-98`. Skill: `accessibility`. Fix: convert to non-interactive elements (or add real actions) and keep hover tooltips non-focusable if they do not trigger behavior.
- P2 | Tab pattern nests the `role="tabpanel"` inside the tab button, which is atypical for assistive technologies. Evidence: `components/sections/ProcessReelSection.tsx:153-195`. Skill: `accessibility`. Fix: render tab panels as sibling elements with `role="tabpanel"` and associate them via `aria-controls` and `aria-labelledby`.

### Motion quality and performance
- P1 | Testimonial marquees animate continuously with no reduced-motion fallback and no pause when off-screen, which can cause motion sensitivity and unnecessary CPU/GPU usage. Evidence: `components/sections/TestimonialsSection.tsx:50-63`. Skill: `fixing-motion-performance`. Fix: honor `prefers-reduced-motion`, pause animations when off-screen via `useInView`, and reduce duplication.
- P2 | Large, blurred background layers animate continuously across the full viewport, which can be expensive on low-end devices. Evidence: `components/background/LivingBackground.tsx:24-116`, `index.css:hero-blob keyframes`. Skill: `fixing-motion-performance`. Fix: reduce animation intensity, pause when tab is hidden, and avoid animating large blur surfaces.

### Performance and Core Web Vitals
- P1 | Large images are loaded eagerly without `loading="lazy"`, `decoding="async"`, or responsive `srcset`, increasing initial page weight and harming LCP/INP. Evidence: `components/cards/ProjectCardWrapper.tsx:79-81`, `components/blog/BlogCard.tsx:31-33`, `components/pages/ProjectDetailPage.tsx:23-35`; large assets in `public/assets/images/Home Care@4x.webp` (~3.0 MB) and `public/assets/images/Nodel@4x.webp` (~1.4 MB). Skills: `performance`, `core-web-vitals`. Fix: add lazy loading for below-the-fold images, provide responsive sources, and downsize oversized assets.
- P2 | LCP hints are missing for the hero image and critical fonts. Evidence: `index.html:5-11`, `components/sections/Hero.tsx:30-44`. Skills: `performance`, `core-web-vitals`. Fix: preload the hero image (or set `fetchpriority="high"`) and consider preloading critical font files.
- P2 | Multiple glassmorphism and blur effects are applied to large surfaces, which can increase paint costs during scrolling. Evidence: `index.html:38-41`, `components/background/LivingBackground.tsx:24-116`. Skill: `performance`. Fix: reduce blur sizes on large elements or limit those effects to smaller surfaces.

### SEO and metadata
- P1 | Missing canonical, Open Graph, Twitter card metadata, and a static meta description in the HTML shell; current metadata is injected at runtime, which can be missed by crawlers. Evidence: `index.html:5-11`, `App.tsx:112-155`. Skills: `seo`, `fixing-metadata`. Fix: add stable metadata to `index.html` (or a head manager) and ensure per-route metadata is deterministic.
- P2 | No `robots.txt`, `sitemap.xml`, or favicon assets are present in `public/`. Evidence: `public/` directory contents. Skills: `seo`, `fixing-metadata`. Fix: add basic `robots.txt`, sitemap, and favicon/touch icons.

### Best practices
- P2 | Security headers and permissions policy are not defined at the app level, which weakens security defaults in production. Evidence: `index.html` has no CSP/meta headers; no server config in repo. Skill: `best-practices`. Fix: define headers at the deployment layer (CSP, HSTS, Referrer-Policy, Permissions-Policy).

### Testing coverage
- P2 | No automated tests or test runner scripts are present. Evidence: `package.json:6-11`, no test files in the repository. Skill: `front-end-testing`. Fix: add a test setup and cover core flows (navigation, theme toggle, routing, CTA links).

## Summary
- UI consistency: 2 issues (0 P0, 0 P1, 2 P2)
- Accessibility: 4 issues (0 P0, 1 P1, 3 P2)
- Motion quality and performance: 2 issues (0 P0, 1 P1, 1 P2)
- Performance and Core Web Vitals: 3 issues (0 P0, 1 P1, 2 P2)
- SEO and metadata: 2 issues (0 P0, 1 P1, 1 P2)
- Best practices: 1 issue (0 P0, 0 P1, 1 P2)
- Testing coverage: 1 issue (0 P0, 0 P1, 1 P2)

## Refactor Plan (Proposal Only)

### Scope
Will change: metadata setup, image loading strategy, motion fallbacks, minor component semantics, and test coverage. Will not change: visual design intent, content copy, routing structure, or major layout.

### Steps (Checklist)
- [ ] Step 1: Metadata baseline in `index.html` and `public/` (canonical, meta description, Open Graph/Twitter tags, favicon, robots.txt, sitemap). Files: `index.html`, `public/robots.txt`, `public/sitemap.xml`, favicon assets. Acceptance: `npm run build` passes; view-source shows stable tags; social cards preview correctly.
- [ ] Step 2: Image performance improvements (lazy loading, decoding hints, responsive sources, and resized assets for oversized images). Files: `components/cards/ProjectCardWrapper.tsx`, `components/blog/BlogCard.tsx`, `components/pages/ProjectDetailPage.tsx`, `public/assets/images/*`. Acceptance: `npm run build` passes; LCP image prioritized; below-the-fold images lazy-load; no layout shifts.
- [ ] Step 3: Motion performance and reduced-motion support for continuous animations. Files: `components/sections/TestimonialsSection.tsx`, `components/background/LivingBackground.tsx`. Acceptance: animations stop when off-screen; `prefers-reduced-motion` disables marquee motion; scrolling remains smooth.
- [ ] Step 4: Accessibility semantics fixes (navbar logo, skip link, non-action buttons, tab panel structure). Files: `components/layout/Navbar.tsx`, `App.tsx`, `components/sections/CompaniesLogos.tsx`, `components/sections/ProcessReelSection.tsx`. Acceptance: keyboard navigation works end-to-end; focus order is logical; no new console warnings.
- [ ] Step 5: UI consistency cleanup for tokens and z-index scale. Files: `components/ui/SegmentTabs.tsx`, `components/motion/ScrollProgress.tsx`, `components/layout/Navbar.tsx`, `components/pages/ProjectDetailPage.tsx`, `tailwind.config.cjs`. Acceptance: consistent accent tokens; z-index scale documented; visuals unchanged.
- [ ] Step 6: Testing foundation with basic UI flows. Files: new test setup (e.g., `src/__tests__/*`), `package.json` test scripts. Acceptance: tests pass in CI; coverage for navigation, theme toggle, and CTA links.

### Rollback strategy
Revert step-level changes by rolling back the modified files for that step (or by reverting the commit if you choose to commit per step). Keep steps small and isolated to make rollback safe.
