<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BaseCard from '../components/BaseCard.vue'
import PageHeader from '../components/PageHeader.vue'
</script>

<template>
  <div>
    <PageHeader
      title="Inicio de sesión"
      subtitle="Acceso base al sistema FluxPOS. Preparado para integrar autenticación."
    />

    <BaseCard>
      <p>
        Aquí se incorporará el formulario de credenciales y validación de sesión en los siguientes módulos.
      </p>
      <div class="actions">
        <RouterLink class="btn btn-primary" to="/dashboard">Ir al Dashboard</RouterLink>
      </div>
    </BaseCard>
  </div>
</template>

<style scoped>
.actions {
  margin-top: 1rem;
}
</style>
