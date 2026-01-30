
import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion';
import { Project } from '../../types';

// GPU-friendly stacked card animation
// We avoid layout shifts and expensive filters (blur)
// strictly using transform (y, scale) and opacity.
// 'will-change-transform' hints the browser to promote layers.

interface StackedCardsProps {
    items: Project[];
    renderItem: (item: Project, index: number) => React.ReactNode;
}

export const StackedCards: React.FC<StackedCardsProps> = ({ items, renderItem }) => {
    const [isDesktop, setIsDesktop] = useState(() => {
        if (typeof window === 'undefined') return true;
        return window.matchMedia('(min-width: 768px)').matches;
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const media = window.matchMedia('(min-width: 768px)');
        const update = () => setIsDesktop(media.matches);
        update();
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, []);

    // Mobile: Subtle fade+up animation for each card
    if (!isDesktop) {
        return (
            <div className="space-y-12">
                {items.map((item, i) => (
                    <motion.div
                        key={item.id || i}
                        className="w-full"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                    >
                        {renderItem(item, i)}
                    </motion.div>
                ))}
            </div>
        );
    }

    return <StackedCardsDesktop items={items} renderItem={renderItem} />;
};

const StackedCardsDesktop: React.FC<StackedCardsProps> = ({ items, renderItem }) => {
    // For a true "one useScroll" implementation as requested:
    const containerRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion() ?? false;
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.8 });
    const gapRem = 6;
    const tailRem = 6;
    const gapCount = Math.max(items.length - 1, 0);
    const extraRem = gapCount * gapRem + tailRem;

    return (
        <div
            ref={containerRef}
            className="relative w-full"
            style={{
                height: `calc(${items.length} * 100svh + ${extraRem}rem)`,
                minHeight: `calc(${items.length} * 100dvh + ${extraRem}rem)`,
            }}
        >
            {items.map((item, i) => {
                // Calculate scale/opacity based on the single scrollYProgress
                // This assumes equal height items for perfect math, but works reasonably for variable too.
                return (
                    <CardWithTransform
                        key={item.id || i}
                        index={i}
                        total={items.length}
                        item={item}
                        renderItem={renderItem}
                        scrollProgress={smoothProgress}
                        reduceMotion={reduceMotion}
                    />
                );
            })}
        </div>
    );
};

interface CardWithTransformProps {
    index: number;
    total: number;
    item: Project;
    renderItem: (item: Project, index: number) => React.ReactNode;
    scrollProgress: MotionValue<number>;
    reduceMotion: boolean;
}

const CardWithTransform = ({ index, total, item, renderItem, scrollProgress, reduceMotion }: CardWithTransformProps) => {
    // To make it truly GPU friendly and avoid jitter, we rely on sticky positioning for the "stacking"
    // and use the scrollProgress only for subtle scale/opacity of cards *behind* the current one.

    // Tuning:
    // - stickyTop: adjust the sticky offset per breakpoint
    // - scaleDrop: smaller values = subtler stacking
    const stickyTop = "top-24 sm:top-28 lg:top-32";
    const scaleDrop = reduceMotion ? 0 : 0.06;
    const opacityDrop = reduceMotion ? 0 : 0.08;
    const start = index / total;

    const scale = useTransform(scrollProgress, [start, 1], [1, 1 - scaleDrop]);
    const opacity = useTransform(scrollProgress, [start, 1], [1, 1 - opacityDrop]);

    return (
        <div
            className={`sticky ${stickyTop} min-h-screen flex items-center justify-center py-6 sm:py-8 mb-12 sm:mb-20 lg:mb-24 last:mb-0`}
            style={{
                // Tighter stacking for a more premium look (25px offset)
                zIndex: index
            }}
        >
            <motion.div
                style={{
                    scale,
                    opacity,
                    willChange: 'transform, opacity'
                }}
                className="w-full origin-top transform-gpu bg-transparent"
            >
                {renderItem(item, index)}
            </motion.div>
        </div>
    )
}
