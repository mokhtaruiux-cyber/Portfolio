# Mokhtar Portfolio — Project Rules

Purpose: Keep new pages/components consistent with current structure, routes, and visual system.

## Tech Stack
- React 19 + TypeScript
- Vite 8 + Tailwind CSS 4
- Motion 12
- React Router DOM 7
- Icons: lucide-react
- Utilities: clsx + tailwind-merge (via `lib/utils`)

## Project Structure (current)
```
App.tsx                # App shell, routing, providers
index.tsx              # React root + router
index.css              # global styles + custom utilities
components/
  background/
  blog/
  cards/
  layout/
  motion/
  pages/
  sections/
  ui/
context/               # ThemeContext
data/                  # data modules (projects, blogPosts, testimonials, ...)
lib/                   # motionTokens, typography, utils
types.ts               # shared types
content.ts             # content shell that composes data modules
```

## Routes (React Router)
- `/` → Home (sectioned landing)
- `/projects` → Work index
- `/projects/:slug` → Project detail
- `/blog` → Blog index
- `/blog/:slug` → Blog article
- `/about` → About
- `*` → redirect to `/`

Notes:
- Route transitions are handled in `App.tsx` with `AnimatePresence`.
- `CTASection` is rendered outside the transition to remain persistent.
- Transition key uses `currentPage` (slug changes should not remount the wrapper).
- Page-level transitions are keyed by page type, not content identity.

## Theme & Colors
Theme follows system preference by default and persists to localStorage when manually toggled (via `ThemeContext`):
- Dark background: `#030303`
- Light background: `#fafafa`
- Primary accent: Tailwind `blue-500` / `blue-600`
- Highlight accent: Tailwind `accent` (`#2f6bff` in `index.css` `@theme`)
- “Glass” surfaces: `bg-black/40` or `bg-white/60` with subtle borders

Text contrast is tokenized in `lib/typography.ts`:
- `typography.textMuted` → muted labels/secondary text
- `typography.textSubtle` → subdued body copy
- Avoid inline opacity tweaks for text; use tokens

## Typography & Motion
- Use typography tokens from `lib/typography.ts`.
- Motion timing/variants should use `lib/motionTokens.ts` where possible.
- Prefer existing motion primitives: `Reveal`, `BlurIn`, `FadeInUp`, `StackedCards`.

## Motion Scope Rules (Current Behavior)
- Section titles use `BlurIn` (gentle, token-based).
- Section content may animate on first entry only.
- Large grids (projects, blog lists, testimonials): keep motion lightweight; existing `Reveal` usage on cards is acceptable but avoid heavier per-card effects.
- Hover motion is allowed on cards (transform only).
- Avoid stacking multiple micro-interactions on the same element (e.g., hover + tap + scroll animation). If needed, prefer hover-only.
- Performance rule: if an animation cannot be explained in one sentence, it should not exist.

## Heavy Pages (Detail Pages)
Applies to:
- `/projects/:slug`
- `/blog/:slug`

Rules:
- Prefer opacity-only page transitions.
- Keep stagger minimal and content-focused (no heavy sequences).
- Avoid blur/backdrop-filter during scroll.
- Images must have fixed dimensions or aspect-ratio.

## Layout & Sections
- Use `Section` + `Container` for page sections.
- Common section padding: `py-16 md:py-24` (handled in `Section`).
- Rounded corners commonly: `rounded-[16px]` (cards), `rounded-[40px]` (testimonials).
- Keep layout shells (Navbar, Background, Footer) outside route transitions.

## Content & Data
- Content lives in `content.ts`, with data modules in `data/`.
- When adding a new page, add data to `data/` and re-export from `content.ts`.

## Adding a New Page — Checklist
- [ ] Uses `Container` + `Section`
- [ ] Motion uses existing tokens/primitives
- [ ] Motion remains lightweight on grids and detail pages
- [ ] Text uses typography tokens (no inline opacity)
- [ ] No new transition keys
- [ ] CTA behavior unchanged
- [ ] Data lives in `data/` and exported via `content.ts`

## Accessibility
- Buttons/links must be semantic (`<button>`/`<a>`).
- Use ARIA patterns already in place (tabs, mobile menu).
- Keep focus styles and `aria-live` route announcements intact.
