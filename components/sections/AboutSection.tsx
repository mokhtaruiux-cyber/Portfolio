import React from 'react';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { SectionTitle } from '../motion/SectionTitle';
import { Reveal } from '../motion/Reveal';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';
import { sectionPacing } from '../../lib/motionTokens';

export const AboutSection: React.FC = () => {
  const { darkMode } = useTheme();
  const pacing = sectionPacing.feature;
  return (
    <Section id="about" eyebrow={siteContent.about.eyebrow}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
        <div className="text-left space-y-6">
          <SectionTitle
            title={siteContent.about.title}
            highlight={siteContent.about.highlight}
            delay={pacing.title}
            stackHighlight
            className={cn('mb-6', darkMode ? 'text-white' : 'text-black')}
          />
          <Reveal delay={pacing.body}>
            <p className={cn(typography.h3, "font-semibold", darkMode ? "text-white" : "text-black")}>
              {siteContent.about.subtitle}
            </p>
          </Reveal>
          <Reveal delay={pacing.content}>
            <p className={cn(typography.body, "font-medium max-w-[60ch]", typography.textSubtle, darkMode ? "text-gray-300" : "text-gray-600")}>
              {siteContent.about.description}
            </p>
          </Reveal>
        </div>
        <Reveal delay={pacing.content + 0.04}>
          <div className="grid grid-cols-1 gap-4">
          {siteContent.about.highlights.map((item) => (
            <div
              key={item}
              className={cn(
                "p-6 sm:p-8 rounded-surface glass border",
                darkMode ? "bg-black/40 border-white/10" : "bg-white/60 border-black/5"
              )}
            >
              <span className={cn(typography.body, "font-medium", darkMode ? "text-white" : "text-black")}>{item}</span>
            </div>
          ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
};
