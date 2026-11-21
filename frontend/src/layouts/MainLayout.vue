<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="layout-shell">
    <header class="topbar">
      <div class="topbar-inner">
        <div class="brand-group">
          <span class="brand-badge">POS</span>
          <span class="brand-name">FluxPOS</span>
        </div>

        <nav class="main-nav" aria-label="Navegación principal">
          <RouterLink class="nav-link" to="/login">Login</RouterLink>
          <RouterLink class="nav-link" to="/dashboard">Dashboard</RouterLink>
        </nav>
      </div>
    </header>

    <main class="main-container">
      <RouterView />
    </main>

    <footer class="footer">
      <div class="footer-inner">
        <span>FluxPOS — Sistema de Punto de Venta</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.layout-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.topbar {
  background-color: var(--bg-surface);
  border-bottom: 1px solid var(--border-subtle);
  position: sticky;
  top: 0;
  z-index: 10;
}

.topbar-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0.85rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand-group {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.brand-badge {
  background-color: var(--accent-primary);
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  letter-spacing: 0.04em;
}

.brand-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link {
  padding: 0.45rem 0.85rem;
  border-radius: var(--radius-sm);
  font-size: 0.925rem;
  font-weight: 500;
  text-decoration: none;
  color: var(--text-secondary);
  transition: background-color 0.15s ease, color 0.15s ease;
}

.nav-link:hover {
  background-color: var(--bg-app);
  color: var(--text-primary);
}

.nav-link.router-link-active {
  background-color: #eff6ff;
  color: var(--accent-primary);
  font-weight: 600;
}

.main-container {
  flex: 1;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 1.75rem 1.25rem;
}

.footer {
  border-top: 1px solid var(--border-subtle);
  background-color: var(--bg-surface);
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.footer-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0.9rem 1.25rem;
}
</style>
