const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isOwnerOrAdmin } = require('../middleware/roleMiddleware');

// Rutas públicas específicas - PRIMERA
router.get('/restaurant/:restaurant_id', productController.getProductsByRestaurant); // Ver productos de un restaurante
router.get('/search', productController.searchProducts); // Buscar productos

// Rutas que requieren permisos - ESPECÍFICAS antes de /:id
router.post('/', isOwnerOrAdmin, productController.createProduct); // Crear producto
router.get('/', isOwnerOrAdmin, productController.getAllProducts); // Ver todos los productos (filtrados por rol)

// Rutas con parámetros dinámicos - AL FINAL
router.get('/:id', productController.getProductById); // Ver producto específico
router.put('/:id', isOwnerOrAdmin, productController.updateProduct); // Actualizar producto
router.delete('/:id', isOwnerOrAdmin, productController.deleteProduct); // Eliminar producto

module.exports = router;