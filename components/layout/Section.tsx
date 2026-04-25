
import React from 'react';
import { cn } from '../../lib/utils';
import { Container } from './Container';
import { RevealSection } from '../motion/RevealSection';
import { typography } from '../../lib/typography';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    eyebrow?: string;
    motion?: "lift" | "fade";
    reveal?: boolean;
}

export const Section: React.FC<SectionProps> = ({
    children,
    className,
    id,
    eyebrow,
    motion = "fade",
    reveal = true,
}) => {
    const content = (
      <>
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
      </>
    );

    return (
        <section
          id={id}
          className={cn(
            "py-20 md:py-24 relative z-10 scroll-mt-28 sm:scroll-mt-32",
            className
          )}
        >
            <Container>
                {reveal ? (
                  <RevealSection disableTransform={motion === "fade"}>
                    {content}
                  </RevealSection>
                ) : content}
            </Container>
        </section>
    );
};
