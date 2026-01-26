
'use client';
import { motion, useInView } from 'framer-motion';
import * as React from 'react';
import { cn } from '../../lib/utils';
import { durations, easing, viewportDefaults } from '../../lib/motionTokens';
import { useMobileMotionGate } from '../../hooks/useMobileMotionGate';

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
    const reduceMotion = useMobileMotionGate();

    return (
        <MotionComponent
            ref={ref}
            initial={reduceMotion ? { opacity: 0 } : { filter: 'blur(20px)', opacity: 0, y: 20 }}
            animate={isInView
                ? reduceMotion
                    ? { opacity: 1 }
                    : { filter: 'blur(0px)', opacity: 1, y: 0 }
                : {}}
            transition={{ duration: reduceMotion ? durations.fast : durations.slow, ease: easing.smooth, delay }}
            className={cn("tracking-tighter", className)}
        >
            {children}
        </MotionComponent>
    );
};
