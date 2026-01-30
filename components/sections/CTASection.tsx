import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { Reveal } from '../motion/Reveal';
import { BlurIn } from '../motion/BlurIn';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';
import { GlowButton } from '../ui/GlowButton';

export const CTASection = () => {
  const { darkMode } = useTheme();
  const { cal } = siteContent;
  return (
    <Section>
      <div
        className={cn(
          'relative overflow-hidden rounded-surface glass border p-8 sm:p-12 md:p-16',
          darkMode ? 'bg-black/40 border-white/10' : 'bg-white/60 border-black/5'
        )}
      >
        <div className="flex flex-col items-start text-left gap-6">
          <Reveal delay={0.05} className="inline-flex items-center gap-2 px-4 py-2 rounded-mini border border-accent/20 bg-accent/5">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className={cn(typography.labelXs, 'text-accent')}>{siteContent.finalCta.badge}</span>
          </Reveal>
          <BlurIn
            as="h2"
            delay={0.1}
            aria-label={siteContent.finalCta.title}
            className={cn(typography.h2, 'font-black max-w-[24ch]', darkMode ? 'text-white' : 'text-black')}
          >
            {(siteContent.finalCta.titleLines ?? [siteContent.finalCta.title]).map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </BlurIn>
          <Reveal delay={0.2}>
            <p className={cn(typography.body, 'max-w-[60ch] font-medium', typography.textSubtle, darkMode ? 'text-gray-300' : 'text-gray-600')}>
              {siteContent.finalCta.description}
            </p>
          </Reveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <GlowButton
              size="cta"
              calLink={cal.link}
              calNamespace={cal.namespace}
              calConfig={cal.configJson}
            >
              {siteContent.finalCta.primaryLabel} <ArrowUpRight size={20} />
            </GlowButton>
            <a
              href={siteContent.finalCta.secondaryHref}
              className={cn(
                'text-accent hover:text-accent/90 transition-colors font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 rounded-control px-1',
                typography.body
              )}
            >
              {siteContent.finalCta.secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};
