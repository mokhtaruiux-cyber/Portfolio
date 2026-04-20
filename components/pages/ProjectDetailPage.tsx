import React, { useCallback, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../../types';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';
import { GlowButton } from '../ui/GlowButton';
import { ProjectImageViewer } from '../ui/ProjectImageViewer';
import { ProjectTagChips } from '../ui/ProjectTagChips';
import { stagger, viewportDefaults } from '../../lib/motionTokens';

type ViewerImage = {
  src: string;
  alt: string;
  id: string;
};

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

const ProjectGalleryItem = ({
  item,
  darkMode,
  onOpen,
}: {
  item: Project['gallery'][number];
  darkMode: boolean;
  onOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <div
      className={cn(
        'relative aspect-[16/10] rounded-surface overflow-hidden glass border',
        darkMode ? 'bg-black/40 border-white/10' : 'bg-white/60 border-black/5'
      )}
    >
      <button
        type="button"
        onClick={onOpen}
        className="block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2"
        aria-label={`Open image viewer: ${item.alt}`}
      >
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          width={1600}
          height={1000}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-full w-full object-cover"
        />
      </button>
      {item.type === 'video' && (
        <div className="pointer-events-none absolute inset-0 bg-black/45 flex items-center justify-center">
          <span className={cn(typography.labelXs, 'tracking-[0.3em] text-white')}>{siteContent.projectDetail.videoLabel}</span>
        </div>
      )}
    </div>
  );
};

export const ProjectDetailPage = ({
  project,
  nextProject,
  onNextProject,
}: {
  project: Project;
  nextProject?: Project;
  onNextProject: (slug: string) => void;
}) => {
  const { darkMode } = useTheme();
  const isBehanceStyleGallery = project.slug === 'homecare-medical-app';
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [initialViewerIndex, setInitialViewerIndex] = useState(0);
  const galleryTriggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const viewerImages = useMemo<ViewerImage[]>(
    () =>
      project.gallery.map((item, index) => ({
        src: item.src,
        alt: item.alt,
        id: `${project.slug}-image-${index}`,
      })),
    [project.gallery, project.slug]
  );

  const openViewerAt = useCallback((index: number, trigger: HTMLButtonElement | null) => {
    galleryTriggerRefs.current[index] = trigger;
    setInitialViewerIndex(index);
    setIsViewerOpen(true);
  }, []);

  const closeViewer = useCallback(() => {
    setIsViewerOpen(false);
  }, []);

  return (
    <>
      <ProjectImageViewer
        key={`${project.slug}-${isViewerOpen ? initialViewerIndex : 'closed'}`}
        images={viewerImages}
        initialIndex={initialViewerIndex}
        projectTitle={project.title}
        projectSubtitle={project.description}
        isOpen={isViewerOpen}
        onClose={closeViewer}
      />

      <Section className={cn('pt-28 md:pt-36', isBehanceStyleGallery && 'pb-0')}>
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

      {isBehanceStyleGallery ? (
        <Section className="pb-0 pt-6 md:pt-8">
          <motion.div
            className="space-y-0"
            variants={stagger.container(0.1, 0.08)}
            initial="initial"
            whileInView="animate"
            viewport={viewportDefaults}
          >
            {project.gallery.map((item, index) => (
              <motion.div key={`${project.slug}-gallery-${index}`} variants={stagger.item} className="w-full">
                <button
                  type="button"
                  ref={(node) => {
                    galleryTriggerRefs.current[index] = node;
                  }}
                  onClick={(event) => openViewerAt(index, event.currentTarget)}
                  className={cn(
                    'block w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2',
                    index === 0 && 'rounded-t-[16px] sm:rounded-t-[20px] md:rounded-t-[24px]',
                    index === project.gallery.length - 1 && 'rounded-b-[16px] sm:rounded-b-[20px] md:rounded-b-[24px]'
                  )}
                  aria-label={`Open image viewer: ${item.alt}`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full"
                  />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </Section>
      ) : (
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
                <ProjectGalleryItem
                  item={item}
                  darkMode={darkMode}
                  onOpen={(event) => openViewerAt(index, event.currentTarget)}
                />
              </motion.div>
            ))}
          </motion.div>
        </Section>
      )}

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
              Up Next
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
              <div className="flex w-full flex-col items-stretch gap-4 p-4 sm:gap-6 sm:p-8 md:flex-row">
                <div
                  className={cn(
                    "w-full aspect-[16/10] rounded-mini overflow-hidden border flex-shrink-0 md:w-[42%] md:max-w-[45%] md:aspect-auto md:self-stretch",
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
                <div className="flex min-w-0 flex-1 flex-col md:justify-between">
                  <div className="space-y-3">
                    <ProjectTagChips tags={nextProject.tags} className="mb-1" />
                    <h3 className={cn(typography.h3Display, 'mb-2 line-clamp-2 group-hover:text-accent transition-colors sm:mb-3', darkMode ? 'text-white' : 'text-black')}>
                      {nextProject.title}
                    </h3>
                    <p className={cn(typography.body, 'font-medium line-clamp-3', typography.textSubtle)}>
                      {nextProject.description}
                    </p>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <GlowButton size="cta" as="span">
                      {siteContent.projectDetail.nextProjectButton}
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
