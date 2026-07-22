<script setup lang="ts">
defineProps<{
  src: string
  alt: string
  caption?: string
}>();
</script>

<template>
  <figure class="my-8 overflow-hidden rounded-xl border border-default bg-muted/40">
    <img
      :src="src"
      :alt="alt"
      width="1536"
      height="1024"
      loading="lazy"
      decoding="async"
      class="block h-auto w-full"
    >
    <figcaption
      v-if="caption"
      class="border-t border-default px-4 py-3 text-sm text-muted"
    >
      {{ caption }}
    </figcaption>
  </figure>
</template>
