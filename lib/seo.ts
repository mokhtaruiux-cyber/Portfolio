import { assetPath } from './assetPath';

const upsertMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

const upsertLink = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

export const resolveSiteUrl = () => {
  const configured = import.meta.env.VITE_SITE_URL?.trim();
  if (configured) {
    return configured.replace(/\/+$/, '');
  }

  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin.replace(/\/+$/, '');
  }

  return '';
};

export const buildCanonicalUrl = (pathname: string) => {
  const siteUrl = resolveSiteUrl();
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  return siteUrl ? `${siteUrl}${normalizedPath}` : normalizedPath;
};

export const applySeoMetadata = ({
  title,
  description,
  pathname,
  robots = 'index, follow',
}: {
  title: string;
  description: string;
  pathname: string;
  robots?: string;
}) => {
  const canonicalUrl = buildCanonicalUrl(pathname);
  const previewImage = `${resolveSiteUrl()}${assetPath('assets/images/Pic-v1.webp')}`;

  document.title = title;

  upsertMeta('meta[name="description"]', { name: 'description', content: description });
  upsertMeta('meta[name="robots"]', { name: 'robots', content: robots });

  upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });

  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
  upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
  upsertMeta('meta[property="og:image"]', { property: 'og:image', content: previewImage });
  upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: 'Mokhtar portrait' });
  upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'Mokhtar.' });

  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
  upsertMeta('meta[name="twitter:url"]', { name: 'twitter:url', content: canonicalUrl });
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: previewImage });
  upsertMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: 'Mokhtar portrait' });
};
