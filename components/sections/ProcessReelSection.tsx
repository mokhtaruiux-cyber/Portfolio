import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { BlurIn } from '../motion/BlurIn';
import { Reveal } from '../motion/Reveal';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';

type ProcessReelSectionProps = {
  autoPlay?: boolean;
  stepDurationMs?: number;
  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
  loop?: boolean;
};

export const ProcessReelSection: React.FC<ProcessReelSectionProps> = ({
  autoPlay = true,
  stepDurationMs = 2500,
  pauseOnHover = true,
  pauseOnFocus = true,
  loop = true,
}) => {
  const { darkMode } = useTheme();
  const steps = siteContent.process.steps;
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { margin: '-120px' });
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const interactionTimeout = useRef<number | null>(null);

  const isAutoPlayEnabled = autoPlay && !reduceMotion;

  useEffect(() => {
    if (!isAutoPlayEnabled || !inView || isPaused || isUserInteracting) return;

    let frameId = 0;
    let lastTime = 0;
    const tick = (time: number) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      setProgress((prev) => {
        const next = prev + delta / stepDurationMs;
        if (next >= 1) {
          setActiveIndex((current) => {
            if (loop) return (current + 1) % steps.length;
            return Math.min(current + 1, steps.length - 1);
          });
          return 0;
        }
        return next;
      });

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [inView, isPaused, isUserInteracting, isAutoPlayEnabled, loop, stepDurationMs, steps.length]);

  useEffect(() => {
    if (!isUserInteracting) return;
    if (interactionTimeout.current) window.clearTimeout(interactionTimeout.current);
    interactionTimeout.current = window.setTimeout(() => {
      setIsUserInteracting(false);
    }, 1200);
    return () => {
      if (interactionTimeout.current) window.clearTimeout(interactionTimeout.current);
    };
  }, [isUserInteracting]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
    setIsUserInteracting(true);
  };

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = activeIndex;
    if (event.key === 'ArrowRight') nextIndex = (activeIndex + 1) % steps.length;
    if (event.key === 'ArrowLeft') nextIndex = (activeIndex - 1 + steps.length) % steps.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = steps.length - 1;
    handleSelect(nextIndex);
    requestAnimationFrame(() => tabRefs.current[nextIndex]?.focus());
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    const threshold = 50;
    if (Math.abs(delta) > threshold) {
      setActiveIndex((current) => {
        if (delta < 0) return (current + 1) % steps.length;
        return (current - 1 + steps.length) % steps.length;
      });
      setProgress(0);
      setIsUserInteracting(true);
    }
    touchStartX.current = null;
  };

  return (
    <Section id="process" eyebrow={siteContent.process.eyebrow}>
      <div ref={containerRef}>
        <div className="text-left mb-10">
          <BlurIn as="h2" className={cn(typography.h2, "font-black max-w-[28ch]", darkMode ? "text-white" : "text-black")}>
            {siteContent.process.title} <br /> <span className="text-accent">{siteContent.process.highlight}</span>
          </BlurIn>
          <Reveal delay={0.2} className="mt-4">
            <p className={cn(typography.body, "max-w-[60ch] font-medium", typography.textSubtle, darkMode ? "text-gray-300" : "text-gray-600")}>
              {siteContent.process.description}
            </p>
          </Reveal>
        </div>

        <div
          role="tablist"
          aria-orientation="horizontal"
          className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-2"
          onMouseEnter={() => pauseOnHover && setIsPaused(true)}
          onMouseLeave={() => pauseOnHover && setIsPaused(false)}
          onFocusCapture={() => pauseOnFocus && setIsPaused(true)}
          onBlurCapture={() => pauseOnFocus && setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleTabKeyDown}
        >
          {steps.map((step, index) => {
            const isActive = index === activeIndex;
            const tabId = `process-tab-${step.id}`;
            const panelId = `process-panel-${step.id}`;
            return (
              <div
                key={step.id}
                className={cn(
                  "snap-center min-w-[240px] md:min-w-0 text-left p-6 sm:p-8 rounded-surface glass border transition-all duration-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500/40",
                  isActive
                    ? darkMode
                      ? "bg-white/5 border-white/15"
                      : "bg-white/80 border-black/10"
                    : darkMode
                      ? "bg-black/40 border-white/5 opacity-70 hover:opacity-100"
                      : "bg-white/50 border-black/5 opacity-70 hover:opacity-100"
                )}
              >
                <button
                  ref={(el) => { tabRefs.current[index] = el; }}
                  type="button"
                  role="tab"
                  id={tabId}
                  aria-selected={isActive}
                  aria-controls={panelId}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => handleSelect(index)}
                  className="w-full text-left focus-visible:outline-none"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={cn(typography.labelXs, "tracking-[0.3em] text-accent")}>
                      {String(step.index).padStart(2, '0')}
                    </span>
                    <span className={cn(typography.labelXs, typography.textMuted)}>{step.id.toUpperCase()}</span>
                  </div>
                  <div className="h-1 w-full rounded-mini bg-black/10 dark:bg-white/10 overflow-hidden mb-4">
                    <div
                      className="h-full bg-accent origin-left"
                      style={{
                        transform: isActive && isAutoPlayEnabled ? `scaleX(${Math.min(progress, 1)})` : 'scaleX(0)',
                        willChange: 'transform',
                      }}
                    />
                  </div>
                  <h3 className={cn(typography.h3, "font-black mb-3", darkMode ? "text-white" : "text-black")}>{step.title}</h3>
                </button>
                <div id={panelId} role="tabpanel" aria-labelledby={tabId} hidden={!isActive}>
                  <p className={cn(typography.body, "font-medium mb-3", typography.textSubtle, darkMode ? "text-gray-300" : "text-gray-600")}>{step.description}</p>
                  <p className={cn(typography.labelSm, typography.textSubtle, darkMode ? "text-gray-400" : "text-gray-500")}>{step.why}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};
