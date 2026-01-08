
import { Project, Experience, Testimonial, Service, BlogPost } from './types';

const assetPath = (path: string) => {
  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${normalizedBase}/${normalizedPath}`;
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'nodel-restaurant-system',
    title: 'NODEL Restaurant System',
    category: 'Mobile Apps',
    industry: 'Hospitality',
    platform: 'Web - Mobile',
    year: '2023',
    role: 'Lead Product Designer',
    tools: ['Figma', 'React Native', 'Node.js'],
    coverGradient: 'from-orange-500/20 to-red-500/20',
    description: 'A comprehensive smart solution designed to streamline restaurant operations, from order management to high-end customer engagement. Built with performance and scalability in mind.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=800',
    tags: ['Product Design', 'Hospitality', 'SaaS'],
    metrics: [
      { label: 'Efficiency', value: '+40%' },
      { label: 'Satisfaction', value: '4.9' },
      { label: 'Error Rate', value: '-25%' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-155396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200'
    ],
    caseStudySections: [
      { title: 'The Problem', content: 'Modern restaurants face fragmented software ecosystems where POS systems don’t talk to inventory or kitchen displays, leading to delays and errors.' },
      { title: 'The Approach', content: 'We interviewed 50+ restaurant managers to map out the peak-hour chaos. We discovered that speed of entry was the #1 pain point.' },
      { title: 'The Results', content: 'Post-launch, the average time to place an order dropped from 45 seconds to 12 seconds.' }
    ]
  },
  {
    id: '2',
    slug: 'nexus-fintech-dashboard',
    title: 'Nexus Fintech Dashboard',
    category: 'Dashboards',
    industry: 'Finance',
    platform: 'Web Platform',
    year: '2022',
    role: 'Senior UI/UX Designer',
    tools: ['Figma', 'D3.js', 'Typescript'],
    coverGradient: 'from-blue-500/20 to-cyan-500/20',
    description: 'An institutional-grade financial analytics dashboard simplify complex data streams into actionable insights.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=800',
    tags: ['FinTech', 'Data Viz', 'SaaS'],
    metrics: [
      { label: 'Transactions', value: '2M+' },
      { label: 'Trust Rate', value: '99.9%' },
      { label: 'Latency', value: '12ms' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&q=80&w=1200'
    ],
    caseStudySections: [
      { title: 'The Challenge', content: 'Traders need to see hundreds of data points without feeling overwhelmed. Current tools are cluttered and slow.' }
    ]
  },
  {
    id: '3',
    slug: 'aura-lifestyle-ecom',
    title: 'Aura Lifestyle E-Com',
    category: 'Websites',
    industry: 'Retail',
    platform: 'Web - Responsive',
    year: '2023',
    role: 'Lead Interaction Designer',
    tools: ['Framer', 'Three.js', 'React'],
    coverGradient: 'from-fuchsia-500/20 to-purple-500/20',
    description: 'A premium storytelling-driven e-commerce experience for a luxury lifestyle brand focusing on motion-rich interactions.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200&h=800',
    tags: ['E-commerce', 'Motion', 'Retail'],
    metrics: [
      { label: 'Conversion', value: '+18%' },
      { label: 'AOV', value: '+$45' },
      { label: 'Engagement', value: '+65%' }
    ],
    gallery: []
  },
  {
    id: '4',
    slug: 'homecare-medical-app',
    title: 'HomeCare Medical App',
    category: 'Mobile Apps',
    industry: 'Healthcare',
    platform: 'iOS - Android',
    year: '2022',
    role: 'Product Designer',
    tools: ['Swift', 'Figma', 'After Effects'],
    coverGradient: 'from-emerald-500/20 to-teal-500/20',
    description: 'Connecting patients with caregivers through a seamless mobile interface with real-time health monitoring.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200&h=800',
    tags: ['Healthcare', 'Mobile', 'Design System'],
    metrics: [
      { label: 'Active Users', value: '10k+' },
      { label: 'Care Quality', value: '4.8' },
      { label: 'Retention', value: '85%' }
    ],
    gallery: []
  },
  {
    id: '5',
    slug: 'cosmos-design-system',
    title: 'Cosmos Design System',
    category: 'Design Systems',
    industry: 'Tech',
    platform: 'Cross-platform',
    year: '2024',
    role: 'Design Systems Lead',
    tools: ['Figma', 'React', 'Style Dictionary'],
    coverGradient: 'from-violet-500/20 to-indigo-500/20',
    description: 'A comprehensive design language and component library powering dozens of products, ensuring consistency at scale.',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=1200&h=800',
    tags: ['Design System', 'Architecture', 'Tokens'],
    metrics: [
      { label: 'Components', value: '150+' },
      { label: 'Adoption', value: '100%' },
      { label: 'Speed', value: '+30%' }
    ],
    gallery: []
  }
];

export const EXPERIENCES: Experience[] = [
  { id: '1', role: 'Lead Product Designer', company: 'Zain KSA', period: '2021 - Present', logo: assetPath('assets/images/Zain-color@4x.webp') },
  { id: '2', role: 'Senior UX Designer', company: 'Squadio', period: '2019 - 2021', logo: assetPath('assets/images/Squadio-color@4x.webp') },
  { id: '3', role: 'UX Consultant', company: 'STIPS', period: '2017 - 2019', logo: assetPath('assets/images/Stips-color@4x.webp') }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Product Director',
    company: 'Finly App',
    content: 'Mohammed is one of those rare designers who understands the business as much as the pixels. His work on our dashboard was transformative.',
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: '2',
    name: 'James Wilson',
    role: 'CTO',
    company: 'Nodel Systems',
    content: 'Exceptional attention to detail and a true partner in engineering. The frontend code he produces is as clean as his designs.',
    avatar: 'https://i.pravatar.cc/150?u=james'
  },
  {
    id: '3',
    name: 'Michael Chen',
    role: 'Founder',
    company: 'Aura Retail',
    content: 'He didn\'t just design a website; he designed a brand experience. Our conversion rates speak for themselves.',
    avatar: 'https://i.pravatar.cc/150?u=michael'
  },
  {
    id: '4',
    name: 'Elena Rodriguez',
    role: 'Head of Growth',
    company: 'Vortex',
    content: 'Collaborating with Mohammed was the best decision for our rebranding. The mobile experience is now our primary acquisition channel.',
    avatar: 'https://i.pravatar.cc/150?u=elena'
  },
  {
    id: '5',
    name: 'David Giamatti',
    role: 'UX Lead',
    company: 'STC',
    content: 'A visionary designer who knows how to push technical boundaries while maintaining absolute usability. A rare find in the industry.',
    avatar: 'https://i.pravatar.cc/150?u=david'
  },
  {
    id: '6',
    name: 'Sofia Khan',
    role: 'Marketing Manager',
    company: 'Zain',
    content: 'The speed at which he translates complex ideas into high-fidelity prototypes is unmatched. Truly professional workflow.',
    avatar: 'https://i.pravatar.cc/150?u=sofia'
  },
  {
    id: '7',
    name: 'Liam Peterson',
    role: 'CEO',
    company: 'Squadio',
    content: 'Mokhtar brings a level of polish that is hard to describe but easy to feel. Our users love the new interactions.',
    avatar: 'https://i.pravatar.cc/150?u=liam'
  },
  {
    id: '8',
    name: 'Isabella Wong',
    role: 'Lead Developer',
    company: 'Aramco Digital',
    content: 'Handover was perfect. Every state, every edge case was considered. Working with a design engineer makes a huge difference.',
    avatar: 'https://i.pravatar.cc/150?u=isabella'
  },
  {
    id: '9',
    name: 'Marcus Thorne',
    role: 'Product Owner',
    company: 'PIF Ventures',
    content: 'His ability to navigate stakeholder requirements and produce a unified design vision saved us months of development time.',
    avatar: 'https://i.pravatar.cc/150?u=marcus'
  }
];

export const SERVICES: Service[] = [
  { id: '1', title: 'Product Design', description: 'End-to-end design for complex digital products.', icon: 'Layout' },
  { id: '2', title: 'Design Systems', description: 'Scalable UI libraries that bridge design and code.', icon: 'Layers' },
  { id: '3', title: 'Motion Design', description: 'Interactive micro-interactions that feel alive.', icon: 'Zap' },
  { id: '4', title: 'Frontend Dev', description: 'Pixel-perfect React and Framer implementations.', icon: 'Monitor' }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'the-future-of-ai-in-ux',
    title: 'The Future of AI in UX Design',
    excerpt: 'How generative AI is shifting the role of the designer from pixel-pusher to experience-architect.',
    content: 'Artificial Intelligence is no longer just a buzzword in the design industry. From automated layout generation to dynamic user personas, AI is fundamentally changing how we approach user experience...',
    category: 'Future Tech',
    date: 'Oct 12, 2023',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=500',
    tags: ['AI', 'UX', 'Design']
  },
  {
    id: '2',
    slug: 'mastering-glassmorphism',
    title: 'Mastering Glassmorphism in 2024',
    excerpt: 'A deep dive into creating high-end frosted glass effects that maintain accessibility and performance.',
    content: 'Glassmorphism has evolved. It’s not just about blur anymore. It’s about light refraction, grain textures, and subtle border highlights that create true depth in digital interfaces...',
    category: 'UI Design',
    date: 'Sep 28, 2023',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800&h=500',
    tags: ['Glassmorphism', 'CSS', 'UI']
  },
  {
    id: '3',
    slug: 'why-motion-matters',
    title: 'Why Motion is the Soul of UX',
    excerpt: 'Motion isn’t just decoration; it’s a functional tool that guides the user and provides essential feedback.',
    content: 'In a world of static layouts, motion stands out. But more importantly, it explains relationships between elements. It guides the eye. It reduces cognitive load by showing transitions instead of jumps...',
    category: 'Interaction',
    date: 'Aug 15, 2023',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800&h=500',
    tags: ['Motion', 'UX', 'Framer']
  }
];
