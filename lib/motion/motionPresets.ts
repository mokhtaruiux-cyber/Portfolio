import type { Variants } from "motion/react";

import {
  cardReveal as cardRevealTokens,
  distances,
  durations,
  masterTitleReveal,
  mediaRevealTokens,
  sectionReveal as sectionRevealTokens,
  staggerValues,
  titleReveal as titleRevealTokens,
  viewportAmounts,
  viewportDefaults,
} from "./motionTokens";
import {
  buildCardRevealVariants,
  buildContentRevealVariants,
  buildMediaRevealVariants,
  buildSectionRevealVariants,
  buildStaggerContainerVariants,
  cardRevealVariants,
  resolveTitleWordDelay,
  staggerItemVariants,
  titleRevealWordVariants,
  type RevealDirection,
  type RevealVariantOptions,
  type SectionRevealVariantOptions,
  type TitleRevealWordCustom,
  type IndexedRevealVariantOptions,
} from "./motionVariants";

export const titleWordReveal = {
  startDelay: titleRevealTokens.startDelayMs / 1000,
  stagger: titleRevealTokens.stagger,
  variants: titleRevealWordVariants,
  getCustom: (
    baseDelay = 0,
    wordIndex = 0,
    reduceMotion = false,
  ): TitleRevealWordCustom => ({
    baseDelay,
    reduceMotion,
    wordIndex,
  }),
  resolveDelay: resolveTitleWordDelay,
};

export const titleReveal = {
  headingDelay: masterTitleReveal.headingDelay,
  sectionDelay: masterTitleReveal.sectionDelay,
  startDelay: titleWordReveal.startDelay,
  viewport: {
    ...viewportDefaults,
    amount: viewportAmounts.title,
  },
  wordVariants: titleWordReveal.variants,
  getWordCustom: titleWordReveal.getCustom,
  resolveWordDelay: titleWordReveal.resolveDelay,
  titleDelay: (baseDelay: number = masterTitleReveal.sectionDelay) =>
    baseDelay + titleRevealTokens.headingDelay,
};

export const contentReveal = {
  defaultDirection: "up" as RevealDirection,
  defaultDistance: distances.sm,
  defaultDuration: durations.medium,
  viewport: {
    ...viewportDefaults,
    amount: viewportAmounts.content,
  },
  variants: (options?: RevealVariantOptions) => buildContentRevealVariants(options),
};

export const sectionReveal = {
  defaultBlur: sectionRevealTokens.blur,
  defaultDistance: sectionRevealTokens.distance,
  defaultDuration: sectionRevealTokens.duration,
  viewport: {
    ...viewportDefaults,
    amount: viewportAmounts.section,
  },
  variants: (options?: SectionRevealVariantOptions) =>
    buildSectionRevealVariants(options),
};

export const staggerContainer = (
  delayChildren = 0,
  staggerChildren = staggerValues.section,
): Variants => buildStaggerContainerVariants(delayChildren, staggerChildren);

export const staggerItem = staggerItemVariants;

export const stagger = {
  container: staggerContainer,
  item: staggerItem,
};

export const cardReveal = {
  distance: cardRevealTokens.distance,
  duration: cardRevealTokens.duration,
  stagger: cardRevealTokens.stagger,
  viewport: {
    ...viewportDefaults,
    amount: viewportAmounts.card,
    margin: cardRevealTokens.viewportMargin,
  },
  variants: (options?: IndexedRevealVariantOptions) =>
    buildCardRevealVariants(options),
  defaultVariants: cardRevealVariants,
};

export const mediaReveal = {
  distance: mediaRevealTokens.distance,
  duration: mediaRevealTokens.duration,
  scale: mediaRevealTokens.scale,
  viewport: {
    ...viewportDefaults,
    amount: viewportAmounts.media,
  },
  variants: (options?: IndexedRevealVariantOptions) =>
    buildMediaRevealVariants(options),
};

export const revealTitle = titleReveal;
export const revealText = contentReveal;
export const revealSection = sectionReveal;
export const revealCard = cardReveal;
