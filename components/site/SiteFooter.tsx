import Link from "next/link";
import Wordmark from "@/components/site/Wordmark";
import Reveal from "@/components/site/Reveal";
import { COMPANY_NAME, CONTACT_EMAIL, BOOK_CALL_HREF, products, services, serviceHref } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="px-5 sm:px-10 pt-32 pb-10">
      <div className="grid lg:grid-cols-12 gap-x-10 gap-y-8">
        <div className="lg:col-span-3 font-mono text-xs uppercase tracking-widest">
          <span className="text-accent">∎</span>
          <span className="ml-3 opacity-60">Contact</span>
        </div>
        <Reveal className="lg:col-span-9">
          <a href={BOOK_CALL_HREF} className="group display block text-[clamp(3.5rem,9vw,9rem)]">
            Let&apos;s talk<span className="text-accent">.</span>
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="inline-block mt-6 text-xl underline decoration-accent decoration-2 underline-offset-[6px] hover:text-accent transition-colors duration-300">
            {CONTACT_EMAIL}
          </a>
        </Reveal>
      </div>

      <div className="mt-32 grid lg:grid-cols-12 gap-x-10 gap-y-8 text-sm">
        <div className="lg:col-span-3">
          <Wordmark className="text-3xl" />
        </div>
        <div className="lg:col-span-3 flex flex-col gap-1.5">
          <span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-2">Products</span>
          {products.map((p) => (
            <Link key={p.label} href={p.href} className="opacity-70 hover:opacity-100">{p.label}</Link>
          ))}
        </div>
        <div className="lg:col-span-3 flex flex-col gap-1.5">
          <span className="font-mono text-xs uppercase tracking-widest opacity-50 mb-2">Consultancy</span>
          {services.map((s) => (
            <Link key={s.slug} href={serviceHref(s.slug)} className="opacity-70 hover:opacity-100">{s.label}</Link>
          ))}
        </div>
        <div className="lg:col-span-3 lg:text-right self-end font-mono text-xs opacity-50">
          © 2026 {COMPANY_NAME}
        </div>
      </div>
    </footer>
  );
}
