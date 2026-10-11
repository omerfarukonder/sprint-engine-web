import Section from "@/components/site/Section";

export interface FaqEntry {
  q: string;
  a: string;
}

export default function FaqList({ id, n, items }: { id?: string; n: string; items: FaqEntry[] }) {
  return (
    <Section id={id} n={n} label="Questions">
      <div className="flex flex-col gap-2 max-w-3xl">
        {items.map((f, i) => (
          <details key={f.q} className="group">
            <summary className="flex items-baseline gap-5 cursor-pointer list-none py-3">
              <span className="font-mono text-xs opacity-50 w-8 shrink-0">Q{i + 1}</span>
              <span className="text-2xl tracking-tight group-hover:text-accent transition-colors flex-1">{f.q}</span>
              <span className="text-accent transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="pl-13 pb-6 text-lg leading-relaxed opacity-75 max-w-2xl">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
