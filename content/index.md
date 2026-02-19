---
seo:
  title: Trypema
  description: High-performance rate limiting primitives in Rust (local + Redis).
---

::u-page-hero{class="dark:bg-gradient-to-b from-neutral-900 to-neutral-950"}
---
orientation: horizontal
---
#top
:hero-background

#title
Trypema [Rate Limiting]{.text-primary}.

#description
Trypema is a Rust rate limiting library supporting both in-process enforcement and Redis-backed distributed limiting. These docs target Trypema `v1.0`.

#links
  :::u-button
  ---
  to: /getting-started
  size: xl
  trailing-icon: i-lucide-arrow-right
  ---
  Get started
  :::

  :::u-button
  ---
  color: neutral
  variant: outline
  size: xl
  to: https://crates.io/crates/trypema
  target: _blank
  trailing-icon: i-lucide-external-link
  ---
  crates.io
  :::

  :::u-button
  ---
  icon: i-simple-icons-github
  color: neutral
  variant: ghost
  size: xl
  to: https://github.com/dev-davexoyinbo/trypema
  target: _blank
  ---
  GitHub
  :::

#default
  :::prose-pre
  ---
  filename: Cargo.toml
  code: |
    [dependencies]
    trypema = "1.0"
  ---

  ```toml [Cargo.toml]
  [dependencies]
  trypema = "1.0"
  ```
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
#title
Providers

#features
  :::u-page-feature
  ---
  icon: i-lucide-cpu
  ---
  #title
  Local (In-Process)

  #description
  In-memory, per-key sliding windows with low overhead. Great for single-process services.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-database
  ---
  #title
  Redis (Distributed)

  #description
  Redis-backed enforcement for multi-instance deployments. Atomic Lua scripts; best-effort distributed semantics.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-gauge
  ---
  #title
  Non-integer Rates

  #description
  Configure limits as requests/second using `f64` (e.g. `5.5 req/s`).
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
#title
Strategies

#features
  :::u-page-feature
  ---
  icon: i-lucide-shield
  ---
  #title
  Absolute

  #description
  Deterministic sliding-window enforcement with hard rejection when over limit.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-waves
  ---
  #title
  Suppressed

  #description
  Probabilistic suppression near capacity to degrade gracefully under load spikes.
  :::
::

::u-page-section{class="dark:bg-gradient-to-b from-neutral-950 to-neutral-900"}
  :::u-page-c-t-a
  ---
  links:
    - label: Get started
      to: '/getting-started'
      trailingIcon: i-lucide-arrow-right
    - label: API docs (docs.rs)
      to: 'https://docs.rs/trypema'
      target: _blank
      variant: subtle
      icon: i-simple-icons-rust
  title: Add rate limiting with confidence
  description: Pick local or Redis, choose absolute or suppressed, and ship predictable behavior under load.
  class: dark:bg-neutral-950
  ---

  :stars-bg
  :::
::
