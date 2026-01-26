import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { BlurIn } from '../motion/BlurIn';
import { Reveal } from '../motion/Reveal';
import { durations, easing, viewportDefaults } from '../../lib/motionTokens';
import { cn } from '../../lib/utils';
import { typography } from '../../lib/typography';

const listVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const rowVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.fast, ease: easing.smooth },
  },
};

export const ExperienceSection: React.FC = () => {
  const { darkMode } = useTheme();
  return (
    <Section id="experience" eyebrow={siteContent.experience.eyebrow}>
      <div className="text-left mb-10">
        <BlurIn as="h2" className={cn(typography.h2, "font-black max-w-[24ch]", darkMode ? 'text-white' : 'text-black')}>
          {siteContent.experience.title} <br /> <span className="text-accent">{siteContent.experience.highlight}</span>
        </BlurIn>
        <Reveal delay={0.15}>
          <p className={cn(typography.body, "font-medium max-w-[60ch] mt-4", typography.textSubtle, darkMode ? 'text-gray-300' : 'text-gray-600')}>
            {siteContent.experience.intro}
          </p>
        </Reveal>
      </div>
      <motion.div
        className="divide-y"
        variants={listVariants}
        initial="initial"
        whileInView="animate"
        viewport={viewportDefaults}
      >
        {siteContent.experience.items.map((item, idx) => (
          <motion.div
            key={item.id}
            variants={rowVariants}
            className={cn(
              'py-8 sm:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4',
              darkMode ? 'border-white/10' : 'border-black/10'
            )}
            style={{ borderBottomWidth: idx === siteContent.experience.items.length - 1 ? 0 : 1 }}
          >
            <div className={cn(typography.h3Display, "font-black", darkMode ? 'text-white' : 'text-black')}>
              {item.role}
            </div>
            <div className={cn('flex flex-col md:text-right', darkMode ? 'text-white/80' : 'text-black/70')}>
              <span className={cn(typography.body, "font-semibold")}>{item.company}</span>
              <span className={cn(typography.labelXs, "tracking-[0.2em] opacity-70")}>{item.period}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};
