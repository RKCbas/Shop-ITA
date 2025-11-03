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

export const findProducts = async (req,res) => {

  const { busqueda } = req.query;
  
  if (!busqueda) {
    return res.status(400).json({ error: 'El parámetro "busqueda" es requerido' });
  }
  
  try {
    const [productos] = await pool.query(`
      SELECT p.*, c.nombre as categoria_nombre 
      FROM productos p 
      LEFT JOIN categorias c ON p.categoria_id = c.id 
      WHERE p.activo = TRUE 
      AND p.nombre LIKE %${busqueda}%
      ORDER BY p.nombre
    `);
    
    res.json({
      resultados: productos.length,
      productos
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar productos' });
  }
}
