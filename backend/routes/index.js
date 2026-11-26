const express = require('express');
const router = express.Router();
const healthRoutes = require('./health.routes');
const userRoutes = require('../modules/users/users.routes'); // ✅ 1. Importas primero

router.use('/health', healthRoutes);
router.use('/usuarios', userRoutes); // ✅ 2. Usas después

// Aquí puedes agregar tus otras rutas después

module.exports = router; // ✅ 3. Exportas al final SIEMPRE
