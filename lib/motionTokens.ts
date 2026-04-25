import { Transition } from "motion/react";

const revealEase = [0.22, 1, 0.36, 1] as const;
const hoverEase = [0.2, 0.8, 0.2, 1] as const;
const exitEase = [0.4, 0, 1, 1] as const;

export const easing = {
  reveal: revealEase,
  hover: hoverEase,
  exit: exitEase,
  ambient: "easeInOut" as const,
  // Aliases kept for backward compatibility.
  smooth: revealEase,
  mellow: hoverEase,
};

export const durations = {
  fast: 0.22,
  normal: 0.65,
  medium: 0.65,
  slow: 0.72,
  glacial: 0.8,
};

export const delays = {
  none: 0,
  xs: 0.04,
  sm: 0.08,
  md: 0.12,
  lg: 0.18,
};

export const sectionPacing = {
  hero: {
    lead: 0.1,
    body: 0.18,
    actions: 0.32,
  },
  feature: {
    title: 0.04,
    body: 0.16,
    content: 0.24,
  },
  support: {
    title: 0.04,
    body: 0.16,
    content: 0.24,
  },
  cta: {
    badge: 0.04,
    title: 0.04,
    body: 0.16,
    actions: 0.24,
  },
} as const;

export const distances = {
  xs: 12,
  sm: 18,
  md: 28,
  lg: 36,
  heroImage: 44,
  xl: 80,
};

export const staggerValues = {
  section: 0.12,
  cards: 0.06,
  lines: 0.08,
  fast: 0.04,
};

export const viewportDefaults = {
  once: true,
  amount: 0.22,
  margin: "0px 0px -8% 0px",
} as const;

export const titleReveal = {
  distance: distances.sm,
  blur: 14,
  duration: durations.slow,
  stagger: 0.055,
  headingDelay: 0.1,
  startDelayMs: 70,
} as const;

export const masterTitleReveal = {
  source: "Working with teams across.",
  sectionDelay: sectionPacing.support.title,
  headingDelay: sectionPacing.support.title + titleReveal.headingDelay,
} as const;

export const sectionReveal = {
  distance: distances.md,
  blur: 0,
  duration: durations.slow,
} as const;

export const routeReveal = {
  distance: 10,
  exitDistance: -4,
  duration: 0.3,
  exitDuration: 0.24,
} as const;

export const scrollTiming = {
  anchorDuration: 0.75,
} as const;

export const smoothScroll = {
  lerp: 0.08,
  syncTouchLerp: 0.075,
  touchMultiplier: 2,
  wheelMultiplier: 1,
} as const;

export const cardReveal = {
  distance: 14,
  duration: 0.42,
  stagger: 0.03,
  viewportMargin: "-60px",
} as const;

export const scrollSpring = {
  stiffness: 90,
  damping: 24,
  mass: 0.9,
} as const;

export const heroReveal = {
  startDelayMs: 120,
  image: {
    distance: distances.heroImage,
    rotateX: 8,
    blur: 18,
    delay: delays.lg,
    duration: durations.glacial,
    pulseScale: 1.018,
    pulseDuration: 5.5,
  },
  body: {
    distance: distances.sm,
    delay: 0.92,
    duration: durations.normal,
  },
  actions: {
    distance: distances.xs,
    delay: 1.08,
    duration: durations.normal,
  },
  badges: {
    distance: distances.xs,
    delay: 1.18,
    duration: durations.normal,
  },
} as const;

export const stagger = {
  container: (delayChildren = delays.sm, staggerChildren = staggerValues.section) => ({
    initial: {},
    animate: {
      transition: {
        delayChildren,
        staggerChildren,
      },
    },
  }),
  item: {
    initial: { opacity: 0, y: distances.sm },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: durations.normal, ease: easing.reveal },
    },
  },
};

export const transitions = {
  spring: {
    type: "spring",
    damping: 30,
    stiffness: 100,
    mass: 0.6,
  } as Transition,
  gentle: {
    type: "spring",
    damping: 32,
    stiffness: 120,
    mass: 0.7,
  } as Transition,
  tight: {
    type: "spring",
    damping: 30,
    stiffness: 160,
    mass: 0.7,
  } as Transition,
  smooth: {
    duration: durations.normal,
    ease: easing.reveal,
  } as Transition,
  quick: {
    duration: durations.fast,
    ease: easing.hover,
  } as Transition,
};

// Backward-compatible alias for older imports.
export const viewport = viewportDefaults;
