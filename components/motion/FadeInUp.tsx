'use client';
import { motion, useInView } from 'framer-motion';
import * as React from 'react';
import { cn } from '../../lib/utils';
import { durations, easing, viewportDefaults } from '../../lib/motionTokens';

interface FadeInUpProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export const FadeInUp = ({ children, className, delay = 0 }: FadeInUpProps) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, viewportDefaults);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{
                duration: durations.slow,
                ease: easing.smooth,
                delay
            }}
            className={cn("w-full", className)}
        >
            {children}
        </motion.div>
    );
};
