import { siteContent } from '../content';
import type { BlogPost, PageKey, Project } from '../types';

export type RouteMatch = {
  path: string;
  currentPage: PageKey;
  activeProject?: Project;
  activePost?: BlogPost;
  isKnown: boolean;
};

const normalizeSegments = (segments?: string[]) =>
  (segments ?? []).filter((segment) => segment.length > 0);

const pathFromSegments = (segments?: string[]) => {
  const cleanSegments = normalizeSegments(segments);
  return cleanSegments.length === 0 ? '/' : `/${cleanSegments.join('/')}`;
};

export const resolveRouteBySegments = (segments?: string[]): RouteMatch => {
  const cleanSegments = normalizeSegments(segments);
  const path = pathFromSegments(cleanSegments);
  const [first, second, ...rest] = cleanSegments;

  if (!first) {
    return { path, currentPage: 'home', isKnown: true };
  }

  if (first === 'projects' && !second && rest.length === 0) {
    return { path, currentPage: 'work', isKnown: true };
  }

  if (first === 'projects' && second && rest.length === 0) {
    const activeProject = siteContent.projects.items.find((project) => project.slug === second);
    return {
      path,
      currentPage: activeProject ? 'project-details' : 'not-found',
      activeProject,
      isKnown: Boolean(activeProject),
    };
  }

  if (first === 'blog' && !second && rest.length === 0) {
    return { path, currentPage: 'blog', isKnown: true };
  }

  if (first === 'blog' && second && rest.length === 0) {
    const activePost = siteContent.writing.items.find((post) => post.slug === second);
    return {
      path,
      currentPage: activePost ? 'blog-details' : 'not-found',
      activePost,
      isKnown: Boolean(activePost),
    };
  }

  if (first === 'about' && !second && rest.length === 0) {
    return { path, currentPage: 'about', isKnown: true };
  }

  return { path, currentPage: 'not-found', isKnown: false };
};

export const staticRouteSegments = () =>
  [
    [],
    ['projects'],
    ...siteContent.projects.items.map((project) => ['projects', project.slug]),
    ['blog'],
    ...siteContent.writing.items.map((post) => ['blog', post.slug]),
    ['about'],
  ] satisfies string[][];
