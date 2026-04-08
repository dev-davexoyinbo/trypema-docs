---
seo:
  title: Trypema - Distributed Rate Limiting for Rust
  description: Sliding-window rate limiting for Rust with local, Redis, and hybrid providers plus absolute and suppressed strategies.
---

::u-page-hero{class="dark:bg-gradient-to-b from-neutral-900 to-neutral-950"}
---
orientation: horizontal
---
#top
:hero-background

#title
One rust rate limiter for in-memory and distributed workloads.

#description
Trypema gives you one API for **in-process**, **Redis-backed**, and **hybrid** sliding-window rate limiting. Start with a single service, then scale to distributed systems without switching libraries or changing mental models.

#links
  :::u-button
  ---
  to: /getting-started
  size: xl
  trailing-icon: i-lucide-arrow-right
  ---
  Get Started
  :::

  :::u-button
  ---
  to: https://github.com/dev-davexoyinbo/trypema
  target: _blank
  variant: ghost
  color: neutral
  size: xl
  icon: i-simple-icons-github
  ---
  GitHub
  :::

  :::u-button
  ---
  to: https://crates.io/crates/trypema
  target: _blank
  variant: ghost
  color: neutral
  size: xl
  trailing-icon: i-lucide-external-link
  ---
  crates.io
  :::

#default
  ::u-card{class="divide-y divide-neutral-200/60 dark:divide-neutral-800/60"}
  :::prose-pre
  ---
  filename: Cargo.toml
  code: |
    [dependencies]
    trypema = "1"
  ---
  ```toml [Cargo.toml]
  [dependencies]
  trypema = "1"
  ```
  :::

  :::prose-pre
  ---
  filename: main.rs
  code: |
    use trypema::{RateLimit, RateLimitDecision, RateLimiter};

    let rl = RateLimiter::builder().build().unwrap();
    let rate = RateLimit::try_from(10.0).unwrap();

    match rl.local().absolute().inc("user_123", &rate, 1) {
        RateLimitDecision::Allowed => { /* proceed */ }
        RateLimitDecision::Rejected { retry_after_ms, .. } => {
            eprintln!("retry in {retry_after_ms}ms");
        }
        RateLimitDecision::Suppressed { .. } => unreachable!(),
    }
  ---
  ```rust [main.rs]
  use trypema::{RateLimit, RateLimitDecision, RateLimiter};

  let rl = RateLimiter::builder().build().unwrap();
  let rate = RateLimit::try_from(10.0).unwrap();

  match rl.local().absolute().inc("user_123", &rate, 1) {
      RateLimitDecision::Allowed => { /* proceed */ }
      RateLimitDecision::Rejected { retry_after_ms, .. } => {
          eprintln!("retry in {retry_after_ms}ms");
      }
      RateLimitDecision::Suppressed { .. } => unreachable!(),
  }
  ```
  :::
  ::
::

::u-page-section
#title
Three providers, one model

#description
Pick the deployment shape you need today. The provider API stays familiar as you move from one machine to many.

#features
  :::u-page-feature
  ---
  icon: i-lucide-cpu
  ---
  #title
  Local
  #description
  In-process state with the lowest latency and the least operational overhead. Best for single services, workers, CLIs, and tests.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-database
  ---
  #title
  Redis
  #description
  Best-effort distributed limiting with one Redis round-trip per call. Use it when multiple instances must share limits directly.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-arrow-left-right
  ---
  #title
  Hybrid
  #description
  Local fast-path plus periodic Redis sync. This is the highest-throughput distributed option when per-request Redis I/O is too expensive.
  :::
::

::u-page-section
---
ui:
  features: 'lg:grid-cols-2'
---
#title
Two strategies

#description
Choose the admission style that matches your failure mode.

#features
  :::u-page-feature
  ---
  icon: i-lucide-shield
  ---
  #title
  Absolute
  #description
  Deterministic sliding-window limiting. Requests are either allowed or rejected, with best-effort retry hints on rejection.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-activity
  ---
  #title
  Suppressed
  #description
  Probabilistic shedding near or above capacity. Instead of an abrupt cliff, suppression increases as pressure rises.
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
#title
What Trypema is built for

#features
  :::u-page-feature
  ---
  icon: i-lucide-gauge
  ---
  #title
  Fractional rates
  #description
  Rate limits are `f64`, so `0.5 req/s` and `5.5 req/s` are first-class inputs.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-timer
  ---
  #title
  Sliding windows
  #description
  Smooth request accounting without fixed-window resets. Bucket coalescing lets you tune precision versus overhead.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-trash-2
  ---
  #title
  Background cleanup
  #description
  Cleanup can start automatically from `build()` or manually through `run_cleanup_loop()` when you construct from explicit options.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-server
  ---
  #title
  Runtime-aware Redis support
  #description
  Enable exactly one of `redis-tokio` or `redis-smol`. Redis-backed providers require Redis `7.2+`.
  :::
::

::u-page-section
#title
Start here

#features
  :::u-page-feature
  ---
  icon: i-lucide-rocket
  to: /getting-started
  ---
  #title
  Getting Started
  #description
  Install the crate, create a limiter, and choose a provider quickly.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-lightbulb
  to: /concepts/keys
  ---
  #title
  Concepts
  #description
  Learn how keys, rates, windows, and decisions fit together.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-layers
  to: /providers/local
  ---
  #title
  Providers
  #description
  Compare local, Redis, and hybrid tradeoffs before you commit to one.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-gauge
  to: /benchmarks/benchmark-results
  ---
  #title
  Benchmarks
  #description
  See where each provider is fastest and what the numbers do and do not mean.
  :::
::
