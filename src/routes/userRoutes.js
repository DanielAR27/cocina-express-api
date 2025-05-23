const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAdmin, isOwnerOrAdmin } = require('../middleware/roleMiddleware');

// Rutas públicas
router.post('/', userController.createOrUpdateUser); // Crear/actualizar desde Google Auth
router.get('/:id', userController.getUserById); // Obtener usuario por ID

// Rutas que requieren permisos
router.get('/', isAdmin, userController.getAllUsers); // Solo admin puede ver todos
router.put('/:id', userController.updateUser); // Usuario puede actualizar su perfil
router.delete('/:id', isAdmin, userController.deleteUser); // Solo admin puede desactivar

module.exports = router;