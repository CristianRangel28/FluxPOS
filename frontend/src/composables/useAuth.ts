import { computed, ref } from 'vue'
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import apiClient from '../services/api'

export type UserRole = 'admin' | 'seller'

export interface AuthUser {
  id: string | number
  username: string
  name?: string
  role: UserRole
  mustChangePassword?: boolean
}

interface LoginApiResponse {
  token?: string
  accessToken?: string
  user?: Partial<AuthUser> & { role?: string }
  role?: string
  mustChangePassword?: boolean
  must_change_password?: boolean
}

const STORAGE_KEY = 'fluxpos_auth_session_v1'

interface StoredSession {
  token: string | null
  user: AuthUser | null
}

function normalizeRole(rawRole?: string): UserRole {
  const normalized = (rawRole || '').toLowerCase().trim()
  if (
    normalized === 'admin' ||
    normalized === 'administrador' ||
    normalized === 'administrator' ||
    normalized === 'role_admin'
  ) {
    return 'admin'
  }
  return 'seller'
}

function readStoredSession(): StoredSession {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { token: null, user: null }
    const parsed = JSON.parse(raw) as StoredSession
    if (!parsed.user) return { token: null, user: null }
    return {
      token: parsed.token ?? null,
      user: {
        ...parsed.user,
        role: normalizeRole(parsed.user.role),
      },
    }
  } catch {
    return { token: null, user: null }
  }
}

const initialSession = readStoredSession()
const token = ref<string | null>(initialSession.token)
const user = ref<AuthUser | null>(initialSession.user)
const loading = ref(false)
const authError = ref<string | null>(null)

let interceptorsInstalled = false

function persistSession(nextToken: string | null, nextUser: AuthUser | null) {
  token.value = nextToken
  user.value = nextUser

  if (!nextUser) {
    localStorage.removeItem(STORAGE_KEY)
    return
  }

  const payload: StoredSession = {
    token: nextToken,
    user: nextUser,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

export function getHomeRouteForRole(role?: UserRole | null): string {
  return role === 'admin' ? '/admin' : '/dashboard'
}

export function setupAuthInterceptors(onUnauthorized?: () => void) {
  if (interceptorsInstalled) return
  interceptorsInstalled = true

  apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (token.value) {
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${token.value}`
    }
    return config
  })

  apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error?.response?.status === 401) {
        const isLoginRequest = String(error?.config?.url || '').includes('/auth/login')
        if (!isLoginRequest && token.value) {
          persistSession(null, null)
          onUnauthorized?.()
        }
      }
      return Promise.reject(error)
    },
  )
}

export function useAuth() {
  const isAuthenticated = computed(() => Boolean(user.value && token.value) || Boolean(user.value))
  const role = computed<UserRole | null>(() => user.value?.role ?? null)
  const isAdmin = computed(() => role.value === 'admin')
  const isSeller = computed(() => role.value === 'seller')
  const mustChangePassword = computed(() => Boolean(user.value?.mustChangePassword))
  const homeRoute = computed(() => getHomeRouteForRole(role.value))

  async function login(username: string, password: string): Promise<{
    ok: boolean
    mustChangePassword: boolean
    redirectTo: string
    message?: string
  }> {
    authError.value = null
    const cleanUsername = username.trim()

    if (!cleanUsername || !password) {
      const msg = 'Ingresa tu usuario y contraseña.'
      authError.value = msg
      return { ok: false, mustChangePassword: false, redirectTo: '/login', message: msg }
    }

    loading.value = true
    try {
      const { data } = await apiClient.post<LoginApiResponse>('/auth/login', {
        username: cleanUsername,
        password,
      })

      const receivedToken = data.token ?? data.accessToken ?? 'session-token'
      const resolvedRole = normalizeRole(data.user?.role ?? data.role)
      const needsPasswordChange = Boolean(
        data.user?.mustChangePassword ??
          data.mustChangePassword ??
          data.must_change_password ??
          false,
      )

      const loggedUser: AuthUser = {
        id: data.user?.id ?? cleanUsername,
        username: data.user?.username ?? cleanUsername,
        name: data.user?.name ?? data.user?.username ?? cleanUsername,
        role: resolvedRole,
        mustChangePassword: needsPasswordChange,
      }

      persistSession(receivedToken, loggedUser)

      return {
        ok: true,
        mustChangePassword: needsPasswordChange,
        redirectTo: needsPasswordChange ? '/change-password' : getHomeRouteForRole(resolvedRole),
      }
    } catch (err: unknown) {
      const axiosErr = err as { response?: { status?: number; data?: { message?: string } } }

      if (!axiosErr.response) {
        const msg =
          'No pudimos conectar con el servidor. Tus datos no se perdieron; intenta de nuevo en unos segundos.'
        authError.value = msg
        return { ok: false, mustChangePassword: false, redirectTo: '/login', message: msg }
      }

      if (axiosErr.response.status === 401 || axiosErr.response.status === 400) {
        const msg =
          axiosErr.response.data?.message ||
          'Usuario o contraseña incorrectos. Revísalos e inténtalo de nuevo.'
        authError.value = msg
        return { ok: false, mustChangePassword: false, redirectTo: '/login', message: msg }
      }

      const msg =
        axiosErr.response.data?.message ||
        'Ocurrió un error al iniciar sesión. Intenta nuevamente.'
      authError.value = msg
      return { ok: false, mustChangePassword: false, redirectTo: '/login', message: msg }
    } finally {
      loading.value = false
    }
  }

  async function completeFirstLoginPassword(
    temporaryPassword: string,
    newPassword: string,
  ): Promise<{ ok: boolean; redirectTo: string; message?: string }> {
    authError.value = null
    loading.value = true
    try {
      await apiClient.post('/auth/first-login-password', {
        temporaryPassword,
        newPassword,
      })

      if (user.value) {
        persistSession(token.value, {
          ...user.value,
          mustChangePassword: false,
        })
      }

      return {
        ok: true,
        redirectTo: getHomeRouteForRole(role.value),
      }
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } }
      const msg =
        axiosErr.response?.data?.message ||
        'No se pudo actualizar la contraseña. Revisa los datos e inténtalo de nuevo.'
      authError.value = msg
      return { ok: false, redirectTo: '/change-password', message: msg }
    } finally {
      loading.value = false
    }
  }

  function startFirstLoginDemo() {
    const demoSeller: AuthUser = {
      id: 'demo-first-login',
      username: 'vendedor_nuevo',
      name: 'Vendedor Nuevo',
      role: 'seller',
      mustChangePassword: true,
    }
    persistSession('demo-first-login-token', demoSeller)
  }

  function logout() {
    authError.value = null
    persistSession(null, null)
  }

  function clearAuthError() {
    authError.value = null
  }

  return {
    token,
    user,
    role,
    loading,
    authError,
    isAuthenticated,
    isAdmin,
    isSeller,
    mustChangePassword,
    homeRoute,
    login,
    logout,
    clearAuthError,
    completeFirstLoginPassword,
    startFirstLoginDemo,
  }
}
