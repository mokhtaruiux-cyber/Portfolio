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

const bookingUrl = 'https://cal.com/mokhtar';

export const siteContent = {
  bookingUrl,
  brand: {
    name: 'Mokhtar.',
    logoAlt: 'Mokhtar',
    logoSrc: assetPath('assets/images/Logo@4x.webp'),
  },
  nav: {
    items: navItems,
    toggleThemeLabel: 'Toggle theme',
    openMenuLabel: 'Open menu',
    menuCtaLabel: 'Book a Call',
  },
  hero: {
    title: 'Designing Digital Products That Feel Effortless.',
    description:
      'Product Designer & Creative Engineer based in Egypt. I design and build digital products where strategy, usability, and craft come together — partnering with teams across regions to ship experiences that scale and last.',
    ctaPrimary: 'Book a Call',
    ctaSecondary: 'View Selected Work',
    badgeItems: ['100+ onboarded', '$4.8M influenced', 'Design systems'],
    imageAlt: 'Mokhtar',
    image: {
      lightSrc: assetPath('assets/images/Pic-v1.webp'),
      darkSrc: assetPath('assets/images/Pic-v2-Dark.webp'),
    },
  },
  socialProof: {
    eyebrow: 'PARTNERSHIPS',
    title: 'Proud to have',
    highlight: 'worked with.',
    companies,
  },
  about: {
    eyebrow: 'About',
    title: 'Designing',
    highlight: 'Systems.',
    subtitle: 'Helping teams move from idea to launch with clarity and precision.',
    description:
      'I partner with product teams to translate complex requirements into clear, scalable digital experiences that perform across devices.',
    highlights: [
      'Product strategy grounded in real user insight',
      'Design systems that scale across teams',
      'High-fidelity prototypes that de-risk delivery',
    ],
  },
  howIHelp: {
    eyebrow: 'How I can help',
    titleLines: ['How I can', 'help.'],
    subtitle: 'Clear product design support — from strategy to scalable execution.',
    outcomeLabel: 'Outcome',
    ctaLabel: 'Book a Product Strategy Session',
    ctaHref: bookingUrl,
    cards: [
      {
        id: 'strategy-direction',
        titleLines: ['Product Strategy', '& UX Direction'],
        bullets: [
          'Clarify product goals and success metrics',
          'Map journeys that align to real outcomes',
          'Reduce ambiguity before execution',
        ],
        outcome: 'Clear direction before execution.',
      },
      {
        id: 'end-to-end-design',
        titleLines: ['End-to-End', 'Product Design'],
        bullets: [
          'Design UX flows and polished UI across web + mobile',
          'Validate early with product and engineering teams',
          'Optimize for adoption and usability',
        ],
        outcome: 'Products ready to ship, test, and grow.',
      },
      {
        id: 'design-systems',
        titleLines: ['Design Systems', '& Scalability'],
        bullets: [
          'Build systems that improve consistency and accessibility',
          'Reduce design-to-dev friction with shared tokens',
          'Enable teams to move faster without quality loss',
        ],
        outcome: 'Consistency, speed, and long-term scalability.',
      },
      {
        id: 'product-review',
        titleLines: ['Product Review', '& Optimization'],
        bullets: [
          'Identify UX gaps and usability friction',
          'Prioritize KPI-driven quick wins',
          'Deliver clear recommendations without rebuilds',
        ],
        outcome: 'Measurable improvements with focused effort.',
      },
    ],
  },
  experience: {
    eyebrow: 'Experience',
    title: 'My',
    highlight: 'Experience.',
    intro: 'A decade of product work across telecom, retail, healthcare, and SaaS.',
    items: experiences,
  },
  process: {
    eyebrow: 'Process',
    title: 'From idea to launch,',
    highlight: 'step by step.',
    description: 'A focused, repeatable flow that keeps teams aligned and shipping.',
    steps: processSteps,
  },
  featuredWork: {
    eyebrow: 'Portfolio',
    title: 'Featured',
    highlight: 'Works.',
    viewProjectLabel: 'View Project',
    filters: [
      { label: 'All Projects', category: 'All Projects' },
      { label: 'Websites', category: 'Websites' },
      { label: 'Dashboards', category: 'Dashboards' },
      { label: 'Apps', category: 'Mobile Apps' },
      { label: 'Design Systems', category: 'Design Systems' },
    ],
    archive: {
      eyebrow: 'All Projects',
      title: 'The Archive.',
    },
  },
  projects: {
    items: projects,
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
      'Exploring the intersection of technology, psychology, and design to build better digital experiences.',
    readArticleLabel: 'Read Article',
    index: {
      eyebrow: 'Blog',
      title: 'Latest Articles.',
      description:
        'Deep dives into product design, motion, and systems thinking for real-world teams.',
    },
    backToBlogLabel: 'Back to Blog',
    items: blogPosts,
  },
  testimonials: {
    eyebrow: 'Client Stories',
    title: 'Voices of',
    highlight: 'Impact.',
    description: 'Trusted by industry leaders across the globe to deliver digital excellence.',
    items: testimonials,
  },
  finalCta: {
    badge: 'Available for new projects',
    title: 'Ready to get started?',
    titleLines: ['Ready to get', 'started?'],
    description: 'Book a short discovery call to align on scope, timeline, and outcomes.',
    primaryLabel: 'Book a Call',
    secondaryLabel: 'Prefer email? Contact me',
    secondaryHref: 'mailto:mokhtaruiux@gmail.com',
  },
  footer: {
    tagline: 'Transforming complex digital challenges into high-impact product experiences.',
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
          { label: 'Book a Call', href: bookingUrl },
        ] as FooterLink[],
      },
    ],
    copyright: '© 2024 Mohammed Mokhtar • All Rights Reserved',
  },
  seo: {
    title: 'Mokhtar — Product Designer',
    description: 'Product designer and creative engineer crafting premium digital experiences.',
  },
};
