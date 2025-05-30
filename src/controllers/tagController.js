const Tag = require('../models/tagModel');
const Restaurant = require('../models/restaurantModel');
const responseHelper = require('../utils/responseHelper');

// Crear nuevo tag
const createTag = async (req, res) => {
  try {
    const { restaurant_id, name } = req.body;
    const user = req.user;

    // Validaciones básicas
    if (!restaurant_id || !name) {
      return responseHelper.error(res, 'ID del restaurante y nombre son obligatorios', 400);
    }

    // Verificar que el restaurante existe
    const restaurant = await Restaurant.findById(restaurant_id);
    if (!restaurant) {
      return responseHelper.error(res, 'Restaurante no encontrado', 404);
    }

    // Verificar permisos: admin puede crear para cualquier restaurante, owner solo para los suyos
    if (user.role === 'owner' && restaurant.owner_id.toString() !== user._id.toString()) {
      return responseHelper.error(res, 'No tienes permisos para crear tags en este restaurante', 403);
    }

    // Verificar que no exista ya un tag con el mismo nombre en el restaurante
    const existingTag = await Tag.findOne({
      restaurant_id,
      name: { $regex: new RegExp('^' + name.trim() + '$', 'i') }
    });

    if (existingTag) {
      return responseHelper.error(res, 'Ya existe un tag con ese nombre en este restaurante', 400);
    }

    // Crear nuevo tag
    const tag = new Tag({
      restaurant_id,
      name: name.trim(),
      created_by: user._id
    });

    await tag.save();
    await tag.populate([
      { path: 'restaurant_id', select: 'name' },
      { path: 'created_by', select: 'name email' }
    ]);

    return responseHelper.success(res, tag, 'Tag creado exitosamente', 201);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return responseHelper.validationError(res, errors);
    }

    if (error.code === 11000) {
      return responseHelper.error(res, 'Ya existe un tag con ese nombre en este restaurante', 400);
    }

    return responseHelper.error(res, 'Error al crear tag', 500);
  }
};

// Obtener tags por restaurante (público)
const getTagsByRestaurant = async (req, res) => {
  try {
    const { restaurant_id } = req.params;

    // Verificar que el restaurante existe
    const restaurant = await Restaurant.findById(restaurant_id);
    if (!restaurant) {
      return responseHelper.error(res, 'Restaurante no encontrado', 404);
    }

    const tags = await Tag.find({
      restaurant_id,
      is_active: true
    })
    .populate('created_by', 'name')
    .sort({ name: 1 });

    return responseHelper.success(res, tags, 'Tags obtenidos exitosamente');
  } catch (error) {
    return responseHelper.error(res, 'Error al obtener tags', 500);
  }
};

// Obtener todos los tags (admin) o por owner (owner)
const getAllTags = async (req, res) => {
  try {
    const user = req.user;
    let filter = { is_active: true };

    // Si es owner, solo sus restaurantes
    if (user.role === 'owner') {
      const restaurants = await Restaurant.find({ owner_id: user._id }).select('_id');
      const restaurantIds = restaurants.map(r => r._id);
      filter.restaurant_id = { $in: restaurantIds };
    }

    const tags = await Tag.find(filter)
      .populate('restaurant_id', 'name')
      .populate('created_by', 'name email')
      .sort({ restaurant_id: 1, name: 1 });

    return responseHelper.success(res, tags, 'Tags obtenidos exitosamente');
  } catch (error) {
    return responseHelper.error(res, 'Error al obtener tags', 500);
  }
};

// Obtener tag por ID
const getTagById = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findById(id)
      .populate('restaurant_id', 'name')
      .populate('created_by', 'name email');

    if (!tag) {
      return responseHelper.error(res, 'Tag no encontrado', 404);
    }

    return responseHelper.success(res, tag, 'Tag encontrado');
  } catch (error) {
    return responseHelper.error(res, 'Error al obtener tag', 500);
  }
};

// Actualizar tag
const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const user = req.user;

    // Obtener tag actual
    const tag = await Tag.findById(id).populate('restaurant_id');
    if (!tag) {
      return responseHelper.error(res, 'Tag no encontrado', 404);
    }

    // Verificar permisos
    if (user.role === 'owner' && tag.restaurant_id.owner_id.toString() !== user._id.toString()) {
      return responseHelper.error(res, 'No tienes permisos para editar este tag', 403);
    }

    // Verificar nombre único si se está cambiando
    if (name && name.trim() !== tag.name) {
      const existingTag = await Tag.findOne({
        restaurant_id: tag.restaurant_id._id,
        name: { $regex: new RegExp('^' + name.trim() + '$', 'i') },
        _id: { $ne: id }
      });

      if (existingTag) {
        return responseHelper.error(res, 'Ya existe otro tag con ese nombre en este restaurante', 400);
      }
    }

    // Actualizar campos
    const updates = {};
    if (name) updates.name = name.trim();

    const updatedTag = await Tag.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    )
    .populate('restaurant_id', 'name')
    .populate('created_by', 'name email');

    return responseHelper.success(res, updatedTag, 'Tag actualizado exitosamente');
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return responseHelper.validationError(res, errors);
    }

    return responseHelper.error(res, 'Error al actualizar tag', 500);
  }
};

// Desactivar tag
const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    // Obtener tag actual
    const tag = await Tag.findById(id).populate('restaurant_id');
    if (!tag) {
      return responseHelper.error(res, 'Tag no encontrado', 404);
    }

    // Verificar permisos
    if (user.role === 'owner' && tag.restaurant_id.owner_id.toString() !== user._id.toString()) {
      return responseHelper.error(res, 'No tienes permisos para eliminar este tag', 403);
    }

    await Tag.findByIdAndDelete(id);

    return responseHelper.success(res, null, 'Tag eliminado exitosamente');
  } catch (error) {
    return responseHelper.error(res, 'Error al eliminar tag', 500);
  }
};

module.exports = {
  createTag,
  getTagsByRestaurant,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag
};