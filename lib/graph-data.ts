export type NodeType = "team" | "domain" | "topic" | "system" | "person" | "process" | "constraint";

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  x: number;
  y: number;
  r: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  color: string;
}

export const NODE_COLORS: Record<NodeType, string> = {
  team:       "#c8a87c",
  domain:     "#c89070",
  topic:      "#c89560",
  system:     "#e07a54",
  person:     "#c8906a",
  process:    "#a8a870",
  constraint: "#d4945a",
};

// Pre-computed layout — no physics needed, deterministic and fast
export const GRAPH_NODES: GraphNode[] = [
  { id: "auth",      label: "Auth System",      type: "system",     x: 300, y: 130, r: 28 },
  { id: "payments",  label: "Payments Team",    type: "team",       x: 120, y: 240, r: 32 },
  { id: "session",   label: "Session Rules",    type: "constraint", x: 480, y: 100, r: 22 },
  { id: "ratelimit", label: "Rate Limiting",    type: "process",    x: 440, y: 260, r: 24 },
  { id: "billing",   label: "Billing Sprint",   type: "topic",      x: 160, y: 380, r: 26 },
  { id: "mobile",    label: "Mobile Push",      type: "topic",      x: 340, y: 380, r: 24 },
  { id: "api",       label: "API Gateway",      type: "system",     x: 560, y: 180, r: 26 },
  { id: "onboard",   label: "Onboarding Flow",  type: "process",    x: 260, y: 270, r: 22 },
  { id: "prd",       label: "PRD: Checkout",    type: "domain",     x: 90,  y: 130, r: 20 },
  { id: "security",  label: "Security Policy",  type: "constraint", x: 540, y: 340, r: 20 },
];

export const GRAPH_EDGES: GraphEdge[] = [
  { id: "e1", source: "auth",      target: "session",   label: "has_constraint", color: "#d4945a" },
  { id: "e2", source: "auth",      target: "api",       label: "communicates",   color: "#c8a87c" },
  { id: "e3", source: "payments",  target: "billing",   label: "owns",           color: "#c8a87c" },
  { id: "e4", source: "payments",  target: "ratelimit", label: "depends_on",     color: "#e07a54" },
  { id: "e5", source: "ratelimit", target: "api",       label: "blocks",         color: "#d45454" },
  { id: "e6", source: "onboard",   target: "auth",      label: "depends_on",     color: "#e07a54" },
  { id: "e7", source: "billing",   target: "mobile",    label: "related_to",     color: "#534c45" },
  { id: "e8", source: "prd",       target: "payments",  label: "references",     color: "#c89070" },
  { id: "e9", source: "security",  target: "session",   label: "has_constraint", color: "#d4945a" },
  { id: "e10",source: "mobile",    target: "api",       label: "depends_on",     color: "#e07a54" },
];
