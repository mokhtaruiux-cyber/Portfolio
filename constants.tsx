
import { Experience, Testimonial, Service } from './types';

const assetPath = (path: string) => {
  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${normalizedBase}/${normalizedPath}`;
};

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

export { PROJECTS } from "./data/projects";
export { BLOG_POSTS } from "./data/blog";
