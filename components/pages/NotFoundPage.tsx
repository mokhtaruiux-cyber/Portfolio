import React from 'react';

import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';
import { Section } from '../layout/Section';
import { GlowButton } from '../ui/GlowButton';

interface NotFoundPageProps {
  pathname: string;
  darkMode: boolean;
  onGoHome: () => void;
  onViewWork: () => void;
  onReadBlog: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  pathname,
  darkMode,
  onGoHome,
  onViewWork,
  onReadBlog,
}) => {
  return (
    <Section className="min-h-screen flex items-center" eyebrow="404">
      <div className="max-w-3xl text-left">
        <p className={cn(typography.labelSm, 'mb-6 text-accent')}>Page not found</p>
        <h1 className={cn(typography.h1, 'max-w-[14ch] font-black', darkMode ? 'text-white' : 'text-black')}>
          The page you requested does not exist.
        </h1>
        <p className={cn(typography.body, 'mt-6 max-w-[60ch]', darkMode ? 'text-white/70' : 'text-black/70')}>
          The URL <span className={cn('font-semibold', darkMode ? 'text-white' : 'text-black')}>{pathname}</span> does not map to a live page in this portfolio. Use one of the routes below to continue browsing.
        </p>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap">
          <GlowButton onClick={onGoHome}>Back Home</GlowButton>
          <button
            type="button"
            onClick={onViewWork}
            className={cn(
              typography.button,
              'rounded-full border px-6 py-4 transition-colors',
              darkMode
                ? 'border-white/15 text-white/80 hover:border-white/30 hover:text-white'
                : 'border-black/15 text-black/80 hover:border-black/30 hover:text-black'
            )}
          >
            View Projects
          </button>
          <button
            type="button"
            onClick={onReadBlog}
            className={cn(
              typography.button,
              'rounded-full border px-6 py-4 transition-colors',
              darkMode
                ? 'border-white/15 text-white/80 hover:border-white/30 hover:text-white'
                : 'border-black/15 text-black/80 hover:border-black/30 hover:text-black'
            )}
          >
            Read Articles
          </button>
        </div>
      </div>
    </Section>
  );
};
