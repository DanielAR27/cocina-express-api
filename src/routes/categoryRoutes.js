const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { isOwnerOrAdmin } = require('../middleware/roleMiddleware');

// Rutas públicas específicas - PRIMERA
router.get('/restaurant/:restaurant_id', categoryController.getCategoriesByRestaurant); // Ver categorías de un restaurante

// Rutas que requieren permisos - ESPECÍFICAS antes de /:id
router.post('/', isOwnerOrAdmin, categoryController.createCategory); // Crear categoría
router.get('/', isOwnerOrAdmin, categoryController.getAllCategories); // Ver todas las categorías (filtradas por rol)
router.patch('/restaurant/:restaurant_id/reorder', isOwnerOrAdmin, categoryController.reorderCategories); // Reordenar categorías

// Rutas con parámetros dinámicos - AL FINAL
router.get('/:id', categoryController.getCategoryById); // Ver categoría específica
router.put('/:id', isOwnerOrAdmin, categoryController.updateCategory); // Actualizar categoría
router.delete('/:id', isOwnerOrAdmin, categoryController.deleteCategory); // Desactivar categoría
router.patch('/:id/reactivate', isOwnerOrAdmin, categoryController.reactivateCategory); // Reactivar categoría

module.exports = router;