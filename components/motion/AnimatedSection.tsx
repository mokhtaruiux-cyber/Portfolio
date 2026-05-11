'use client';

/**
 * components/motion/AnimatedSection.tsx
 *
 * The title/intro choreography pattern:
 * One viewport trigger on the section cascades the top-level title rhythm.
 *
 * Deeper body/card/media groups use Reveal so long sections can trigger
 * their data as it actually enters the viewport.
 *
 * Usage:
 *   <AnimatedSection>
 *     <motion.p variants={fadeUp}>Eyebrow</motion.p>
 *     <motion.h2 variants={fadeUp}>Title</motion.h2>
 *     <Reveal as="p">Body text</Reveal>
 *     <Reveal preset="card" staggerChildren>
 *       <motion.div variants={cardReveal.defaultVariants}><Card /></motion.div>
 *     </Reveal>
 *   </AnimatedSection>
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { sectionOrchestrator } from '../../lib/motion/variants';
import { motionTokens as t } from '../../lib/motion/tokens';
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
  amount = t.threshold,
  animate,
  as: Tag = 'div',
}) => {
  const shouldReduce = useReducedMotion();
  const MotionTag = motion[Tag] as typeof motion.div;

  return (
    <MotionTag
      id={id}
      className={cn('w-full', className)}
      variants={shouldReduce ? undefined : sectionOrchestrator}
      initial={shouldReduce ? undefined : 'hidden'}
      {...(shouldReduce ? {} : animate ? { animate } : { whileInView: 'visible' })}
      viewport={shouldReduce || animate ? undefined : { once: true, amount }}
    >
      {children}
    </MotionTag>
  );
};
