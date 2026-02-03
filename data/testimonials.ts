import { Testimonial } from '../types';
import { assetPath } from '../lib/assetPath';

const avatarImage = (fileName: string) => assetPath(`assets/images/${fileName}`);

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Christine Zaki',
    role: 'Technical Product Manager',
    company: 'LDUN',
    content: 'I worked with Mokhtar on multiple projects and was impressed by his UI skills and professionalism. He has great attention to detail, a strong UX sense, and is very collaborative. Highly recommended.',
    avatar: avatarImage('Christine.jpg'),
  },
  {
    id: '2',
    name: 'Noha Khattab',
    role: 'Product Design Lead',
    company: 'Zain KSA',
    content: 'I had the opportunity to work with Mokhtar on complex products. He translated business needs into clear and intuitive user experiences. His design decisions were based on evidence and user research, which improved product usability. He also used AI tools and vibe coding in a smart way to speed up prototyping and deliver high-quality design solutions.',
    avatar: avatarImage('Noha.jpeg'),
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
