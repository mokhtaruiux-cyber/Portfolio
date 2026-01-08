
'use client';
import { motion, useInView } from 'framer-motion';
import * as React from 'react';
import { cn } from '../../lib/utils';
import { durations, easing, viewportDefaults } from '../../lib/motionTokens';

export const BlurIn = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, viewportDefaults);

    return (
        <motion.h2
            ref={ref}
            initial={{ filter: 'blur(20px)', opacity: 0, y: 20 }}
            animate={isInView ? { filter: 'blur(0px)', opacity: 1, y: 0 } : {}}
            transition={{ duration: durations.slow, ease: easing.smooth, delay }}
            className={cn("tracking-tighter", className)}
        >
            {children}
        </motion.h2>
    );
};
