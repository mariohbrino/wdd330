import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "./src",
  base: "/wdd330/",

  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        set: resolve(__dirname, "src/set.html"),
        cards: resolve(__dirname, "src/cards.html"),
        siteplan: resolve(__dirname, "src/siteplan.html"),
      },
    },
  },
});
