<script setup>
import { computed, ref } from 'vue'
import AppLayout from '../components/AppLayout.vue'
import PageHeader from '../components/PageHeader.vue'
import SlidePanel from '../components/SlidePanel.vue'
import { purchases, suppliers, products, money } from '../data/mock'

const panelOpen = ref(false)
const supplier = ref('')
const items = ref([{ product: '', qty: 1, cost: 0 }])
const total = computed(() => items.value.reduce((s, i) => s + Number(i.qty) * Number(i.cost), 0))
const canSave = computed(() => supplier.value && items.value.every((i) => i.product && Number(i.qty) > 0 && Number(i.cost) >= 0))
function addLine() { items.value.push({ product: '', qty: 1, cost: 0 }) }
function removeLine(i) { if (items.value.length > 1) items.value.splice(i, 1) }
</script>

<template>
  <AppLayout title="Compras">
    <PageHeader title="Compras a proveedores" subtitle="Registra compras; las existencias se actualizan al confirmarlas.">
      <button class="primary-button" @click="panelOpen = true">＋ Nueva compra</button>
    </PageHeader>
    <section class="panel">
      <div class="table-wrap">
        <table>
          <thead><tr><th>REFERENCIA</th><th>PROVEEDOR</th><th>FECHA</th><th>UNIDADES</th><th>TOTAL</th><th>ESTADO</th></tr></thead>
          <tbody>
            <tr v-for="p in purchases" :key="p.number">
              <td class="ref">#{{ p.number }}</td><td>{{ p.supplier }}</td><td class="muted">{{ p.date }}</td><td>{{ p.items }}</td><td class="amount">{{ money(p.total) }}</td>
              <td><span class="status done">Confirmada</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <SlidePanel :open="panelOpen" title="Nueva compra" subtitle="Selecciona proveedor y productos." @close="panelOpen = false">
      <div class="field"><label>Proveedor *</label><select v-model="supplier"><option value="" disabled>Selecciona un proveedor</option><option v-for="s in suppliers" :key="s.id">{{ s.name }}</option></select></div>
      <div v-for="(l, i) in items" :key="i" class="line-form">
        <select v-model="l.product" aria-label="Producto"><option value="" disabled>Producto</option><option v-for="p in products" :key="p.id">{{ p.name }}</option></select>
        <input v-model="l.qty" type="number" min="1" aria-label="Cantidad" />
        <input v-model="l.cost" type="number" min="0" aria-label="Costo unitario" />
        <button class="row-action" aria-label="Quitar línea" @click="removeLine(i)">✕</button>
      </div>
      <button class="ghost-button" @click="addLine">＋ Agregar producto</button>
      <div class="total-row"><span>Total</span><strong>{{ money(total) }}</strong></div>
      <template #footer><button class="ghost-button" @click="panelOpen = false">Cancelar</button><button class="primary-button" :disabled="!canSave" @click="panelOpen = false">Confirmar compra</button></template>
    </SlidePanel>
  </AppLayout>
</template>
