"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";

type RadarPoint = {
  label: string;
  value: number; // 0-100
};

type Props = {
  points: RadarPoint[];
  ariaLabel: string;
  className?: string;
};

const SIZE = 320;
const CX = SIZE / 2;
const CY = SIZE / 2;
const MAX_R = 108;
const LABEL_R = MAX_R + 26;
const RINGS = [25, 50, 75, 100];

function angle(i: number, n: number) {
  return ((2 * Math.PI) / n) * i - Math.PI / 2;
}

function polar(i: number, n: number, r: number) {
  const a = angle(i, n);
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
}

function toPoints(pts: { x: number; y: number }[]) {
  return pts.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
}

export default function RadarChart({ points, ariaLabel, className = "" }: Props) {
  const shouldReduce = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(svgRef, { once: true });
  const n = points.length;

  const dataPolygon = toPoints(points.map((p, i) => polar(i, n, (p.value / 100) * MAX_R)));

  const ringPolygon = (pct: number) =>
    toPoints(Array.from({ length: n }, (_, i) => polar(i, n, (pct / 100) * MAX_R)));

  const visible = shouldReduce || isInView;

  return (
    <svg
      ref={svgRef}
      viewBox={`-16 -16 ${SIZE + 32} ${SIZE + 32}`}
      className={`w-full ${className}`}
      role="img"
      aria-label={ariaLabel}
    >
      {RINGS.map((r) => (
        <polygon key={r} points={ringPolygon(r)} fill="none" stroke="#334155" strokeWidth={0.75} />
      ))}

      {RINGS.map((r) => {
        const p = polar(0, n, (r / 100) * MAX_R);
        return (
          <text
            key={r}
            x={p.x + 4}
            y={p.y}
            fontSize={8}
            fill="#475569"
            dominantBaseline="middle"
            fontFamily="var(--font-jetbrains), monospace"
          >
            {r}
          </text>
        );
      })}

      {points.map((_, i) => {
        const end = polar(i, n, MAX_R);
        return (
          <line key={i} x1={CX} y1={CY} x2={end.x} y2={end.y} stroke="#334155" strokeWidth={0.75} />
        );
      })}

      <motion.polygon
        points={dataPolygon}
        fill="rgba(56,189,248,0.10)"
        stroke="none"
        animate={{ opacity: visible ? 1 : 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.polygon
        points={dataPolygon}
        fill="none"
        stroke="#38bdf8"
        strokeWidth={2}
        strokeLinejoin="round"
        animate={{ opacity: visible ? 1 : 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />

      {points.map((p, i) => {
        const pt = polar(i, n, (p.value / 100) * MAX_R);
        return (
          <motion.circle
            key={i}
            cx={pt.x}
            cy={pt.y}
            r={3.5}
            fill="#38bdf8"
            stroke="#0f172a"
            strokeWidth={1.5}
            animate={{ opacity: visible ? 1 : 0 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.65 + i * 0.07, duration: 0.25 }}
          />
        );
      })}

      {points.map((p, i) => {
        const lp = polar(i, n, LABEL_R);
        const a = angle(i, n);
        const cos = Math.cos(a);
        const anchor = cos > 0.15 ? "start" : cos < -0.15 ? "end" : "middle";
        return (
          <text
            key={i}
            x={lp.x}
            y={lp.y}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize={11}
            fontFamily="var(--font-inter), system-ui, sans-serif"
            fontWeight={500}
            fill="#94a3b8"
          >
            {p.label}
          </text>
        );
      })}
    </svg>
  );
}
