'use client';

import React from "react";
import { motion, Variants, useReducedMotion } from "motion/react";
import {
  cardReveal,
  contentReveal,
  mediaReveal,
  staggerContainer,
} from "../../lib/motion/motionPresets";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  index?: number;
  preset?: "content" | "card" | "media";
  staggerChildren?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  direction = "up",
  className,
  preset = "content",
  staggerChildren: useStagger = false,
}) => {
  const reduce = useReducedMotion() ?? false;

  const variants: Variants = useStagger
    ? (staggerContainer(delay) as Variants)
    : preset === "card"
      ? cardReveal.variants({ delay, reduceMotion: reduce })
      : preset === "media"
        ? mediaReveal.variants({ delay, reduceMotion: reduce })
        : contentReveal.variants({ delay, direction, reduceMotion: reduce });

  const viewport =
    preset === "card"
      ? cardReveal.viewport
      : preset === "media"
        ? mediaReveal.viewport
        : contentReveal.viewport;

  return (
    <motion.div
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={viewport}
      className={className}
    >
      {children}
    </motion.div>
  );
};
