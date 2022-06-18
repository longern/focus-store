import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import { vueI18n } from "@intlify/vite-plugin-vue-i18n";

// https://astro.build/config
export default defineConfig({
  build: { format: "file" },
  integrations: [vue()],
  vite: {
    ssr: {
      external: ["svgo"],
    },
    plugins: [vueI18n()],
  },
});
