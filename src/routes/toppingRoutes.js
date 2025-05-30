const express = require('express');
const router = express.Router();
const toppingController = require('../controllers/toppingController');
const { isOwnerOrAdmin } = require('../middleware/roleMiddleware');

// Rutas públicas específicas - PRIMERA
router.get('/restaurant/:restaurant_id', toppingController.getToppingsByRestaurant); // Ver toppings de un restaurante

// Rutas que requieren permisos - ESPECÍFICAS antes de /:id
router.post('/', isOwnerOrAdmin, toppingController.createTopping); // Crear topping
router.get('/', isOwnerOrAdmin, toppingController.getAllToppings); // Ver todos los toppings (filtrados por rol)

// Rutas con parámetros dinámicos - AL FINAL
router.get('/:id', toppingController.getToppingById); // Ver topping específico
router.put('/:id', isOwnerOrAdmin, toppingController.updateTopping); // Actualizar topping
router.delete('/:id', isOwnerOrAdmin, toppingController.deleteTopping); // Eliminar topping

module.exports = router;