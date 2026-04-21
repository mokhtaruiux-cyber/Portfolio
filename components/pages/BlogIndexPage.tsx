import React from 'react';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { BlogCard } from '../blog/BlogCard';
import { PageIntro } from '../layout/PageIntro';

export const BlogIndexPage = ({ onPostClick }: { onPostClick: (slug: string) => void }) => {
  const { darkMode } = useTheme();
  return (
    <Section className="pb-8 pt-32 md:pb-10 md:pt-36" eyebrow={siteContent.writing.index.eyebrow}>
      <PageIntro
        title="Latest"
        highlight="Articles."
        description={siteContent.writing.index.description}
        darkMode={darkMode}
        className="mb-10"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {siteContent.writing.items.map((post) => (
          <BlogCard key={post.id} post={post} onClick={onPostClick} />
        ))}
      </div>
    </Section>
  );
};
