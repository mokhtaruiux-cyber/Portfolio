import type { Transition, Variants } from "motion/react";

import {
  cardReveal as cardRevealTokens,
  contentRevealTokens,
  distances,
  durations,
  easing,
  mediaRevealTokens,
  routeReveal,
  sectionReveal,
  staggerValues,
  titleReveal,
} from "./motionTokens";

export type RevealDirection = "up" | "down" | "left" | "right";

export type RevealVariantOptions = {
  blur?: number;
  delay?: number;
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
  reduceMotion?: boolean;
};

export type SectionRevealVariantOptions = {
  blur?: number;
  delay?: number;
  distance?: number;
  duration?: number;
  reduceMotion?: boolean;
};

export type IndexedRevealVariantOptions = {
  delay?: number;
  reduceMotion?: boolean;
};

export type TitleRevealWordCustom = {
  baseDelay?: number;
  reduceMotion?: boolean;
  wordIndex?: number;
};

const revealTransition = (
  delay = 0,
  duration = durations.normal,
): Transition => ({
  duration,
  ease: easing.smooth,
  delay,
});

const resolveDirectionalOffset = (
  direction: RevealDirection,
  distance: number,
) => {
  switch (direction) {
    case "down":
      return { x: 0, y: -distance };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    case "up":
    default:
      return { x: 0, y: distance };
  }
};

export const resolveTitleWordDelay = (
  baseDelay = 0,
  wordIndex = 0,
) => baseDelay + titleReveal.startDelayMs / 1000 + wordIndex * titleReveal.stagger;

export const titleRevealWordVariants: Variants = {
  initial: (custom: TitleRevealWordCustom = {}) =>
    custom.reduceMotion
      ? { opacity: 1 }
      : {
          opacity: 0,
          y: titleReveal.distance,
          filter: `blur(${titleReveal.blur}px)`,
        },
  animate: (custom: TitleRevealWordCustom = {}) =>
    custom.reduceMotion
      ? {
          opacity: 1,
          transition: {
            duration: durations.fast,
          },
        }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: titleReveal.duration,
            delay: resolveTitleWordDelay(custom.baseDelay, custom.wordIndex),
            ease: easing.reveal,
          },
        },
  hidden: (custom: TitleRevealWordCustom = {}) =>
    custom.reduceMotion
      ? { opacity: 1 }
      : {
          opacity: 0,
          y: titleReveal.distance,
          filter: `blur(${titleReveal.blur}px)`,
        },
  visible: (custom: TitleRevealWordCustom = {}) =>
    custom.reduceMotion
      ? {
          opacity: 1,
          transition: {
            duration: durations.fast,
          },
        }
      : {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: titleReveal.duration,
            delay: resolveTitleWordDelay(custom.baseDelay, custom.wordIndex),
            ease: easing.reveal,
          },
        },
};

const buildRevealVariants = ({
  delay = 0,
  direction = "up",
  distance = distances.sm,
  duration = durations.medium,
  reduceMotion = false,
}: RevealVariantOptions = {}): Variants => {
  const axis = resolveDirectionalOffset(direction, distance);
  const initial = reduceMotion ? { opacity: 1 } : { opacity: 0, ...axis };
  const animate = reduceMotion
    ? {
        opacity: 1,
        transition: {
          duration: durations.fast,
          ease: easing.smooth,
          delay,
        },
      }
    : {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          ease: easing.smooth,
          delay,
        },
      };

  return {
    initial,
    animate,
    hidden: initial,
    visible: animate,
  };
};

const buildBlurFadeUpVariants = ({
  delay = 0,
  distance = distances.sm,
  blur = 0,
  duration = durations.normal,
  reduceMotion = false,
}: RevealVariantOptions = {}): Variants => {
  if (reduceMotion) {
    const initial = { opacity: 1, y: 0 };
    const animate = {
      opacity: 1,
      y: 0,
      transition: revealTransition(0, durations.fast),
    };

    return {
      initial,
      animate,
      hidden: initial,
      visible: animate,
    };
  }

  const withBlur = blur > 0;
  const initial = withBlur
    ? { opacity: 0, y: distance, filter: `blur(${blur}px)` }
    : { opacity: 0, y: distance };
  const animate = {
    opacity: 1,
    y: 0,
    ...(withBlur ? { filter: "blur(0px)" } : {}),
    transition: revealTransition(delay, duration),
  };

  return {
    initial,
    animate,
    hidden: initial,
    visible: animate,
  };
};

export const buildSectionRevealVariants = ({
  delay = 0,
  distance = sectionReveal.distance,
  blur = sectionReveal.blur,
  duration = sectionReveal.duration,
  reduceMotion = false,
}: SectionRevealVariantOptions = {}): Variants =>
  buildBlurFadeUpVariants({
    delay,
    distance,
    blur,
    duration,
    reduceMotion,
  });

export const buildContentRevealVariants = ({
  delay = 0,
  direction = "up",
  distance = contentRevealTokens.distance,
  duration = contentRevealTokens.duration,
  reduceMotion = false,
}: RevealVariantOptions = {}): Variants =>
  buildRevealVariants({
    delay,
    direction,
    distance,
    duration,
    reduceMotion,
  });

export const buildStaggerContainerVariants = (
  delayChildren = 0,
  staggerChildren = staggerValues.section,
): Variants => {
  const initial = {};
  const animate = {
    transition: {
      delayChildren,
      staggerChildren,
    },
  };

  return {
    initial,
    animate,
    hidden: initial,
    visible: animate,
  };
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

export const buildCardRevealVariants = ({
  delay = 0,
  reduceMotion = false,
}: IndexedRevealVariantOptions = {}): Variants => {
  const initial = reduceMotion ? { opacity: 1 } : { opacity: 0, y: cardRevealTokens.distance };
  const animate = {
    opacity: 1,
    y: 0,
    transition: {
      duration: reduceMotion ? durations.fast : cardRevealTokens.duration,
      ease: easing.reveal,
      delay: reduceMotion ? 0 : delay,
    },
  };

  return {
    initial,
    animate,
    hidden: initial,
    visible: animate,
  };
};

export const cardRevealVariants = buildCardRevealVariants();

export const buildMediaRevealVariants = ({
  delay = 0,
  reduceMotion = false,
}: IndexedRevealVariantOptions = {}): Variants => {
  const initial = reduceMotion
    ? { opacity: 1 }
    : {
        opacity: 0,
        y: mediaRevealTokens.distance,
        scale: mediaRevealTokens.scale,
      };
  const animate = {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: reduceMotion ? durations.fast : mediaRevealTokens.duration,
      ease: easing.reveal,
      delay: reduceMotion ? 0 : delay,
    },
  };

  return {
    initial,
    animate,
    hidden: initial,
    visible: animate,
  };
};
