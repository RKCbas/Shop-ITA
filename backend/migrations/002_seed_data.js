import { pool } from '../config/database.js';
import bcrypt from 'bcrypt';

export async function seedData() {
  let connection;
  
  try {
    connection = await pool.getConnection();
    
    // Crear usuario admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await connection.query(`
      INSERT IGNORE INTO usuarios (nombre, email, password, rol) VALUES
      ('Administrador', 'admin@shopita.com', ?, 'admin')
    `, [hashedPassword]);
    console.log('✓ Usuario admin creado');

    // Insertar categorías
    await connection.query(`
      INSERT IGNORE INTO categorias (id, nombre, descripcion) VALUES
      (<id>, '<nombre>', '<descripcion>'),
    `);
    console.log('✓ Categorías insertadas');

    // Insertar productos
    await connection.query(`
      INSERT IGNORE INTO productos (nombre, descripcion, precio, stock, imagen, categoria_id) VALUES
      ('<nombre>', '<descripcion>', <precio>, <stock>, '<imagen en base 64>', <categoria_id>)
    `);
    console.log('✓ productos insertados');
    
    console.log('\n✓ Datos iniciales insertados exitosamente');
    return true;
  } catch (error) {
    console.error('✗ Error al insertar datos:', error.message);
    return false;
  } finally {
    if (connection) connection.release();
  }
}