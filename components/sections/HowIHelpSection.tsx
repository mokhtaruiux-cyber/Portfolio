import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { BlurIn } from '../motion/BlurIn';
import { Reveal } from '../motion/Reveal';
import { cn } from '../../lib/utils';
import { typography } from '../../lib/typography';
import { stagger, viewportDefaults } from '../../lib/motionTokens';

export const HowIHelpSection: React.FC = () => {
  const { darkMode } = useTheme();
  const { howIHelp } = siteContent;
  const titleLabel = howIHelp.titleLines.join(' ');

  return (
    <Section id="help" eyebrow={howIHelp.eyebrow}>
      <div className="text-left mb-10">
        <BlurIn
          as="h2"
          aria-label={titleLabel}
          className={cn(typography.h2, "font-black max-w-[24ch]", darkMode ? "text-white" : "text-black")}
        >
          {howIHelp.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </BlurIn>
        <Reveal delay={0.2}>
          <p className={cn(typography.body, "max-w-[60ch] font-medium", typography.textSubtle, darkMode ? "text-gray-300" : "text-gray-600")}>
            {howIHelp.subtitle}
          </p>
        </Reveal>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        variants={stagger.container(0.1, 0.08)}
        initial="initial"
        whileInView="animate"
        viewport={viewportDefaults}
      >
        {howIHelp.cards.map((card) => (
          <motion.div
            key={card.id}
            variants={stagger.item}
            className={cn(
              "rounded-[16px] glass border p-6 sm:p-8 transition-colors duration-500",
              darkMode ? "bg-black/40 border-white/10" : "bg-white/70 border-black/5"
            )}
          >
            <h3
              className={cn(typography.h3Display, "font-black mb-4", darkMode ? "text-white" : "text-black")}
              aria-label={card.titleLines.join(' ')}
            >
              {card.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h3>
            <ul className={cn(typography.body, "font-medium space-y-2", typography.textSubtle, darkMode ? "text-gray-300" : "text-gray-600")}>
              {card.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <span className={cn(typography.labelXs, "tracking-[0.3em] text-blue-500 block mb-2")}>
                {howIHelp.outcomeLabel}
              </span>
              <p className={cn(typography.body, "font-medium", darkMode ? "text-gray-200" : "text-gray-700")}>
                {card.outcome}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-8">
        <a
          href={howIHelp.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 rounded-[4px] px-1",
            typography.body
          )}
        >
          {howIHelp.ctaLabel} <ArrowUpRight size={18} />
        </a>
      </div>
    </Section>
  );
};
