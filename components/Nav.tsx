"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Product", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(23,21,28,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(46,43,56,0.8)" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{ background: "linear-gradient(135deg, #e07a54, #c89560)" }}
          >
            S
          </div>
          <span className="font-semibold text-sm tracking-tight" style={{ color: "#f0ece4" }}>
            Cortex
          </span>
        </a>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm transition-colors duration-200"
              style={{ color: "#8c8378" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f0ece4")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#8c8378")}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <motion.a
          href="#pricing"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
          style={{
            background: "linear-gradient(135deg, #e07a5422, #c8956022)",
            border: "1px solid #e07a5455",
            color: "#f0a882",
          }}
        >
          Request early access
          <span className="text-xs">→</span>
        </motion.a>
      </div>
    </motion.header>
  );
}
