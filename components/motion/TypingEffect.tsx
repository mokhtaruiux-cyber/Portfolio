
'use client';

import * as React from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TypingEffectProps {
    text: string;
    as?: React.ElementType;
    className?: string;
    /** Duration in seconds for the full reveal */
    duration?: number;
}

/**
 * TypingEffect - Performant text reveal animation
 * Uses CSS clip-path instead of per-character spans for better performance.
 * Reduces DOM nodes from 50+ to just 2 elements.
 */
export function TypingEffect({
    text = 'Typing Effect',
    as: Component = "span",
    className,
    duration = 1.2
}: TypingEffectProps) {
    const ref = React.useRef<HTMLElement | null>(null);
    const isInView = useInView(ref, { once: true });
    const reduceMotion = useReducedMotion();
    const MotionComponent = motion(Component);

    return (
        <MotionComponent
            ref={ref}
            className={cn("font-black tracking-tighter relative inline-block", className)}
        >
            {/* Screen reader accessible text */}
            <span className="sr-only">{text}</span>

            {/* Visible animated text */}
            <motion.span
                aria-hidden="true"
                className="inline-block"
                initial={{
                    clipPath: reduceMotion ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)'
                }}
                animate={isInView ? {
                    clipPath: 'inset(0 0% 0 0)'
                } : {}}
                transition={{
                    duration: reduceMotion ? 0.3 : duration,
                    ease: [0.16, 1, 0.3, 1]
                }}
            >
                {text}
            </motion.span>
        </MotionComponent>
    );
}

