const userService = require('./users.service');

const isAdmin = (req) => {
  return req.user && req.user.role_name === 'admin';
};

const getAllUsers = async (req, res, next) => {
  try {
    if (!isAdmin(req)) {
      return res.status(403).json({ error: 'Acceso denegado: solo administradores' });
    }
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    if (!isAdmin(req)) {
      return res.status(403).json({ error: 'Acceso denegado: solo administradores' });
    }

    const { username, name, role_id } = req.body;
    
    if (!username || !name || !role_id) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: username, name, role_id' });
    }

    const { user, temporaryPassword } = await userService.createUser(req.body);
    
    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user,
      temporaryPassword
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ error: 'El nombre de usuario ya existe' });
    }
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    if (!isAdmin(req)) {
      return res.status(403).json({ error: 'Acceso denegado: solo administradores' });
    }

    const updated = await userService.updateUser(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario actualizado', user: updated });
  } catch (error) {
    next(error);
  }
};

const toggleStatus = async (req, res, next) => {
  try {
    if (!isAdmin(req)) {
      return res.status(403).json({ error: 'Acceso denegado: solo administradores' });
    }

    const updated = await userService.toggleUserStatus(req.params.id, req.user.id);
    res.json({
      message: updated.is_active ? 'Usuario activado' : 'Usuario desactivado',
      user: updated
    });
  } catch (error) {
    if (error.statusCode === 400) {
      return res.status(400).json({ error: error.message });
    }
    if (error.statusCode === 404) {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  toggleStatus
};
