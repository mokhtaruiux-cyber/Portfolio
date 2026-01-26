# Portfolio Audit & Refactor Protocol (Skills-First)

## 🎯 Primary Objective
All work on this repository must be guided by the installed agent skills.
Skills are the source of truth — not generic advice.

Any improvement request MUST follow:
AUDIT → PLAN → EXECUTE

No exceptions.

---

## 🔒 Hard Safety Rules
- NEVER modify files before completing an Audit and presenting a Refactor Plan.
- The initial response to any refactor/improvement request MUST be read-only.
- If unsure, stop and ask — do not guess.

---

## 🧠 Installed Skills (Authoritative References)

Use these skills as decision-makers whenever relevant:

### UI / UX
- baseline-ui
- ux-writing

### Accessibility
- fixing-accessibility
- accessibility

### Metadata / SEO
- fixing-metadata
- seo

### Web Quality & Performance
- web-quality-audit
- performance
- core-web-vitals
- best-practices

### React / Vite
- vercel-react-best-practices
- vite-react-best-practices

### Motion
- motion-dev-animations
- fixing-motion-performance

### Testing
- react-testing
- vitest-testing-patterns
- front-end-testing
- playwright-skill

---

## 🔍 PHASE 1 — AUDIT (Read-Only)

Before touching any code, perform a repository audit.

### Audit must include:
1) **Inventory**
   - App entry point
   - Routing strategy (if any)
   - Main pages / sections
   - Styling system (Tailwind usage, tokens, patterns)
   - Motion usage (where, why, how)
   - Content sources
   - Test setup

2) **Findings**, grouped by category:
   - UI consistency
   - Accessibility
   - Motion quality & performance
   - Performance / Core Web Vitals
   - SEO / metadata
   - Testing coverage

For EACH finding, provide:
- Severity:
  - P0 — broken / blocking
  - P1 — major quality issue
  - P2 — improvement / polish
- Evidence:
  - File path(s)
  - Short description (no code edits)
- Skill reference:
  - Which installed skill informs this finding
- High-level fix approach:
  - What should change (not how yet)

---

## 🧭 PHASE 2 — REFACTOR PLAN (Proposal Only)

After the audit, propose a **step-by-step refactor plan**.

The plan MUST include:
- Scope:
  - What WILL change
  - What will NOT change (to preserve safety)
- Ordered steps (small, safe, incremental)
- Files/components touched per step
- Acceptance checks per step:
  - Build passes (`npm run build`)
  - Visual/UI expectations
  - Motion behavior
  - A11y / SEO / performance checks
- Rollback strategy (how to revert safely)

⚠️ No files are modified in this phase.

---

## ⚙️ PHASE 3 — EXECUTION (Controlled)

Only after explicit approval:
- Execute ONE step at a time.
- After each step:
  - Ensure build passes
  - Ensure UI still matches baseline
  - Update tests if required
- Report completion before moving to the next step.

---

## 📦 Output Requirements

### During Audit
- Clear, structured report
- No code changes
- No assumptions

### During Planning
- Checklist format
- Minimal scope
- Skill-backed decisions

---

## 🧠 Decision-Making Rule
If multiple approaches exist:
- Present up to 2 options
- Choose the safer, simpler, more maintainable default
- Justify using the relevant skill

---
## 📄 Audit Output Location (Mandatory)

The audit and refactor plan MUST be written to a markdown file.

- Path: `docs/audit/portfolio-audit.md`
- Create the directory if it does not exist.
- Overwrite the file on each new audit run.
- The file must contain:
  - Audit report
  - Findings with severity and skill references
  - Refactor plan (step-by-step checklist)

Do not modify any source code files while generating this file.


---
## 🛑 Final Reminder
Skills define the standard.
Audit defines the truth.
Plan defines the path.
Execution happens only with approval.
