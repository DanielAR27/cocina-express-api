const Category = require('../models/categoryModel');
const Restaurant = require('../models/restaurantModel');
const responseHelper = require('../utils/responseHelper');

// Crear nueva categoría
const createCategory = async (req, res) => {
  try {
    const { restaurant_id, name, description, order } = req.body;
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
      return responseHelper.error(res, 'No tienes permisos para crear categorías en este restaurante', 403);
    }

    // Verificar que no exista ya una categoría con el mismo nombre en el restaurante
    const existingCategory = await Category.findOne({
      restaurant_id,
      name: { $regex: new RegExp('^' + name.trim() + '$', 'i') }
    });

    if (existingCategory) {
      return responseHelper.error(res, 'Ya existe una categoría con ese nombre en este restaurante', 400);
    }

    // Crear nueva categoría
    const category = new Category({
      restaurant_id,
      name: name.trim(),
      description: description?.trim() || '',
      created_by: user._id,
      order: order || undefined // Si no se especifica, el middleware pre-save lo calculará
    });

    await category.save();
    await category.populate([
      { path: 'restaurant_id', select: 'name' },
      { path: 'created_by', select: 'name email' }
    ]);

    return responseHelper.success(res, category, 'Categoría creada exitosamente', 201);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return responseHelper.validationError(res, errors);
    }

    if (error.code === 11000) {
      return responseHelper.error(res, 'Ya existe una categoría con ese nombre en este restaurante', 400);
    }

    return responseHelper.error(res, 'Error al crear categoría', 500);
  }
};

// Obtener categorías por restaurante (público)
const getCategoriesByRestaurant = async (req, res) => {
  try {
    const { restaurant_id } = req.params;

    // Verificar que el restaurante existe
    const restaurant = await Restaurant.findById(restaurant_id);
    if (!restaurant) {
      return responseHelper.error(res, 'Restaurante no encontrado', 404);
    }

    const categories = await Category.find({
      restaurant_id,
      is_active: true
    })
    .populate('created_by', 'name')
    .sort({ order: 1, created_at: 1 });

    return responseHelper.success(res, categories, 'Categorías obtenidas exitosamente');
  } catch (error) {
    return responseHelper.error(res, 'Error al obtener categorías', 500);
  }
};

// Obtener todas las categorías (admin) o por owner (owner)
const getAllCategories = async (req, res) => {
  try {
    const user = req.user;
    let filter = { is_active: true };

    // Si es owner, solo sus restaurantes
    if (user.role === 'owner') {
      const restaurants = await Restaurant.find({ owner_id: user._id }).select('_id');
      const restaurantIds = restaurants.map(r => r._id);
      filter.restaurant_id = { $in: restaurantIds };
    }

    const categories = await Category.find(filter)
      .populate('restaurant_id', 'name')
      .populate('created_by', 'name email')
      .sort({ restaurant_id: 1, order: 1, created_at: 1 });

    return responseHelper.success(res, categories, 'Categorías obtenidas exitosamente');
  } catch (error) {
    return responseHelper.error(res, 'Error al obtener categorías', 500);
  }
};

// Obtener categoría por ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id)
      .populate('restaurant_id', 'name')
      .populate('created_by', 'name email');

    if (!category) {
      return responseHelper.error(res, 'Categoría no encontrada', 404);
    }

    return responseHelper.success(res, category, 'Categoría encontrada');
  } catch (error) {
    return responseHelper.error(res, 'Error al obtener categoría', 500);
  }
};

// Actualizar categoría
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, order } = req.body;
    const user = req.user;

    // Obtener categoría actual
    const category = await Category.findById(id).populate('restaurant_id');
    if (!category) {
      return responseHelper.error(res, 'Categoría no encontrada', 404);
    }

    // Verificar permisos
    if (user.role === 'owner' && category.restaurant_id.owner_id.toString() !== user._id.toString()) {
      return responseHelper.error(res, 'No tienes permisos para editar esta categoría', 403);
    }

    // Verificar nombre único si se está cambiando
    if (name && name.trim() !== category.name) {
      const existingCategory = await Category.findOne({
        restaurant_id: category.restaurant_id._id,
        name: { $regex: new RegExp('^' + name.trim() + '$', 'i') },
        _id: { $ne: id }
      });

      if (existingCategory) {
        return responseHelper.error(res, 'Ya existe otra categoría con ese nombre en este restaurante', 400);
      }
    }

    // Actualizar campos
    const updates = {};
    if (name) updates.name = name.trim();
    if (description !== undefined) updates.description = description.trim();
    if (order !== undefined) updates.order = order;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    )
    .populate('restaurant_id', 'name')
    .populate('created_by', 'name email');

    return responseHelper.success(res, updatedCategory, 'Categoría actualizada exitosamente');
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return responseHelper.validationError(res, errors);
    }

    return responseHelper.error(res, 'Error al actualizar categoría', 500);
  }
};

// Desactivar categoría (soft delete)
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    // Obtener categoría actual
    const category = await Category.findById(id).populate('restaurant_id');
    if (!category) {
      return responseHelper.error(res, 'Categoría no encontrada', 404);
    }

    // Verificar permisos
    if (user.role === 'owner' && category.restaurant_id.owner_id.toString() !== user._id.toString()) {
      return responseHelper.error(res, 'No tienes permisos para eliminar esta categoría', 403);
    }

    await Category.findByIdAndDelete(id);

    return responseHelper.success(res, null, 'Categoría eliminada exitosamente');
  } catch (error) {
    return responseHelper.error(res, 'Error al eliminar categoría', 500);
  }
};

// Reordenar categorías de un restaurante
const reorderCategories = async (req, res) => {
  try {
    const { restaurant_id } = req.params;
    const { category_orders } = req.body; // Array de { id, order }
    const user = req.user;

    // Verificar que el restaurante existe
    const restaurant = await Restaurant.findById(restaurant_id);
    if (!restaurant) {
      return responseHelper.error(res, 'Restaurante no encontrado', 404);
    }

    // Verificar permisos
    if (user.role === 'owner' && restaurant.owner_id.toString() !== user._id.toString()) {
      return responseHelper.error(res, 'No tienes permisos para reordenar categorías de este restaurante', 403);
    }

    if (!Array.isArray(category_orders) || category_orders.length === 0) {
      return responseHelper.error(res, 'Debe proporcionar un array de órdenes válido', 400);
    }

    // Actualizar el orden de cada categoría
    const updatePromises = category_orders.map(({ id, order }) =>
      Category.findOneAndUpdate(
        { _id: id, restaurant_id },
        { order },
        { new: true }
      )
    );

    await Promise.all(updatePromises);

    // Obtener categorías actualizadas
    const updatedCategories = await Category.find({
      restaurant_id,
      is_active: true
    })
    .populate('created_by', 'name')
    .sort({ order: 1, created_at: 1 });

    return responseHelper.success(res, updatedCategories, 'Categorías reordenadas exitosamente');
  } catch (error) {
    return responseHelper.error(res, 'Error al reordenar categorías', 500);
  }
};

module.exports = {
  createCategory,
  getCategoriesByRestaurant,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  reorderCategories
};