# Portfolio Guardrail: Audit → Plan → Refactor (No surprises)

## Absolute rule
Before ANY refactor or code changes:
1) AUDIT (read-only)
   - Read the relevant files first.
   - Summarize current structure: pages/sections/components, styling approach, motion usage, data flow.
   - Identify issues by category:
     - UI consistency (spacing/typography/layout)
     - Accessibility (semantics, focus, keyboard, contrast)
     - Motion (purpose, reduced motion, performance)
     - Performance (bundle, images, lazy-loading, waterfalls, heavy libs)
     - SEO/metadata (title/OG, robots/sitemap if applicable)
     - Testing coverage (unit/component vs e2e)
   - List risks and what could break.

2) PLAN (propose before touching files)
   - Provide a refactor plan with:
     - Scope (what will change + what will not change)
     - File-by-file checklist
     - Order of operations (small steps)
     - Acceptance criteria (visual + build + tests)
     - Rollback strategy (how to revert safely)

3) EXECUTE (only after plan is approved OR when changes are small/safe)
   - Apply changes in small, isolated commits/steps.
   - After each step:
     - Ensure `npm run build` passes
     - Ensure UI still matches baseline
     - Update/adjust tests if needed

## Skills to use during Audit/Plan/Execute (when relevant)
- baseline-ui
- fixing-accessibility
- fixing-metadata
- web-quality-audit + performance + core-web-vitals + seo + best-practices
- vercel-react-best-practices
- vite-react-best-practices
- motion-dev-animations + fixing-motion-performance
- react-testing + vitest-testing-patterns + front-end-testing
- playwright-skill
- ux-writing

## Output format for the PLAN
- Current state summary (bullets)
- Findings (grouped by category)
- Proposed changes (file list)
- Step-by-step plan (checkboxes)
- Acceptance checklist (what we’ll verify)
