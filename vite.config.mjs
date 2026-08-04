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
        card: resolve(__dirname, "src/card.html"),
        siteplan: resolve(__dirname, "src/siteplan.html"),
      },
    },
  },
});
