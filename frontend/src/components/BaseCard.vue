<script setup lang="ts">
defineProps<{
  padded?: boolean
}>()
</script>

<template>
  <section class="base-card" :class="{ 'is-padded': padded !== false }">
    <slot />
  </section>
</template>

<style scoped>
.base-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.base-card.is-padded {
  padding: 1.5rem;
}
</style>
