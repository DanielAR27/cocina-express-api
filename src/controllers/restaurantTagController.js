const RestaurantTag = require('../models/restaurantTagModel');
const responseHelper = require('../utils/responseHelper');

// Crear nuevo restaurant tag (solo admin)
const createRestaurantTag = async (req, res) => {
  try {
    const { name } = req.body;

    // Validación básica
    if (!name || !name.trim()) {
      return responseHelper.error(res, 'El nombre del tag es obligatorio', 400);
    }

    // Verificar que no exista ya un tag con el mismo nombre
    const existingTag = await RestaurantTag.findOne({ 
      name: { $regex: new RegExp('^' + name.trim() + '$', 'i') } // Case insensitive
    });
    
    if (existingTag) {
      return responseHelper.error(res, 'Ya existe un tag con ese nombre', 400);
    }

    // Crear nuevo tag
    const tag = new RestaurantTag({
      name: name.trim()
    });

    await tag.save();
    
    return responseHelper.success(res, tag, 'Tag creado exitosamente', 201);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return responseHelper.validationError(res, errors);
    }
    
    if (error.code === 11000) {
      return responseHelper.error(res, 'Ya existe un tag con ese nombre', 400);
    }
    
    return responseHelper.error(res, 'Error al crear tag', 500);
  }
};

// Obtener todos los tags activos (público)
const getAllRestaurantTags = async (req, res) => {
  try {
    const tags = await RestaurantTag.find({ is_active: true })
      .sort({ name: 1 }); // Ordenar alfabéticamente
    
    return responseHelper.success(res, tags, 'Tags obtenidos exitosamente');
  } catch (error) {
    return responseHelper.error(res, 'Error al obtener tags', 500);
  }
};

// Obtener tag por ID
const getRestaurantTagById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const tag = await RestaurantTag.findById(id);

    if (!tag) {
      return responseHelper.error(res, 'Tag no encontrado', 404);
    }

    return responseHelper.success(res, tag, 'Tag encontrado');
  } catch (error) {
    return responseHelper.error(res, 'Error al obtener tag', 500);
  }
};

// Obtener todos los tags incluyendo inactivos (solo admin)
const getAllRestaurantTagsAdmin = async (req, res) => {
  try {
    const tags = await RestaurantTag.find({})
      .sort({ created_at: -1 }); // Más recientes primero
    
    return responseHelper.success(res, tags, 'Todos los tags obtenidos exitosamente');
  } catch (error) {
    return responseHelper.error(res, 'Error al obtener tags', 500);
  }
};

// Actualizar tag (solo admin)
const updateRestaurantTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Validación básica
    if (!name || !name.trim()) {
      return responseHelper.error(res, 'El nombre del tag es obligatorio', 400);
    }

    // Verificar que no exista otro tag con el mismo nombre
    const existingTag = await RestaurantTag.findOne({ 
      name: { $regex: new RegExp('^' + name.trim() + '$', 'i') },
      _id: { $ne: id } // Excluir el tag actual
    });
    
    if (existingTag) {
      return responseHelper.error(res, 'Ya existe otro tag con ese nombre', 400);
    }
    
    const tag = await RestaurantTag.findByIdAndUpdate(
      id, 
      { name: name.trim() }, 
      { new: true, runValidators: true }
    );

    if (!tag) {
      return responseHelper.error(res, 'Tag no encontrado', 404);
    }

    return responseHelper.success(res, tag, 'Tag actualizado exitosamente');
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return responseHelper.validationError(res, errors);
    }
    
    return responseHelper.error(res, 'Error al actualizar tag', 500);
  }
};

// Desactivar tag (soft delete - solo admin)
const deleteRestaurantTag = async (req, res) => {
  try {
    const { id } = req.params;
    
    const tag = await RestaurantTag.findByIdAndUpdate(id);

    if (!tag) {
      return responseHelper.error(res, 'Tag no encontrado', 404);
    }

    return responseHelper.success(res, null, 'Tag eliminado exitosamente');
  } catch (error) {
    return responseHelper.error(res, 'Error al eliminar tag', 500);
  }
};

module.exports = {
  createRestaurantTag,
  getAllRestaurantTags,
  getRestaurantTagById,
  getAllRestaurantTagsAdmin,
  updateRestaurantTag,
  deleteRestaurantTag,
  reactivateRestaurantTag
};