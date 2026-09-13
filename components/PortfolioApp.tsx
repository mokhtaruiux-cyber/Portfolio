'use client';

import React, { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

import { siteContent } from '../content';
import { PageKey } from '../types';
import { pageTransitionVariants } from '../lib/motion';
import { eyebrowChipClass } from '../lib/chipStyles';
import { applySeoToDocument, buildRuntimeSeo } from '../lib/seo';
import { typography } from '../lib/typography';
import { cn } from '../lib/utils';

import { LivingBackground } from './background/LivingBackground';
import { ScrollProgress } from './motion/ScrollProgress';
import { StackedCards } from './motion/StackedCards';
import { TitleReveal } from './motion/TitleReveal';
import { reveal } from '../lib/motion/presets';
import { sectionOrchestrator } from '../lib/motion/variants';
import { motionTokens as t } from '../lib/motion/tokens';

import { SegmentTabs } from './ui/SegmentTabs';

import { AboutSection } from './sections/AboutSection';
import { CompaniesLogos } from './sections/CompaniesLogos';
import { ExperienceSection } from './sections/Experience';
import { ProcessReelSection } from './sections/ProcessReelSection';
import { HowIHelpSection } from './sections/HowIHelpSection';
import { CTASection } from './sections/CTASection';
import { Hero } from './sections/Hero';
import { BlogSection } from './sections/BlogSection';
import { TestimonialsSection } from './sections/TestimonialsSection';

import { ProjectCardWrapper } from './cards/ProjectCardWrapper';
import { GlowButton } from './ui/GlowButton';
import { Navbar } from './layout/Navbar';
import { Footer } from './layout/Footer';
import { ThemeProvider } from '../context/ThemeContext';
import { ErrorBoundary } from './ErrorBoundary';
import { NotFoundPage } from './pages/NotFoundPage';

const pageToPath = (page: PageKey, slug = '') => {
  switch (page) {
    case 'work':
      return '/projects';
    case 'project-details':
      return slug ? `/projects/${slug}` : '/projects';
    case 'blog':
      return '/blog';
    case 'blog-details':
      return slug ? `/blog/${slug}` : '/blog';
    case 'about':
      return '/about';
    case 'not-found':
      return '/';
    case 'home':
    default:
      return '/';
  }
};

const BlogIndexPage = lazy(async () => {
  const module = await import('./pages/BlogIndexPage');
  return { default: module.BlogIndexPage };
});

const BlogArticlePage = lazy(async () => {
  const module = await import('./pages/BlogArticlePage');
  return { default: module.BlogArticlePage };
});

const ProjectDetailPage = lazy(async () => {
  const module = await import('./pages/ProjectDetailPage');
  return { default: module.ProjectDetailPage };
});

const normalizePathname = (value: string | null) => {
  if (!value) return '/';
  const withoutTrailingSlash = value.length > 1 ? value.replace(/\/+$/, '') : value;
  return withoutTrailingSlash || '/';
};

interface ProjectFilterBarProps {
  tabs: string[];
  activeTab: string;
  darkMode: boolean;
  onChange: (tab: string) => void;
  action?: React.ReactNode;
}

const ProjectFilterBar = ({ tabs, activeTab, darkMode, onChange, action }: ProjectFilterBarProps) => (
  <div className="sticky top-28 sm:top-32 z-floating mb-8 py-2 pointer-events-none">
    <span
      aria-hidden="true"
      data-project-filter-mask=""
      className={cn(
        'pointer-events-none absolute inset-x-[-1rem] -top-28 bottom-0 z-0 sm:inset-x-[-1.5rem] sm:-top-32 lg:inset-x-[-2.5rem]',
        darkMode ? 'bg-[#030303]' : 'bg-[#fafafa]'
      )}
    />
    <motion.div
      {...reveal.cta}
      className="relative z-10 flex flex-col items-start gap-3 pointer-events-auto sm:flex-row sm:items-center sm:justify-between"
    >
      <SegmentTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={onChange}
      />
      {action && <div className="shrink-0">{action}</div>}
    </motion.div>
  </div>
);

export function PortfolioApp() {
  const router = useRouter();
  const pathname = normalizePathname(usePathname());
  const reduceMotion = useReducedMotion();
  const homeWorkTriggerRef = useRef<HTMLSpanElement | null>(null);
  const workPageTriggerRef = useRef<HTMLSpanElement | null>(null);
  const [homeWorkInView, setHomeWorkInView] = useState(false);
  const [workPageInView, setWorkPageInView] = useState(false);

  const [hasManualTheme, setHasManualTheme] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const projectDetailMatch = pathname.match(/^\/projects\/([^/]+)$/);
  const blogDetailMatch = pathname.match(/^\/blog\/([^/]+)$/);
  const workMatch = pathname === '/projects';
  const blogMatch = pathname === '/blog';
  const aboutMatch = pathname === '/about';
  const homeMatch = pathname === '/';

  const routePage: PageKey = projectDetailMatch
    ? 'project-details'
    : blogDetailMatch
      ? 'blog-details'
      : workMatch
        ? 'work'
        : blogMatch
          ? 'blog'
          : aboutMatch
            ? 'about'
            : homeMatch
              ? 'home'
              : 'not-found';

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      try {
        const stored = window.localStorage.getItem('theme');
        if (stored === 'dark' || stored === 'light') {
          setHasManualTheme(true);
          setDarkMode(stored === 'dark');
          return;
        }
        setHasManualTheme(false);
        setDarkMode(window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? true);
      } catch {
        setHasManualTheme(true);
        setDarkMode(true);
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const workFilters = siteContent.featuredWork.filters;
  const allProjectsFilter = workFilters[0];
  const [filter, setFilter] = useState(allProjectsFilter?.label ?? '');
  const orderedProjects = useMemo(() => {
    return siteContent.projects.items;
  }, []);

  useEffect(() => {
    // toggle dark mode without wiping other classes (like overflow-x-hidden)
    if (darkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
    if (!hasManualTheme) return;
    try {
      window.localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    } catch {
      // Ignore storage errors.
    }
  }, [darkMode, hasManualTheme]);

  useEffect(() => {
    if (hasManualTheme) return;
    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!media) return;
    const handler = (event: MediaQueryListEvent) => setDarkMode(event.matches);
    if (media.addEventListener) {
      media.addEventListener('change', handler);
      return () => media.removeEventListener('change', handler);
    }
    media.addListener(handler);
    return () => media.removeListener(handler);
  }, [hasManualTheme]);

  useLayoutEffect(() => {
    let frameId = 0;
    let timeoutId = 0;
    const scrollToPosition = (value: number) => {
      window.scrollTo({ top: value, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = value;
      document.body.scrollTop = value;
    };
    const forceTop = () => {
      scrollToPosition(0);
      frameId = window.requestAnimationFrame(() => scrollToPosition(0));
      timeoutId = window.setTimeout(() => scrollToPosition(0), 120);
    };

    // Every route is a new screen: start at the top on desktop and mobile.
    // In-page section navigation is applied separately through scrollToSection.
    try {
      window.history.scrollRestoration = 'manual';
    } catch {
      // Ignore browser history API restrictions.
    }
    forceTop();
    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [pathname]);

  const scrollToElement = useCallback((target: HTMLElement | null) => {
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    if (routePage !== 'home') return;
    let targetId: string | null = null;
    try {
      targetId = window.sessionStorage.getItem('scrollToSection');
    } catch {
      targetId = null;
    }
    if (!targetId) return;
    let attempts = 0;
    const maxAttempts = 100;
    const intervalId = window.setInterval(() => {
      const target = document.getElementById(targetId);
      if (target) {
        scrollToElement(target);
        try {
          window.sessionStorage.removeItem('scrollToSection');
        } catch {
          // Ignore storage errors.
        }
        window.clearInterval(intervalId);
        return;
      }
      attempts += 1;
      if (attempts >= maxAttempts) {
        try {
          window.sessionStorage.removeItem('scrollToSection');
        } catch {
          // Ignore storage errors.
        }
        window.clearInterval(intervalId);
      }
    }, 100);
    return () => {
      window.clearInterval(intervalId);
    };
  }, [routePage, scrollToElement]);

  const navigateTo = useCallback((page: PageKey, slug = '') => {
    router.push(pageToPath(page, slug));
  }, [router]);

  const handleSetDarkMode = useCallback<React.Dispatch<React.SetStateAction<boolean>>>((value) => {
    setHasManualTheme(true);
    setDarkMode((prev) => {
      const next = typeof value === 'function' ? value(prev) : value;
      try {
        window.localStorage.setItem('theme', next ? 'dark' : 'light');
      } catch {
        // Ignore storage errors.
      }
      return next;
    });
  }, [setDarkMode, setHasManualTheme]);

  const handleProjectClick = useCallback((slug: string) => {
    navigateTo('project-details', slug);
  }, [navigateTo]);

  const handleBlogClick = useCallback((slug: string) => {
    navigateTo('blog-details', slug);
  }, [navigateTo]);

  const filteredProjects = useMemo(() => {
    const activeFilter = workFilters.find((item) => item.label === filter);
    if (!activeFilter || !allProjectsFilter || activeFilter.category === allProjectsFilter.category) {
      return orderedProjects;
    }
    const filtered = orderedProjects.filter((project) => project.category === activeFilter.category);
    return filtered.length > 0 ? filtered : orderedProjects;
  }, [filter, workFilters, allProjectsFilter, orderedProjects]);

  const homeProjects = useMemo(
    () => orderedProjects.filter((project) => project.category === 'Vibe Coding'),
    [orderedProjects]
  );

  const projectSlug = projectDetailMatch?.[1] ?? '';
  const blogSlug = blogDetailMatch?.[1] ?? '';

  const activeProject = useMemo(
    () => orderedProjects.find((project) => project.slug === projectSlug),
    [projectSlug, orderedProjects]
  );
  const activePost = useMemo(
    () => siteContent.writing.items.find((post) => post.slug === blogSlug),
    [blogSlug]
  );
  const nextProject = useMemo(() => {
    if (!activeProject) return undefined;
    const index = orderedProjects.findIndex((project) => project.slug === activeProject.slug);
    if (index === -1) return undefined;
    return orderedProjects[(index + 1) % orderedProjects.length];
  }, [activeProject, orderedProjects]);
  const nextPost = useMemo(() => {
    if (!activePost) return undefined;
    if (siteContent.writing.items.length < 2) return undefined;
    const index = siteContent.writing.items.findIndex((post) => post.slug === activePost.slug);
    if (index === -1) return undefined;
    return siteContent.writing.items[(index + 1) % siteContent.writing.items.length];
  }, [activePost]);

  const currentPage: PageKey =
    (routePage === 'project-details' && !activeProject) || (routePage === 'blog-details' && !activePost)
      ? 'not-found'
      : routePage;

  const seo = useMemo(() => {
    return buildRuntimeSeo({
      currentPage,
      activeProject,
      activePost,
      path: pathname,
    });
  }, [activePost, activeProject, currentPage, pathname]);

  useEffect(() => {
    applySeoToDocument(seo);
  }, [seo]);

  useEffect(() => {
    if (reduceMotion || homeWorkInView || currentPage !== 'home') return;
    const node = homeWorkTriggerRef.current;
    if (!node) return;
    let frameId = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setHomeWorkInView(true);
      observer.disconnect();
    }, { threshold: t.threshold });
    const revealIfVisible = () => {
      const rect = node.getBoundingClientRect();
      if (rect.top >= window.innerHeight || rect.bottom <= 0) return;
      setHomeWorkInView(true);
      observer.disconnect();
      window.removeEventListener('scroll', revealIfVisible);
      window.removeEventListener('resize', revealIfVisible);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
    observer.observe(node);
    window.addEventListener('scroll', revealIfVisible, { passive: true });
    window.addEventListener('resize', revealIfVisible, { passive: true });
    frameId = window.requestAnimationFrame(revealIfVisible);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', revealIfVisible);
      window.removeEventListener('resize', revealIfVisible);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [currentPage, homeWorkInView, reduceMotion]);

  useEffect(() => {
    if (reduceMotion || workPageInView || currentPage !== 'work') return;
    const node = workPageTriggerRef.current;
    if (!node) return;
    let frameId = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setWorkPageInView(true);
      observer.disconnect();
    }, { threshold: t.threshold });
    const revealIfVisible = () => {
      const rect = node.getBoundingClientRect();
      if (rect.top >= window.innerHeight || rect.bottom <= 0) return;
      setWorkPageInView(true);
      observer.disconnect();
      window.removeEventListener('scroll', revealIfVisible);
      window.removeEventListener('resize', revealIfVisible);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
    observer.observe(node);
    window.addEventListener('scroll', revealIfVisible, { passive: true });
    window.addEventListener('resize', revealIfVisible, { passive: true });
    frameId = window.requestAnimationFrame(revealIfVisible);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', revealIfVisible);
      window.removeEventListener('resize', revealIfVisible);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [currentPage, reduceMotion, workPageInView]);

  const routeAnnouncement = useMemo(() => {
    if (activeProject) return `Project ${activeProject.title} page loaded`;
    if (activePost) return `Article ${activePost.title} page loaded`;
    if (currentPage === 'work') return 'Work page loaded';
    if (currentPage === 'blog') return 'Blog page loaded';
    if (currentPage === 'about') return 'About page loaded';
    if (currentPage === 'not-found') return 'Page not found';
    return 'Home page loaded';
  }, [activePost, activeProject, currentPage]);

  const homeElement = (
    <>
      <Hero onWorkClick={() => scrollToElement(document.getElementById('work'))} />
      <CompaniesLogos />
      <AboutSection />
      <HowIHelpSection />
      <ExperienceSection />
      <ProcessReelSection />
      <motion.section
        id="work"
        viewport={{ once: true, amount: 'some' }}
        onViewportEnter={() => setHomeWorkInView(true)}
        variants={reduceMotion ? undefined : sectionOrchestrator}
        initial={reduceMotion ? undefined : 'hidden'}
        animate={reduceMotion ? undefined : homeWorkInView ? 'visible' : 'hidden'}
        className="py-20 md:py-24 relative z-10 scroll-mt-28 sm:scroll-mt-32 mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-10"
      >
            <span ref={homeWorkTriggerRef} className="absolute left-0 top-0 h-px w-px" aria-hidden="true" />
            <motion.p {...reveal.body} className={cn(typography.labelXs, eyebrowChipClass, 'relative z-overlay mb-4 sm:mb-6')}>
              {siteContent.featuredWork.eyebrow}
            </motion.p>

            <TitleReveal
              as="h2"
              className={cn('relative z-overlay font-black tracking-tighter text-4xl sm:text-5xl mb-10 text-left', darkMode ? 'text-white' : 'text-black')}
            >
              {siteContent.featuredWork.title}
              {siteContent.featuredWork.highlight && (
                <>
                  {' '}
                  <span className="text-accent">{siteContent.featuredWork.highlight}</span>
                </>
              )}
            </TitleReveal>

            <ProjectFilterBar
              tabs={workFilters.map((item) => item.label)}
              activeTab={filter}
              darkMode={darkMode}
              onChange={setFilter}
              action={(
                <GlowButton onClick={() => navigateTo('work')} size="cta" glow={false}>
                  View All Work
                </GlowButton>
              )}
            />

            <motion.div {...reveal.cardGrid}>
              <StackedCards
                orchestrated
                items={homeProjects}
                renderItem={(project) => (
                  <ProjectCardWrapper project={project} onClick={handleProjectClick} />
                )}
              />
            </motion.div>
      </motion.section>
      <BlogSection onPostClick={handleBlogClick} />
      <TestimonialsSection />
    </>
  );

  const workElement = (
    <motion.section
      viewport={{ once: true, amount: 'some' }}
      onViewportEnter={() => setWorkPageInView(true)}
      variants={reduceMotion ? undefined : sectionOrchestrator}
      initial={reduceMotion ? undefined : 'hidden'}
      animate={reduceMotion ? undefined : workPageInView ? 'visible' : 'hidden'}
      className="pb-8 pt-32 md:pb-10 md:pt-36 relative z-10 scroll-mt-28 sm:scroll-mt-32 mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-10"
    >
          <span ref={workPageTriggerRef} className="absolute left-0 top-0 h-px w-px" aria-hidden="true" />
          <motion.p {...reveal.body} className={cn(typography.labelXs, eyebrowChipClass, 'relative z-overlay mb-4')}>
            {siteContent.featuredWork.archive.eyebrow}
          </motion.p>
          <TitleReveal
            as="h1"
            aria-label={siteContent.featuredWork.archive.title}
            className={cn(
              typography.h1,
              'relative z-overlay max-w-[18ch] text-balance font-black',
              darkMode ? 'text-white' : 'text-black'
            )}
          >
            The
            {' '}
            <span className="text-accent">Archive.</span>
          </TitleReveal>
          <motion.p
            {...reveal.body}
            className={cn(
              typography.body,
              'relative z-overlay mt-6 mb-10 max-w-2xl text-pretty font-medium',
              darkMode ? 'text-white/70' : 'text-black/65'
            )}
          >
            A full index of selected case studies, systems, and product work across apps, websites, and service platforms.
          </motion.p>

          <ProjectFilterBar
            tabs={workFilters.map((item) => item.label)}
            activeTab={filter}
            darkMode={darkMode}
            onChange={setFilter}
          />

          <motion.div {...reveal.cardGrid}>
            <StackedCards
              orchestrated
              items={filteredProjects}
              renderItem={(project) => (
                <ProjectCardWrapper project={project} onClick={handleProjectClick} />
              )}
            />
          </motion.div>
    </motion.section>
  );

  const aboutElement = (
    <div>
      <AboutSection />
      <TestimonialsSection />
    </div>
  );

  const notFoundElement = (
    <NotFoundPage
      pathname={pathname}
      darkMode={darkMode}
      onGoHome={() => navigateTo('home')}
      onViewWork={() => navigateTo('work')}
      onReadBlog={() => navigateTo('blog')}
    />
  );

  const routeElement =
    currentPage === 'home'
      ? homeElement
      : currentPage === 'work'
        ? workElement
        : currentPage === 'project-details' && activeProject
          ? (
            <ProjectDetailPage
              project={activeProject}
              nextProject={nextProject}
              onNextProject={handleProjectClick}
            />
          )
          : currentPage === 'blog'
            ? <BlogIndexPage onPostClick={handleBlogClick} />
            : currentPage === 'blog-details' && activePost
              ? (
                <BlogArticlePage
                  post={activePost}
                  nextPost={nextPost}
                  onNextPost={handleBlogClick}
                />
              )
              : currentPage === 'about'
                ? aboutElement
                : notFoundElement;

  return (
    <ThemeProvider value={{ darkMode, setDarkMode: handleSetDarkMode }}>
      <div className={cn('min-h-screen transition-colors duration-1000 selection:bg-blue-600 selection:text-white pb-[env(safe-area-inset-bottom)]', darkMode ? 'bg-[#030303] text-white' : 'bg-[#fafafa] text-black')}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-top focus:rounded-control focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
        >
          Skip to main content
        </a>
        <span className="sr-only" aria-live="polite">{routeAnnouncement}</span>
        <ScrollProgress />
        <LivingBackground />
        <Navbar currentPage={currentPage} onNavigate={navigateTo} />

        <main id="main-content" className="relative">
          <ErrorBoundary>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={pathname}
                variants={pageTransitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Suspense
                  fallback={(
                    <section className="min-h-[60vh] w-full px-6 py-24 sm:px-10" aria-busy="true" aria-live="polite">
                      <p className={cn(typography.body, darkMode ? 'text-white/70' : 'text-black/70')}>Loading page...</p>
                    </section>
                  )}
                >
                  {routeElement}
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </ErrorBoundary>
          {currentPage !== 'blog-details' && <CTASection />}
        </main>
        <Footer
          currentPage={currentPage}
          onNavigate={navigateTo}
          spacing={currentPage === 'home' || currentPage === 'blog-details' ? 'expanded' : currentPage === 'work' || currentPage === 'blog' || currentPage === 'not-found' ? 'compact' : 'default'}
        />
      </div>
    </ThemeProvider>
  );
}
