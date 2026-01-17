import React from 'react';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { BlurIn } from '../motion/BlurIn';
import { Reveal } from '../motion/Reveal';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';
import { BlogCard } from '../blog/BlogCard';

export const BlogSection = ({ onPostClick }: { onPostClick: (slug: string) => void }) => {
  const { darkMode } = useTheme();
  return (
    <Section id="blog">
      <div className="mb-10 text-left">
        <BlurIn as="span" className={cn(typography.labelXs, 'text-blue-500 mb-4 block')}>{siteContent.writing.eyebrow}</BlurIn>
        <BlurIn as="h2" delay={0.1} className={cn(typography.h2, 'font-black mb-6 max-w-[24ch]', darkMode ? 'text-white' : 'text-black')}>
          {siteContent.writing.title} <br /><span className="text-blue-600">{siteContent.writing.highlight}</span>
        </BlurIn>
        <Reveal delay={0.2}>
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
