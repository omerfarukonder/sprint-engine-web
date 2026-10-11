import Link from "next/link";
import LiveGraph from "@/components/cortex/LiveGraph";
import Section, { Mono, ArrowLink } from "@/components/site/Section";
import { products, services, serviceHref } from "@/lib/site";

const cortex = products[0];

const principles = [
  { title: "Built, then advised", body: "Our advice comes from running AI products in production. Lessons from Cortex go straight into client work." },
  { title: "Engineering first", body: "We work in sprints, tickets and pull requests. Everything fits how software teams already operate." },
  { title: "Yours to own", body: "Your data stays in your environment. Every system we deliver is documented and handed over." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="px-5 sm:px-10 pt-20 sm:pt-32 pb-16 grid lg:grid-cols-12 gap-x-10 gap-y-10">
        <div className="lg:col-span-3 pt-3">
          <Mono className="opacity-60">AI products & consultancy</Mono>
        </div>
        <div className="lg:col-span-9">
          <h1 className="display text-[clamp(3.25rem,9vw,9.5rem)]">
            We build AI
            <br />
            that remembers<span className="text-accent">.</span>
          </h1>
          <p className="mt-12 max-w-xl text-xl leading-relaxed opacity-80">
            A small studio for engineering teams. We make Cortex, a memory layer for software
            organisations, and we help companies build their own AI systems.
          </p>
        </div>
      </section>

      {/* Products */}
      <Section n="1.0" label="Products">
        <div className="grid xl:grid-cols-9 gap-10 items-center">
          <div className="xl:col-span-4">
            <Mono className="text-accent">Early access</Mono>
            <h2 className="display text-[clamp(3rem,6vw,5.5rem)] mt-3">{cortex.label}</h2>
            <p className="mt-6 text-lg leading-relaxed opacity-80 max-w-md">
              Captures decisions from chat, meetings and documents, and turns them into a knowledge
              graph your team can question in plain language.
            </p>
            <div className="mt-8">
              <ArrowLink href={cortex.href}>Read the product spec</ArrowLink>
            </div>
          </div>
          <figure className="xl:col-span-5">
            <LiveGraph />
            <figcaption className="mt-3"><Mono className="opacity-50">Fig. 1 — Cortex knowledge graph, live</Mono></figcaption>
          </figure>
        </div>
      </Section>

      {/* Consultancy */}
      <Section n="2.0" label="Consultancy">
        <h2 className="display text-[clamp(2.5rem,5vw,4.5rem)] max-w-3xl">
          We build it with you<span className="text-accent">.</span>
        </h2>
        <div className="mt-14 grid sm:grid-cols-2 gap-x-10 gap-y-12">
          {services.map((s, i) => (
            <Link key={s.slug} href={serviceHref(s.slug)} className="group">
              <Mono className="opacity-50">2.{i + 1}</Mono>
              <span className="block text-2xl tracking-tight mt-2 group-hover:text-accent transition-colors">{s.label}</span>
              <span className="block mt-2 opacity-70 leading-relaxed">{s.description}</span>
            </Link>
          ))}
        </div>
        <div className="mt-14">
          <ArrowLink href="/consultancy">How we work</ArrowLink>
        </div>
      </Section>

      {/* Principles */}
      <Section n="3.0" label="Principles">
        <div className="grid md:grid-cols-3 gap-x-10 gap-y-12">
          {principles.map((p, i) => (
            <div key={p.title}>
              <Mono className="opacity-50">3.{i + 1}</Mono>
              <h3 className="text-2xl tracking-tight mt-2">{p.title}</h3>
              <p className="mt-3 opacity-70 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
