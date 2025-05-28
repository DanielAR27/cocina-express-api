const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAdmin, isOwnerOrSelf } = require('../middleware/roleMiddleware');

// IMPORTANTE: Las rutas específicas PRIMERO, las genéricas DESPUÉS

// Rutas públicas específicas
router.post('/', userController.createUser); // Crear usuario nuevo

// Rutas que requieren permisos - ESPECÍFICAS primero (antes de /:id)
router.get('/', isAdmin, userController.getAllUsers); // Solo admin puede ver todos
router.get('/owners', isAdmin, userController.getOwners); // Solo admin puede ver owners
router.get('/google/:google_id', userController.getUserByGoogleId); // Buscar por Google ID

// Rutas con parámetros dinámicos - AL FINAL
router.get('/:id', userController.getUserById); // Obtener usuario por ID
router.put('/:id', isOwnerOrSelf, userController.updateUser); // Solo el mismo usuario o admin
router.delete('/:id', isOwnerOrSelf, userController.deleteUser); // Solo el mismo usuario o admin

module.exports = router;