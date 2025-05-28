const Restaurant = require('../models/restaurantModel');
const responseHelper = require('../utils/responseHelper');

// Crear nuevo restaurante
const createRestaurant = async (req, res) => {
  try {
    const { 
      name, 
      description, 
      owner_id, 
      banner,
      restaurant_tags,
      contact,
      address,
      business_hours 
    } = req.body;

    // Validaciones básicas
    if (!name || !description || !owner_id) {
      return responseHelper.error(res, 'Nombre, descripción y propietario son obligatorios', 400);
    }

    if (!contact || !contact.phone || !contact.email) {
      return responseHelper.error(res, 'Información de contacto (teléfono y email) es obligatoria', 400);
    }

    if (!address || !address.street || !address.city || !address.province) {
      return responseHelper.error(res, 'Dirección completa es obligatoria', 400);
    }

    // Verificar que no exista ya un restaurante con el mismo nombre
    const existingRestaurant = await Restaurant.findOne({ name: name.trim() });
    if (existingRestaurant) {
      return responseHelper.error(res, 'Ya existe un restaurante con ese nombre', 400);
    }

    // Crear nuevo restaurante
    const restaurant = new Restaurant({
      name: name.trim(),
      description: description.trim(),
      owner_id,
      banner,
      restaurant_tags: restaurant_tags || [],
      contact,
      address,
      business_hours: business_hours || {}
    });

    await restaurant.save();
    await restaurant.populate('owner_id', 'name email');
    await restaurant.populate('restaurant_tags');
    
    return responseHelper.success(res, restaurant, 'Restaurante creado exitosamente', 201);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return responseHelper.validationError(res, errors);
    }
    
    return responseHelper.error(res, 'Error al crear restaurante', 500);
  }
};

// Obtener todos los restaurantes activos
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ is_active: true })
      .populate('owner_id', 'name email')
      .populate('restaurant_tags') // ← Agregar populate para tags
      .sort({ created_at: -1 });
    
    return responseHelper.success(res, restaurants, 'Restaurantes obtenidos exitosamente');
  } catch (error) {
    return responseHelper.error(res, 'Error al obtener restaurantes', 500);
  }
};

// Obtener restaurante por ID
const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const restaurant = await Restaurant.findById(id)
      .populate('owner_id', 'name email')
      .populate('restaurant_tags');

    if (!restaurant) {
      return responseHelper.error(res, 'Restaurante no encontrado', 404);
    }

    return responseHelper.success(res, restaurant, 'Restaurante encontrado');
  } catch (error) {
    return responseHelper.error(res, 'Error al obtener restaurante', 500);
  }
};

// Obtener restaurantes por owner
const getRestaurantsByOwner = async (req, res) => {
  try {
    const { owner_id } = req.params;
    
    const restaurants = await Restaurant.find({ 
      owner_id, 
      is_active: true 
    })
    .populate('owner_id', 'name email')
    .populate('restaurant_tags') // ← Agregar populate para tags
    .sort({ created_at: -1 });
    
    return responseHelper.success(res, restaurants, 'Restaurantes del propietario obtenidos exitosamente');
  } catch (error) {
    return responseHelper.error(res, 'Error al obtener restaurantes del propietario', 500);
  }
};

// 2. ARREGLAR src/controllers/restaurantController.js - línea 74 en updateRestaurant
const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // No permitir actualizar campos críticos EXCEPTO owner_id para admins
    delete updates.created_at;
    delete updates.updated_at;
    
    // Solo admin puede cambiar owner_id
    if (updates.owner_id && req.user.role !== 'admin') {
      delete updates.owner_id;
    }
    
    const restaurant = await Restaurant.findByIdAndUpdate(id, updates, { 
      new: true, 
      runValidators: true 
    })
    .populate('owner_id', 'name email')
    .populate('restaurant_tags'); // ← Agregar populate para tags

    if (!restaurant) {
      return responseHelper.error(res, 'Restaurante no encontrado', 404);
    }

    return responseHelper.success(res, restaurant, 'Restaurante actualizado exitosamente');
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return responseHelper.validationError(res, errors);
    }
    
    return responseHelper.error(res, 'Error al actualizar restaurante', 500);
  }
};

// Desactivar restaurante (soft delete)
const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    
    const restaurant = await Restaurant.findByIdAndUpdate(id, { is_active: false }, { new: true });

    if (!restaurant) {
      return responseHelper.error(res, 'Restaurante no encontrado', 404);
    }

    return responseHelper.success(res, null, 'Restaurante desactivado exitosamente');
  } catch (error) {
    return responseHelper.error(res, 'Error al desactivar restaurante', 500);
  }
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  getRestaurantsByOwner,
  updateRestaurant,
  deleteRestaurant
};