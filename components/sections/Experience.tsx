'use client';

import React from 'react';
import { motion } from 'motion/react';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { AnimatedSection } from '../motion/AnimatedSection';
import { BlurIn } from '../motion/BlurIn';
import { sectionPacing } from '../../lib/motionTokens';
import { cardReveal } from '../../lib/motion/motionPresets';
import { cn } from '../../lib/utils';
import { typography } from '../../lib/typography';
import {
  fadeUp,
  scaleIn,
  staggerContainer,
} from '../../lib/motion/variants';

export const ExperienceSection: React.FC = () => {
  const { darkMode } = useTheme();
  const pacing = sectionPacing.support;

  return (
    <Section id="experience" eyebrow={siteContent.experience.eyebrow} reveal={false}>
      {/*
        Flat structure: [eyebrow] [title] [body] [rows stagger]
        Each element rises individually — no bulk blocks.
      */}
      <AnimatedSection amount={0.1}>

        {/* 1 — Eyebrow */}
        <motion.p
          variants={fadeUp}
          className={cn(typography.labelXs, 'text-accent tracking-widest mb-2')}
        >
          {siteContent.experience.eyebrow}
        </motion.p>

        {/* 2 — Title */}
        <motion.div variants={fadeUp} className="mb-4">
          <BlurIn
            as="h2"
            delay={pacing.title}
            className={cn('font-black tracking-tighter text-4xl sm:text-5xl', darkMode ? 'text-white' : 'text-black')}
          >
            {siteContent.experience.title}
            {siteContent.experience.highlight && (
              <>
                {' '}
                <span className="text-accent">{siteContent.experience.highlight}</span>
              </>
            )}
          </BlurIn>
        </motion.div>

        {/* 3 — Intro body */}
        <motion.p
          variants={fadeUp}
          className={cn(typography.body, 'font-medium max-w-[60ch] mb-12', darkMode ? 'text-gray-300' : 'text-gray-600')}
        >
          {siteContent.experience.intro}
        </motion.p>

        {/* 4 — Experience rows: stagger each row individually */}
        <motion.div
          className="divide-y"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={cardReveal.viewport}
        >
          {siteContent.experience.items.map((item, idx) => (
            <motion.div
              key={item.id}
              variants={scaleIn}
              className={cn(
                'py-8 sm:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4',
                idx === siteContent.experience.items.length - 1 ? 'border-b-0' : 'border-b',
                darkMode ? 'border-white/10' : 'border-black/10'
              )}
            >
              <div className={cn(typography.h3Display, 'font-black', darkMode ? 'text-white' : 'text-black')}>
                {item.role}
              </div>
              <div className={cn('flex flex-col md:text-right', darkMode ? 'text-white/80' : 'text-black/70')}>
                <span className={cn(typography.body, 'font-semibold')}>{item.company}</span>
                <span className={cn(typography.labelXs, 'tracking-[0.2em] opacity-70')}>{item.period}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatedSection>
    </Section>
  );
};
