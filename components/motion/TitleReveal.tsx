'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { titleReveal } from '../../lib/motion/motionPresets';
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
  cssIntro?: boolean;
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
  cssIntro = false,
  'aria-label': ariaLabel,
}: TitleRevealProps) => (
  <motion.div variants={{ hidden: {}, visible: {} }} className={cn(wrapperClassName)}>
    <BlurIn
      as={as}
      delay={delay}
      stackWords={stackWords}
      cssIntro={cssIntro}
      aria-label={ariaLabel}
      className={className}
      contentClassName={contentClassName}
    >
      {children}
    </BlurIn>
  </motion.div>
);
