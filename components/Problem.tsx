"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const cards = [
  {
    emoji: "🔁",
    title: '"Why was this built this way?"',
    body: "Every sprint ends, engineers move on, and the reasoning behind decisions lives only in Slack threads and the memory of the person who wrote the ticket — if they're still around.",
    color: "#e07a54",
  },
  {
    emoji: "🗺",
    title: '"Which team owns this system?"',
    body: "New hires spend weeks reverse-engineering relationships between teams, domains, and systems that senior engineers know by instinct. That knowledge is nowhere structured.",
    color: "#c89560",
  },
  {
    emoji: "🔄",
    title: '"We already discussed this."',
    body: "Action items from planning meetings live in notes no one revisits. Two weeks later, the same question comes up again in standup.",
    color: "#e07a54",
  },
];

function Card({ card, index }: { card: typeof cards[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
      className="flex flex-col gap-4 p-6 rounded-2xl"
      style={{
        background: "#161412",
        border: `1px solid ${card.color}22`,
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
        style={{ background: `${card.color}18` }}
      >
        {card.emoji}
      </div>
      <h3 className="text-base font-semibold leading-snug" style={{ color: card.color }}>
        {card.title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "#8c8378" }}>
        {card.body}
      </p>
    </motion.div>
  );
}

export default function Problem() {
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section className="py-24 px-6" style={{ background: "transparent" }}>
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ color: "#8c8378", background: "#161412", border: "1px solid #27231e" }}
          >
            The silent knowledge drain
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-4 tracking-tight"
          style={{ color: "#f0ece4" }}
        >
          You&apos;re not losing code.{" "}
          <span className="gradient-text-purple">You&apos;re losing context.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-base max-w-xl mx-auto mb-14"
          style={{ color: "#8c8378" }}
        >
          The tools you use remember what was built. Cortex remembers why.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <Card key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
