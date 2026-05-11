'use client';

import React, { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLenis } from 'lenis/react';
import { usePathname, useRouter } from 'next/navigation';

import { siteContent } from '../content';
import { PageKey } from '../types';
import { pageTransitionVariants } from '../lib/motion';
import { sectionPacing } from '../lib/motionTokens';
import { titleReveal } from '../lib/motion/motionPresets';
import { applySeoToDocument, buildRuntimeSeo } from '../lib/seo';
import { typography } from '../lib/typography';
import { cn } from '../lib/utils';

import { LivingBackground } from './background/LivingBackground';
import { ScrollProgress } from './motion/ScrollProgress';
import { AnimatedSection } from './motion/AnimatedSection';
import { BlurIn } from './motion/BlurIn';
import { StackedCards } from './motion/StackedCards';
import { fadeUp } from '../lib/motion/variants';

import { Section } from './layout/Section';
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
import { PageIntro } from './layout/PageIntro';
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

export function PortfolioApp() {
  const lenis = useLenis();
  const router = useRouter();
  const pathname = normalizePathname(usePathname());

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
    const featuredSlug = 'homecare-medical-app';
    const featuredProject = siteContent.projects.items.find((project) => project.slug === featuredSlug);
    if (!featuredProject) return siteContent.projects.items;

    return [
      featuredProject,
      ...siteContent.projects.items.filter((project) => project.slug !== featuredSlug),
    ];
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

  useEffect(() => {
    const key = `scrollY:${pathname}`;
    let restored = false;
    const scrollToPosition = (value: number) => {
      if (lenis) {
        lenis.scrollTo(value, { immediate: true });
        return;
      }
      document.documentElement.scrollTop = value;
      document.body.scrollTop = value;
    };
    try {
      const storedY = window.sessionStorage.getItem(key);
      if (storedY !== null) {
        const y = Number.parseInt(storedY, 10);
        if (!Number.isNaN(y)) {
          scrollToPosition(y);
          restored = true;
        }
        window.sessionStorage.removeItem(key);
      }
    } catch {
      // Ignore storage errors.
    }
    if (!restored) {
      scrollToPosition(0);
    }
  }, [lenis, pathname]);

  useEffect(() => {
    const key = `scrollY:${pathname}`;
    const handleBeforeUnload = () => {
      try {
        window.sessionStorage.setItem(key, String(lenis?.scroll ?? window.scrollY));
      } catch {
        // Ignore storage errors.
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [lenis, pathname]);

  const scrollToElement = useCallback((target: HTMLElement | null, duration = 0.75) => {
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { duration });
      return;
    }
    target.scrollIntoView({ behavior: 'auto', block: 'start' });
  }, [lenis]);

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
        scrollToElement(target, 0.75);
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
      <Hero onWorkClick={() => scrollToElement(document.getElementById('work'), 0.75)} />
      <CompaniesLogos />
      <AboutSection />
      <HowIHelpSection />
      <ExperienceSection />
      <ProcessReelSection />
      <Section id="work" eyebrow={siteContent.featuredWork.eyebrow} reveal={false}>
        <AnimatedSection amount={0.1}>
          {/* Title */}
          <motion.div variants={fadeUp} className="mb-10 text-left">
            <BlurIn
              as="h2"
              delay={titleReveal.headingDelay}
              className={cn('font-black tracking-tighter text-4xl sm:text-5xl', darkMode ? 'text-white' : 'text-black')}
            >
              {siteContent.featuredWork.title}
              {siteContent.featuredWork.highlight && (
                <>
                  <br />
                  <span className="text-accent">{siteContent.featuredWork.highlight}</span>
                </>
              )}
            </BlurIn>
          </motion.div>

          {/* Filter tabs */}
          <motion.div variants={fadeUp} className="sticky top-28 sm:top-32 z-40 mb-8 py-2 pointer-events-none">
            <div className="pointer-events-auto flex justify-start">
              <SegmentTabs
                tabs={workFilters.map((item) => item.label)}
                activeTab={filter}
                onChange={setFilter}
              />
            </div>
          </motion.div>

          {/* Cards grid */}
          <motion.div variants={fadeUp}>
            <StackedCards
              items={filteredProjects}
              renderItem={(project) => (
                <ProjectCardWrapper project={project} onClick={handleProjectClick} />
              )}
            />
          </motion.div>
        </AnimatedSection>
      </Section>
      <BlogSection onPostClick={handleBlogClick} />
      <TestimonialsSection />
    </>
  );

  const workElement = (
    <Section className="pb-8 pt-32 md:pb-10 md:pt-36" eyebrow={siteContent.featuredWork.archive.eyebrow}>
      <PageIntro
        title="The"
        highlight="Archive."
        description="A full index of selected case studies, systems, and product work across apps, websites, and service platforms."
        darkMode={darkMode}
        className="mb-10"
      />

      <div className="sticky top-28 sm:top-32 z-40 mb-8 py-2 pointer-events-none">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="pointer-events-auto flex justify-start"
        >
          <SegmentTabs
            tabs={workFilters.map((item) => item.label)}
            activeTab={filter}
            onChange={setFilter}
          />
        </motion.div>
      </div>

      <StackedCards
        items={filteredProjects}
        renderItem={(project) => (
          <ProjectCardWrapper project={project} onClick={handleProjectClick} />
        )}
      />
    </Section>
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
