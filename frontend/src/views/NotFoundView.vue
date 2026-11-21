<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="view-card">
    <h1>Ruta no encontrada</h1>
    <p>La ruta solicitada no existe dentro de FluxPOS.</p>
    <RouterLink class="nav-btn" to="/login">Ir a Login</RouterLink>
  </section>
</template>

<style scoped>
.view-card {
  padding: 1.5rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}

.nav-btn {
  display: inline-block;
  margin-top: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  background-color: #111827;
  color: #ffffff;
  text-decoration: none;
}
</style>
