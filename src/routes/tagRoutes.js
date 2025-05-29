const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const { isOwnerOrAdmin } = require('../middleware/roleMiddleware');

// Rutas públicas específicas - PRIMERA
router.get('/restaurant/:restaurant_id', tagController.getTagsByRestaurant); // Ver tags de un restaurante

// Rutas que requieren permisos - ESPECÍFICAS antes de /:id
router.post('/', isOwnerOrAdmin, tagController.createTag); // Crear tag
router.get('/', isOwnerOrAdmin, tagController.getAllTags); // Ver todos los tags (filtrados por rol)

// Rutas con parámetros dinámicos - AL FINAL
router.get('/:id', tagController.getTagById); // Ver tag específico
router.put('/:id', isOwnerOrAdmin, tagController.updateTag); // Actualizar tag
router.delete('/:id', isOwnerOrAdmin, tagController.deleteTag); // Desactivar tag
router.patch('/:id/reactivate', isOwnerOrAdmin, tagController.reactivateTag); // Reactivar tag

module.exports = router;