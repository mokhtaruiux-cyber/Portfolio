import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { resolveBuildSiteUrl, withStaticRouteSeo } from './load-static-seo.mjs';

const { siteUrl, usingFallback } = resolveBuildSiteUrl();
if (usingFallback) {
  console.warn(`VITE_SITE_URL is missing; defaulting prerendered metadata base to ${siteUrl}.`);
}

const distDir = path.resolve(process.cwd(), 'dist');
const baseHtmlPath = path.join(distDir, 'index.html');

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const escapeAttribute = (value) => escapeHtml(value).replaceAll('"', '&quot;');

const absoluteUrl = (value) => new globalThis.URL(value, `${siteUrl}/`).toString();

const replaceTitle = (html, value) =>
  html.replace(
    /(<title\b[^>]*data-seo="title"[^>]*>).*?(<\/title>)/,
    `$1${escapeHtml(value)}$2`
  );

const replaceMeta = (html, key, value) =>
  html.replace(
    new RegExp(`(<meta\\b[^>]*data-seo="${key}"[^>]*content=")[^"]*(".*?>)`),
    `$1${escapeAttribute(value)}$2`
  );

const replaceLink = (html, key, value) =>
  html.replace(
    new RegExp(`(<link\\b[^>]*data-seo="${key}"[^>]*href=")[^"]*(".*?>)`),
    `$1${escapeAttribute(value)}$2`
  );

try {
  await withStaticRouteSeo(async (staticRouteSeo) => {
    const baseHtml = await readFile(baseHtmlPath, 'utf8');

    await Promise.all(
      staticRouteSeo.map(async (entry) => {
        const canonical = absoluteUrl(entry.path);
        const image = absoluteUrl(entry.image);
        const nextHtml = [
          [replaceTitle, entry.title],
          [(html, value) => replaceMeta(html, 'description', value), entry.description],
          [(html, value) => replaceLink(html, 'canonical', value), canonical],
          [(html, value) => replaceMeta(html, 'og:title', value), entry.title],
          [(html, value) => replaceMeta(html, 'og:description', value), entry.description],
          [(html, value) => replaceMeta(html, 'og:type', value), entry.type],
          [(html, value) => replaceMeta(html, 'og:url', value), canonical],
          [(html, value) => replaceMeta(html, 'og:image', value), image],
          [(html, value) => replaceMeta(html, 'og:image:alt', value), entry.imageAlt],
          [(html, value) => replaceMeta(html, 'twitter:url', value), canonical],
          [(html, value) => replaceMeta(html, 'twitter:title', value), entry.title],
          [(html, value) => replaceMeta(html, 'twitter:description', value), entry.description],
          [(html, value) => replaceMeta(html, 'twitter:image', value), image],
          [(html, value) => replaceMeta(html, 'twitter:image:alt', value), entry.imageAlt],
        ].reduce((html, [replace, value]) => replace(html, value), baseHtml);

        const targetPath =
          entry.path === '/'
            ? baseHtmlPath
            : path.join(distDir, entry.path.replace(/^\/+/, ''), 'index.html');

        await mkdir(path.dirname(targetPath), { recursive: true });
        await writeFile(targetPath, nextHtml, 'utf8');
      })
    );

    console.log(`Prerendered ${staticRouteSeo.length} route metadata files in ${distDir}`);
  });
} finally {
  await rm(path.join(distDir, '.DS_Store'), { force: true });
  await rm(path.join(distDir, 'assets', '.DS_Store'), { force: true });
  await rm(path.join(distDir, 'assets', 'images', '.DS_Store'), { force: true });
}
