<script setup>
import { computed, ref } from 'vue'
import AppLayout from '../components/AppLayout.vue'
import PageHeader from '../components/PageHeader.vue'
import SlidePanel from '../components/SlidePanel.vue'
import { products, customers, sales, saleDetail, money } from '../data/mock'

const tab = ref('new')
const search = ref('')
const customer = ref('Cliente general')
const payment = ref('Efectivo')
const cart = ref([{ id: 1, qty: 2 }, { id: 4, qty: 1 }])
const detailOpen = ref(false)
const done = ref(false)

const catalog = computed(() => products.filter((p) => p.name.toLowerCase().includes(search.value.toLowerCase())))
const lines = computed(() => cart.value.map((l) => ({ ...products.find((p) => p.id === l.id), qty: l.qty })))
const total = computed(() => lines.value.reduce((s, l) => s + l.price * l.qty, 0))
const stockError = computed(() => lines.value.some((l) => l.qty > l.stock))

function add(p) {
  if (p.stock === 0) return
  const line = cart.value.find((l) => l.id === p.id)
  line ? line.qty++ : cart.value.push({ id: p.id, qty: 1 })
}
function setQty(l, delta) {
  const line = cart.value.find((x) => x.id === l.id)
  line.qty = Math.max(1, line.qty + delta)
}
function remove(l) { cart.value = cart.value.filter((x) => x.id !== l.id) }
function confirm() {
  if (!cart.value.length || stockError.value) return
  done.value = true // Mockup: aquí se llamará POST /api/sales
  setTimeout(() => { done.value = false; cart.value = [] }, 1800)
}
const detailTotal = saleDetail.lines.reduce((s, l) => s + l.qty * l.unit, 0)
</script>

<template>
  <AppLayout title="Ventas">
    <PageHeader title="Ventas" subtitle="Registra ventas y consulta el historial de operaciones.">
      <div class="tabs"><button :class="{ on: tab === 'new' }" @click="tab = 'new'">Nueva venta</button><button :class="{ on: tab === 'history' }" @click="tab = 'history'">Historial</button></div>
    </PageHeader>

    <section v-if="tab === 'new'" class="pos-grid">
      <article class="panel">
        <input v-model="search" class="search-input wide" type="search" placeholder="Buscar producto para agregar…" aria-label="Buscar producto" />
        <div class="product-grid">
          <button v-for="p in catalog" :key="p.id" class="product-tile" :class="{ out: p.stock === 0 }" :disabled="p.stock === 0" @click="add(p)">
            <span class="tag">{{ p.category }}</span><b>{{ p.name }}</b>
            <span class="tile-bottom"><span class="amount">{{ money(p.price) }}</span><small>{{ p.stock === 0 ? 'Agotado' : p.stock + ' u.' }}</small></span>
          </button>
        </div>
      </article>

      <aside class="panel cart">
        <div class="panel-heading"><div><h3>Detalle de la venta</h3><p>Vendedor: Administrador</p></div></div>
        <div class="field"><label>Cliente</label><select v-model="customer"><option v-for="c in customers" :key="c.id">{{ c.name }}</option></select></div>
        <ul class="cart-lines">
          <li v-for="l in lines" :key="l.id" :class="{ bad: l.qty > l.stock }">
            <div class="cart-name"><b>{{ l.name }}</b><small>{{ money(l.price) }} c/u<template v-if="l.qty > l.stock"> · Solo hay {{ l.stock }} en stock</template></small></div>
            <div class="qty"><button aria-label="Menos" @click="setQty(l, -1)">−</button><span>{{ l.qty }}</span><button aria-label="Más" @click="setQty(l, 1)">＋</button></div>
            <span class="amount line-total">{{ money(l.price * l.qty) }}</span>
            <button class="row-action" aria-label="Quitar" @click="remove(l)">✕</button>
          </li>
          <li v-if="!lines.length" class="empty">Agrega productos para iniciar la venta.</li>
        </ul>
        <div class="field"><label>Método de pago</label><div class="chips"><button v-for="m in ['Efectivo', 'Tarjeta', 'Transferencia']" :key="m" class="chip" :class="{ on: payment === m }" @click="payment = m">{{ m }}</button></div></div>
        <div class="total-row"><span>Total a pagar</span><strong>{{ money(total) }}</strong></div>
        <button class="primary-button block" :disabled="!lines.length || stockError" @click="confirm">{{ done ? '✓ Venta registrada' : 'Confirmar venta' }}</button>
      </aside>
    </section>

    <section v-else class="panel">
      <div class="table-wrap">
        <table>
          <thead><tr><th>REFERENCIA</th><th>CLIENTE</th><th>VENDEDOR</th><th>FECHA</th><th>ÍTEMS</th><th>TOTAL</th><th>ESTADO</th><th></th></tr></thead>
          <tbody>
            <tr v-for="s in sales" :key="s.number">
              <td class="ref">#{{ s.number }}</td><td>{{ s.customer }}</td><td class="muted">{{ s.seller }}</td><td class="muted">{{ s.date }}</td><td>{{ s.items }}</td><td class="amount">{{ money(s.total) }}</td>
              <td><span class="status" :class="s.status === 'completed' ? 'done' : 'danger'">{{ s.status === 'completed' ? 'Completada' : 'Anulada' }}</span></td>
              <td><button class="row-action" @click="detailOpen = true">Ver detalle</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <SlidePanel :open="detailOpen" :title="'Venta #' + saleDetail.number" :subtitle="'Pago: ' + saleDetail.payment" @close="detailOpen = false">
      <table class="mini-table">
        <thead><tr><th>PRODUCTO</th><th>CANT.</th><th>UNITARIO</th><th>SUBTOTAL</th></tr></thead>
        <tbody><tr v-for="l in saleDetail.lines" :key="l.product"><td>{{ l.product }}</td><td>{{ l.qty }}</td><td>{{ money(l.unit) }}</td><td class="amount">{{ money(l.qty * l.unit) }}</td></tr></tbody>
      </table>
      <div class="total-row"><span>Total</span><strong>{{ money(detailTotal) }}</strong></div>
      <template #footer>
        <button class="ghost-button danger-text">Anular venta</button>
        <button class="primary-button" @click="detailOpen = false">Cerrar</button>
      </template>
    </SlidePanel>
  </AppLayout>
</template>
