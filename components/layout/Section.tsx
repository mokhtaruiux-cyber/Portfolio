
import React from 'react';
import { cn } from '../../lib/utils';
import { Container } from './Container';
import { FadeInUp } from '../motion/FadeInUp';
import { typography } from '../../lib/typography';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    eyebrow?: string;
    darkMode?: boolean;
    motion?: "lift" | "fade";
}

export const Section: React.FC<SectionProps> = ({ children, className, id, eyebrow, darkMode, motion = "lift" }) => {
    return (
        <section
          id={id}
          className={cn(
            "py-20 md:py-24 relative z-10 scroll-mt-28 sm:scroll-mt-32",
            className
          )}
        >
            <Container>
                <FadeInUp disableTransform={motion === "fade"}>
                    {eyebrow && (
                        <span className={cn(
                            typography.labelXs,
                            "mb-4 sm:mb-6 block",
                            "text-accent"
                        )}>
                            {eyebrow}
                        </span>
                    )}
                    {children}
                </FadeInUp>
            </Container>
        </section>
    );
};
