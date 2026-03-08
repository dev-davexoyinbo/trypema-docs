---
seo:
  title: Trypema - Distributed Rate Limiting for Rust
  description: High-performance rate limiting for Rust — local, Redis-backed, and hybrid providers with strict and probabilistic strategies.
---

::u-page-hero{class="dark:bg-gradient-to-b from-neutral-900 to-neutral-950"}
---
orientation: horizontal
---
#top
:hero-background

#title
Distributed Rate Limiting for Rust.

#description
High-performance, ergonomic primitives for **local** (in-memory), **Redis-backed**, and **hybrid** rate limiting. Built for Tokio with atomic Lua scripts and fractional rates.

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
  filename: terminal
  code: |
    cargo add trypema
  ---
  ```bash
  cargo add trypema
  ```
  :::

  :::prose-pre
  ---
  filename: main.rs
  code: |
    use std::sync::Arc;
    use trypema::{RateLimit, RateLimitDecision, RateLimiter};

    let rate = RateLimit::try_from(10.0).unwrap(); // 10 req/s

    // Absolute: allow or reject
    match rl.local().absolute().inc("user_123", &rate, 1) {
        RateLimitDecision::Allowed => { /* proceed */ }
        RateLimitDecision::Rejected { retry_after_ms, .. } => {
            eprintln!("retry in {retry_after_ms}ms");
        }
        _ => {}
    }

    // Suppressed: smooth degradation
    match rl.local().suppressed().inc("user_123", &rate, 1) {
        RateLimitDecision::Allowed => { /* proceed */ }
        RateLimitDecision::Suppressed { is_allowed, .. } => {
            if is_allowed { /* proceed */ } else { /* shed load */ }
        }
        _ => {}
    }
  ---
  ```rust [main.rs]
  use std::sync::Arc;
  use trypema::{RateLimit, RateLimitDecision, RateLimiter};

  let rate = RateLimit::try_from(10.0).unwrap(); // 10 req/s

  // Absolute: allow or reject
  match rl.local().absolute().inc("user_123", &rate, 1) {
      RateLimitDecision::Allowed => { /* proceed */ }
      RateLimitDecision::Rejected { retry_after_ms, .. } => {
          eprintln!("retry in {retry_after_ms}ms");
      }
      _ => {}
  }

  // Suppressed: smooth degradation
  match rl.local().suppressed().inc("user_123", &rate, 1) {
      RateLimitDecision::Allowed => { /* proceed */ }
      RateLimitDecision::Suppressed { is_allowed, .. } => {
          if is_allowed { /* proceed */ } else { /* shed load */ }
      }
      _ => {}
  }
  ```
  :::
  ::
::

::u-page-section
#title
Three providers, one API

#description
Choose the backend that fits your deployment. The API is the same across all three.

#features
  :::u-page-feature
  ---
  icon: i-lucide-cpu
  ---
  #title
  Local
  #description
  In-process `DashMap` + atomics. **Sub-microsecond** latency. No external dependencies. Ideal for single-server APIs and CLI tools.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-database
  ---
  #title
  Redis
  #description
  Atomic Lua scripts against Redis 6.2+. One network round-trip per call. **Distributed** rate limits across processes and servers.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-arrow-left-right
  ---
  #title
  Hybrid
  #description
  Local fast-path with periodic Redis sync. **Sub-microsecond** admission latency with distributed consistency. Best for high-throughput APIs.
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
Choose strict enforcement or probabilistic suppression depending on your traffic pattern.

#features
  :::u-page-feature
  ---
  icon: i-lucide-shield
  ---
  #title
  Absolute
  #description
  Deterministic sliding-window enforcement. Requests under capacity are **Allowed**, requests over it are **Rejected** with backoff hints (`retry_after_ms`). Simple and predictable.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-activity
  ---
  #title
  Suppressed
  #description
  Probabilistic degradation inspired by [Ably](https://ably.com/blog/distributed-rate-limiting-scale-your-platform). Near capacity, an increasing fraction of requests are denied rather than all at once. The **suppression factor** (0.0 to 1.0) tells you exactly how close a key is to its limit.
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
#title
Built for production

#features
  :::u-page-feature
  ---
  icon: i-lucide-gauge
  ---
  #title
  Fractional rates
  #description
  Support for `f64` rate limits like **0.5 req/s** (one request every 2 seconds) or **5.5 req/s**. Sliding windows avoid fixed-window boundary resets.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-brush
  ---
  #title
  Background cleanup
  #description
  Automatic stale-key eviction via a background loop that holds only a `Weak` reference — no leak risk, no manual teardown.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-lock
  ---
  #title
  Thread-safe
  #description
  Designed for `Arc<RateLimiter>`. `DashMap` shard-level locking and atomic counters. Safe for concurrent use without external synchronisation.
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
  title: Ready to start?
  description: Pick a provider, choose a strategy, and ship with confidence.
  class: dark:bg-neutral-950
  ---
  :::
::
