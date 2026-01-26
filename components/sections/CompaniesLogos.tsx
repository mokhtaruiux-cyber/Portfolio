import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { SectionTitle } from '../motion/SectionTitle';
import { Reveal } from '../motion/Reveal';
import { cn } from '../../lib/utils';
import { typography } from '../../lib/typography';

export const CompaniesLogos: React.FC = () => {
  const { darkMode } = useTheme();
  const reduceMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const marqueeItems = useMemo(() => {
    const items = siteContent.socialProof.companies;
    return [...items, ...items, ...items];
  }, []);

  return (
    <Section>
      <SectionTitle
        eyebrow={siteContent.socialProof.eyebrow}
        title={siteContent.socialProof.title}
        highlight={siteContent.socialProof.highlight}
        align="left"
        delay={0}
        stackHighlight
        eyebrowClassName="text-accent/80"
      />
      <Reveal delay={0.1}>
        <div className="mt-10 relative overflow-x-hidden overflow-y-visible">
          <div className={cn(
            "pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r",
            darkMode ? "from-[#030303] to-transparent" : "from-[#fafafa] to-transparent"
          )} />
          <div className={cn(
            "pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l",
            darkMode ? "from-[#030303] to-transparent" : "from-[#fafafa] to-transparent"
          )} />
          <motion.div
            className="flex whitespace-nowrap gap-6 sm:gap-10 md:gap-12 items-center"
            animate={
              reduceMotion
                ? { x: 0 }
                : {
                  x: [0, '-33.33%'],
                }
            }
            transition={{
              duration: 45,
              repeat: reduceMotion ? 0 : Infinity,
              ease: 'linear',
            }}
            style={{ width: 'fit-content' }}
          >
            {marqueeItems.map((company, idx) => (
              <div
                key={`${company.name}-${idx}`}
                className="relative flex items-center justify-center py-4 sm:py-6"
              >
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9, x: '-50%' }}
                      animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                      exit={{ opacity: 0, y: 6, scale: 0.95, x: '-50%' }}
                      className={cn(
                        'absolute -top-10 left-1/2 z-30 px-4 py-2 rounded-[4px] glass border whitespace-nowrap shadow-2xl pointer-events-none',
                        darkMode ? 'bg-black/90 border-white/10' : 'bg-white/90 border-black/10'
                      )}
                    >
                      <span className={cn(typography.labelXs, darkMode ? 'text-white' : 'text-black')}>
                        {company.name}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={cn(
                    'w-20 h-20 sm:w-24 sm:h-24 rounded-[16px] border flex items-center justify-center transition-transform duration-300 hover:scale-105',
                    darkMode ? 'bg-black/40 border-white/10' : 'bg-white border-black/10'
                  )}
                >
                  <img
                    src={company.logoSrc}
                    alt={company.name}
                    className="w-full h-full object-contain p-2 opacity-95"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Reveal>
    </Section>
  );
};
