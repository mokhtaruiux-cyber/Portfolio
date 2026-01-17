import React from 'react';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { BlurIn } from '../motion/BlurIn';
import { Reveal } from '../motion/Reveal';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';
import { BlogCard } from '../blog/BlogCard';

export const BlogIndexPage = ({ onPostClick }: { onPostClick: (slug: string) => void }) => {
  const { darkMode } = useTheme();
  return (
    <Section eyebrow={siteContent.writing.index.eyebrow}>
      <div className="mb-10 text-left">
        <BlurIn as="h2" className={cn(typography.h2, 'font-black mb-6 max-w-[24ch]', darkMode ? 'text-white' : 'text-black')}>
          {siteContent.writing.index.title}
        </BlurIn>
        <Reveal delay={0.2}>
          <p className={cn(typography.body, 'max-w-2xl font-medium', typography.textSubtle, darkMode ? 'text-white' : 'text-black')}>
            {siteContent.writing.index.description}
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
