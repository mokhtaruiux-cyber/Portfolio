'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { AnimatedSection } from '../motion/AnimatedSection';
import { BlurIn } from '../motion/BlurIn';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';
import { GlowButton } from '../ui/GlowButton';
import { titleReveal } from '../../lib/motion/motionPresets';
import { fadeUp, scaleIn } from '../../lib/motion/variants';

export const CTASection = () => {
  const { darkMode } = useTheme();
  const { cal } = siteContent;
  const ctaTitleLine = siteContent.finalCta.titleLines?.[0] ?? siteContent.finalCta.title;
  const ctaHighlightLine = siteContent.finalCta.titleLines?.[1];

  return (
    <Section reveal={false}>
      {/*
        The CTA card itself fades up as one block (scaleIn),
        then its inner content (badge → title → body → buttons)
        cascades inside via a nested AnimatedSection.
      */}
      <AnimatedSection amount={0.15}>
        {/* Outer card wrapper — scaleIn makes the whole card rise up */}
        <motion.div
          variants={scaleIn}
          className={cn(
            'relative overflow-hidden rounded-surface glass border p-8 sm:p-12 md:p-16',
            darkMode ? 'bg-black/40 border-white/10' : 'bg-white/60 border-black/5'
          )}
        >
          <div className="flex flex-col items-start text-left gap-6">
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-mini border border-accent/20 bg-accent/5"
            >
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className={cn(typography.labelXs, 'text-accent')}>{siteContent.finalCta.badge}</span>
            </motion.div>

            {/* Title */}
            <motion.div variants={fadeUp}>
              <BlurIn
                as="h2"
                delay={titleReveal.headingDelay}
                className={cn('font-black tracking-tighter text-4xl sm:text-5xl', darkMode ? 'text-white' : 'text-black')}
              >
                {ctaTitleLine}
                {ctaHighlightLine && (
                  <>
                    <br />
                    <span className="text-accent">{ctaHighlightLine}</span>
                  </>
                )}
              </BlurIn>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className={cn(typography.body, 'max-w-[60ch] font-medium', darkMode ? 'text-gray-300' : 'text-gray-600')}
            >
              {siteContent.finalCta.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
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
          </div>
        </motion.div>
      </AnimatedSection>
    </Section>
  );
};
