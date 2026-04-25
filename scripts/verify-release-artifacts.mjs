import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve(process.cwd(), 'dist');
const rawSiteUrl = process.env.VITE_SITE_URL?.trim();

if (!rawSiteUrl || rawSiteUrl.includes('%VITE_SITE_URL%')) {
  console.error('VITE_SITE_URL is required to verify release artifacts.');
  process.exit(1);
}

const siteUrl = rawSiteUrl.replace(/\/+$/, '');

const collectFiles = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return collectFiles(fullPath);
    return fullPath;
  }));

  return files.flat();
};

const textExtensions = new Set(['.html', '.txt', '.xml']);
const files = await collectFiles(distDir);
const textFiles = files.filter((filePath) => textExtensions.has(path.extname(filePath)));

const failures = [];

for (const filePath of textFiles) {
  const content = await readFile(filePath, 'utf8');
  if (content.includes('https://example.com')) {
    failures.push(`${filePath} still contains https://example.com`);
  }
  if (content.includes('dashboard-placeholder')) {
    failures.push(`${filePath} still references draft dashboard routes`);
  }
}

const requiredFiles = [
  path.join(distDir, 'sitemap.xml'),
  path.join(distDir, 'robots.txt'),
  path.join(distDir, 'projects', 'nodel-restaurant-system', 'index.html'),
  path.join(distDir, 'blog', 'how-social-media-is-reshaping-your-brain', 'index.html'),
];

for (const filePath of requiredFiles) {
  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) {
      failures.push(`${filePath} is missing`);
    }
  } catch {
    failures.push(`${filePath} is missing`);
  }
}

const robots = await readFile(path.join(distDir, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) {
  failures.push(`dist/robots.txt does not point to ${siteUrl}/sitemap.xml`);
}

const sitemap = await readFile(path.join(distDir, 'sitemap.xml'), 'utf8');
if (!sitemap.includes(`<loc>${siteUrl}/projects/nodel-restaurant-system</loc>`)) {
  failures.push(`dist/sitemap.xml is missing ${siteUrl}/projects/nodel-restaurant-system`);
}

if (failures.length > 0) {
  console.error('Release artifact verification failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Release artifacts verified for ${siteUrl}`);
