const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { query } = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

function nombreRol(roleId) {
  return roleId === 1 ? 'admin' : 'seller';
}

const login = async (req, res) => {
  try {
    const identificador = req.body.username || req.body.email || req.body.correo || req.body.usuario;
    const password = req.body.password;

    console.log('LOGIN recibido:', JSON.stringify(req.body));

    if (!identificador || !password) {
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }

    const result = await query('SELECT * FROM users WHERE username = $1', [identificador]);

    if (!result.success) {
      console.error('Error BD login:', result.error);
      return res.status(500).json({ mensaje: 'Error del servidor', detalle: result.error });
    }

    const user = result.rows[0];

    if (!user || !user.is_active) {
      console.log('No existe o inactivo:', identificador);
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      console.log('Contraseña incorrecta para:', identificador);
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }

    const rol = nombreRol(user.role_id);

    const token = jwt.sign(
      { sub: user.id, role: rol, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { password_hash, ...usuarioSinClave } = user;
    const usuario = { ...usuarioSinClave, role: rol };

    res.json({
      mensaje: 'Inicio de sesión exitoso',
      token,
      role: rol,
      usuario,
      user: usuario
    });
  } catch (error) {
    console.error('Error en login:', error.message);
    res.status(500).json({ mensaje: 'Error del servidor', detalle: error.message });
  }
};

const me = async (req, res) => {
  try {
    const result = await query(
      'SELECT id, username, name, role_id, is_active, created_at FROM users WHERE id = $1',
      [req.user.sub]
    );

    if (!result.success) {
      return res.status(500).json({ mensaje: 'Error del servidor' });
    }
    if (result.rows.length === 0) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }

    const fila = result.rows[0];
    res.json({
      usuario: { ...fila, role: nombreRol(fila.role_id) }
    });
  } catch (error) {
    console.error('Error al obtener usuario:', error.message);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user.sub;
    const { currentPassword, newPassword } = req.body;

    const userResult = await query('SELECT password_hash FROM users WHERE id = $1', [userId]);
    if (!userResult.success || userResult.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const coincide = await bcrypt.compare(currentPassword, userResult.rows[0].password_hash);
    if (!coincide) {
      return res.status(401).json({ mensaje: 'Contraseña actual incorrecta' });
    }

    const nuevaClave = await bcrypt.hash(newPassword, 10);
    await query('UPDATE users SET password_hash = $1 WHERE id = $2', [nuevaClave, userId]);

    res.json({ mensaje: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error cambio clave:', error.message);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

module.exports = { login, me, changePassword };
