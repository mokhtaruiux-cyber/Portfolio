'use client';
import { motion, useInView, useReducedMotion } from 'motion/react';
import * as React from 'react';
import { cn } from '../../lib/utils';
import { distances, durations, easing } from '../../lib/motionTokens';
import { VIEWPORT_REVEAL } from '../../lib/motion';

interface FadeInUpProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    disableTransform?: boolean;
    offset?: number;
}

export const FadeInUp = ({
    children,
    className,
    delay = 0,
    disableTransform = false,
    offset = distances.md,
}: FadeInUpProps) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, VIEWPORT_REVEAL);
    const reduceMotion = useReducedMotion() ?? false;
    const initial = reduceMotion
        ? { opacity: 1 }
        : disableTransform
            ? { opacity: 0 }
            : { opacity: 0, y: offset };
    const animate = reduceMotion
        ? { opacity: 1 }
        : disableTransform
            ? { opacity: 1 }
            : { opacity: 1, y: 0 };

    return (
        <motion.div
            ref={ref}
            initial={initial}
            animate={isInView ? animate : {}}
            transition={{
                duration: reduceMotion ? durations.fast : durations.medium,
                ease: easing.smooth,
                delay
            }}
            style={{ willChange: disableTransform || reduceMotion ? 'opacity' : 'transform, opacity' }}
            className={cn("w-full", className)}
        >
            {children}
        </motion.div>
    );
};
