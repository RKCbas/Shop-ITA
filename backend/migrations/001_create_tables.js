import { pool } from '../config/db.js';

export async function up() {
  let connection;
  
  try {
    connection = await pool.getConnection();
    
    // Tabla de usuarios
    await connection.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        telefono VARCHAR(20),
        direccion TEXT,
        rol ENUM('admin', 'usuario') DEFAULT 'usuario',
        activo BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_rol (rol)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✓ Tabla usuarios creada');
    
    // Tabla de categorías
    await connection.query(`
      CREATE TABLE IF NOT EXISTS categorias (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL UNIQUE,
        descripcion TEXT,
        activo BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✓ Tabla categorias creada');
    
    // Tabla de productos con imágenes en base64
    await connection.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(200) NOT NULL,
        descripcion TEXT,
        precio DECIMAL(10, 2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        imagen LONGTEXT,
        categoria_id INT,
        activo BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL,
        INDEX idx_categoria (categoria_id),
        INDEX idx_activo (activo),
        INDEX idx_nombre (nombre)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✓ Tabla productos creada');
    
    console.log('\n✓ Todas las tablas fueron creadas exitosamente');
    return true;
  } catch (error) {
    console.error('✗ Error al crear tablas:', error.message);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

export async function down() {
  let connection;
  
  try {
    connection = await pool.getConnection();
    
    await connection.query('DROP TABLE IF EXISTS productos');
    await connection.query('DROP TABLE IF EXISTS categorias');
    await connection.query('DROP TABLE IF EXISTS usuarios');
    
    console.log('✓ Todas las tablas fueron eliminadas');
    return true;
  } catch (error) {
    console.error('✗ Error al eliminar tablas:', error.message);
    return false;
  } finally {
    if (connection) connection.release();
  }
}