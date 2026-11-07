<script setup>
import Sidebar from './Sidebar.vue'
import Topbar from './Topbar.vue'
defineProps({ title: { type: String, default: 'Resumen general' } })
</script>

<template>
  <div class="app-shell">
    <Sidebar />
    <main class="main-content">
      <Topbar :title="title" />
      <slot />
      <footer class="footer">© 2026 FluxPOS · Gestión inteligente para tu negocio</footer>
    </main>
  </div>
</template>
