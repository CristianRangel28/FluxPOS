<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BaseCard from '../components/BaseCard.vue'
import PageHeader from '../components/PageHeader.vue'
</script>

<template>
  <div>
    <PageHeader
      title="Ruta no encontrada"
      subtitle="La dirección solicitada no forma parte de las rutas actuales."
    />

    <BaseCard>
      <p>Verifica la URL o regresa a la pantalla inicial.</p>
      <div class="actions">
        <RouterLink class="btn btn-primary" to="/login">Ir a Login</RouterLink>
      </div>
    </BaseCard>
  </div>
</template>

<style scoped>
.actions {
  margin-top: 1rem;
}
</style>
