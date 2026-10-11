"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Wordmark from "@/components/site/Wordmark";
import { CONTACT_HREF, products, services, serviceHref } from "@/lib/site";

const menus = [
  {
    label: "Products",
    href: "/products/cortex",
    items: products.map((p) => ({ label: p.label, href: p.href, note: p.description })),
  },
  {
    label: "Solutions",
    href: "/solutions",
    items: services.map((s) => ({ label: s.label, href: serviceHref(s.slug), note: s.description })),
  },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close any open menu after navigating
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  const current = menus.find((m) => m.label === openMenu);

  // Already home: glide to the top instead of re-navigating
  const onLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const underline =
    "relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:transition-transform after:duration-300";

  return (
    <header className="sticky top-0 z-50" onMouseLeave={() => setOpenMenu(null)}>
      <div className="relative z-10 bg-paper/90 backdrop-blur px-5 sm:px-10 h-16 flex items-center justify-between">
        <Link href="/" onClick={onLogoClick} className="hover:opacity-70 transition-opacity duration-300">
          <Wordmark className="text-xl" />
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {menus.map((menu) => {
            const active = pathname.startsWith(menu.href.split("/").slice(0, 2).join("/"));
            const open = openMenu === menu.label;
            return (
              <button
                key={menu.label}
                onMouseEnter={() => setOpenMenu(menu.label)}
                onClick={() => setOpenMenu(open ? null : menu.label)}
                aria-expanded={open}
                className={`${underline} transition-opacity duration-300 ${
                  open || active ? "opacity-100" : "opacity-60 hover:opacity-100"
                } ${active ? "after:bg-accent after:scale-x-100" : "after:bg-ink after:scale-x-0 hover:after:scale-x-100"} ${
                  open ? "after:scale-x-100" : ""
                }`}
              >
                {menu.label}
              </button>
            );
          })}
          <Link
            href={CONTACT_HREF}
            onMouseEnter={() => setOpenMenu(null)}
            className={`${underline} transition-opacity duration-300 ${
              pathname === CONTACT_HREF
                ? "opacity-100 after:bg-accent after:scale-x-100"
                : "opacity-60 hover:opacity-100 after:bg-ink after:scale-x-0 hover:after:scale-x-100"
            }`}
          >
            Contact
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          className="md:hidden text-sm"
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Desktop dropdown — floats over the page so nothing below shifts */}
      <AnimatePresence>
        {current && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="hidden md:block fixed inset-0 top-16 bg-paper/50 backdrop-blur-[2px] pointer-events-none"
            />
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="hidden md:block absolute left-0 right-0 top-full bg-paper shadow-[0_24px_40px_-24px_rgba(20,17,15,0.25)]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.label}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.16 }}
                  className="grid grid-cols-12 gap-x-10 px-10 pt-4 pb-10"
                >
                  <div className="col-span-3 font-mono text-xs uppercase tracking-widest opacity-60 pt-2">
                    {current.label}
                  </div>
                  <div className="col-span-9 grid grid-cols-2 gap-x-10 gap-y-5">
                    {current.items.map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.03 * i }}
                      >
                        <Link href={item.href} className="group block">
                          <span className="block text-xl tracking-tight group-hover:text-accent transition-colors duration-300">
                            {item.label}
                            <span className="inline-block ml-2 text-accent opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                          </span>
                          <span className="block text-sm opacity-60 mt-0.5">{item.note}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile menu — overlay, fades in */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="md:hidden absolute left-0 right-0 top-full bg-paper h-[calc(100dvh-4rem)] overflow-y-auto px-5 pb-10 flex flex-col gap-10"
          >
            {menus.map((menu) => (
              <div key={menu.label}>
                <Link href={menu.href} className="font-mono text-xs uppercase tracking-widest opacity-60">
                  {menu.label}
                </Link>
                {menu.items.map((item) => (
                  <Link key={item.label} href={item.href} className="display block text-4xl mt-3">
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
            <Link href={CONTACT_HREF} className="display text-4xl text-accent">Contact</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
