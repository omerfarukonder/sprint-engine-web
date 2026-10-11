import {
  siAnthropic, siGooglegemini, siMistralai, siMeta, siDeepseek, siOllama, siHuggingface,
  siCursor, siWindsurf, siGithubcopilot, siNotion, siLinear, siObsidian, siZedindustries,
} from "simple-icons";
import Section from "@/components/site/Section";

// OpenAI logo path is not in simple-icons
const openAiPath =
  "M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43c-1.18 0-2.32-.421-3.22-1.188l.16-.086 5.34-3.086a.86.86 0 0 0 .44-.757v-7.54l2.258 1.304a.08.08 0 0 1 .046.061v6.243c-.006 2.742-2.239 4.965-5.024 4.965v.047zm-10.799-4.56a4.944 4.944 0 0 1-.592-3.331l.162.098 5.34 3.085a.865.865 0 0 0 .871 0l6.52-3.765v2.608a.08.08 0 0 1-.034.065l-5.398 3.118a4.994 4.994 0 0 1-6.87-1.779v.001zm-1.404-11.35a4.94 4.94 0 0 1 2.585-2.177v6.352a.86.86 0 0 0 .437.754l6.495 3.75-2.258 1.304a.08.08 0 0 1-.075.009L2.83 12.528a4.993 4.993 0 0 1-1.772-6.008zm18.558 4.26l-6.52-3.766 2.259-1.305a.079.079 0 0 1 .075-.009l5.343 3.087a4.994 4.994 0 0 1-.748 9.016v-6.37a.86.86 0 0 0-.41-.653zm2.249-3.332l-.16-.098-5.34-3.085a.867.867 0 0 0-.872 0L9.27 8.071V5.463a.08.08 0 0 1 .033-.065l5.397-3.116a4.996 4.996 0 0 1 7.425 5.176zm-14.133 4.633l-2.257-1.304a.08.08 0 0 1-.047-.062V6.48c.001-2.744 2.236-4.967 5.024-4.963a4.962 4.962 0 0 1 3.22 1.188l-.16.087-5.34 3.086a.86.86 0 0 0-.44.758l-.005 7.54zm1.227-2.647l2.901-1.676 2.9 1.674v3.348l-2.9 1.674-2.9-1.677V9.434z";

type Item = { name: string; path: string };

const models: Item[] = [
  { name: "OpenAI", path: openAiPath },
  { name: "Claude", path: siAnthropic.path },
  { name: "Gemini", path: siGooglegemini.path },
  { name: "Mistral", path: siMistralai.path },
  { name: "Llama", path: siMeta.path },
  { name: "DeepSeek", path: siDeepseek.path },
  { name: "Ollama", path: siOllama.path },
  { name: "Hugging Face", path: siHuggingface.path },
];

const tools: Item[] = [
  { name: "Cursor", path: siCursor.path },
  { name: "Windsurf", path: siWindsurf.path },
  { name: "Copilot", path: siGithubcopilot.path },
  { name: "Zed", path: siZedindustries.path },
  { name: "Notion", path: siNotion.path },
  { name: "Linear", path: siLinear.path },
  { name: "Obsidian", path: siObsidian.path },
];

function LogoList({ title, items }: { title: string; items: Item[] }) {
  return (
    <div>
      <span className="font-mono text-xs uppercase tracking-widest opacity-50">{title}</span>
      <ul className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-5">
        {items.map((item) => (
          <li key={item.name} className="flex items-center gap-3 opacity-75 hover:opacity-100 transition-opacity">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0" aria-hidden>
              <path d={item.path} />
            </svg>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Integrations({ n }: { n: string }) {
  return (
    <Section n={n} label="Compatibility">
      <h2 className="display text-[clamp(2.25rem,4vw,3.75rem)] max-w-2xl">
        Bring your own model<span className="text-accent">.</span>
      </h2>
      <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-75">
        Cortex runs on your API key and works alongside the tools your team already uses.
      </p>
      <div className="mt-14 flex flex-col gap-12">
        <LogoList title="models[]" items={models} />
        <LogoList title="tools[]" items={tools} />
      </div>
    </Section>
  );
}
