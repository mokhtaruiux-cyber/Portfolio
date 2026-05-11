'use client';

/**
 * lib/motion/variants.ts
 * GetBitBang-quality motion variants — v2.
 *
 * The KEY to getbitbang.com feel:
 * - Each individual element (eyebrow, title, body, card) is its OWN animated node
 * - Large Y offset (60px) makes the "rising from below" unmistakably visible
 * - Expo deceleration [0.22, 1, 0.36, 1] — snappy start, soft land
 * - staggerChildren: 0.12 — tight but clearly sequential
 *
 * Architecture rule: AnimatedSection is the ONLY whileInView.
 * Children use variants here — they receive 'visible' from the parent cascade.
 */

import type { Variants } from 'motion/react';

// ─── Easing ────────────────────────────────────────────────────────────────
// [0.22, 1, 0.36, 1] — fast snap with elegant deceleration (getbitbang signature)
export const EXPO = [0.22, 1, 0.36, 1] as const;
export const SMOOTH = [0.4, 0, 0.2, 1] as const;

// ─── Durations ─────────────────────────────────────────────────────────────
export const DUR = {
  fast:   0.35,
  base:   0.65,
  slow:   0.8,
  slower: 1.0,
} as const;

// ─── Stagger delays ────────────────────────────────────────────────────────
export const STAGGER = {
  tight:  0.06,
  base:   0.10,
  loose:  0.12,
} as const;

// ─── FADE UP ───────────────────────────────────────────────────────────────
// The core GetBitBang reveal. 60px lift + fade. Applied to EVERY content element:
// eyebrows, h2 titles, body text, CTA buttons — each one separately.
// Large y makes the animation unmistakably visible unlike a subtle 20px lift.
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DUR.slow,
      ease: EXPO,
    },
  },
};

// ─── FADE UP — TIGHT ───────────────────────────────────────────────────────
// For elements that are already offset by parent stagger — 36px is enough.
// Used as children inside staggerContainer (cards, list items, badges).
export const fadeUpTight: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DUR.base,
      ease: EXPO,
    },
  },
};

// ─── SCALE IN ──────────────────────────────────────────────────────────────
// Premium card reveal: subtle scale 0.95→1 + 36px lift.
// The scale gives a "snap into existence" feel that plain fadeUp can't.
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: DUR.slow,
      ease: EXPO,
    },
  },
};

// ─── FADE IN (pure opacity, no Y) ──────────────────────────────────────────
// For decorative/overlay elements that shouldn't move.
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DUR.base, ease: SMOOTH },
  },
};

// ─── SLIDE IN FROM LEFT ────────────────────────────────────────────────────
export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR.slow, ease: EXPO },
  },
};

// ─── SLIDE IN FROM RIGHT ───────────────────────────────────────────────────
export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DUR.slow, ease: EXPO },
  },
};

// ─── SECTION CONTAINER ─────────────────────────────────────────────────────
// The ONLY component that has whileInView. Cascades 'visible' to all children.
// staggerChildren: 0.12 → tight, clearly sequential, not too slow.
// This is what creates the waterfall: eyebrow (0ms) → title (120ms) → body (240ms)
// → cards (360ms+) → CTA (last).
export const sectionContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.loose,   // 0.12s between each direct child
      delayChildren:   0,
    },
  },
};

// ─── STAGGER CONTAINER (nested) ────────────────────────────────────────────
// For card grids nested inside sectionContainer.
// Tighter stagger — cards flow fast after parent delay.
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.base,   // 0.10s between cards
      delayChildren:   0,
    },
  },
};

// ─── STAGGER CONTAINER — TIGHT ─────────────────────────────────────────────
// For badges, nav items, inline small lists.
export const staggerContainerTight: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.tight,  // 0.06s — rapid fire, decorative
      delayChildren:   0,
    },
  },
};
