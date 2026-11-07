import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProductsView from '../views/ProductsView.vue'
import InventoryView from '../views/InventoryView.vue'
import SalesView from '../views/SalesView.vue'
import PurchasesView from '../views/PurchasesView.vue'
import CustomersView from '../views/CustomersView.vue'
import SuppliersView from '../views/SuppliersView.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', component: LoginView },
  { path: '/dashboard', component: DashboardView },
  { path: '/productos', component: ProductsView },
  { path: '/inventario', component: InventoryView },
  { path: '/ventas', component: SalesView },
  { path: '/compras', component: PurchasesView },
  { path: '/clientes', component: CustomersView },
  { path: '/proveedores', component: SuppliersView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
