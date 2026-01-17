'use client';
import { motion, useInView } from 'framer-motion';
import * as React from 'react';
import { cn } from '../../lib/utils';
import { durations, easing, viewportDefaults } from '../../lib/motionTokens';

interface FadeInUpProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    disableTransform?: boolean;
    offset?: number;
}

export const FadeInUp = ({ children, className, delay = 0, disableTransform = false, offset = 24 }: FadeInUpProps) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, viewportDefaults);
    const initial = disableTransform ? { opacity: 0 } : { opacity: 0, y: offset };
    const animate = disableTransform ? { opacity: 1 } : { opacity: 1, y: 0 };

    return (
        <motion.div
            ref={ref}
            initial={initial}
            animate={isInView ? animate : {}}
            transition={{
                duration: durations.medium,
                ease: easing.smooth,
                delay
            }}
            style={{ willChange: disableTransform ? 'opacity' : 'transform, opacity' }}
            className={cn("w-full", className)}
        >
            {children}
        </motion.div>
    );
};
