import { Testimonial } from '../types';
import { assetPath } from '../lib/assetPath';

const avatarImage = (fileName: string) => assetPath(`assets/images/${fileName}`);

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Product Director',
    company: 'Finly App',
    content: 'Mohammed is one of those rare designers who understands the business as much as the pixels. His work on our dashboard was transformative.',
    avatar: avatarImage('avatar-sarah.jpg'),
  },
  {
    id: '2',
    name: 'James Wilson',
    role: 'CTO',
    company: 'Nodel Systems',
    content: 'Exceptional attention to detail and a true partner in engineering. The frontend code he produces is as clean as his designs.',
    avatar: avatarImage('avatar-james.jpg'),
  },
  {
    id: '3',
    name: 'Michael Chen',
    role: 'Founder',
    company: 'Aura Retail',
    content: "He didn't just design a website; he designed a brand experience. Our conversion rates speak for themselves.",
    avatar: avatarImage('avatar-michael.jpg'),
  },
  {
    id: '4',
    name: 'Elena Rodriguez',
    role: 'Head of Growth',
    company: 'Vortex',
    content: 'Collaborating with Mohammed was the best decision for our rebranding. The mobile experience is now our primary acquisition channel.',
    avatar: avatarImage('avatar-elena.jpg'),
  },
  {
    id: '5',
    name: 'David Giamatti',
    role: 'UX Lead',
    company: 'STC',
    content: 'A visionary designer who knows how to push technical boundaries while maintaining absolute usability. A rare find in the industry.',
    avatar: avatarImage('avatar-david.jpg'),
  },
  {
    id: '6',
    name: 'Sofia Khan',
    role: 'Marketing Manager',
    company: 'Zain',
    content: 'The speed at which he translates complex ideas into high-fidelity prototypes is unmatched. Truly professional workflow.',
    avatar: avatarImage('avatar-sofia.jpg'),
  },
  {
    id: '7',
    name: 'Liam Peterson',
    role: 'CEO',
    company: 'Squadio',
    content: 'Mokhtar brings a level of polish that is hard to describe but easy to feel. Our users love the new interactions.',
    avatar: avatarImage('avatar-liam.jpg'),
  },
  {
    id: '8',
    name: 'Isabella Wong',
    role: 'Lead Developer',
    company: 'Aramco Digital',
    content: 'Handover was perfect. Every state, every edge case was considered. Working with a design engineer makes a huge difference.',
    avatar: avatarImage('avatar-isabella.jpg'),
  },
  {
    id: '9',
    name: 'Marcus Thorne',
    role: 'Product Owner',
    company: 'PIF Ventures',
    content: 'His ability to navigate stakeholder requirements and produce a unified design vision saved us months of development time.',
    avatar: avatarImage('avatar-marcus.jpg'),
  },
];
