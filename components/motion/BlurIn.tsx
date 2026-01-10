
'use client';
import { motion, useInView } from 'framer-motion';
import * as React from 'react';
import { cn } from '../../lib/utils';
import { durations, easing, viewportDefaults } from '../../lib/motionTokens';

type BlurInProps = {
    as?: React.ElementType;
    children: React.ReactNode;
    className?: string;
    delay?: number;
};

export const BlurIn = ({ as: Component = "h2", children, className, delay = 0 }: BlurInProps) => {
    const ref = React.useRef<HTMLElement | null>(null);
    const isInView = useInView(ref, viewportDefaults);
    const MotionComponent = React.useMemo(() => motion(Component), [Component]);

    return (
        <MotionComponent
            ref={ref}
            initial={{ filter: 'blur(20px)', opacity: 0, y: 20 }}
            animate={isInView ? { filter: 'blur(0px)', opacity: 1, y: 0 } : {}}
            transition={{ duration: durations.slow, ease: easing.smooth, delay }}
            className={cn("tracking-tighter", className)}
        >
            {children}
        </MotionComponent>
    );
};
