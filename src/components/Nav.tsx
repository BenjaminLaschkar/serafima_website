"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/site";
import { useLang } from "@/contexts/LangContext";
import { navTranslations, locales, localeLabels, type Locale } from "@/lib/i18n";
import clsx from "clsx";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-velvet",
          scrolled || open
            ? "backdrop-blur-md bg-ink/70 border-b border-ivory/5"
            : "bg-transparent border-b border-transparent",
        )}
        style={{ height: "var(--header-h)" }}
      >
        <div className="container-edge flex h-full items-center justify-between">
          <Link
            href="/"
            aria-label="Serafima Liberman — Accueil"
            className="font-display text-xl md:text-2xl tracking-wider-2 text-ivory hover:text-champagne transition-colors duration-700"
          >
            Serafima<span className="text-champagne"> · </span>Liberman
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {site.nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              const label = navTranslations[item.href]?.[lang] ?? item.label;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "text-[11px] uppercase tracking-ultra link-underline",
                    active ? "text-champagne" : "text-ivory/80 hover:text-ivory",
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-1 ml-8 border-l border-ivory/10 pl-8">
            {locales.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l as Locale)}
                aria-label={`Switch to ${l.toUpperCase()}`}
                className={clsx(
                  "px-2 py-1 text-[10px] uppercase tracking-ultra transition-all duration-500",
                  lang === l
                    ? "text-champagne border-b border-champagne"
                    : "text-ivory/40 hover:text-ivory/80",
                )}
              >
                {localeLabels[l as Locale]}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            className="lg:hidden relative h-10 w-10 -mr-2 flex flex-col items-center justify-center gap-[5px]"
          >
            <span className={clsx("block h-px w-7 bg-ivory transition-transform duration-500 ease-velvet", open && "translate-y-[3px] rotate-45")} />
            <span className={clsx("block h-px w-7 bg-ivory transition-transform duration-500 ease-velvet", open && "-translate-y-[3px] -rotate-45")} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-ink lg:hidden"
          >
            <div className="container-edge h-full pt-32 pb-16 flex flex-col">
              <ul className="space-y-2">
                {site.nav.map((item, i) => {
                  const label = navTranslations[item.href]?.[lang] ?? item.label;
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.06 }}
                    >
                      <Link
                        href={item.href}
                        className="block font-display text-5xl md:text-6xl text-ivory hover:text-champagne transition-colors duration-500"
                      >
                        {label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-8 flex items-center gap-3">
                {locales.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l as Locale)}
                    className={clsx(
                      "text-[11px] uppercase tracking-ultra px-4 py-2 border transition-all duration-500",
                      lang === l
                        ? "border-champagne text-champagne"
                        : "border-ivory/20 text-ivory/50 hover:text-ivory hover:border-ivory/50",
                    )}
                  >
                    {localeLabels[l as Locale]}
                  </button>
                ))}
              </div>

              <div className="mt-auto flex items-end justify-between text-[11px] uppercase tracking-ultra text-ivory/50">
                <a href={`mailto:${site.email}`} className="link-underline">{site.email}</a>
                <span>Paris · Moscou · Weimar</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
