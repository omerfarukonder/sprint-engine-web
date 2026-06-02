"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    label: "Core memory",
    color: "#e07a54",
    title: "Organizational Knowledge Base",
    subtitle: "Every rule, constraint, and capability — extracted from natural conversation.",
    body: "As your team discusses sprint work, Sprint Engine listens for durable knowledge: team constraints, architectural rules, dependency boundaries, risk signals. It ignores the transient and captures the reusable.",
    bullets: [
      "Types: constraints, capabilities, dependencies, risks, process rules",
      "Scopes: team · system · process · project",
      "Semantic similarity links via vector embeddings",
      "Manual override with /force-kb: when you need authority",
      "Version-chained — see when a rule changed and what replaced it",
    ],
    visual: (
      <svg viewBox="0 0 280 160" className="w-full" aria-hidden>
        {[
          { x: 60,  y: 50,  r: 18, color: "#d4945a", label: "Rate Limit Rule" },
          { x: 140, y: 80,  r: 22, color: "#e07a54", label: "Auth Domain" },
          { x: 220, y: 50,  r: 16, color: "#c89560", label: "Session Policy" },
          { x: 100, y: 130, r: 15, color: "#c8a87c", label: "Payments Team" },
          { x: 200, y: 130, r: 16, color: "#e07a54", label: "API Gateway" },
        ].map((n) => (
          <g key={n.label}>
            <circle cx={n.x} cy={n.y} r={n.r + 5} fill="none" stroke={n.color} strokeWidth={0.6} opacity={0.3} />
            <circle cx={n.x} cy={n.y} r={n.r} fill={`${n.color}20`} stroke={n.color} strokeWidth={1.4} />
            <text x={n.x} y={n.y + n.r + 11} textAnchor="middle" fontSize={7} fill="#8c8378" fontFamily="monospace">{n.label}</text>
          </g>
        ))}
        {[[60,50,140,80],[140,80,220,50],[140,80,100,130],[140,80,200,130],[100,130,200,130]].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#e07a54" strokeWidth={0.8} opacity={0.35} strokeDasharray="4 3" />
        ))}
      </svg>
    ),
  },
  {
    label: "Org topology",
    color: "#c89560",
    title: "Entity Relationship Graph",
    subtitle: "A live map of who owns what.",
    body: "Sprint Engine maintains a canonical entity store — every team, system, domain, person, process, and constraint your work touches. Each entity is extracted, normalized, deduplicated by name similarity, and connected via typed relationships.",
    bullets: [
      "7 entity types · 8 relation types",
      'Alias merging: "Payments" and "Payments Team" → same node',
      "Hierarchy resolution: parent/child chains built automatically",
      "Full provenance: every node traceable to its source conversation",
    ],
    visual: (
      <svg viewBox="0 0 280 160" className="w-full" aria-hidden>
        {[
          { x: 80,  y: 40,  r: 20, color: "#c8a87c", label: "Frontend Team" },
          { x: 200, y: 40,  r: 20, color: "#c8a87c", label: "Backend Team" },
          { x: 140, y: 100, r: 22, color: "#e07a54", label: "API System" },
          { x: 60,  y: 130, r: 14, color: "#c8906a", label: "Alice" },
          { x: 220, y: 130, r: 14, color: "#c8906a", label: "Bob" },
        ].map((n) => (
          <g key={n.label}>
            <circle cx={n.x} cy={n.y} r={n.r} fill={`${n.color}20`} stroke={n.color} strokeWidth={1.4} />
            <text x={n.x} y={n.y + n.r + 11} textAnchor="middle" fontSize={7} fill="#8c8378" fontFamily="monospace">{n.label}</text>
          </g>
        ))}
        <line x1={80} y1={40} x2={140} y2={100} stroke="#c89560" strokeWidth={1.2} opacity={0.5} />
        <line x1={200} y1={40} x2={140} y2={100} stroke="#c89560" strokeWidth={1.2} opacity={0.5} />
        <line x1={80} y1={40} x2={60} y2={130} stroke="#c8a87c" strokeWidth={0.8} opacity={0.35} />
        <line x1={200} y1={40} x2={220} y2={130} stroke="#c8a87c" strokeWidth={0.8} opacity={0.35} />
        <line x1={140} y1={100} x2={220} y2={130} stroke="#d45454" strokeWidth={1} opacity={0.4} strokeDasharray="3 2" />
      </svg>
    ),
  },
  {
    label: "The full picture",
    color: "#e07a54",
    title: "Unified Cross-Source Graph",
    subtitle: "Tasks, decisions, meetings, and docs. One graph.",
    body: "The unified graph pulls from all five stores simultaneously — KB facts, sprint tasks, task history, FAQs, and meeting summaries — and builds semantic edges between them based on meaning, not just metadata.",
    bullets: [
      "5 source types: KB facts, tasks, task events, FAQs, meetings",
      "Semantic edges: cosine similarity over independent embeddings",
      "Structural edges: task_event → task (owns)",
      "Updates on every chat message via background synthesis",
    ],
    visual: (
      <svg viewBox="0 0 280 160" className="w-full" aria-hidden>
        {[
          { x: 70,  y: 50,  r: 16, color: "#e07a54", label: "KB Fact",    shape: "circle" },
          { x: 140, y: 30,  r: 16, color: "#c89560", label: "Task",        shape: "circle" },
          { x: 210, y: 50,  r: 16, color: "#e07a54", label: "Meeting",     shape: "circle" },
          { x: 100, y: 120, r: 16, color: "#c8a87c", label: "Task Event",  shape: "circle" },
          { x: 180, y: 120, r: 16, color: "#c8906a", label: "FAQ",         shape: "circle" },
        ].map((n) => (
          <g key={n.label}>
            <circle cx={n.x} cy={n.y} r={n.r} fill={`${n.color}20`} stroke={n.color} strokeWidth={1.4} />
            <text x={n.x} y={n.y + n.r + 11} textAnchor="middle" fontSize={7} fill="#8c8378" fontFamily="monospace">{n.label}</text>
          </g>
        ))}
        {[[70,50,140,30],[140,30,210,50],[70,50,100,120],[140,30,100,120],[210,50,180,120],[100,120,180,120]].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#e07a54" strokeWidth={0.9} opacity={0.3} strokeDasharray="5 3" />
        ))}
      </svg>
    ),
  },
  {
    label: "Task history",
    color: "#c8a87c",
    title: "Task Memory & Digests",
    subtitle: "Every task remembers its full story.",
    body: "Each task accumulates an append-only event log from the moment it is first mentioned. Sprint Engine condenses that log into a rolling digest — a short LLM narrative of the task's life so far.",
    bullets: [
      "Event log: deduped by content hash — no noise from repeated updates",
      "Digest: rebuilt only when new events arrive (cost-efficient)",
      "Timeline query: works in plain chat",
      "Backfill: retroactively reconstruct history from existing logs",
    ],
    visual: (
      <svg viewBox="0 0 280 160" className="w-full" aria-hidden>
        {[
          { x: 30,  y: 80, label: "Apr 1 — Started" },
          { x: 90,  y: 80, label: "Apr 5 — Blocked" },
          { x: 150, y: 80, label: "Apr 9 — Unblocked" },
          { x: 220, y: 80, label: "Apr 14 — Done" },
        ].map((e, i) => (
          <g key={e.label}>
            <line x1={i === 0 ? e.x : e.x - 60} y1={80} x2={e.x} y2={80} stroke="#c8a87c" strokeWidth={1.2} opacity={0.4} />
            <circle cx={e.x} cy={80} r={7} fill={i === 3 ? "#d4955a30" : "#d4955a15"} stroke="#c8a87c" strokeWidth={1.4} />
            <text x={e.x} y={100} textAnchor="middle" fontSize={6.5} fill="#8c8378" fontFamily="monospace">{e.label.split(" — ")[0]}</text>
            <text x={e.x} y={110} textAnchor="middle" fontSize={6.5} fill="#c8a87c" fontFamily="monospace">{e.label.split(" — ")[1]}</text>
          </g>
        ))}
        <line x1={220} y1={80} x2={260} y2={80} stroke="#c8a87c" strokeWidth={1.2} opacity={0.2} />
        <rect x={20} y={30} width={240} height={24} rx={4} fill="#d4955a08" stroke="#d4955a22" strokeWidth={1} />
        <text x={140} y={46} textAnchor="middle" fontSize={7.5} fill="#c8a87c" fontFamily="monospace">Task Digest — rolling LLM summary</text>
      </svg>
    ),
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`grid lg:grid-cols-2 gap-10 items-center py-16 border-b`}
      style={{ borderColor: "#27231e" }}
    >
      {/* Copy */}
      <div className={`flex flex-col gap-5 ${!isEven ? "lg:order-2" : ""}`}>
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{ color: feature.color, background: `${feature.color}15`, border: `1px solid ${feature.color}30` }}
          >
            {feature.label}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold leading-snug tracking-tight" style={{ color: "#f0ece4" }}>
          {feature.title}
        </h3>

        <p className="text-base font-medium" style={{ color: feature.color }}>
          {feature.subtitle}
        </p>

        <p className="text-sm leading-relaxed" style={{ color: "#8c8378" }}>
          {feature.body}
        </p>

        <ul className="flex flex-col gap-2">
          {feature.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm" style={{ color: "#8c8378" }}>
              <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
                style={{ background: `${feature.color}20`, color: feature.color }}>
                ✓
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Visual */}
      <div
        className={`rounded-2xl p-6 ${!isEven ? "lg:order-1" : ""}`}
        style={{
          background: "#161412",
          border: `1px solid ${feature.color}20`,
        }}
      >
        {feature.visual}
      </div>
    </motion.div>
  );
}

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" className="py-24 px-6" style={{ background: "transparent" }}>
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="text-center mb-4">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ color: "#f0ece4" }}
          >
            Four memory systems.{" "}
            <span className="gradient-text">One coherent picture.</span>
          </motion.h2>
        </div>

        {features.map((f, i) => (
          <FeatureCard key={f.title} feature={f} index={i} />
        ))}
      </div>
    </section>
  );
}
