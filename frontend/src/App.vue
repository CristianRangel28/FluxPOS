<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <span class="brand">FluxPOS</span>
      <nav class="nav-links" aria-label="Navegación principal">
        <RouterLink class="link" to="/login">Login</RouterLink>
        <RouterLink class="link" to="/dashboard">Dashboard</RouterLink>
      </nav>
    </header>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  font-family: system-ui, -apple-system, sans-serif;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.brand {
  font-weight: 700;
  font-size: 1.1rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.link {
  text-decoration: none;
  color: #374151;
  font-weight: 500;
}

.link.router-link-active {
  color: #111827;
  text-decoration: underline;
}

.content {
  max-width: 960px;
  margin: 2rem auto;
  padding: 0 1rem;
}
</style>
