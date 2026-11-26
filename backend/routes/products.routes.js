const express = require('express');
const { crear, listar, editar } = require('../controllers/products.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

// POST   /api/products          → Crear producto + stock inicial
// GET    /api/products          → Listar con filtros (q, category_id)
// PATCH  /api/products/:id      → Editar nombre, categoría y precios

router.post('/', authenticate, crear);
router.get('/', authenticate, listar);
router.patch('/:id', authenticate, editar);

module.exports = router;
