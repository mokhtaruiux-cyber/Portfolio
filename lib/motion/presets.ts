// lib/motion/presets.ts
// Usage example:
//   <motion.h2 {...reveal.heading}>Title</motion.h2>
//   <motion.p  {...reveal.body}>Paragraph text</motion.p>

import { motionTokens as t } from "./tokens";
import { fadeUp, fadeUpSubtle, scaleReveal, sectionOrchestrator, staggerParent } from "./variants";

const viewport = {
  once:   true,           // animate once — do NOT repeat on scroll up
  amount: t.threshold,    // fire at 18% visibility
};

export const reveal = {

  // For section <section> wrapper — orchestrates ALL children
  section: {
    variants:    sectionOrchestrator,
    initial:     "hidden" as const,
    whileInView: "visible" as const,
    viewport,
  },

  // For the main heading of each section (h2, h3)
  heading: {
    variants: fadeUp,
    // No initial/whileInView — inherits from section parent
  },

  // For body text / supporting paragraphs below a heading
  body: {
    variants: fadeUpSubtle,
    // Inherits from parent
  },

  // For a card grid wrapper — makes cards stagger
  cardGrid: {
    variants:    staggerParent,
    // Inherits from parent
  },

  // For each individual card — used inside cardGrid wrapper
  card: {
    variants: scaleReveal,
  },

  // For CTA buttons / action links
  cta: {
    variants: fadeUp,
  },

  // For standalone elements NOT inside a section orchestrator
  // (use when you can't wrap with section variant for some reason)
  standalone: {
    variants:    fadeUp,
    initial:     "hidden" as const,
    whileInView: "visible" as const,
    viewport,
  },
};
