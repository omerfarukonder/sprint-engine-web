"use client";

import { useState } from "react";
import Section, { ArrowLink } from "@/components/site/Section";
import { CONTACT_EMAIL } from "@/lib/site";

const tiers = [
  {
    name: "Starter",
    monthly: 49,
    annual: 39,
    description: "Small teams getting their sprint rhythm right.",
    features: ["5 users", "1 active sprint", "Chat updates & task tracking", "Daily logs, Gantt view", "KB up to 500 events", "Meeting transcription"],
  },
  {
    name: "Team",
    monthly: 149,
    annual: 119,
    description: "Teams where institutional knowledge is an edge.",
    highlight: true,
    features: ["25 users", "Unlimited sprints", "Everything in Starter", "Entity-relationship graph", "Unified cross-source graph", "PRD ingest (20 PDFs)", "Sprint reports, FAQ system"],
  },
  {
    name: "Scale",
    monthly: 399,
    annual: 319,
    description: "Orgs where knowledge loss is a documented cost.",
    features: ["Unlimited users", "Everything in Team", "API access", "SSO (SAML)", "Graph refinement controls", "Priority support & onboarding"],
  },
];

export default function Pricing({ n }: { n: string }) {
  const [annual, setAnnual] = useState(false);

  return (
    <Section id="pricing" n={n} label="Pricing">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="display text-[clamp(2.25rem,4vw,3.75rem)]">
          Pricing<span className="text-accent">.</span>
        </h2>
        <button onClick={() => setAnnual(!annual)} className="font-mono text-xs flex items-center gap-3" aria-pressed={annual}>
          <span className={annual ? "opacity-40" : ""}>monthly</span>
          <span className="relative w-10 h-5 bg-paper2 rounded-full">
            <span className={`absolute top-1 w-3 h-3 rounded-full bg-accent transition-all ${annual ? "left-6" : "left-1"}`} />
          </span>
          <span className={annual ? "" : "opacity-40"}>annual −20%</span>
        </button>
      </div>

      <div className="mt-14 grid md:grid-cols-3 gap-x-10 gap-y-16">
        {tiers.map((t) => (
          <div key={t.name} className="flex flex-col">
            <div className="flex items-center gap-2">
              {t.highlight && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
              <span className="text-xl tracking-tight">{t.name}</span>
            </div>
            <p className="mt-2 opacity-70 leading-relaxed">{t.description}</p>

            <div className="mt-8 flex items-start gap-1">
              <span className="text-xl mt-2 opacity-60">$</span>
              <span className="display text-7xl">{annual ? t.annual : t.monthly}</span>
            </div>
            <span className="font-mono text-xs mt-2 opacity-50">per month{annual ? ", billed yearly" : ""}</span>

            <ul className="mt-8 flex flex-col gap-1.5 font-mono text-sm opacity-75">
              {t.features.map((f) => (
                <li key={f}><span className="text-accent">—</span> {f}</li>
              ))}
            </ul>

            <div className="mt-10">
              <ArrowLink href={`mailto:${CONTACT_EMAIL}?subject=Cortex%20${t.name}%20early%20access`}>Get early access</ArrowLink>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-16 font-mono text-xs opacity-50">
        Enterprise · self-hosted deployment & data residency → {CONTACT_EMAIL}
      </p>
    </Section>
  );
}
