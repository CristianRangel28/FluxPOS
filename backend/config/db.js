require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log(' Conexión exitosa a PostgreSQL');
    const result = await client.query('SELECT NOW()');
    console.log('🕒 Hora del servidor:', result.rows[0].now);
    client.release();
    return true;
  } catch (error) {
    console.error(' Error al conectar a PostgreSQL:');
    console.error('Código:', error.code);
    console.error('Mensaje:', error.message);
    return false;
  }
};

module.exports = { pool, testConnection };
