'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { titleReveal } from '../../lib/motion/motionPresets';
import { fadeUp } from '../../lib/motion/variants';
import { cn } from '../../lib/utils';
import { BlurIn } from './BlurIn';

type TitleRevealProps = {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  wrapperClassName?: string;
  delay?: number;
  stackWords?: boolean;
  'aria-label'?: string;
};

export const TitleReveal = ({
  as = 'h2',
  children,
  className,
  contentClassName,
  wrapperClassName,
  delay = titleReveal.headingDelay,
  stackWords = false,
  'aria-label': ariaLabel,
}: TitleRevealProps) => (
  <motion.div variants={fadeUp} className={cn(wrapperClassName)}>
    <BlurIn
      as={as}
      delay={delay}
      stackWords={stackWords}
      aria-label={ariaLabel}
      className={className}
      contentClassName={contentClassName}
    >
      {children}
    </BlurIn>
  </motion.div>
);
