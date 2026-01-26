import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { BlogContentBlock, BlogPost } from '../../types';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';

const BlogBlock = ({ block, darkMode }: { block: BlogContentBlock; darkMode: boolean }) => {
  switch (block.type) {
    case 'heading':
      return (
        <h3 className={cn(typography.h3, 'font-black', darkMode ? 'text-white' : 'text-black')}>
          {block.text}
        </h3>
      );
    case 'image':
      return (
        <figure className="space-y-3">
          <img
            src={block.src}
            alt={block.alt}
            loading="lazy"
            decoding="async"
            width={1600}
            height={1000}
            sizes="(max-width: 768px) 100vw, 60ch"
            className={cn(
              'w-full h-auto rounded-surface border',
              darkMode ? 'border-white/10' : 'border-black/10'
            )}
          />
          {block.caption && (
            <figcaption className={cn(typography.labelXs, typography.textMuted, 'text-center')}>{block.caption}</figcaption>
          )}
        </figure>
      );
    case 'quote':
      return (
        <p className={cn(typography.body, 'italic opacity-70', darkMode ? 'text-white' : 'text-black')}>
          {block.text}
        </p>
      );
    case 'list':
      return (
        <ul className={cn(typography.body, 'list-disc pl-6 space-y-2 opacity-70', darkMode ? 'text-white' : 'text-black')}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case 'paragraph':
    default:
      return (
        <p className={cn(typography.body, 'opacity-70', darkMode ? 'text-white' : 'text-black')}>
          {block.text}
        </p>
      );
  }
};

export const BlogArticlePage = ({ post, onBack }: { post: BlogPost; onBack: () => void }) => {
  const { darkMode } = useTheme();
  return (
    <>
      <Section className="pt-28 md:pt-32">
        <div className="mx-auto flex w-full max-w-[60ch] flex-col items-start text-left space-y-10">
          <button
            onClick={onBack}
            className={cn(
              'flex items-center gap-2 hover:opacity-100 hover:text-accent transition-all font-medium group',
              typography.body,
              typography.textSubtle
            )}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {siteContent.writing.backToBlogLabel}
          </button>

          <div className="space-y-4">
            <div className={cn('flex items-center gap-4', typography.labelXs, typography.textSubtle)}>
              <span className="px-3 py-1 rounded-mini bg-accent/20 border border-accent/30 text-accent">{post.category}</span>
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className={cn(typography.h1, 'font-black max-w-[18ch]', darkMode ? 'text-white' : 'text-black')}>{post.title}</h1>
            <p className={cn(typography.body, 'font-medium', typography.textSubtle, darkMode ? 'text-white' : 'text-black')}>{post.excerpt}</p>
          </div>

          <div className={cn('w-full rounded-surface overflow-hidden border', darkMode ? 'border-white/10' : 'border-black/10')}>
            <img
              src={post.coverImage}
              alt={post.title}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              width={1600}
              height={1000}
              sizes="(max-width: 768px) 100vw, 60ch"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-[60ch] mx-auto space-y-8 text-left">
          {post.contentBlocks.map((block, index) => (
            <BlogBlock key={`${post.slug}-block-${index}`} block={block} darkMode={darkMode} />
          ))}
        </div>
      </Section>
    </>
  );
};
