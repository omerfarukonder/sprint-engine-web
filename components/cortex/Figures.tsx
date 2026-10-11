"use client";

import { motion } from "framer-motion";
import { BP, Dimension, Registration } from "@/components/cortex/Blueprint";

// Drafting figures for the feature specs. Ink linework, one accent colour.

type N = { x: number; y: number; label: string; accent?: boolean };

function NodeFigure({ nodes, edges }: { nodes: N[]; edges: [number, number][] }) {
  return (
    <svg viewBox="0 0 320 200" className="w-full h-auto" aria-hidden>
      <Registration w={320} h={200} inset={6} />
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke={BP.line} strokeWidth={1.2}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
        />
      ))}
      {edges.map(([a, b], i) => (
        <circle key={`p${i}`} r={2.5} fill={BP.accent}>
          <animateMotion
            dur={`${2 + (i % 3) * 0.6}s`}
            begin={`${i * 0.35}s`}
            repeatCount="indefinite"
            path={`M ${nodes[a].x} ${nodes[a].y} L ${nodes[b].x} ${nodes[b].y}`}
          />
        </circle>
      ))}
      {nodes.map((n, i) => (
        <motion.g
          key={n.label}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.08 }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          <circle cx={n.x} cy={n.y} r={n.accent ? 11 : 8} fill={n.accent ? BP.accent : BP.bg} stroke={n.accent ? BP.accent : BP.line} strokeWidth={2} />
          <text x={n.x} y={n.y + 24} textAnchor="middle" className="font-mono" fontSize={9.5} fill={BP.line}>
            {n.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

export function KnowledgeFigure() {
  return (
    <NodeFigure
      nodes={[
        { x: 60, y: 50, label: "rate_limit_rule" },
        { x: 160, y: 95, label: "auth_domain", accent: true },
        { x: 265, y: 45, label: "session_policy" },
        { x: 95, y: 160, label: "payments_team" },
        { x: 235, y: 160, label: "api_gateway" },
      ]}
      edges={[[0, 1], [1, 2], [1, 3], [1, 4], [3, 4]]}
    />
  );
}

export function EntityFigure() {
  return (
    <NodeFigure
      nodes={[
        { x: 80, y: 40, label: "frontend_team" },
        { x: 240, y: 40, label: "backend_team" },
        { x: 160, y: 105, label: "api_system", accent: true },
        { x: 55, y: 160, label: "alice" },
        { x: 265, y: 160, label: "bob" },
      ]}
      edges={[[0, 2], [1, 2], [0, 3], [1, 4], [2, 4]]}
    />
  );
}

export function UnifiedFigure() {
  return (
    <NodeFigure
      nodes={[
        { x: 60, y: 55, label: "kb_fact" },
        { x: 160, y: 30, label: "task", accent: true },
        { x: 260, y: 55, label: "meeting" },
        { x: 100, y: 150, label: "task_event" },
        { x: 220, y: 150, label: "faq" },
      ]}
      edges={[[0, 1], [1, 2], [0, 3], [1, 3], [2, 4], [3, 4], [1, 4]]}
    />
  );
}

export function TimelineFigure() {
  const events = [
    { x: 40, date: "apr 01", label: "started" },
    { x: 120, date: "apr 05", label: "blocked", accent: true },
    { x: 200, date: "apr 09", label: "unblocked" },
    { x: 280, date: "apr 14", label: "done" },
  ];
  return (
    <svg viewBox="0 0 320 200" className="w-full h-auto" aria-hidden>
      <Registration w={320} h={200} inset={6} />
      <text x={20} y={40} className="font-mono" fontSize={9.5} fill={BP.line} opacity={0.5}>digest(task_42)</text>
      <motion.text
        x={20} y={58} className="font-mono" fontSize={10.5} fill={BP.line}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.6 }}
      >
        &quot;Blocked 4 days on Stripe webhook config.&quot;
      </motion.text>
      <line x1={20} y1={115} x2={300} y2={115} stroke={BP.line} strokeOpacity={0.2} strokeWidth={1.2} />
      <motion.line
        x1={20} y1={115} x2={300} y2={115} stroke={BP.line} strokeWidth={2}
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
      <Dimension x1={40} y1={180} x2={280} y2={180} label="Δt = 13 days" />
      {events.map((e, i) => (
        <motion.g
          key={e.date}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.35 }}
        >
          <circle cx={e.x} cy={115} r={7} fill={e.accent ? BP.accent : BP.bg} stroke={e.accent ? BP.accent : BP.line} strokeWidth={2} />
          <text x={e.x} y={142} textAnchor="middle" className="font-mono" fontSize={9.5} fill={BP.line} opacity={0.5}>{e.date}</text>
          <text x={e.x} y={156} textAnchor="middle" className="font-mono" fontSize={10} fill={e.accent ? BP.accent : BP.line}>{e.label}</text>
        </motion.g>
      ))}
    </svg>
  );
}
