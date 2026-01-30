import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimation, useInView, useReducedMotion } from 'framer-motion';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { SectionTitle } from '../motion/SectionTitle';
import { Reveal } from '../motion/Reveal';
import { cn } from '../../lib/utils';
import { typography } from '../../lib/typography';

const marqueeStyle: React.CSSProperties = { width: 'fit-content' };

export const CompaniesLogos: React.FC = () => {
  const { darkMode } = useTheme();
  const reduceMotion = useReducedMotion();
  const [tooltip, setTooltip] = useState<{ label: string; left: number; top: number } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
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

  const handleMouseEnter = (index: number, label: string) => {
    const container = containerRef.current;
    const item = itemRefs.current[index];
    if (!container || !item) return;
    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    setTooltip({
      label,
      left: itemRect.left - containerRect.left + itemRect.width / 2,
      top: itemRect.top - containerRect.top,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

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
            className="relative flex whitespace-nowrap gap-6 sm:gap-10 md:gap-12 items-center"
            animate={marqueeControls}
            style={marqueeStyle}
          >
            <AnimatePresence>
              {tooltip && (
                <motion.div
                  key={tooltip.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    left: tooltip.left,
                    top: tooltip.top,
                  }}
                  className={cn(
                    'absolute z-30 -translate-x-1/2 -translate-y-full pointer-events-none px-3 py-1 rounded-mini glass border whitespace-nowrap shadow-2xl',
                    darkMode ? 'bg-black/90 border-white/10' : 'bg-white/90 border-black/10'
                  )}
                >
                  <span className={cn(typography.labelXs, darkMode ? 'text-white' : 'text-black')}>
                    {tooltip.label}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            {marqueeItems.map((company, idx) => (
              <div
                key={`${company.name}-${idx}`}
                ref={(el) => { itemRefs.current[idx] = el; }}
                className="relative flex items-center justify-center py-4 sm:py-6"
                onMouseEnter={() => handleMouseEnter(idx, company.name)}
                onMouseLeave={handleMouseLeave}
              >
                <div
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
