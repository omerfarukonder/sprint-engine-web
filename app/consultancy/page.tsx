import type { Metadata } from "next";
import Section, { Mono, ArrowLink } from "@/components/site/Section";
import FaqList from "@/components/site/FaqList";
import { Dimension } from "@/components/cortex/Blueprint";
import { BOOK_CALL_HREF, services } from "@/lib/site";
import { ACCENT } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Consultancy",
  description:
    "AI strategy, LLM and agent integration, knowledge systems and engineering process consulting for software teams.",
};

const steps = [
  { title: "Discover", body: "Interviews and a walkthrough of your systems. We find where time and knowledge are lost." },
  { title: "Design", body: "Use-cases ranked by value, an architecture, and a definition of done." },
  { title: "Build", body: "Short iterations next to your engineers, with evaluation from day one." },
  { title: "Hand off", body: "Docs, runbooks and training. Your team owns it." },
];

// PLACEHOLDER — engagement formats
const engagements = [
  { name: "Advisory sprint", duration: "2–3 weeks", body: "An assessment and a roadmap you can act on." },
  { name: "Build", duration: "6–12 weeks", body: "One use-case, designed and shipped to production.", highlight: true },
  { name: "Embedded", duration: "Monthly", body: "A senior AI engineer working inside your team." },
];

// PLACEHOLDER — FAQ copy
const faqs = [
  { q: "Do we have to use Cortex?", a: "No. Most of our work is built on your existing stack. If Cortex fits, we'll tell you." },
  { q: "Who owns the code?", a: "You do. Everything goes into your repositories and your infrastructure." },
  { q: "Which teams do you work with?", a: "Mostly engineering organisations of 10 to 500 people." },
  { q: "How do we start?", a: "A free 30-minute call. If there's a fit, we send a fixed-price proposal." },
];

// Fig. 1 — the four phases as a measured line with a moving marker
function ProcessFigure() {
  const xs = [40, 290, 540, 790];
  const path = `M ${xs[0]} 70 L ${xs[3]} 70`;
  return (
    <svg viewBox="0 0 830 130" className="w-full h-auto" role="img" aria-label="Engagement phases">
      <Dimension x1={xs[0]} y1={20} x2={xs[3]} y2={20} label="typical engagement · 6–12 weeks" />
      <line x1={xs[0]} y1={70} x2={xs[3]} y2={70} stroke="#14110f" strokeOpacity={0.25} strokeWidth={1.5} />
      {xs.map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={70} r={6} fill="#f1ece3" stroke="#14110f" strokeWidth={1.5} />
          <text x={x} y={104} textAnchor="middle" className="font-mono" fontSize={12} fill="#14110f" opacity={0.6}>
            {`2.${i + 1}`}
          </text>
        </g>
      ))}
      <circle r={5} fill={ACCENT}>
        <animateMotion dur="6s" repeatCount="indefinite" path={path} />
      </circle>
    </svg>
  );
}

export default function ConsultancyPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-5 sm:px-10 pt-20 sm:pt-32 pb-16 grid lg:grid-cols-12 gap-x-10 gap-y-10">
        <div className="lg:col-span-3 pt-3">
          <Mono className="opacity-60">Consultancy</Mono>
        </div>
        <div className="lg:col-span-9">
          <h1 className="display text-[clamp(3.25rem,9vw,9.5rem)]">
            We build it
            <br />
            with you<span className="text-accent">.</span>
          </h1>
          <p className="mt-12 max-w-xl text-xl leading-relaxed opacity-80">
            We help engineering teams decide where AI belongs, then build it alongside them. The
            same way we built Cortex.
          </p>
          <div className="mt-10">
            <ArrowLink href={BOOK_CALL_HREF}>Book a call</ArrowLink>
          </div>
        </div>
      </section>

      {/* Services */}
      <Section n="1.0" label="Services">
        <div className="flex flex-col gap-20">
          {services.map((s, i) => (
            <div key={s.slug} id={s.slug} className="scroll-mt-24 grid md:grid-cols-9 gap-x-10 gap-y-4">
              <div className="md:col-span-5">
                <Mono className="opacity-50">1.{i + 1}</Mono>
                <h2 className="display text-[clamp(2.25rem,4vw,3.75rem)] mt-2">{s.label}</h2>
              </div>
              <div className="md:col-span-4 md:pt-7">
                <p className="text-lg leading-relaxed opacity-80">{s.description}</p>
                <ul className="mt-4 flex flex-col gap-1 font-mono text-sm opacity-70">
                  {s.outcomes.map((o) => (
                    <li key={o}><span className="text-accent">—</span> {o}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Method */}
      <Section n="2.0" label="Method">
        <figure>
          <ProcessFigure />
          <figcaption className="mt-2"><Mono className="opacity-50">Fig. 1 — Engagement phases</Mono></figcaption>
        </figure>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
          {steps.map((s, i) => (
            <div key={s.title}>
              <Mono className="opacity-50">2.{i + 1}</Mono>
              <h3 className="text-2xl tracking-tight mt-2">{s.title}</h3>
              <p className="mt-3 opacity-70 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Engagements */}
      <Section n="3.0" label="Engagements">
        <div className="grid md:grid-cols-3 gap-x-10 gap-y-12">
          {engagements.map((e) => (
            <div key={e.name}>
              <Mono className={e.highlight ? "text-accent" : "opacity-50"}>
                {e.duration}{e.highlight && " · recommended"}
              </Mono>
              <h3 className="display text-4xl mt-3">{e.name}</h3>
              <p className="mt-4 opacity-70 leading-relaxed">{e.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <FaqList n="4.0" items={faqs} />
    </>
  );
}
