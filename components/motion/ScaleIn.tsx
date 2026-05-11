'use client';

/**
 * components/motion/ScaleIn.tsx
 *
 * Drop-in motion.div with scaleIn variants (opacity + scale 0.96→1 + y lift).
 * DOES NOT have its own whileInView — inherits from AnimatedSection or staggerContainer parent.
 * Use for: project cards, blog cards, process steps, experience rows, gallery images.
 *
 * The scale effect is the GetBitBang signature — cards grow slightly into place
 * giving a satisfying "snap" feel that plain fadeUp can't achieve.
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { scaleIn } from '../../lib/motion/variants';
import { cn } from '../../lib/utils';

interface ScaleInProps {
  children: React.ReactNode;
  className?: string;
}

export const ScaleIn: React.FC<ScaleInProps> = ({ children, className }) => {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={scaleIn} className={cn(className)}>
      {children}
    </motion.div>
  );
};
