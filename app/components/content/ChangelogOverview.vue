<script setup lang="ts">
const { data: versions } = await useAsyncData("changelog-versions", () =>
  queryCollection("docs")
    .where("path", "LIKE", "/changelog/%")
    .order("date", "DESC")
    .all(),
);
</script>

<template>
  <UChangelogVersions :indicator-motion="true">
    <UChangelogVersion
      v-for="version in versions"
      :key="version.path"
      :title="version.title"
      :description="version.description"
      :date="version.date"
      :badge="version.badge"
      :authors="version.authors"
      :to="version.path"
    />
  </UChangelogVersions>
</template>
