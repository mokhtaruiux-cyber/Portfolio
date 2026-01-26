import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { transitions } from '../../lib/motionTokens';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';
import { Reveal } from '../motion/Reveal';
import { FadeInUp } from '../motion/FadeInUp';
import { HeroGlow } from '../background/HeroGlow';
import { TypingEffect } from '../motion/TypingEffect';
import { Container } from '../layout/Container';
import { GlowButton } from '../ui/GlowButton';

export const Hero = ({ onWorkClick }: { onWorkClick: () => void }) => {
  const { darkMode } = useTheme();
  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden min-h-[70vh] sm:min-h-[75vh] flex flex-col justify-center">
      <HeroGlow darkMode={darkMode} />
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 h-24 sm:h-32 pointer-events-none',
          darkMode ? 'bg-gradient-to-b from-transparent to-[#030303]' : 'bg-gradient-to-b from-transparent to-[#fafafa]'
        )}
      />
      <Container className="text-center relative z-10">
        <FadeInUp>
          <div className="flex flex-col items-center gap-0">
            <Reveal delay={0.3} className="relative z-0 mt-8">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72">
                <motion.img
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ ...transitions.smooth, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  src={darkMode ? siteContent.hero.image.darkSrc : siteContent.hero.image.lightSrc}
                  alt={siteContent.hero.imageAlt}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-contain relative z-10 select-none pointer-events-none"
                />
                <div
                  className={cn(
                    'absolute inset-0 blur-[100px] opacity-30 scale-125 -z-10 transition-all duration-1000',
                    darkMode ? 'bg-accent/40' : 'bg-accent/30'
                  )}
                />
              </div>
            </Reveal>

            <div className="flex flex-col items-center w-full mt-8 gap-4">
              <motion.div className="relative z-10 w-full">
                <h1 className={cn(typography.h1, 'font-black max-w-[18ch] block mx-auto !text-center', darkMode ? 'text-white' : 'text-black')}>
                  <TypingEffect as="span" text={siteContent.hero.title} />
                </h1>
              </motion.div>

              <Reveal delay={1.5} className="w-full">
                <div
                  className={cn('max-w-2xl font-medium mx-auto !text-center', typography.body, darkMode ? 'text-gray-300' : 'text-gray-600')}
                >
                  {siteContent.hero.description}
                </div>
              </Reveal>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mx-auto relative z-10 mt-8"
            >
              <GlowButton
                size="cta"
                href={siteContent.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {siteContent.hero.ctaPrimary} <ArrowUpRight size={20} />
              </GlowButton>
              <GlowButton
                onClick={onWorkClick}
                size="cta"
                glow={false}
              >
                {siteContent.hero.ctaSecondary}
              </GlowButton>
            </motion.div>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              {siteContent.hero.badgeItems.map((item) => (
                <span
                  key={item}
                  className={cn(
                    typography.labelXs,
                    'px-3 py-1 rounded-mini border border-accent/20 bg-accent/5 text-accent'
                  )}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
};
