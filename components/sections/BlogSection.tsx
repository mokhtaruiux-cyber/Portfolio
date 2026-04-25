import React from 'react';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { BlurIn } from '../motion/BlurIn';
import { SectionTitle } from '../motion/SectionTitle';
import { Reveal } from '../motion/Reveal';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';
import { BlogCard } from '../blog/BlogCard';
import { sectionPacing } from '../../lib/motionTokens';

export const BlogSection = ({ onPostClick }: { onPostClick: (slug: string) => void }) => {
  const { darkMode } = useTheme();
  const pacing = sectionPacing.support;
  return (
    <Section id="blog" motion="fade">
      <div className="mb-10 text-left">
        <BlurIn as="span" delay={pacing.title} className={cn(typography.labelXs, 'text-accent mb-4 block')}>{siteContent.writing.eyebrow}</BlurIn>
        <SectionTitle
          title={siteContent.writing.title}
          highlight={siteContent.writing.highlight}
          delay={pacing.title}
          stackHighlight
          className={cn('mb-6', darkMode ? 'text-white' : 'text-black')}
        />
        <Reveal delay={pacing.content}>
          <p className={cn(typography.body, 'max-w-2xl font-medium', typography.textSubtle)}>
            {siteContent.writing.description}
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {siteContent.writing.items.map((post) => (
          <BlogCard key={post.id} post={post} onClick={onPostClick} />
        ))}
      </div>
    </Section>
  );
};
