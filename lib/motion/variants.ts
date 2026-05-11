// lib/motion/variants.ts
import { Variants } from "framer-motion";
import { motionTokens as t } from "./tokens";

// ─── 1. Fade Up ────────────────────────────────────────────────────
// Use for: headings, body paragraphs, labels, standalone elements.

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: t.distance.base,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: t.duration.slow,
      ease: t.ease.expo,
    },
  },
};

// ─── 2. Fade Up (Subtle) ───────────────────────────────────────────
// Use for: body text, supporting paragraphs — slightly shorter travel.

export const fadeUpSubtle: Variants = {
  hidden: {
    opacity: 0,
    y: t.distance.small,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: t.duration.slow,
      ease: t.ease.expo,
    },
  },
};

// ─── 3. Scale + Fade ──────────────────────────────────────────────
// Use for: project cards, service cards, any card-shaped element.

export const scaleReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: t.distance.small,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: t.duration.slow,
      ease: t.ease.expo,
    },
  },
};

// ─── 4. Stagger Container ─────────────────────────────────────────
// Wrap a list/grid of children with this.
// The container itself is invisible — it only controls when children fire.
// Each child uses fadeUp or scaleReveal as its own variant.

export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: t.stagger.cards,
    },
  },
};

// ─── 5. Section Orchestrator ──────────────────────────────────────
// Wrap the whole section with this.
// It staggers: heading → body → cards → CTA in order.
// Larger stagger than cards because these are major content blocks.

export const sectionOrchestrator: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: t.stagger.text,
    },
  },
};
