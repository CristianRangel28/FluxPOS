import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ForbiddenView from '../views/ForbiddenView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import { setupAuthInterceptors, useAuth, type UserRole } from '../composables/useAuth'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    requiresAuth?: boolean
    guestOnly?: boolean
    roles?: UserRole[]
  }
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { title: 'Iniciar sesión | FluxPOS', guestOnly: true },
  },
  {
    path: '/admin',
    name: 'admin',
    component: DashboardView,
    meta: { title: 'Administración | FluxPOS', requiresAuth: true, roles: ['admin'] },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { title: 'Dashboard | FluxPOS', requiresAuth: true, roles: ['admin', 'seller'] },
  },
  {
    path: '/vender',
    name: 'vender',
    component: DashboardView,
    meta: { title: 'Punto de Venta | FluxPOS', requiresAuth: true, roles: ['admin', 'seller'] },
  },
  {
    path: '/sin-permiso',
    name: 'sin-permiso',
    component: ForbiddenView,
    meta: { title: 'Acceso denegado | FluxPOS', requiresAuth: true },
  },
  {
    path: '/forbidden',
    redirect: '/sin-permiso',
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: { title: 'Página no encontrada | FluxPOS' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

setupAuthInterceptors(() => {
  if (router.currentRoute.value.path !== '/login') {
    void router.push('/login')
  }
})

router.beforeEach((to) => {
  const { isAuthenticated, role, homeRoute } = useAuth()

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  if (to.meta.guestOnly && isAuthenticated.value) {
    return homeRoute.value
  }

  if (to.meta.roles && to.meta.roles.length > 0) {
    if (!role.value || !to.meta.roles.includes(role.value)) {
      return '/sin-permiso'
    }
  }

  return true
})

router.afterEach((to) => {
  if (typeof to.meta.title === 'string') {
    document.title = to.meta.title
  }
})

export default router
