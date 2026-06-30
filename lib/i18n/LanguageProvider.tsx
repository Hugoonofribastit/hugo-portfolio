"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Lang } from "./types";

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  // On mount, restore a saved preference or fall back to the browser locale.
  // Runs post-hydration, so the initial server/client render stays consistent.
  useEffect(() => {
    const saved =
      typeof localStorage !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    if (saved === "en" || saved === "es") {
      setLang(saved);
    } else if (typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("es")) {
      setLang("es");
    }
  }, []);

  useEffect(() => {
    if (typeof localStorage !== "undefined") localStorage.setItem("lang", lang);
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const toggle = () => setLang((l) => (l === "en" ? "es" : "en"));

  return (
    <LangContext.Provider value={{ lang, setLang, toggle }}>{children}</LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const v = useContext(LangContext);
  if (!v) throw new Error("useLang must be used within LanguageProvider");
  return v;
}
