// https://nuxt.com/docs/api/configuration/nuxt-config
import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

/**
 * Walk all .md files under `dir` and return their paths relative to `dir`.
 */
function walkMd(dir: string, base = dir): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...walkMd(full, base));
    } else if (entry.endsWith(".md")) {
      results.push(relative(base, full));
    }
  }
  return results;
}

/**
 * Convert a content file's relative path to the URL path Nuxt Content assigns it.
 * Rules (mirrors @nuxt/content v3 behaviour):
 *   - Strip leading numeric prefix from each segment (e.g. "1.getting-started" → "getting-started")
 *   - "index" filename → use the parent path (i.e. strip the filename)
 *   - Skip root index.md (served as landing collection, not docs)
 *   - Strip .md extension
 */
function contentPathToRoute(relPath: string): string | null {
  // Normalise to forward slashes, strip .md
  const withoutExt = relPath.replace(/\\/g, "/").replace(/\.md$/, "");

  // Skip root index (landing page, not in docs collection)
  if (withoutExt === "index") return null;

  const segments = withoutExt.split("/").map(seg =>
    // Strip numeric ordering prefix: "1.getting-started" → "getting-started"
    seg.replace(/^\d+\./, ""),
  );

  // "index" segment means the page lives at the parent path
  if (segments[segments.length - 1] === "index") {
    segments.pop();
  }

  return "/" + segments.join("/");
}

export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/content",
    "nuxt-og-image",
    "nuxt-llms",
    "@nuxtjs/mcp-toolkit",
    "nuxt-gtag",
  ],

  devtools: {
    enabled: true,
  },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || "/",
  },

  css: ["~/assets/css/main.css"],

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            // Default theme (same as single string)
            default: "github-light",
            // Theme used if `html.dark`
            dark: "github-dark",
            // Theme used if `html.sepia`
            sepia: "monokai",
          },
          // Nuxt Content does not load all languages by default.
          // Add the ones we use in this docs site.
          langs: [
            "json",
            "js",
            "ts",
            "html",
            "css",
            "vue",
            "shell",
            "bash",
            "mdc",
            "md",
            "yaml",
            "toml",
            "rust",
          ],
        },
        toc: {
          searchDepth: 1,
        },
      },
    },
  },

  experimental: {
    asyncContext: true,
  },

  compatibilityDate: "2024-07-11",

  nitro: {
    prerender: {
      routes: ["/"],
      crawlLinks: true,
      autoSubfolderIndex: false,
    },
  },

  hooks: {
    "nitro:config"(nitroConfig) {
      const contentDir = join(__dirname, "content");
      const rawRoutes = walkMd(contentDir)
        .map(contentPathToRoute)
        .filter((r): r is string => r !== null)
        .map(r => `/raw${r}.md`);

      nitroConfig.prerender ??= {};
      nitroConfig.prerender.routes ??= [];
      nitroConfig.prerender.routes.push(...rawRoutes);
    },
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },

  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID,
  },

  icon: {
    provider: "iconify",
  },

  llms: {
    // Used by nuxt-llms to generate LLM-friendly docs exports.
    // Update `domain` once the docs site is deployed.
    domain: "http://localhost:3000",
    title: "Trypema",
    description:
      "Trypema is a Rust rate limiting library for local and Redis-backed enforcement.",
    full: {
      title: "Trypema - Full Documentation",
      description:
        "Full documentation for Trypema (Rust rate limiting library).",
    },
    sections: [
      {
        title: "Getting Started",
        contentCollection: "docs",
        contentFilters: [
          { field: "path", operator: "LIKE", value: "/getting-started%" },
        ],
      },
      {
        title: "Concepts",
        contentCollection: "docs",
        contentFilters: [
          { field: "path", operator: "LIKE", value: "/concepts%" },
        ],
      },
      {
        title: "Strategies",
        contentCollection: "docs",
        contentFilters: [
          { field: "path", operator: "LIKE", value: "/strategies%" },
        ],
      },
      {
        title: "Providers",
        contentCollection: "docs",
        contentFilters: [
          { field: "path", operator: "LIKE", value: "/providers%" },
        ],
      },
      {
        title: "Guides",
        contentCollection: "docs",
        contentFilters: [
          { field: "path", operator: "LIKE", value: "/guides%" },
        ],
      },
      {
        title: "Reference",
        contentCollection: "docs",
        contentFilters: [
          { field: "path", operator: "LIKE", value: "/reference%" },
        ],
      },
    ],
  },

  mcp: {
    name: "Trypema docs",
  },
});
