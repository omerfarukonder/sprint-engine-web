"use client";

import { motion } from "framer-motion";
import { Dimension, Registration } from "@/components/cortex/Blueprint";
import { ACCENT } from "@/lib/theme";

const W = 1200;
const H = 380;
const MID = H / 2;

const sources = [
  { label: "chat.updates", note: "slack · teams" },
  { label: "meetings", note: "audio → transcript" },
  { label: "sprint_plan.docx", note: "task table" },
  { label: "prd.pdf", note: "requirements" },
];

const stages = [
  { x: 470, label: "Extract", note: "llm · entities, rules" },
  { x: 700, label: "Resolve", note: "dedupe · alias merge" },
  { x: 930, label: "Graph", note: "typed + semantic edges" },
  { x: 1130, label: "Query", note: "plain language" },
];

const srcY = (i: number) => 60 + i * ((H - 120) / (sources.length - 1));
const srcPath = (i: number) => `M 190 ${srcY(i)} C 330 ${srcY(i)}, 330 ${MID}, ${stages[0].x - 26} ${MID}`;
const trunk = `M ${stages[0].x} ${MID} L ${stages[stages.length - 1].x} ${MID}`;

export default function Pipeline() {
  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[760px] h-auto" role="img" aria-label="Cortex ingestion pipeline">
        <Registration w={W} h={H} />
        <Dimension x1={stages[0].x} y1={24} x2={stages[stages.length - 1].x} y2={24} label="background synthesis · runs on every message" />

        {/* Source → extract curves */}
        {sources.map((s, i) => (
          <g key={s.label}>
            <text x={0} y={srcY(i) - 4} className="font-mono" fontSize={15} fill="#14110f">{s.label}</text>
            <text x={0} y={srcY(i) + 14} className="font-mono" fontSize={11} fill="#14110f" opacity={0.4}>{s.note}</text>
            <path d={srcPath(i)} fill="none" stroke="#14110f" strokeOpacity={0.35} strokeWidth={1.2} className="dash-flow" />
            {[0, 1].map((k) => (
              <rect key={k} width={6} height={6} x={-3} y={-3} fill={ACCENT}>
                <animateMotion dur="2.8s" begin={`${i * 0.45 + k * 1.4}s`} repeatCount="indefinite" path={srcPath(i)} />
              </rect>
            ))}
          </g>
        ))}

        {/* Trunk */}
        <line x1={stages[0].x} y1={MID} x2={stages[stages.length - 1].x} y2={MID} stroke={ACCENT} strokeWidth={2} />
        {[0, 1, 2, 3].map((k) => (
          <circle key={k} r={4} fill="#14110f">
            <animateMotion dur="3.2s" begin={`${k * 0.8}s`} repeatCount="indefinite" path={trunk} />
          </circle>
        ))}

        {/* Stages */}
        {stages.map((s, i) => (
          <motion.g
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.15 }}
          >
            <circle cx={s.x} cy={MID} r={22} fill="#f1ece3" stroke={ACCENT} strokeWidth={2} />
            <circle cx={s.x} cy={MID} r={7} fill={ACCENT} />
            <circle cx={s.x} cy={MID} r={32} fill="none" stroke={ACCENT} strokeOpacity={0.4} className="dash-flow" />
            <text x={s.x} y={MID - 52} textAnchor="middle" className="font-mono" fontSize={11} fill={ACCENT}>
              {String(i + 1).padStart(2, "0")}
            </text>
            <text x={s.x} y={MID + 66} textAnchor="middle" fontSize={22} fontWeight={500} fill="#14110f" style={{ fontFamily: "var(--font-inter-tight)" }}>
              {s.label}
            </text>
            <text x={s.x} y={MID + 86} textAnchor="middle" className="font-mono" fontSize={11} fill="#14110f" opacity={0.5}>
              {s.note}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
