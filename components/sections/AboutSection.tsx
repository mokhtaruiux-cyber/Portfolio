'use client';

import React from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';
import { eyebrowChipClass } from '../../lib/chipStyles';
import { reveal } from '../../lib/motion/presets';
import { sectionOrchestrator } from '../../lib/motion/variants';
import { motionTokens as t } from '../../lib/motion/tokens';
import { TitleReveal } from '../motion/TitleReveal';

export const AboutSection: React.FC = () => {
  const { darkMode } = useTheme();
  const reduceMotion = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: t.threshold });

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      variants={reduceMotion ? undefined : sectionOrchestrator}
      initial={reduceMotion ? undefined : 'hidden'}
      animate={reduceMotion ? undefined : isInView ? 'visible' : 'hidden'}
      className="py-20 md:py-24 relative z-10 scroll-mt-28 sm:scroll-mt-32 mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-10"
    >
      <motion.p
        {...reveal.body}
        className={cn(typography.labelXs, eyebrowChipClass, 'mb-2')}
      >
        {siteContent.about.eyebrow}
      </motion.p>

      <motion.div
        {...reveal.cardGrid}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start"
      >
        <div className="text-left space-y-6">
          <TitleReveal
            as="h2"
            className={cn(
              'font-black max-w-[24ch] tracking-tighter text-4xl sm:text-5xl mb-6',
              darkMode ? 'text-white' : 'text-black'
            )}
          >
            {siteContent.about.title}
            {siteContent.about.highlight && (
              <>
                {' '}
                <span className="text-accent">{siteContent.about.highlight}</span>
              </>
            )}
          </TitleReveal>

          <motion.p
            {...reveal.body}
            className={cn(typography.h3, 'font-semibold', darkMode ? 'text-white' : 'text-black')}
          >
            {siteContent.about.subtitle}
          </motion.p>

          <motion.p
            {...reveal.body}
            className={cn(
              typography.body,
              'font-medium max-w-[60ch]',
              darkMode ? 'text-gray-300' : 'text-gray-600'
            )}
          >
            {siteContent.about.description}
          </motion.p>
        </div>

        <motion.div
          {...reveal.cardGrid}
          className="grid grid-cols-1 gap-4"
        >
          {siteContent.about.highlights.map((item) => (
            <motion.div
              key={item}
              {...reveal.card}
              className={cn(
                'p-6 sm:p-8 rounded-surface glass border',
                darkMode ? 'bg-black/40 border-white/10' : 'bg-white/60 border-black/5'
              )}
            >
              <span className={cn(typography.body, 'font-medium', darkMode ? 'text-white' : 'text-black')}>
                {item}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
