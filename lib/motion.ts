
import { Transition, Variants } from "framer-motion";
import { durations, easing, viewportDefaults, stagger, titleRevealVariants } from "./motionTokens";

/**
 * Premium Animation System
 * Core constants for timing, easing, and reusable transition patterns.
 */

export const timings = {
  slow: durations.slow,
  medium: durations.medium,
  fast: durations.fast,
  instant: 0.1,
};

export const transitions = {
  spring: {
    type: "spring",
    damping: 25,
    stiffness: 120,
    mass: 1,
  } as Transition,
  gentle: {
    type: "spring",
    damping: 30,
    stiffness: 100,
  } as Transition,
  tight: {
    type: "spring",
    damping: 20,
    stiffness: 200,
  } as Transition,
  smooth: {
    duration: timings.slow,
    ease: easing.smooth,
  } as Transition,
};

export const variants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  staggerContainer: (delayChildren = 0, staggerChildren = 0.1): Variants => ({
    ...stagger.container(delayChildren, staggerChildren),
    whileInView: stagger.container(delayChildren, staggerChildren).animate,
  }),
  reveal: {
    initial: { opacity: 0, y: 18 },
    whileInView: titleRevealVariants.animate(0),
    viewport: viewportDefaults,
  },
};

export { durations, easing, viewportDefaults, titleRevealVariants, stagger };
