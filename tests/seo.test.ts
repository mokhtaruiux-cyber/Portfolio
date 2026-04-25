import { describe, expect, it } from 'vitest';

import { siteContent } from '../content';
import { applySeoToDocument, buildRuntimeSeo, staticRouteSeo, toAbsoluteUrl } from '../lib/seo';

describe('SEO helpers', () => {
  it('builds project metadata from runtime state', () => {
    const project = siteContent.projects.items[0];
    expect(project).toBeDefined();

    const seo = buildRuntimeSeo({
      currentPage: 'project-details',
      activeProject: project,
      path: `/projects/${project?.slug}`,
    });

    expect(seo.title).toContain(project?.title ?? '');
    expect(seo.path).toBe(`/projects/${project?.slug}`);
    expect(seo.image).toBe(project?.image);
  });

  it('applies canonical and social tags to the document head', () => {
    const seo = buildRuntimeSeo({
      currentPage: 'blog',
      path: '/blog',
    });

    applySeoToDocument(seo, 'https://portfolio.example');

    expect(document.title).toBe(seo.title);
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      toAbsoluteUrl('/blog', 'https://portfolio.example')
    );
    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe(seo.title);
    expect(document.querySelector('meta[name="twitter:image"]')?.getAttribute('content')).toBe(
      toAbsoluteUrl(seo.image, 'https://portfolio.example')
    );
  });

  it('excludes draft project routes from public SEO output', () => {
    const paths = staticRouteSeo.map((entry) => entry.path);

    expect(paths).not.toContain('/projects/dashboard-placeholder-01');
    expect(paths).not.toContain('/projects/dashboard-placeholder-02');
    expect(siteContent.projects.items.every((project) => !project.isDraft)).toBe(true);
  });
});
