// backend/utils/db.js

const { Pool } = require('pg');
require('dotenv').config();

// Configuración del pool de conexiones
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

/**
 * Ejecuta una consulta SQL parametrizada
 * @param {string} text - Consulta SQL con placeholders ($1, $2, ...)
 * @param {Array} params - Valores para los placeholders
 * @returns {Promise<Object>} Resultado de la consulta
 */
const query = async (text, params = []) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return {
      success: true,
      rows: result.rows,
      rowCount: result.rowCount,
      fields: result.fields,
    };
  } catch (error) {
    console.error(' Error en la consulta:', error.message);
    return {
      success: false,
      error: error.message,
      code: error.code,
    };
  } finally {
    client.release();
  }
};

/**
 * Obtiene un cliente de conexión para operaciones transaccionales
 * @returns {Promise<Object>} Cliente con métodos de transacción
 */
const getTransactionClient = async () => {
  const client = await pool.connect();
  
  return {
    client,
    
    async begin() {
      await client.query('BEGIN');
    },
    
    async commit() {
      await client.query('COMMIT');
      client.release();
    },
    
    async rollback() {
      await client.query('ROLLBACK');
      client.release();
    },
    
    async query(text, params = []) {
      try {
        return await client.query(text, params);
      } catch (error) {
        throw error;
      }
    },
  };
};

// Verificar conexión al iniciar
pool.connect((err) => {
  if (err) {
    console.error(' Error al conectar con la base de datos:', err.message);
  } else {
    console.log(' Utilidad de base de datos lista y conectada');
  }
});

module.exports = {
  query,
  getTransactionClient,
  pool,
};
