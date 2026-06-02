"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const panels = [
  {
    icon: "✦",
    color: "#e07a54",
    label: "Capture",
    title: "Works from what you already do",
    body: "Chat updates, DOCX sprint plans, PDFs, and meeting recordings. Sprint Engine ingests from the channels your team already uses — no new forms to fill out.",
  },
  {
    icon: "⬡",
    color: "#c89560",
    label: "Organize",
    title: "Structured, queryable, connected",
    body: "Knowledge is classified, deduplicated, and linked into a live graph. Rules, constraints, capabilities, team ownership, dependencies — every node traceable back to the conversation that created it.",
  },
  {
    icon: "⌖",
    color: "#e07a54",
    label: "Retrieve",
    title: "Ask in plain language",
    body: "Chat the question. The engine searches across tasks, FAQs, knowledge events, and meeting summaries — surfacing the answer with its source.",
  },
];

export default function Solution() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-24 px-6"
      style={{
        background: "transparent",
        borderTop: "1px solid #27231e",
        borderBottom: "1px solid #27231e",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div ref={ref}>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="text-3xl sm:text-4xl font-bold text-center mb-4 tracking-tight"
            style={{ color: "#f0ece4" }}
          >
            A memory layer that{" "}
            <span className="gradient-text">builds itself.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-center text-base max-w-2xl mx-auto mb-14"
            style={{ color: "#8c8378" }}
          >
            Sprint Engine runs alongside your existing tools. As your team sends chat updates,
            imports sprint plans, uploads PRDs, and records meetings, it continuously extracts
            and organizes durable knowledge — automatically.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {panels.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.13, ease: "easeOut" }}
              className="flex flex-col gap-4 p-7 rounded-2xl relative overflow-hidden group"
              style={{ background: "#161412", border: "1px solid #27231e" }}
              whileHover={{ borderColor: `${p.color}44`, transition: { duration: 0.2 } }}
            >
              {/* Background glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse 60% 40% at 30% 20%, ${p.color}10 0%, transparent 70%)`,
                }}
              />

              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl font-bold"
                style={{ background: `${p.color}15`, color: p.color }}
              >
                {p.icon}
              </div>

              <div
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: p.color }}
              >
                {p.label}
              </div>

              <h3 className="text-lg font-semibold leading-snug" style={{ color: "#f0ece4" }}>
                {p.title}
              </h3>

              <p className="text-sm leading-relaxed" style={{ color: "#8c8378" }}>
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
