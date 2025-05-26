const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const { isOwnerOrAdmin, isAdmin } = require('../middleware/roleMiddleware');

// Rutas públicas
router.get('/', restaurantController.getAllRestaurants); // Ver todos los restaurantes
router.get('/:id', restaurantController.getRestaurantById); // Ver restaurante específico

// Rutas que requieren permisos
router.post('/', isAdmin, restaurantController.createRestaurant); // Solo admins pueden crear
router.get('/owner/:owner_id', isOwnerOrAdmin, restaurantController.getRestaurantsByOwner); // Ver restaurantes por owner
router.put('/:id', isOwnerOrAdmin, restaurantController.updateRestaurant); // Solo owners/admins pueden actualizar
router.delete('/:id', isAdmin, restaurantController.deleteRestaurant); // Solo admin puede desactivar

module.exports = router;