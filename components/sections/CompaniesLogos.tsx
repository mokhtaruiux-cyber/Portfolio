import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimation, useInView, useReducedMotion } from 'framer-motion';
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const marqueeControls = useAnimation();
  const isInView = useInView(containerRef, { amount: 0.2 });
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Track if on mobile for lighter marquee
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fewer duplicates on mobile = fewer DOM nodes = better performance
  const marqueeItems = useMemo(() => {
    const items = siteContent.socialProof.companies;
    return isMobile ? [...items, ...items] : [...items, ...items, ...items];
  }, [isMobile]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden);
    };
    handleVisibilityChange();
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      marqueeControls.set({ x: 0 });
      return;
    }
    if (isInView && isPageVisible) {
      marqueeControls.start({
        x: [0, '-33.33%'],
        transition: {
          duration: 45,
          repeat: Infinity,
          ease: 'linear',
        },
      });
    } else {
      marqueeControls.stop();
    }
  }, [reduceMotion, isInView, isPageVisible, marqueeControls]);

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
        <div ref={containerRef} className="mt-10 relative overflow-x-hidden overflow-y-visible">
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
            animate={marqueeControls}
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
                        'absolute -top-10 left-1/2 z-30 px-3 py-1 rounded-mini glass border whitespace-nowrap shadow-2xl pointer-events-none',
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
                    'w-20 h-20 sm:w-24 sm:h-24 rounded-panel border flex items-center justify-center transition-transform duration-300 hover:scale-105',
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
