import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Testimonial } from '../../types';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';
import { reveal } from '../../lib/motion/presets';
import { sectionOrchestrator } from '../../lib/motion/variants';
import { motionTokens as t } from '../../lib/motion/tokens';
import { TitleReveal } from '../motion/TitleReveal';

interface TestimonialCardProps {
  testimonial: Testimonial;
  darkMode: boolean;
  ariaHidden?: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, darkMode, ariaHidden }) => (
  <motion.div
    {...reveal.card}
    className={cn(
      'w-[300px] sm:w-[450px] flex-shrink-0 p-8 sm:p-12 rounded-surface glass border flex flex-col justify-between transform-gpu [backface-visibility:hidden]',
      darkMode
        ? 'bg-white/5 border-white/10 shadow-[0_20px_60px_-50px_rgba(0,0,0,0.4)]'
        : 'bg-white/40 border-black/5 shadow-[0_20px_60px_-50px_rgba(0,0,0,0.18)]'
    )}
    aria-hidden={ariaHidden ? true : undefined}
  >
    <p className={cn(typography.body, 'font-medium italic mb-12 text-left', darkMode ? 'text-gray-200' : 'text-gray-800')}>
      &quot;{testimonial.content}&quot;
    </p>
    <div className="flex items-center gap-5 text-left">
      <div className="relative">
        <div
          className={cn(
            "w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-accent/30",
            testimonial.id === '1' ? "scale-[1.04]" : ""
          )}
        >
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className={cn(
              "w-full h-full object-cover object-center",
              testimonial.id === '1'
                ? "scale-[1.08]"
                : ""
            )}
          />
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center border-2 border-black">
          <Zap size={10} className="text-white fill-current" />
        </div>
      </div>
      <div className="overflow-hidden">
        <h5 className={cn(typography.h3, 'font-black truncate', darkMode ? 'text-white' : 'text-black')}>{testimonial.name}</h5>
        <span className={cn(typography.labelXs, typography.textMuted, 'tracking-[0.2em] truncate')}>{testimonial.role} • {testimonial.company}</span>
      </div>
    </div>
  </motion.div>
);

const TestimonialMarqueeRow = ({
  items,
  direction,
  darkMode,
  shouldAnimate,
  isMobile,
  phaseOffset,
  rowDuration = 56,
}: {
  items: Testimonial[];
  direction: 'left' | 'right';
  darkMode: boolean;
  shouldAnimate: boolean;
  isMobile: boolean;
  phaseOffset?: number;
  rowDuration?: number;
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const rowPhaseOffset = phaseOffset ?? 0;
  const baseCount = items.length;
  const marqueeItems = useMemo(() => {
    return isMobile ? [...items, ...items] : [...items, ...items, ...items];
  }, [isMobile, items]);
  const marqueeTranslate = isMobile ? '-50%' : '-33.33%';
  const animationDirection = direction === 'left' ? 'normal' : 'reverse';
  return (
    <div
      className="flex overflow-hidden py-4"
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onPointerDown={(event) => {
        if (event.pointerType !== 'touch') return;
        setIsPaused((prev) => !prev);
      }}
    >
      <motion.div
        {...reveal.cardGrid}
        className="flex gap-4 sm:gap-6 transform-gpu [backface-visibility:hidden]"
        style={{
          width: 'fit-content',
          animationName: shouldAnimate ? 'company-marquee' : 'none',
          animationDuration: shouldAnimate ? `${rowDuration}s` : undefined,
          animationTimingFunction: shouldAnimate ? 'linear' : undefined,
          animationIterationCount: shouldAnimate ? 'infinite' : undefined,
          animationDelay: rowPhaseOffset ? `${rowPhaseOffset}s` : '0s',
          animationDirection,
          animationFillMode: shouldAnimate ? 'both' : undefined,
          animationPlayState: isPaused ? 'paused' : 'running',
          willChange: shouldAnimate ? 'transform' : 'auto',
          ['--marquee-translate' as string]: marqueeTranslate,
        }}
      >
        {marqueeItems.map((item, idx) => {
          const isDuplicate = idx >= baseCount;
          return (
            <TestimonialCard
              key={`${item.id}-${idx}`}
              testimonial={item}
              darkMode={darkMode}
              ariaHidden={isDuplicate}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export const TestimonialsSection = () => {
  const { darkMode } = useTheme();
  const reduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });
  const revealInView = useInView(sectionRef, { once: true, amount: t.threshold });
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const row1 = siteContent.testimonials.items.slice(0, 3);
  const row2 = siteContent.testimonials.items.slice(3);
  const shouldAnimate = !reduceMotion && isInView && isPageVisible;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden);
    };
    handleVisibilityChange();
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id="testimonials"
      variants={reduceMotion ? undefined : sectionOrchestrator}
      initial={reduceMotion ? undefined : 'hidden'}
      animate={reduceMotion ? undefined : revealInView ? 'visible' : 'hidden'}
      className="py-16 md:py-24 relative z-10 overflow-hidden mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-10"
    >
          <motion.p {...reveal.body} className={cn(typography.labelXs, 'text-accent tracking-widest mb-2')}>
            {siteContent.testimonials.eyebrow}
          </motion.p>

          <TitleReveal
            as="h2"
            className={cn('font-black tracking-tighter text-4xl sm:text-5xl mb-4', darkMode ? 'text-white' : 'text-black')}
          >
            {siteContent.testimonials.title}
            {siteContent.testimonials.highlight && (
              <>
                {' '}
                <span className="text-accent">{siteContent.testimonials.highlight}</span>
              </>
            )}
          </TitleReveal>

          <motion.p
            {...reveal.body}
            className={cn(typography.body, 'max-w-xl font-medium mb-12', darkMode ? 'text-gray-300' : 'text-gray-600')}
          >
            {siteContent.testimonials.description}
          </motion.p>

          <motion.div {...reveal.cardGrid} className="relative">
            <div className={cn(
              'absolute inset-y-0 left-0 w-32 sm:w-64 z-10 bg-gradient-to-r pointer-events-none',
              darkMode ? 'from-[#030303] via-[#030303]/40 to-transparent' : 'from-[#fafafa] via-[#fafafa]/40 to-transparent'
            )} />
            <div className={cn(
              'absolute inset-y-0 right-0 w-32 sm:w-64 z-10 bg-gradient-to-l pointer-events-none',
              darkMode ? 'from-[#030303] via-[#030303]/40 to-transparent' : 'from-[#fafafa] via-[#fafafa]/40 to-transparent'
            )} />
            <div className="space-y-2">
              <TestimonialMarqueeRow items={row1} direction="right" darkMode={darkMode} shouldAnimate={shouldAnimate} isMobile={isMobile} phaseOffset={0} rowDuration={58} />
              <TestimonialMarqueeRow items={row2} direction="left" darkMode={darkMode} shouldAnimate={shouldAnimate} isMobile={isMobile} phaseOffset={-18} rowDuration={64} />
            </div>
          </motion.div>
    </motion.section>
  );
};
