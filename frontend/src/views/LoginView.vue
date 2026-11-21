<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="view-card">
    <h1>Inicio de sesión — FluxPOS</h1>
    <p>Vista inicial de acceso al sistema. Aquí se integrará el formulario de autenticación.</p>
    <RouterLink class="nav-btn" to="/dashboard">Ir al Dashboard</RouterLink>
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
