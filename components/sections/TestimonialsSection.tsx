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

interface TestimonialCardProps {
  testimonial: Testimonial;
  darkMode: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, darkMode }) => (
  <div
    className={cn(
      'w-[300px] sm:w-[450px] flex-shrink-0 p-8 sm:p-12 rounded-[40px] glass border flex flex-col justify-between transition-transform duration-500 hover:scale-[1.01] group',
      darkMode
        ? 'bg-white/5 border-white/5 hover:border-white/20 shadow-[0_20px_60px_-50px_rgba(0,0,0,0.4)]'
        : 'bg-white/40 border-black/5 hover:border-black/20 shadow-[0_20px_60px_-50px_rgba(0,0,0,0.18)]'
    )}
  >
    <p className={cn(typography.body, 'font-medium italic mb-12 text-left', darkMode ? 'text-gray-200' : 'text-gray-800')}>
      &quot;{testimonial.content}&quot;
    </p>
    <div className="flex items-center gap-5 text-left">
      <div className="relative">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-blue-600/30 group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center border-2 border-black">
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
}: {
  items: Testimonial[];
  direction: 'left' | 'right';
  darkMode: boolean;
  shouldAnimate: boolean;
}) => {
  const marqueeItems = [...items, ...items, ...items];
  const marqueeAnimation = shouldAnimate
    ? { x: direction === 'left' ? [0, '-33.33%'] : ['-33.33%', 0] }
    : { x: 0 };
  const marqueeTransition = shouldAnimate
    ? { duration: 45, repeat: Infinity, ease: 'linear' }
    : { duration: 0 };
  const marqueeStyle = shouldAnimate ? { width: 'fit-content', willChange: 'transform' } : { width: 'fit-content' };
  return (
    <div className="flex overflow-hidden py-4">
      <motion.div
        className="flex gap-4 sm:gap-6 transform-gpu"
        animate={marqueeAnimation}
        transition={marqueeTransition}
        style={marqueeStyle}
      >
        {marqueeItems.map((item, idx) => (
          <TestimonialCard key={`${item.id}-${idx}`} testimonial={item} darkMode={darkMode} />
        ))}
      </motion.div>
    </div>
  );
};

export const TestimonialsSection = () => {
  const { darkMode } = useTheme();
  const reduceMotion = useReducedMotion() ?? false;
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
            <BlurIn as="span" className={cn(typography.labelXs, 'text-blue-600 mb-4 sm:mb-6')}>{siteContent.testimonials.eyebrow}</BlurIn>
            <BlurIn as="h3" delay={0.1} className={cn(typography.h2, 'font-black mb-6 max-w-[24ch]', darkMode ? 'text-white' : 'text-black')}>
              {siteContent.testimonials.title} <br />
              <span className="text-blue-600">{siteContent.testimonials.highlight}</span>
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
              <TestimonialMarqueeRow items={row1} direction="left" darkMode={darkMode} shouldAnimate={shouldAnimate} />
            </Reveal>
            <Reveal delay={0.2}>
              <TestimonialMarqueeRow items={row2} direction="right" darkMode={darkMode} shouldAnimate={shouldAnimate} />
            </Reveal>
            <Reveal delay={0.3}>
              <TestimonialMarqueeRow items={row3} direction="left" darkMode={darkMode} shouldAnimate={shouldAnimate} />
            </Reveal>
          </div>
        </div>
      </FadeInUp>
    </section>
  );
};
