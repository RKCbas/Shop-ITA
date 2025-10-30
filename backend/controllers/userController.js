import { pool } from '../config/database.js';
import bcrypt from 'bcrypt';

export const getUsers = async (req, res) => {
  try {
    const [usuarios] = await pool.query(
      'SELECT id, nombre, email, telefono, direccion, rol, activo, created_at FROM usuarios'
    );
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const [usuarios] = await pool.query(
      'SELECT id, nombre, email, telefono, direccion, rol, activo, created_at FROM usuarios WHERE id = ?',
      [req.params.id]
    );
    
    if (usuarios.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json(usuarios[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

export const createUser = async (req, res) => {
  const { nombre, email, password, telefono, direccion, rol } = req.body;
  
  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Nombre, email y password son requeridos' });
  }
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, email, password, telefono, direccion, rol) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, email, hashedPassword, telefono || null, direccion || null, rol || 'usuario']
    );
    
    res.status(201).json({
      id: result.insertId,
      nombre,
      email,
      mensaje: 'Usuario creado exitosamente'
    });
  } catch (error) {
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

export const updateUser = async (req, res) => {
  const { nombre, email, telefono, direccion } = req.body;
  
  try {
    const [result] = await pool.query(
      'UPDATE usuarios SET nombre = ?, email = ?, telefono = ?, direccion = ? WHERE id = ?',
      [nombre, email, telefono, direccion, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json({ mensaje: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json({ mensaje: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};
