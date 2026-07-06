// Lightweight i18n: a cookie chooses the language, the server reads it (see
// lang.ts) and every page picks its copy with `pick(lang, greek, english)`.
// This file is pure data/helpers so it is safe to import from client components.

export type Lang = "el" | "en";

export const LANGS: Lang[] = ["el", "en"];

export const LANG_COOKIE = "lang";

export const otherLang = (l: Lang): Lang => (l === "el" ? "en" : "el");

/** Choose a value for the active language. */
export function pick<T>(lang: Lang, el: T, en: T): T {
  return lang === "en" ? en : el;
}

export const langLabel: Record<Lang, string> = { el: "ΕΛ", en: "EN" };

const locale = (lang: Lang) => (lang === "en" ? "en-IE" : "el-GR");

/** Currency, localised to the active language. */
export const fmtEur = (n: number, lang: Lang = "el") =>
  new Intl.NumberFormat(locale(lang), {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

/** Plain number, localised to the active language. */
export const fmtNum = (n: number, lang: Lang = "el") =>
  new Intl.NumberFormat(locale(lang)).format(n);
