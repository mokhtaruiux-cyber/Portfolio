/**
 * IMPORTANT: Routes in this file must be manually synchronized with:
 * - App.tsx (route definitions)
 * - content.ts (project/blog slugs)
 * 
 * Add new routes here when adding pages to the app.
 */
import { access, writeFile } from 'node:fs/promises';
import path from 'node:path';

const raw = process.env.VITE_SITE_URL;
const isPlaceholder = !raw || raw.includes('%VITE_SITE_URL%');
const isCi = process.env.CI === 'true' || process.env.NODE_ENV === 'production';

let baseUrl = raw ?? '';
if (isPlaceholder) {
  if (isCi) {
    console.error('VITE_SITE_URL is required to generate sitemap.xml in CI/production.');
    process.exit(1);
  }
  const outputPath = path.resolve(process.cwd(), 'public', 'sitemap.xml');
  try {
    await access(outputPath);
    console.warn(`VITE_SITE_URL is missing; keeping existing sitemap at ${outputPath}.`);
    process.exit(0);
  } catch {
    console.warn('VITE_SITE_URL is missing; skipping sitemap generation outside CI.');
    process.exit(0);
  }
}

const siteUrl = baseUrl.replace(/\/+$/, '');

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
