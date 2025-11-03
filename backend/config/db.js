// db.js - Configuración de la conexión a MySQL
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const host = process.env.host;
const user = process.env.user;
const password = process.env.password;
const database = process.env.database;


export async function createDatabaseConnection() {
  return await mysql.createConnection({
    host: host,
    user: user,
    password: password
  });
}

export const pool = mysql.createPool({
  host: host,
  user: user,
  password: password,
  database: database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Función para probar la conexión
export async function testConnection() {
  try {
    const [rows] = await promisePool.query('SELECT 1');
    console.log('Conexión a MySQL', rows ? 'exitosa ✓' : 'fallida ✗');
    return true;
  } catch (error) {
    console.error('✗ Error al conectar a MySQL:', error.message);
    return false;
  }
}
