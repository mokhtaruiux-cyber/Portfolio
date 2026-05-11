'use client';

import React from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';
import { typography } from '../../lib/typography';
import { reveal } from '../../lib/motion/presets';
import { sectionOrchestrator } from '../../lib/motion/variants';
import { motionTokens as t } from '../../lib/motion/tokens';

export const HowIHelpSection: React.FC = () => {
  const { darkMode } = useTheme();
  const reduceMotion = useReducedMotion();
  const { cal } = siteContent;
  const { howIHelp } = siteContent;
  const isCalCta = howIHelp.ctaHref === siteContent.bookingUrl;
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: t.threshold });

  return (
    <motion.section
      ref={sectionRef}
      id="help"
      variants={reduceMotion ? undefined : sectionOrchestrator}
      initial={reduceMotion ? undefined : 'hidden'}
      animate={reduceMotion ? undefined : isInView ? 'visible' : 'hidden'}
      className="py-20 md:py-24 relative z-10 scroll-mt-28 sm:scroll-mt-32 mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-10"
    >
          <motion.p
            {...reveal.body}
            className={cn(typography.labelXs, 'text-accent tracking-widest mb-2')}
          >
            {howIHelp.eyebrow}
          </motion.p>

          <motion.h2
            {...reveal.heading}
            className={cn('font-black tracking-tighter text-4xl sm:text-5xl mb-4', darkMode ? 'text-white' : 'text-black')}
          >
            {howIHelp.titleLines[0] ?? ''}
            {howIHelp.titleLines[1] && (
              <>
                <br />
                <span className="text-accent">{howIHelp.titleLines[1]}</span>
              </>
            )}
          </motion.h2>

          <motion.p
            {...reveal.body}
            className={cn(typography.body, 'max-w-[60ch] font-medium mb-12', darkMode ? 'text-gray-300' : 'text-gray-600')}
          >
            {howIHelp.subtitle}
          </motion.p>

          <motion.div
            {...reveal.cardGrid}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {howIHelp.cards.map((card) => (
              <motion.div
                key={card.id}
                {...reveal.card}
                className={cn(
                  'rounded-surface glass border p-6 sm:p-8 transition-colors duration-500',
                  darkMode ? 'bg-black/40 border-white/10' : 'bg-white/70 border-black/5'
                )}
              >
                <h3
                  className={cn(typography.h3Display, 'font-black mb-4', darkMode ? 'text-white' : 'text-black')}
                  aria-label={card.titleLines.join(' ')}
                >
                  {card.titleLines.map((line, index) => (
                    <React.Fragment key={line}>
                      {index > 0 && <br />}
                      {line}
                    </React.Fragment>
                  ))}
                </h3>
                <ul className={cn(typography.body, 'font-medium space-y-2', darkMode ? 'text-gray-300' : 'text-gray-600')}>
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <span className={cn(typography.labelXs, 'tracking-[0.3em] text-accent block mb-2')}>
                    {howIHelp.outcomeLabel}
                  </span>
                  <p className={cn(typography.body, 'font-medium', darkMode ? 'text-gray-200' : 'text-gray-700')}>
                    {card.outcome}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...reveal.cta} className="mt-8">
            {isCalCta ? (
              <button
                type="button"
                data-cal-link={cal.link}
                data-cal-namespace={cal.namespace}
                data-cal-config={cal.configJson}
                className={cn(
                  'inline-flex items-center gap-2 text-accent hover:text-accent/90 transition-colors font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 rounded-control px-1',
                  typography.body
                )}
              >
                {howIHelp.ctaLabel} <ArrowUpRight size={18} />
              </button>
            ) : (
              <a
                href={howIHelp.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center gap-2 text-accent hover:text-accent/90 transition-colors font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 rounded-control px-1',
                  typography.body
                )}
              >
                {howIHelp.ctaLabel} <ArrowUpRight size={18} />
              </a>
            )}
          </motion.div>
    </motion.section>
  );
};
