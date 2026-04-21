
'use client';

import * as React from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { durations, easing } from '../../lib/motionTokens';

interface TypingEffectProps {
    text: string;
    as?: React.ElementType;
    className?: string;
    /** Duration in seconds per word reveal */
    duration?: number;
}

/**
 * TypingEffect - Word-level reveal animation.
 * Keeps DOM light while maintaining a gentle staggered motion.
 */
export function TypingEffect({
    text = 'Typing Effect',
    as: Component = "span",
    className,
    duration = durations.medium
}: TypingEffectProps) {
    const ref = React.useRef<HTMLElement | null>(null);
    const isInView = useInView(ref, { once: true });
    const reduceMotion = useReducedMotion();
    const MotionComponent = React.useMemo(() => motion.create(Component), [Component]);
    const words = React.useMemo(() => text.split(' '), [text]);

    const containerVariants = React.useMemo(() => ({
        initial: {},
        animate: {
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.08,
            },
        },
    }), []);

    const wordVariants = React.useMemo(() => ({
        initial: { opacity: 0, y: 10 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration,
                ease: easing.smooth,
            },
        },
    }), [duration]);

    if (reduceMotion) {
    return (
        <MotionComponent
            ref={ref}
            aria-hidden="true"
            className={cn("font-black tracking-tighter relative inline-block", className)}
        >
                {text}
        </MotionComponent>
    );
    }

    return (
        <MotionComponent
            ref={ref}
            aria-hidden="true"
            className={cn("font-black tracking-tighter relative inline-block", className)}
        >
            <motion.span
                aria-hidden="true"
                className="inline-block"
                variants={containerVariants}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
            >
                {words.map((word, index) => (
                    <motion.span key={`${word}-${index}`} variants={wordVariants} className="inline-block">
                        {word}
                        {index < words.length - 1 ? '\u00A0' : ''}
                    </motion.span>
                ))}
            </motion.span>
        </MotionComponent>
    );
}
