import { viewportDefaults } from "./motion/motionTokens";

export const VIEWPORT_REVEAL = viewportDefaults;

export const VIEWPORT_SECTION_REVEAL = {
  ...viewportDefaults,
} as const;

export { pageTransitionVariants } from "./motion/motionVariants";
