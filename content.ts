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
const visibleProjectSlugs = [
  'dawwem-hr-platform',
  'restuhub-restaurant-platform',
  'ldun-redesign',
  'ironcore-gym-system',
  'homecare-medical-app',
  'nodel-restaurant-system',
];
const publishedProjects = visibleProjectSlugs
  .map((slug) => projects.find((project) => project.slug === slug && !project.isDraft))
  .filter((project): project is NonNullable<typeof project> => Boolean(project));
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
      'I bring over a decade of experience leading digital products from strategy to execution. Today, I use AI as a powerful partner in my process—helping businesses move faster from complex ideas to clear, scalable, working products without replacing the judgment, leadership, and craft that make them successful.',
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
    subtitle: 'Product leadership and hands-on AI-assisted building for complex, high-impact digital systems.',
    description:
      'I lead product and experience work across B2B and consumer platforms, and take ideas further with AI-assisted development—turning complex requirements into clear journeys, working prototypes, and demo-ready products.',
    highlights: [
      'Product strategy grounded in user insight and business constraints',
      'Design systems that scale across teams, products, and platforms',
      'AI-assisted prototypes and builds that turn ideas into working products faster',
    ],
  },
  howIHelp: {
    eyebrow: 'Service-Focused',
    titleLines: ['How I can', 'help.'],
    subtitle: 'From product strategy to a clear, scalable, demo-ready product.',
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
        id: 'ai-assisted-building',
        titleLines: ['AI-Assisted Building', '& Vibe Coding'],
        bullets: [
          'Use AI-assisted workflows to accelerate prototyping and implementation',
          'Build connected, working web and mobile experiences—not static mockups',
          'Make practical product and technical decisions while iterating in code',
        ],
        outcome: 'A working, demo-ready product stakeholders can see and use.',
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
    description: 'A focused, AI-accelerated flow that keeps teams aligned, keeps me hands-on, and reduces delivery risk.',
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
      { label: 'Vibe Coding', category: 'Vibe Coding' },
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
    livePreviewLabel: 'View live preview',
    caseStudyEyebrow: 'Case Study',
    metricsEyebrow: 'Metrics',
    nextProjectLabel: 'Next Project',
    nextProjectButton: 'View Project',
  },
  writing: {
    eyebrow: 'Blog',
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
    description: 'If you need an idea turned into a working product—not just a deck of screens—let’s bring strategy, design, and AI-assisted execution together.',
    primaryLabel: 'Book a Strategy Call',
    secondaryLabel: 'Prefer email? Contact me',
    secondaryHref: 'mailto:mokhtaruiux@gmail.com',
  },
  footer: {
    tagline: 'Product Designer and Vibe Coder turning complex ideas into clear, scalable products with AI.',
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
    title: 'Mohammed Mokhtar | Product Designer & Vibe Coder',
    description: 'Product designer and vibe coder with 10+ years of experience using strategy, UX, and AI-assisted development to ship working web and mobile products.',
  },
};
