'use client';

/**
 * components/motion/FadeUp.tsx
 *
 * Drop-in motion.div with fadeUp variants.
 * DOES NOT have its own whileInView — inherits animate state from AnimatedSection parent.
 * Use for: eyebrows, titles, body text, CTAs, any block-level reveal.
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { fadeUp } from '../../lib/motion/variants';
import { cn } from '../../lib/utils';

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof typeof motion;
}

export const FadeUp: React.FC<FadeUpProps> = ({
  children,
  className,
  as: Tag = 'div',
}) => {
  const shouldReduce = useReducedMotion();
  const MotionTag = motion[Tag as 'div'] as typeof motion.div;

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <MotionTag variants={fadeUp} className={cn(className)}>
      {children}
    </MotionTag>
  );
};
