---
seo:
  title: Trypema - Sliding-Window Rate Limiting for Rust
  description: Local, Redis, and hybrid sliding-window rate limiting for Rust with absolute and probabilistic suppression strategies.
---

::u-page-hero{class="dark:bg-gradient-to-b from-neutral-900 to-neutral-950"}
---
orientation: horizontal
---
#top
:hero-background

#title
Sliding-window rate limiting, from one process to a fleet.

#description
Trypema gives Rust services independently built **local**, **Redis**, and **hybrid** providers.
Use binary admission or gradual probabilistic shedding without changing the underlying rate model.

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
    trypema = "2"
  ---
  ```toml [Cargo.toml]
  [dependencies]
  trypema = "2"
  ```
  :::

  :::prose-pre
  ---
  filename: main.rs
  code: |
    use trypema::{RateLimit, RateLimitDecision, RateLimiterBuilder};
    use trypema::local::LocalRateLimiterProvider;

    fn main() {
        let provider = LocalRateLimiterProvider::builder().build().unwrap();
        let rate = RateLimit::per_second_or_panic(10.0);

        match provider.absolute().inc("user_123", &rate, 1) {
            RateLimitDecision::Allowed => println!("allowed"),
            RateLimitDecision::Rejected { retry_after, .. } => {
                println!("retry in {retry_after:?}");
            }
            RateLimitDecision::Suppressed { .. } => unreachable!(),
        }
    }
  ---
  ```rust [main.rs]
  use trypema::{RateLimit, RateLimitDecision, RateLimiterBuilder};
  use trypema::local::LocalRateLimiterProvider;

  fn main() {
      let provider = LocalRateLimiterProvider::builder().build().unwrap();
      let rate = RateLimit::per_second_or_panic(10.0);

      match provider.absolute().inc("user_123", &rate, 1) {
          RateLimitDecision::Allowed => println!("allowed"),
          RateLimitDecision::Rejected { retry_after, .. } => {
              println!("retry in {retry_after:?}");
          }
          RateLimitDecision::Suppressed { .. } => unreachable!(),
      }
  }
  ```
  :::
  ::
::

::u-page-section
#title
Choose where state lives

#description
All providers expose absolute and suppressed limiters. The difference is latency, coordination,
and how current each instance's view can be.

#default
  :topic-figure{topic="providers"}

#features
  :::u-page-feature
  ---
  icon: i-lucide-cpu
  to: /providers/local
  ---
  #title
  Local
  #description
  Synchronous, in-process state and the lowest overhead. Limits apply independently to each process.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-database
  to: /providers/redis
  ---
  #title
  Redis
  #description
  Async shared state with Redis I/O on every call. Best when instances need the freshest remote view.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-arrow-left-right
  to: /providers/hybrid
  ---
  #title
  Hybrid
  #description
  Local admission with periodic Redis synchronization. Higher throughput, with bounded visibility lag.
  :::
::

::u-page-section
---
ui:
  features: 'lg:grid-cols-2'
---
#title
Choose how pressure is handled

#features
  :::u-page-feature
  ---
  icon: i-lucide-shield
  to: /strategies/absolute
  ---
  #title
  Absolute
  #description
  Each call is allowed or rejected. Rejections include best-effort timing and released-capacity hints.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-activity
  to: /strategies/suppressed
  ---
  #title
  Suppressed
  #description
  Denial probability rises with pressure, allowing gradual shedding instead of an abrupt cutoff.
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
#title
One explicit rate model

#description
A `RateLimit` is normalized per second. Multiplying it by `WindowSize` gives the live-window
capacity; `BucketSize` controls how nearby increments are grouped.

#features
  :::u-page-feature
  ---
  icon: i-lucide-timer
  to: /concepts/sliding-windows
  ---
  #title
  Live sliding windows
  #description
  Reads include only live buckets. Unknown keys return zero without creating state; expired history may be lazily evicted.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-pin
  to: /concepts/rate-limits
  ---
  #title
  Sticky capacity
  #description
  The first increment stores a key's computed capacity. Later increments keep it until a matched conditional update replaces it.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-git-compare-arrows
  to: /strategies/absolute
  ---
  #title
  Safe reconciliation
  #description
  Comparator-gated writes can replace history or preserve its newest or oldest side. A matched zero removes the key.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-box
  to: /concepts/configuration-types
  ---
  #title
  Validated configuration
  #description
  Semantic types make units and constraints explicit for windows, buckets, suppression, and hybrid synchronization.
  :::
::

::u-page-section
#title
Know the production boundaries

#features
  :::u-page-feature
  ---
  icon: i-lucide-users
  ---
  #title
  Best-effort concurrency
  #description
  Admission is not a strict cross-caller transaction. Concurrent callers can temporarily overshoot a limit.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-server
  ---
  #title
  Redis requirements
  #description
  Redis and hybrid require Redis 7.2+ and exactly one crate feature: `redis-tokio` or `redis-smol`.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-trash-2
  to: /guides/cleanup
  ---
  #title
  Automatic cleanup
  #description
  Builders start stale-state cleanup by default. It can be disabled or controlled with idempotent start and stop methods.
  :::
::

::u-page-section
#title
Go deeper

#features
  :::u-page-feature
  ---
  icon: i-lucide-rocket
  to: /getting-started
  ---
  #title
  Getting Started
  #description
  Install v2 and run local, Redis, or hybrid quickstarts.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-book-open
  to: /concepts/configuration-types
  ---
  #title
  Concepts
  #description
  Understand keys, rates, windows, configuration, and decisions.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-file-text
  to: /reference/api
  ---
  #title
  API Map
  #description
  Find providers, shared types, and core operations without reading generated API pages first.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-gauge
  to: /benchmarks/benchmark-results
  ---
  #title
  Benchmarks
  #description
  Compare providers using documented workloads, throughput, and tail latency.
  :::
::
