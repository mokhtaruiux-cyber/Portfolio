import { viewportDefaults } from "./motion/motionTokens";
import {
  buildBlurFadeUpVariants,
  buildSectionRevealVariants,
  pageTransitionVariants,
} from "./motion/motionVariants";

export const VIEWPORT_REVEAL = viewportDefaults;

export const VIEWPORT_SECTION_REVEAL = {
  ...viewportDefaults,
} as const;

export * from "./motion/motionTokens";
export * from "./motion/motionVariants";
export {
  cardReveal as cardRevealPreset,
  contentReveal as contentRevealPreset,
  mediaReveal as mediaRevealPreset,
  sectionReveal as sectionRevealPreset,
  stagger,
  staggerContainer,
  staggerItem,
  titleReveal as titleRevealPreset,
  titleWordReveal as titleWordRevealPreset,
} from "./motion/motionPresets";
export {
  buildBlurFadeUpVariants,
  buildSectionRevealVariants,
  pageTransitionVariants,
};
