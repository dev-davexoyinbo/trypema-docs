<script setup lang="ts">
type Topic = keyof typeof visuals;

const props = defineProps<{
  topic: Topic
}>();

const visuals = {
  providers: {
    src: "/media/provider-topologies.webp",
    alt: "Three paper-craft rate-limiter topologies showing local state, direct shared Redis state, and local state synchronized to Redis.",
    caption: "Local keeps state in one process; Redis centralizes every call; hybrid periodically synchronizes local state to Redis.",
  },
  sliding: {
    src: "/media/sliding-window.webp",
    alt: "A paper timeline with request buckets inside a moving rectangular window and one expired bucket outside its left edge.",
    caption: "Only buckets inside the moving window contribute to the live total; older buckets expire as time advances.",
  },
  suppression: {
    src: "/media/probabilistic-suppression.webp",
    alt: "Dense paper request cards reach a gate where some continue to a service while excess cards are progressively diverted into a side channel.",
    caption: "Rising pressure increases the share of traffic shed instead of creating one abrupt cutoff.",
  },
  conditional: {
    src: "/media/conditional-updates.webp",
    alt: "A comparison gate branches into a replacement history stack and an ordered history-preservation path.",
    caption: "Conditional writes change state only after a comparator matches, then replace history or preserve one side of it.",
  },
  cleanup: {
    src: "/media/state-cleanup.webp",
    alt: "Live key cards remain active while faded stale cards are selected by a periodic cleanup sweep.",
    caption: "Lazy expiry keeps reads current; the optional background loop removes inactive state over time.",
  },
  benchmarks: {
    src: "/media/benchmark-measurements.webp",
    alt: "Three provider modules feed matched requests into paper instruments measuring throughput, latency, and hot-key contention.",
    caption: "Meaningful comparisons hold the workload constant and measure more than peak operations per second.",
  },
  migration: {
    src: "/media/v2-migration.webp",
    alt: "One bundled rate-limiter facade passes through validated building blocks and becomes three independent provider modules.",
    caption: "v2 replaces the facade with independently constructed providers and semantic configuration types.",
  },
} as const;

const visual = computed(() => visuals[props.topic]);
</script>

<template>
  <MediaFigure v-bind="visual" />
</template>
