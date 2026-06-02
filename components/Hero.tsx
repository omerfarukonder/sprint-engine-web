"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const GraphAnimation = dynamic(() => import("./GraphAnimation"), { ssr: false });

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
    >
      {/* Subtle radial glow on top of global particles */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(224,122,84,0.07) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Copy */}
        <div className="flex flex-col gap-6">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full text-xs font-medium"
            style={{
              background: "rgba(224,122,84,0.08)",
              border: "1px solid rgba(224,122,84,0.25)",
              color: "#f0a882",
            }}
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#e07a54" }} />
            AI-native sprint memory for engineering teams
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
            style={{ color: "#f0ece4" }}
          >
            Your team&apos;s decisions
            <br />
            deserve to be{" "}
            <span className="gradient-text">remembered.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg leading-relaxed max-w-lg"
            style={{ color: "#8c8378" }}
          >
            Sprint Engine extracts organizational knowledge from your daily work — chat updates,
            meetings, PRDs, blockers — and builds a living knowledge graph your whole team can query.
            No extra process. No new rituals.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-3"
          >
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.03, boxShadow: "0 0 24px rgba(224,122,84,0.35)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: "linear-gradient(135deg, #e07a54, #c9633e)",
                color: "#fff",
              }}
            >
              Request early access
              <span>→</span>
            </motion.a>

            <motion.a
              href="#how-it-works"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all"
              style={{
                background: "rgba(46,43,56,0.6)",
                border: "1px solid #27231e",
                color: "#8c8378",
              }}
            >
              See how it works
            </motion.a>
          </motion.div>

          {/* Social proof line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-xs"
            style={{ color: "#534c45" }}
          >
            Used by teams spending 4+ hours a week re-discovering past decisions.
          </motion.p>
        </div>

        {/* Right: Animated graph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="w-full"
        >
          <GraphAnimation />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ color: "#534c45" }}
      >
        <span className="text-xs tracking-widest uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
