import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { AnimatedSection } from '../motion/AnimatedSection';
import { Reveal } from '../motion/Reveal';
import { TitleReveal } from '../motion/TitleReveal';
import { cn } from '../../lib/utils';
import { typography } from '../../lib/typography';
import { fadeUp } from '../../lib/motion/variants';

const marqueeStyle: React.CSSProperties = { width: 'fit-content' };

export const CompaniesLogos: React.FC = () => {
  const { darkMode } = useTheme();
  const reduceMotion = useReducedMotion();
  const [tooltip, setTooltip] = useState<{ label: string; left: number; top: number } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const isInView = useInView(containerRef, { amount: 0.2 });
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [activeTooltipIndex, setActiveTooltipIndex] = useState<number | null>(null);
  const baseCount = siteContent.socialProof.companies.length;
  const tooltipId = activeTooltipIndex !== null ? `company-tooltip-${activeTooltipIndex}` : undefined;

  // Track if on mobile for lighter marquee
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fewer duplicates on mobile = fewer DOM nodes = better performance
  const marqueeItems = useMemo(() => {
    const items = siteContent.socialProof.companies;
    return isMobile ? [...items, ...items] : [...items, ...items, ...items];
  }, [isMobile]);
  const marqueeTranslate = isMobile ? '-50%' : '-33.33%';

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden);
    };
    handleVisibilityChange();
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const shouldAnimate = !reduceMotion && isInView && isPageVisible;

  const showTooltip = (index: number, label: string) => {
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
    setActiveTooltipIndex(index);
  };

  const handleMouseEnter = (index: number, label: string) => {
    showTooltip(index, label);
  };

  const handleMouseLeave = () => {
    setTooltip(null);
    setActiveTooltipIndex(null);
  };

  const handleTouchToggle = (index: number, label: string) => {
    if (activeTooltipIndex === index) {
      setTooltip(null);
      setActiveTooltipIndex(null);
      setIsHovering(false);
      return;
    }
    showTooltip(index, label);
    setIsHovering(true);
  };

  return (
    <Section reveal={false}>
      <AnimatedSection amount={0.12}>
        {/* 1 — Eyebrow */}
        <motion.p
          variants={fadeUp}
          className={cn(typography.labelXs, 'text-accent/80 mb-2 block tracking-widest')}
        >
          {siteContent.socialProof.eyebrow}
        </motion.p>

        {/* 2 — Title */}
        <TitleReveal
          as="h2"
          wrapperClassName="mb-8"
          className={cn('font-black tracking-tighter text-4xl sm:text-5xl', 'text-current')}
        >
          {siteContent.socialProof.title}
          {siteContent.socialProof.highlight && (
            <>
              {' '}
              <span className="text-accent">{siteContent.socialProof.highlight}</span>
            </>
          )}
        </TitleReveal>

        {/* 3 — Marquee logos */}
        <Reveal preset="media">
        <div ref={containerRef} className="mt-10 relative">
          <div
            className="relative overflow-x-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
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
              style={{
                ...marqueeStyle,
                animationName: shouldAnimate ? 'company-marquee' : 'none',
                animationDuration: '58s',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationPlayState: isHovering ? 'paused' : 'running',
                willChange: shouldAnimate ? 'transform' : 'auto',
                ['--marquee-translate' as string]: marqueeTranslate,
              }}
            >
              {marqueeItems.map((company, idx) => {
                const isDuplicate = idx >= baseCount;
                return (
                  <button
                    key={`${company.name}-${idx}`}
                    ref={(el) => { itemRefs.current[idx] = el; }}
                    type="button"
                    className="relative flex items-center justify-center py-4 sm:py-6 px-0 bg-transparent border-0"
                    onMouseEnter={() => handleMouseEnter(idx, company.name)}
                    onMouseLeave={handleMouseLeave}
                    onFocus={() => handleMouseEnter(idx, company.name)}
                    onBlur={handleMouseLeave}
                    onPointerDown={(event) => {
                      if (event.pointerType !== 'touch') return;
                      handleTouchToggle(idx, company.name);
                    }}
                    aria-describedby={!isDuplicate ? `company-tooltip-${idx}` : undefined}
                    aria-hidden={isDuplicate ? true : undefined}
                    tabIndex={isDuplicate ? -1 : 0}
                  >
                    <div
                      className={cn(
                        'w-20 h-20 sm:w-24 sm:h-24 rounded-panel border flex items-center justify-center',
                        darkMode ? 'bg-black/40 border-white/10' : 'bg-white border-black/5'
                      )}
                    >
                      <img
                        src={company.logoSrc}
                        alt={company.name}
                        className="w-full h-full object-contain p-2 opacity-95"
                      />
                    </div>
                  </button>
                );
              })}
            </motion.div>
          </div>
          <AnimatePresence>
            {tooltip && (
              <motion.div
                key={tooltip.label}
                id={tooltipId}
                role="tooltip"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={cn(
                  'absolute z-30 -translate-x-1/2 -translate-y-full pointer-events-none px-3 py-1 rounded-mini glass border whitespace-nowrap shadow-2xl',
                  darkMode ? 'bg-black/90 border-white/10' : 'bg-white/90 border-black/5'
                )}
                style={{
                  left: tooltip.left,
                  top: tooltip.top,
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                }}
              >
                <span className={cn(typography.labelXs, darkMode ? 'text-white' : 'text-black')}>
                  {tooltip.label}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </Reveal>
      </AnimatedSection>
    </Section>
  );
};
