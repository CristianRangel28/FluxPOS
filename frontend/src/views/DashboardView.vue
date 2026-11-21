<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BaseCard from '../components/BaseCard.vue'
import PageHeader from '../components/PageHeader.vue'
</script>

<template>
  <div>
    <PageHeader
      title="Dashboard"
      subtitle="Estructura visual inicial para métricas, ventas, compras e inventario."
    >
      <template #actions>
        <RouterLink class="btn btn-secondary" to="/login">Volver a Login</RouterLink>
      </template>
    </PageHeader>

    <div class="grid-modules">
      <BaseCard>
        <h2 class="card-title">Módulos operativos</h2>
        <p class="card-copy">
          Contenedor listo para integrar tablas, formularios y paneles de gestión.
        </p>
      </BaseCard>

      <BaseCard>
        <h2 class="card-title">Identidad visual</h2>
        <p class="card-copy">
          Variables y componentes compartidos activos para mantener consistencia en toda la app.
        </p>
      </BaseCard>
    </div>
  </div>
</template>

<style scoped>
.grid-modules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.card-title {
  margin: 0 0 0.4rem;
  font-size: 1.05rem;
  font-weight: 600;
}

.card-copy {
  margin: 0;
  color: var(--text-secondary);
}
</style>
