import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Project } from '../../types';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';
import { GlowButton } from '../ui/GlowButton';
import { stagger, viewportDefaults } from '../../lib/motionTokens';

const ProjectMetaItem = ({ label, value, darkMode }: { label: string; value: string; darkMode: boolean }) => {
  return (
    <div
      className={cn(
        'p-6 sm:p-8 rounded-panel glass border',
        darkMode ? 'bg-black/40 border-white/10' : 'bg-white/60 border-black/5'
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
        'relative aspect-[16/10] rounded-surface overflow-hidden glass border',
        darkMode ? 'bg-black/40 border-white/10' : 'bg-white/60 border-black/5'
      )}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        width={1600}
        height={1000}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
      <Section className="pt-28 md:pt-36">
        <div className="text-left space-y-10">
          <div className="space-y-4">
            <span className={cn(typography.labelXs, 'tracking-[0.3em] text-accent')}>{project.category}</span>
            <h1 className={cn(typography.h1Display, 'font-black max-w-[18ch] tracking-normal', darkMode ? 'text-white' : 'text-black')}>{project.title}</h1>
            <p className={cn(typography.body, 'max-w-[60ch] font-medium', typography.textSubtle, darkMode ? 'text-white' : 'text-black')}>{project.description}</p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={stagger.container(0.1, 0.08)}
            initial="initial"
            whileInView="animate"
            viewport={viewportDefaults}
          >
            {[{
              label: siteContent.projectDetail.metaLabels.role,
              value: project.role
            }, {
              label: siteContent.projectDetail.metaLabels.year,
              value: project.year
            }, {
              label: siteContent.projectDetail.metaLabels.tools,
              value: project.tools.join(' • ')
            }].map((item) => (
              <motion.div key={item.label} variants={stagger.item}>
                <ProjectMetaItem label={item.label} value={item.value} darkMode={darkMode} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      <Section eyebrow={siteContent.projectDetail.galleryEyebrow}>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={stagger.container(0.1, 0.08)}
          initial="initial"
          whileInView="animate"
          viewport={viewportDefaults}
        >
          {project.gallery.map((item, index) => (
            <motion.div key={`${project.slug}-gallery-${index}`} variants={stagger.item}>
              <ProjectGalleryItem item={item} darkMode={darkMode} />
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section eyebrow={siteContent.projectDetail.caseStudyEyebrow}>
        <motion.div
          className="space-y-12 text-left"
          variants={stagger.container(0.1, 0.08)}
          initial="initial"
          whileInView="animate"
          viewport={viewportDefaults}
        >
          {project.caseStudySections.map((section) => (
            <motion.div key={section.title} className="space-y-3" variants={stagger.item}>
              <h3 className={cn(typography.h3, 'font-black', darkMode ? 'text-white' : 'text-black')}>{section.title}</h3>
              <p className={cn(typography.body, 'max-w-[60ch] font-medium', typography.textSubtle, darkMode ? 'text-white' : 'text-black')}>{section.content}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section eyebrow={siteContent.projectDetail.metricsEyebrow}>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 text-left"
          variants={stagger.container(0.1, 0.08)}
          initial="initial"
          whileInView="animate"
          viewport={viewportDefaults}
        >
          {project.metrics.map((metric) => (
            <motion.div key={metric.label} variants={stagger.item}>
              <span className={cn(typography.labelXs, typography.textMuted, 'mb-2 block')}>{metric.label}</span>
              <span className={cn(typography.h3, 'font-black', darkMode ? 'text-white' : 'text-black')}>{metric.value}</span>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {nextProject && (
        <Section>
          <div className="w-full text-left">
            <h3 className={cn(typography.h3, 'font-black mb-4 text-white')}>
              {siteContent.projectDetail.nextProjectLabel}
            </h3>
            <button
              type="button"
              onClick={() => onNextProject(nextProject.slug)}
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
                    src={nextProject.image}
                    alt={nextProject.title}
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
                      {nextProject.category}
                    </span>
                    <span>{nextProject.year}</span>
                    <span>{nextProject.type}</span>
                  </div>
                  <h3 className={cn(typography.h3Display, 'mb-3 group-hover:text-accent transition-colors', darkMode ? 'text-white' : 'text-black')}>
                    {nextProject.title}
                  </h3>
                  <p className={cn(typography.body, 'font-medium line-clamp-2', typography.textSubtle)}>
                    {nextProject.description}
                  </p>
                  <div className="mt-6">
                    <GlowButton size="cta" as="span">
                      {siteContent.projectDetail.nextProjectButton} <ArrowUpRight size={20} />
                    </GlowButton>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </Section>
      )}

      <Section>
        <div className="mx-auto flex w-full max-w-[60ch] flex-col items-start text-left">
          <button
            type="button"
            onClick={onBack}
            className={cn(
              'flex items-center gap-2 hover:opacity-100 hover:text-accent transition-all font-medium group',
              typography.body,
              typography.textSubtle
            )}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {siteContent.projectDetail.backToWorkLabel}
          </button>
        </div>
      </Section>
    </>
  );
};
