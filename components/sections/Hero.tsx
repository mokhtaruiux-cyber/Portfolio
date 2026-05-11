'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';
import { HeroGlow } from '../background/HeroGlow';
import { GlowButton } from '../ui/GlowButton';
import { reveal } from '../../lib/motion/presets';
import { sectionOrchestrator } from '../../lib/motion/variants';
import { motionTokens as t } from '../../lib/motion/tokens';

export const Hero = ({ onWorkClick }: { onWorkClick: () => void }) => {
  const { darkMode } = useTheme();
  const { cal } = siteContent;
  const shouldReduce = useReducedMotion();
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <motion.section
      variants={shouldReduce ? undefined : sectionOrchestrator}
      initial={shouldReduce ? undefined : 'hidden'}
      animate={shouldReduce ? undefined : 'visible'}
      className="relative pt-28 pb-14 md:pt-32 md:pb-16 overflow-hidden min-h-[70vh] sm:min-h-[75vh] flex flex-col justify-center"
    >
      <HeroGlow darkMode={darkMode} />
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 h-24 sm:h-32 pointer-events-none',
          darkMode ? 'bg-gradient-to-b from-transparent to-[#030303]' : 'bg-gradient-to-b from-transparent to-[#fafafa]'
        )}
      />
      <motion.div
        variants={shouldReduce ? undefined : sectionOrchestrator}
        initial={shouldReduce ? undefined : 'hidden'}
        animate={shouldReduce ? undefined : isReady ? 'visible' : 'hidden'}
        className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-10 text-center relative z-10 flex flex-col items-center gap-0"
      >
        <motion.h1
          {...reveal.heading}
          className={cn(
            typography.h1,
            'font-black max-w-[18ch] block mx-auto !text-center text-balance relative z-10 w-full mt-10 sm:mt-8',
            darkMode ? 'text-white' : 'text-black'
          )}
        >
          {siteContent.hero.title}
        </motion.h1>

        <motion.p
          {...reveal.body}
          className={cn(
            'max-w-2xl font-medium mx-auto !text-center mt-5 sm:mt-4',
            typography.body,
            darkMode ? 'text-gray-300' : 'text-gray-600'
          )}
        >
          {siteContent.hero.description}
        </motion.p>

        <motion.div
          {...reveal.cardGrid}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mx-auto relative z-10 mt-10 sm:mt-8"
        >
          <motion.div {...reveal.card}>
            <GlowButton
              size="cta"
              calLink={cal.link}
              calNamespace={cal.namespace}
              calConfig={cal.configJson}
            >
              {siteContent.hero.ctaPrimary} <ArrowUpRight size={20} />
            </GlowButton>
          </motion.div>
          <motion.div {...reveal.card}>
            <GlowButton onClick={onWorkClick} size="cta" glow={false}>
              {siteContent.hero.ctaSecondary}
            </GlowButton>
          </motion.div>
        </motion.div>

        <motion.div
          {...reveal.cardGrid}
          className="flex flex-wrap items-center justify-center gap-3 mt-8 sm:mt-6"
        >
          {siteContent.hero.badgeItems.map((item) => (
            <motion.span
              key={item}
              {...reveal.card}
              className={cn(
                typography.labelXs,
                'px-3 py-1 rounded-mini border border-accent/20 bg-accent/5 text-accent'
              )}
            >
              {item}
            </motion.span>
          ))}
        </motion.div>

        {/* Hero image is visually first but animates last in the parent sequence. */}
        <motion.div
          className="relative z-0 mt-10 sm:mt-8 order-first"
          variants={{
            hidden: { opacity: 0, scale: 0.97, y: t.distance.base },
            visible: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: t.duration.slow, ease: t.ease.expo, delay: t.stagger.text },
            },
          }}
        >
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72">
            <img
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
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
