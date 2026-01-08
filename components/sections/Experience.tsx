import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCES } from '../../constants';
import { Container } from '../layout/Container';
import { BlurIn } from '../motion/BlurIn';
import { FadeInUp } from '../motion/FadeInUp';
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

export const ExperienceSection: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  return (
    <section className="py-16 md:py-24 relative">
      <Container>
        <FadeInUp>
          <div className="text-left mb-16">
            <BlurIn as="h2" className={cn(typography.h2, "font-black max-w-[24ch]", darkMode ? 'text-white' : 'text-black')}>
              My <br /> <span className="text-blue-600">Experience.</span>
            </BlurIn>
          </div>
          <motion.div
            className="mt-10 divide-y"
            variants={listVariants}
            initial="initial"
            whileInView="animate"
            viewport={viewportDefaults}
          >
            {EXPERIENCES.map((item, idx) => (
              <motion.div
                key={item.id}
                variants={rowVariants}
                className={cn(
                  'py-8 sm:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4',
                  darkMode ? 'border-white/10' : 'border-black/10'
                )}
                style={{ borderBottomWidth: idx === EXPERIENCES.length - 1 ? 0 : 1 }}
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
        </FadeInUp>
      </Container>
    </section>
  );
};
