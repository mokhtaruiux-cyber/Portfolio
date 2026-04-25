import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { resolveBuildSiteUrl, withStaticRouteSeo } from './load-static-seo.mjs';

const { siteUrl, usingFallback } = resolveBuildSiteUrl();
if (usingFallback) {
  console.warn(`VITE_SITE_URL is missing; defaulting sitemap base to ${siteUrl}.`);
}

const distDir = path.resolve(process.cwd(), 'dist');
await mkdir(distDir, { recursive: true });

await withStaticRouteSeo(async (staticRouteSeo) => {
  const routes = Array.from(new Set(staticRouteSeo.map((entry) => entry.path)));
  const urls = routes.map((route) => `${siteUrl}${route.startsWith('/') ? route : `/${route}`}`);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${urls.map((loc) => `  <url><loc>${loc}</loc></url>`).join('\n')}\n` +
    `</urlset>\n`;

  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;

  const sitemapPath = path.join(distDir, 'sitemap.xml');
  const robotsPath = path.join(distDir, 'robots.txt');

  await writeFile(sitemapPath, sitemap, 'utf8');
  await writeFile(robotsPath, robots, 'utf8');

  console.log(`Generated ${sitemapPath}`);
  console.log(`Generated ${robotsPath}`);
});
