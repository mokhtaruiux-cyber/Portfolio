
import React from 'react';
import { cn } from '../../lib/utils';
import { Container } from './Container';
import { RevealSection } from '../motion/RevealSection';
import { BlurIn } from '../motion/BlurIn';
import { typography } from '../../lib/typography';
import { eyebrowChipClass } from '../../lib/chipStyles';
import { titleReveal } from '../../lib/motion/motionPresets';
import { SectionSequence, useCanSequenceSection } from '../motion/SectionSequence';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    eyebrow?: string;
    motion?: "lift" | "fade";
    reveal?: boolean;
    sequenceImmediate?: boolean;
}

export const Section: React.FC<SectionProps> = ({
    children,
    className,
    id,
    eyebrow,
    motion = "lift",
    reveal = true,
    sequenceImmediate = false,
}) => {
    const canSequence = useCanSequenceSection();
    const content = (
      <>
        {eyebrow && (
          <BlurIn
            as="span"
            delay={titleReveal.sectionDelay}
            className={cn(
              typography.labelXs,
              "mb-4 sm:mb-6 block",
              eyebrowChipClass
            )}
          >
              {eyebrow}
          </BlurIn>
        )}
        {children}
      </>
    );

    const section = (
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

    return canSequence ? <SectionSequence immediate={sequenceImmediate}>{section}</SectionSequence> : section;
};
