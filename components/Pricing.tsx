"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const tiers = [
  {
    name: "Starter",
    monthlyPrice: 49,
    annualPrice: 39,
    color: "#8c8378",
    description: "For small teams getting their sprint rhythm right.",
    highlight: false,
    features: [
      "Up to 5 users",
      "1 active sprint",
      "Chat updates & task tracking",
      "Daily logs & status tables",
      "Gantt view",
      "Overall KB (up to 500 events)",
      "Task history",
      "Meeting transcription",
    ],
  },
  {
    name: "Team",
    monthlyPrice: 149,
    annualPrice: 119,
    color: "#e07a54",
    description: "For teams where institutional knowledge is a competitive edge.",
    highlight: true,
    features: [
      "Up to 25 users",
      "Unlimited sprints",
      "Everything in Starter",
      "Entity-relationship graph",
      "Unified cross-source graph",
      "PRD ingest (up to 20 PDFs)",
      "Sprint report generator",
      "FAQ system",
    ],
  },
  {
    name: "Scale",
    monthlyPrice: 399,
    annualPrice: 319,
    color: "#c89560",
    description: "For orgs where knowledge loss is a documented cost.",
    highlight: false,
    features: [
      "Unlimited users",
      "Unlimited sprints",
      "Everything in Team",
      "Semantic threshold tuning",
      "API access",
      "Priority support + onboarding",
      "SSO (SAML)",
      "Graph refinement controls",
    ],
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="pricing"
      className="py-24 px-6"
      style={{ background: "transparent", borderTop: "1px solid #27231e" }}
    >
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="text-center mb-4">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ color: "#f0ece4" }}
          >
            Simple pricing.{" "}
            <span className="gradient-text">Scales with your team.</span>
          </motion.h2>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-3 mt-6 mb-10"
          >
            <span className="text-sm" style={{ color: annual ? "#534c45" : "#f0ece4" }}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative w-12 h-6 rounded-full transition-colors"
              style={{ background: annual ? "#e07a54" : "#27231e" }}
            >
              <motion.div
                animate={{ x: annual ? 24 : 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="absolute top-1 w-4 h-4 rounded-full"
                style={{ background: "#f0ece4" }}
              />
            </button>
            <span className="text-sm" style={{ color: annual ? "#f0ece4" : "#534c45" }}>
              Annual{" "}
              <span className="text-xs px-1.5 py-0.5 rounded-full ml-1"
                style={{ background: "#c8956020", color: "#c89560", border: "1px solid #c8956030" }}>
                save 20%
              </span>
            </span>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 items-start">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
              className="rounded-2xl p-6 flex flex-col gap-5 relative"
              style={{
                background: tier.highlight ? "linear-gradient(145deg, #221510, #1a1008)" : "#161412",
                border: `1px solid ${tier.highlight ? "#e07a5455" : "#27231e"}`,
                boxShadow: tier.highlight ? "0 0 40px rgba(224,122,84,0.10)" : "none",
              }}
            >
              {tier.highlight && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "#e07a54", color: "#fff" }}
                >
                  Most popular
                </div>
              )}

              <div>
                <h3 className="text-base font-semibold mb-1" style={{ color: tier.color }}>
                  {tier.name}
                </h3>
                <p className="text-xs" style={{ color: "#8c8378" }}>{tier.description}</p>
              </div>

              <div className="flex items-end gap-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={annual ? "annual" : "monthly"}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="text-4xl font-bold"
                    style={{ color: "#f0ece4" }}
                  >
                    ${annual ? tier.annualPrice : tier.monthlyPrice}
                  </motion.span>
                </AnimatePresence>
                <span className="text-sm pb-1.5" style={{ color: "#534c45" }}>/mo</span>
              </div>

              <motion.a
                href="mailto:hello@sprintengine.ai"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="block text-center py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={
                  tier.highlight
                    ? { background: "linear-gradient(135deg,#e07a54,#c9633e)", color: "#fff" }
                    : { background: "#27231e", color: "#f0ece4", border: "1px solid #332e28" }
                }
              >
                {tier.name === "Scale" ? "Talk to us" : "Start free trial"}
              </motion.a>

              <ul className="flex flex-col gap-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs" style={{ color: "#8c8378" }}>
                    <span style={{ color: tier.color, marginTop: 2 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center text-xs mt-8"
          style={{ color: "#534c45" }}
        >
          All plans include a 14-day free trial. No credit card required.
          Your data stays in your cloud tenancy — we don&apos;t train on your sprint content.
        </motion.p>
      </div>
    </section>
  );
}
