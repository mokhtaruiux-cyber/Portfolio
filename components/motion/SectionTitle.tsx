import React from 'react';
import { BlurIn } from './BlurIn';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';

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
    <div className={cn('flex flex-col gap-4', alignment, className)}>
      {eyebrow && (
        <BlurIn
          as="span"
          className={cn(typography.eyebrow, eyebrowClassName)}
          delay={delay}
        >
          {eyebrow}
        </BlurIn>
      )}
      <BlurIn
        as="h2"
        className={cn(typography.h2, 'font-black max-w-[24ch]')}
        delay={delay + 0.1}
      >
        {prefix && <span className="inline-flex mr-3 align-middle">{prefix}</span>}
        {title}
        {highlight && (
          <>
            {stackHighlight ? <br /> : ' '}
            <span className="text-[#2f6bff]">{highlight}</span>
          </>
        )}
      </BlurIn>
    </div>
  );
};
