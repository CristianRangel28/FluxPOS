const { query } = require('../db');

// ============================================================
// POST /products - Crear producto + stock inicial (adjustment)
// ============================================================
const crear = async (req, res) => {
  try {
    const { 
      category_id, 
      name, 
      description, 
      cost_price, 
      sale_price, 
      initial_stock = 0 
    } = req.body;

    if (!category_id || !name || cost_price === undefined || sale_price === undefined) {
      return res.status(400).json({ 
        mensaje: 'Categoría, nombre, precio de costo y precio de venta son obligatorios' 
      });
    }

    // 1. Crear el producto
    const productoResult = await query(
      `INSERT INTO products 
       (category_id, name, description, cost_price, sale_price) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [category_id, name.trim(), description || null, cost_price, sale_price]
    );

    if (!productoResult.success) {
      return res.status(500).json({ 
        mensaje: 'Error al registrar producto', 
        detalle: productoResult.error 
      });
    }

    const producto = productoResult.rows[0];
    let stockDisponible = 0;
    const stock = Number(initial_stock);

    // 2. Si hay stock inicial > 0 → inventario + movimiento
    if (stock > 0) {
      // ✅ INSERT con ON CONFLICT: si existe, suma; si no, crea
      const inv = await query(
        `INSERT INTO inventory (product_id, quantity) 
         VALUES ($1, $2)
         ON CONFLICT (product_id) 
         DO UPDATE SET quantity = inventory.quantity + EXCLUDED.quantity,
                       updated_at = CURRENT_TIMESTAMP
         RETURNING quantity`,
        [producto.id, stock]
      );

      stockDisponible = (inv.success && inv.rows.length > 0) ? inv.rows[0].quantity : stock;

      // 3. Registrar movimiento tipo 'adjustment'
      await query(
        `INSERT INTO inventory_movements 
         (product_id, user_id, movement_type, quantity, previous_quantity, new_quantity) 
         VALUES ($1, $2, 'adjustment', $3, 0, $4)`,
        [producto.id, req.user.sub, stock, stockDisponible]
      );
    }

    res.status(201).json({
      success: true,
      mensaje: 'Producto registrado correctamente',
      producto: { ...producto, stock_disponible: stockDisponible }
    });

  } catch (error) {
    console.error('❌ Error crear producto:', error.message);
    res.status(500).json({ 
      mensaje: 'Error del servidor al crear producto',
      detalle: error.message 
    });
  }
};

// ============================================================
// GET /products - Listar con filtros + stock disponible
// ============================================================
const listar = async (req, res) => {
  try {
    const { q, category_id } = req.query;

    let sql = `
      SELECT 
        p.*,
        c.name AS category_name,
        COALESCE(i.quantity, 0) AS stock_disponible
      FROM products p
      JOIN categories c ON p.category_id = c.id
      LEFT JOIN inventory i ON p.id = i.product_id
      WHERE 1=1
    `;
    const params = [];

    if (q && q.trim()) {
      params.push(`%${q.trim()}%`);
      sql += ` AND (p.name ILIKE $${params.length} OR p.description ILIKE $${params.length})`;
    }

    if (category_id) {
      params.push(category_id);
      sql += ` AND p.category_id = $${params.length}`;
    }

    sql += ' ORDER BY p.id ASC';

    const result = await query(sql, params);

    if (!result.success) {
      return res.status(500).json({ 
        mensaje: 'Error al obtener productos', 
        detalle: result.error 
      });
    }

    res.json({
      success: true,
      total: result.rows.length,
      productos: result.rows
    });

  } catch (error) {
    console.error('Error listar productos:', error.message);
    res.status(500).json({ mensaje: 'Error del servidor al listar productos' });
  }
};

// ============================================================
// PATCH /products/:id - Editar nombre, categoría y precios
// ============================================================
const editar = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category_id, description, cost_price, sale_price } = req.body;

    const campos = [];
    const valores = [];
    let contador = 1;

    if (name !== undefined) { campos.push(`name = $${contador++}`); valores.push(name); }
    if (category_id !== undefined) { campos.push(`category_id = $${contador++}`); valores.push(category_id); }
    if (description !== undefined) { campos.push(`description = $${contador++}`); valores.push(description); }
    if (cost_price !== undefined) { campos.push(`cost_price = $${contador++}`); valores.push(cost_price); }
    if (sale_price !== undefined) { campos.push(`sale_price = $${contador++}`); valores.push(sale_price); }

    if (campos.length === 0) {
      return res.status(400).json({ mensaje: 'No se enviaron campos para actualizar' });
    }

    campos.push('updated_at = CURRENT_TIMESTAMP');
    valores.push(id);

    const sql = `UPDATE products SET ${campos.join(', ')} WHERE id = $${contador} RETURNING *`;
    const result = await query(sql, valores);

    if (!result.success) {
      return res.status(500).json({ 
        mensaje: 'Error al actualizar producto', 
        detalle: result.error 
      });
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json({
      success: true,
      mensaje: 'Producto actualizado correctamente',
      producto: result.rows[0]
    });

  } catch (error) {
    console.error('Error editar producto:', error.message);
    res.status(500).json({ mensaje: 'Error del servidor al editar producto' });
  }
};

module.exports = { crear, listar, editar };
