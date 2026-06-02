"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  siAnthropic, siGooglegemini, siMistralai, siMeta, siDeepseek,
  siPerplexity, siOllama, siHuggingface,
  siCursor, siWindsurf, siGithubcopilot, siNotion,
  siLinear, siObsidian, siRaycast, siZedindustries,
} from "simple-icons";

// OpenAI logo path is not yet in simple-icons
const openAiPath =
  "M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43c-1.18 0-2.32-.421-3.22-1.188l.16-.086 5.34-3.086a.86.86 0 0 0 .44-.757v-7.54l2.258 1.304a.08.08 0 0 1 .046.061v6.243c-.006 2.742-2.239 4.965-5.024 4.965v.047zm-10.799-4.56a4.944 4.944 0 0 1-.592-3.331l.162.098 5.34 3.085a.865.865 0 0 0 .871 0l6.52-3.765v2.608a.08.08 0 0 1-.034.065l-5.398 3.118a4.994 4.994 0 0 1-6.87-1.779v.001zm-1.404-11.35a4.94 4.94 0 0 1 2.585-2.177v6.352a.86.86 0 0 0 .437.754l6.495 3.75-2.258 1.304a.08.08 0 0 1-.075.009L2.83 12.528a4.993 4.993 0 0 1-1.772-6.008zm18.558 4.26l-6.52-3.766 2.259-1.305a.079.079 0 0 1 .075-.009l5.343 3.087a4.994 4.994 0 0 1-.748 9.016v-6.37a.86.86 0 0 0-.41-.653zm2.249-3.332l-.16-.098-5.34-3.085a.867.867 0 0 0-.872 0L9.27 8.071V5.463a.08.08 0 0 1 .033-.065l5.397-3.116a4.996 4.996 0 0 1 7.425 5.176zm-14.133 4.633l-2.257-1.304a.08.08 0 0 1-.047-.062V6.48c.001-2.744 2.236-4.967 5.024-4.963a4.962 4.962 0 0 1 3.22 1.188l-.16.087-5.34 3.086a.86.86 0 0 0-.44.758l-.005 7.54zm1.227-2.647l2.901-1.676 2.9 1.674v3.348l-2.9 1.674-2.9-1.677V9.434z";

type Item = {
  name: string;
  label: string;
  category: string;
  color: string;
  path: string;
};

const aiModels: Item[] = [
  { name: "OpenAI",      label: "GPT-4o",         category: "LLM",    color: "#e07a54", path: openAiPath },
  { name: "Claude",      label: "Claude 3.5",      category: "LLM",    color: "#c89560", path: siAnthropic.path },
  { name: "Gemini",      label: "Gemini 1.5 Pro",  category: "LLM",    color: "#e07a54", path: siGooglegemini.path },
  { name: "Mistral",     label: "Mistral Large",   category: "LLM",    color: "#c89560", path: siMistralai.path },
  { name: "Llama",       label: "Llama 3.1 405B",  category: "LLM",    color: "#e07a54", path: siMeta.path },
  { name: "DeepSeek",    label: "DeepSeek R1",     category: "LLM",    color: "#c89560", path: siDeepseek.path },
  { name: "Perplexity",  label: "Sonar Pro",       category: "Search", color: "#e07a54", path: siPerplexity.path },
  { name: "Ollama",      label: "Local models",    category: "LLM",    color: "#c89560", path: siOllama.path },
  { name: "HuggingFace", label: "Inference API",   category: "Hub",    color: "#e07a54", path: siHuggingface.path },
];

const devTools: Item[] = [
  { name: "Cursor",         label: "AI Code Editor",    category: "IDE",          color: "#c89560", path: siCursor.path },
  { name: "Windsurf",       label: "Agentic IDE",       category: "IDE",          color: "#e07a54", path: siWindsurf.path },
  { name: "GitHub Copilot", label: "Workspace",         category: "IDE",          color: "#c89560", path: siGithubcopilot.path },
  { name: "Zed",            label: "Collaborative IDE", category: "IDE",          color: "#e07a54", path: siZedindustries.path },
  { name: "Notion",         label: "Connected docs",    category: "Productivity", color: "#c89560", path: siNotion.path },
  { name: "Linear",         label: "Issue tracking",    category: "Productivity", color: "#e07a54", path: siLinear.path },
  { name: "Obsidian",       label: "Knowledge base",    category: "Productivity", color: "#c89560", path: siObsidian.path },
  { name: "Raycast",        label: "AI commands",       category: "Productivity", color: "#e07a54", path: siRaycast.path },
];

function Card({ item }: { item: Item }) {
  return (
    <div
      className="group flex items-center gap-3 px-5 py-4 rounded-2xl relative overflow-hidden shrink-0 cursor-default"
      style={{
        width: 220,
        background: "#161412",
        border: "1px solid #27231e",
        borderLeft: `3px solid ${item.color}33`,
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 100% 80% at 0% 50%, ${item.color}0e 0%, transparent 70%)`,
        }}
      />
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${item.color}18`, color: item.color }}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
          <path d={item.path} />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold truncate" style={{ color: "#f0ece4" }}>
          {item.name}
        </div>
        <div className="text-xs truncate mt-0.5" style={{ color: "#534c45" }}>
          {item.label}
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse = false, duration = 48 }: { items: Item[]; reverse?: boolean; duration?: number }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 w-32 pointer-events-none z-10"
        style={{ background: "linear-gradient(to right, #000000 0%, transparent 100%)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-32 pointer-events-none z-10"
        style={{ background: "linear-gradient(to left, #000000 0%, transparent 100%)" }}
      />
      <div
        className="flex gap-3 w-max"
        style={{ animation: `marquee${reverse ? "-rev" : ""} ${duration}s linear infinite` }}
      >
        {doubled.map((item, i) => (
          <Card key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function AiCompatibility() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-rev {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      <section
        className="py-24 overflow-hidden"
        style={{ background: "transparent", borderTop: "1px solid #27231e", borderBottom: "1px solid #27231e" }}
      >
        <div className="px-6 max-w-6xl mx-auto" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="flex justify-center mb-5"
          >
            <span
              className="text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full"
              style={{ background: "#e07a5418", color: "#e07a54", border: "1px solid #e07a5430" }}
            >
              Integrations
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-3xl sm:text-4xl font-bold text-center mb-4 tracking-tight"
            style={{ color: "#f0ece4" }}
          >
            Your knowledge,{" "}
            <span className="gradient-text">understood by every AI.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center text-base max-w-2xl mx-auto mb-14"
            style={{ color: "#8c8378" }}
          >
            Cortex exports clean, structured context — paste it straight into any system prompt
            or use our native integrations with the models and tools your team already relies on.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-3"
        >
          <div className="px-6 max-w-6xl mx-auto mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#534c45" }}>
              Language models
            </span>
          </div>
          <MarqueeRow items={aiModels} duration={52} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.42 }}
        >
          <div className="px-6 max-w-6xl mx-auto mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#534c45" }}>
              Dev tools &amp; IDEs
            </span>
          </div>
          <MarqueeRow items={devTools} reverse duration={44} />
        </motion.div>
      </section>
    </>
  );
}
