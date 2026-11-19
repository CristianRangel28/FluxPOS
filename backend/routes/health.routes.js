const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    mensaje: 'El servidor está funcionando correctamente',
    estado: 'activo',
    codigo_http: 200,
    fecha: new Date().toISOString()
  });
});

module.exports = router;
