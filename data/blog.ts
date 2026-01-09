import { BlogPost } from "../types";

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "the-future-of-ai-in-ux",
    title: "The Future of AI in UX Design",
    excerpt:
      "How generative AI is shifting the role of the designer from pixel-pusher to experience-architect.",
    category: "Future Tech",
    date: "Oct 12, 2023",
    readTime: "6 min read",
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200&h=700",
    tags: ["AI", "UX", "Design"],
    contentBlocks: [
      {
        type: "paragraph",
        text:
          "Artificial intelligence is no longer just a buzzword. It is reshaping how teams research, prototype, and iterate at speed.",
      },
      { type: "heading", text: "From Screens to Systems" },
      {
        type: "paragraph",
        text:
          "Designers are moving beyond static screens into system thinking, using AI to explore multiple paths and validate direction early.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&q=80&w=1200",
        alt: "Designer planning system flows",
        caption: "AI accelerates exploration but still needs human intent.",
      },
      { type: "heading", text: "New Responsibilities" },
      {
        type: "list",
        items: [
          "Define clear problem framing before prompting",
          "Validate outputs against user context",
          "Translate AI output into product reality",
        ],
      },
      {
        type: "quote",
        text:
          "AI can generate options, but it cannot define a meaningful direction without a human point of view.",
      },
      {
        type: "paragraph",
        text:
          "The teams that win will pair AI speed with human judgment to shape consistent experiences.",
      },
    ],
  },
  {
    id: "2",
    slug: "mastering-glassmorphism",
    title: "Mastering Glassmorphism in 2024",
    excerpt:
      "A deep dive into creating high-end frosted glass effects that maintain accessibility and performance.",
    category: "UI Design",
    date: "Sep 28, 2023",
    readTime: "8 min read",
    coverImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200&h=700",
    tags: ["Glassmorphism", "CSS", "UI"],
    contentBlocks: [
      {
        type: "paragraph",
        text:
          "Glassmorphism is more than blur. It is a balance of depth, contrast, and subtle edges that preserve readability.",
      },
      { type: "heading", text: "Contrast First" },
      {
        type: "paragraph",
        text:
          "Start with solid contrast, then add translucency. If text cannot pass contrast checks, the glass layer is too strong.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&q=80&w=1200",
        alt: "Glass UI layers",
      },
      { type: "heading", text: "Performance Budget" },
      {
        type: "paragraph",
        text:
          "Use blur sparingly. Overuse can spike GPU usage on mobile. Favor static layers and minimal motion.",
      },
      {
        type: "list",
        items: [
          "Keep blur radius modest",
          "Avoid animating blur on scroll",
          "Test on mobile Safari early",
        ],
      },
    ],
  },
  {
    id: "3",
    slug: "why-motion-matters",
    title: "Why Motion is the Soul of UX",
    excerpt:
      "Motion is not decoration. It guides the user and reveals relationships between elements.",
    category: "Interaction",
    date: "Aug 15, 2023",
    readTime: "5 min read",
    coverImage:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200&h=700",
    tags: ["Motion", "UX", "Framer"],
    contentBlocks: [
      {
        type: "paragraph",
        text:
          "In a world of static layouts, motion explains transitions and creates a sense of continuity.",
      },
      { type: "heading", text: "Motion with Purpose" },
      {
        type: "paragraph",
        text:
          "Every animation should answer a question: what changed, and why should the user care.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
        alt: "Motion storyboard",
      },
      {
        type: "quote",
        text:
          "If motion does not reduce cognitive load, it is visual noise.",
      },
      {
        type: "paragraph",
        text:
          "Keep motion subtle and consistent across devices to build trust and clarity.",
      },
    ],
  },
];
