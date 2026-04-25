import React from 'react';
import { motion } from 'motion/react';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { SectionTitle } from '../motion/SectionTitle';
import { Reveal } from '../motion/Reveal';
import { sectionPacing, stagger, viewportDefaults } from '../../lib/motionTokens';
import { cn } from '../../lib/utils';
import { typography } from '../../lib/typography';

const listVariants = {
  initial: {},
  animate: {
    transition: {
      ...stagger.container(0.03, 0.045).animate.transition,
    },
  },
};

const rowVariants = {
  ...stagger.item,
};

export const ExperienceSection: React.FC = () => {
  const { darkMode } = useTheme();
  const pacing = sectionPacing.support;
  return (
    <Section id="experience" eyebrow={siteContent.experience.eyebrow} motion="fade">
      <div className="text-left mb-10">
        <SectionTitle
          title={siteContent.experience.title}
          highlight={siteContent.experience.highlight}
          delay={pacing.title}
          stackHighlight
          className={cn('mb-6', darkMode ? 'text-white' : 'text-black')}
        />
        <Reveal delay={pacing.body}>
          <p className={cn(typography.body, "font-medium max-w-[60ch]", typography.textSubtle, darkMode ? 'text-gray-300' : 'text-gray-600')}>
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
              idx === siteContent.experience.items.length - 1 ? 'border-b-0' : 'border-b',
              darkMode ? 'border-white/10' : 'border-black/10'
            )}
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
