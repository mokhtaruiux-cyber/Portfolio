import { assetPath } from '../lib/assetPath';
import { Experience } from '../types';

export const experiences: Experience[] = [
  { id: '1', role: 'Lead Product Designer', company: 'Zain KSA', period: '2021 - Present', logo: assetPath('assets/images/Zain-color@4x.webp') },
  { id: '2', role: 'Senior UX Designer', company: 'Squadio', period: '2019 - 2021', logo: assetPath('assets/images/Squadio-color@4x.webp') },
  { id: '3', role: 'UX Consultant', company: 'STIPS', period: '2017 - 2019', logo: assetPath('assets/images/Stips-color@4x.webp') },
];
