const { query } = require('../db');

// GET /categories - Listar todas
const listar = async (req, res) => {
  try {
    const result = await query(
      'SELECT id, name, description FROM categories ORDER BY name ASC'
    );

    if (!result.success) {
      return res.status(500).json({ 
        mensaje: 'Error al obtener categorías', 
        detalle: result.error 
      });
    }

    res.json({ 
      success: true, 
      categorias: result.rows 
    });
  } catch (error) {
    console.error('Error listar categorías:', error.message);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

// POST /categories - Crear nueva (solo admin)
const crear = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ mensaje: 'El nombre es obligatorio' });
    }

    const result = await query(
      'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
      [name.trim(), description || null]
    );

    if (!result.success) {
      return res.status(500).json({ 
        mensaje: 'Error al registrar categoría', 
        detalle: result.error 
      });
    }

    res.status(201).json({
      success: true,
      mensaje: 'Categoría registrada correctamente',
      categoria: result.rows[0]
    });
  } catch (error) {
    console.error('Error crear categoría:', error.message);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

// PATCH /categories/:id - Editar (solo admin)
const editar = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ mensaje: 'El nombre es obligatorio' });
    }

    const result = await query(
      'UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name.trim(), description || null, id]
    );

    if (!result.success) {
      return res.status(500).json({ 
        mensaje: 'Error al actualizar categoría', 
        detalle: result.error 
      });
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    res.json({
      success: true,
      mensaje: 'Categoría actualizada correctamente',
      categoria: result.rows[0]
    });
  } catch (error) {
    console.error('Error editar categoría:', error.message);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

module.exports = { listar, crear, editar };
