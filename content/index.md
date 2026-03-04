---
seo:
  title: Trypema - Distributed Rate Limiting for Rust
  description: High-performance, ergonomic primitives for local, Redis-backed, and hybrid rate limiting.
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
    cargo add trypema --features redis-tokio
  ---
  ```bash
  cargo add trypema --features redis-tokio
  ```
  :::

  :::prose-pre
  ---
  filename: main.rs
  code: |
    use trypema::{RateLimit, RateLimitDecision};
    use trypema::redis::RedisKey;

    // `rl`: a shared `RateLimiter` created once at startup
    let rate = RateLimit::try_from(10.0).unwrap();

    // Local (sync, in-process)
    if matches!(rl.local().absolute().inc("user_123", &rate, 1), RateLimitDecision::Allowed) {
        // proceed
    }

    // Redis (async, distributed)
    let key = RedisKey::try_from("user_123".to_string()).unwrap();
    if matches!(rl.redis().absolute().inc(&key, &rate, 1).await.unwrap(), RateLimitDecision::Allowed) {
        // proceed
    }
  ---
  ```rust [main.rs]
  use trypema::{RateLimit, RateLimitDecision};
  use trypema::redis::RedisKey;

  // `rl`: a shared `RateLimiter` created once at startup
  let rate = RateLimit::try_from(10.0).unwrap();

  // Local (sync, in-process)
  if matches!(rl.local().absolute().inc("user_123", &rate, 1), RateLimitDecision::Allowed) {
      // proceed
  }

  // Redis (async, distributed)
  let key = RedisKey::try_from("user_123".to_string()).unwrap();
  if matches!(rl.redis().absolute().inc(&key, &rate, 1).await.unwrap(), RateLimitDecision::Allowed) {
      // proceed
  }
  ```
  :::
  ::
::

::u-page-section{class="dark:bg-neutral-950"}
#title
Why Trypema?

#features
  :::u-page-feature
  ---
  icon: i-lucide-arrow-left-right
  ---
  #title
  Hybrid Architecture
  #description
  Seamlessly switch between **Local** (in-process RAM) for microsecond latency and **Redis** for distributed consistency.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-zap
  ---
  #title
  Async & Atomic
  #description
  Built for **Tokio**. Redis operations use atomic Lua scripts to prevent race conditions in distributed environments.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-scale
  ---
  #title
  Fractional Rates
  #description
  Define limits with precision. Support for `f64` rates like **0.5 req/s** (1 request every 2 seconds).
  :::
::

::u-page-section
---
ui:
  features: 'lg:grid-cols-2'
---
#title
Strategies

#description
Choose the enforcement strategy that fits your traffic pattern.

#features
  :::u-page-feature
  ---
  icon: i-lucide-shield-alert
  ---
  #title
  Absolute Strategy
  #description
  Standard rate limiting. Requests are either **Allowed** or **Rejected** (with a `retry_after` duration). Best for strict API quotas.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-activity
  ---
  #title
  Suppressed Strategy
  #description
  Graceful degradation. Instead of hard rejections, returns a **Suppressed** signal near capacity to trigger load shedding or cheaper fallback logic.
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
  title: Ready to ship?
  description: Pick local or Redis, choose your strategy, and handle load with confidence.
  class: dark:bg-neutral-950
  ---
  
  :stars-bg
  :::
::
