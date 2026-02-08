# Code Audit Report (2026-02-08) — Updated

## Summary
- Scope: repo-level code quality audit focused on bugs and best practices across `App.tsx`, `components/**`, `hooks/**`, `lib/**`, `scripts/**`, `e2e/**`, and `tests/**`.
- Findings: 8 issues total (`0 high`, `4 medium`, `4 low`).
- Commands run:
`npm run lint` (failed: 9 errors, 2 warnings),
`npm run test` (passed: 4/4 tests),
`npx tsc --noEmit` (failed: 7 errors).

## Findings
1. **[M] Lint pipeline fails for Node script due ESLint environment mismatch**
Impact: CI linting is blocked by false-positive `no-undef` errors in build tooling code, reducing signal quality for real application defects.
Evidence: `scripts/generate-sitemap.mjs:4`, `scripts/generate-sitemap.mjs:11`, `eslint.config.js:1`.
Recommendation: Add a JS override for Node scripts (for example `files: ["scripts/**/*.mjs"]`) with Node globals enabled, or scope `no-undef` appropriately.

2. **[M] Ref element type mismatch in companies marquee**
Impact: Strict type safety is broken and can hide runtime ref misuse in tooltip/positioning logic.
Evidence: `components/sections/CompaniesLogos.tsx:18`, `components/sections/CompaniesLogos.tsx:129`.
Recommendation: Change `itemRefs` typing from `HTMLDivElement` to `HTMLButtonElement` to match actual assigned refs.

3. **[M] Timeout ref typing mismatch in process reel**
Impact: Timer management is typed inconsistently with browser runtime, producing typecheck failures and weakening reliability of autoplay interaction logic.
Evidence: `components/sections/ProcessReelSection.tsx:40`, `components/sections/ProcessReelSection.tsx:89`.
Recommendation: Use a browser-compatible timer type (`number | null` or `ReturnType<typeof window.setTimeout>` consistently with `window.clearTimeout`).

4. **[M] Playwright audit spec has invalid TypeScript type extraction**
Impact: End-to-end audit spec does not compile under strict type checking, blocking `npx tsc --noEmit`.
Evidence: `e2e/ui-audit.spec.ts:17`, `e2e/ui-audit.spec.ts:22`, `e2e/ui-audit.spec.ts:31`.
Recommendation: Replace `Parameters<typeof test>[0]['page']`-based typing with explicit Playwright types (`Page`, `Locator`) and typed callback params.

5. **[L] React effect performs direct state set and triggers lint error**
Impact: Pattern can trigger cascading renders and is flagged by `react-hooks/set-state-in-effect`, lowering confidence in hook hygiene.
Evidence: `App.tsx:128`.
Recommendation: Initialize theme state without a synchronous effect state write or refactor to a subscription-only effect pattern.

6. **[L] Dead/unused code paths reduce maintainability**
Impact: Unused logic and props add cognitive load and increase the chance of stale behavior assumptions.
Evidence: `App.tsx:214`, `components/layout/Section.tsx:17`.
Recommendation: Remove or wire up `handleBack`, and remove unused `darkMode` prop from `Section` if not required.

7. **[L] Deprecated Framer Motion API usage**
Impact: Deprecation warnings in tests indicate future compatibility risk and noisier test output.
Evidence: `components/motion/BlurIn.tsx:19`, `components/motion/TypingEffect.tsx:30`.
Recommendation: Migrate from `motion(Component)` to the current API (`motion.create(Component)`).

8. **[L] Sitemap fallback can publish localhost URLs if committed**
Impact: Metadata quality and SEO hygiene can regress if development fallback URLs are accidentally shipped.
Evidence: `scripts/generate-sitemap.mjs:14`, `public/sitemap.xml:3`.
Recommendation: Prevent localhost sitemap output from being committed (CI check/guard) and require `VITE_SITE_URL` for release builds.

## Important API/Interface/Type Notes
- No public runtime API changes were made in this audit pass (documentation update only).
- Priority type/interface corrections:
`components/sections/CompaniesLogos.tsx:18`,
`components/sections/ProcessReelSection.tsx:40`,
`e2e/ui-audit.spec.ts:17`.

## Resolved Since Previous Audit
- Marquee translate distance is now dynamic and aligned with duplication strategy (`components/sections/CompaniesLogos.tsx:41`, `index.css:65`), resolving the prior loop discontinuity risk.
- MediaQueryList `addEventListener` Safari/WebView fallback remains implemented.
- “Dashboards” filter has matching projects.
- Company tooltip drift fix remains in place (tooltip rendered outside animated marquee container).

## Notes / Limitations
- `npm audit --audit-level=moderate` could not be assessed in this environment due DNS/network resolution failure (`getaddrinfo ENOTFOUND registry.npmjs.org`).

## 2026-02-08 — Audit Resolution Update

All findings from the 2026-02-08 code audit have been resolved with non-visual changes only (config, typing, and runtime-safety internals). No UI structure or styling logic was changed.

### Resolved
1. **[M] ESLint Node script env mismatch**
   - Fixed in `eslint.config.js` (added `.mjs` override with Node globals for script linting).
2. **[M] Ref element type mismatch (companies marquee)**
   - Fixed in `components/sections/CompaniesLogos.tsx` (refs now `HTMLButtonElement`).
3. **[M] Timeout ref typing mismatch (process reel)**
   - Fixed in `components/sections/ProcessReelSection.tsx` (browser-compatible timer type + consistent timeout clear path).
4. **[M] Playwright audit spec invalid TypeScript type extraction**
   - Fixed in `e2e/ui-audit.spec.ts` (explicit Playwright types `Page` and `Locator`).
5. **[L] Direct setState in effect**
   - Fixed in `App.tsx` (removed synchronous `setDarkMode` call from effect body).
6. **[L] Dead/unused code paths**
   - Fixed in `App.tsx` (removed unused `handleBack`) and `components/layout/Section.tsx` (removed unused `darkMode` prop).
7. **[L] Deprecated Framer Motion API usage**
   - Fixed in `components/motion/BlurIn.tsx` and `components/motion/TypingEffect.tsx` (migrated to `motion.create`).
8. **[L] Sitemap localhost fallback**
   - Fixed in `scripts/generate-sitemap.mjs`; sitemap regenerated in `public/sitemap.xml` without localhost URLs.

### Validation
- `npm run lint` ✅
- `npx tsc --noEmit` ✅
- `npm run test` ✅ (4/4)

### Files Changed
- `App.tsx`
- `components/layout/Section.tsx`
- `components/motion/BlurIn.tsx`
- `components/motion/TypingEffect.tsx`
- `components/sections/CompaniesLogos.tsx`
- `components/sections/ProcessReelSection.tsx`
- `e2e/ui-audit.spec.ts`
- `eslint.config.js`
- `scripts/generate-sitemap.mjs`
- `public/sitemap.xml`
