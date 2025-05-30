const User = require('../models/userModel');
const responseHelper = require('../utils/responseHelper');

// Crear usuario nuevo (primera vez desde Google Auth)
const createUser = async (req, res) => {
  try {
    const { google_id, email, name, profile_image, phone, address, role = 'customer' } = req.body;

    if (!google_id || !email || !name) {
      return responseHelper.error(res, 'Google ID, email y nombre son obligatorios', 400);
    }

    // Verificar que no exista ya un usuario con ese google_id o email
    const existingUser = await User.findOne({ 
      $or: [{ google_id }, { email }] 
    });

    if (existingUser) {
      return responseHelper.error(res, 'Usuario ya existe', 400);
    }

    // Crear nuevo usuario
    const user = new User({
      google_id,
      email,
      name,
      profile_image: profile_image || 'https://placehold.co/400x400?text=Usuario',
      phone,
      address,
      role
    });

    await user.save();
    
    return responseHelper.success(res, user, 'Usuario creado exitosamente', 201);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return responseHelper.validationError(res, errors);
    }
    
    if (error.code === 11000) {
      return responseHelper.error(res, 'Email o Google ID ya existe', 400);
    }
    
    return responseHelper.error(res, 'Error al crear usuario', 500);
  }
};

// Obtener usuario por Google ID
const getUserByGoogleId = async (req, res) => {
  try {
    const { google_id } = req.params;
    
    if (!google_id) {
      return responseHelper.error(res, 'Google ID es requerido', 400);
    }
    
    const user = await User.findOne({ google_id });
    
    if (!user) {
      return responseHelper.error(res, 'Usuario no encontrado', 404);
    }

    return responseHelper.success(res, user, 'Usuario encontrado');
  } catch (error) {
    return responseHelper.error(res, 'Error al obtener usuario', 500);
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

// Obtener solo usuarios con rol 'owner' (solo admin)
const getOwners = async (req, res) => {
  try {
    const owners = await User.find({ 
      role: 'owner', 
      is_active: true 
    })
    .select('name email profile_image created_at')
    .sort({ name: 1 });
    
    return responseHelper.success(res, owners, 'Propietarios obtenidos exitosamente');
  } catch (error) {
    return responseHelper.error(res, 'Error al obtener propietarios', 500);
  }
};

// Actualizar usuario
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // No permitir actualizar campos críticos
    delete updates.google_id;
    delete updates.email;
    delete updates.user_id; // Remover user_id del body para que no se guarde
    delete updates.created_at;
    delete updates.updated_at;
    
    // Solo admin puede cambiar roles
    if (updates.role && req.user.role !== 'admin') {
      delete updates.role;
    }
    
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
    
    // Verificar que el usuario no se esté intentando eliminar a sí mismo siendo admin
    if (req.user._id.toString() === id && req.user.role === 'admin') {
      return responseHelper.error(res, 'Un administrador no puede desactivar su propia cuenta', 400);
    }
    
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return responseHelper.error(res, 'Usuario no encontrado', 404);
    }

    return responseHelper.success(res, null, 'Usuario desactivado exitosamente');
  } catch (error) {
    return responseHelper.error(res, 'Error al desactivar usuario', 500);
  }
};
// Actualizar perfil propio (PUT /me)
const updateProfile = async (req, res) => {
  try {
    // Si tienes autenticación, usa req.user._id. Si no, usa el id que venga en el body.
    const userId = req.user?._id || req.body.userId || req.body._id;
    if (!userId) {
      return responseHelper.error(res, 'ID de usuario requerido', 400);
    }

    const updates = req.body;

    // No permitir actualizar campos críticos
    delete updates.google_id;
    delete updates.email;
    delete updates.user_id;
    delete updates.created_at;
    delete updates.updated_at;
    delete updates.role;

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return responseHelper.error(res, 'Usuario no encontrado', 404);
    }

    return responseHelper.success(res, user, 'Perfil actualizado exitosamente');
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return responseHelper.validationError(res, errors);
    }
    return responseHelper.error(res, 'Error al actualizar perfil', 500);
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByGoogleId,
  getAllUsers,
  getOwners,
  updateUser,
  deleteUser,
  updateProfile
};