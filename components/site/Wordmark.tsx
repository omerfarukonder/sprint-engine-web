import { COMPANY_NAME } from "@/lib/site";

// Stacked wordmark: one word per line, accent full stop.
export default function Wordmark({ className = "" }: { className?: string }) {
  const words = COMPANY_NAME.split(" ");
  return (
    <span className={`display inline-flex flex-col leading-[0.82] tracking-[-0.03em] ${className}`}>
      <span className="sr-only">{COMPANY_NAME}</span>
      {words.map((word, i) => (
        <span key={word} aria-hidden>
          {word}
          {i === words.length - 1 && <span className="text-accent">.</span>}
        </span>
      ))}
    </span>
  );
}
