import { defineNuxtConfig } from "nuxt"

export default defineNuxtConfig({
  components: {
    dirs: [
      {
        path: "~/components",
        global: true,
      },
    ],
  },

  css: ["~/assets/css/globals.css"],

  colorMode: {
    classSuffix: "",
  },
})
