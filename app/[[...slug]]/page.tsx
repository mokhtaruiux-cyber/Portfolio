import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { buildJsonLd, buildNextMetadata, buildRuntimeSeo, resolveSiteUrl } from '../../lib/seo';
import { resolveRouteBySegments, staticRouteSegments } from '../../lib/routes';

type PageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export const dynamicParams = true;

export function generateStaticParams() {
  return staticRouteSegments().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = resolveRouteBySegments(slug);
  const seo = buildRuntimeSeo({
    currentPage: match.currentPage,
    activeProject: match.activeProject,
    activePost: match.activePost,
    path: match.path,
  });

  return buildNextMetadata(seo, {
    siteUrl: resolveSiteUrl(),
    noIndex: !match.isKnown,
  });
}

const jsonLdString = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

export default async function PortfolioRoute({ params }: PageProps) {
  const { slug } = await params;
  const match = resolveRouteBySegments(slug);

  if (!match.isKnown) {
    notFound();
  }

  const seo = buildRuntimeSeo({
    currentPage: match.currentPage,
    activeProject: match.activeProject,
    activePost: match.activePost,
    path: match.path,
  });
  const jsonLd = buildJsonLd(seo, resolveSiteUrl());

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
    />
  );
}
