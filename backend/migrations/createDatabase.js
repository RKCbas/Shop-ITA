import { createDatabaseConnection } from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const database = process.env.database

export async function createDatabase() {
  let connection;
  
  try {
    connection = await createDatabaseConnection();
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${database}`);
    console.log(`✓ Base de datos '${database}' creada o ya existe`);
    
    return true;
  } catch (error) {
    console.error('✗ Error al crear la base de datos:', error.message);
    return false;
  } finally {
    if (connection) await connection.end();
  }
}