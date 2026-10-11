"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked: the mailto link next to this still works
    }
  };

  return (
    <button onClick={copy} className="font-mono text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity duration-300">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "done" : "idle"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="inline-block"
        >
          {copied ? <span className="text-accent">Copied ✓</span> : "Copy address"}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
