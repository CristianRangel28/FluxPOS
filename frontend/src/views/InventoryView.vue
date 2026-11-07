<script setup>
import { computed, ref } from 'vue'
import AppLayout from '../components/AppLayout.vue'
import PageHeader from '../components/PageHeader.vue'
import SlidePanel from '../components/SlidePanel.vue'
import { products, movements, stockStatus } from '../data/mock'

const tab = ref('stock')
const onlyAlerts = ref(false)
const panelOpen = ref(false)
const adjust = ref({ product: '', type: 'Entrada', qty: 1, reason: '' })

const rows = computed(() => products.filter((p) => !onlyAlerts.value || p.stock <= p.min))
const summary = computed(() => [
  { label: 'Unidades en stock', value: products.reduce((s, p) => s + p.stock, 0).toLocaleString('es-CO'), tone: 'blue', icon: '▤' },
  { label: 'Productos con stock bajo', value: products.filter((p) => p.stock > 0 && p.stock <= p.min).length, tone: 'orange', icon: '!' },
  { label: 'Productos agotados', value: products.filter((p) => p.stock === 0).length, tone: 'red', icon: '✕' },
])
const qtyInvalid = computed(() => !Number.isInteger(Number(adjust.value.qty)) || Number(adjust.value.qty) <= 0)
const canSave = computed(() => adjust.value.product && !qtyInvalid.value && adjust.value.reason.trim())
</script>

<template>
  <AppLayout title="Inventario">
    <PageHeader title="Control de inventario" subtitle="Consulta existencias y registra ajustes con trazabilidad.">
      <button class="primary-button" @click="panelOpen = true">＋ Registrar ajuste</button>
    </PageHeader>

    <section class="stats-grid three">
      <article v-for="s in summary" :key="s.label" class="stat-card">
        <div class="stat-top"><span>{{ s.label }}</span><span class="stat-icon" :class="s.tone">{{ s.icon }}</span></div>
        <strong class="stat-value">{{ s.value }}</strong>
      </article>
    </section>

    <section class="panel spaced">
      <div class="toolbar">
        <div class="tabs"><button :class="{ on: tab === 'stock' }" @click="tab = 'stock'">Existencias</button><button :class="{ on: tab === 'moves' }" @click="tab = 'moves'">Movimientos</button></div>
        <label v-if="tab === 'stock'" class="check"><input v-model="onlyAlerts" type="checkbox" /> Solo alertas de stock</label>
      </div>
      <div v-if="tab === 'stock'" class="table-wrap">
        <table>
          <thead><tr><th>PRODUCTO</th><th>CATEGORÍA</th><th>EXISTENCIAS</th><th>MÍNIMO</th><th>NIVEL</th><th>ESTADO</th></tr></thead>
          <tbody>
            <tr v-for="p in rows" :key="p.id">
              <td class="ref">{{ p.name }}</td><td><span class="tag">{{ p.category }}</span></td><td class="amount">{{ p.stock }}</td><td class="muted">{{ p.min }}</td>
              <td><div class="meter"><i :class="stockStatus(p).tone" :style="{ width: Math.min(100, (p.stock / (p.min * 3)) * 100) + '%' }"></i></div></td>
              <td><span class="status" :class="stockStatus(p).tone">{{ stockStatus(p).label }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="table-wrap">
        <table>
          <thead><tr><th>FECHA</th><th>PRODUCTO</th><th>TIPO</th><th>CANTIDAD</th><th>REFERENCIA / MOTIVO</th><th>USUARIO</th></tr></thead>
          <tbody>
            <tr v-for="(m, i) in movements" :key="i">
              <td class="muted">{{ m.date }}</td><td class="ref">{{ m.product }}</td><td><span class="tag">{{ m.type }}</span></td>
              <td class="amount" :class="m.qty > 0 ? 'pos' : 'neg'">{{ m.qty > 0 ? '+' : '' }}{{ m.qty }}</td><td>{{ m.ref }}</td><td class="muted">{{ m.user }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <SlidePanel :open="panelOpen" title="Ajuste de inventario" subtitle="Quedará registrado como movimiento." @close="panelOpen = false">
      <div class="field"><label>Producto *</label><select v-model="adjust.product"><option value="" disabled>Selecciona un producto</option><option v-for="p in products" :key="p.id">{{ p.name }}</option></select></div>
      <div class="field"><label>Tipo de ajuste</label><select v-model="adjust.type"><option>Entrada</option><option>Salida</option></select></div>
      <div class="field" :class="{ bad: qtyInvalid }"><label>Cantidad *</label><input v-model="adjust.qty" type="number" min="1" /><small>La cantidad debe ser un entero mayor que cero.</small></div>
      <div class="field"><label>Motivo *</label><textarea v-model="adjust.reason" rows="3" placeholder="Ej. Producto vencido, conteo físico…"></textarea></div>
      <template #footer>
        <button class="ghost-button" @click="panelOpen = false">Cancelar</button>
        <button class="primary-button" :disabled="!canSave" @click="panelOpen = false">Aplicar ajuste</button>
      </template>
    </SlidePanel>
  </AppLayout>
</template>
