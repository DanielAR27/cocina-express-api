const User = require('../models/userModel');
const responseHelper = require('../utils/responseHelper');

// Verificar si el usuario es admin
const isAdmin = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    
    if (!user_id) {
      return responseHelper.error(res, 'ID de usuario requerido', 400);
    }

    const user = await User.findById(user_id);
    
    if (!user) {
      return responseHelper.error(res, 'Usuario no encontrado', 404);
    }

    if (user.role !== 'admin') {
      return responseHelper.error(res, 'Acceso denegado. Solo administradores', 403);
    }

    req.user = user; // Pasar datos del usuario al siguiente middleware
    next();
  } catch (error) {
    return responseHelper.error(res, 'Error verificando permisos', 500);
  }
};

// Verificar si el usuario es owner
const isOwner = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    
    if (!user_id) {
      return responseHelper.error(res, 'ID de usuario requerido', 400);
    }

    const user = await User.findById(user_id);
    
    if (!user) {
      return responseHelper.error(res, 'Usuario no encontrado', 404);
    }

    if (user.role !== 'owner') {
      return responseHelper.error(res, 'Acceso denegado. Solo propietarios de restaurante', 403);
    }

    req.user = user;
    next();
  } catch (error) {
    return responseHelper.error(res, 'Error verificando permisos', 500);
  }
};

// Verificar si es owner o admin
const isOwnerOrAdmin = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    
    if (!user_id) {
      return responseHelper.error(res, 'ID de usuario requerido', 400);
    }

    const user = await User.findById(user_id);
    
    if (!user) {
      return responseHelper.error(res, 'Usuario no encontrado', 404);
    }

    if (user.role !== 'owner' && user.role !== 'admin') {
      return responseHelper.error(res, 'Acceso denegado. Permisos insuficientes', 403);
    }

    req.user = user;
    next();
  } catch (error) {
    return responseHelper.error(res, 'Error verificando permisos', 500);
  }
};

module.exports = {
  isAdmin,
  isOwner,
  isOwnerOrAdmin
};