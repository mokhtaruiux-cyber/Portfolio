import { siteContent } from '../content';
import type { BlogPost, PageKey, Project } from '../types';

export type SeoMetadata = {
  path: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  type: 'website' | 'article';
};

type RuntimeSeoOptions = {
  currentPage: PageKey;
  activeProject?: Project;
  activePost?: BlogPost;
  path?: string;
};

const featuredProject =
  siteContent.projects.items.find((project) => project.slug === 'homecare-medical-app') ??
  siteContent.projects.items[0];
const defaultBlogPost = siteContent.writing.items[0];
const homeImage = siteContent.hero.image.lightSrc;

const normalizePath = (path: string) => {
  if (!path) return '/';
  return path.startsWith('/') ? path : `/${path}`;
};

const normalizeSiteUrl = (value?: string) => {
  if (!value) return '';
  const trimmed = value.trim();
  if (!trimmed || trimmed.includes('%VITE_SITE_URL%')) return '';
  return trimmed.replace(/\/+$/, '');
};

const envSiteUrl = () =>
  normalizeSiteUrl((import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env?.VITE_SITE_URL);

export const DEFAULT_SITE_URL = 'https://www.mokhtar.design';

export const resolveSiteUrl = (value?: string) => {
  const configured = normalizeSiteUrl(value) || envSiteUrl();
  if (configured) return configured;
  if (typeof window !== 'undefined') {
    return window.location.origin.replace(/\/+$/, '');
  }
  return DEFAULT_SITE_URL;
};

export const toAbsoluteUrl = (pathOrUrl: string, siteUrl = resolveSiteUrl()) => {
  try {
    return new URL(pathOrUrl, `${siteUrl}/`).toString();
  } catch {
    return pathOrUrl;
  }
};

const buildProjectSeo = (project: Project): SeoMetadata => ({
  path: `/projects/${project.slug}`,
  title: `${project.title} — ${siteContent.seo.title}`,
  description: project.description,
  image: project.image,
  imageAlt: project.title,
  type: 'website',
});

const buildBlogSeo = (post: BlogPost): SeoMetadata => ({
  path: `/blog/${post.slug}`,
  title: `${post.title} — ${siteContent.seo.title}`,
  description: post.excerpt,
  image: post.coverImage,
  imageAlt: post.title,
  type: 'article',
});

const homeSeo: SeoMetadata = {
  path: '/',
  title: siteContent.seo.title,
  description: siteContent.seo.description,
  image: homeImage,
  imageAlt: siteContent.hero.imageAlt,
  type: 'website',
};

const aboutSeo: SeoMetadata = {
  path: '/about',
  title: `About — ${siteContent.seo.title}`,
  description: siteContent.about.subtitle,
  image: homeImage,
  imageAlt: siteContent.hero.imageAlt,
  type: 'website',
};

const workSeo: SeoMetadata = {
  path: '/projects',
  title: `${siteContent.featuredWork.archive.title} — ${siteContent.seo.title}`,
  description: siteContent.seo.description,
  image: featuredProject?.image ?? homeImage,
  imageAlt: featuredProject?.title ?? siteContent.hero.imageAlt,
  type: 'website',
};

const blogIndexSeo: SeoMetadata = {
  path: '/blog',
  title: `${siteContent.writing.index.title} — ${siteContent.seo.title}`,
  description: siteContent.writing.index.description,
  image: defaultBlogPost?.coverImage ?? homeImage,
  imageAlt: defaultBlogPost?.title ?? siteContent.hero.imageAlt,
  type: 'website',
};

const notFoundSeo: SeoMetadata = {
  path: '/',
  title: `404 — ${siteContent.seo.title}`,
  description: 'The requested page does not exist.',
  image: homeImage,
  imageAlt: siteContent.hero.imageAlt,
  type: 'website',
};

export const staticRouteSeo: SeoMetadata[] = [
  homeSeo,
  aboutSeo,
  workSeo,
  ...siteContent.projects.items.map(buildProjectSeo),
  blogIndexSeo,
  ...siteContent.writing.items.map(buildBlogSeo),
];

export const buildRuntimeSeo = ({
  currentPage,
  activeProject,
  activePost,
  path,
}: RuntimeSeoOptions): SeoMetadata => {
  if (activeProject) {
    return {
      ...buildProjectSeo(activeProject),
      path: normalizePath(path ?? `/projects/${activeProject.slug}`),
    };
  }

  if (activePost) {
    return {
      ...buildBlogSeo(activePost),
      path: normalizePath(path ?? `/blog/${activePost.slug}`),
    };
  }

  switch (currentPage) {
    case 'about':
      return { ...aboutSeo, path: normalizePath(path ?? aboutSeo.path) };
    case 'work':
      return { ...workSeo, path: normalizePath(path ?? workSeo.path) };
    case 'blog':
      return { ...blogIndexSeo, path: normalizePath(path ?? blogIndexSeo.path) };
    case 'not-found':
      return { ...notFoundSeo, path: normalizePath(path ?? notFoundSeo.path) };
    case 'home':
    default:
      return { ...homeSeo, path: normalizePath(path ?? homeSeo.path) };
  }
};

const upsertMetaTag = (selector: string, attributes: Record<string, string>, content: string) => {
  let node = document.head.querySelector<HTMLMetaElement>(selector);
  if (!node) {
    node = document.createElement('meta');
    Object.entries(attributes).forEach(([key, value]) => node?.setAttribute(key, value));
    document.head.appendChild(node);
  }
  node.setAttribute('content', content);
};

const upsertLinkTag = (selector: string, attributes: Record<string, string>, href: string) => {
  let node = document.head.querySelector<HTMLLinkElement>(selector);
  if (!node) {
    node = document.createElement('link');
    Object.entries(attributes).forEach(([key, value]) => node?.setAttribute(key, value));
    document.head.appendChild(node);
  }
  node.setAttribute('href', href);
};

export const applySeoToDocument = (metadata: SeoMetadata, siteUrl = resolveSiteUrl()) => {
  const canonicalUrl = toAbsoluteUrl(metadata.path, siteUrl);
  const imageUrl = toAbsoluteUrl(metadata.image, siteUrl);

  document.title = metadata.title;

  upsertMetaTag('meta[name="description"]', { name: 'description' }, metadata.description);
  upsertMetaTag('meta[name="robots"]', { name: 'robots' }, 'index, follow');
  upsertLinkTag('link[rel="canonical"]', { rel: 'canonical' }, canonicalUrl);

  upsertMetaTag('meta[property="og:title"]', { property: 'og:title' }, metadata.title);
  upsertMetaTag('meta[property="og:description"]', { property: 'og:description' }, metadata.description);
  upsertMetaTag('meta[property="og:type"]', { property: 'og:type' }, metadata.type);
  upsertMetaTag('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl);
  upsertMetaTag('meta[property="og:image"]', { property: 'og:image' }, imageUrl);
  upsertMetaTag('meta[property="og:image:alt"]', { property: 'og:image:alt' }, metadata.imageAlt);
  upsertMetaTag('meta[property="og:site_name"]', { property: 'og:site_name' }, siteContent.brand.name);

  upsertMetaTag('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image');
  upsertMetaTag('meta[name="twitter:url"]', { name: 'twitter:url' }, canonicalUrl);
  upsertMetaTag('meta[name="twitter:title"]', { name: 'twitter:title' }, metadata.title);
  upsertMetaTag('meta[name="twitter:description"]', { name: 'twitter:description' }, metadata.description);
  upsertMetaTag('meta[name="twitter:image"]', { name: 'twitter:image' }, imageUrl);
  upsertMetaTag('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt' }, metadata.imageAlt);
};
