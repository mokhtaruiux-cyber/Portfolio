
import React from "react";
import { motion, Variants, useReducedMotion } from "motion/react";
import { distances, durations, easing, stagger } from "../../lib/motionTokens";
import { VIEWPORT_REVEAL } from "../../lib/motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  staggerChildren?: boolean;
}

/**
 * Reveal component for scroll-triggered entry animations.
 * Fixes the runtime error by ensuring timings and easing are always defined.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  direction = "up",
  className,
  staggerChildren = false,
}) => {
  const reduce = useReducedMotion() ?? false;

  const distance = distances.sm;
  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { y: 0, x: distance },
    right: { y: 0, x: -distance },
  };

  const axis = directionMap[direction] || directionMap.up;

  const revealVariants: Variants = staggerChildren
    ? (stagger.container(delay) as Variants)
    : ({
      initial: reduce
        ? { opacity: 1 }
        : { opacity: 0, ...axis },
      animate: reduce
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
            duration: durations.medium,
            ease: easing.smooth,
            delay,
          },
        },
    } as Variants);

  return (
    <motion.div
      variants={revealVariants}
      initial="initial"
      whileInView="animate"
      viewport={VIEWPORT_REVEAL}
      className={className}
    >
      {children}
    </motion.div>
  );
};
