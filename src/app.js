const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');

const app = express();

// Middlewares globales
app.use(cors()); // Permitir CORS para React Native
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Rutas principales
app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Cocina Express funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      restaurants: '/api/restaurants'
    },
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