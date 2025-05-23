const User = require('../models/userModel');
const responseHelper = require('../utils/responseHelper');

// Crear o actualizar usuario (desde Google Auth)
const createOrUpdateUser = async (req, res) => {
  try {
    const { google_id, email, name, profile_image, phone, address, role = 'customer' } = req.body;

    if (!google_id) {
      return responseHelper.error(res, 'Google ID es obligatorio', 400);
    }

    // Buscar usuario existente por google_id o email
    let user = await User.findOne({ 
      $or: [{ google_id }, { email }] 
    });

    if (user) {
      // Actualizar usuario existente
      user.google_id = google_id;
      user.name = name || user.name;
      user.email = email || user.email;
      user.profile_image = profile_image || user.profile_image;
      user.phone = phone || user.phone;
      user.address = address || user.address;
      user.role = role || user.role;
      
      await user.save(); // created_at NO cambia, solo updated_at
      
      return responseHelper.success(res, user, 'Usuario actualizado exitosamente');
    } else {
      // Crear nuevo usuario
      user = new User({
        google_id,
        email,
        name,
        profile_image,
        phone,
        address,
        role
      });

      await user.save(); // Se crea created_at y updated_at
      
      return responseHelper.success(res, user, 'Usuario creado exitosamente', 201);
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return responseHelper.validationError(res, errors);
    }
    
    if (error.code === 11000) {
      return responseHelper.error(res, 'Email o Google ID ya existe', 400);
    }
    
    return responseHelper.error(res, 'Error al procesar usuario', 500);
  }
};

// Obtener usuario por ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id);
    
    if (!user) {
      return responseHelper.error(res, 'Usuario no encontrado', 404);
    }

    return responseHelper.success(res, user, 'Usuario encontrado');
  } catch (error) {
    return responseHelper.error(res, 'Error al obtener usuario', 500);
  }
};

// Obtener usuario por Google ID
const getUserByGoogleId = async (req, res) => {
  try {
    const { google_id } = req.params;
    
    const user = await User.findOne({ google_id });
    
    if (!user) {
      return responseHelper.error(res, 'Usuario no encontrado', 404);
    }

    return responseHelper.success(res, user, 'Usuario encontrado');
  } catch (error) {
    return responseHelper.error(res, 'Error al obtener usuario', 500);
  }
};

// Obtener todos los usuarios (solo admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ is_active: true }).sort({ created_at: -1 });
    
    return responseHelper.success(res, users, 'Usuarios obtenidos exitosamente');
  } catch (error) {
    return responseHelper.error(res, 'Error al obtener usuarios', 500);
  }
};

// Actualizar usuario
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // No permitir actualizar google_id o email directamente
    delete updates.google_id;
    delete updates.email;
    
    const user = await User.findByIdAndUpdate(id, updates, { 
      new: true, 
      runValidators: true 
    });

    if (!user) {
      return responseHelper.error(res, 'Usuario no encontrado', 404);
    }

    return responseHelper.success(res, user, 'Usuario actualizado exitosamente');
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return responseHelper.validationError(res, errors);
    }
    
    return responseHelper.error(res, 'Error al actualizar usuario', 500);
  }
};

// Desactivar usuario (soft delete)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByIdAndUpdate(id, { is_active: false }, { new: true });

    if (!user) {
      return responseHelper.error(res, 'Usuario no encontrado', 404);
    }

    return responseHelper.success(res, null, 'Usuario desactivado exitosamente');
  } catch (error) {
    return responseHelper.error(res, 'Error al desactivar usuario', 500);
  }
};

module.exports = {
  createOrUpdateUser,
  getUserById,
  getUserByGoogleId,
  getAllUsers,
  updateUser,
  deleteUser
};