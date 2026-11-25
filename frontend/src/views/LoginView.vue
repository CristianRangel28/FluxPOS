<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login, loading, authError, clearAuthError } = useAuth()

const username = ref('')
const password = ref('')

function handleFieldInput() {
  if (authError.value) {
    clearAuthError()
  }
}

async function handleSubmit() {
  const result = await login(username.value, password.value)
  if (result.ok) {
    await router.push(result.redirectTo)
  }
}
</script>

<template>
  <div class="login">
    <aside class="login-side" aria-label="Información de roles de FluxPOS">
      <div class="brand">
        <i class="mark" aria-hidden="true"></i>
        <span>fluxPOS</span>
      </div>

      <p class="lead">
        Punto de venta, caja e inventario para tiendas locales. Rápido, claro y en tu idioma.
      </p>

      <div class="roles">
        <div class="role admin">
          <b>Administrador</b>
          <span>Catálogo, compras, clientes, reportes y configuración.</span>
        </div>
        <div class="role seller">
          <b>Vendedor</b>
          <span>Solo caja, ventas y consulta rápida de stock.</span>
        </div>
      </div>

      <small class="foot">v1.0 · Interfaz de trabajo para equipo y gerencia</small>
    </aside>

    <main class="login-main">
      <form class="login-box" novalidate @submit.prevent="handleSubmit">
        <h1>Iniciar sesión</h1>
        <p class="sub">Usa tu cuenta asignada para abrir tu espacio de trabajo.</p>

        <div v-if="authError" class="toast bad" role="alert" aria-live="assertive">
          {{ authError }}
        </div>

        <div class="field">
          <label for="login-username">Usuario</label>
          <input
            id="login-username"
            v-model="username"
            type="text"
            autocomplete="username"
            placeholder="Ej. admin o vendedor1"
            :disabled="loading"
            @input="handleFieldInput"
          />
        </div>

        <div class="field">
          <label for="login-password">Contraseña</label>
          <input
            id="login-password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            placeholder="••••••••"
            :disabled="loading"
            @input="handleFieldInput"
          />
        </div>

        <button type="submit" class="btn lg" :disabled="loading">
          {{ loading ? 'Ingresando...' : 'Entrar' }}
        </button>
      </form>
    </main>
  </div>
</template>

<style scoped>
.login {
  min-height: 100dvh;
  display: grid;
  grid-template-columns: minmax(280px, 420px) 1fr;
}

.login-side {
  background: var(--ink, #0b0e1c);
  color: #fff;
  padding: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: -0.02em;
}

.mark {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  background: var(--accent, #2458e8);
  display: inline-block;
}

.lead {
  margin: 0;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.5;
  font-size: 0.98rem;
}

.roles {
  display: grid;
  gap: 12px;
}

.role {
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: grid;
  gap: 4px;
}

.role b {
  font-size: 0.95rem;
}

.role span {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.4;
}

.role.admin {
  background: #151a3b;
}

.role.seller {
  background: #0a3f39;
}

.foot {
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.8rem;
}

.login-main {
  display: grid;
  place-items: center;
  padding: 24px;
  background: var(--bg, #f7f7f5);
}

.login-box {
  width: 100%;
  max-width: 400px;
  background: var(--surface, #ffffff);
  border: 1px solid var(--line, #e5e7eb);
  border-radius: 16px;
  padding: 28px;
  display: grid;
  gap: 16px;
}

.login-box h1 {
  margin: 0;
  font-size: 1.5rem;
  letter-spacing: -0.02em;
}

.sub {
  margin: -8px 0 4px;
  color: var(--muted, #5f6672);
  font-size: 0.92rem;
}

.toast.bad {
  padding: 12px 14px;
  border-radius: 10px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
  font-size: 0.88rem;
  line-height: 1.4;
}

.field {
  display: grid;
  gap: 6px;
}

.field label {
  font-size: 0.88rem;
  font-weight: 600;
}

.field input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--line-strong, #cbd5e1);
  font-size: 0.95rem;
  box-sizing: border-box;
}

.field input:focus {
  outline: 2px solid var(--accent, #2458e8);
  outline-offset: 1px;
}

.btn.lg {
  width: 100%;
  padding: 11px 16px;
  border-radius: 10px;
  border: 0;
  background: var(--accent, #2458e8);
  color: #fff;
  font-weight: 600;
  font-size: 0.96rem;
  cursor: pointer;
}

.btn.lg:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

@media (max-width: 820px) {
  .login {
    grid-template-columns: 1fr;
  }

  .login-side {
    gap: 16px;
  }
}
</style>
