import { pool } from '../config/database.js';

export const getProducts = async (_req, res) => {
  try {
    const [productos] = await pool.query(`
      SELECT p.*, c.nombre as categoria_nombre 
      FROM productos p 
      LEFT JOIN categorias c ON p.categoria_id = c.id 
      WHERE p.activo = TRUE
    `);
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

export const getProductsById = async (req, res) => {
  try {
    const [productos] = await pool.query(`
      SELECT p.*, c.nombre as categoria_nombre 
      FROM productos p 
      LEFT JOIN categorias c ON p.categoria_id = c.id 
      WHERE p.id = ?
    `, [req.params.id]);
    
    if (productos.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json(productos[0]);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Error al obtener producto' });
  }
};

export const createProduct = async (req, res) => {
  const { nombre, descripcion, precio, stock, imagen, categoria_id } = req.body;
  
  if (!nombre || !precio) {
    return res.status(400).json({ error: 'Nombre y precio son requeridos' });
  }
  
  try {
    const [result] = await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio, stock, imagen, categoria_id) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, descripcion, precio, stock || 0, imagen, categoria_id]
    );
    
    res.status(201).json({
      id: result.insertId,
      nombre,
      precio,
      mensaje: 'Producto creado exitosamente'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

export const updateProduct = async (req, res) => {
  const { nombre, descripcion, precio, stock, imagen, categoria_id } = req.body;
  
  try {
    const [result] = await pool.query(
      'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen = ?, categoria_id = ? WHERE id = ?',
      [nombre, descripcion, precio, stock, imagen, categoria_id, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json({ mensaje: 'Producto actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    // Soft delete
    const [result] = await pool.query(
      'UPDATE productos SET activo = FALSE WHERE id = ?',
      [req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json({ mensaje: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};
