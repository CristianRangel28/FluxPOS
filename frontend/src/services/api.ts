import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

export interface ApiError extends AxiosError<{ message?: string; mensaje?: string }> {
  userMessage?: string;
}

const AUTH_STORAGE_KEYS = ['fluxpos_auth_session_v1', 'fluxpos_auth', 'fluxpos_token', 'token'];

const readStoredAuth = (): Record<string, unknown> | null => {
  for (const key of AUTH_STORAGE_KEYS) {
    const raw = localStorage.getItem(key);
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return parsed as Record<string, unknown>;
      }
      if (typeof parsed === 'string') {
        return { token: parsed };
      }
    } catch {
      return { token: raw };
    }
  }
  return null;
};

export const getAuthToken = (): string | null => {
  const session = readStoredAuth();
  if (!session) return null;
  const token = session.token ?? session.accessToken;
  return typeof token === 'string' && token.length > 0 ? token : null;
};

export const clearAuthSession = (): void => {
  for (const key of AUTH_STORAGE_KEYS) {
    localStorage.removeItem(key);
  }
  localStorage.removeItem('fluxpos_user');
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const buildUserMessage = (error: ApiError): string => {
  if (!error.response) {
    if (error.code === 'ECONNABORTED') {
      return 'La solicitud tardó demasiado tiempo en responder. Inténtalo de nuevo.';
    }
    return 'No fue posible conectar con el servidor. Verifica tu conexión o que el backend esté activo.';
  }

  const backendMsg = error.response.data?.message || error.response.data?.mensaje;
  if (backendMsg && typeof backendMsg === 'string') {
    return backendMsg;
  }

  switch (error.response.status) {
    case 400:
      return 'Los datos enviados no son válidos. Revisa la información e inténtalo de nuevo.';
    case 401:
      return 'Tu sesión ha expirado o no es válida. Inicia sesión nuevamente.';
    case 403:
      return 'No tienes permisos para realizar esta acción.';
    case 404:
      return 'El recurso solicitado no fue encontrado.';
    case 409:
      return 'Existe un conflicto con el estado actual del registro.';
    case 422:
      return 'Algunos campos no cumplen con el formato requerido.';
    default:
      if (error.response.status >= 500) {
        return 'Ocurrió un error interno en el servidor. Inténtalo más tarde.';
      }
      return `Error inesperado (${error.response.status}) al comunicarse con el servidor.`;
  }
};

apiClient.interceptors.response.use(
  (response) => response,
  (error: ApiError) => {
    const userMessage = buildUserMessage(error);
    error.userMessage = userMessage;

    if (!error.response) {
      console.error('[FluxPOS HTTP] Error de red o bloqueo CORS:', error.message);
    } else {
      console.error(`[FluxPOS HTTP] Error ${error.response.status}:`, error.response.data);
    }

    if (error.response?.status === 401) {
      clearAuthSession();
      if (window.location.pathname !== '/login') {
        window.location.assign('/login');
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
