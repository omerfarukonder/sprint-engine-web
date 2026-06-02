"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

interface ParticleFieldProps {
  density?: number;          // particles per 10,000 px²
  linkDistance?: number;     // max distance to draw a connecting line
  mouseRadius?: number;      // mouse influence radius
  speed?: number;            // baseline drift speed
  color?: string;            // base color (hex)
  className?: string;
}

export default function ParticleField({
  density = 0.10,
  linkDistance = 130,
  mouseRadius = 160,
  speed = 0.25,
  color = "#e07a54",
  className = "",
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.max(1, window.devicePixelRatio || 1);

    const hex = color.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.max(40, Math.floor((width * height) / 10000 * density));
      const current = particlesRef.current;
      if (current.length === 0) {
        for (let i = 0; i < target; i++) {
          current.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * speed,
            vy: (Math.random() - 0.5) * speed,
            size: 0.7 + Math.random() * 1.4,
          });
        }
      } else if (current.length < target) {
        for (let i = current.length; i < target; i++) {
          current.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * speed,
            vy: (Math.random() - 0.5) * speed,
            size: 0.7 + Math.random() * 1.4,
          });
        }
      } else if (current.length > target) {
        current.length = target;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const tick = () => {
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouseRadius * mouseRadius && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const force = (mouseRadius - dist) / mouseRadius;
            p.vx += (dx / dist) * force * 0.18;
            p.vy += (dy / dist) * force * 0.18;
          }
        }

        p.vx *= 0.96;
        p.vy *= 0.96;

        const vMag = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (vMag < speed * 0.4) {
          const angle = Math.random() * Math.PI * 2;
          p.vx += Math.cos(angle) * 0.02;
          p.vy += Math.sin(angle) * 0.02;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;
      }

      const linkSq = linkDistance * linkDistance;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const bP = particles[j];
          const dx = a.x - bP.x;
          const dy = a.y - bP.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < linkSq) {
            const t = 1 - distSq / linkSq;
            const alpha = t * 0.28;
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(bP.x, bP.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        let alpha = 0.55;
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouseRadius * mouseRadius) {
            const t = 1 - distSq / (mouseRadius * mouseRadius);
            alpha = 0.55 + t * 0.45;
          }
        }
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    resize();

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [color, density, linkDistance, mouseRadius, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      aria-hidden
    />
  );
}
