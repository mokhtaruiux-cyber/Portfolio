import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Project } from '../../types';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';
import { GlowButton } from '../ui/GlowButton';

const ProjectMetaItem = ({ label, value, darkMode }: { label: string; value: string; darkMode: boolean }) => {
  return (
    <div
      className={cn(
        'p-6 sm:p-8 rounded-[16px] glass border',
        darkMode ? 'bg-black/40 border-white/5' : 'bg-white/60 border-black/5'
      )}
    >
      <span className={cn(typography.labelXs, typography.textMuted, 'mb-2 block')}>{label}</span>
      <span className={cn(typography.body, 'font-semibold', darkMode ? 'text-white' : 'text-black')}>{value}</span>
    </div>
  );
};

const ProjectGalleryItem = ({ item, darkMode }: { item: Project['gallery'][number]; darkMode: boolean }) => {
  return (
    <div
      className={cn(
        'relative aspect-[16/10] rounded-[16px] overflow-hidden glass border',
        darkMode ? 'bg-black/40 border-white/5' : 'bg-white/60 border-black/5'
      )}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />
      {item.type === 'video' && (
        <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
          <span className={cn(typography.labelXs, 'tracking-[0.3em] text-white')}>{siteContent.projectDetail.videoLabel}</span>
        </div>
      )}
    </div>
  );
};

export const ProjectDetailPage = ({
  project,
  nextProject,
  onBack,
  onNextProject,
}: {
  project: Project;
  nextProject?: Project;
  onBack: () => void;
  onNextProject: (slug: string) => void;
}) => {
  const { darkMode } = useTheme();
  return (
    <>
      <button
        type="button"
        onClick={onBack}
        className={cn(
          'fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[70] px-4 py-2 rounded-[4px] glass border shadow-lg transition-all',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
          darkMode ? 'bg-black/70 border-white/10 text-white hover:border-white/30' : 'bg-white/80 border-black/10 text-black hover:border-black/30',
          typography.labelSm
        )}
        aria-label={siteContent.projectDetail.backToWorkLabel}
      >
        {siteContent.projectDetail.backToWorkLabel}
      </button>
      <Section>
        <div className="text-left space-y-10">
          <button onClick={onBack} className={cn('flex items-center gap-2 hover:opacity-100 hover:text-blue-500 transition-all font-medium group', typography.body, typography.textSubtle)}>
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {siteContent.projectDetail.backToWorkLabel}
          </button>

          <div className="space-y-4">
            <span className={cn(typography.labelXs, 'tracking-[0.3em] text-blue-500')}>{project.category}</span>
            <h1 className={cn(typography.h1Display, 'font-black max-w-[18ch]', darkMode ? 'text-white' : 'text-black')}>{project.title}</h1>
            <p className={cn(typography.body, 'max-w-[60ch] font-medium', typography.textSubtle, darkMode ? 'text-white' : 'text-black')}>{project.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <ProjectMetaItem label={siteContent.projectDetail.metaLabels.role} value={project.role} darkMode={darkMode} />
            <ProjectMetaItem label={siteContent.projectDetail.metaLabels.year} value={project.year} darkMode={darkMode} />
            <ProjectMetaItem label={siteContent.projectDetail.metaLabels.tools} value={project.tools.join(' • ')} darkMode={darkMode} />
          </div>
        </div>
      </Section>

      <Section eyebrow={siteContent.projectDetail.galleryEyebrow}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {project.gallery.map((item, index) => (
            <ProjectGalleryItem key={`${project.slug}-gallery-${index}`} item={item} darkMode={darkMode} />
          ))}
        </div>
      </Section>

      <Section eyebrow={siteContent.projectDetail.caseStudyEyebrow}>
        <div className="space-y-12 text-left">
          {project.caseStudySections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h3 className={cn(typography.h3, 'font-black', darkMode ? 'text-white' : 'text-black')}>{section.title}</h3>
              <p className={cn(typography.body, 'max-w-[60ch] font-medium', typography.textSubtle, darkMode ? 'text-white' : 'text-black')}>{section.content}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow={siteContent.projectDetail.metricsEyebrow}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 text-left">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <span className={cn(typography.labelXs, typography.textMuted, 'mb-2 block')}>{metric.label}</span>
              <span className={cn(typography.h3, 'font-black', darkMode ? 'text-white' : 'text-black')}>{metric.value}</span>
            </div>
          ))}
        </div>
      </Section>

      {nextProject && (
        <Section>
          <div
            className={cn(
              'p-8 sm:p-12 rounded-[16px] glass border flex flex-col items-start gap-6',
              darkMode ? 'bg-black/40 border-white/10' : 'bg-white/60 border-black/10'
            )}
          >
            <span className={cn(typography.labelXs, typography.textMuted)}>{siteContent.projectDetail.nextProjectLabel}</span>
            <h3 className={cn(typography.h2, 'font-black max-w-[24ch]', darkMode ? 'text-white' : 'text-black')}>
              {nextProject.title}
            </h3>
            <GlowButton size="cta" onClick={() => onNextProject(nextProject.slug)}>
              {siteContent.projectDetail.nextProjectButton} <ArrowUpRight size={20} />
            </GlowButton>
          </div>
        </Section>
      )}
    </>
  );
};
