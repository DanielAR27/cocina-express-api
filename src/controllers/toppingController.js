const Topping = require('../models/toppingModel');
const Restaurant = require('../models/restaurantModel');
const Product = require('../models/productModel');
const Tag = require('../models/tagModel');
const responseHelper = require('../utils/responseHelper');

// Crear nuevo topping
const createTopping = async (req, res) => {
  try {
    const { 
      restaurant_id, 
      name, 
      description, 
      price,
      tags,
      compatible_with,
      nutritional_info,
      is_available,
      stock_quantity
    } = req.body;
    const user = req.user;

    // Validaciones básicas
    if (!restaurant_id || !name || !description || price === undefined) {
      return responseHelper.error(res, 'Restaurante, nombre, descripción y precio son obligatorios', 400);
    }

    // Verificar que el restaurante existe
    const restaurant = await Restaurant.findById(restaurant_id);
    if (!restaurant) {
      return responseHelper.error(res, 'Restaurante no encontrado', 404);
    }

    // Verificar permisos: admin puede crear para cualquier restaurante, owner solo para los suyos
    if (user.role === 'owner' && restaurant.owner_id.toString() !== user._id.toString()) {
      return responseHelper.error(res, 'No tienes permisos para crear toppings en este restaurante', 403);
    }

    // Verificar que no exista ya un topping con el mismo nombre en el restaurante
    const existingTopping = await Topping.findOne({
      restaurant_id,
      name: { $regex: new RegExp('^' + name.trim() + '$', 'i') }
    });
    if (existingTopping) {
      return responseHelper.error(res, 'Ya existe un topping con ese nombre en este restaurante', 400);
    }

    // Validar tags si se proporcionan
    if (tags && tags.length > 0) {
      const validTags = await Tag.find({
        _id: { $in: tags },
        restaurant_id: restaurant_id
      });
      if (validTags.length !== tags.length) {
        return responseHelper.error(res, 'Algunos tags no son válidos o no pertenecen a este restaurante', 400);
      }
    }

    // Validar productos compatibles si se proporcionan
    if (compatible_with && compatible_with.length > 0) {
      const validProducts = await Product.find({
        _id: { $in: compatible_with },
        restaurant_id: restaurant_id
      });
      if (validProducts.length !== compatible_with.length) {
        return responseHelper.error(res, 'Algunos productos no son válidos o no pertenecen a este restaurante', 400);
      }
    }

    // Crear nuevo topping
    const topping = new Topping({
      restaurant_id,
      name: name.trim(),
      description: description.trim(),
      price,
      tags: tags || [],
      compatible_with: compatible_with || [],
      nutritional_info: nutritional_info || {},
      is_available: is_available !== undefined ? is_available : true,
      stock_quantity: stock_quantity || 0,
      created_by: user._id
    });

    await topping.save();
    await topping.populate([
      { path: 'restaurant_id', select: 'name' },
      { path: 'tags', select: 'name' },
      { path: 'compatible_with', select: 'name' },
      { path: 'created_by', select: 'name email' }
    ]);

    return responseHelper.success(res, topping, 'Topping creado exitosamente', 201);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return responseHelper.validationError(res, errors);
    }

    if (error.code === 11000) {
      return responseHelper.error(res, 'Ya existe un topping con ese nombre en este restaurante', 400);
    }

    return responseHelper.error(res, 'Error al crear topping', 500);
  }
};

// Obtener toppings por restaurante (público)
const getToppingsByRestaurant = async (req, res) => {
  try {
    const { restaurant_id } = req.params;
    const { is_available, compatible_with_product } = req.query;

    // Verificar que el restaurante existe
    const restaurant = await Restaurant.findById(restaurant_id);
    if (!restaurant) {
      return responseHelper.error(res, 'Restaurante no encontrado', 404);
    }

    // Construir filtros
    let filter = { restaurant_id };
    
    if (is_available !== undefined) filter.is_available = is_available === 'true';
    
    // Filtrar por producto compatible si se especifica
    if (compatible_with_product) {
      filter.compatible_with = { $in: [compatible_with_product] };
    }

    const toppings = await Topping.find(filter)
      .populate('tags', 'name')
      .populate('compatible_with', 'name')
      .populate('created_by', 'name')
      .sort({ name: 1 });

    return responseHelper.success(res, toppings, 'Toppings obtenidos exitosamente');
  } catch (error) {
    return responseHelper.error(res, 'Error al obtener toppings', 500);
  }
};

// Obtener todos los toppings (admin) o por owner (owner)
const getAllToppings = async (req, res) => {
  try {
    const user = req.user;
    let filter = {};

    // Si es owner, solo sus restaurantes
    if (user.role === 'owner') {
      const restaurants = await Restaurant.find({ owner_id: user._id }).select('_id');
      const restaurantIds = restaurants.map(r => r._id);
      filter.restaurant_id = { $in: restaurantIds };
    }

    const toppings = await Topping.find(filter)
      .populate('restaurant_id', 'name')
      .populate('tags', 'name')
      .populate('compatible_with', 'name')
      .populate('created_by', 'name email')
      .sort({ restaurant_id: 1, name: 1 });

    return responseHelper.success(res, toppings, 'Toppings obtenidos exitosamente');
  } catch (error) {
    return responseHelper.error(res, 'Error al obtener toppings', 500);
  }
};

// Obtener topping por ID
const getToppingById = async (req, res) => {
  try {
    const { id } = req.params;

    const topping = await Topping.findById(id)
      .populate('restaurant_id', 'name')
      .populate('tags', 'name')
      .populate('compatible_with', 'name')
      .populate('created_by', 'name email');

    if (!topping) {
      return responseHelper.error(res, 'Topping no encontrado', 404);
    }

    return responseHelper.success(res, topping, 'Topping encontrado');
  } catch (error) {
    return responseHelper.error(res, 'Error al obtener topping', 500);
  }
};

// Actualizar topping
const updateTopping = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = req.user;

    // Obtener topping actual
    const topping = await Topping.findById(id).populate('restaurant_id');
    if (!topping) {
      return responseHelper.error(res, 'Topping no encontrado', 404);
    }

    // Verificar permisos
    if (user.role === 'owner' && topping.restaurant_id.owner_id.toString() !== user._id.toString()) {
      return responseHelper.error(res, 'No tienes permisos para editar este topping', 403);
    }

    // No permitir cambiar restaurant_id ni created_by
    delete updates.restaurant_id;
    delete updates.created_by;

    // Verificar nombre único si se está cambiando
    if (updates.name && updates.name.trim() !== topping.name) {
      const existingTopping = await Topping.findOne({
        restaurant_id: topping.restaurant_id._id,
        name: { $regex: new RegExp('^' + updates.name.trim() + '$', 'i') },
        _id: { $ne: id }
      });

      if (existingTopping) {
        return responseHelper.error(res, 'Ya existe otro topping con ese nombre en este restaurante', 400);
      }
    }

    // Verificar tags si se están cambiando
    if (updates.tags && updates.tags.length > 0) {
      const validTags = await Tag.find({
        _id: { $in: updates.tags },
        restaurant_id: topping.restaurant_id._id
      });
      if (validTags.length !== updates.tags.length) {
        return responseHelper.error(res, 'Algunos tags no son válidos o no pertenecen a este restaurante', 400);
      }
    }

    // Verificar productos compatibles si se están cambiando
    if (updates.compatible_with && updates.compatible_with.length > 0) {
      const validProducts = await Product.find({
        _id: { $in: updates.compatible_with },
        restaurant_id: topping.restaurant_id._id
      });
      if (validProducts.length !== updates.compatible_with.length) {
        return responseHelper.error(res, 'Algunos productos no son válidos o no pertenecen a este restaurante', 400);
      }
    }

    // Limpiar campos de texto
    if (updates.name) updates.name = updates.name.trim();
    if (updates.description) updates.description = updates.description.trim();

    const updatedTopping = await Topping.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    )
    .populate('restaurant_id', 'name')
    .populate('tags', 'name')
    .populate('compatible_with', 'name')
    .populate('created_by', 'name email');

    return responseHelper.success(res, updatedTopping, 'Topping actualizado exitosamente');
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return responseHelper.validationError(res, errors);
    }

    return responseHelper.error(res, 'Error al actualizar topping', 500);
  }
};

// Eliminar topping (hard delete)
const deleteTopping = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    // Obtener topping actual
    const topping = await Topping.findById(id).populate('restaurant_id');
    if (!topping) {
      return responseHelper.error(res, 'Topping no encontrado', 404);
    }

    // Verificar permisos
    if (user.role === 'owner' && topping.restaurant_id.owner_id.toString() !== user._id.toString()) {
      return responseHelper.error(res, 'No tienes permisos para eliminar este topping', 403);
    }

    await Topping.findByIdAndDelete(id);

    return responseHelper.success(res, null, 'Topping eliminado exitosamente');
  } catch (error) {
    return responseHelper.error(res, 'Error al eliminar topping', 500);
  }
};

module.exports = {
  createTopping,
  getToppingsByRestaurant,
  getAllToppings,
  getToppingById,
  updateTopping,
  deleteTopping
};