import React from 'react';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { BlogPost } from '../../types';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';
import { Reveal } from '../motion/Reveal';
import { TiltCard } from '../motion/TiltCard';

interface BlogCardProps {
  post: BlogPost;
  onClick: (slug: string) => void;
}

const BlogCardComponent: React.FC<BlogCardProps> = ({ post, onClick }) => {
  const { darkMode } = useTheme();
  return (
    <Reveal>
      <TiltCard intensity={8}>
        <button
          type="button"
          onClick={() => onClick(post.slug)}
          className={cn(
            'group w-full text-left flex flex-col rounded-[16px] glass border overflow-hidden transition-all duration-700 cursor-pointer h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2',
            darkMode
              ? 'bg-black/40 border-white/5 hover:border-blue-500/30 focus-visible:ring-offset-[#030303]'
              : 'bg-white/60 border-black/5 hover:border-blue-500/30 shadow-xl focus-visible:ring-offset-[#fafafa]'
          )}
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className={cn('absolute top-6 left-6 px-4 py-2 rounded-[4px] glass border border-white/10 bg-black/40 text-white', typography.labelSm)}>
              {post.category}
            </div>
          </div>
          <div className="p-8 sm:p-10 flex flex-col flex-1 text-left">
            <div className={cn('flex items-center gap-4 mb-6', typography.labelXs, typography.textMuted)}>
              <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
            </div>
            <h3 className={cn(typography.h3Display, 'mb-4 group-hover:text-blue-500 transition-colors', darkMode ? 'text-white' : 'text-black')}>
              {post.title}
            </h3>
            <p className={cn(typography.body, 'font-medium mb-8 line-clamp-3', typography.textSubtle)}>
              {post.excerpt}
            </p>
            <div className={cn('mt-auto flex items-center gap-2 text-blue-500 group-hover:gap-4 transition-all duration-300', typography.labelXs, 'tracking-[0.2em]')}>
              {siteContent.writing.readArticleLabel} <ArrowUpRight size={16} />
            </div>
          </div>
        </button>
      </TiltCard>
    </Reveal>
  );
};

export const BlogCard = React.memo(BlogCardComponent);
