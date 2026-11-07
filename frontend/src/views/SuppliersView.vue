<script setup>
import { ref } from 'vue'
import AppLayout from '../components/AppLayout.vue'
import PageHeader from '../components/PageHeader.vue'
import SlidePanel from '../components/SlidePanel.vue'
import { suppliers } from '../data/mock'

const panelOpen = ref(false)
const form = ref({ name: '', phone: '', email: '', address: '' })
</script>

<template>
  <AppLayout title="Proveedores">
    <PageHeader title="Proveedores" subtitle="Empresas que te abastecen de productos.">
      <button class="primary-button" @click="panelOpen = true">＋ Nuevo proveedor</button>
    </PageHeader>
    <section class="card-grid">
      <article v-for="s in suppliers" :key="s.id" class="panel supplier-card">
        <div class="supplier-top"><span class="quick-icon violet">◇</span><span class="tag">{{ s.products }} productos</span></div>
        <h3>{{ s.name }}</h3>
        <dl>
          <div><dt>Teléfono</dt><dd>{{ s.phone }}</dd></div>
          <div><dt>Correo</dt><dd>{{ s.email }}</dd></div>
          <div><dt>Dirección</dt><dd>{{ s.address }}</dd></div>
        </dl>
        <RouterLink to="/compras" class="text-link">Ver compras →</RouterLink>
      </article>
    </section>
    <SlidePanel :open="panelOpen" title="Nuevo proveedor" subtitle="Datos de contacto del proveedor." @close="panelOpen = false">
      <div class="field"><label>Nombre *</label><input v-model="form.name" placeholder="Razón social" /></div>
      <div class="field-row"><div class="field"><label>Teléfono</label><input v-model="form.phone" /></div><div class="field"><label>Correo</label><input v-model="form.email" type="email" /></div></div>
      <div class="field"><label>Dirección</label><input v-model="form.address" /></div>
      <template #footer><button class="ghost-button" @click="panelOpen = false">Cancelar</button><button class="primary-button" :disabled="!form.name.trim()" @click="panelOpen = false">Registrar proveedor</button></template>
    </SlidePanel>
  </AppLayout>
</template>
