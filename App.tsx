import React, { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLenis } from 'lenis/react';
import { Route, Routes, useLocation, useMatch, useNavigate } from 'react-router-dom';

import { siteContent } from './content';
import { PageKey } from './types';
import { pageTransitionVariants } from './lib/motion';
import { sectionPacing } from './lib/motionTokens';
import { applySeoToDocument, buildRuntimeSeo } from './lib/seo';
import { typography } from './lib/typography';
import { cn } from './lib/utils';

import { LivingBackground } from './components/background/LivingBackground';
import { ScrollProgress } from './components/motion/ScrollProgress';
import { Reveal } from './components/motion/Reveal';
import { SectionTitle } from './components/motion/SectionTitle';
import { StackedCards } from './components/motion/StackedCards';

import { Section } from './components/layout/Section';
import { SegmentTabs } from './components/ui/SegmentTabs';

import { AboutSection } from './components/sections/AboutSection';
import { CompaniesLogos } from './components/sections/CompaniesLogos';
import { ExperienceSection } from './components/sections/Experience';
import { ProcessReelSection } from './components/sections/ProcessReelSection';
import { HowIHelpSection } from './components/sections/HowIHelpSection';
import { CTASection } from './components/sections/CTASection';
import { Hero } from './components/sections/Hero';
import { BlogSection } from './components/sections/BlogSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';

import { ProjectCardWrapper } from './components/cards/ProjectCardWrapper';
import { PageIntro } from './components/layout/PageIntro';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ThemeProvider } from './context/ThemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NotFoundPage } from './components/pages/NotFoundPage';

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
  const module = await import('./components/pages/BlogIndexPage');
  return { default: module.BlogIndexPage };
});

const BlogArticlePage = lazy(async () => {
  const module = await import('./components/pages/BlogArticlePage');
  return { default: module.BlogArticlePage };
});

const ProjectDetailPage = lazy(async () => {
  const module = await import('./components/pages/ProjectDetailPage');
  return { default: module.ProjectDetailPage };
});

export default function App() {
  const lenis = useLenis();

  const [hasManualTheme, setHasManualTheme] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      return window.localStorage.getItem('theme') !== null;
    } catch {
      return true;
    }
  });
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      const stored = window.localStorage.getItem('theme');
      if (stored === 'dark') return true;
      if (stored === 'light') return false;
    } catch {
      // Ignore storage errors and fall back to system preference.
    }
    return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? true;
  });

  const location = useLocation();
  const navigate = useNavigate();

  const projectDetailMatch = useMatch('/projects/:slug');
  const blogDetailMatch = useMatch('/blog/:slug');
  const workMatch = useMatch({ path: '/projects', end: true });
  const blogMatch = useMatch({ path: '/blog', end: true });
  const aboutMatch = useMatch({ path: '/about', end: true });
  const homeMatch = useMatch({ path: '/', end: true });

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
    const key = `scrollY:${location.pathname}`;
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
  }, [lenis, location.pathname]);

  useEffect(() => {
    const key = `scrollY:${location.pathname}`;
    const handleBeforeUnload = () => {
      try {
        window.sessionStorage.setItem(key, String(lenis?.scroll ?? window.scrollY));
      } catch {
        // Ignore storage errors.
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [lenis, location.pathname]);

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
    navigate(pageToPath(page, slug));
  }, [navigate]);

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
  }, []);

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

  const projectSlug = projectDetailMatch?.params.slug ?? '';
  const blogSlug = blogDetailMatch?.params.slug ?? '';

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
      path: location.pathname,
    });
  }, [activePost, activeProject, currentPage, location.pathname]);

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
        <div className="mb-10 text-left">
          <SectionTitle
            title={siteContent.featuredWork.title}
            highlight={siteContent.featuredWork.highlight}
            delay={sectionPacing.support.title}
            stackHighlight
            className={cn(darkMode ? 'text-white' : 'text-black')}
          />
        </div>

        <div className="sticky top-28 sm:top-32 z-40 mb-8 py-2 pointer-events-none">
          <Reveal delay={0.2} className="pointer-events-auto flex justify-start">
            <SegmentTabs
              tabs={workFilters.map((item) => item.label)}
              activeTab={filter}
              onChange={setFilter}
            />
          </Reveal>
        </div>

        <StackedCards
          items={filteredProjects}
          renderItem={(project) => (
            <ProjectCardWrapper project={project} onClick={handleProjectClick} />
          )}
        />
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
        <Reveal delay={0.15} className="pointer-events-auto flex justify-start">
          <SegmentTabs
            tabs={workFilters.map((item) => item.label)}
            activeTab={filter}
            onChange={setFilter}
          />
        </Reveal>
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
      pathname={location.pathname}
      darkMode={darkMode}
      onGoHome={() => navigateTo('home')}
      onViewWork={() => navigateTo('work')}
      onReadBlog={() => navigateTo('blog')}
    />
  );

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
                key={location.pathname}
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
                  <Routes location={location}>
                    <Route path="/" element={homeElement} />
                    <Route path="/projects" element={workElement} />
                    <Route
                      path="/projects/:slug"
                      element={
                        activeProject ? (
                          <ProjectDetailPage
                            project={activeProject}
                            nextProject={nextProject}
                            onNextProject={handleProjectClick}
                          />
                        ) : (
                          notFoundElement
                        )
                      }
                    />
                    <Route path="/blog" element={<BlogIndexPage onPostClick={handleBlogClick} />} />
                    <Route
                      path="/blog/:slug"
                      element={
                        activePost ? (
                          <BlogArticlePage
                            post={activePost}
                            nextPost={nextPost}
                            onNextPost={handleBlogClick}
                          />
                        ) : (
                          notFoundElement
                        )
                      }
                    />
                    <Route path="/about" element={aboutElement} />
                    <Route path="*" element={notFoundElement} />
                  </Routes>
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
