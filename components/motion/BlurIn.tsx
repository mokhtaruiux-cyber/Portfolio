
'use client';
import { motion, useInView, useReducedMotion } from 'motion/react';
import * as React from 'react';
import { cn } from '../../lib/utils';
import { durations, easing, titleReveal } from '../../lib/motionTokens';
import { VIEWPORT_REVEAL } from '../../lib/motion';

type BlurInProps = {
    as?: React.ElementType;
    children: React.ReactNode;
    className?: string;
    contentClassName?: string;
    delay?: number;
    stackWords?: boolean;
    'aria-label'?: string;
} & React.HTMLAttributes<HTMLElement>;

const wordClass = 'inline-block will-change-transform';
const wordContainerClass = 'flex flex-wrap gap-x-[0.25em]';
const titleStartDelay = titleReveal.startDelayMs / 1000;

type RenderContext = {
    delay: number;
    isInView: boolean;
    reduceMotion: boolean;
    stackWords: boolean;
};

type WordCounter = {
    value: number;
};

const getAccessibleText = (children: React.ReactNode): string => {
    return React.Children.toArray(children)
        .map((child) => {
            if (typeof child === 'string' || typeof child === 'number') return String(child);
            if (React.isValidElement<{ children?: React.ReactNode }>(child)) {
                if (child.type === 'br') return ' ';
                return getAccessibleText(child.props.children);
            }
            return '';
        })
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
};

const renderAnimatedChildren = (
    node: React.ReactNode,
    counter: WordCounter,
    context: RenderContext
): React.ReactNode => {
    return React.Children.toArray(node).flatMap((child, childIndex) => {
            if (typeof child === 'string' || typeof child === 'number') {
                return String(child)
                    .split(/(\s+)/)
                    .filter((part) => part.trim().length > 0)
                    .map((word) => {
                        const wordIndex = counter.value;
                        counter.value += 1;
                        return (
                            <motion.span
                                key={`${word}-${wordIndex}`}
                                className={cn(wordClass, context.stackWords && 'basis-full')}
                                initial={context.reduceMotion ? false : { opacity: 0, y: titleReveal.distance, filter: `blur(${titleReveal.blur}px)` }}
                                animate={
                                    context.reduceMotion
                                        ? { opacity: 1 }
                                        : context.isInView
                                            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                                            : { opacity: 0, y: titleReveal.distance, filter: `blur(${titleReveal.blur}px)` }
                                }
                                transition={{
                                    duration: context.reduceMotion ? durations.fast : titleReveal.duration,
                                    delay: context.isInView ? context.delay + titleStartDelay + wordIndex * titleReveal.stagger : 0,
                                    ease: easing.reveal,
                                }}
                            >
                                {word}
                            </motion.span>
                        );
                    });
            }

            if (React.isValidElement<{ children?: React.ReactNode; className?: string }>(child)) {
                if (child.type === React.Fragment) {
                    return renderAnimatedChildren(child.props.children, counter, context);
                }

                if (child.type === 'br') {
                    return <span key={`line-${childIndex}`} className="basis-full h-0" />;
                }

                const className = child.props.className ?? '';
                const keepsOwnLine = /\bblock\b/.test(className);

                return React.cloneElement(child, {
                    className: cn(className, wordContainerClass, context.stackWords || keepsOwnLine ? 'basis-full' : 'inline-flex'),
                    children: renderAnimatedChildren(child.props.children, counter, context),
                });
            }

            return child;
        });
};

export const BlurIn = ({
    as: Component = "h2",
    children,
    className,
    contentClassName,
    delay = 0,
    stackWords = false,
    'aria-label': ariaLabel,
    ...props
}: BlurInProps) => {
    const ref = React.useRef<HTMLElement | null>(null);
    const isInView = useInView(ref, VIEWPORT_REVEAL);
    const MotionComponent = React.useMemo(() => motion.create(Component), [Component]);
    const reduceMotion = useReducedMotion() ?? false;
    const accessibleLabel = ariaLabel ?? getAccessibleText(children);

    const animatedChildren = React.useMemo(() => {
        const counter = { value: 0 };
        return renderAnimatedChildren(children, counter, {
            delay,
            isInView,
            reduceMotion,
            stackWords,
        });
    }, [children, delay, isInView, reduceMotion, stackWords]);

    return (
        <MotionComponent
            {...props}
            ref={ref}
            aria-label={accessibleLabel}
            className={cn("tracking-tighter", className)}
        >
            <span aria-hidden="true" className={cn(wordContainerClass, 'inline-flex', contentClassName)}>
                {animatedChildren}
            </span>
        </MotionComponent>
    );
};
