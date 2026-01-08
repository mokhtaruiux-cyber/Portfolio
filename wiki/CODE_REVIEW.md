# Code Review & Architecture

## Architecture Overview
The project follows a modern React structure using Vite.

### Strengths
- **Modular Components**: Clear separation between `motion`, `background`, and `sections`.
- **Hooks Usage**: Custom hooks like `useParallax` encapsulate logic well.
- **Motion Orchestration**: Good use of `AnimatePresence` and `stagger` for smooth transitions.
- **Type Safety**: TypeScript is used throughout the project.

### Areas for Improvement
- **App.tsx Bloat**: `App.tsx` contains too many inline components (GlowButton, ContactSection, Footer, etc.). These should be moved to the `components/` directory.
- **Hardcoded Constants**: While some are in `constants.tsx`, many strings and configurations are still hardcoded in components.
- **Asset Management**: Referencing images directly from the root instead of an `assets` folder or remote CDN with fallbacks.
- **Accessibility**: Use of many `div` and `button` elements without proper ARIA labels or semantic structure (e.g., `section` and `header` are used, but could be improved).

## Component Breakdown
- `LivingBackground`: Complex SVG/CSS animation system. Performance could be improved by using `will-change` more selectively.
- `ProjectCardWrapper`: Nice use of `sticky` and `useTransform` for scroll effects.
- `DetailView`: Generic and reusable for both projects and blogs.
