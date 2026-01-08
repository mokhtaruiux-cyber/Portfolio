
export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  industry: string;
  platform: string;
  year: string;
  role: string;
  tools: string[];
  coverGradient: string;
  gallery: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  tags: string[];
  caseStudySections?: {
    title: string;
    content: string;
  }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  logo: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}
