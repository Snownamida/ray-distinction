import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import { defineConfig } from "vite";

// Multi-pages : une page statique par langue (/, /en/, /fr/).
// Chaque HTML porte son propre <head> localisé + hreflang + article SEO ;
// le même bundle React lit la langue via le chemin (voir src/i18n).
export default defineConfig({
    // base absolue "/" : les pages en sous-dossier (/en/, /fr/) doivent référencer
    // les assets et images en chemin absolu, pas relatif.
    base: "/",
    plugins: [react(), tailwindcss()],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                en: resolve(__dirname, "en/index.html"),
                fr: resolve(__dirname, "fr/index.html"),
            },
        },
    },
});
