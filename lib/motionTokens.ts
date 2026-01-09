import { Transition, Variants } from "framer-motion";

export const easing = {
  smooth: [0.22, 1, 0.36, 1] as const,
};

export const durations = {
  fast: 0.25,
  medium: 0.5,
  slow: 0.9,
};

export const viewportDefaults = {
  once: true,
  margin: "-120px",
};

export const titleRevealVariants = {
  initial: { opacity: 0, y: 18 },
  animate: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: durations.medium, ease: easing.smooth, delay },
  }),
};

export const stagger = {
  container: (delayChildren = 0, staggerChildren = 0.08) => ({
    initial: {},
    animate: {
      transition: {
        delayChildren,
        staggerChildren,
      },
    },
  }),
  item: {
    initial: { opacity: 0, y: 12 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: durations.fast, ease: easing.smooth },
    },
  },
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
    duration: durations.slow,
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

// Backward-compatible alias for older imports.
export const viewport = viewportDefaults;
