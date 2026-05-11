import type { MetadataRoute } from 'next';

import { resolveSiteUrl, staticRouteSeo, toAbsoluteUrl } from '../lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = resolveSiteUrl();

  return staticRouteSeo.map((entry) => ({
    url: toAbsoluteUrl(entry.path, siteUrl),
    changeFrequency: entry.path === '/' ? 'monthly' : 'yearly',
    priority: entry.path === '/' ? 1 : entry.path.startsWith('/blog') ? 0.7 : 0.8,
  }));
}
