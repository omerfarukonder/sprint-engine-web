// Site-wide content. Values marked PLACEHOLDER still need a final decision.

export const COMPANY_NAME = "Reasoning Mechanics";
export const CONTACT_EMAIL = "hello@reasoningmechanics.com";
export const CONTACT_HREF = "/contact";

export interface Product {
  slug: string;
  label: string;
  href: string;
  description: string;
  status: string;
  cta: { label: string; href: string };
  // In-page sections shown in the sticky product bar (ids must exist on the page)
  sections: { id: string; label: string }[];
}

export const products: Product[] = [
  {
    slug: "cortex",
    label: "Cortex",
    href: "/products/cortex",
    description: "Sprint memory for engineering teams.",
    status: "Early access",
    cta: { label: "Get early access", href: "#pricing" },
    sections: [
      { id: "problem", label: "Problem" },
      { id: "method", label: "Method" },
      { id: "features", label: "Components" },
      { id: "how", label: "Usage" },
      { id: "pricing", label: "Pricing" },
      { id: "faq", label: "FAQ" },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug)!;

export interface Service {
  slug: string;
  label: string;
  description: string;
  outcomes: string[];
}

// PLACEHOLDER — service lineup
export const services: Service[] = [
  {
    slug: "ai-strategy",
    label: "AI Strategy",
    description: "Where AI pays off in your company, and where it doesn't.",
    outcomes: ["Use-case audit", "Build vs. buy", "90-day roadmap"],
  },
  {
    slug: "llm-integration",
    label: "LLM & Agents",
    description: "Assistants, agents and search, shipped into your product.",
    outcomes: ["Architecture", "Retrieval & evals", "Build with your team"],
  },
  {
    slug: "knowledge-systems",
    label: "Knowledge Systems",
    description: "Docs, chats and meetings turned into answers people can find.",
    outcomes: ["Source mapping", "Graph design", "Internal Q&A"],
  },
  {
    slug: "engineering-process",
    label: "Engineering Process",
    description: "Planning, ownership and decision records that survive turnover.",
    outcomes: ["Sprint health check", "Decision logs", "AI-assisted delivery"],
  },
];

export const serviceHref = (slug: string) => `/solutions#${slug}`;
