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

// Backward-compatible alias for older imports.
export const viewport = viewportDefaults;
