"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GRAPH_NODES, GRAPH_EDGES, NODE_COLORS } from "@/lib/graph-data";

const W = 660;
const H = 480;

function getPos(id: string) {
  const n = GRAPH_NODES.find((n) => n.id === id);
  return n ? { x: n.x, y: n.y } : { x: 0, y: 0 };
}

function EdgePath({ edge, visible, hovered }: { edge: typeof GRAPH_EDGES[0]; visible: boolean; hovered: string | null }) {
  const s = getPos(edge.source);
  const t = getPos(edge.target);
  const dx = t.x - s.x;
  const dy = t.y - s.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const cx = (s.x + t.x) / 2 + (dy * 0.25);
  const cy = (s.y + t.y) / 2 - (dx * 0.25);
  const d = `M ${s.x} ${s.y} Q ${cx} ${cy} ${t.x} ${t.y}`;

  const isActive = hovered === edge.source || hovered === edge.target;
  const opacity = hovered ? (isActive ? 1 : 0.12) : 0.45;
  const strokeW = isActive ? 2.2 : 1.2;

  return (
    <AnimatePresence>
      {visible && (
        <motion.path
          key={edge.id}
          d={d}
          fill="none"
          stroke={edge.color}
          strokeWidth={strokeW}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{ filter: isActive ? `drop-shadow(0 0 5px ${edge.color})` : undefined }}
        />
      )}
    </AnimatePresence>
  );
}

function NodeCircle({
  node,
  visible,
  hovered,
  onHover,
}: {
  node: typeof GRAPH_NODES[0];
  visible: boolean;
  hovered: string | null;
  onHover: (id: string | null) => void;
}) {
  const color = NODE_COLORS[node.type];
  const isHovered = hovered === node.id;
  const isDimmed = hovered !== null && !isHovered;

  return (
    <AnimatePresence>
      {visible && (
        <motion.g
          key={node.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: isDimmed ? 0.25 : 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          style={{ transformOrigin: `${node.x}px ${node.y}px`, cursor: "pointer" }}
          onMouseEnter={() => onHover(node.id)}
          onMouseLeave={() => onHover(null)}
        >
          {/* Outer glow ring on hover */}
          {isHovered && (
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.r + 10}
              fill="none"
              stroke={color}
              strokeWidth={1}
              initial={{ opacity: 0, r: node.r }}
              animate={{ opacity: 0.35, r: node.r + 12 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Pulse ring — always breathing */}
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={node.r + 4}
            fill="none"
            stroke={color}
            strokeWidth={0.8}
            animate={{ opacity: [0.15, 0.45, 0.15], r: [node.r + 4, node.r + 9, node.r + 4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
          />

          {/* Node body */}
          <circle
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={`${color}18`}
            stroke={color}
            strokeWidth={1.6}
            style={{ filter: isHovered ? `drop-shadow(0 0 8px ${color})` : undefined }}
          />

          {/* Label */}
          <text
            x={node.x}
            y={node.y + node.r + 14}
            textAnchor="middle"
            fontSize={10}
            fill={isHovered ? color : "#8c8378"}
            fontFamily="ui-monospace, monospace"
            style={{ pointerEvents: "none", transition: "fill 0.2s" }}
          >
            {node.label}
          </text>
        </motion.g>
      )}
    </AnimatePresence>
  );
}

export default function GraphAnimation() {
  const [visibleNodes, setVisibleNodes] = useState<Set<string>>(new Set());
  const [visibleEdges, setVisibleEdges] = useState<Set<string>>(new Set());
  const [hovered, setHovered] = useState<string | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    // Reveal nodes one by one with stagger
    GRAPH_NODES.forEach((node, i) => {
      setTimeout(() => {
        setVisibleNodes((prev) => new Set([...prev, node.id]));
      }, 300 + i * 160);
    });

    // Reveal edges after nodes start appearing
    GRAPH_EDGES.forEach((edge, i) => {
      setTimeout(() => {
        setVisibleEdges((prev) => new Set([...prev, edge.id]));
      }, 900 + i * 200);
    });
  }, []);

  return (
    <div className="relative w-full max-w-[660px] mx-auto select-none">
      {/* Radial gradient backdrop */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(224,122,84,0.06) 0%, transparent 70%)",
        }}
      />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        className="overflow-visible"
        aria-label="Sprint Engine knowledge graph animation"
      >
        {/* Grid dots */}
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#27231e" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#grid)" opacity={0.6} rx={16} />

        {/* Edges first (behind nodes) */}
        {GRAPH_EDGES.map((edge) => (
          <EdgePath
            key={edge.id}
            edge={edge}
            visible={visibleEdges.has(edge.id)}
            hovered={hovered}
          />
        ))}

        {/* Nodes */}
        {GRAPH_NODES.map((node) => (
          <NodeCircle
            key={node.id}
            node={node}
            visible={visibleNodes.has(node.id)}
            hovered={hovered}
            onHover={setHovered}
          />
        ))}
      </svg>

      {/* Tooltip on hover */}
      <AnimatePresence>
        {hovered && (() => {
          const node = GRAPH_NODES.find((n) => n.id === hovered);
          if (!node) return null;
          const color = NODE_COLORS[node.type];
          return (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.15 }}
              className="absolute top-3 right-3 rounded-xl border px-3 py-2 text-xs pointer-events-none"
              style={{ background: "#131210", borderColor: "#332e28", color }}
            >
              <div className="uppercase tracking-widest text-[10px] mb-1" style={{ color: "#8c8378" }}>
                {node.type}
              </div>
              <div className="font-bold text-sm" style={{ color }}>{node.label}</div>
              <div className="mt-1" style={{ color: "#8c8378" }}>
                {GRAPH_EDGES.filter(
                  (e) => e.source === hovered || e.target === hovered
                ).length} connection{GRAPH_EDGES.filter((e) => e.source === hovered || e.target === hovered).length !== 1 ? "s" : ""}
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 justify-center">
        {(Object.entries(NODE_COLORS) as [string, string][]).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5 text-[10px]" style={{ color: "#8c8378" }}>
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: color }} />
            {type}
          </div>
        ))}
      </div>
    </div>
  );
}
