import type { Metadata } from "next";
import { Mono } from "@/components/site/Section";
import CopyEmail from "@/components/site/CopyEmail";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch: ${CONTACT_EMAIL}`,
};

export default function ContactPage() {
  return (
    <section className="px-5 sm:px-10 pt-20 sm:pt-32 pb-8 min-h-[70vh] grid lg:grid-cols-12 gap-x-10 gap-y-10">
      <div className="lg:col-span-3 pt-3">
        <Mono className="opacity-60">Contact</Mono>
      </div>
      <div className="lg:col-span-9">
        <h1 className="display text-[clamp(4rem,13vw,13rem)]">
          Let&apos;s talk<span className="text-accent">.</span>
        </h1>
        <p className="mt-10 max-w-xl text-xl leading-relaxed opacity-80">
          A question about Cortex, early access, or a project you&apos;d like to build with us.
          Write to us.
        </p>
        <div className="mt-14 flex flex-col items-start gap-4">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="display text-[clamp(1.75rem,4.5vw,4rem)] underline decoration-accent decoration-2 underline-offset-[10px] hover:text-accent transition-colors duration-300 break-all"
          >
            {CONTACT_EMAIL}
          </a>
          <CopyEmail email={CONTACT_EMAIL} />
        </div>
      </div>
    </section>
  );
}
