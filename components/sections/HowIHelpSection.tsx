'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { AnimatedSection } from '../motion/AnimatedSection';
import { BlurIn } from '../motion/BlurIn';
import { cn } from '../../lib/utils';
import { typography } from '../../lib/typography';
import { cardReveal, titleReveal } from '../../lib/motion/motionPresets';
import {
  fadeUp,
  scaleIn,
  staggerContainer,
} from '../../lib/motion/variants';

export const HowIHelpSection: React.FC = () => {
  const { darkMode } = useTheme();
  const { cal } = siteContent;
  const { howIHelp } = siteContent;
  const isCalCta = howIHelp.ctaHref === siteContent.bookingUrl;

  return (
    <Section id="help" eyebrow={howIHelp.eyebrow} reveal={false}>
      {/*
        Flat animated children:
        [eyebrow] [title] [subtitle] [cards grid] [CTA]
        Each child rises 60px independently, 120ms apart.
      */}
      <AnimatedSection amount={0.1}>

        {/* 1 — Eyebrow */}
        <motion.p
          variants={fadeUp}
          className={cn(typography.labelXs, 'text-accent tracking-widest mb-2')}
        >
          {howIHelp.eyebrow}
        </motion.p>

        {/* 2 — Title */}
        <motion.div variants={fadeUp} className="mb-4">
          <BlurIn
            as="h2"
            delay={titleReveal.headingDelay}
            className={cn('font-black tracking-tighter text-4xl sm:text-5xl', darkMode ? 'text-white' : 'text-black')}
          >
            {howIHelp.titleLines[0] ?? ''}
            {howIHelp.titleLines[1] && (
              <>
                <br />
                <span className="text-accent">{howIHelp.titleLines[1]}</span>
              </>
            )}
          </BlurIn>
        </motion.div>

        {/* 3 — Subtitle / body */}
        <motion.p
          variants={fadeUp}
          className={cn(typography.body, 'max-w-[60ch] font-medium mb-12', darkMode ? 'text-gray-300' : 'text-gray-600')}
        >
          {howIHelp.subtitle}
        </motion.p>

        {/* 4 — Service cards: staggerContainer → scaleIn per card */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={cardReveal.viewport}
        >
          {howIHelp.cards.map((card) => (
            <motion.div
              key={card.id}
              variants={scaleIn}
              className={cn(
                'rounded-surface glass border p-6 sm:p-8 transition-colors duration-500',
                darkMode ? 'bg-black/40 border-white/10' : 'bg-white/70 border-black/5'
              )}
            >
              <BlurIn
                as="h3"
                className={cn(typography.h3Display, 'font-black mb-4', darkMode ? 'text-white' : 'text-black')}
                aria-label={card.titleLines.join(' ')}
                delay={titleReveal.headingDelay}
              >
                {card.titleLines.map((line, index) => (
                  <React.Fragment key={line}>
                    {index > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))}
              </BlurIn>
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

        {/* 5 — CTA link: last in cascade */}
        <motion.div variants={fadeUp} className="mt-8">
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
      </AnimatedSection>
    </Section>
  );
};
