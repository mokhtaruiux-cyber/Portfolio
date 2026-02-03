# Code Audit Report (2026-02-03) — Updated

## Summary
- Scope: repo-level code and data review (React/Vite app, components, hooks, content/data files).
- Findings: 1 issue (1 low).
- Tests/tools: not run (no test/lint/audit commands executed).

## Findings
1. **[L] Companies marquee loop distance mismatches mobile duplication count**
Impact: On mobile the marquee list is duplicated 2x, but the CSS animation always translates `-33.33%`. This can cause a visible jump or discontinuity when the loop restarts on small screens.
Evidence: `components/sections/CompaniesLogos.tsx:33-37` (2x duplication on mobile), `index.css:49-57` (`company-marquee` keyframe uses `-33.33%`).
Recommendation: Use `-50%` when duplicated 2x on mobile, or drive the translate distance via a CSS variable that matches the duplication count.

## Resolved Since Previous Audit
- MediaQueryList `addEventListener` Safari/WebView fallback implemented.
- “Dashboards” filter now has matching projects.
- Company tooltip drift fixed; tooltip is no longer inside the animated marquee.

## Notes
- Not run: `npm audit`, tests, lint, or build commands.
