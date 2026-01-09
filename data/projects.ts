import { Project } from "../types";

export const PROJECTS: Project[] = [
  {
    id: "1",
    slug: "nodel-restaurant-system",
    title: "NODEL Restaurant System",
    category: "Mobile Apps",
    industry: "Hospitality",
    platform: "Web - Mobile",
    year: "2023",
    role: "Lead Product Designer",
    tools: ["Figma", "React Native", "Node.js"],
    coverGradient: "from-orange-500/20 to-red-500/20",
    description:
      "A comprehensive smart solution designed to streamline restaurant operations, from order management to high-end customer engagement. Built with performance and scalability in mind.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=800",
    tags: ["Product Design", "Hospitality", "SaaS"],
    metrics: [
      { label: "Efficiency", value: "+40%" },
      { label: "Satisfaction", value: "4.9" },
      { label: "Error Rate", value: "-25%" },
    ],
    gallery: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-155396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200",
        alt: "Restaurant operations overview",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200",
        alt: "Service flow snapshot",
      },
      {
        type: "video",
        src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200",
        alt: "NODEL product walkthrough",
      },
    ],
    caseStudySections: [
      {
        title: "Problem",
        content:
          "Restaurant teams were juggling disconnected POS, inventory, and kitchen display tools, causing delays and inconsistent guest experiences.",
      },
      {
        title: "Process",
        content:
          "We audited peak-hour workflows, mapped bottlenecks, and prototyped faster order entry flows with real kitchen staff.",
      },
      {
        title: "Solution",
        content:
          "A unified system that syncs orders, inventory, and kitchen status in real time with a streamlined staff interface.",
      },
      {
        title: "Results",
        content:
          "Order placement time dropped dramatically while accuracy and guest satisfaction scores climbed across pilot locations.",
      },
    ],
  },
  {
    id: "2",
    slug: "nexus-fintech-dashboard",
    title: "Nexus Fintech Dashboard",
    category: "Dashboards",
    industry: "Finance",
    platform: "Web Platform",
    year: "2022",
    role: "Senior UI/UX Designer",
    tools: ["Figma", "D3.js", "Typescript"],
    coverGradient: "from-blue-500/20 to-cyan-500/20",
    description:
      "An institutional-grade financial analytics dashboard simplify complex data streams into actionable insights.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=800",
    tags: ["FinTech", "Data Viz", "SaaS"],
    metrics: [
      { label: "Transactions", value: "2M+" },
      { label: "Trust Rate", value: "99.9%" },
      { label: "Latency", value: "12ms" },
    ],
    gallery: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
        alt: "Nexus analytics dashboard",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&q=80&w=1200",
        alt: "Portfolio monitoring view",
      },
      {
        type: "video",
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
        alt: "Nexus platform overview",
      },
    ],
    caseStudySections: [
      {
        title: "Problem",
        content:
          "Traders needed instant clarity across hundreds of metrics, but the legacy UI was cluttered and slow to parse.",
      },
      {
        title: "Process",
        content:
          "We prioritized signal over noise, tested data density thresholds, and simplified the information hierarchy.",
      },
      {
        title: "Solution",
        content:
          "A modular dashboard with prioritized KPIs, flexible layouts, and real-time visual alerts.",
      },
      {
        title: "Results",
        content:
          "Teams reported faster decision cycles and higher confidence in daily portfolio monitoring.",
      },
    ],
  },
  {
    id: "3",
    slug: "aura-lifestyle-ecom",
    title: "Aura Lifestyle E-Com",
    category: "Websites",
    industry: "Retail",
    platform: "Web - Responsive",
    year: "2023",
    role: "Lead Interaction Designer",
    tools: ["Framer", "Three.js", "React"],
    coverGradient: "from-fuchsia-500/20 to-purple-500/20",
    description:
      "A premium storytelling-driven e-commerce experience for a luxury lifestyle brand focusing on motion-rich interactions.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200&h=800",
    tags: ["E-commerce", "Motion", "Retail"],
    metrics: [
      { label: "Conversion", value: "+18%" },
      { label: "AOV", value: "+$45" },
      { label: "Engagement", value: "+65%" },
    ],
    gallery: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200",
        alt: "Aura product showcase",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200",
        alt: "Lifestyle detail view",
      },
      {
        type: "video",
        src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200",
        alt: "Aura motion prototype",
      },
    ],
    caseStudySections: [
      {
        title: "Problem",
        content:
          "The brand lacked a digital flagship experience that conveyed premium quality and drove conversions on mobile.",
      },
      {
        title: "Process",
        content:
          "We mapped the purchase journey, iterated on motion prototypes, and validated performance budgets.",
      },
      {
        title: "Solution",
        content:
          "A narrative e-commerce flow with immersive product storytelling and frictionless checkout.",
      },
      {
        title: "Results",
        content:
          "Engagement and conversion rates improved while customer feedback highlighted the premium feel.",
      },
    ],
  },
  {
    id: "4",
    slug: "homecare-medical-app",
    title: "HomeCare Medical App",
    category: "Mobile Apps",
    industry: "Healthcare",
    platform: "iOS - Android",
    year: "2022",
    role: "Product Designer",
    tools: ["Swift", "Figma", "After Effects"],
    coverGradient: "from-emerald-500/20 to-teal-500/20",
    description:
      "Connecting patients with caregivers through a seamless mobile interface with real-time health monitoring.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200&h=800",
    tags: ["Healthcare", "Mobile", "Design System"],
    metrics: [
      { label: "Active Users", value: "10k+" },
      { label: "Care Quality", value: "4.8" },
      { label: "Retention", value: "85%" },
    ],
    gallery: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=1200",
        alt: "HomeCare patient dashboard",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200",
        alt: "Caregiver scheduling flow",
      },
      {
        type: "video",
        src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200",
        alt: "HomeCare app demo",
      },
    ],
    caseStudySections: [
      {
        title: "Problem",
        content:
          "Patients struggled to coordinate care visits and track progress across multiple providers.",
      },
      {
        title: "Process",
        content:
          "We interviewed patients and caregivers, then prototyped a simplified scheduling and tracking flow.",
      },
      {
        title: "Solution",
        content:
          "A mobile companion that centralizes visits, notes, and real-time health updates.",
      },
      {
        title: "Results",
        content:
          "Care teams reported faster coordination and patients felt more in control of their recovery.",
      },
    ],
  },
  {
    id: "5",
    slug: "cosmos-design-system",
    title: "Cosmos Design System",
    category: "Design Systems",
    industry: "Tech",
    platform: "Cross-platform",
    year: "2024",
    role: "Design Systems Lead",
    tools: ["Figma", "React", "Style Dictionary"],
    coverGradient: "from-violet-500/20 to-indigo-500/20",
    description:
      "A comprehensive design language and component library powering dozens of products, ensuring consistency at scale.",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=1200&h=800",
    tags: ["Design System", "Architecture", "Tokens"],
    metrics: [
      { label: "Components", value: "150+" },
      { label: "Adoption", value: "100%" },
      { label: "Speed", value: "+30%" },
    ],
    gallery: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=1200",
        alt: "Cosmos token library",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&q=80&w=1200",
        alt: "Component audit session",
      },
      {
        type: "video",
        src: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=1200",
        alt: "Design system rollout",
      },
    ],
    caseStudySections: [
      {
        title: "Problem",
        content:
          "Teams were rebuilding UI from scratch, leading to inconsistent experiences and slow delivery cycles.",
      },
      {
        title: "Process",
        content:
          "We audited 12 products, aligned stakeholders on a shared UI language, and built a scalable token system.",
      },
      {
        title: "Solution",
        content:
          "A unified design system with reusable components, documentation, and governance.",
      },
      {
        title: "Results",
        content:
          "Product teams shipped faster while maintaining consistent UX across every touchpoint.",
      },
    ],
  },
];
