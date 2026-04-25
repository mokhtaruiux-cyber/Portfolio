import React, { useEffect } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { easing, heroReveal, masterTitleReveal } from '../../lib/motionTokens';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';
import { HeroGlow } from '../background/HeroGlow';
import { Container } from '../layout/Container';
import { GlowButton } from '../ui/GlowButton';
import { BlurIn } from '../motion/BlurIn';

export const Hero = ({ onWorkClick }: { onWorkClick: () => void }) => {
  const { darkMode } = useTheme();
  const { cal } = siteContent;
  const reduceMotion = useReducedMotion() ?? false;
  const heroControls = useAnimationControls();

  useEffect(() => {
    if (reduceMotion) {
      heroControls.set('visible');
      return;
    }

    heroControls.set('hidden');
    const timer = window.setTimeout(() => {
      void heroControls.start('visible');
    }, heroReveal.startDelayMs);

    return () => window.clearTimeout(timer);
  }, [heroControls, reduceMotion]);

  return (
    <section className="relative pt-28 pb-14 md:pt-32 md:pb-16 overflow-hidden min-h-[70vh] sm:min-h-[75vh] flex flex-col justify-center">
      <HeroGlow darkMode={darkMode} />
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 h-24 sm:h-32 pointer-events-none',
          darkMode ? 'bg-gradient-to-b from-transparent to-[#030303]' : 'bg-gradient-to-b from-transparent to-[#fafafa]'
        )}
      />
      <Container className="text-center relative z-10">
        <motion.div
          className="flex flex-col items-center gap-0"
        >
            <motion.div
              className="relative z-0 mt-10 sm:mt-8"
              initial={false}
              animate={heroControls}
              variants={{
                hidden: {
                  opacity: 0,
                  y: heroReveal.image.distance,
                  rotateX: heroReveal.image.rotateX,
                  filter: `blur(${heroReveal.image.blur}px)`,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  filter: 'blur(0px)',
                  transition: { delay: heroReveal.image.delay, duration: heroReveal.image.duration, ease: easing.reveal },
                },
              }}
            >
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72">
                <motion.img
                  initial={false}
                  animate={reduceMotion ? { scale: 1 } : { scale: [1, heroReveal.image.pulseScale, 1] }}
                  transition={reduceMotion ? { duration: 0 } : { duration: heroReveal.image.pulseDuration, repeat: Infinity, ease: easing.ambient }}
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

            <div className="flex flex-col items-center w-full mt-10 sm:mt-8 gap-5 sm:gap-4">
              <motion.div className="relative z-10 w-full">
                <BlurIn
                  as="h1"
                  aria-label={siteContent.hero.title}
                  delay={masterTitleReveal.headingDelay}
                  contentClassName="justify-center"
                  className={cn(typography.h1, 'font-black max-w-[18ch] block mx-auto !text-center text-balance', darkMode ? 'text-white' : 'text-black')}
                >
                  {siteContent.hero.title}
                </BlurIn>
              </motion.div>

              <motion.div
                initial={false}
                animate={heroControls}
                variants={{
                  hidden: { opacity: 0, y: heroReveal.body.distance },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: heroReveal.body.delay, duration: heroReveal.body.duration, ease: easing.reveal },
                  },
                }}
                className="w-full"
              >
                <p
                  className={cn('max-w-2xl font-medium mx-auto !text-center', typography.body, darkMode ? 'text-gray-300' : 'text-gray-600')}
                >
                  {siteContent.hero.description}
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={false}
              animate={heroControls}
              variants={{
                hidden: { opacity: 0, y: heroReveal.actions.distance },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: heroReveal.actions.delay, duration: heroReveal.actions.duration, ease: easing.reveal },
                },
              }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mx-auto relative z-10 mt-10 sm:mt-8"
            >
              <GlowButton
                size="cta"
                calLink={cal.link}
                calNamespace={cal.namespace}
                calConfig={cal.configJson}
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
            <motion.div
              initial={false}
              animate={heroControls}
              variants={{
                hidden: { opacity: 0, y: heroReveal.badges.distance },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: heroReveal.badges.delay, duration: heroReveal.badges.duration, ease: easing.reveal },
                },
              }}
              className="flex flex-wrap items-center justify-center gap-3 mt-8 sm:mt-6"
            >
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
            </motion.div>
          </motion.div>
      </Container>
    </section>
  );
};
