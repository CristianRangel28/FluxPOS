import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error('[FluxPOS HTTP] Error de red o bloqueo CORS:', error.message);
    } else {
      console.error(`[FluxPOS HTTP] Error ${error.response.status}:`, error.response.data);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
