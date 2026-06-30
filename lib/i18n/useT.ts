"use client";

import { en } from "./en";
import { es } from "./es";
import { useLang } from "./LanguageProvider";
import type { Dictionary } from "./types";

export { useLang };

/** Returns the dictionary for the active language. */
export function useT(): Dictionary {
  const { lang } = useLang();
  return lang === "es" ? es : en;
}
