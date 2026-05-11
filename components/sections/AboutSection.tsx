'use client';

import React from 'react';
import { motion } from 'motion/react';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { AnimatedSection } from '../motion/AnimatedSection';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';
import { BlurIn } from '../motion/BlurIn';
import { Reveal } from '../motion/Reveal';
import { cardReveal, titleReveal } from '../../lib/motion/motionPresets';
import {
  fadeUp,
} from '../../lib/motion/variants';

export const AboutSection: React.FC = () => {
  const { darkMode } = useTheme();

  return (
    <Section id="about" eyebrow={siteContent.about.eyebrow} reveal={false}>
      {/*
        KEY: AnimatedSection is a flat list of motion children.
        Each child gets staggered +0.12s after the previous.
        Children: [eyebrow label] [title] [subtitle] [body] [cards grid]
        Each one slides up 60px individually — this is the getbitbang waterfall.
      */}
      <AnimatedSection amount={0.1}>

        {/* 1 — Eyebrow label */}
        <motion.p
          variants={fadeUp}
          className={cn(typography.labelXs, 'text-accent tracking-widest mb-2')}
        >
          {siteContent.about.eyebrow}
        </motion.p>

        {/* 2 — Title (BlurIn handles per-word animation internally) */}
        <motion.div variants={fadeUp} className="mb-6">
          <BlurIn
            as="h2"
            delay={titleReveal.headingDelay}
            className={cn(
              'font-black max-w-[24ch] tracking-tighter text-4xl sm:text-5xl',
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
          </BlurIn>
        </motion.div>

        {/* 3 — Subtitle */}
        <Reveal
          as="p"
          className={cn(typography.h3, 'font-semibold mb-4', darkMode ? 'text-white' : 'text-black')}
        >
          {siteContent.about.subtitle}
        </Reveal>

        {/* 4 — Body paragraph */}
        <Reveal
          as="p"
          className={cn(
            typography.body,
            'font-medium max-w-[60ch] mb-12',
            darkMode ? 'text-gray-300' : 'text-gray-600'
          )}
        >
          {siteContent.about.description}
        </Reveal>

        {/* 5 — Highlight cards: each card is its own stagger child */}
        <Reveal
          preset="card"
          staggerChildren
          className="grid grid-cols-1 lg:grid-cols-3 gap-4"
        >
          {siteContent.about.highlights.map((item) => (
            <motion.div
              key={item}
              variants={cardReveal.defaultVariants}
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
        </Reveal>
      </AnimatedSection>
    </Section>
  );
};
