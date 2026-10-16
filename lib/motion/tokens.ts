// Compatibility shape for the original section variants. Values live in motionTokens.ts.
import { distances, durations, easing, staggerValues, viewportDefaults } from './motionTokens';

export const motionTokens = {

  // How long transitions take (seconds)
  duration: {
    fast: durations.fast,
    base: durations.normal,
    slow: durations.slow,
  },

  // Easing — this specific curve is what makes it feel "premium Framer"
  // It decelerates quickly at the end, giving a settled, confident feel.
  ease: { expo: easing.reveal },

  // How far elements travel upward during reveal (pixels)
  distance: {
    small: distances.sm,
    base: distances.md,
    large: distances.heroImage,
  },

  // Gap between each child revealing inside a stagger group (seconds)
  stagger: {
    text: staggerValues.section,
    cards: staggerValues.cards,
  },

  // How much of an element must be visible before it triggers (0–1)
  // 0.18 = 18% of the element is on screen. Feels natural.
  threshold: viewportDefaults.amount,

} as const;
