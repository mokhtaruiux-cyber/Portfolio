import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const raw = process.env.VITE_SITE_URL;
if (!raw || raw.includes('%VITE_SITE_URL%')) {
  console.error('VITE_SITE_URL is required to generate sitemap.xml');
  process.exit(1);
}

const siteUrl = raw.replace(/\/+$/, '');

const routes = [
  '/',
  '/about',
  '/projects',
  '/projects/nodel-restaurant-system',
  '/projects/homecare-medical-app',
  '/projects/aura-lifestyle-ecom',
  '/projects/cosmos-design-system',
  '/projects/sahab-government-portal',
  '/blog',
  '/blog/the-future-of-ai-in-ux',
  '/blog/mastering-glassmorphism',
  '/blog/why-motion-matters'
];

const urls = routes.map((route) => {
  const normalized = route.startsWith('/') ? route : `/${route}`;
  return `${siteUrl}${normalized}`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  `${urls.map((loc) => `  <url><loc>${loc}</loc></url>`).join('\n')}\n` +
  `</urlset>\n`;

const outputPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');
await writeFile(outputPath, xml, 'utf8');
console.log(`Generated ${outputPath}`);
