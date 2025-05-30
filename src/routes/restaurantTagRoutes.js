const express = require('express');
const router = express.Router();
const restaurantTagController = require('../controllers/restaurantTagController');
const { isAdmin } = require('../middleware/roleMiddleware');

// Rutas públicas generales - PRIMERA
router.get('/', restaurantTagController.getAllRestaurantTags); // Ver tags activos (para seleccionar en restaurantes)

// Rutas que requieren permisos - ESPECÍFICAS antes de /:id
router.post('/', isAdmin, restaurantTagController.createRestaurantTag); // Crear tag
router.get('/all', isAdmin, restaurantTagController.getAllRestaurantTagsAdmin); // Ver todos incluyendo inactivos

// Rutas con parámetros dinámicos - NECESITAN ir AL FINAL
router.get('/:id', restaurantTagController.getRestaurantTagById); // Ver tag específico
router.put('/:id', isAdmin, restaurantTagController.updateRestaurantTag); // Actualizar tag
router.delete('/:id', isAdmin, restaurantTagController.deleteRestaurantTag); // Desactivar tag

module.exports = router;