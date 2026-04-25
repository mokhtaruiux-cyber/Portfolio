import React from 'react';
import { motion } from 'motion/react';
import { Project } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { siteContent } from '../../content';
import { transitions } from '../../lib/motionTokens';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';
import { TiltCard } from '../motion/TiltCard';
import { useIsDesktop } from '../../hooks/useMediaQuery';
import { GlowButton } from '../ui/GlowButton';
import { ProjectTagChips } from '../ui/ProjectTagChips';

interface ProjectCardWrapperProps {
  project: Project;
  onClick: (slug: string) => void;
}

const ProjectCardWrapperComponent: React.FC<ProjectCardWrapperProps> = ({ project, onClick }) => {
  const { darkMode } = useTheme();
  const isDesktop = useIsDesktop();

  const cardButton = (
    <button
      type="button"
      onClick={() => onClick(project.slug)}
      className={cn(
        'relative w-full text-left rounded-surface p-6 sm:p-10 md:p-16 lg:p-20 overflow-hidden glass border transition-shadow duration-700 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2',
        darkMode
          ? 'bg-black/90 border-white/10 shadow-[0_0_100px_-20px_rgba(37,99,235,0.1)] focus-visible:ring-offset-[#030303]'
          : 'bg-white/90 border-black/5 shadow-2xl focus-visible:ring-offset-[#fafafa]'
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">
        <div className="order-2 lg:order-1 flex flex-col justify-between h-full text-left">
          <div>
            <div className={cn('flex flex-wrap items-center gap-3 mb-4', typography.labelXs)}>
              <span className="tracking-[0.3em] text-accent">{project.category}</span>
              <span className={cn(typography.textMuted, darkMode ? 'text-white' : 'text-black')}>{project.type}</span>
            </div>
            <h4 className={cn(typography.h1, 'font-black mb-4 sm:mb-8 group-hover:text-accent transition-colors duration-500 max-w-[18ch]', darkMode ? 'text-white' : 'text-black')}>
              {project.title}
            </h4>
            <p className={cn(typography.body, 'font-medium mb-6 sm:mb-10 max-w-3xl', typography.textSubtle, darkMode ? 'text-gray-300' : 'text-gray-600')}>
              {project.description}
            </p>
            <ProjectTagChips tags={project.tags} className="mb-6" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 mb-8 sm:mb-12">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <span className={cn(typography.labelXs, typography.textMuted, 'mb-1 sm:mb-2 block')}>{metric.label}</span>
                  <span className={cn(typography.h3, 'font-black', darkMode ? 'text-white' : 'text-black')}>{metric.value}</span>
                </div>
              ))}
            </div>
            <p className={cn(typography.body, 'font-medium mb-8', typography.textSubtle, darkMode ? 'text-gray-300' : 'text-gray-600')}>
              <span className={cn(typography.labelXs, typography.textMuted, 'tracking-[0.3em] block mb-2')}>{siteContent.projects.impactLabel}</span>
              {project.impact}
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <GlowButton as="span" size="cta">
                {siteContent.featuredWork.viewProjectLabel}
              </GlowButton>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2 relative rounded-surface overflow-hidden group aspect-[16/10] lg:aspect-[4/3.2]">
          <motion.img
            whileHover={{ scale: 1.008 }}
            transition={transitions.smooth}
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            width={1600}
            height={1000}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </button>
  );

  return (
    <div className="w-full flex flex-col items-center">
      {isDesktop ? (
        <TiltCard className="w-full h-full" intensity={5}>
          {cardButton}
        </TiltCard>
      ) : (
        cardButton
      )}
    </div>
  );
};

export const ProjectCardWrapper = React.memo(ProjectCardWrapperComponent);
