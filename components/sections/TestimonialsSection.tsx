import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Testimonial } from '../../types';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';
import { Container } from '../layout/Container';
import { Reveal } from '../motion/Reveal';
import { BlurIn } from '../motion/BlurIn';
import { FadeInUp } from '../motion/FadeInUp';
import { useIsDesktop } from '../../hooks/useMediaQuery';

interface TestimonialCardProps {
  testimonial: Testimonial;
  darkMode: boolean;
  ariaHidden?: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, darkMode, ariaHidden }) => (
  <div
    className={cn(
      'w-[300px] sm:w-[450px] flex-shrink-0 p-8 sm:p-12 rounded-surface glass border flex flex-col justify-between transition-transform duration-500 hover:scale-[1.01] group',
      darkMode
        ? 'bg-white/5 border-white/10 hover:border-white/20 shadow-[0_20px_60px_-50px_rgba(0,0,0,0.4)]'
        : 'bg-white/40 border-black/5 hover:border-black/20 shadow-[0_20px_60px_-50px_rgba(0,0,0,0.18)]'
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
              "w-full h-full object-cover object-center transition-transform duration-500",
              testimonial.id === '1'
                ? "scale-[1.08] group-hover:scale-[1.15]"
                : "group-hover:scale-110"
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
  </div>
);

const TestimonialMarqueeRow = ({
  items,
  direction,
  darkMode,
  shouldAnimate,
  isDesktop,
  phaseOffset,
}: {
  items: Testimonial[];
  direction: 'left' | 'right';
  darkMode: boolean;
  shouldAnimate: boolean;
  isDesktop: boolean;
  phaseOffset?: number;
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const baseCount = items.length;
  const marqueeItems = isDesktop ? [...items, ...items, ...items] : [...items, ...items];
  const duration = 45;
  const travel = isDesktop ? '-33.33%' : '-50%';
  const rowPhaseOffset = phaseOffset ?? 0;
  const marqueeFrom = direction === 'left' ? '0%' : travel;
  const marqueeTo = direction === 'left' ? travel : '0%';
  const marqueeStyle = React.useMemo(() => ({
    width: 'fit-content',
    willChange: shouldAnimate ? 'transform' : 'auto',
    transform: `translateX(${marqueeFrom})`,
    animation: shouldAnimate ? `testimonial-marquee ${duration}s linear infinite` : 'none',
    animationPlayState: isPaused ? 'paused' : 'running',
    animationDelay: rowPhaseOffset ? `${rowPhaseOffset}s` : '0s',
    animationFillMode: 'both',
    ['--marquee-from' as string]: marqueeFrom,
    ['--marquee-to' as string]: marqueeTo,
  }), [duration, isPaused, marqueeFrom, marqueeTo, rowPhaseOffset, shouldAnimate]);
  return (
    <div
      className="flex overflow-hidden py-4"
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <motion.div
        className="flex gap-4 sm:gap-6 transform-gpu"
        style={marqueeStyle}
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
  const isDesktop = useIsDesktop();
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });
  const [isPageVisible, setIsPageVisible] = useState(true);
  const row1 = siteContent.testimonials.items.slice(0, 3);
  const row2 = siteContent.testimonials.items.slice(3, 6);
  const row3 = siteContent.testimonials.items.slice(6, 9);
  const shouldAnimate = !reduceMotion && isInView && isPageVisible;

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
    <section ref={sectionRef} id="testimonials" className="py-16 md:py-24 relative z-10 overflow-hidden">
      <FadeInUp>
        <Container className="relative z-20 mb-10">
          <div className="flex flex-col items-start text-left">
            <BlurIn as="span" className={cn(typography.labelXs, 'text-accent mb-4 sm:mb-6')}>{siteContent.testimonials.eyebrow}</BlurIn>
            <BlurIn as="h3" delay={0.1} className={cn(typography.h2, 'font-black mb-6 max-w-[24ch]', darkMode ? 'text-white' : 'text-black')}>
              {siteContent.testimonials.title} <br />
              <span className="text-accent">{siteContent.testimonials.highlight}</span>
            </BlurIn>
            <Reveal delay={0.2}>
              <p className={cn(typography.body, 'max-w-xl font-medium', typography.textSubtle, darkMode ? 'text-gray-300' : 'text-gray-600')}>
                {siteContent.testimonials.description}
              </p>
            </Reveal>
          </div>
        </Container>
        <div className="relative">
          <div className={cn(
            'absolute inset-y-0 left-0 w-32 sm:w-64 z-10 bg-gradient-to-r pointer-events-none',
            darkMode ? 'from-[#030303] via-[#030303]/40 to-transparent' : 'from-[#fafafa] via-[#fafafa]/40 to-transparent'
          )} />
          <div className={cn(
            'absolute inset-y-0 right-0 w-32 sm:w-64 z-10 bg-gradient-to-l pointer-events-none',
            darkMode ? 'from-[#030303] via-[#030303]/40 to-transparent' : 'from-[#fafafa] via-[#fafafa]/40 to-transparent'
          )} />
          <div className="space-y-2">
            <Reveal delay={0.1}>
              <TestimonialMarqueeRow items={row1} direction="right" darkMode={darkMode} shouldAnimate={shouldAnimate} isDesktop={isDesktop} phaseOffset={0} />
            </Reveal>
            <Reveal delay={0.2}>
              <TestimonialMarqueeRow items={row2} direction="left" darkMode={darkMode} shouldAnimate={shouldAnimate} isDesktop={isDesktop} phaseOffset={-15} />
            </Reveal>
            <Reveal delay={0.3}>
              <TestimonialMarqueeRow items={row3} direction="right" darkMode={darkMode} shouldAnimate={shouldAnimate} isDesktop={isDesktop} phaseOffset={-30} />
            </Reveal>
          </div>
        </div>
      </FadeInUp>
    </section>
  );
};
