import Reveal from "@/components/site/Reveal";

// Paper-style section: numbered label in the margin, content in the body column.
export default function Section({
  id,
  n,
  label,
  children,
}: {
  id?: string;
  n: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 px-5 sm:px-10 py-24 sm:py-32 grid lg:grid-cols-12 gap-x-10 gap-y-8">
      <div className="lg:col-span-3">
        <div className="lg:sticky lg:top-24 font-mono text-xs uppercase tracking-widest">
          <span className="text-accent">{n}</span>
          <span className="ml-3 opacity-60">{label}</span>
        </div>
      </div>
      <Reveal className="lg:col-span-9">{children}</Reveal>
    </section>
  );
}

export function Mono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-mono text-xs uppercase tracking-widest ${className}`}>{children}</span>;
}

export function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="group inline-flex items-baseline gap-2 text-lg font-medium">
      <span className="underline decoration-accent decoration-2 underline-offset-[6px] group-hover:text-accent transition-colors duration-300">
        {children}
      </span>
      <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">→</span>
    </a>
  );
}
