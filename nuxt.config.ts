import { defineNuxtConfig } from "nuxt"

export default defineNuxtConfig({
  extends: [
    "./layers/shared-ui",
    "./layers/inbox",
    "./layers/task",
    "./layers/contacts",
    "./layers/document",
    "./layers/settings",
  ],

  // Project metadata
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },

  // Module configuration
  modules: ["@nuxt/ui", "@pinia/nuxt"],

  // Styling
  css: ["~/assets/css/main.css"],

  // Pinia store management
  pinia: {
    storesDirs: ["./stores/**", "./layers/*/stores/**"],
  },

  // App configuration
  app: {
    head: {
      title: "CRM Dashboard",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Enterprise CRM Management System" },
      ],
    },
  },

  // Build configuration
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/sitemap.xml", "/robots.txt"],
      ignore: ["/admin"],
    },
  },

  // Environment configuration
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || "http://localhost:3000",
    },
  },
})
