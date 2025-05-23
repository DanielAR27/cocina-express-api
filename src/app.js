const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares globales
app.use(cors()); // Permitir CORS para React Native
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Rutas principales
app.use('/api/users', userRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Cocina Express funcionando correctamente',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Middleware global de manejo de errores
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

module.exports = app;