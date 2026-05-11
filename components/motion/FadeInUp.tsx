'use client';
import { motion, useInView, useReducedMotion } from 'motion/react';
import * as React from 'react';
import { cn } from '../../lib/utils';
import { distances } from '../../lib/motionTokens';
import { VIEWPORT_REVEAL } from '../../lib/motion';
import { contentReveal } from '../../lib/motion/motionPresets';

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
    const variants = React.useMemo(
        () =>
            contentReveal.variants({
                delay,
                distance: disableTransform ? 0 : offset,
                reduceMotion,
            }),
        [delay, disableTransform, offset, reduceMotion]
    );

    return (
        <motion.div
            ref={ref}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={variants}
            style={{ willChange: disableTransform || reduceMotion ? 'opacity' : 'transform, opacity' }}
            className={cn("w-full", className)}
        >
            {children}
        </motion.div>
    );
};
