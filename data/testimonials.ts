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
    name: 'Kenza Mo',
    role: 'UX Designer',
    company: 'Zain KSA',
    content:
      'Working with Mokhtar is agreeable and efficient as he is flexible and responsive.\n\n' +
      'Thanks to his expertise building digital products is easy and potential issues get prevented or resolved quickly.\n\n' +
      'Mokhtar is a trusted colleague and professional that I recommend warmly.',
    avatar: avatarImage('Kenza.png'),
  },
  {
    id: '4',
    name: 'Shroug Alshehri',
    role: 'UI/UX Designer',
    company: 'Zain KSA',
    content:
      'I had the pleasure of working with Mokhtar, and I can confidently say that he is a highly talented and detail-oriented designer. His ability to translate ideas into clean, thoughtful, and visually compelling designs is impressive.\n\n' +
      'Mokhtar is professional, reliable, and always open to feedback, which makes collaboration smooth and productive. He consistently delivers high-quality work while maintaining a strong sense of creativity and user-focused thinking.',
    avatar: avatarImage('Shrouk.jpeg'),
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
    name: 'Mohammed Samir',
    role: 'UI/UX Designer',
    company: 'Zain',
    content:
      'Mohammed is an exceptional product designer with a rare ability to balance business goals, user needs, and design quality. During our time working together, he consistently demonstrated strong strategic thinking, deep UX expertise, and a clear product mindset.\n\n' +
      'He leads design with confidence, gives thoughtful feedback, and always pushes for meaningful, user-centered outcomes. Mohammed is also a great collaborator - reliable, supportive, and respected by both designers and cross-functional teams. Any organization would be lucky to have him leading product design initiatives.',
    avatar: avatarImage('Samir.jpeg'),
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
