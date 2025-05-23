const User = require('../models/userModel');
const responseHelper = require('../utils/responseHelper');

// Crear o actualizar usuario (desde Google Auth)
const createOrUpdateUser = async (req, res) => {
  try {
    const { email, name, profile_image, phone, address, role = 'customer' } = req.body;

    // Buscar usuario existente por email
    let user = await User.findOne({ email });

    if (user) {
      // Actualizar usuario existente
      user.name = name || user.name;
      user.profile_image = profile_image || user.profile_image;
      user.phone = phone || user.phone;
      user.address = address || user.address;
      user.role = role || user.role;
      
      await user.save();
      
      return responseHelper.success(res, user, 'Usuario actualizado exitosamente');
    } else {
      // Crear nuevo usuario
      user = new User({
        email,
        name,
        password: 'google_auth', // Password placeholder para Google Auth
        profile_image,
        phone,
        address,
        role
      });

      await user.save();
      
      return responseHelper.success(res, user, 'Usuario creado exitosamente', 201);
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return responseHelper.validationError(res, errors);
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

    // No permitir actualizar email o role directamente
    delete updates.email;
    delete updates.password;
    
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
  getAllUsers,
  updateUser,
  deleteUser
};