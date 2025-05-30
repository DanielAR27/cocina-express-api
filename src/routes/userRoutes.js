const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAdmin, isOwnerOrSelf } = require('../middleware/roleMiddleware');

// Rutas públicas
router.post('/', userController.createUser); // Crear usuario nuevo
router.get('/google/:google_id', userController.getUserByGoogleId); // Buscar por Google ID
router.get('/:id', userController.getUserById); // Obtener usuario por ID

// Rutas que requieren permisos
router.get('/', isAdmin, userController.getAllUsers); // Solo admin puede ver todos (ahora GET con query)
router.get('/owners', isAdmin, userController.getOwners); // Solo admin puede ver owners (ahora GET con query)
router.put('/:id', isOwnerOrSelf, userController.updateUser); // Solo el mismo usuario o admin
router.delete('/:id', isOwnerOrSelf, userController.deleteUser); // Solo el mismo usuario o admin
router.put('/me', userController.updateProfile);

module.exports = router;