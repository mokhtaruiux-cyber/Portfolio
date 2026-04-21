import React from 'react';

import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';
import { Section } from '../layout/Section';
import { GlowButton } from '../ui/GlowButton';
import { PageIntro } from '../layout/PageIntro';

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
    <Section className="pb-6 pt-28 md:pt-32" eyebrow="404">
      <div className="max-w-4xl text-left">
        <PageIntro
          eyebrow="Page not found"
          title="The page you requested does not exist."
          description=""
          darkMode={darkMode}
          className="max-w-4xl"
        />
        <p className={cn(typography.body, 'mt-6 max-w-[60ch] text-pretty', darkMode ? 'text-white/70' : 'text-black/70')}>
          The URL <span className={cn('font-semibold', darkMode ? 'text-white' : 'text-black')}>{pathname}</span> does not map to a live page in this portfolio. Use one of the routes below to continue browsing.
        </p>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap">
          <GlowButton glow={false} onClick={onGoHome}>Back Home</GlowButton>
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
