import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { COMPANIES } from '../../data/companies';
import { Container } from '../layout/Container';
import { SectionTitle } from '../motion/SectionTitle';
import { cn } from '../../lib/utils';
import { typography } from '../../lib/typography';
import { FadeInUp } from '../motion/FadeInUp';

export const CompaniesLogos: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const reduceMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const marqueeItems = useMemo(() => [...COMPANIES, ...COMPANIES, ...COMPANIES], []);

  return (
    <section className="py-16 md:py-24 relative overflow-visible">
      <Container>
        <FadeInUp>
          <SectionTitle
            eyebrow="PARTNERSHIPS"
            title="Proud to have"
            highlight="worked with."
            align="left"
            delay={0}
            stackHighlight
            eyebrowClassName="text-blue-500/80"
          />
          <div
            className="mt-10 relative flex items-center overflow-visible"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
            }}
          >
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
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onFocus={() => setHoveredIndex(idx)}
                  onBlur={() => setHoveredIndex(null)}
                  tabIndex={0}
                  role="button"
                >
                  <AnimatePresence>
                    {hoveredIndex === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                        exit={{ opacity: 0, y: 6, scale: 0.95, x: '-50%' }}
                        className={cn(
                          'absolute -top-10 left-1/2 z-30 px-4 py-2 rounded-full glass border whitespace-nowrap shadow-2xl pointer-events-none',
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
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setHoveredIndex(hoveredIndex === idx ? null : idx);
                      }
                    }}
                    className={cn(
                      'w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border flex items-center justify-center transition-transform duration-300 hover:scale-105',
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
        </FadeInUp>
      </Container>
    </section>
  );
};
