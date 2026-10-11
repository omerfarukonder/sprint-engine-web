// Drafting primitives shared by the Cortex blueprint figures.

import { ACCENT, INK, PAPER } from "@/lib/theme";

// Default drawing colours: ink on paper
export const BP = {
  bg: PAPER,
  line: INK,
  accent: ACCENT,
};

// Corner crop/registration marks
export function Registration({
  w, h, inset = 8, color = BP.line,
}: {
  w: number; h: number; inset?: number; color?: string;
}) {
  return (
    <g stroke={color} strokeOpacity={0.6} strokeWidth={1}>
      {[[inset, inset], [w - inset, inset], [inset, h - inset], [w - inset, h - inset]].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <line x1={x - 6} y1={y} x2={x + 6} y2={y} />
          <line x1={x} y1={y - 6} x2={x} y2={y + 6} />
        </g>
      ))}
    </g>
  );
}

// Engineering dimension line: arrows, end ticks and a centred label
export function Dimension({
  x1, y1, x2, y2, label, vertical = false, color = BP.line,
}: {
  x1: number; y1: number; x2: number; y2: number; label: string; vertical?: boolean; color?: string;
}) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const a = 5;
  return (
    <g stroke={color} strokeOpacity={0.55} strokeWidth={1} fill="none">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      {vertical ? (
        <>
          <line x1={x1 - 6} y1={y1} x2={x1 + 6} y2={y1} />
          <line x1={x2 - 6} y1={y2} x2={x2 + 6} y2={y2} />
          <polyline points={`${x1 - a},${y1 + a * 1.6} ${x1},${y1} ${x1 + a},${y1 + a * 1.6}`} />
          <polyline points={`${x2 - a},${y2 - a * 1.6} ${x2},${y2} ${x2 + a},${y2 - a * 1.6}`} />
          <text
            x={mx - 8} y={my} textAnchor="middle" className="font-mono" fontSize={9.5}
            fill={color} stroke="none" opacity={0.75} transform={`rotate(-90 ${mx - 8} ${my})`}
          >
            {label}
          </text>
        </>
      ) : (
        <>
          <line x1={x1} y1={y1 - 6} x2={x1} y2={y1 + 6} />
          <line x1={x2} y1={y2 - 6} x2={x2} y2={y2 + 6} />
          <polyline points={`${x1 + a * 1.6},${y1 - a} ${x1},${y1} ${x1 + a * 1.6},${y1 + a}`} />
          <polyline points={`${x2 - a * 1.6},${y2 - a} ${x2},${y2} ${x2 - a * 1.6},${y2 + a}`} />
          <text x={mx} y={my - 7} textAnchor="middle" className="font-mono" fontSize={9.5} fill={color} stroke="none" opacity={0.75}>
            {label}
          </text>
        </>
      )}
    </g>
  );
}
