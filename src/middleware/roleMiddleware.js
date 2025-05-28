const User = require('../models/userModel');
const responseHelper = require('../utils/responseHelper');

// Función helper que respeta el contexto del método HTTP
const getUserId = (req) => {
  const method = req.method.toLowerCase();
  
  switch (method) {
    case 'get':
    case 'delete':
      // Para GET y DELETE: solo header o query params
      return req.headers['x-user-id'] || 
             req.headers['user-id'] || 
             req.query.user_id;
    
    case 'post':
    case 'put':
    case 'patch':
      // Para POST/PUT/PATCH: prioridad body > header > query
      return req.body.user_id || 
             req.headers['x-user-id'] || 
             req.headers['user-id'] || 
             req.query.user_id;
    
    default:
      // Fallback para otros métodos
      return req.headers['x-user-id'] || 
             req.headers['user-id'] || 
             req.body.user_id || 
             req.query.user_id;
  }
};

// Función para obtener mensaje de error contextual
const getUserIdErrorMessage = (method) => {
  switch (method.toLowerCase()) {
    case 'get':
    case 'delete':
      return 'ID de usuario requerido en header (x-user-id) o query (?user_id=...)';
    case 'post':
    case 'put':
    case 'patch':
      return 'ID de usuario requerido en body, header o query';
    default:
      return 'ID de usuario requerido';
  }
};

// Verificar si el usuario es admin
const isAdmin = async (req, res, next) => {
  try {
    const user_id = getUserId(req);
    
    if (!user_id) {
      const errorMsg = getUserIdErrorMessage(req.method);
      return responseHelper.error(res, errorMsg, 400);
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
    return responseHelper.error(res, `Error verificando permisos`, 500);
  }
};

// Verificar si el usuario es owner
const isOwner = async (req, res, next) => {
  try {
    const user_id = getUserId(req);
    
    if (!user_id) {
      const errorMsg = getUserIdErrorMessage(req.method);
      return responseHelper.error(res, errorMsg, 400);
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
    const user_id = getUserId(req);
    
    if (!user_id) {
      const errorMsg = getUserIdErrorMessage(req.method);
      return responseHelper.error(res, errorMsg, 400);
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

// Verificar si es el mismo usuario o admin
const isOwnerOrSelf = async (req, res, next) => {
  try {
    const user_id = getUserId(req);
    const { id: targetUserId } = req.params;
    
    if (!user_id) {
      const errorMsg = getUserIdErrorMessage(req.method);
      return responseHelper.error(res, errorMsg, 400);
    }

    const user = await User.findById(user_id);
    
    if (!user) {
      return responseHelper.error(res, 'Usuario no encontrado', 404);
    }

    // Verificar si es admin o si es el mismo usuario
    const isAdmin = user.role === 'admin';
    const isSameUser = user._id.toString() === targetUserId;

    if (!isAdmin && !isSameUser) {
      return responseHelper.error(res, 'Acceso denegado. Solo puedes modificar tu propia información', 403);
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
  isOwnerOrAdmin,
  isOwnerOrSelf
};