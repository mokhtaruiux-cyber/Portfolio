import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation, useMatch, useNavigate } from 'react-router-dom';

import { siteContent } from './content';
import { PageKey } from './types';
import { transitions, variants } from './lib/motionTokens';
import { typography } from './lib/typography';
import { cn } from './lib/utils';

import { LivingBackground } from './components/background/LivingBackground';
import { ScrollProgress } from './components/motion/ScrollProgress';
import { Reveal } from './components/motion/Reveal';
import { BlurIn } from './components/motion/BlurIn';
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
import { BlogIndexPage } from './components/pages/BlogIndexPage';
import { BlogArticlePage } from './components/pages/BlogArticlePage';
import { ProjectDetailPage } from './components/pages/ProjectDetailPage';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ThemeProvider } from './context/ThemeContext';

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
    case 'home':
    default:
      return '/';
  }
};

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const projectDetailMatch = useMatch('/projects/:slug');
  const blogDetailMatch = useMatch('/blog/:slug');
  const workMatch = useMatch({ path: '/projects', end: true });
  const blogMatch = useMatch({ path: '/blog', end: true });
  const aboutMatch = useMatch({ path: '/about', end: true });
  const homeMatch = useMatch({ path: '/', end: true });

  const currentPage: PageKey = projectDetailMatch
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
              : 'home';

  const workFilters = siteContent.featuredWork.filters;
  const allProjectsFilter = workFilters[0];
  const [filter, setFilter] = useState(allProjectsFilter?.label ?? '');

  useEffect(() => {
    // toggle dark mode without wiping other classes (like overflow-x-hidden)
    if (darkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }, [darkMode]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  const navigateTo = useCallback((page: PageKey, slug = '') => {
    navigate(pageToPath(page, slug));
  }, [navigate]);

  const handleBack = useCallback((fallbackPage: PageKey) => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
      return;
    }
    navigate(pageToPath(fallbackPage));
  }, [navigate]);

  const handleProjectClick = useCallback((slug: string) => {
    navigateTo('project-details', slug);
  }, [navigateTo]);

  const handleBlogClick = useCallback((slug: string) => {
    navigateTo('blog-details', slug);
  }, [navigateTo]);

  const filteredProjects = useMemo(() => {
    const activeFilter = workFilters.find((item) => item.label === filter);
    if (!activeFilter || !allProjectsFilter || activeFilter.category === allProjectsFilter.category) {
      return siteContent.projects.items;
    }
    return siteContent.projects.items.filter((project) => project.category === activeFilter.category);
  }, [filter, workFilters, allProjectsFilter]);

  const projectSlug = projectDetailMatch?.params.slug ?? '';
  const blogSlug = blogDetailMatch?.params.slug ?? '';

  const activeProject = useMemo(
    () => siteContent.projects.items.find((project) => project.slug === projectSlug),
    [projectSlug]
  );
  const activePost = useMemo(
    () => siteContent.writing.items.find((post) => post.slug === blogSlug),
    [blogSlug]
  );
  const nextProject = useMemo(() => {
    if (!activeProject) return undefined;
    const index = siteContent.projects.items.findIndex((project) => project.slug === activeProject.slug);
    if (index === -1) return undefined;
    return siteContent.projects.items[(index + 1) % siteContent.projects.items.length];
  }, [activeProject]);

  const seo = useMemo(() => {
    const baseTitle = siteContent.seo.title;
    if (activeProject) {
      return {
        title: `${activeProject.title} — ${baseTitle}`,
        description: activeProject.description,
      };
    }
    if (activePost) {
      return {
        title: `${activePost.title} — ${baseTitle}`,
        description: activePost.excerpt,
      };
    }
    if (currentPage === 'blog') {
      return {
        title: `${siteContent.writing.index.title} — ${baseTitle}`,
        description: siteContent.writing.index.description,
      };
    }
    if (currentPage === 'work') {
      return {
        title: `${siteContent.featuredWork.archive.title} — ${baseTitle}`,
        description: siteContent.seo.description,
      };
    }
    if (currentPage === 'about') {
      return {
        title: `About — ${baseTitle}`,
        description: siteContent.about.subtitle,
      };
    }
    return {
      title: baseTitle,
      description: siteContent.seo.description,
    };
  }, [activePost, activeProject, currentPage]);

  useEffect(() => {
    document.title = seo.title;
    const existing = document.querySelector('meta[name="description"]');
    if (existing) {
      existing.setAttribute('content', seo.description);
      return;
    }
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = seo.description;
    document.head.appendChild(meta);
  }, [seo.description, seo.title]);

  const routeAnnouncement = useMemo(() => {
    if (activeProject) return `Project ${activeProject.title} page loaded`;
    if (activePost) return `Article ${activePost.title} page loaded`;
    if (currentPage === 'work') return 'Work page loaded';
    if (currentPage === 'blog') return 'Blog page loaded';
    if (currentPage === 'about') return 'About page loaded';
    return 'Home page loaded';
  }, [activePost, activeProject, currentPage]);

  const homeElement = (
    <>
      <Hero onWorkClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })} />
      <CompaniesLogos />
      <AboutSection />
      <HowIHelpSection />
      <ExperienceSection />
      <ProcessReelSection />
      <Section id="work" eyebrow={siteContent.featuredWork.eyebrow} motion="fade">
        <div className="mb-10 text-left">
          <BlurIn as="h3" className={cn(typography.h2, 'font-black max-w-[24ch]', darkMode ? 'text-white' : 'text-black')}>
            {siteContent.featuredWork.title} <br /> <span className="text-blue-600">{siteContent.featuredWork.highlight}</span>
          </BlurIn>
        </div>

        <div className="sticky top-24 sm:top-28 z-40 mb-8 py-2 pointer-events-none">
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
    <Section className="min-h-screen" eyebrow={siteContent.featuredWork.archive.eyebrow}>
      <div className="mb-10 text-left">
        <BlurIn as="h3" className={cn(typography.h2, 'font-black max-w-[24ch]', darkMode ? 'text-white' : 'text-black')}>
          {siteContent.featuredWork.archive.title}
        </BlurIn>
      </div>
      <div className="space-y-24">
        {siteContent.projects.items.map((project) => (
          <ProjectCardWrapper
            key={project.id}
            project={project}
            onClick={handleProjectClick}
          />
        ))}
      </div>
    </Section>
  );

  const aboutElement = (
    <div>
      <AboutSection />
      <TestimonialsSection />
    </div>
  );

  return (
    <ThemeProvider value={{ darkMode, setDarkMode }}>
      <div className={cn('min-h-screen transition-colors duration-1000 selection:bg-blue-600 selection:text-white pb-[env(safe-area-inset-bottom)]', darkMode ? 'bg-[#030303] text-white' : 'bg-[#fafafa] text-black')}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1000] focus:rounded-[4px] focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
        >
          Skip to main content
        </a>
        <span className="sr-only" aria-live="polite">{routeAnnouncement}</span>
        <ScrollProgress />
        <LivingBackground />
        <Navbar currentPage={currentPage} onNavigate={navigateTo} />

        <main id="main-content" className="relative">
          <AnimatePresence mode="wait">
            <motion.div key={currentPage} variants={variants.fadeIn} initial="initial" animate="animate" exit="exit" transition={transitions.smooth}>
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
                        onBack={() => handleBack('work')}
                        onNextProject={handleProjectClick}
                      />
                    ) : (
                      <Navigate to="/projects" replace />
                    )
                  }
                />
                <Route path="/blog" element={<BlogIndexPage onPostClick={handleBlogClick} />} />
                <Route
                  path="/blog/:slug"
                  element={
                    activePost ? (
                      <BlogArticlePage post={activePost} onBack={() => handleBack('blog')} />
                    ) : (
                      <Navigate to="/blog" replace />
                    )
                  }
                />
                <Route path="/about" element={aboutElement} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
          <CTASection />
        </main>
        <Footer currentPage={currentPage} onNavigate={navigateTo} />
      </div>
    </ThemeProvider>
  );
}
