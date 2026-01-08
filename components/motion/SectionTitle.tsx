import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { titleRevealVariants, viewportDefaults } from '@/lib/motionTokens';

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  align?: 'left' | 'center' | 'right';
  delay?: number;
  className?: string;
  prefix?: React.ReactNode;
  stackHighlight?: boolean;
  eyebrowClassName?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  eyebrow,
  title,
  highlight,
  align = 'left',
  delay = 0,
  className,
  prefix,
  stackHighlight = false,
  eyebrowClassName,
}) => {
  const alignment = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[align];

  return (
    <motion.div
      className={cn('flex flex-col gap-4', alignment, className)}
      initial="initial"
      whileInView="animate"
      viewport={viewportDefaults}
    >
      {eyebrow && (
        <motion.span
          className={cn(typography.eyebrow, eyebrowClassName)}
          variants={titleRevealVariants}
          custom={delay}
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        className={cn(typography.h2, 'font-black max-w-[24ch]')}
        variants={titleRevealVariants}
        custom={delay + 0.1}
      >
        {prefix && <span className="inline-flex mr-3 align-middle">{prefix}</span>}
        {title}
        {highlight && (
          <>
            {stackHighlight ? <br /> : ' '}
            <span className="text-[#2f6bff]">{highlight}</span>
          </>
        )}
      </motion.h2>
    </motion.div>
  );
};
