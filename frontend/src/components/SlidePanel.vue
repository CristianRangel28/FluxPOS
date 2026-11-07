<script setup>
defineProps({ open: Boolean, title: String, subtitle: String })
defineEmits(['close'])
</script>

<template>
  <div v-if="open" class="drawer-backdrop" @click.self="$emit('close')">
    <aside class="drawer" role="dialog" aria-modal="true" :aria-label="title">
      <header class="drawer-head">
        <div><h3>{{ title }}</h3><p>{{ subtitle }}</p></div>
        <button class="icon-button" aria-label="Cerrar" @click="$emit('close')">✕</button>
      </header>
      <div class="drawer-body"><slot /></div>
      <footer class="drawer-foot"><slot name="footer" /></footer>
    </aside>
  </div>
</template>
