<script setup>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const links = [
  { label: 'Resumen', path: '/dashboard', icon: '▦' },
  { label: 'Productos', path: '/productos', icon: '□' },
  { label: 'Inventario', path: '/inventario', icon: '▤' },
  { label: 'Ventas', path: '/ventas', icon: '$' },
  { label: 'Compras', path: '/compras', icon: '⇩' },
  { label: 'Clientes', path: '/clientes', icon: '♙' },
  { label: 'Proveedores', path: '/proveedores', icon: '◇' },
]
// HU-03: en el mockup solo vuelve al login; la sesión real se invalidará con el backend.
function logout() { router.push('/login') }
</script>

<template>
  <aside class="sidebar">
    <div class="brand"><span class="brand-mark">F</span><span>Flux<span class="brand-light">POS</span></span></div>
    <p class="nav-caption">MENÚ PRINCIPAL</p>
    <nav>
      <RouterLink v-for="link in links" :key="link.path" :to="link.path"
        class="nav-link" :class="{ active: route.path === link.path }">
        <span class="nav-icon">{{ link.icon }}</span>{{ link.label }}
      </RouterLink>
    </nav>
    <div class="sidebar-bottom">
      <div class="help-card"><strong>¿Necesitas ayuda?</strong><span>Consulta la guía de FluxPOS</span></div>
      <div class="user-mini"><div class="avatar">AD</div><div><strong>Administrador</strong><small> admin@fluxpos.com</small></div></div>
      <button class="logout-button" @click="logout">⎋ Cerrar sesión</button>
    </div>
  </aside>
</template>
