require('dotenv').config();
const express = require('express');
const cors = require('cors');
const healthRoutes = require('./routes/health.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    mensaje: '¡Bienvenido a FluxPOS API! 🚀',
    estado: 'Servidor funcionando correctamente',
    documentacion: '/api/health'
  });
});

app.use('/api/health', healthRoutes);

app.listen(PORT, () => {
  console.log(` Servidor corriendo en el puerto ${PORT}`);
  console.log(` Endpoint: http://localhost:${PORT}/api/health`);
});

module.exports = app;
