'use client';

import React from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";
import {
  cardReveal,
  contentReveal,
  mediaReveal,
  staggerContainer,
} from "../../lib/motion/motionPresets";

type RevealElement = "div" | "p" | "span" | "section" | "article" | "ul" | "li";

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children" | "className"> {
  as?: RevealElement;
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  index?: number;
  preset?: "content" | "card" | "media";
  staggerChildren?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({
  as = "div",
  children,
  delay = 0,
  direction = "up",
  className,
  preset = "content",
  staggerChildren: useStagger = false,
  ...motionProps
}) => {
  const reduce = useReducedMotion() ?? false;
  const ref = React.useRef<HTMLElement | null>(null);

  const variants: Variants = React.useMemo(() => {
    if (useStagger) {
      const childStagger = preset === "card" ? cardReveal.stagger : undefined;
      return staggerContainer(delay, childStagger) as Variants;
    }

    if (preset === "card") {
      return cardReveal.variants({ delay, reduceMotion: reduce });
    }

    if (preset === "media") {
      return mediaReveal.variants({ delay, reduceMotion: reduce });
    }

    return contentReveal.variants({ delay, direction, reduceMotion: reduce });
  }, [delay, direction, preset, reduce, useStagger]);

  const viewport = React.useMemo(() => (
    preset === "card"
      ? cardReveal.viewport
      : preset === "media"
        ? mediaReveal.viewport
        : contentReveal.viewport
  ), [preset]);
  const isInView = useInView(ref, viewport);
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref as React.Ref<HTMLDivElement>}
      variants={variants}
      initial={reduce ? false : "hidden"}
      animate={reduce || isInView ? "visible" : "hidden"}
      className={className}
      {...motionProps}
    >
      {children}
    </MotionTag>
  );
};
