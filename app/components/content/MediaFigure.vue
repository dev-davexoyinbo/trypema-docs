<script setup lang="ts">
defineProps<{
  src: string
  alt: string
  labels?: readonly string[]
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
      v-if="labels?.length || caption"
      class="border-t border-default px-4 py-3"
    >
      <ul
        v-if="labels?.length"
        class="grid gap-2 text-center text-xs font-semibold text-highlighted sm:text-sm"
        :style="{ gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))` }"
      >
        <li
          v-for="label in labels"
          :key="label"
          class="rounded-md bg-elevated px-2 py-1.5"
        >
          {{ label }}
        </li>
      </ul>
      <p
        v-if="caption"
        class="text-sm text-muted"
        :class="labels?.length ? 'mt-3' : ''"
      >
        {{ caption }}
      </p>
    </figcaption>
  </figure>
</template>
