
export interface Company {
  name: string;
  subtitle: string;
  logoSrc: string;
  href?: string;
}

const assetPath = (path: string) => {
  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${normalizedBase}/${normalizedPath}`;
};

export const COMPANIES: Company[] = [
  {
    name: 'Zain',
    subtitle: 'Telecom',
    logoSrc: assetPath('assets/images/Zain-color@4x.webp')
  },
  {
    name: 'Squadio',
    subtitle: 'Product Studio',
    logoSrc: assetPath('assets/images/Squadio-color@4x.webp')
  },
  {
    name: 'Bitbang',
    subtitle: 'Software',
    logoSrc: assetPath('assets/images/Bitbang-color@4x.webp')
  },
  {
    name: 'HomeCare',
    subtitle: 'Healthcare',
    logoSrc: assetPath('assets/images/HomeCare-color@4x.webp')
  },
  {
    name: 'LDUN',
    subtitle: 'Real Estate',
    logoSrc: assetPath('assets/images/LDUN-color@4x.webp')
  },
  {
    name: 'NasNav',
    subtitle: 'Retail Tech',
    logoSrc: assetPath('assets/images/NasNav-color@4x.webp')
  },
  {
    name: 'Sahab',
    subtitle: 'Government',
    logoSrc: assetPath('assets/images/Sahab_express-color@4x.webp')
  },
  {
    name: 'Stips',
    subtitle: 'Consulting',
    logoSrc: assetPath('assets/images/Stips-color@4x.webp')
  },
  {
    name: 'SolutionPlus',
    subtitle: 'Development',
    logoSrc: assetPath('assets/images/SolutionPlus-color@4x.webp')
  }
];
