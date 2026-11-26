const express = require('express');
const router = express.Router();

const healthRoutes = require('./health.routes');
router.use('/health', healthRoutes);

router.use('/usuarios', (req, res) => {
  res.status(200).json({
    mensaje: 'Módulo de Usuarios',
    estado: 'En desarrollo',
    ruta_base: '/api/usuarios'
  });
});

router.use('/productos', (req, res) => {
  res.status(200).json({
    mensaje: 'Módulo de Productos',
    estado: 'En desarrollo',
    ruta_base: '/api/productos'
  });
});

router.use('/ventas', (req, res) => {
  res.status(200).json({
    mensaje: 'Módulo de Ventas',
    estado: 'En desarrollo',
    ruta_base: '/api/ventas'
  });
});

router.use('/inventario', (req, res) => {
  res.status(200).json({
    mensaje: 'Módulo de Inventario',
    estado: 'En desarrollo',
    ruta_base: '/api/inventario'
  });
});

router.use('/reportes', (req, res) => {
  res.status(200).json({
    mensaje: 'Módulo de Reportes',
    estado: 'En desarrollo',
    ruta_base: '/api/reportes'
  });
});


const categoryRoutes = require('./categories.routes');
const productRoutes = require('./products.routes');

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);

module.exports = router;


