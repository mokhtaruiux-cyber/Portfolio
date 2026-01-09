
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun, Moon, ArrowUpRight, Zap, Menu, X, ArrowLeft, Mail, Link as LinkIcon, MessageSquare, Calendar, Clock
} from 'lucide-react';

import { TESTIMONIALS } from './constants';
import { PROJECTS } from './data/projects';
import { BLOG_POSTS } from './data/blog';
import { BlogContentBlock, BlogPost, Project, Testimonial } from './types';
import { transitions, variants } from './lib/motionTokens';
import { useParallax } from './hooks/useParallax';
import { assetPath } from './lib/assetPath';
import { typography } from './lib/typography';
import { cn } from './lib/utils';

type PageKey = "home" | "work" | "blog" | "project-details" | "blog-details" | "about" | "contact";

const basePath = import.meta.env.BASE_URL || "/";
const normalizedBasePath = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;

const stripBasePath = (pathname: string) => {
  if (!normalizedBasePath) return pathname;
  if (pathname.startsWith(normalizedBasePath)) {
    const stripped = pathname.slice(normalizedBasePath.length);
    return stripped.length ? stripped : "/";
  }
  return pathname;
};

const getRouteFromPath = (pathname: string) => {
  const cleanPath = stripBasePath(pathname).replace(/^\/+|\/+$/g, "");
  if (!cleanPath) return { page: "home" as PageKey, slug: "" };
  const [segment, slug] = cleanPath.split("/");

  if (segment === "projects") {
    if (slug && PROJECTS.some((project) => project.slug === slug)) {
      return { page: "project-details" as PageKey, slug };
    }
    return { page: "work" as PageKey, slug: "" };
  }

  if (segment === "blog") {
    if (slug && BLOG_POSTS.some((post) => post.slug === slug)) {
      return { page: "blog-details" as PageKey, slug };
    }
    return { page: "blog" as PageKey, slug: "" };
  }

  if (segment === "about") return { page: "about" as PageKey, slug: "" };
  if (segment === "contact") return { page: "contact" as PageKey, slug: "" };

  return { page: "home" as PageKey, slug: "" };
};

const buildPath = (page: PageKey, slug = "") => {
  const withBase = (path: string) => (normalizedBasePath ? `${normalizedBasePath}${path}` : path);
  switch (page) {
    case "work":
      return withBase("/projects");
    case "project-details":
      return withBase(`/projects/${slug}`);
    case "blog":
      return withBase("/blog");
    case "blog-details":
      return withBase(`/blog/${slug}`);
    case "about":
      return withBase("/about");
    case "contact":
      return withBase("/contact");
    case "home":
    default:
      return withBase("/");
  }
};

// Motion Components
import { Reveal } from './components/motion/Reveal';
import { BlurIn } from './components/motion/BlurIn';
import { FadeInUp } from './components/motion/FadeInUp';
import { TiltCard } from './components/motion/TiltCard';
import { LivingBackground } from './components/background/LivingBackground';
import { ScrollProgress } from './components/motion/ScrollProgress';
import { TypingEffect } from './components/motion/TypingEffect';
import { StackedCards } from './components/motion/StackedCards';

// Layout & UI
import { Container } from './components/layout/Container';
import { Section } from './components/layout/Section';
import { SegmentTabs } from './components/ui/SegmentTabs';

// Sections
import { CompaniesLogos } from './components/sections/CompaniesLogos';
import { ExperienceSection } from './components/sections/Experience';

// --- UTILITY COMPONENTS ---

interface GlowButtonProps {
  children: React.ReactNode;
  darkMode: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  size?: "default" | "cta";
  fullWidth?: boolean;
}

const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  darkMode,
  className = "",
  onClick,
  type = "button",
  size = "default",
  fullWidth = false
}) => (
  <div className={cn("glow-border-container", !darkMode && "light-glow-button", fullWidth && "w-full", className)}>
    <div className="glow-border-bg"></div>
    <button
      type={type}
      className={cn(
        "glow-button-inner group w-full transition-all duration-300 active:scale-[0.98]",
        size === "cta" ? "h-12 !py-0 !px-6" : "px-8 py-4 sm:px-10 sm:py-5"
      )}
      onClick={onClick}
    >
      <motion.span
        className={cn("flex items-center justify-center gap-3", typography.button)}
        whileHover={{ x: 3 }}
        transition={transitions.spring}
      >
        {children}
      </motion.span>
    </button>
  </div>
);

// --- SECTIONS ---

const ContactSection = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <Section id="contact">
      <div className="mb-12 text-left">
        <BlurIn as="span" className={cn(typography.labelXs, "mb-4 block", darkMode ? "text-blue-500" : "text-blue-600")}>Contact</BlurIn>
        <BlurIn as="h2" delay={0.1} className={cn(typography.h2, "font-black mb-4 max-w-[24ch]", darkMode ? "text-white" : "text-blue-600")}>Let's Talk</BlurIn>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
        <div className="lg:col-span-2">
          <Reveal delay={0.1}>
            <div className={cn(
              "p-8 sm:p-12 rounded-[2.5rem] glass border overflow-hidden",
              darkMode ? "bg-black/40 border-white/5 shadow-2xl" : "bg-white/60 border-black/5 shadow-xl"
            )}>
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                  <div className="space-y-2 text-left">
                    <label htmlFor="contact-name" className={cn(typography.labelXs, "opacity-40")}>Name *</label>
                    <input id="contact-name" name="name" autoComplete="name" type="text" placeholder="John Doe" className="w-full bg-transparent border-b border-white/10 py-3 focus:border-blue-500 outline-none transition-colors font-medium" />
                  </div>
                  <div className="space-y-2 text-left">
                    <label htmlFor="contact-email" className={cn(typography.labelXs, "opacity-40")}>Email *</label>
                    <input id="contact-email" name="email" autoComplete="email" type="email" placeholder="john@example.com" className="w-full bg-transparent border-b border-white/10 py-3 focus:border-blue-500 outline-none transition-colors font-medium" />
                  </div>
                  <div className="space-y-2 text-left">
                    <label htmlFor="contact-phone" className={cn(typography.labelXs, "opacity-40")}>Phone</label>
                    <input id="contact-phone" name="phone" autoComplete="tel" type="tel" placeholder="+966 --- --- ---" className="w-full bg-transparent border-b border-white/10 py-3 focus:border-blue-500 outline-none transition-colors font-medium" />
                  </div>
                </div>
                <div className="space-y-2 text-left">
                  <label htmlFor="contact-subject" className={cn(typography.labelXs, "opacity-40")}>Subject</label>
                  <input id="contact-subject" name="subject" autoComplete="off" type="text" placeholder="How can I help?" className="w-full bg-transparent border-b border-white/10 py-3 focus:border-blue-500 outline-none transition-colors font-medium" />
                </div>
                <div className="space-y-2 text-left">
                  <label htmlFor="contact-message" className={cn(typography.labelXs, "opacity-40")}>Message</label>
                  <textarea id="contact-message" name="message" autoComplete="off" placeholder="Got an idea? Share what’s on your mind." rows={4} className="w-full bg-transparent border border-white/10 rounded-2xl p-6 focus:border-blue-500 outline-none transition-colors font-medium resize-none" />
                </div>
                <GlowButton type="submit" darkMode={darkMode}>Send Your Message</GlowButton>
              </form>
            </div>
          </Reveal>
        </div>

        <div className="space-y-6">
          <Reveal delay={0.2}>
            <div className={cn("p-8 sm:p-10 rounded-[2.5rem] glass border group hover:border-blue-500/30 transition-all", darkMode ? "bg-black/40 border-white/5" : "bg-white/60 border-black/5")}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><LinkIcon size={20} /></div>
                <h4 className={typography.h3}>Connect</h4>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <a href="mailto:mokhtaruiux@gmail.com" className={cn("block p-8 sm:p-10 rounded-[2.5rem] glass border group hover:border-blue-500/30 transition-all", darkMode ? "bg-black/40 border-white/5" : "bg-white/60 border-black/5")}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><Mail size={20} /></div>
                <h4 className={typography.h3}>Email Me</h4>
              </div>
            </a>
          </Reveal>

          <Reveal delay={0.4}>
            <a href="https://www.linkedin.com/in/mokhtaruiux/" target="_blank" rel="noopener noreferrer" className={cn("block p-8 sm:p-10 rounded-[2.5rem] glass border group hover:border-blue-500/30 transition-all", darkMode ? "bg-black/40 border-white/5" : "bg-white/60 border-black/5")}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><MessageSquare size={20} /></div>
                <h4 className={typography.h3}>LinkedIn</h4>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};

type FooterLink = {
  label: string;
  href?: string;
  action?: () => void;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const Footer = ({ darkMode, onNavigate }: { darkMode: boolean, onNavigate: (page: PageKey) => void }) => {
  const footerLinks: FooterColumn[] = [
    { title: "Navigation", links: [{ label: "Work", action: () => onNavigate("work") }, { label: "Blog", action: () => onNavigate("blog") }, { label: "About", action: () => onNavigate("about") }, { label: "Contact", action: () => onNavigate("contact") }] },
    { title: "Links", links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/mokhtaruiux/" }, { label: "Twitter", href: "#" }, { label: "Behance", href: "#" }] }
  ];

  return (
    <footer className={cn("pt-24 pb-12 sm:pt-48 border-t border-white/5 relative z-10", darkMode ? "bg-[#030303]" : "bg-[#fafafa]")}>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24">
          <div className="lg:col-span-2 text-left">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 flex items-center justify-center">
                <img src={assetPath('assets/images/Logo@4x.webp')} alt="Mokhtar" className="w-full h-full object-contain" />
              </div>
              <span className={cn(typography.h3, "font-black tracking-tighter", darkMode ? "text-white" : "text-black")}>Mokhtar.</span>
            </div>
            <p className={cn(typography.body, "opacity-40 max-w-sm")}>Transforming complex digital challenges into high-impact product experiences.</p>
          </div>
          {footerLinks.map((column) => (
            <div key={column.title} className="text-left">
              <h5 className={cn(typography.labelXs, "tracking-[0.3em] mb-8 text-blue-500")}>{column.title}</h5>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? <a href={link.href} target="_blank" rel="noopener noreferrer" className={cn(typography.body, "opacity-40 hover:opacity-100 transition-opacity font-semibold")}>{link.label}</a> : <button onClick={link.action} className={cn(typography.body, "opacity-40 hover:opacity-100 transition-opacity font-semibold")}>{link.label}</button>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={cn("flex flex-col sm:flex-row justify-between items-center pt-12 border-t border-white/5 opacity-40 gap-6", typography.labelSm)}>
          <span>© 2024 Mohammed Mokhtar • All Rights Reserved</span>
        </div>
      </Container>
    </footer>
  );
};

// --- Project Card Wrapper ---

interface ProjectCardWrapperProps {
  project: Project;
  index: number;
  darkMode: boolean;
  onClick: (slug: string) => void;
}

const ProjectCardWrapper: React.FC<ProjectCardWrapperProps> = ({ project, index, darkMode, onClick }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <TiltCard className="w-full h-full" intensity={5}>
        <button
          type="button"
          onClick={() => onClick(project.slug)}
          className={cn(
            "relative w-full text-left rounded-[2.5rem] sm:rounded-[3.5rem] md:rounded-[4.5rem] p-6 sm:p-10 md:p-16 lg:p-20 overflow-hidden glass border transition-shadow duration-700 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2",
            darkMode
              ? 'bg-black/90 border-white/10 shadow-[0_0_100px_-20px_rgba(37,99,235,0.1)] focus-visible:ring-offset-[#030303]'
              : 'bg-white/90 border-black/5 shadow-2xl focus-visible:ring-offset-[#fafafa]'
          )}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">
            <div className="order-2 lg:order-1 flex flex-col justify-between h-full text-left">
              <Reveal staggerChildren>
                <h4 className={cn(typography.h1, "font-black mb-4 sm:mb-8 group-hover:text-blue-500 transition-colors duration-500 max-w-[18ch]", darkMode ? 'text-white' : 'text-black')}>{project.title}</h4>
                <p className={cn(typography.body, "font-medium mb-6 sm:mb-10 opacity-60 max-w-3xl", darkMode ? 'text-gray-300' : 'text-gray-600')}>{project.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 mb-8 sm:mb-12">
                  {project.metrics.map(m => (
                    <div key={m.label}>
                      <span className={cn(typography.labelXs, "opacity-40 mb-1 sm:mb-2 block")}>{m.label}</span>
                      <span className={cn(typography.h3, "font-black", darkMode ? 'text-white' : 'text-black')}>{m.value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                  <div className={cn("flex items-center gap-2 opacity-40 group-hover:opacity-100 group-hover:text-blue-500 transition-all duration-500", typography.button)}>
                    View Project <ArrowUpRight size={16} />
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="order-1 lg:order-2 relative rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden group aspect-[16/10] lg:aspect-[4/3.2]">
              <motion.img whileHover={{ scale: 1.04 }} transition={transitions.smooth} src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </button>
      </TiltCard>
    </div>
  );
};

// --- Blog Components ---

interface BlogCardProps {
  post: BlogPost;
  darkMode: boolean;
  onClick: (s: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, darkMode, onClick }) => {
  return (
    <Reveal>
      <TiltCard intensity={8}>
        <button
          type="button"
          onClick={() => onClick(post.slug)}
          className={cn(
            "group w-full text-left flex flex-col rounded-[2.5rem] glass border overflow-hidden transition-all duration-700 cursor-pointer h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2",
            darkMode
              ? "bg-black/40 border-white/5 hover:border-blue-500/30 focus-visible:ring-offset-[#030303]"
              : "bg-white/60 border-black/5 hover:border-blue-500/30 shadow-xl focus-visible:ring-offset-[#fafafa]"
          )}
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className={cn("absolute top-6 left-6 px-4 py-2 rounded-full glass border border-white/10 bg-black/40 text-white", typography.labelSm)}>
              {post.category}
            </div>
          </div>
          <div className="p-8 sm:p-10 flex flex-col flex-1 text-left">
            <div className={cn("flex items-center gap-4 mb-6 opacity-40", typography.labelXs)}>
              <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
            </div>
            <h3 className={cn(typography.h3Display, "mb-4 group-hover:text-blue-500 transition-colors", darkMode ? "text-white" : "text-black")}>
              {post.title}
            </h3>
            <p className={cn(typography.body, "opacity-60 font-medium mb-8 line-clamp-3")}>
              {post.excerpt}
            </p>
            <div className={cn("mt-auto flex items-center gap-2 text-blue-500 group-hover:gap-4 transition-all duration-300", typography.labelXs, "tracking-[0.2em]")}>
              Read Article <ArrowUpRight size={16} />
            </div>
          </div>
        </button>
      </TiltCard>
    </Reveal>
  );
};

const BlogSection = ({ darkMode, onPostClick }: { darkMode: boolean, onPostClick: (s: string) => void }) => {
  return (
    <Section id="blog">
      <div className="mb-24 text-left">
        <BlurIn as="span" className={cn(typography.labelXs, "text-blue-500 mb-4 block")}>Insights</BlurIn>
        <BlurIn as="h2" delay={0.1} className={cn(typography.h2, "font-black mb-6 max-w-[24ch]", darkMode ? "text-white" : "text-black")}>
          Thoughts & <br /><span className="text-blue-600">Perspectives.</span>
        </BlurIn>
        <Reveal delay={0.2}>
          <p className={cn(typography.body, "opacity-60 max-w-2xl font-medium")}>
            Exploring the intersection of technology, psychology, and design to build better digital experiences.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {BLOG_POSTS.map(post => (
          <BlogCard key={post.id} post={post} darkMode={darkMode} onClick={onPostClick} />
        ))}
      </div>
    </Section>
  );
};

// --- Project Detail Page ---

const ProjectMetaItem = ({ label, value, darkMode }: { label: string; value: string; darkMode: boolean }) => {
  return (
    <div
      className={cn(
        "p-6 sm:p-8 rounded-[2rem] glass border",
        darkMode ? "bg-black/40 border-white/5" : "bg-white/60 border-black/5"
      )}
    >
      <span className={cn(typography.labelXs, "opacity-40 mb-2 block")}>{label}</span>
      <span className={cn(typography.body, "font-semibold", darkMode ? "text-white" : "text-black")}>{value}</span>
    </div>
  );
};

const ProjectGalleryItem = ({ item, darkMode }: { item: Project["gallery"][number]; darkMode: boolean }) => {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] rounded-[2rem] overflow-hidden glass border",
        darkMode ? "bg-black/40 border-white/5" : "bg-white/60 border-black/5"
      )}
    >
      <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
      {item.type === "video" && (
        <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
          <span className={cn(typography.labelXs, "tracking-[0.3em] text-white")}>VIDEO</span>
        </div>
      )}
    </div>
  );
};

const ProjectDetailPage = ({
  project,
  nextProject,
  darkMode,
  onBack,
  onNextProject
}: {
  project: Project;
  nextProject?: Project;
  darkMode: boolean;
  onBack: () => void;
  onNextProject: (slug: string) => void;
}) => {
  return (
    <>
      <Section>
        <div className="text-left space-y-10">
          <button onClick={onBack} className={cn("flex items-center gap-2 opacity-60 hover:opacity-100 hover:text-blue-500 transition-all font-medium group", typography.body)}>
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Work
          </button>

          <div className="space-y-4">
            <span className={cn(typography.labelXs, "tracking-[0.3em] text-blue-500")}>{project.category}</span>
            <h1 className={cn(typography.h1Display, "font-black max-w-[18ch]", darkMode ? "text-white" : "text-black")}>{project.title}</h1>
            <p className={cn(typography.body, "opacity-60 max-w-[60ch] font-medium", darkMode ? "text-white" : "text-black")}>{project.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <ProjectMetaItem label="Role" value={project.role} darkMode={darkMode} />
            <ProjectMetaItem label="Year" value={project.year} darkMode={darkMode} />
            <ProjectMetaItem label="Tools" value={project.tools.join(" • ")} darkMode={darkMode} />
          </div>
        </div>
      </Section>

      <Section eyebrow="Gallery">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {project.gallery.map((item, index) => (
            <ProjectGalleryItem key={`${project.slug}-gallery-${index}`} item={item} darkMode={darkMode} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Case Study">
        <div className="space-y-12 text-left">
          {project.caseStudySections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h3 className={cn(typography.h3, "font-black", darkMode ? "text-white" : "text-black")}>{section.title}</h3>
              <p className={cn(typography.body, "opacity-60 max-w-[60ch] font-medium", darkMode ? "text-white" : "text-black")}>{section.content}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Metrics">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 text-left">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <span className={cn(typography.labelXs, "opacity-40 mb-2 block")}>{metric.label}</span>
              <span className={cn(typography.h3, "font-black", darkMode ? "text-white" : "text-black")}>{metric.value}</span>
            </div>
          ))}
        </div>
      </Section>

      {nextProject && (
        <Section>
          <div
            className={cn(
              "p-8 sm:p-12 rounded-[2.5rem] glass border flex flex-col items-start gap-6",
              darkMode ? "bg-black/40 border-white/10" : "bg-white/60 border-black/10"
            )}
          >
            <span className={cn(typography.labelXs, "opacity-40")}>Next Project</span>
            <h3 className={cn(typography.h2, "font-black max-w-[24ch]", darkMode ? "text-white" : "text-black")}>
              {nextProject.title}
            </h3>
            <GlowButton darkMode={darkMode} size="cta" onClick={() => onNextProject(nextProject.slug)}>
              View Project <ArrowUpRight size={20} />
            </GlowButton>
          </div>
        </Section>
      )}
    </>
  );
};

// --- Blog Pages ---

const BlogIndexPage = ({ darkMode, onPostClick }: { darkMode: boolean; onPostClick: (s: string) => void }) => {
  return (
    <Section eyebrow="Blog">
      <div className="mb-16 text-left">
        <BlurIn as="h2" className={cn(typography.h2, "font-black mb-6 max-w-[24ch]", darkMode ? "text-white" : "text-black")}>
          Latest Articles.
        </BlurIn>
        <Reveal delay={0.2}>
          <p className={cn(typography.body, "opacity-60 max-w-2xl font-medium", darkMode ? "text-white" : "text-black")}>
            Deep dives into product design, motion, and systems thinking for real-world teams.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {BLOG_POSTS.map(post => (
          <BlogCard key={post.id} post={post} darkMode={darkMode} onClick={onPostClick} />
        ))}
      </div>
    </Section>
  );
};

const BlogBlock = ({ block, darkMode }: { block: BlogContentBlock; darkMode: boolean }) => {
  switch (block.type) {
    case "heading":
      return (
        <h3 className={cn(typography.h3, "font-black", darkMode ? "text-white" : "text-black")}>
          {block.text}
        </h3>
      );
    case "image":
      return (
        <figure className="space-y-3">
          <img
            src={block.src}
            alt={block.alt}
            className={cn(
              "w-full h-auto rounded-[2rem] border",
              darkMode ? "border-white/10" : "border-black/10"
            )}
          />
          {block.caption && (
            <figcaption className={cn(typography.labelXs, "opacity-40 text-center")}>{block.caption}</figcaption>
          )}
        </figure>
      );
    case "quote":
      return (
        <p className={cn(typography.body, "italic opacity-70", darkMode ? "text-white" : "text-black")}>
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul className={cn(typography.body, "list-disc pl-6 space-y-2 opacity-70", darkMode ? "text-white" : "text-black")}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "paragraph":
    default:
      return (
        <p className={cn(typography.body, "opacity-70", darkMode ? "text-white" : "text-black")}>
          {block.text}
        </p>
      );
  }
};

const BlogArticlePage = ({ post, darkMode, onBack }: { post: BlogPost; darkMode: boolean; onBack: () => void }) => {
  return (
    <>
      <Section>
        <div className="text-left space-y-10">
          <button onClick={onBack} className={cn("flex items-center gap-2 opacity-60 hover:opacity-100 hover:text-blue-500 transition-all font-medium group", typography.body)}>
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </button>

          <div className="space-y-4 max-w-[60ch]">
            <div className={cn("flex items-center gap-4 opacity-60", typography.labelXs)}>
              <span className="px-3 py-1 rounded-full bg-blue-600/20 border border-blue-600/30 text-blue-400">{post.category}</span>
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className={cn(typography.h1, "font-black max-w-[18ch]", darkMode ? "text-white" : "text-black")}>{post.title}</h1>
            <p className={cn(typography.body, "opacity-60 font-medium", darkMode ? "text-white" : "text-black")}>{post.excerpt}</p>
          </div>

          <div className={cn("w-full max-w-[60ch] rounded-[2.5rem] overflow-hidden border", darkMode ? "border-white/10" : "border-black/10")}>
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-[60ch] mx-auto space-y-8 text-left">
          {post.contentBlocks.map((block, index) => (
            <BlogBlock key={`${post.slug}-block-${index}`} block={block} darkMode={darkMode} />
          ))}
        </div>
      </Section>
    </>
  );
};

// --- HERO LAYOUT (Centered) ---

const Hero = ({ darkMode, onWorkClick }: { darkMode: boolean, onWorkClick: () => void }) => {
  const parallaxY = useParallax(60);

  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden min-h-[70vh] sm:min-h-[75vh] flex flex-col justify-center">
      <Container className="text-center relative z-10">
        <FadeInUp>
          <div className="flex flex-col items-center gap-6 sm:gap-8">
            <Reveal delay={0.2} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className={cn(typography.labelXs, "text-blue-500")}>Available for new projects</span>
            </Reveal>

            {/* Improved Hero Layout: Badge + Portrait + H1 + CTA in one view */}
            <Reveal delay={0.3} className="relative z-0">
              <div className="relative w-32 h-32 sm:w-56 sm:h-56 md:w-72 md:h-72">
                <motion.img
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ ...transitions.smooth, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  src={darkMode ? assetPath('assets/images/Pic-v2-Dark.webp') : assetPath('assets/images/Pic-v1.webp')}
                  alt="Mokhtar"
                  className="w-full h-full object-contain relative z-10 select-none pointer-events-none"
                />
                <div className={cn(
                  "absolute inset-0 blur-[100px] opacity-30 scale-125 -z-10 transition-all duration-1000",
                  darkMode ? "bg-blue-500/40" : "bg-blue-400/30"
                )} />
              </div>
            </Reveal>

            <motion.div style={{ y: parallaxY }} className="relative z-10 w-full">
              <h1 className={cn(typography.h1, "font-black max-w-[18ch] block mx-auto !text-center", darkMode ? 'text-white' : 'text-black')}>
                <TypingEffect as="span" text="Designing Digital Products That Feel Effortless." />
              </h1>
            </motion.div>

            <Reveal delay={1.5} className="w-full">
              <div
                className={cn("max-w-2xl font-medium mx-auto !text-center", typography.body, darkMode ? 'text-gray-300' : 'text-gray-600')}
              >
                Product Designer and Creative Engineer based in Riyadh. Crafting pixel-perfect experiences for global brands and visionary startups.
              </div>
            </Reveal>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-[360px] sm:max-w-none mx-auto relative z-10"
            >
              <GlowButton
                darkMode={darkMode}
                onClick={onWorkClick}
                size="cta"
                fullWidth
                className="w-full sm:w-auto"
              >
                Explore Work <ArrowUpRight size={20} />
              </GlowButton>
              <GlowButton
                darkMode={darkMode}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                size="cta"
                fullWidth
                className="w-full sm:w-auto"
              >
                Let's Talk
              </GlowButton>
            </motion.div>
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
};

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
}

const Navbar = ({ darkMode, setDarkMode, currentPage, onNavigate }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', s);
    return () => window.removeEventListener('scroll', s);
  }, []);

  const navItems: { label: string; page: PageKey }[] = [
    { label: "Work", page: "work" },
    { label: "Blog", page: "blog" },
    { label: "About", page: "about" },
    { label: "Contact", page: "contact" }
  ];

  const handleNavClick = (page: PageKey) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  const isActive = (page: PageKey) => {
    if (page === "work") return currentPage === "work" || currentPage === "project-details";
    if (page === "blog") return currentPage === "blog" || currentPage === "blog-details";
    return currentPage === page;
  };

  return (
    <nav className={cn("fixed top-0 left-0 right-0 z-[100] transition-all", scrolled ? 'py-4' : 'py-6 sm:py-10')}>
      <Container>
        <motion.div
          layout
          className={cn(
            "w-full h-20 rounded-full glass border shadow-xl overflow-hidden",
            darkMode ? "bg-black/70 border-white/10" : "bg-white/70 border-black/10"
          )}
        >
          <div className="h-full flex items-center justify-between px-5 sm:px-8">
            <div className="flex items-center gap-4 cursor-pointer group" onClick={() => handleNavClick("home")}>
              <div className="h-10 w-10 flex items-center justify-center">
                <img src={assetPath('assets/images/Logo@4x.webp')} alt="Mokhtar" className="w-full h-full object-contain" />
              </div>
              <span className={cn(typography.brand, darkMode ? "text-white" : "text-black")}>Mokhtar.</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={cn(
                  typography.navControl,
                  "rounded-full border border-white/35 text-white/90 flex items-center justify-center hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
                  !darkMode && "border-black/10 text-black"
                )}
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className={typography.navIcon} /> : <Moon className={typography.navIcon} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={cn(
                  typography.navControl,
                  "rounded-2xl border border-white/35 text-white/90 flex items-center justify-center hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
                  !darkMode && "border-black/10 text-black"
                )}
                aria-label="Open menu"
              >
                {isMenuOpen ? <X className={typography.navIcon} /> : <Menu className={typography.navIcon} />}
              </button>
            </div>
          </div>
        </motion.div>
      </Container>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            <Container className="relative pt-24">
              <motion.div
                initial={{ y: -12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                className={cn(
                  "w-full rounded-[2rem] glass border p-6 flex flex-col items-center gap-6 shadow-2xl",
                  darkMode ? "bg-black/95 border-white/10 text-white" : "bg-white/95 border-black/10 text-black"
                )}
              >
                {navItems.map(item => (
                    <button
                    key={item.label}
                    onClick={() => handleNavClick(item.page)}
                    className={cn(
                      typography.menuItem,
                      "transition-all w-full text-center",
                      isActive(item.page) ? "opacity-100 text-blue-500" : "opacity-40"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="w-full h-px bg-current opacity-10" />
                <GlowButton
                  darkMode={darkMode}
                  onClick={() => handleNavClick("contact")}
                  size="cta"
                  fullWidth
                  className="w-full"
                >
                  Book Free Session
                </GlowButton>
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageKey>("home");
  const [activeSlug, setActiveSlug] = useState("");

  const [filter, setFilter] = useState("All Projects");

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
    const handleRoute = () => {
      const { page, slug } = getRouteFromPath(window.location.pathname);
      setCurrentPage(page);
      setActiveSlug(slug);
    };
    handleRoute();
    window.addEventListener("popstate", handleRoute);
    return () => window.removeEventListener("popstate", handleRoute);
  }, []);

  const navigate = (page: PageKey, slug = "") => {
    const isProjectDetail = page === "project-details";
    const isBlogDetail = page === "blog-details";
    const targetPage = (isProjectDetail && !slug) ? "work" : (isBlogDetail && !slug) ? "blog" : page;
    const targetSlug = (targetPage === "project-details" || targetPage === "blog-details") ? slug : "";
    setCurrentPage(targetPage);
    setActiveSlug(targetSlug);
    const nextPath = buildPath(targetPage, targetSlug);
    if (window.location.pathname !== nextPath) {
      window.history.pushState({ page: targetPage, slug: targetSlug }, "", nextPath);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredProjects = useMemo(() => {
    if (filter === 'All Projects') return PROJECTS;
    const categoryMap: Record<string, string> = {
      'Websites': 'Websites',
      'Dashboards': 'Dashboards',
      'Apps': 'Mobile Apps',
      'Design Systems': 'Design Systems'
    };
    return PROJECTS.filter(p => p.category === categoryMap[filter]);
  }, [filter]);

  const activeProject = useMemo(() => PROJECTS.find(p => p.slug === activeSlug), [activeSlug]);
  const activePost = useMemo(() => BLOG_POSTS.find(p => p.slug === activeSlug), [activeSlug]);
  const nextProject = useMemo(() => {
    if (!activeProject) return undefined;
    const index = PROJECTS.findIndex((project) => project.slug === activeProject.slug);
    if (index === -1) return undefined;
    return PROJECTS[(index + 1) % PROJECTS.length];
  }, [activeProject]);

  return (
    <div className={cn("min-h-screen transition-colors duration-1000 selection:bg-blue-600 selection:text-white pb-[env(safe-area-inset-bottom)]", darkMode ? 'bg-[#030303] text-white' : 'bg-[#fafafa] text-black')}>
      <ScrollProgress />
      <LivingBackground darkMode={darkMode} />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} currentPage={currentPage} onNavigate={navigate} />

      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div key={currentPage + activeSlug} variants={variants.fadeIn} initial="initial" animate="animate" exit="exit" transition={transitions.smooth}>
            {currentPage === 'home' && (
              <>
                <Hero darkMode={darkMode} onWorkClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })} />
                <CompaniesLogos darkMode={darkMode} />
                <ExperienceSection darkMode={darkMode} />
                <Section id="work" eyebrow="Portfolio">
                  <div className="mb-16 text-left">
                    <BlurIn as="h3" className={cn(typography.h2, "font-black max-w-[24ch]", darkMode ? 'text-white' : 'text-black')}>Featured <br /> <span className="text-blue-600">Works.</span></BlurIn>
                  </div>

                  {/* Segmented Tabs for Filtering - Sticky */}
                  <div className="sticky top-24 sm:top-28 z-40 mb-16 py-4 pointer-events-none">
                    <Reveal delay={0.2} className="pointer-events-auto flex justify-start">
                      <SegmentTabs
                        tabs={['All Projects', 'Websites', 'Dashboards', 'Apps', 'Design Systems']}
                        activeTab={filter}
                        onChange={setFilter}
                        darkMode={darkMode}
                      />
                    </Reveal>
                  </div>

                  <StackedCards
                    items={filteredProjects}
                    renderItem={(project, index) => (
                      <ProjectCardWrapper
                        project={project}
                        index={index}
                        darkMode={darkMode}
                        onClick={(slug) => navigate("project-details", slug)}
                      />
                    )}
                  />
                </Section>
                <BlogSection darkMode={darkMode} onPostClick={(slug) => navigate("blog-details", slug)} />
                <TestimonialsSection darkMode={darkMode} />
                <ContactSection darkMode={darkMode} />
              </>
            )}

            {currentPage === 'work' && (
              <Section className="min-h-screen" eyebrow="All Projects">
                <div className="mb-16 text-left">
                  <BlurIn as="h3" className={cn(typography.h2, "font-black max-w-[24ch]", darkMode ? 'text-white' : 'text-black')}>The Archive.</BlurIn>
                </div>
                <div className="space-y-24">
                  {PROJECTS.map((p, idx) => <ProjectCardWrapper key={p.id} project={p} index={idx} darkMode={darkMode} onClick={(slug) => navigate("project-details", slug)} />)}
                </div>
              </Section>
            )}

            {currentPage === 'blog' && (
              <BlogIndexPage darkMode={darkMode} onPostClick={(slug) => navigate("blog-details", slug)} />
            )}

            {currentPage === 'project-details' && activeProject && (
              <ProjectDetailPage
                project={activeProject}
                nextProject={nextProject}
                darkMode={darkMode}
                onBack={() => navigate("work")}
                onNextProject={(slug) => navigate("project-details", slug)}
              />
            )}

            {currentPage === 'blog-details' && activePost && (
              <BlogArticlePage post={activePost} darkMode={darkMode} onBack={() => navigate("blog")} />
            )}

            {currentPage === 'about' && (
              <div>
                <Section eyebrow="About Me">
                  <div className="text-left mb-24">
                    <BlurIn as="h2" className={cn(typography.h2, "font-black mb-8 max-w-[24ch]", darkMode ? 'text-white' : 'text-black')}>Designing <br />Systems.</BlurIn>
                    <Reveal delay={0.2}><p className={cn(typography.body, "opacity-60 max-w-3xl font-medium")}>I bridge the gap between human intuition and machine precision to build products that last.</p></Reveal>
                  </div>
                </Section>
                <TestimonialsSection darkMode={darkMode} />
                <ContactSection darkMode={darkMode} />
              </div>
            )}

            {currentPage === 'contact' && <ContactSection darkMode={darkMode} />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer darkMode={darkMode} onNavigate={navigate} />
    </div>
  );
}

// --- TESTIMONIALS COMPONENTS ---

interface TestimonialCardProps {
  testimonial: Testimonial;
  darkMode: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, darkMode }) => (
  <div className={cn(
    "w-[300px] sm:w-[450px] flex-shrink-0 p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[4rem] glass border flex flex-col justify-between transition-all duration-700 hover:scale-[1.02] group",
    darkMode ? "bg-white/5 border-white/5 hover:border-white/20" : "bg-white/40 border-black/5 hover:border-black/20 shadow-2xl"
  )}>
    <p className={cn(typography.body, "font-medium italic mb-12 text-left", darkMode ? "text-gray-200" : "text-gray-800")}>"{testimonial.content}"</p>
    <div className="flex items-center gap-5 text-left">
      <div className="relative">
        <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-blue-600/30 group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center border-2 border-black">
          <Zap size={10} className="text-white fill-current" />
        </div>
      </div>
      <div className="overflow-hidden">
        <h5 className={cn(typography.h3, "font-black truncate", darkMode ? "text-white" : "text-black")}>{testimonial.name}</h5>
        <span className={cn(typography.labelXs, "tracking-[0.2em] opacity-40 truncate")}>{testimonial.role} • {testimonial.company}</span>
      </div>
    </div>
  </div>
);

const TestimonialMarqueeRow = ({ items, direction, darkMode }: { items: Testimonial[], direction: 'left' | 'right', darkMode: boolean }) => {
  const marqueeItems = [...items, ...items, ...items];
  return (
    <div className="flex overflow-hidden py-10">
      <motion.div
        className="flex gap-12 sm:gap-16 transform-gpu"
        animate={{ x: direction === 'left' ? [0, '-33.33%'] : ['-33.33%', 0] }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        style={{ width: "fit-content" }}
      >
        {marqueeItems.map((item, idx) => (
          <TestimonialCard key={`${item.id}-${idx}`} testimonial={item} darkMode={darkMode} />
        ))}
      </motion.div>
    </div>
  );
};


const TestimonialsSection = ({ darkMode }: { darkMode: boolean }) => {
  const row1 = TESTIMONIALS.slice(0, 3);
  const row2 = TESTIMONIALS.slice(3, 6);
  const row3 = TESTIMONIALS.slice(6, 9);
  return (
    <section id="testimonials" className="py-16 md:py-24 relative z-10 overflow-hidden">
      <FadeInUp>
        <Container className="relative z-20 mb-16 sm:mb-24">
          <div className="flex flex-col items-start text-left">
            <BlurIn as="span" className={cn(typography.labelXs, "text-blue-600 mb-4 sm:mb-6")}>Client Stories</BlurIn>
            <BlurIn as="h3" delay={0.1} className={cn(typography.h2, "font-black mb-6 max-w-[24ch]", darkMode ? 'text-white' : 'text-black')}>Voices of Impact.</BlurIn>
            <Reveal delay={0.2}><p className={cn(typography.body, "max-w-xl opacity-60 font-medium", darkMode ? 'text-gray-300' : 'text-gray-600')}>Trusted by industry leaders across the globe to deliver digital excellence.</p></Reveal>
          </div>
        </Container>
        <div className="relative">
          <div className={cn(
            "absolute inset-y-0 left-0 w-32 sm:w-64 z-10 bg-gradient-to-r pointer-events-none",
            darkMode ? "from-[#030303] via-[#030303]/40 to-transparent" : "from-[#fafafa] via-[#fafafa]/40 to-transparent"
          )} />
          <div className={cn(
            "absolute inset-y-0 right-0 w-32 sm:w-64 z-10 bg-gradient-to-l pointer-events-none",
            darkMode ? "from-[#030303] via-[#030303]/40 to-transparent" : "from-[#fafafa] via-[#fafafa]/40 to-transparent"
          )} />
          <div className="space-y-4">
            <TestimonialMarqueeRow items={row1} direction="left" darkMode={darkMode} />
            <TestimonialMarqueeRow items={row2} direction="right" darkMode={darkMode} />
            <TestimonialMarqueeRow items={row3} direction="left" darkMode={darkMode} />
          </div>
        </div>
      </FadeInUp>
    </section>
  );
};
