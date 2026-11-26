const express = require('express');
const { listar, crear, editar } = require('../controllers/categories.controller');
const { authenticate, requireRole } = require('../middlewares/auth.middleware');

const router = express.Router();

// GET    /api/categories          → Listar todos (usuarios autenticados)
// POST   /api/categories          → Crear (solo admin)
// PATCH  /api/categories/:id      → Editar (solo admin)

router.get('/', authenticate, listar);
router.post('/', authenticate, requireRole('admin'), crear);
router.patch('/:id', authenticate, requireRole('admin'), editar);

module.exports = router;
