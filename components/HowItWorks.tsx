"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    color: "#e07a54",
    title: "Import your plan",
    body: "Paste your sprint plan or drop a DOCX. Sprint Engine parses the task table, initializes state, and immediately syncs task definitions into the knowledge base. No migration, no data mapping.",
    code: `# DOCX import
Import → paste path to your sprint plan

# Or start from Markdown
workspace/sprint_plan.md`,
  },
  {
    number: "02",
    color: "#c89560",
    title: "Chat your updates",
    body: 'Update tasks the same way you\'d tell a teammate. "Billing integration is blocked — Stripe needs a new webhook config before we can proceed." Sprint Engine identifies the task, updates its status, extracts the constraint, and logs everything.',
    code: `> Billing integration is blocked —
  Stripe needs a new webhook config

✓ Task updated: blocked
✓ Constraint captured: kb_events
✓ Daily log appended`,
  },
  {
    number: "03",
    color: "#e07a54",
    title: "Query anything",
    body: '"Which tasks are at risk this week?" "What does the auth team own?" "Show me the history of the mobile push notification task." Plain language. Instant answers with full provenance.',
    code: `> What does the auth team own?

Auth Team owns:
  → Auth System (system)
  → Session Rules (constraint)
  → Onboarding Flow (process)

Source: 3 chat messages, 1 PRD`,
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      className="py-24 px-6"
      style={{ background: "transparent", borderTop: "1px solid #27231e" }}
    >
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ color: "#f0ece4" }}
          >
            Up and running in{" "}
            <span className="gradient-text-purple">one sprint.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base max-w-xl mx-auto"
            style={{ color: "#8c8378" }}
          >
            No migration. No workflow changes. Sprint Engine layers over your existing rhythm.
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical connector line */}
          <div
            className="absolute left-8 top-12 bottom-12 w-px hidden md:block"
            style={{ background: "linear-gradient(180deg, #e07a5440, #c8956040, #e07a5440)" }}
          />

          <div className="flex flex-col gap-10">
            {steps.map((step, i) => {
              const stepRef = useRef(null);
              const stepInView = useInView(stepRef, { once: true, margin: "-60px" });

              return (
                <motion.div
                  key={step.number}
                  ref={stepRef}
                  initial={{ opacity: 0, x: -20 }}
                  animate={stepInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
                  className="grid md:grid-cols-[64px_1fr_1fr] gap-6 items-start"
                >
                  {/* Step number bubble */}
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold z-10"
                      style={{
                        background: `${step.color}20`,
                        border: `2px solid ${step.color}`,
                        color: step.color,
                      }}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Copy */}
                  <div className="flex flex-col gap-3 pt-2">
                    <h3 className="text-xl font-bold" style={{ color: "#f0ece4" }}>
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#8c8378" }}>
                      {step.body}
                    </p>
                  </div>

                  {/* Code block */}
                  <div
                    className="rounded-xl p-4 text-xs leading-relaxed font-mono"
                    style={{
                      background: "rgba(8,7,6,0.7)",
                      border: `1px solid ${step.color}25`,
                      color: "#8c8378",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {step.code.split("\n").map((line, li) => (
                      <div key={li} style={{ color: line.startsWith("✓") ? step.color : line.startsWith(">") ? "#f0ece4" : line.startsWith("#") ? "#534c45" : "#8c8378" }}>
                        {line}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
