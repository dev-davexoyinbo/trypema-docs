# Trypema Docs

Documentation site for Trypema, built with Nuxt 4 + Nuxt UI + Nuxt Content.

## Requirements

- Node.js (LTS recommended)
- pnpm (this repo pins `pnpm@10.29.3`)

## Setup

```bash
pnpm install
```

`pnpm install` runs `nuxt prepare` (generates `.nuxt/`).

## Development

Start the dev server on `http://localhost:3000`:

```bash
pnpm dev
```

## Quality Checks

```bash
pnpm lint
pnpm typecheck
```

## Production

```bash
pnpm build
pnpm preview
```

If build output looks wrong, clear Nuxt caches and rebuild:

```bash
rm -rf .nuxt .output node_modules/.cache
pnpm install
pnpm build
```

## Content Authoring

- Docs live in `content/` (Markdown + `.navigation.yml`).
- Each page should include frontmatter with at least:
  - `title`
  - `description`
  - `navigation.icon` (Iconify name like `i-lucide-book-open`)
- Folder ordering uses numeric prefixes (e.g. `content/1.getting-started/`).

Code fences: use plain language ids (e.g. `bash`, `toml`, `rust`) and avoid modifiers like `rust,no_run`.

## Useful Routes

- Raw Markdown export for LLM-friendly consumption: `GET /raw/<path>.md`
  - Example: `http://localhost:3000/raw/getting-started/quickstart-local.md`

## Repository Layout

- `app/`: Nuxt UI app (layouts, pages, components)
- `content/`: Nuxt Content sources
- `server/routes/raw/[...slug].md.get.ts`: `/raw/*.md` route
- `server/mcp/tools/`: MCP tools for listing/getting pages
- `nuxt.config.ts`: Nuxt + Content + nuxt-llms configuration
