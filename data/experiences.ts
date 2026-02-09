import { assetPath } from '../lib/assetPath';
import { Experience } from '../types';

export const experiences: Experience[] = [
  { id: '1', role: 'Senior Digital Product Designer', company: 'Zain', period: 'Nov 2024 – Present', logo: assetPath('assets/images/Zain-color@4x.webp') },
  { id: '2', role: 'Senior Digital Product Designer', company: 'Squadio', period: 'Sep 2021 – Present', logo: assetPath('assets/images/Squadio-color@4x.webp') },
  { id: '3', role: 'Senior Digital Product Designer', company: 'Stips', period: 'Jul 2021 – Feb 2022', logo: assetPath('assets/images/Stips-color@4x.webp') },
  { id: '4', role: 'Senior Digital Product Designer / Design Team Lead', company: 'SolutionPlus', period: 'May 2018 – Jun 2021', logo: assetPath('assets/images/SolutionPlus-color@4x.webp') },
  { id: '5', role: 'Senior Digital Product Designer', company: 'Freelance', period: 'Apr 2015 – Jun 2021', logo: assetPath('assets/images/Logo@4x.webp') },
];
