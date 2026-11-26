const pool = require('../../db');

const generateTemporaryPassword = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const getAllUsers = async () => {
  const result = await pool.query(
    'SELECT id, username, name, role_id, is_active, created_at FROM users ORDER BY id'
  );
  return result.rows;
};

const createUser = async (userData) => {
  const { username, name, role_id } = userData;
  const plainPassword = generateTemporaryPassword();
  
  const bcrypt = require('bcrypt');
  const saltRounds = 10;
  const password_hash = await bcrypt.hash(plainPassword, saltRounds);

  const result = await pool.query(
    `INSERT INTO users (username, name, role_id, password_hash)
     VALUES ($1, $2, $3, $4)
     RETURNING id, username, name, role_id, is_active, created_at`,
    [username, name, role_id, password_hash]
  );

  return { user: result.rows[0], temporaryPassword: plainPassword };
};

const updateUser = async (id, userData) => {
  const { name, role_id } = userData;
  const result = await pool.query(
    `UPDATE users 
     SET name = COALESCE($1, name), role_id = COALESCE($2, role_id), updated_at = CURRENT_TIMESTAMP
     WHERE id = $3
     RETURNING id, username, name, role_id, is_active, updated_at`,
    [name, role_id, id]
  );
  return result.rows[0];
};

const toggleUserStatus = async (id, currentUserId) => {
  if (parseInt(id) === currentUserId) {
    const error = new Error('No puedes desactivarte a ti mismo');
    error.statusCode = 400;
    throw error;
  }

  const result = await pool.query(
    `UPDATE users 
     SET is_active = NOT is_active, updated_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING id, username, name, is_active, updated_at`,
    [id]
  );
  
  if (result.rows.length === 0) {
    const error = new Error('Usuario no encontrado');
    error.statusCode = 404;
    throw error;
  }
  
  return result.rows[0];
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  toggleUserStatus
};
