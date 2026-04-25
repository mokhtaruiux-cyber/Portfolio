
import { Transition, Variants } from "motion/react";
import { distances, durations, easing, routeReveal, viewportDefaults } from "./motionTokens";

export * from "./motionTokens";

type RevealVariantOptions = {
  delay?: number;
  distance?: number;
  blur?: number;
  duration?: number;
  reduceMotion?: boolean;
};

export const VIEWPORT_REVEAL = viewportDefaults;

export const VIEWPORT_SECTION_REVEAL = {
  ...viewportDefaults,
} as const;

const revealTransition = (delay = 0, duration = durations.normal): Transition => ({
  duration,
  ease: easing.smooth,
  delay,
});

export const buildBlurFadeUpVariants = ({
  delay = 0,
  distance = distances.sm,
  blur = 0,
  duration = durations.normal,
  reduceMotion = false,
}: RevealVariantOptions = {}): Variants => {
  if (reduceMotion) {
    return {
      initial: { opacity: 1, y: 0 },
      animate: { opacity: 1, y: 0, transition: revealTransition(0, durations.fast) },
    };
  }

  const withBlur = blur > 0;
  return {
    initial: withBlur ? { opacity: 0, y: distance, filter: `blur(${blur}px)` } : { opacity: 0, y: distance },
    animate: {
      opacity: 1,
      y: 0,
      ...(withBlur ? { filter: "blur(0px)" } : {}),
      transition: revealTransition(delay, duration),
    },
  };
};

export const buildSectionRevealVariants = ({
  delay = 0,
  distance = distances.md,
  blur = 0,
  duration = durations.slow,
  reduceMotion = false,
}: RevealVariantOptions = {}): Variants => {
  return buildBlurFadeUpVariants({ delay, distance, blur, duration, reduceMotion });
};

export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: routeReveal.distance,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: revealTransition(0, routeReveal.duration),
  },
  exit: {
    opacity: 0,
    y: routeReveal.exitDistance,
    transition: {
      duration: routeReveal.exitDuration,
      ease: easing.exit,
    },
  },
};
