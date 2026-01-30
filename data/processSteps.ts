import { ProcessStep } from '../types';

export const processSteps: ProcessStep[] = [
  {
    id: 'discovery',
    index: 1,
    title: 'Discovery',
    description: 'Align on goals, users, constraints, and success criteria before we move pixels.',
    why: 'Shared clarity reduces scope creep and misalignment early.',
  },
  {
    id: 'strategy',
    index: 2,
    title: 'Strategy',
    description: 'Define direction, information architecture, and core user flows.',
    why: 'A clear strategy prevents costly rework during delivery.',
  },
  {
    id: 'design',
    index: 3,
    title: 'Design',
    description: 'Craft UI systems, interactions, and high-fidelity prototypes that de-risk build.',
    why: 'Design decisions stay grounded in user needs and real constraints.',
  },
  {
    id: 'delivery',
    index: 4,
    title: 'Delivery',
    description: 'Ship with clear specs, QA support, and tight iteration loops.',
    why: 'Execution quality stays aligned with the product vision.',
  },
];
