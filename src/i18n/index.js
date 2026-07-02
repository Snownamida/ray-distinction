import zh from "./zh.js";

// Les paquets en/fr seront ajoutés à cet index une fois rédigés.
const DICTS = { zh };
export const SUPPORTED = Object.keys(DICTS);
const STORAGE_KEY = "ray_lang";

/**
 * Détermine la langue active, par ordre de priorité :
 *  1. le chemin d'URL (/en/…, /fr/…) — chaque langue a sa page statique ;
 *  2. le choix mémorisé (localStorage) ;
 *  3. la langue du navigateur ;
 *  4. le chinois par défaut.
 */
export function resolveLang() {
  const seg = location.pathname.split("/").filter(Boolean)[0];
  if (seg && DICTS[seg]) return seg;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && DICTS[saved]) return saved;
  } catch {
    /* localStorage indisponible */
  }
  const nav = (navigator.language || "").slice(0, 2).toLowerCase();
  return DICTS[nav] ? nav : "zh";
}

export function getDict(lang) {
  return DICTS[lang] || zh;
}

export function rememberLang(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* ignore */
  }
}
