import React, { useCallback, useMemo, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Brush, CalendarDays, Code2, Server, Smartphone, UserRound, type LucideIcon } from 'lucide-react';
import { Project } from '../../types';
import { siteContent } from '../../content';
import { useTheme } from '../../context/ThemeContext';
import { Section } from '../layout/Section';
import { Container } from '../layout/Container';
import { BlurIn } from '../motion/BlurIn';
import { Reveal } from '../motion/Reveal';
import { typography } from '../../lib/typography';
import { cn } from '../../lib/utils';
import { eyebrowChipClass } from '../../lib/chipStyles';
import { GlowButton } from '../ui/GlowButton';
import { ProjectImageViewer } from '../ui/ProjectImageViewer';
import { ProjectTagChips } from '../ui/ProjectTagChips';
import {
  cardReveal,
  contentReveal,
  mediaReveal,
  titleReveal,
} from '../../lib/motion/motionPresets';
import { SectionSequence, useSectionMotion } from '../motion/SectionSequence';

type ViewerImage = {
  src: string;
  alt: string;
  id: string;
};

type StackItem = {
  icon: LucideIcon;
  label: string;
};

type ProjectMetaItemProps = {
  label: string;
  value: string;
  darkMode: boolean;
  icon?: LucideIcon;
  stackItems?: StackItem[];
};

const getStackIcon = (tool: string): LucideIcon => {
  if (/figma/i.test(tool)) return Brush;
  if (/react native|mobile|swift|android|ios/i.test(tool)) return Smartphone;
  if (/node|api|server/i.test(tool)) return Server;
  return Code2;
};

const presentationHeights: Record<string, Record<string, number>> = {
  shipo: {
    '01-hero': 1240, '02-overview': 1454, '03-users-market': 1614, '04-goals-rules': 1654,
    '05-flows': 1474, '06-design-system': 1930, '07-key-decisions': 1350, '08-overview-products': 1774,
    '09-orders-shipments': 1918, '10-setup-team-settings': 1674, '11-warehouse-app': 1834,
    '12-states-edge-cases': 1474, '13-iteration': 1278, '14-outcome': 1154, '15-closing': 1000,
  },
  wayloom: {
    '01-hero': 1240, '02-overview': 1454, '03-persona-promises': 1210, '04-process-structure': 1394,
    '05-design-system': 1546, '06-finding-the-look': 1534, '07-onboarding-discovery': 1350,
    '08-creating-a-trip': 1554, '09-itinerary-stays-budget': 1674, '10-sharing-today-profile': 1514,
    '11-sheets-dialogs-states': 1474, '12-rtl-and-money': 1090, '13-all-screens': 2674,
    '14-outcome': 1010, '15-closing': 1000,
  },
  khazna: {
    '01-hero': 1240, '02-overview': 1230, '03-principles': 1100, '04-design-system': 1290,
    '05-illustration-kit': 1340, '06-onboarding': 1450, '07-home-accounts': 1450, '08-cards-transfers': 1474,
    '09-bills-activity-insights': 1450, '10-savings-rewards-financing': 1594, '11-profile-system': 1414,
    '12-closing': 1000,
  },
};

const getShowcaseDimensions = (src: string): readonly [number, number] => {
  if (src.includes('Home%20Care%20Presentation')) return [3200, 2480];
  if (src.includes('/projects/dawwem/')) {
    if (src.includes('/mobile-')) return [430, 932];
    return src.includes('/dashboard-live.') ? [1600, 1100] : [1440, 1000];
  }
  if (src.includes('/projects/restuhub/')) {
    if (src.includes('/mobile-showcase.')) return [1586, 992];
    return /\/(order-history|support)\./.test(src) ? [1440, 1000] : [1440, 900];
  }
  if (src.includes('/projects/ldun/')) return [1440, 1000];
  const presentation = src.match(/\/projects\/(shipo|wayloom|khazna)\/([^/]+)\.webp$/);
  if (presentation) {
    const folder = presentation[1] ?? '';
    const name = presentation[2] ?? '';
    return [1600, presentationHeights[folder]?.[name] ?? 1000];
  }
  if (src.includes('/projects/ironcore/')) {
    if (src.includes('/dashboard.')) return [1440, 1558];
    if (src.includes('/reports.')) return [1440, 1574];
    if (src.includes('/attendance.')) return [1440, 1213];
    if (src.includes('/members.')) return [1440, 1052];
    return [1440, 1050];
  }
  return [1600, 1000];
};

const ShowcaseImage = ({ src, alt, index }: { src: string; alt: string; index: number }) => {
  const [width, height] = getShowcaseDimensions(src);
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={index === 0 ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={index === 0 ? 'high' : 'low'}
      className="block h-auto w-full"
    />
  );
};

const ProjectMetaItem = ({ label, value, darkMode, icon: Icon, stackItems }: ProjectMetaItemProps) => {
  return (
    <div
      className={cn(
        'flex h-full min-h-[136px] flex-col rounded-panel border p-6 glass sm:min-h-[152px] sm:p-8',
        darkMode ? 'bg-black/40 border-white/10' : 'bg-white/60 border-black/5'
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        {Icon && <Icon className="size-4 text-accent" aria-hidden="true" />}
        <span className={cn(typography.labelXs, typography.textMuted, 'block')}>{label}</span>
      </div>
      {stackItems ? (
        <div className="mt-auto flex flex-wrap gap-2">
          {stackItems.map(({ icon: StackIcon, label: stackLabel }) => (
            <span
              key={stackLabel}
              className={cn(
                'inline-flex items-center gap-2 rounded-mini border px-3 py-1.5',
                darkMode ? 'border-white/10 bg-white/5 text-white' : 'border-black/10 bg-black/5 text-black'
              )}
            >
              <StackIcon className="size-4 text-accent" aria-hidden="true" />
              <span className="text-sm font-semibold">{stackLabel}</span>
            </span>
          ))}
        </div>
      ) : (
        <span className={cn(typography.body, 'mt-auto font-semibold', darkMode ? 'text-white' : 'text-black')}>{value}</span>
      )}
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
    </div>
  );
};

const SequencedGalleryFigure = ({ children }: { children: React.ReactNode }) => {
  const ref = React.useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, mediaReveal.viewport);
  const reduceMotion = useReducedMotion() ?? false;
  const { status } = useSectionMotion();
  const instant = reduceMotion || status === 'skipped';

  return (
    <motion.figure
      ref={ref}
      variants={mediaReveal.variants({ reduceMotion: instant })}
      initial={instant ? false : 'hidden'}
      animate={instant || (status !== 'pending' && isInView) ? 'visible' : 'hidden'}
      className="w-full"
    >
      {children}
    </motion.figure>
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
  const isVibeCodingProject = project.category === 'Vibe Coding';
  const isBehanceStyleGallery = project.slug === 'homecare-medical-app' || project.slug === 'shipo-inventory-shipping' || project.slug === 'wayloom-trip-planner' || project.slug === 'khazna-banking-app' || isVibeCodingProject;
  const reduceMotion = useReducedMotion() ?? false;
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

  const metaItems = useMemo(() => {
    const toolsValue = project.tools.join(' • ');
    return [{
      label: siteContent.projectDetail.metaLabels.role,
      value: project.role,
      icon: isVibeCodingProject ? UserRound : undefined,
    }, {
      label: siteContent.projectDetail.metaLabels.year,
      value: project.year,
      icon: isVibeCodingProject ? CalendarDays : undefined,
    }, {
      label: isVibeCodingProject ? 'Tools and Stack' : siteContent.projectDetail.metaLabels.tools,
      value: toolsValue,
      icon: isVibeCodingProject ? Code2 : undefined,
      stackItems: isVibeCodingProject
        ? project.tools.map((tool) => ({
            label: tool,
            icon: getStackIcon(tool),
          }))
        : undefined,
    }];
  }, [isVibeCodingProject, project.role, project.tools, project.year]);

  return (
    <>
      <ProjectImageViewer
        key={`${project.slug}-${isViewerOpen ? 'open' : 'closed'}-${initialViewerIndex}`}
        images={viewerImages}
        initialIndex={initialViewerIndex}
        projectTitle={project.title}
        projectSubtitle={project.description}
        isOpen={isViewerOpen}
        onClose={closeViewer}
      />

      <Section sequenceImmediate className={cn('pt-28 md:pt-36', isBehanceStyleGallery && 'pb-0')}>
        <div className="text-left space-y-10">
          <div className="space-y-4">
            <BlurIn
              as="span"
              delay={titleReveal.sectionDelay}
              className={cn(
                typography.labelXs,
                isVibeCodingProject ? eyebrowChipClass : 'tracking-[0.3em] text-accent'
              )}
            >
              {project.category}
            </BlurIn>
            <BlurIn as="h1" delay={titleReveal.headingDelay} className={cn(typography.h1Display, 'font-black max-w-[18ch] tracking-normal', darkMode ? 'text-white' : 'text-black')}>
              {project.title}
            </BlurIn>
            <Reveal delay={titleReveal.headingDelay}>
              <p className={cn(typography.body, 'max-w-[60ch] font-medium', typography.textSubtle, darkMode ? 'text-white' : 'text-black')}>{project.description}</p>
            </Reveal>
            {project.livePreviewUrl && (
              <Reveal delay={titleReveal.headingDelay}>
                <GlowButton
                  as="a"
                  href={project.livePreviewUrl}
                  target="_blank"
                  rel="noreferrer"
                  size="cta"
                >
                  {siteContent.projectDetail.livePreviewLabel}
                </GlowButton>
              </Reveal>
            )}
          </div>

          <Reveal
            preset="card"
            staggerChildren
            className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
          >
            {metaItems.map((item) => (
              <motion.div key={item.label} className="h-full" variants={cardReveal.variants({ reduceMotion })}>
                <ProjectMetaItem
                  label={item.label}
                  value={item.value}
                  darkMode={darkMode}
                  icon={item.icon}
                  stackItems={item.stackItems}
                />
              </motion.div>
            ))}
          </Reveal>
        </div>
      </Section>

      {isBehanceStyleGallery ? (
        <section className="relative z-10 pb-0 pt-6 md:pt-8">
          <Container>
            <div className="space-y-0">
              {project.gallery.map((item, index) => (
                <SectionSequence key={`${project.slug}-gallery-${index}`}>
                  <SequencedGalleryFigure>
                    <button
                      type="button"
                      ref={(node) => {
                        galleryTriggerRefs.current[index] = node;
                      }}
                      onClick={(event) => openViewerAt(index, event.currentTarget)}
                      className={cn(
                        'block w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2',
                        index === 0 && 'rounded-t-[16px] sm:rounded-t-[20px] md:rounded-t-[24px]',
                        index === project.gallery.length - 1 && !item.caption && 'rounded-b-[16px] sm:rounded-b-[20px] md:rounded-b-[24px]'
                      )}
                      aria-label={`Open image viewer: ${item.alt}`}
                    >
                      <ShowcaseImage src={item.src} alt={item.alt} index={index} />
                    </button>
                    {item.caption && (
                      <figcaption
                        className={cn(
                          'border-x px-5 py-5 text-left sm:px-7 sm:py-6 md:px-9',
                          index === project.gallery.length - 1 && 'rounded-b-[16px] border-b sm:rounded-b-[20px] md:rounded-b-[24px]',
                          darkMode ? 'border-white/10 bg-white/[0.04] text-white/70' : 'border-black/10 bg-black/[0.035] text-black/65',
                          typography.body
                        )}
                      >
                        {item.caption}
                      </figcaption>
                    )}
                  </SequencedGalleryFigure>
                </SectionSequence>
              ))}
            </div>
          </Container>
        </section>
      ) : (
        <Section eyebrow={siteContent.projectDetail.galleryEyebrow}>
          <Reveal
            preset="media"
            staggerChildren
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {project.gallery.map((item, index) => (
              <motion.div key={`${project.slug}-gallery-${index}`} variants={mediaReveal.variants({ reduceMotion })}>
                <ProjectGalleryItem
                  item={item}
                  darkMode={darkMode}
                  onOpen={(event) => openViewerAt(index, event.currentTarget)}
                />
              </motion.div>
            ))}
          </Reveal>
        </Section>
      )}

      <Section eyebrow={siteContent.projectDetail.caseStudyEyebrow}>
        <Reveal
          staggerChildren
          className="space-y-12 text-left"
        >
          {project.caseStudySections.map((section) => (
            <motion.div key={section.title} className="space-y-3" variants={contentReveal.variants({ reduceMotion })}>
              <h3 className={cn(typography.h3, 'font-black', darkMode ? 'text-white' : 'text-black')}>{section.title}</h3>
              <p className={cn(typography.body, 'max-w-[60ch] font-medium', typography.textSubtle, darkMode ? 'text-white' : 'text-black')}>{section.content}</p>
            </motion.div>
          ))}
        </Reveal>
      </Section>

      <Section eyebrow={siteContent.projectDetail.metricsEyebrow}>
        <Reveal
          staggerChildren
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 text-left"
        >
          {project.metrics.map((metric) => (
            <motion.div key={metric.label} variants={contentReveal.variants({ reduceMotion })}>
              <span className={cn(typography.labelXs, typography.textMuted, 'mb-2 block')}>{metric.label}</span>
              <span className={cn(typography.h3, 'font-black', darkMode ? 'text-white' : 'text-black')}>{metric.value}</span>
            </motion.div>
          ))}
        </Reveal>
      </Section>

      {nextProject && (
        <Section>
          <div className="w-full text-left">
            <BlurIn as="h3" delay={titleReveal.headingDelay} className={cn(typography.h3, 'font-black mb-4 text-white')}>
              Up Next
            </BlurIn>
            <Reveal preset="card" delay={titleReveal.headingDelay}>
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
            </Reveal>
          </div>
        </Section>
      )}
    </>
  );
};
