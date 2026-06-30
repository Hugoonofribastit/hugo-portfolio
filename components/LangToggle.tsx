"use client";

import { useLang } from "@/lib/i18n/useT";

/** EN | ES pill toggle, styled as Kinetic .pill. */
export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <span className="pill pill-link" role="group" aria-label="Language">
      <button type="button" className={lang === "en" ? "on" : ""} aria-pressed={lang === "en"} onClick={() => setLang("en")}>
        EN
      </button>
      <button type="button" className={lang === "es" ? "on" : ""} aria-pressed={lang === "es"} onClick={() => setLang("es")}>
        ES
      </button>
    </span>
  );
}
