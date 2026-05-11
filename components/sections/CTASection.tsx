'use client';

import React from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';
import { GlowButton } from '../ui/GlowButton';
import { reveal } from '../../lib/motion/presets';
import { sectionOrchestrator } from '../../lib/motion/variants';
import { motionTokens as t } from '../../lib/motion/tokens';
import { TitleReveal } from '../motion/TitleReveal';

export const CTASection = () => {
  const { darkMode } = useTheme();
  const reduceMotion = useReducedMotion();
  const { cal } = siteContent;
  const ctaTitleLine = siteContent.finalCta.titleLines?.[0] ?? siteContent.finalCta.title;
  const ctaHighlightLine = siteContent.finalCta.titleLines?.[1];
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const isInView = useInView(cardRef, { once: true, amount: t.threshold });

  return (
    <section
      className="py-20 md:py-24 relative z-10 scroll-mt-28 sm:scroll-mt-32"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-10">
        <motion.div
          ref={cardRef}
          variants={reduceMotion ? undefined : sectionOrchestrator}
          initial={reduceMotion ? undefined : 'hidden'}
          animate={reduceMotion ? undefined : isInView ? 'visible' : 'hidden'}
          className={cn(
            'relative overflow-hidden rounded-surface glass border p-8 sm:p-12 md:p-16 flex flex-col items-start text-left gap-6',
            darkMode ? 'bg-black/40 border-white/10' : 'bg-white/60 border-black/5'
          )}
        >
            <motion.div
              {...reveal.body}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-mini border border-accent/20 bg-accent/5"
            >
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className={cn(typography.labelXs, 'text-accent')}>{siteContent.finalCta.badge}</span>
            </motion.div>

            <TitleReveal
              as="h2"
              className={cn('font-black tracking-tighter text-4xl sm:text-5xl', darkMode ? 'text-white' : 'text-black')}
            >
              {ctaTitleLine}
              {ctaHighlightLine && (
                <>
                  {' '}
                  <span className="text-accent">{ctaHighlightLine}</span>
                </>
              )}
            </TitleReveal>

            <motion.p
              {...reveal.body}
              className={cn(typography.body, 'max-w-[60ch] font-medium', darkMode ? 'text-gray-300' : 'text-gray-600')}
            >
              {siteContent.finalCta.description}
            </motion.p>

            <motion.div {...reveal.cta} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <GlowButton
                size="cta"
                calLink={cal.link}
                calNamespace={cal.namespace}
                calConfig={cal.configJson}
              >
                {siteContent.finalCta.primaryLabel} <ArrowUpRight size={20} />
              </GlowButton>
              <a
                href={siteContent.finalCta.secondaryHref}
                className={cn(
                  'text-accent hover:text-accent/90 transition-colors font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 rounded-control px-1',
                  typography.body
                )}
              >
                {siteContent.finalCta.secondaryLabel}
              </a>
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
