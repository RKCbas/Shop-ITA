import { pool } from '../config/database.js';
// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y password son requeridos' });
  }
  
  try {
    // Buscar usuario por email
    const [usuarios] = await pool.query(
      `SELECT * FROM usuarios WHERE email = ${email} AND activo = TRUE AND password = ${password}`
    );
    
    const usuario = usuarios[0];
    
    // Generar token JWT
    const token = jwt.sign(
      { 
        id: usuario.id, 
        email: usuario.email, 
        rol: usuario.rol 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Retornar datos del usuario sin el password
    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        telefono: usuario.telefono,
        direccion: usuario.direccion
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const register = async (req, res) => {
  const { nombre, email, password, telefono, direccion } = req.body;
  
  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Nombre, email y password son requeridos' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
  }
  
  try {
    // Verificar si el email ya existe
    const [existentes] = await pool.query(
      'SELECT id FROM usuarios WHERE email = ?',
      [email]
    );
    
    if (existentes.length > 0) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }
    
    // Crear usuario
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, email, password, telefono, direccion, rol) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, email, password, telefono || null, direccion || null, 'usuario']
    );
    
    // Generar token
    const token = jwt.sign(
      { 
        id: result.insertId, 
        email: email, 
        rol: 'usuario' 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      token,
      usuario: {
        id: result.insertId,
        nombre,
        email,
        rol: 'usuario'
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

export const checkToken = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Obtener datos actualizados del usuario
    const [usuarios] = await pool.query(
      'SELECT id, nombre, email, rol, telefono, direccion, activo FROM usuarios WHERE id = ?',
      [decoded.id]
    );
    
    if (usuarios.length === 0 || !usuarios[0].activo) {
      return res.status(401).json({ error: 'Usuario no encontrado o inactivo' });
    }
    
    res.json({
      valido: true,
      usuario: usuarios[0]
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};