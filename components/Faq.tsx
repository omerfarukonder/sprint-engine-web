"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const faqs = [
  {
    q: "Does it replace Jira or Linear?",
    a: "No. Sprint Engine is a memory layer, not a project tracker. Import your plan from Jira or Linear, use Sprint Engine to update and query it in natural language. They complement each other.",
  },
  {
    q: "What happens to our data?",
    a: "Your sprint content is stored in your own cloud environment. We do not use it for training. Enterprise plans support self-hosted deployment for full data residency control.",
  },
  {
    q: "How does it handle LLM costs?",
    a: "Sprint Engine uses your own OpenAI API key — we do not proxy or mark up API costs. For teams without a key, rule-based fallbacks cover core task management. Knowledge extraction requires LLM.",
  },
  {
    q: "How long does setup take?",
    a: "Import a DOCX or paste a Markdown plan and hit Initialize. The first knowledge graph populates within minutes as your team starts sending updates.",
  },
  {
    q: "Can we import historical sprint data?",
    a: "Yes. Upload past daily logs or sprint states and Sprint Engine will backfill the task event timeline from day one.",
  },
  {
    q: "Is the knowledge graph visible to the whole team?",
    a: "Yes. All team members on the same workspace share the same graph. Role-based access controls are on the roadmap for Scale and Enterprise plans.",
  },
];

function FaqItem({ item, index }: { item: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="border-b"
      style={{ borderColor: "#27231e" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span
          className="text-sm font-medium transition-colors"
          style={{ color: open ? "#f0a882" : "#f0ece4" }}
        >
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-lg leading-none"
          style={{ color: open ? "#e07a54" : "#534c45" }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-sm leading-relaxed pb-5" style={{ color: "#8c8378" }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 px-6" style={{ background: "transparent" }}>
      <div className="max-w-3xl mx-auto">
        <div ref={ref} className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="text-3xl font-bold tracking-tight"
            style={{ color: "#f0ece4" }}
          >
            Common questions
          </motion.h2>
        </div>

        <div>
          {faqs.map((item, i) => (
            <FaqItem key={item.q} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
