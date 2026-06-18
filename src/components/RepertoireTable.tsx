"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { repertoire, categories, languages, type Role } from "@/data/repertoire";
import { pageText } from "@/lib/i18n";
import { useLang } from "@/contexts/LangContext";
import type { Locale } from "@/lib/i18n";

// Map French category keys → translation key in pageText.repertoire
const catKey: Record<(typeof categories)[number], keyof typeof pageText.repertoire.fr> = {
  "Tous":                 "cat_all",
  "Prêt à présenter":    "cat_ready",
  "En préparation":      "cat_prep",
  "Art Song":            "cat_song",
  "En russe":            "cat_russian",
  "Spécialité":          "cat_specialty",
  "Répertoire de niche": "cat_niche",
};

// Display labels for language filter codes
const langDisplay = (code: string, locale: Locale, t: { lang_all: string }) => {
  if (code === "Toutes") return t.lang_all;
  if (code === "LA") return locale === "ru" ? "Латынь" : "Latin";
  return code;
};

export function RepertoireTable() {
  const { lang } = useLang();
  const t = pageText.repertoire[lang];
  const [cat, setCat] = useState<(typeof categories)[number]>("Tous");
  const [langFilter, setLangFilter] = useState<(typeof languages)[number]>("Toutes");

  const filtered = useMemo<Role[]>(() => {
    const raw = repertoire.filter(
      (r) =>
        (cat === "Tous" || r.category === cat) &&
        (langFilter === "Toutes" || r.language === langFilter),
    );
    // When no category filter is active, deduplicate by composer+work+role
    // (same piece can appear in multiple categories intentionally)
    if (cat === "Tous") {
      const seen = new Set<string>();
      return raw.filter((r) => {
        const key = `${r.composer}|${r.work}|${r.role}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }
    return raw;
  }, [cat, langFilter]);

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between mb-12">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={[
                "px-4 py-2 text-[10px] uppercase tracking-ultra border transition-all duration-500",
                cat === c
                  ? "border-champagne text-champagne"
                  : "border-ivory/15 text-ivory/60 hover:text-ivory hover:border-ivory/40",
              ].join(" ")}
            >
              {t[catKey[c]]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 md:justify-end">
          {languages.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLangFilter(l)}
              className={[
                "px-3 py-2 text-[10px] uppercase tracking-ultra border transition-all duration-500",
                langFilter === l
                  ? "border-ivory text-ivory"
                  : "border-ivory/10 text-ivory/50 hover:text-ivory hover:border-ivory/30",
              ].join(" ")}
            >
              {langDisplay(l, lang, t)}
            </button>
          ))}
        </div>
      </div>

      <ul className="border-t border-ivory/10">
        <AnimatePresence initial={false} mode="popLayout">
          {filtered.map((r, i) => (
            <motion.li
              key={`${r.category}-${r.composer}-${r.work}-${r.role}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="group grid grid-cols-12 gap-4 py-6 md:py-8 items-baseline border-b border-ivory/10 hover:bg-ivory/[0.02] transition-colors duration-500"
            >
              <span className="col-span-1 text-[10px] uppercase tracking-ultra text-champagne/80">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="col-span-11 md:col-span-3 text-sm text-ivory/70">{r.composer}</span>
              <span className="col-span-12 md:col-span-4 font-display text-2xl md:text-3xl text-ivory">
                {r.work}
                {cat === "Tous" && (
                  <span className="block text-[10px] uppercase tracking-ultra text-champagne/50 mt-1 font-sans">
                    {t[catKey[r.category as (typeof categories)[number]] ?? "cat_all"]}
                  </span>
                )}
              </span>
              <span className="col-span-8 md:col-span-3 italic text-ivory/80">
                {r.role}
                {r.note && (
                  <span className="block text-[10px] not-italic tracking-ultra text-ivory/40 mt-1">{r.note}</span>
                )}
              </span>
              <span className="col-span-4 md:col-span-1 text-right text-[11px] uppercase tracking-ultra text-ivory/50">
                {langDisplay(r.language, lang, t)}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-ivory/50 italic">{t.no_result}</p>
      )}
    </div>
  );
}

