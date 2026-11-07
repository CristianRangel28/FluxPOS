<script setup>
import { computed, ref } from 'vue'
import AppLayout from '../components/AppLayout.vue'
import PageHeader from '../components/PageHeader.vue'
import SlidePanel from '../components/SlidePanel.vue'
import { customers, money } from '../data/mock'

const search = ref('')
const panelOpen = ref(false)
const form = ref({ name: '', document: '', phone: '', email: '' })
const rows = computed(() => customers.filter((c) => (c.name + c.document).toLowerCase().includes(search.value.toLowerCase())))
const initials = (n) => n.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
</script>

<template>
  <AppLayout title="Clientes">
    <PageHeader title="Clientes" subtitle="Consulta y registra a las personas que compran en tu tienda.">
      <button class="primary-button" @click="panelOpen = true">＋ Nuevo cliente</button>
    </PageHeader>
    <section class="panel">
      <div class="toolbar"><input v-model="search" class="search-input" type="search" placeholder="Buscar por nombre o documento…" aria-label="Buscar cliente" /></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>CLIENTE</th><th>DOCUMENTO</th><th>TELÉFONO</th><th>CORREO</th><th>COMPRAS</th><th>TOTAL COMPRADO</th></tr></thead>
          <tbody>
            <tr v-for="c in rows" :key="c.id">
              <td><div class="person"><span class="avatar">{{ initials(c.name) }}</span><b>{{ c.name }}</b></div></td>
              <td class="muted">{{ c.document }}</td><td>{{ c.phone }}</td><td class="muted">{{ c.email }}</td><td>{{ c.purchases }}</td><td class="amount">{{ money(c.total) }}</td>
            </tr>
            <tr v-if="!rows.length"><td colspan="6" class="empty">No se encontraron clientes.</td></tr>
          </tbody>
        </table>
      </div>
    </section>
    <SlidePanel :open="panelOpen" title="Nuevo cliente" subtitle="El documento no puede repetirse." @close="panelOpen = false">
      <div class="field"><label>Nombre *</label><input v-model="form.name" placeholder="Nombre completo" /></div>
      <div class="field"><label>Número de documento</label><input v-model="form.document" placeholder="Ej. 1.020.345.678" /></div>
      <div class="field-row"><div class="field"><label>Teléfono</label><input v-model="form.phone" placeholder="300 000 0000" /></div><div class="field"><label>Correo</label><input v-model="form.email" type="email" placeholder="correo@ejemplo.com" /></div></div>
      <template #footer><button class="ghost-button" @click="panelOpen = false">Cancelar</button><button class="primary-button" :disabled="!form.name.trim()" @click="panelOpen = false">Registrar cliente</button></template>
    </SlidePanel>
  </AppLayout>
</template>
