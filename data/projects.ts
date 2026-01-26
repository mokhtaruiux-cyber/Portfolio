import { Project } from '../types';
import { assetPath } from '../lib/assetPath';

const stockImage = (fileName: string) => assetPath(`assets/images/${fileName}`);

export const projects: Project[] = [
  {
    id: '1',
    slug: 'nodel-restaurant-system',
    title: 'Nodel Restaurant App',
    category: 'Mobile Apps',
    type: 'B2B Product',
    industry: 'Hospitality',
    platform: 'Web - Mobile',
    year: '2023',
    role: 'Lead Product Designer',
    tools: ['Figma', 'React Native', 'Node.js'],
    coverGradient: 'from-orange-500/20 to-red-500/20',
    description:
      'A comprehensive smart solution designed to streamline restaurant operations, from order management to high-end customer engagement. Built with performance and scalability in mind.',
    impact: 'Cut order friction and improved on-premise efficiency across peak hours.',
    image: stockImage('Nodel@4x.webp'),
    tags: ['Product Design', 'Hospitality', 'SaaS'],
    metrics: [
      { label: 'Efficiency', value: '+40%' },
      { label: 'Satisfaction', value: '4.9' },
      { label: 'Error Rate', value: '-25%' },
    ],
    gallery: [
      {
        type: 'image',
        src: stockImage('Nodel@4x.webp'),
        alt: 'Restaurant operations overview',
      },
      {
        type: 'image',
        src: stockImage('unsplash-1517248135467-4c7edcad34c4.jpg'),
        alt: 'Service flow snapshot',
      },
      {
        type: 'video',
        src: stockImage('unsplash-1559339352-11d035aa65de.jpg'),
        alt: 'NODEL product walkthrough',
      },
    ],
    caseStudySections: [
      {
        title: 'Problem',
        content:
          'Restaurant teams were juggling disconnected POS, inventory, and kitchen display tools, causing delays and inconsistent guest experiences.',
      },
      {
        title: 'Process',
        content:
          'We audited peak-hour workflows, mapped bottlenecks, and prototyped faster order entry flows with real kitchen staff.',
      },
      {
        title: 'Solution',
        content:
          'A unified system that syncs orders, inventory, and kitchen status in real time with a streamlined staff interface.',
      },
      {
        title: 'Results',
        content:
          'Order placement time dropped dramatically while accuracy and guest satisfaction scores climbed across pilot locations.',
      },
    ],
  },
  {
    id: '2',
    slug: 'homecare-medical-app',
    title: 'Home care Medical App',
    category: 'Mobile Apps',
    type: 'Healthcare App',
    industry: 'Healthcare',
    platform: 'iOS - Android',
    year: '2022',
    role: 'Product Designer',
    tools: ['Swift', 'Figma', 'After Effects'],
    coverGradient: 'from-emerald-500/20 to-teal-500/20',
    description:
      'Connecting patients with caregivers through a seamless mobile interface with real-time health monitoring.',
    impact: 'Improved care coordination and patient transparency across visits.',
    image: stockImage('Home Care@4x.webp'),
    tags: ['Healthcare', 'Mobile', 'Design System'],
    metrics: [
      { label: 'Active Users', value: '10k+' },
      { label: 'Care Quality', value: '4.8' },
      { label: 'Retention', value: '85%' },
    ],
    gallery: [
      {
        type: 'image',
        src: stockImage('Home Care@4x.webp'),
        alt: 'Home care patient dashboard',
      },
      {
        type: 'image',
        src: stockImage('Home Care@4x.webp'),
        alt: 'Caregiver scheduling flow',
      },
      {
        type: 'video',
        src: stockImage('Home Care@4x.webp'),
        alt: 'Home care app demo',
      },
    ],
    caseStudySections: [
      {
        title: 'Problem',
        content:
          'Patients struggled to coordinate care visits and track progress across multiple providers.',
      },
      {
        title: 'Process',
        content:
          'We interviewed patients and caregivers, then prototyped a simplified scheduling and tracking flow.',
      },
      {
        title: 'Solution',
        content:
          'A mobile companion that centralizes visits, notes, and real-time health updates.',
      },
      {
        title: 'Results',
        content:
          'Care teams reported faster coordination and patients felt more in control of their recovery.',
      },
    ],
  },
  {
    id: '3',
    slug: 'aura-lifestyle-ecom',
    title: 'Aura Lifestyle E-Com',
    category: 'Websites',
    type: 'E-commerce',
    industry: 'Retail',
    platform: 'Web - Responsive',
    year: '2023',
    role: 'Lead Interaction Designer',
    tools: ['Framer', 'Three.js', 'React'],
    coverGradient: 'from-fuchsia-500/20 to-purple-500/20',
    description:
      'A premium storytelling-driven e-commerce experience for a luxury lifestyle brand focusing on motion-rich interactions.',
    impact: 'Lifted engagement and conversion through immersive product storytelling.',
    image: stockImage('unsplash-1523275335684-37898b6baf30.jpg'),
    tags: ['E-commerce', 'Motion', 'Retail'],
    metrics: [
      { label: 'Conversion', value: '+18%' },
      { label: 'AOV', value: '+$45' },
      { label: 'Engagement', value: '+65%' },
    ],
    gallery: [
      {
        type: 'image',
        src: stockImage('unsplash-1483985988355-763728e1935b.jpg'),
        alt: 'Aura product showcase',
      },
      {
        type: 'image',
        src: stockImage('unsplash-1490481651871-ab68de25d43d.jpg'),
        alt: 'Lifestyle detail view',
      },
      {
        type: 'video',
        src: stockImage('unsplash-1523275335684-37898b6baf30.jpg'),
        alt: 'Aura motion prototype',
      },
    ],
    caseStudySections: [
      {
        title: 'Problem',
        content:
          'The brand lacked a digital flagship experience that conveyed premium quality and drove conversions on mobile.',
      },
      {
        title: 'Process',
        content:
          'We mapped the purchase journey, iterated on motion prototypes, and validated performance budgets.',
      },
      {
        title: 'Solution',
        content:
          'A narrative e-commerce flow with immersive product storytelling and frictionless checkout.',
      },
      {
        title: 'Results',
        content:
          'Engagement and conversion rates improved while customer feedback highlighted the premium feel.',
      },
    ],
  },
  {
    id: '5',
    slug: 'cosmos-design-system',
    title: 'Cosmos Design System',
    category: 'Design Systems',
    type: 'Design Ops',
    industry: 'Tech',
    platform: 'Cross-platform',
    year: '2024',
    role: 'Design Systems Lead',
    tools: ['Figma', 'React', 'Style Dictionary'],
    coverGradient: 'from-violet-500/20 to-indigo-500/20',
    description:
      'A comprehensive design language and component library powering dozens of products, ensuring consistency at scale.',
    impact: 'Unlocked faster delivery by standardizing shared UI components.',
    image: stockImage('unsplash-1556740749-887f6717d7e4.jpg'),
    tags: ['Design Systems', 'Scale', 'Components'],
    metrics: [
      { label: 'Components', value: '120+' },
      { label: 'Adoption', value: '35 teams' },
      { label: 'Velocity', value: '+28%' },
    ],
    gallery: [
      {
        type: 'image',
        src: stockImage('unsplash-1551434678-e076c223a692.jpg'),
        alt: 'Design system documentation',
      },
      {
        type: 'image',
        src: stockImage('unsplash-1521737604893-d14cc237f11d.jpg'),
        alt: 'Component library overview',
      },
      {
        type: 'video',
        src: stockImage('unsplash-1556740749-887f6717d7e4.jpg'),
        alt: 'Cosmos system walkthrough',
      },
    ],
    caseStudySections: [
      {
        title: 'Problem',
        content:
          'Rapid product expansion created inconsistencies and slowed teams due to duplicated UI work.',
      },
      {
        title: 'Process',
        content:
          'We audited existing UI, defined tokens and patterns, and aligned stakeholders on governance.',
      },
      {
        title: 'Solution',
        content:
          'A unified design system with shared components, docs, and tooling that scaled with product teams.',
      },
      {
        title: 'Results',
        content:
          'Design delivery accelerated while product teams gained consistency and faster onboarding.',
      },
    ],
  },
  {
    id: '6',
    slug: 'sahab-government-portal',
    title: 'Sahab Government Portal',
    category: 'Websites',
    type: 'GovTech',
    industry: 'Government',
    platform: 'Web - Enterprise',
    year: '2021',
    role: 'UX Lead',
    tools: ['Figma', 'React', 'Accessibility QA'],
    coverGradient: 'from-slate-500/20 to-blue-500/20',
    description:
      'A citizen-first portal enabling secure access to public services with clear navigation and multilingual support.',
    impact: 'Reduced service friction and improved self-service completion rates.',
    image: stockImage('unsplash-1489515217757-5fd1be406fef.jpg'),
    tags: ['GovTech', 'Accessibility', 'Service Design'],
    metrics: [
      { label: 'Adoption', value: '+64%' },
      { label: 'Task Time', value: '-35%' },
      { label: 'CSAT', value: '4.7' },
    ],
    gallery: [
      {
        type: 'image',
        src: stockImage('unsplash-1498050108023-c5249f4df085.jpg'),
        alt: 'Government portal overview',
      },
      {
        type: 'image',
        src: stockImage('unsplash-1519389950473-47ba0277781c.jpg'),
        alt: 'Citizen service workflow',
      },
      {
        type: 'video',
        src: stockImage('unsplash-1489515217757-5fd1be406fef.jpg'),
        alt: 'Sahab portal prototype',
      },
    ],
    caseStudySections: [
      {
        title: 'Problem',
        content:
          'Citizens faced fragmented workflows and confusing service navigation across departments.',
      },
      {
        title: 'Process',
        content:
          'We mapped key journeys, tested multilingual flows, and simplified top tasks into clear paths.',
      },
      {
        title: 'Solution',
        content:
          'A unified portal with role-based access, plain-language copy, and optimized request tracking.',
      },
      {
        title: 'Results',
        content:
          'Service completion rates increased while support requests dropped due to clearer self-service.',
      },
    ],
  },
];
