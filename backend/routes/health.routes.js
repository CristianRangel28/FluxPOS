const express = require('express');
const router = express.Router();
const { query } = require('../db'); // Busca automáticamente '../db/index.js'

// Endpoint 1: Estado del servidor Express (Ya existía)
router.get('/', (req, res) => {
  res.status(200).json({
    mensaje: 'El servidor está funcionando correctamente',
    estado: 'activo',
    codigo_http: 200,
    fecha: new Date().toISOString()
  });
});

// Endpoint 2: Comprobar conexión con PostgreSQL
router.get('/db', async (req, res) => {
  try {
    // Consulta SQL rápida y segura que no modifica datos
    const result = await query('SELECT NOW() AS time');

    res.status(200).json({
      mensaje: 'Conexión con PostgreSQL exitosa',
      estado: 'conectado',
      codigo_http: 200,
      fecha: result.rows[0].time
    });
  } catch (error) {
    // Se registra el error en consola para depuración, pero no se expone al cliente
    console.error('Error de conexión a PostgreSQL:', error.message);

    res.status(503).json({
      error: 'Servicio no disponible',
      mensaje: 'No se pudo establecer conexión con la base de datos',
      codigo_http: 503
    });
  }
});

module.exports = router;