"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GRAPH_NODES, GRAPH_EDGES, type NodeType } from "@/lib/graph-data";
import { BP, Dimension, Registration } from "@/components/cortex/Blueprint";

const W = 660;
const H = 480;

const pos = (id: string) => GRAPH_NODES.find((n) => n.id === id)!;

function curve(sourceId: string, targetId: string) {
  const s = pos(sourceId);
  const t = pos(targetId);
  const cx = (s.x + t.x) / 2 + (t.y - s.y) * 0.2;
  const cy = (s.y + t.y) / 2 - (t.x - s.x) * 0.2;
  return { d: `M ${s.x} ${s.y} Q ${cx} ${cy} ${t.x} ${t.y}`, mx: (s.x + 2 * cx + t.x) / 4, my: (s.y + 2 * cy + t.y) / 4 };
}

// Drafting encoding: ink linework, accent for systems and constraints
const STYLE: Record<NodeType, { fill: string; stroke: string }> = {
  system:     { fill: BP.accent, stroke: BP.accent },
  team:       { fill: BP.line, stroke: BP.line },
  constraint: { fill: BP.bg, stroke: BP.accent },
  process:    { fill: BP.bg, stroke: BP.line },
  topic:      { fill: BP.bg, stroke: BP.line },
  domain:     { fill: BP.bg, stroke: BP.line },
  person:     { fill: BP.bg, stroke: BP.line },
};

export default function LiveGraph() {
  const [hovered, setHovered] = useState<string | null>(null);

  const linked = (id: string) =>
    !hovered || id === hovered || GRAPH_EDGES.some((e) =>
      (e.source === hovered && e.target === id) || (e.target === hovered && e.source === id));

  const auth = pos("auth");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none overflow-visible" role="img" aria-label="Animated knowledge graph">
      <Registration w={W} h={H} />

      {/* Construction geometry */}
      <g stroke={BP.line} fill="none" strokeOpacity={0.18}>
        <circle cx={330} cy={250} r={215} strokeDasharray="2 6" />
        <circle cx={330} cy={250} r={130} strokeDasharray="2 6" />
        <line x1={330} y1={20} x2={330} y2={470} strokeDasharray="10 4 2 4" />
        <line x1={40} y1={250} x2={620} y2={250} strokeDasharray="10 4 2 4" />
      </g>

      <Dimension x1={90} y1={36} x2={560} y2={36} label="span · 10 entities" />
      <Dimension x1={34} y1={100} x2={34} y2={380} label="depth 3" vertical />

      {GRAPH_EDGES.map((e, i) => {
        const { d, mx, my } = curve(e.source, e.target);
        const active = hovered === e.source || hovered === e.target;
        return (
          <g key={e.id} opacity={hovered && !active ? 0.15 : 1} style={{ transition: "opacity .25s" }}>
            <motion.path
              d={d}
              fill="none"
              stroke={active ? BP.accent : BP.line}
              strokeOpacity={active ? 1 : 0.75}
              strokeWidth={active ? 2 : 1.2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.6 + i * 0.12, ease: "easeInOut" }}
            />
            {/* Packet travelling along the edge */}
            <circle r={3} fill={BP.accent}>
              <animateMotion dur={`${2.6 + (i % 4) * 0.7}s`} begin={`${1.5 + i * 0.3}s`} repeatCount="indefinite" path={d} />
            </circle>
            {active && (
              <text x={mx} y={my - 6} textAnchor="middle" className="font-mono" fontSize={10} fill={BP.accent}>
                {e.label}
              </text>
            )}
          </g>
        );
      })}

      {GRAPH_NODES.map((n, i) => {
        const s = STYLE[n.type];
        return (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: linked(n.id) ? 1 : 0.2, scale: 1 }}
            transition={{ duration: 0.4, delay: hovered ? 0 : 0.2 + i * 0.08 }}
            style={{ transformOrigin: `${n.x}px ${n.y}px`, cursor: "pointer" }}
            onMouseEnter={() => setHovered(n.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <circle cx={n.x} cy={n.y} r={n.r * 0.62} fill={s.fill} stroke={s.stroke} strokeWidth={2} />
            {hovered === n.id && (
              <circle cx={n.x} cy={n.y} r={n.r * 0.62 + 7} fill="none" stroke={BP.accent} strokeWidth={1} className="dash-flow" />
            )}
            <text x={n.x + n.r * 0.62 + 8} y={n.y + 4} className="font-mono" fontSize={11} fill={BP.line}>
              {n.label}
            </text>
            <text x={n.x + n.r * 0.62 + 8} y={n.y + 16} className="font-mono" fontSize={8.5} fill={BP.line} opacity={0.5}>
              {n.type}
            </text>
          </motion.g>
        );
      })}

      {/* Callout with leader line */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: hovered ? 0 : 1 }} transition={{ delay: hovered ? 0 : 2.4 }}>
        <polyline
          points={`${auth.x - 12},${auth.y - 14} ${auth.x - 60},${auth.y - 62} ${auth.x - 170},${auth.y - 62}`}
          fill="none" stroke={BP.accent} strokeWidth={1}
        />
        <circle cx={auth.x - 12} cy={auth.y - 14} r={2.5} fill={BP.accent} />
        <text x={auth.x - 170} y={auth.y - 68} className="font-mono" fontSize={10} fill={BP.accent}>
          A · auth_system — 3 edges · 1 constraint
        </text>
      </motion.g>
    </svg>
  );
}
