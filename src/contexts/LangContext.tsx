"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type Locale } from "@/lib/i18n";

type LangCtx = { lang: Locale; setLang: (l: Locale) => void };
const LangContext = createContext<LangCtx>({ lang: "fr", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Locale>("fr");

  useEffect(() => {
    const saved = localStorage.getItem("sl-lang") as Locale | null;
    if (saved && ["fr", "en", "ru"].includes(saved)) setLangState(saved);
  }, []);

  const setLang = (l: Locale) => {
    setLangState(l);
    localStorage.setItem("sl-lang", l);
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
