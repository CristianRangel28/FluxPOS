<script setup>
defineProps({ title: { type: String, default: 'Resumen general' } })
</script>
<template>
  <header class="topbar">
    <div><p class="eyebrow">PANEL DE CONTROL</p><h1>{{ title }}</h1></div>
    <div class="top-actions"><button class="icon-button" aria-label="Notificaciones">♧</button><div class="avatar">AD</div></div>
  </header>
</template>
