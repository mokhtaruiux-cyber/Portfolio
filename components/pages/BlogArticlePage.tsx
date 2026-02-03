import React from 'react';
import { BlogContentBlock, BlogPost } from '../../types';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { Reveal } from '../motion/Reveal';
import { GlowButton } from '../ui/GlowButton';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';

const BlogBlock = ({ block, darkMode }: { block: BlogContentBlock; darkMode: boolean }) => {
  switch (block.type) {
    case 'heading':
      return (
        <h2 className={cn(typography.h3, 'font-black', darkMode ? 'text-white' : 'text-black')}>
          {block.text}
        </h2>
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
        <blockquote className={cn(typography.body, 'italic opacity-70', darkMode ? 'text-white' : 'text-black')}>
          {block.text}
        </blockquote>
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

export const BlogArticlePage = ({
  post,
  nextPost,
  onNextPost,
}: {
  post: BlogPost;
  nextPost?: BlogPost;
  onNextPost?: (slug: string) => void;
}) => {
  const { darkMode } = useTheme();
  return (
    <>
      <Section className="pt-28 md:pt-36">
        <div className="mx-auto flex w-full max-w-[60ch] flex-col items-start text-left space-y-10">
          <div className="space-y-4">
            <div className={cn('flex items-center gap-4', typography.labelXs, typography.textSubtle)}>
              <span className="px-3 py-1 rounded-mini bg-accent/20 border border-accent/30 text-accent">{post.category}</span>
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className={cn(typography.h1, 'font-black max-w-[18ch] tracking-normal', darkMode ? 'text-white' : 'text-black')}>{post.title}</h1>
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
            <Reveal key={`${post.slug}-block-${index}`} delay={index * 0.05}>
              <BlogBlock block={block} darkMode={darkMode} />
            </Reveal>
          ))}
        </div>
      </Section>

      {nextPost && (
        <Section>
          <div className="w-full text-left">
            <h3 className={cn(typography.h3, 'font-black mb-4 text-white')}>
              Up Next
            </h3>
            <button
              type="button"
              onClick={() => onNextPost?.(nextPost.slug)}
              className={cn(
                'group w-full text-left rounded-surface glass border overflow-hidden transition-all duration-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2',
                darkMode
                  ? 'bg-black/40 border-white/10 hover:border-accent/30 focus-visible:ring-offset-[#030303]'
                  : 'bg-white/60 border-black/5 hover:border-accent/30 shadow-xl focus-visible:ring-offset-[#fafafa]'
              )}
            >
              <div className="flex flex-row w-full items-stretch gap-6 p-6 sm:p-8">
                <div
                  className={cn(
                    "self-stretch h-full aspect-[16/10] w-auto max-w-[45%] rounded-mini overflow-hidden border flex-shrink-0",
                    darkMode ? "border-white/10" : "border-black/10"
                  )}
                >
                  <img
                    src={nextPost.coverImage}
                    alt={nextPost.title}
                    loading="lazy"
                    decoding="async"
                    width={1600}
                    height={1000}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className={cn('flex items-center gap-3 mb-3', typography.labelXs, typography.textMuted)}>
                    <span className="px-3 py-1 rounded-mini bg-accent/20 border border-accent/30 text-accent">
                      {nextPost.category}
                    </span>
                    <span>{nextPost.date}</span>
                    <span>{nextPost.readTime}</span>
                  </div>
                  <h3 className={cn(typography.h3Display, 'mb-3 group-hover:text-accent transition-colors', darkMode ? 'text-white' : 'text-black')}>
                    {nextPost.title}
                  </h3>
                  <p className={cn(typography.body, 'font-medium line-clamp-2', typography.textSubtle)}>
                    {nextPost.excerpt}
                  </p>
                  <div className="mt-6">
                    <GlowButton size="cta" as="span">
                      {siteContent.writing.readArticleLabel}
                    </GlowButton>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </Section>
      )}
    </>
  );
};
