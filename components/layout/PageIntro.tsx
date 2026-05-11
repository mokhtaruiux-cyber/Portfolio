import React from 'react';

import { cn } from '../../lib/utils';
import { typography } from '../../lib/typography';
import { eyebrowChipClass } from '../../lib/chipStyles';
import { titleReveal } from '../../lib/motion/motionPresets';
import { BlurIn } from '../motion/BlurIn';
import { Reveal } from '../motion/Reveal';

interface PageIntroProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  darkMode: boolean;
  className?: string;
}

export const PageIntro: React.FC<PageIntroProps> = ({
  eyebrow,
  title,
  highlight,
  description,
  darkMode,
  className,
}) => {
  return (
    <div
      className={cn(
        'text-left',
        className
      )}
    >
      {eyebrow && (
        <BlurIn as="p" delay={titleReveal.sectionDelay} className={cn(typography.labelXs, eyebrowChipClass, 'mb-4')}>
          {eyebrow}
        </BlurIn>
      )}

      <BlurIn
        as="h1"
        aria-label={highlight ? `${title} ${highlight}` : title}
        delay={titleReveal.headingDelay}
        className={cn(
          typography.h1,
          'max-w-[18ch] text-balance font-black',
          darkMode ? 'text-white' : 'text-black'
        )}
      >
        {title}
        {highlight ? (
          <>
            {' '}
            <span className="text-accent">{highlight}</span>
          </>
        ) : null}
      </BlurIn>

      {description && (
        <Reveal delay={titleReveal.headingDelay}>
          <p
            className={cn(
              typography.body,
              'mt-6 max-w-2xl text-pretty font-medium',
              darkMode ? 'text-white/70' : 'text-black/65'
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
};
