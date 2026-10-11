import type { Metadata } from "next";
import LiveGraph from "@/components/cortex/LiveGraph";
import Pipeline from "@/components/cortex/Pipeline";
import Terminal from "@/components/cortex/Terminal";
import Integrations from "@/components/cortex/Integrations";
import Pricing from "@/components/cortex/Pricing";
import { KnowledgeFigure, EntityFigure, UnifiedFigure, TimelineFigure } from "@/components/cortex/Figures";
import Section, { Mono, ArrowLink } from "@/components/site/Section";
import FaqList from "@/components/site/FaqList";
import ProductBar from "@/components/site/ProductBar";
import { getProduct } from "@/lib/site";

const cortex = getProduct("cortex");

export const metadata: Metadata = {
  title: "Cortex — sprint memory for engineering teams",
  description:
    "Cortex extracts organizational knowledge from your daily work — chat updates, meetings, PRDs, blockers — and builds a living knowledge graph your whole team can query.",
};

const problems = [
  { code: "ERR_CONTEXT_LOST", q: "Why was this built this way?", a: "The reasoning lives in a Slack thread and in the head of someone who left." },
  { code: "ERR_OWNER_UNKNOWN", q: "Which team owns this?", a: "New hires spend weeks reverse-engineering what seniors know by instinct." },
  { code: "ERR_DUPLICATE_DISCUSSION", q: "We already discussed this.", a: "Action items die in meeting notes. Two weeks later, the same question." },
];

const features = [
  {
    id: "kb",
    title: "Knowledge base",
    lead: "Every rule, constraint and capability, extracted from conversation.",
    specs: ["types: constraint · capability · dependency · risk · rule", "scopes: team · system · process · project", "vector-linked by semantic similarity", "version-chained: see when a rule changed"],
    Figure: KnowledgeFigure,
  },
  {
    id: "entities",
    title: "Entity graph",
    lead: "A live map of who owns what.",
    specs: ["7 entity types · 8 relation types", "alias merge: \"Payments\" = \"Payments Team\"", "parent / child hierarchies resolved", "every node traceable to its source"],
    Figure: EntityFigure,
  },
  {
    id: "unified",
    title: "Unified graph",
    lead: "Tasks, decisions, meetings and docs. One graph.",
    specs: ["5 sources: kb · tasks · events · faqs · meetings", "semantic edges: cosine over embeddings", "structural edges: event → task", "re-synthesised on every message"],
    Figure: UnifiedFigure,
  },
  {
    id: "history",
    title: "Task memory",
    lead: "Every task remembers its whole story.",
    specs: ["append-only event log, hash-deduped", "rolling LLM digest, rebuilt on change", "timeline queries in plain chat", "backfill from historical logs"],
    Figure: TimelineFigure,
  },
];

const faqs = [
  { q: "Does it replace Jira or Linear?", a: "No. Cortex is a memory layer, not a tracker. Import your plan from Jira or Linear and use Cortex to update and query it." },
  { q: "What happens to our data?", a: "It's stored in your own cloud environment and never used for training. Enterprise supports self-hosting." },
  { q: "How are LLM costs handled?", a: "Cortex uses your own API key. We don't proxy or mark up model costs." },
  { q: "How long does setup take?", a: "Import a DOCX or paste a Markdown plan. The first graph appears within minutes of your team posting updates." },
  { q: "Can we import past sprints?", a: "Yes. Upload old daily logs or sprint states and Cortex backfills the timeline." },
];

export default function CortexPage() {
  return (
    <>
      <ProductBar product={cortex} />

      {/* Hero */}
      <section className="px-5 sm:px-10 pt-20 sm:pt-32 pb-10 grid lg:grid-cols-12 gap-x-10 gap-y-10">
        <div className="lg:col-span-3 pt-3 flex flex-col gap-2">
          <Mono className="opacity-60">Product 01</Mono>
          <Mono className="text-accent">Early access</Mono>
        </div>
        <div className="lg:col-span-9">
          <h1 className="display text-[clamp(4rem,13vw,13rem)]">
            Cortex<span className="text-accent">.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-2xl sm:text-3xl tracking-tight leading-snug">
            A memory layer for engineering teams. It turns chat, meetings and documents into a
            knowledge graph you can question in plain language.
          </p>
          <div className="mt-10 flex flex-wrap gap-10 items-baseline">
            <ArrowLink href="#pricing">Get early access</ArrowLink>
            <a href="#method" className="font-mono text-xs uppercase tracking-widest opacity-60 hover:opacity-100">Read the method ↓</a>
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-10 pb-10 grid lg:grid-cols-12 gap-x-10">
        <figure className="lg:col-span-9 lg:col-start-4">
          <LiveGraph />
          <figcaption className="mt-3 flex justify-between gap-4">
            <Mono className="opacity-50">Fig. 1 — Knowledge graph, live</Mono>
            <Mono className="opacity-40">hover a node</Mono>
          </figcaption>
        </figure>
      </section>

      {/* Problem */}
      <Section id="problem" n="1.0" label="Problem">
        <div className="flex flex-col gap-14">
          {problems.map((p) => (
            <div key={p.code} className="grid md:grid-cols-9 gap-x-10 gap-y-3">
              <div className="md:col-span-5">
                <Mono className="text-accent">{p.code}</Mono>
                <p className="text-3xl sm:text-4xl tracking-tight mt-2">&ldquo;{p.q}&rdquo;</p>
              </div>
              <p className="md:col-span-4 md:pt-7 opacity-70 leading-relaxed">{p.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Method */}
      <Section id="method" n="2.0" label="Method">
        <h2 className="display text-[clamp(2.25rem,4vw,3.75rem)] max-w-3xl">
          Capture, resolve, recall<span className="text-accent">.</span>
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-75">
          Cortex works from what your team already writes. Every fact is classified, deduplicated
          and linked back to the conversation it came from.
        </p>
        <figure className="mt-14">
          <Pipeline />
          <figcaption className="mt-3"><Mono className="opacity-50">Fig. 2 — Ingestion pipeline</Mono></figcaption>
        </figure>
      </Section>

      {/* Components */}
      <Section id="features" n="3.0" label="Components">
        <div className="flex flex-col gap-24">
          {features.map((f, i) => (
            <div key={f.id} className="grid xl:grid-cols-9 gap-x-10 gap-y-8 items-center">
              <div className="xl:col-span-4">
                <Mono className="opacity-50">3.{i + 1}</Mono>
                <h3 className="display text-[clamp(2rem,3.5vw,3.25rem)] mt-2">{f.title}</h3>
                <p className="mt-4 text-lg leading-relaxed opacity-80">{f.lead}</p>
                <ul className="mt-6 flex flex-col gap-1.5 font-mono text-sm opacity-70">
                  {f.specs.map((s) => (
                    <li key={s}><span className="text-accent">—</span> {s}</li>
                  ))}
                </ul>
              </div>
              <figure className="xl:col-span-5">
                <f.Figure />
                <figcaption className="mt-2"><Mono className="opacity-50">Fig. {i + 3} — {f.title}</Mono></figcaption>
              </figure>
            </div>
          ))}
        </div>
      </Section>

      {/* Usage */}
      <Section id="how" n="4.0" label="Usage">
        <Terminal />
      </Section>

      <Integrations n="5.0" />
      <Pricing n="6.0" />
      <FaqList id="faq" n="7.0" items={faqs} />
    </>
  );
}
