
'use client';
import { motion, useInView, useReducedMotion } from 'motion/react';
import * as React from 'react';
import { cn } from '../../lib/utils';
import { VIEWPORT_REVEAL } from '../../lib/motion';
import { titleWordReveal } from '../../lib/motion/motionPresets';
import { useSectionMotion } from './SectionSequence';

type BlurInProps = {
    as?: React.ElementType;
    children: React.ReactNode;
    className?: string;
    contentClassName?: string;
    delay?: number;
    stackWords?: boolean;
    'aria-label'?: string;
    /** Above-the-fold titles animate with CSS so the entrance starts at first paint, before hydration. */
    cssIntro?: boolean;
} & React.HTMLAttributes<HTMLElement>;

const wordClass = 'inline-block will-change-transform';
const wordContainerClass = 'flex flex-wrap gap-x-[0.25em]';

type RenderContext = {
    cssIntro: boolean;
    delay: number;
    distance: number;
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
                        if (context.cssIntro) {
                            return (
                                <span
                                    key={`${word}-${wordIndex}`}
                                    data-title-word=""
                                    className={cn(wordClass, 'title-word-intro', context.stackWords && 'basis-full')}
                                    style={{
                                        animationDelay: `${titleWordReveal.resolveDelay(context.delay, wordIndex)}s`,
                                        '--title-distance': `${context.distance}px`,
                                    } as React.CSSProperties}
                                >
                                    {word}
                                </span>
                            );
                        }
                        return (
                            <motion.span
                                key={`${word}-${wordIndex}`}
                                data-title-word=""
                                className={cn(wordClass, context.stackWords && 'basis-full')}
                                custom={titleWordReveal.getCustom(context.delay, wordIndex, context.reduceMotion, context.distance)}
                                variants={titleWordReveal.variants}
                                initial={context.reduceMotion ? false : 'initial'}
                                animate={context.isInView ? 'animate' : 'initial'}
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
    cssIntro = false,
    'aria-label': ariaLabel,
    ...props
}: BlurInProps) => {
    const ref = React.useRef<HTMLElement | null>(null);
    const isInView = useInView(ref, VIEWPORT_REVEAL);
    const MotionComponent = React.useMemo(() => motion.create(Component), [Component]);
    const reduceMotion = useReducedMotion() ?? false;
    const { status } = useSectionMotion();
    const instant = reduceMotion || status === 'skipped';
    const accessibleLabel = ariaLabel ?? getAccessibleText(children);

    const animatedChildren = React.useMemo(() => {
        const counter = { value: 0 };
        return renderAnimatedChildren(children, counter, {
            cssIntro,
            delay,
            distance: Component === 'h1' ? 20 : 10,
            isInView: isInView && status !== 'pending',
            reduceMotion: instant,
            stackWords,
        });
    }, [Component, children, cssIntro, delay, instant, isInView, stackWords, status]);

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
