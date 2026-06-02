"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer style={{ background: "rgba(8,7,6,0.7)", borderTop: "1px solid #27231e" }}>
      {/* CTA band */}
      <div className="py-24 px-6" ref={ref}>
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold"
            style={{ background: "linear-gradient(135deg, #e07a54, #c89560)" }}
          >
            S
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ color: "#f0ece4" }}
          >
            Start building your team&apos;s memory today.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base"
            style={{ color: "#8c8378" }}
          >
            The decisions you make this sprint deserve to outlast it.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            href="mailto:hello@sprintengine.ai"
            whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(167,139,250,0.4)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold"
            style={{
              background: "linear-gradient(135deg, #e07a54, #c9633e)",
              color: "#fff",
            }}
          >
            Request early access →
          </motion.a>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="px-6 py-6 max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs"
        style={{ color: "#534c45", borderTop: "1px solid #131210" }}
      >
        <span>© 2026 Cortex. All rights reserved.</span>
        <div className="flex gap-6">
          {["Product", "Docs", "Pricing", "Privacy", "Terms"].map((l) => (
            <a
              key={l}
              href="#"
              style={{ color: "#534c45" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#8c8378")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#534c45")}
              className="transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
