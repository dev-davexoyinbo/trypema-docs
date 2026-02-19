# AGENTS.md

This repository is a Nuxt 4 + Nuxt UI + Nuxt Content documentation site for Trypema.
Agentic coding assistants should follow this file for day-to-day commands and style.

## Quick Commands

- Install: `pnpm install`
- Dev server: `pnpm dev` (defaults to http://localhost:3000)
- Production build: `pnpm build`
- Preview production build: `pnpm preview`
- Lint: `pnpm lint`
- Typecheck: `pnpm typecheck`

Notes:
- Package manager is pinned in `package.json` (`pnpm@10.29.3`).
- `pnpm install` runs `postinstall: nuxt prepare` (generates `.nuxt/`).

## Lint / Typecheck (Single File)

There is no unit test runner configured in this repo (no Vitest/Jest). The "test" equivalents are lint + typecheck + build + a dev smoke check.

### Lint a single file

ESLint is configured via `@nuxt/eslint`.

- Lint one file: `pnpm lint -- app/pages/index.vue`
- Lint a folder: `pnpm lint -- server/`
- Auto-fix (where safe): `pnpm lint -- --fix`

### Typecheck a smaller surface area

`pnpm typecheck` runs `nuxt typecheck` (project-wide).

If you need a narrower check, prefer scoping the change and then running full `pnpm typecheck`.
If you must do a targeted TS check, you can run Vue TS directly (best-effort):

- `pnpm exec vue-tsc --noEmit -p .nuxt/tsconfig.json`

### “Single test” equivalent (smoke checks)

- Render one docs page: start dev server, then open `http://localhost:3000/<path>`.
- Verify raw markdown export for one page:
  - `http://localhost:3000/raw/getting-started/quickstart-local.md`

## Build / Preview

- Build: `pnpm build`
- Preview: `pnpm preview`

If build output looks wrong, clear the Nuxt cache and rebuild:

- `rm -rf .nuxt .output node_modules/.cache` then `pnpm install` then `pnpm build`

## Repository Layout

- `app/`: Nuxt UI app (layouts, pages, components)
- `content/`: Nuxt Content sources (Markdown + `.navigation.yml`)
- `server/`:
  - `server/routes/raw/[...slug].md.get.ts`: exposes `/raw/<path>.md` for LLM-friendly export
  - `server/mcp/tools/*`: MCP tools to list/get pages
- `nuxt.config.ts`: Nuxt + Content + nuxt-llms configuration
- `app/app.config.ts`: Nuxt UI app config (header/footer/toc links)

## Content Authoring Rules (Nuxt Content)

- Every docs page should include frontmatter with at least:
  - `title`
  - `description`
  - `navigation.icon` (Iconify name like `i-lucide-book-open`)
- Folder ordering is controlled by numeric prefixes:
  - Example: `content/1.getting-started/`, `content/2.concepts/`, etc.
- Section titles are set in `.navigation.yml` per folder.

### Code fences (syntax highlighting)

- Use plain language ids, e.g.:
  - ` ```rust`
  - ` ```toml`
  - ` ```bash`
- Do NOT append comma modifiers like `rust,no_run`.
  - If you need to indicate non-runnable code, put it in the snippet itself (e.g. `// pseudo-code` or comments).

## Nuxt / Vue Code Style

### General

- Prefer `<script setup lang="ts">` in Vue SFCs.
- Prefer Nuxt auto-imports for composables (`useRoute`, `useAsyncData`, `createError`, etc.).
- Keep pages/layouts declarative; push non-trivial logic into composables or server routes when appropriate.

### Imports

- Use `import type { ... }` for type-only imports.
- Order imports roughly:
  1) External packages (`@nuxt/...`, `ufo`, etc.)
  2) Internal modules/components
- Avoid unused imports; rely on lint.

### Formatting

- ESLint stylistic rules are configured in `nuxt.config.ts`:
  - `commaDangle: "never"`
  - `braceStyle: "1tbs"`
- In TS/Vue files, prefer single quotes for strings (match existing code in `app/` and `server/`).
- In config files, keep the existing file’s style consistent.

### Types

- Keep computed values typed via inference; annotate only where inference is unclear.
- Prefer narrow object shapes and explicit return types in server handlers when it improves readability.
- When injecting/providing values (`provide`/`inject`), use typed injection keys as shown in `app/app.vue` + `app/components/AppHeader.vue`.

### Naming

- Vue components: `PascalCase.vue` in `app/components/`.
- Composables (if added): `useXxx.ts`.
- Content pages: kebab-case filenames, numeric prefixes for ordering.

## Error Handling

### App pages

- For missing content pages, throw Nuxt errors with `fatal: true` (see `app/pages/[...slug].vue`).
- Keep SEO metadata in sync with content (`useSeoMeta`).

### Server routes

- Use `eventHandler` and throw `createError({ statusCode, statusMessage, fatal: true })` for hard failures.
- Validate inputs early (e.g. `/raw/*.md` must end with `.md`).
- Set explicit response headers when returning non-HTML content.

## Nuxt UI Conventions

- Prefer Nuxt UI components (`UPage`, `UHeader`, `UButton`, `UContentToc`, etc.) over custom markup.
- Icons use Iconify names; installed icon sets include `lucide` and `simple-icons`.
- Keep UI configuration in `app/app.config.ts` when possible.

## Automation / Agent Notes

- No Cursor rules (`.cursor/rules/` or `.cursorrules`) and no Copilot instructions (`.github/copilot-instructions.md`) were found at repo root.
- Before opening a PR, run: `pnpm lint && pnpm typecheck && pnpm build`.
