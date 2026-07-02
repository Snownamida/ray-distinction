import zh from "./zh.js";
import en from "./en.js";
import fr from "./fr.js";

const DICTS = { zh, en, fr };
export const SUPPORTED = Object.keys(DICTS);
const STORAGE_KEY = "ray_lang";

/**
 * La langue active est déterminée UNIQUEMENT par le chemin d'URL :
 *  /en/… → en, /fr/… → fr, racine « / » → zh.
 * Chaque langue est une page statique dont le <head> et l'article SEO sont
 * déjà figés dans cette langue ; l'interface React doit donc suivre le chemin,
 * pas le navigateur (sinon <head> chinois + jeu anglais). La détection
 * automatique du navigateur est gérée séparément par la bannière de la page
 * racine, et le choix manuel par le sélecteur qui navigue vers /en/ ou /fr/.
 */
export function resolveLang() {
  const seg = location.pathname.split("/").filter(Boolean)[0];
  return seg && DICTS[seg] ? seg : "zh";
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
