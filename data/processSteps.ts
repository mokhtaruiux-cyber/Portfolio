import { ProcessStep } from '../types';

export const processSteps: ProcessStep[] = [
  {
    id: 'discovery',
    index: 1,
    title: 'Discovery',
    description: 'Align on goals, users, and success criteria before we move pixels.',
    why: 'Shared clarity keeps scope and outcomes tight.',
  },
  {
    id: 'strategy',
    index: 2,
    title: 'Strategy',
    description: 'Define the roadmap, information architecture, and core flows.',
    why: 'A strong plan prevents costly rework later.',
  },
  {
    id: 'design',
    index: 3,
    title: 'Design',
    description: 'Craft UI systems, interactions, and high-fidelity prototypes.',
    why: 'Design choices stay grounded in user needs.',
  },
  {
    id: 'delivery',
    index: 4,
    title: 'Delivery',
    description: 'Ship with clear specs, QA support, and iteration loops.',
    why: 'Execution quality matches the vision.',
  },
];
