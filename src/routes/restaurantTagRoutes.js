const express = require('express');
const router = express.Router();
const restaurantTagController = require('../controllers/restaurantTagController');
const { isAdmin } = require('../middleware/roleMiddleware');

// Rutas públicas
router.get('/', restaurantTagController.getAllRestaurantTags); // Ver tags activos (para seleccionar en restaurantes)
router.get('/:id', restaurantTagController.getRestaurantTagById); // Ver tag específico

// Rutas que requieren permisos de admin
router.post('/', isAdmin, restaurantTagController.createRestaurantTag); // Crear tag
router.get('/all', isAdmin, restaurantTagController.getAllRestaurantTagsAdmin); // Ver todos incluyendo inactivos
router.put('/:id', isAdmin, restaurantTagController.updateRestaurantTag); // Actualizar tag
router.delete('/:id', isAdmin, restaurantTagController.deleteRestaurantTag); // Desactivar tag
router.patch('/:id/reactivate', isAdmin, restaurantTagController.reactivateRestaurantTag); // Reactivar tag

module.exports = router;