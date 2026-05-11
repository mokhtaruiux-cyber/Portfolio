'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';
import { HeroGlow } from '../background/HeroGlow';
import { Container } from '../layout/Container';
import { GlowButton } from '../ui/GlowButton';
import { BlurIn } from '../motion/BlurIn';
import { titleReveal } from '../../lib/motion/motionPresets';
import {
  fadeUp,
  scaleIn,
  sectionContainer,
  staggerContainerTight,
  EXPO,
  DUR,
} from '../../lib/motion/variants';

export const Hero = ({ onWorkClick }: { onWorkClick: () => void }) => {
  const { darkMode } = useTheme();
  const { cal } = siteContent;
  const shouldReduce = useReducedMotion();

  return (
    <section
      className="relative pt-28 pb-14 md:pt-32 md:pb-16 overflow-hidden min-h-[70vh] sm:min-h-[75vh] flex flex-col justify-center"
    >
      <HeroGlow darkMode={darkMode} />
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 h-24 sm:h-32 pointer-events-none',
          darkMode ? 'bg-gradient-to-b from-transparent to-[#030303]' : 'bg-gradient-to-b from-transparent to-[#fafafa]'
        )}
      />
      <Container className="text-center relative z-10">
        {/*
          Hero fires on mount (not scroll) — animate="visible" prop.
          One sectionContainer parent cascades to all children via variant inheritance.
          staggerChildren: 0.15 → image → title → desc → CTAs → badges in sequence.
        */}
        <motion.div
          className="flex flex-col items-center gap-0"
          variants={sectionContainer}
          initial="hidden"
          animate={shouldReduce ? 'visible' : 'visible'}
        >
          {/* 1 — Hero image: scale + fade reveal with extra delay for premium entry */}
          <motion.div
            className="relative z-0 mt-10 sm:mt-8"
            variants={{
              hidden: { opacity: 0, scale: 0.94, y: 60 },
              visible: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { duration: DUR.slower, ease: EXPO, delay: 0 },
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

          {/* 2 — Title: BlurIn handles per-word animation internally */}
          <div className="flex flex-col items-center w-full mt-10 sm:mt-8 gap-5 sm:gap-4">
            <motion.div
              className="relative z-10 w-full"
              variants={fadeUp}
            >
              <BlurIn
                as="h1"
                aria-label={siteContent.hero.title}
                delay={titleReveal.headingDelay}
                contentClassName="justify-center"
                className={cn(
                  typography.h1,
                  'font-black max-w-[18ch] block mx-auto !text-center text-balance',
                  darkMode ? 'text-white' : 'text-black'
                )}
              >
                {siteContent.hero.title}
              </BlurIn>
            </motion.div>

            {/* 3 — Description body */}
            <motion.p
              variants={fadeUp}
              className={cn(
                'max-w-2xl font-medium mx-auto !text-center',
                typography.body,
                darkMode ? 'text-gray-300' : 'text-gray-600'
              )}
            >
              {siteContent.hero.description}
            </motion.p>
          </div>

          {/* 4 — CTA buttons: tight stagger between them */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mx-auto relative z-10 mt-10 sm:mt-8"
            variants={staggerContainerTight}
          >
            <motion.div variants={fadeUp}>
              <GlowButton
                size="cta"
                calLink={cal.link}
                calNamespace={cal.namespace}
                calConfig={cal.configJson}
              >
                {siteContent.hero.ctaPrimary} <ArrowUpRight size={20} />
              </GlowButton>
            </motion.div>
            <motion.div variants={fadeUp}>
              <GlowButton onClick={onWorkClick} size="cta" glow={false}>
                {siteContent.hero.ctaSecondary}
              </GlowButton>
            </motion.div>
          </motion.div>

          {/* 5 — Social proof badges: staggered last */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 mt-8 sm:mt-6"
            variants={staggerContainerTight}
          >
            {siteContent.hero.badgeItems.map((item) => (
              <motion.span
                key={item}
                variants={scaleIn}
                className={cn(
                  typography.labelXs,
                  'px-3 py-1 rounded-mini border border-accent/20 bg-accent/5 text-accent'
                )}
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
