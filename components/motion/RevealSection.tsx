'use client';

import React from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { cn } from '../../lib/utils';
import { VIEWPORT_SECTION_REVEAL } from '../../lib/motion';
import { durations, easing, distances } from '../../lib/motion/motionTokens';

type RevealSectionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  disableTransform?: boolean;
};

export const RevealSection: React.FC<RevealSectionProps> = ({
  children,
  className,
  delay = 0,
  disableTransform = false,
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, VIEWPORT_SECTION_REVEAL);
  const reduceMotion = useReducedMotion() ?? false;

  // CRITICAL FIX: opacity starts at 1 (not 0) so children's own opacity
  // animations are visible. Only the Y transform is used here.
  // This prevents the outer wrapper from masking child reveal animations.
  const variants = React.useMemo(() => {
    if (reduceMotion) {
      return {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
      };
    }
    if (disableTransform) {
      return {
        initial: { opacity: 1 },
        animate: {
          opacity: 1,
          transition: { duration: durations.fast, ease: easing.smooth, delay },
        },
      };
    }
    return {
      initial: { opacity: 1, y: distances.md },
      animate: {
        opacity: 1,
        y: 0,
        transition: { duration: durations.slow, ease: easing.smooth, delay },
      },
    };
  }, [delay, disableTransform, reduceMotion]);

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      className={cn('w-full', className)}
    >
      {children}
    </motion.div>
  );
};
