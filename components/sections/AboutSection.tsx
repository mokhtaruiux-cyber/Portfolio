import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { BlurIn } from '../motion/BlurIn';
import { Reveal } from '../motion/Reveal';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';
import { stagger, viewportDefaults } from '../../lib/motionTokens';

export const AboutSection: React.FC = () => {
  const { darkMode } = useTheme();
  return (
    <Section id="about" eyebrow={siteContent.about.eyebrow}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-start">
        <div className="text-left space-y-6">
          <BlurIn as="h2" className={cn(typography.h2, "font-black max-w-[24ch]", darkMode ? "text-white" : "text-black")}>
            {siteContent.about.title} <br /> <span className="text-accent">{siteContent.about.highlight}</span>
          </BlurIn>
          <Reveal delay={0.1}>
            <p className={cn(typography.h3, "font-semibold", darkMode ? "text-white" : "text-black")}>
              {siteContent.about.subtitle}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className={cn(typography.body, "font-medium max-w-[60ch]", typography.textSubtle, darkMode ? "text-gray-300" : "text-gray-600")}>
              {siteContent.about.description}
            </p>
          </Reveal>
        </div>
        <motion.div
          className="grid grid-cols-1 gap-4"
          variants={stagger.container(0.1, 0.08)}
          initial="initial"
          whileInView="animate"
          viewport={viewportDefaults}
        >
          {siteContent.about.highlights.map((item) => (
            <motion.div
              key={item}
              variants={stagger.item}
              className={cn(
                "p-6 sm:p-8 rounded-[16px] glass border",
                darkMode ? "bg-black/40 border-white/5" : "bg-white/60 border-black/5"
              )}
            >
              <span className={cn(typography.body, "font-medium", darkMode ? "text-white" : "text-black")}>{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};
