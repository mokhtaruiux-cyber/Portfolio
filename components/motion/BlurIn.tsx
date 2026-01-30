
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
    // Skip expensive blur filter on mobile/reduced-motion for better performance
    const skipHeavyAnimations = useMobileMotionGate();

    // Mobile: opacity + transform only (GPU-friendly)
    // Desktop: full blur effect
    const initial = skipHeavyAnimations
        ? { opacity: 0, y: 12 }
        : { filter: 'blur(20px)', opacity: 0, y: 20 };

    const animate = isInView
        ? skipHeavyAnimations
            ? { opacity: 1, y: 0 }
            : { filter: 'blur(0px)', opacity: 1, y: 0 }
        : {};

    return (
        <MotionComponent
            ref={ref}
            initial={initial}
            animate={animate}
            transition={{ duration: skipHeavyAnimations ? durations.fast : durations.slow, ease: easing.smooth, delay }}
            className={cn("tracking-tighter", className)}
        >
            {children}
        </MotionComponent>
    );
};
