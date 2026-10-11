"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const steps = [
  {
    title: "Import your plan",
    body: "Paste a sprint plan or drop a DOCX. Cortex parses the task table and syncs every task into the knowledge base. No migration, no mapping.",
    input: "cortex import ./sprint_plan.docx",
    output: ["parsed 24 tasks · 6 owners · 3 epics", "✓ state initialised", "✓ knowledge base synced"],
  },
  {
    title: "Chat your updates",
    body: "Write updates the way you'd tell a teammate. Cortex finds the task, updates its status, extracts the constraint and logs it.",
    input: "Billing is blocked, Stripe needs a new webhook config",
    output: ["✓ task BILL-12 → blocked", "✓ constraint captured: stripe.webhook", "✓ daily log appended"],
  },
  {
    title: "Query anything",
    body: "Ask in plain language. Answers come back with the conversations and documents they were built from.",
    input: "what does the auth team own?",
    output: ["→ Auth System        system", "→ Session Rules      constraint", "→ Onboarding Flow    process", "source: 3 messages, 1 PRD"],
  },
];

const TYPE_MS = 38;
const LINE_MS = 380;
const HOLD_MS = 2600;

export default function Terminal() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-120px" });
  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState(0);
  const [lines, setLines] = useState(0);
  const [pinned, setPinned] = useState(false);

  const step = steps[active];

  // Restart the animation whenever the step changes
  useEffect(() => {
    setTyped(0);
    setLines(0);
  }, [active]);

  useEffect(() => {
    if (!inView) return;
    let t: ReturnType<typeof setTimeout>;
    if (typed < step.input.length) {
      t = setTimeout(() => setTyped(typed + 1), TYPE_MS);
    } else if (lines < step.output.length) {
      t = setTimeout(() => setLines(lines + 1), LINE_MS);
    } else if (!pinned) {
      t = setTimeout(() => setActive((active + 1) % steps.length), HOLD_MS);
    }
    return () => clearTimeout(t);
  }, [inView, typed, lines, step, active, pinned]);

  return (
    <div ref={ref} className="grid lg:grid-cols-12 gap-12 items-start">
      <div className="lg:col-span-4 flex flex-col gap-8">
        {steps.map((s, i) => (
          <button
            key={s.title}
            onClick={() => { setActive(i); setPinned(true); }}
            className={`text-left transition-opacity ${i === active ? "opacity-100" : "opacity-30 hover:opacity-60"}`}
          >
            <span className="font-mono text-xs text-accent">step_0{i + 1}</span>
            <span className="display block text-[clamp(2rem,3.5vw,3rem)] mt-1">{s.title}</span>
            {i === active && <p className="mt-3 leading-relaxed opacity-75 max-w-md">{s.body}</p>}
          </button>
        ))}
      </div>

      <div className="lg:col-span-8 lg:sticky lg:top-24 bg-ink text-paper font-mono text-sm sm:text-base">
        <div className="flex items-center justify-between px-5 py-3 bg-[#1f1b18] text-xs">
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="w-2.5 h-2.5 rounded-full bg-paper/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-paper/30" />
          </span>
          <span className="opacity-50">cortex — workspace/acme</span>
        </div>
        <div className="p-6 sm:p-8 min-h-[22rem]">
          <div>
            <span className="text-accent">❯ </span>
            {step.input.slice(0, typed)}
            {typed < step.input.length && <span className="caret">▌</span>}
          </div>
          <div className="mt-5 flex flex-col gap-2">
            {step.output.slice(0, lines).map((l) => (
              <div key={l} className={l.startsWith("✓") ? "text-[#9fd49a]" : l.startsWith("source") ? "opacity-50" : ""}>
                {l}
              </div>
            ))}
          </div>
          {typed === step.input.length && lines === step.output.length && (
            <div className="mt-5">
              <span className="text-accent">❯ </span>
              <span className="caret">▌</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
