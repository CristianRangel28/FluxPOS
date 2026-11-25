<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { user, role, homeRoute, logout } = useAuth()

const roleLabel = computed(() => {
  if (role.value === 'admin') return 'Administrador'
  if (role.value === 'seller') return 'Vendedor'
  return 'Invitado'
})

function goHome() {
  router.push(homeRoute.value)
}

function handleSwitchAccount() {
  logout()
  router.push('/login')
}
</script>

<template>
  <section class="forbidden-wrap" aria-labelledby="forbidden-title">
    <div class="empty">
      <div class="badge">403 · Acceso restringido</div>
      <h1 id="forbidden-title">No tienes permiso para esta acción</h1>
      <p class="desc">
        Tu rol actual (<strong>{{ roleLabel }}</strong><span v-if="user?.username"> · {{ user.username }}</span>)
        no incluye acceso a esta sección del sistema.
      </p>

      <div class="actions">
        <button type="button" class="btn primary" @click="goHome">
          Volver al inicio
        </button>
        <button type="button" class="btn secondary" @click="handleSwitchAccount">
          Cambiar de cuenta
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.forbidden-wrap {
  min-height: 75dvh;
  display: grid;
  place-items: center;
  padding: 24px;
}

.empty {
  max-width: 480px;
  width: 100%;
  background: var(--surface, #ffffff);
  border: 1px solid var(--line, #e5e7eb);
  border-radius: 16px;
  padding: 32px 28px;
  text-align: center;
  display: grid;
  gap: 14px;
}

.badge {
  justify-self: center;
  padding: 4px 10px;
  border-radius: 999px;
  background: #fef2f2;
  color: #991b1b;
  font-size: 0.78rem;
  font-weight: 700;
}

h1 {
  margin: 0;
  font-size: 1.4rem;
  letter-spacing: -0.02em;
}

.desc {
  margin: 0;
  color: var(--muted, #5f6672);
  font-size: 0.94rem;
  line-height: 1.5;
}

.actions {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.btn {
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.92rem;
  cursor: pointer;
}

.btn.primary {
  border: 0;
  background: var(--accent, #2458e8);
  color: #fff;
}

.btn.secondary {
  border: 1px solid var(--line-strong, #cbd5e1);
  background: transparent;
  color: var(--ink, #0b0e1c);
}
</style>
