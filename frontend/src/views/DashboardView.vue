<script setup>
import Sidebar from '../components/Sidebar.vue'
import Topbar from '../components/Topbar.vue'
const stats = [
  { label: 'Ventas del día', value: '$ 1.280.000', change: '+12,8%', icon: '$', tone: 'violet' },
  { label: 'Órdenes realizadas', value: '48', change: '+8,2%', icon: '▤', tone: 'blue' },
  { label: 'Productos activos', value: '256', change: '+4 nuevos', icon: '□', tone: 'orange' },
  { label: 'Clientes registrados', value: '1.024', change: '+5,4%', icon: '♙', tone: 'green' },
]
const recent = [
  { id: '#VTA-1048', customer: 'María Fernanda', date: 'Hoy, 10:42 a. m.', total: '$ 185.000', status: 'Completada' },
  { id: '#VTA-1047', customer: 'Andrés Gómez', date: 'Hoy, 10:18 a. m.', total: '$ 92.500', status: 'Completada' },
  { id: '#VTA-1046', customer: 'Laura Rodríguez', date: 'Hoy, 9:56 a. m.', total: '$ 240.000', status: 'Pendiente' },
  { id: '#VTA-1045', customer: 'Carlos Méndez', date: 'Hoy, 9:21 a. m.', total: '$ 67.000', status: 'Completada' },
]
</script>

<template>
  <div class="app-shell">
    <Sidebar />
    <main class="main-content">
      <Topbar />
      <section class="welcome-row">
        <div><h2>¡Hola, administrador! 👋</h2><p>Este es el resumen de lo que sucede en tu negocio hoy.</p></div>
        <button class="primary-button" @click="$router.push('/ventas')">＋ Nueva venta</button>
      </section>
      <section class="stats-grid">
        <article v-for="stat in stats" :key="stat.label" class="stat-card">
          <div class="stat-top"><span>{{ stat.label }}</span><span class="stat-icon" :class="stat.tone">{{ stat.icon }}</span></div>
          <strong class="stat-value">{{ stat.value }}</strong><span class="stat-change">{{ stat.change }} <small>vs. periodo anterior</small></span>
        </article>
      </section>
      <section class="content-grid">
        <article class="panel sales-panel">
          <div class="panel-heading"><div><h3>Resumen de ventas</h3><p>Comportamiento de ventas durante la semana</p></div><select aria-label="Periodo"><option>Esta semana</option><option>Este mes</option></select></div>
          <div class="chart"><div class="chart-y"><span>$2M</span><span>$1.5M</span><span>$1M</span><span>$500k</span><span>$0</span></div><div class="chart-area"><div class="chart-bars"><i style="height:42%"></i><i style="height:66%"></i><i style="height:53%"></i><i style="height:82%"></i><i style="height:61%"></i><i style="height:94%"></i><i style="height:75%"></i></div><div class="chart-x"><span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span><span>Dom</span></div></div></div>
        </article>
        <article class="panel quick-panel"><div class="panel-heading"><div><h3>Accesos rápidos</h3><p>Gestiona tu negocio</p></div></div><div class="quick-links"><RouterLink to="/productos"><span class="quick-icon violet">□</span><span><b>Agregar producto</b><small>Registra un nuevo artículo</small></span><span class="arrow">›</span></RouterLink><RouterLink to="/inventario"><span class="quick-icon blue">▤</span><span><b>Ver inventario</b><small>Consulta tus existencias</small></span><span class="arrow">›</span></RouterLink><RouterLink to="/clientes"><span class="quick-icon green">♙</span><span><b>Nuevo cliente</b><small>Amplía tu cartera</small></span><span class="arrow">›</span></RouterLink></div></article>
      </section>
      <section class="panel table-panel"><div class="panel-heading"><div><h3>Ventas recientes</h3><p>Últimas transacciones registradas</p></div><RouterLink to="/ventas" class="text-link">Ver todas →</RouterLink></div><div class="table-wrap"><table><thead><tr><th>REFERENCIA</th><th>CLIENTE</th><th>FECHA</th><th>TOTAL</th><th>ESTADO</th></tr></thead><tbody><tr v-for="sale in recent" :key="sale.id"><td class="ref">{{ sale.id }}</td><td>{{ sale.customer }}</td><td class="muted">{{ sale.date }}</td><td class="amount">{{ sale.total }}</td><td><span class="status" :class="sale.status === 'Completada' ? 'done' : 'pending'">{{ sale.status }}</span></td></tr></tbody></table></div></section>
      <footer class="footer">© 2026 FluxPOS · Gestión inteligente para tu negocio</footer>
    </main>
  </div>
</template>
