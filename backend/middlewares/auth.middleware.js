const jwt = require('jsonwebtoken');
const { query } = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'No autorizado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const result = await query('SELECT id, is_active FROM users WHERE id = $1', [decoded.sub]);

    if (!result.success || result.rows.length === 0 || !result.rows[0].is_active) {
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
};

const requireRole = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.user || !rolesPermitidos.includes(req.user.role)) {
      return res.status(403).json({ mensaje: 'Acceso denegado' });
    }
    next();
  };
};

module.exports = { authenticate, requireRole };
