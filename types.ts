
export type GalleryItem = {
  type: "image" | "video";
  src: string;
  alt: string;
};

export type CaseStudySection = {
  title: string;
  content: string;
};

export type PageKey = "home" | "work" | "blog" | "project-details" | "blog-details" | "about";

export type ProcessStep = {
  id: string;
  index: number;
  title: string;
  description: string;
  why: string;
};

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  type: string;
  description: string;
  impact: string;
  image: string;
  industry: string;
  platform: string;
  year: string;
  role: string;
  tools: string[];
  coverGradient: string;
  gallery: GalleryItem[];
  metrics: {
    label: string;
    value: string;
  }[];
  tags: string[];
  caseStudySections: CaseStudySection[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  logo: string;
}

export interface Company {
  name: string;
  subtitle: string;
  logoSrc: string;
  href?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export type BlogContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  coverImage: string;
  tags: string[];
  contentBlocks: BlogContentBlock[];
}
