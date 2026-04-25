import { assetPath } from './lib/assetPath';
import { PageKey } from './types';
import { companies } from './data/companies';
import { experiences } from './data/experiences';
import { testimonials } from './data/testimonials';
import { projects } from './data/projects';
import { blogPosts } from './data/blogPosts';
import { processSteps } from './data/processSteps';

type FooterLink = {
  label: string;
  href?: string;
  page?: PageKey;
  sectionId?: string;
};

type NavItem = {
  label: string;
  page?: PageKey;
  sectionId?: string;
};


const navItems: NavItem[] = [
  { label: 'About', sectionId: 'about' },
  { label: 'Experience', sectionId: 'experience' },
  { label: 'Process', sectionId: 'process' },
  { label: 'Work', sectionId: 'work' },
];

const calLink = 'mohammed-mokhtar/30min';
const bookingUrl = `https://cal.com/${calLink}`;
const calNamespace = 'book-call';
const calConfig = { layout: 'month_view' } as const;
const calConfigJson = JSON.stringify(calConfig);
const visibleProjectSlugs = new Set(['homecare-medical-app', 'nodel-restaurant-system']);
const publishedProjects = projects.filter((project) => !project.isDraft && visibleProjectSlugs.has(project.slug));
const publicProjectCategories = new Set(publishedProjects.map((project) => project.category));
const visibleTestimonialNames = new Set(['Christine Zaki', 'Noha Khattab', 'Kenza Mo', 'Shroug Alshehri', 'Mohammed Samir']);
const publishedTestimonials = testimonials.filter((testimonial) => visibleTestimonialNames.has(testimonial.name));

export const siteContent = {
  bookingUrl,
  cal: {
    link: calLink,
    namespace: calNamespace,
    config: calConfig,
    configJson: calConfigJson,
  },
  brand: {
    name: 'Mokhtar.',
    logoAlt: 'Mokhtar',
    logoSrc: assetPath('assets/images/Logo@4x.webp'),
  },
  nav: {
    items: navItems,
    toggleThemeLabel: 'Toggle theme',
    openMenuLabel: 'Open menu',
    menuCtaLabel: 'Book a Strategy Call',
  },
  hero: {
    title: 'Designing Digital Products That Scale With Clarity.',
    description:
      'Digital Product Designer and Creative Engineer helping teams turn complex ideas into clear, scalable products. I partner with cross-functional teams to align strategy, usability, and execution across web and mobile.',
    ctaPrimary: 'Book a Strategy Call',
    ctaSecondary: 'View Selected Work',
    badgeItems: ['100+ companies onboarded', '$4.8M in funding influenced', 'Scalable design systems'],
    imageAlt: 'Mokhtar',
    image: {
      lightSrc: assetPath('assets/images/Pic-v1.webp'),
      darkSrc: assetPath('assets/images/Pic-v2-Dark.webp'),
    },
  },
  socialProof: {
    eyebrow: 'PARTNERSHIPS',
    title: 'Working with',
    highlight: 'teams across.',
    companies,
  },
  about: {
    eyebrow: 'About',
    title: 'Building Clarity',
    highlight: 'at Scale.',
    subtitle: 'Product and experience leadership for complex, high-impact digital systems.',
    description:
      'I lead product and experience work across B2B and consumer platforms—partnering with product, engineering, and stakeholders to turn complex requirements into clear journeys, scalable systems, and measurable outcomes..',
    highlights: [
      'Product strategy grounded in user insight and business constraints',
      'Design systems that scale across teams, products, and platforms',
      'High-fidelity prototypes that reduce delivery risk and rework',
    ],
  },
  howIHelp: {
    eyebrow: 'Service-Focused',
    titleLines: ['How I can', 'help.'],
    subtitle: 'End-to-end digital product design and execution — from brand foundations to production-ready handoff.',
    outcomeLabel: 'Outcome',
    ctaLabel: 'Book a Product Strategy Session',
    ctaHref: bookingUrl,
    cards: [
      {
        id: 'strategy-direction',
        titleLines: ['Product Strategy', '& UX Direction'],
        bullets: [
          'Clarify product goals, constraints, and success metrics',
          'Map journeys that align to business and user outcomes',
          'Reduce ambiguity before design and build',
        ],
        outcome: 'Shared clarity and confident execution decisions.',
      },
      {
        id: 'end-to-end-design',
        titleLines: ['End-to-End', 'Product Design'],
        bullets: [
          'Design UX flows and polished UI across web and mobile',
          'Validate early with product and engineering partners',
          'Optimize for usability, adoption, and retention',
        ],
        outcome: 'Production-ready products designed to ship, test, and scale.',
      },
      {
        id: 'design-systems',
        titleLines: ['Design Systems', '& Scalability'],
        bullets: [
          'Build systems that improve consistency, accessibility, and quality',
          'Reduce design-to-dev friction with shared tokens and patterns',
          'Enable teams to move faster without sacrificing craft',
        ],
        outcome: 'Consistent, accessible systems that scale across teams and products.',
      },
      {
        id: 'product-review',
        titleLines: ['Product Review', '& Optimization'],
        bullets: [
          'Identify UX gaps, friction, and drop-off points',
          'Prioritize KPI-driven wins and high-leverage fixes',
          'Deliver clear recommendations without unnecessary rebuilds',
        ],
        outcome: 'Targeted improvements with measurable impact and focused effort.',
      },
    ],
  },
  experience: {
    eyebrow: 'Experience',
    title: 'My',
    highlight: 'Experience.',
    intro: 'Over a decade of hands-on product work across telecom, retail, healthcare, and SaaS.',
    items: experiences,
  },
  process: {
    eyebrow: 'Process',
    title: 'From idea to launch,',
    highlight: 'step by step.',
    description: 'A focused, repeatable flow that keeps teams aligned and reduces delivery risk.',
    steps: processSteps,
  },
  featuredWork: {
    eyebrow: 'Portfolio',
    title: 'Featured',
    highlight: 'Works.',
    viewProjectLabel: 'View Project',
    filters: [
      { label: 'All Projects', category: 'All Projects' },
      { label: 'Apps', category: 'Mobile Apps' },
      { label: 'Websites', category: 'Websites' },
      { label: 'Design Systems', category: 'Design Systems' },
    ].filter((item) => item.category === 'All Projects' || publicProjectCategories.has(item.category)),
    archive: {
      eyebrow: 'All Projects',
      title: 'The Archive.',
    },
  },
  projects: {
    items: publishedProjects,
    impactLabel: 'Impact',
  },
  projectDetail: {
    backToWorkLabel: 'Back to Work',
    metaLabels: {
      role: 'Role',
      year: 'Year',
      tools: 'Tools',
    },
    galleryEyebrow: 'Gallery',
    caseStudyEyebrow: 'Case Study',
    metricsEyebrow: 'Metrics',
    nextProjectLabel: 'Next Project',
    nextProjectButton: 'View Project',
    videoLabel: 'VIDEO',
  },
  writing: {
    eyebrow: 'Insights',
    title: 'Thoughts &',
    highlight: 'Perspectives.',
    description:
      'Thoughts on product design, user behavior, and building better digital experiences.',
    readArticleLabel: 'Read Article',
    index: {
      eyebrow: 'Blog',
      title: 'Latest Articles.',
      description:
        'Deep dives into product design, motion, and systems thinking for real teams and real constraints.',
    },
    backToBlogLabel: 'Back to Blog',
    items: blogPosts,
  },
  testimonials: {
    eyebrow: 'Client Stories',
    title: 'Voices of',
    highlight: 'Impact.',
    description: 'Trusted by teams and leaders across regions to deliver high-impact digital products.',
    items: publishedTestimonials,
  },
  finalCta: {
    badge: 'Available for new projects',
    title: 'Ready to get started?',
    titleLines: ['Ready to get', 'started?'],
    description: 'Book a short strategy call to align on goals, scope, and expected outcomes.',
    primaryLabel: 'Book a Strategy Call',
    secondaryLabel: 'Prefer email? Contact me',
    secondaryHref: 'mailto:mokhtaruiux@gmail.com',
  },
  footer: {
    tagline: 'Transforming complex digital challenges into clear, scalable product experiences.',
    columns: [
      {
        title: 'Navigation',
        links: navItems.map((item) => ({
          label: item.label,
          page: item.page,
          sectionId: item.sectionId,
        })) as FooterLink[],
      },
      {
        title: 'Links',
        links: [
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mokhtaruiux/' },
          { label: 'Email', href: 'mailto:mokhtaruiux@gmail.com' },
          { label: 'Book a Strategy Call', href: bookingUrl },
        ] as FooterLink[],
      },
    ],
    copyright: '© 2026 Mohammed Mokhtar • All Rights Reserved',
  },
  seo: {
    title: 'Mohammed Mokhtar | Product Designer & Engineer',
    description: 'Product designer and creative engineer crafting premium digital experiences.',
  },
};
