require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    mensaje: '¡Bienvenido a FluxPOS API! ',
    version: '1.0.0',
    rutas_disponibles: [
      '/api/health',
      '/api/usuarios',
      '/api/productos',
      '/api/ventas',
      '/api/inventario',
      '/api/reportes'
    ]
  });
});

app.use('/api', apiRoutes);

//  Quité el '*' para que funcione correctamente
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    mensaje: `La ruta ${req.originalUrl} no existe en esta API`,
    codigo_http: 404
  });
});

app.listen(PORT, () => {
  console.log(` Servidor corriendo en el puerto ${PORT}`);
  console.log(` API base: http://localhost:${PORT}/api`);
});

module.exports = app;
