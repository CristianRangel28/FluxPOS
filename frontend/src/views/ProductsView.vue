<script setup>
import { computed, ref } from 'vue'
import AppLayout from '../components/AppLayout.vue'
import PageHeader from '../components/PageHeader.vue'
import SlidePanel from '../components/SlidePanel.vue'
import { products, categories, money, stockStatus } from '../data/mock'

const search = ref('')
const category = ref('Todas')
const panelOpen = ref(false)
const editing = ref(null)
const form = ref({ name: '', category: '', cost: '', price: '', description: '' })

const filtered = computed(() =>
  products.filter((p) =>
    p.name.toLowerCase().includes(search.value.toLowerCase()) &&
    (category.value === 'Todas' || p.category === category.value)))

function openNew() {
  editing.value = null
  form.value = { name: '', category: '', cost: '', price: '', description: '' }
  panelOpen.value = true
}
function openEdit(p) {
  editing.value = p
  form.value = { name: p.name, category: p.category, cost: p.cost, price: p.price, description: '' }
  panelOpen.value = true
}
// Validación visual de HU-04: obligatorios y precios no negativos.
const errors = computed(() => ({
  name: !form.value.name.trim(),
  category: !form.value.category,
  cost: form.value.cost === '' || Number(form.value.cost) < 0,
  price: form.value.price === '' || Number(form.value.price) < 0,
}))
const invalid = computed(() => Object.values(errors.value).some(Boolean))
const submitted = ref(false)
function save() {
  submitted.value = true
  if (invalid.value) return
  submitted.value = false
  panelOpen.value = false // Mockup: aquí se llamará POST/PUT /api/products
}
</script>

<template>
  <AppLayout title="Productos">
    <PageHeader title="Catálogo de productos" subtitle="Administra los artículos, categorías y precios de tu tienda.">
      <button class="ghost-button">Categorías</button>
      <button class="primary-button" @click="openNew">＋ Nuevo producto</button>
    </PageHeader>

    <section class="panel">
      <div class="toolbar">
        <input v-model="search" class="search-input" type="search" placeholder="Buscar producto por nombre…" aria-label="Buscar producto" />
        <div class="chips">
          <button v-for="c in ['Todas', ...categories.map((c) => c.name)]" :key="c" class="chip" :class="{ on: category === c }" @click="category = c">{{ c }}</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>PRODUCTO</th><th>CATEGORÍA</th><th>COSTO</th><th>PRECIO VENTA</th><th>MARGEN</th><th>STOCK</th><th>ESTADO</th><th></th></tr></thead>
          <tbody>
            <tr v-for="p in filtered" :key="p.id">
              <td class="ref">{{ p.name }}</td>
              <td><span class="tag">{{ p.category }}</span></td>
              <td class="muted">{{ money(p.cost) }}</td>
              <td class="amount">{{ money(p.price) }}</td>
              <td class="muted">{{ Math.round(((p.price - p.cost) / p.price) * 100) }}%</td>
              <td>{{ p.stock }}</td>
              <td><span class="status" :class="stockStatus(p).tone">{{ stockStatus(p).label }}</span></td>
              <td><button class="row-action" @click="openEdit(p)">Editar</button></td>
            </tr>
            <tr v-if="!filtered.length"><td colspan="8" class="empty">No hay productos que coincidan con la búsqueda.</td></tr>
          </tbody>
        </table>
      </div>
      <p class="table-foot">Mostrando {{ filtered.length }} de {{ products.length }} productos</p>
    </section>

    <SlidePanel :open="panelOpen" :title="editing ? 'Editar producto' : 'Nuevo producto'" subtitle="Los campos con * son obligatorios." @close="panelOpen = false">
      <div class="field" :class="{ bad: submitted && errors.name }"><label>Nombre *</label><input v-model="form.name" placeholder="Ej. Gaseosa cola 1.5 L" /><small>Ingresa el nombre del producto.</small></div>
      <div class="field" :class="{ bad: submitted && errors.category }"><label>Categoría *</label>
        <select v-model="form.category"><option value="" disabled>Selecciona una categoría</option><option v-for="c in categories" :key="c.id">{{ c.name }}</option></select><small>Selecciona una categoría.</small></div>
      <div class="field-row">
        <div class="field" :class="{ bad: submitted && errors.cost }"><label>Precio de costo *</label><input v-model="form.cost" type="number" min="0" placeholder="0" /><small>Debe ser un valor no negativo.</small></div>
        <div class="field" :class="{ bad: submitted && errors.price }"><label>Precio de venta *</label><input v-model="form.price" type="number" min="0" placeholder="0" /><small>Debe ser un valor no negativo.</small></div>
      </div>
      <div class="field"><label>Descripción</label><textarea v-model="form.description" rows="3" placeholder="Detalles opcionales del producto"></textarea></div>
      <template #footer>
        <button class="ghost-button" @click="panelOpen = false">Cancelar</button>
        <button class="primary-button" @click="save">{{ editing ? 'Guardar cambios' : 'Registrar producto' }}</button>
      </template>
    </SlidePanel>
  </AppLayout>
</template>
