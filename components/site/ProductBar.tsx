"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import type { Product } from "@/lib/site";

// Sticky bar under the main nav on product pages: name, section links, CTA, read progress.
export default function ProductBar({ product }: { product: Product }) {
  const [active, setActive] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  // Highlight the section crossing the middle of the viewport
  useEffect(() => {
    const els = product.sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [product]);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="sticky top-16 z-40 bg-paper/90 backdrop-blur">
      <div className="px-5 sm:px-10 h-12 flex items-center gap-8">
        <button onClick={toTop} className="flex items-baseline gap-3 shrink-0 group">
          <span className="display text-xl group-hover:text-accent transition-colors duration-300">
            {product.label}
            <span className="text-accent">.</span>
          </span>
          <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-widest opacity-50">
            {product.status}
          </span>
        </button>

        <nav className="flex-1 flex items-center gap-6 overflow-x-auto text-sm [scrollbar-width:none]">
          {product.sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`relative shrink-0 transition-opacity duration-300 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-accent after:origin-left after:transition-transform after:duration-300 ${
                active === s.id ? "opacity-100 after:scale-x-100" : "opacity-50 hover:opacity-100 after:scale-x-0"
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <a
          href={product.cta.href}
          className="hidden md:inline-flex items-baseline gap-1.5 shrink-0 text-sm font-medium group"
        >
          <span className="group-hover:text-accent transition-colors duration-300">{product.cta.label}</span>
          <span className="text-accent transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        </a>
      </div>

      {/* Reading progress */}
      <motion.div style={{ scaleX: progress }} className="h-px bg-accent origin-left" />
    </div>
  );
}
