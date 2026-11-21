<script setup lang="ts">
import { ref } from 'vue';
import apiClient from '../services/api';

const loading = ref(false);
const responseData = ref<unknown>(null);
const errorMessage = ref<string | null>(null);

const checkBackendHealth = async () => {
  loading.value = true;
  responseData.value = null;
  errorMessage.value = null;

  try {
    const response = await apiClient.get('/health');
    responseData.value = response.data;
  } catch (err: any) {
    if (!err.response) {
      errorMessage.value = 'Error de red o CORS: No se pudo conectar con Express en http://localhost:3000.';
    } else {
      errorMessage.value = `Error del servidor (${err.response.status}): ${err.response.data?.mensaje || err.message}`;
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section style="padding: 1.5rem; border: 1px solid #ccc; border-radius: 8px; max-width: 600px; margin: 1rem auto; font-family: sans-serif;">
    <h2>Prueba de Comunicacion Vue - Express (FluxPOS)</h2>
    <p>Endpoint de prueba: <code>GET /api/health</code></p>
    <button @click="checkBackendHealth" :disabled="loading" style="padding: 0.6rem 1rem; cursor: pointer;">
      {{ loading ? 'Consultando API...' : 'Probar conexion con Backend' }}
    </button>
    <div v-if="responseData" style="margin-top: 1rem; padding: 0.8rem; background: #e8f5e9; color: #1b5e20; border-radius: 4px;">
      <strong>Respuesta recibida (200 OK):</strong>
      <pre>{{ JSON.stringify(responseData, null, 2) }}</pre>
    </div>
    <div v-if="errorMessage" style="margin-top: 1rem; padding: 0.8rem; background: #ffebee; color: #b71c1c; border-radius: 4px;">
      <strong>Error detectado:</strong> {{ errorMessage }}
    </div>
  </section>
</template>
