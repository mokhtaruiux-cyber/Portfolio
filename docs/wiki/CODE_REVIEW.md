# Code Review & Architecture

## Architecture Overview
The project uses a modular React + Vite structure with clear separation between layout, sections, motion primitives, and data.

### Strengths
- **Modular Components**: Layout/sections/motion/background split is consistent.
- **Tokenization**: Motion tokens in `lib/motionTokens.ts`, typography in `lib/typography.ts`.
- **Shared Hooks**: `useMediaQuery` centralizes responsive checks.
- **Data Separation**: Content is composed in `content.ts` from `data/*` modules.
- **Routing**: App-level routing is centralized with `AnimatePresence` transitions.

### Areas to Watch
- **App.tsx Size**: App remains the orchestration hub (routing, theme, transitions). Keep it as a coordinator only—avoid adding new UI there.
- **Background Effects**: Large blurred layers are expensive; avoid adding new continuous blur/filters.
- **Motion Consistency**: Prefer existing primitives (`Reveal`, `BlurIn`, `FadeInUp`, `StackedCards`) and motion tokens.

### Component Notes
- **LivingBackground**: Uses animated atmospheric blobs + grid; keep transforms/opacity only.
- **ProjectCardWrapper**: Uses scroll-linked stacked cards; iPhone sticky rules apply.
- **TypingEffect**: Word-level reveal to avoid DOM bloat.
