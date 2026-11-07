<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const email = ref('admin@fluxpos.com')
const password = ref('')
function login() { router.push('/dashboard') }
</script>
<template>
  <main class="login-page"><section class="login-card"><div class="brand login-brand"><span class="brand-mark">F</span><span>Flux<span class="brand-light">POS</span></span></div><p class="eyebrow">BIENVENIDO DE NUEVO</p><h1>Inicia sesión</h1><p class="login-subtitle">Ingresa tus datos para acceder al panel de tu negocio.</p><form @submit.prevent="login"><label>Correo electrónico</label><input v-model="email" type="email" placeholder="tu@correo.com" required /><label>Contraseña</label><input v-model="password" type="password" placeholder="••••••••" required /><div class="form-extra"><label class="remember"><input type="checkbox" /> Recordarme</label><a href="#" @click.prevent>¿Olvidaste tu contraseña?</a></div><button class="primary-button login-button" type="submit">Ingresar al sistema →</button></form><p class="login-note">Acceso de demostración · La autenticación se conectará al backend.</p></section><div class="login-decoration"><div class="deco-orb orb-one"></div><div class="deco-orb orb-two"></div><div class="deco-copy"><span>CONTROL TOTAL DE TU NEGOCIO</span><h2>Todo tu negocio,<br/>en un solo lugar.</h2><p>Administra ventas, inventario y clientes de forma simple e inteligente.</p></div></div></main>
</template>
