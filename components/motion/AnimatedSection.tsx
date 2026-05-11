'use client';

/**
 * components/motion/AnimatedSection.tsx
 *
 * The GetBitBang choreography pattern:
 * ONE whileInView on the section → ALL children animate in sequence.
 *
 * Children must use variants from lib/motion/variants.ts (fadeUp, scaleIn, etc.)
 * WITHOUT their own whileInView — they inherit state from this parent.
 *
 * Usage:
 *   <AnimatedSection>
 *     <motion.p variants={fadeUp}>Eyebrow</motion.p>
 *     <motion.h2 variants={fadeUp}>Title</motion.h2>
 *     <motion.p variants={fadeUp}>Body text</motion.p>
 *     <motion.div variants={staggerContainer}>
 *       <motion.div variants={scaleIn}><Card /></motion.div>
 *     </motion.div>
 *   </AnimatedSection>
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { sectionContainer } from '../../lib/motion/variants';
import { cn } from '../../lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Override the viewport trigger threshold (default 0.15) */
  amount?: number;
  /** Pass "animate" to fire on mount (Hero). Defaults to whileInView. */
  animate?: string;
  as?: 'section' | 'div' | 'article';
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  id,
  amount = 0.15,
  animate,
  as: Tag = 'div',
}) => {
  const shouldReduce = useReducedMotion();
  const MotionTag = motion[Tag] as typeof motion.div;

  if (shouldReduce) {
    const StaticTag = Tag;
    return (
      <StaticTag id={id} className={className}>
        {children}
      </StaticTag>
    );
  }

  return (
    <MotionTag
      id={id}
      className={cn('w-full', className)}
      variants={sectionContainer}
      initial="hidden"
      {...(animate ? { animate } : { whileInView: 'visible' })}
      viewport={animate ? undefined : { once: true, amount }}
    >
      {children}
    </MotionTag>
  );
};
