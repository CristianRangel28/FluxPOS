<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <header class="page-header">
    <div>
      <h1 class="page-title">{{ title }}</h1>
      <p v-if="subtitle" class="page-subtitle">{{ subtitle }}</p>
    </div>
    <div v-if="$slots.actions" class="page-actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<style scoped>
.page-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.page-title {
  margin: 0;
  font-size: 1.45rem;
  font-weight: 700;
  color: var(--text-primary);
}

.page-subtitle {
  margin: 0.25rem 0 0;
  font-size: 0.95rem;
  color: var(--text-secondary);
}

.page-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
