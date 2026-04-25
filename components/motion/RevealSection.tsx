import React from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { cn } from '../../lib/utils';
import { VIEWPORT_SECTION_REVEAL, buildSectionRevealVariants } from '../../lib/motion';
import { sectionReveal } from '../../lib/motionTokens';

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
  const variants = React.useMemo(
    () =>
      buildSectionRevealVariants({
        delay,
        distance: disableTransform ? 0 : sectionReveal.distance,
        blur: sectionReveal.blur,
        duration: sectionReveal.duration,
        reduceMotion,
      }),
    [delay, disableTransform, reduceMotion]
  );

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
