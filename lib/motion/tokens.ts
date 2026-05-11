// lib/motion/tokens.ts
// ONE source of truth for every timing, distance, and easing value.
// Nothing in this project is allowed to use a raw number for animation.

export const motionTokens = {

  // How long transitions take (seconds)
  duration: {
    fast:   0.35,
    base:   0.55,
    slow:   0.70,
  },

  // Easing — this specific curve is what makes it feel "premium Framer"
  // It decelerates quickly at the end, giving a settled, confident feel.
  ease: {
    expo: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },

  // How far elements travel upward during reveal (pixels)
  distance: {
    small: 16,   // subtle — for text after a heading
    base:  28,   // standard — for headings
    large: 44,   // for hero headline
  },

  // Gap between each child revealing inside a stagger group (seconds)
  stagger: {
    text:  0.12,   // heading → body text
    cards: 0.10,   // card 1 → card 2 → card 3
  },

  // How much of an element must be visible before it triggers (0–1)
  // 0.18 = 18% of the element is on screen. Feels natural.
  threshold: 0.18,

} as const;
