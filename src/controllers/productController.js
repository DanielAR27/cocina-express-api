const Product = require('../models/productModel');
const Restaurant = require('../models/restaurantModel');
const Category = require('../models/categoryModel');
const Tag = require('../models/tagModel');
const responseHelper = require('../utils/responseHelper');

// Crear nuevo producto
const createProduct = async (req, res) => {
  try {
    const { 
      restaurant_id, 
      name, 
      description, 
      category_id, 
      price,
      image,
      tags,
      nutritional_info,
      preparation_time,
      is_available,
      is_featured,
      stock_quantity
    } = req.body;
    const user = req.user;

    // Validaciones básicas
    if (!restaurant_id || !name || !description || !category_id || price === undefined) {
      return responseHelper.error(res, 'Restaurante, nombre, descripción, categoría y precio son obligatorios', 400);
    }

    // Verificar que el restaurante existe
    const restaurant = await Restaurant.findById(restaurant_id);
    if (!restaurant) {
      return responseHelper.error(res, 'Restaurante no encontrado', 404);
    }

    // Verificar permisos: admin puede crear para cualquier restaurante, owner solo para los suyos
    if (user.role === 'owner' && restaurant.owner_id.toString() !== user._id.toString()) {
      return responseHelper.error(res, 'No tienes permisos para crear productos en este restaurante', 403);
    }

    // Verificar que la categoría existe y pertenece al mismo restaurante
    const category = await Category.findOne({ 
      _id: category_id, 
      restaurant_id: restaurant_id 
    });
    if (!category) {
      return responseHelper.error(res, 'Categoría no encontrada o no pertenece a este restaurante', 404);
    }

    // Verificar que no exista ya un producto con el mismo nombre en el restaurante
    const existingProduct = await Product.findOne({
      restaurant_id,
      name: { $regex: new RegExp('^' + name.trim() + '$', 'i') }
    });
    if (existingProduct) {
      return responseHelper.error(res, 'Ya existe un producto con ese nombre en este restaurante', 400);
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

    // Crear nuevo producto
    const product = new Product({
      restaurant_id,
      name: name.trim(),
      description: description.trim(),
      category_id,
      price,
      image,
      tags: tags || [],
      nutritional_info: nutritional_info || {},
      preparation_time: preparation_time || 15,
      is_available: is_available !== undefined ? is_available : true,
      is_featured: is_featured || false,
      stock_quantity: stock_quantity || 0,
      created_by: user._id
    });

    await product.save();
    await product.populate([
      { path: 'restaurant_id', select: 'name' },
      { path: 'category_id', select: 'name' },
      { path: 'tags', select: 'name' },
      { path: 'created_by', select: 'name email' }
    ]);

    return responseHelper.success(res, product, 'Producto creado exitosamente', 201);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return responseHelper.validationError(res, errors);
    }

    if (error.code === 11000) {
      return responseHelper.error(res, 'Ya existe un producto con ese nombre en este restaurante', 400);
    }

    return responseHelper.error(res, 'Error al crear producto', 500);
  }
};

// Obtener productos por restaurante (público)
const getProductsByRestaurant = async (req, res) => {
  try {
    const { restaurant_id } = req.params;
    const { category_id, is_available, is_featured, min_price, max_price } = req.query;

    // Verificar que el restaurante existe
    const restaurant = await Restaurant.findById(restaurant_id);
    if (!restaurant) {
      return responseHelper.error(res, 'Restaurante no encontrado', 404);
    }

    // Construir filtros
    let filter = { restaurant_id };
    
    if (category_id) filter.category_id = category_id;
    if (is_available !== undefined) filter.is_available = is_available === 'true';
    if (is_featured !== undefined) filter.is_featured = is_featured === 'true';
    
    if (min_price || max_price) {
      filter.price = {};
      if (min_price) filter.price.$gte = parseFloat(min_price);
      if (max_price) filter.price.$lte = parseFloat(max_price);
    }

    const products = await Product.find(filter)
      .populate('category_id', 'name')
      .populate('tags', 'name')
      .populate('created_by', 'name')
      .sort({ is_featured: -1, category_id: 1, name: 1 });

    return responseHelper.success(res, products, 'Productos obtenidos exitosamente');
  } catch (error) {
    return responseHelper.error(res, 'Error al obtener productos', 500);
  }
};

// Obtener todos los productos (admin) o por owner (owner)
const getAllProducts = async (req, res) => {
  try {
    const user = req.user;
    let filter = {};

    // Si es owner, solo sus restaurantes
    if (user.role === 'owner') {
      const restaurants = await Restaurant.find({ owner_id: user._id }).select('_id');
      const restaurantIds = restaurants.map(r => r._id);
      filter.restaurant_id = { $in: restaurantIds };
    }

    const products = await Product.find(filter)
      .populate('restaurant_id', 'name')
      .populate('category_id', 'name')
      .populate('tags', 'name')
      .populate('created_by', 'name email')
      .sort({ restaurant_id: 1, category_id: 1, name: 1 });

    return responseHelper.success(res, products, 'Productos obtenidos exitosamente');
  } catch (error) {
    return responseHelper.error(res, 'Error al obtener productos', 500);
  }
};

// Obtener producto por ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id)
      .populate('restaurant_id', 'name')
      .populate('category_id', 'name')
      .populate('tags', 'name')
      .populate('created_by', 'name email');

    if (!product) {
      return responseHelper.error(res, 'Producto no encontrado', 404);
    }

    return responseHelper.success(res, product, 'Producto encontrado');
  } catch (error) {
    return responseHelper.error(res, 'Error al obtener producto', 500);
  }
};

// Actualizar producto
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = req.user;

    // Obtener producto actual
    const product = await Product.findById(id).populate('restaurant_id');
    if (!product) {
      return responseHelper.error(res, 'Producto no encontrado', 404);
    }

    // Verificar permisos
    if (user.role === 'owner' && product.restaurant_id.owner_id.toString() !== user._id.toString()) {
      return responseHelper.error(res, 'No tienes permisos para editar este producto', 403);
    }

    // No permitir cambiar restaurant_id ni created_by
    delete updates.restaurant_id;
    delete updates.created_by;

    // Verificar nombre único si se está cambiando
    if (updates.name && updates.name.trim() !== product.name) {
      const existingProduct = await Product.findOne({
        restaurant_id: product.restaurant_id._id,
        name: { $regex: new RegExp('^' + updates.name.trim() + '$', 'i') },
        _id: { $ne: id }
      });

      if (existingProduct) {
        return responseHelper.error(res, 'Ya existe otro producto con ese nombre en este restaurante', 400);
      }
    }

    // Verificar categoría si se está cambiando
    if (updates.category_id) {
      const category = await Category.findOne({ 
        _id: updates.category_id, 
        restaurant_id: product.restaurant_id._id 
      });
      if (!category) {
        return responseHelper.error(res, 'Categoría no encontrada o no pertenece a este restaurante', 404);
      }
    }

    // Verificar tags si se están cambiando
    if (updates.tags && updates.tags.length > 0) {
      const validTags = await Tag.find({
        _id: { $in: updates.tags },
        restaurant_id: product.restaurant_id._id
      });
      if (validTags.length !== updates.tags.length) {
        return responseHelper.error(res, 'Algunos tags no son válidos o no pertenecen a este restaurante', 400);
      }
    }

    // Limpiar campos de texto
    if (updates.name) updates.name = updates.name.trim();
    if (updates.description) updates.description = updates.description.trim();

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    )
    .populate('restaurant_id', 'name')
    .populate('category_id', 'name')
    .populate('tags', 'name')
    .populate('created_by', 'name email');

    return responseHelper.success(res, updatedProduct, 'Producto actualizado exitosamente');
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return responseHelper.validationError(res, errors);
    }

    return responseHelper.error(res, 'Error al actualizar producto', 500);
  }
};

// Eliminar producto (hard delete)
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    // Obtener producto actual
    const product = await Product.findById(id).populate('restaurant_id');
    if (!product) {
      return responseHelper.error(res, 'Producto no encontrado', 404);
    }

    // Verificar permisos
    if (user.role === 'owner' && product.restaurant_id.owner_id.toString() !== user._id.toString()) {
      return responseHelper.error(res, 'No tienes permisos para eliminar este producto', 403);
    }

    await Product.findByIdAndDelete(id);

    return responseHelper.success(res, null, 'Producto eliminado exitosamente');
  } catch (error) {
    return responseHelper.error(res, 'Error al eliminar producto', 500);
  }
};

// Buscar productos por nombre (público)
const searchProducts = async (req, res) => {
  try {
    const { q, restaurant_id } = req.query;

    if (!q || q.trim().length < 2) {
      return responseHelper.error(res, 'La búsqueda debe tener al menos 2 caracteres', 400);
    }

    let filter = {
      name: { $regex: q.trim(), $options: 'i' },
      is_available: true
    };

    if (restaurant_id) {
      filter.restaurant_id = restaurant_id;
    }

    const products = await Product.find(filter)
      .populate('restaurant_id', 'name')
      .populate('category_id', 'name')
      .populate('tags', 'name')
      .limit(20)
      .sort({ is_featured: -1, name: 1 });

    return responseHelper.success(res, products, 'Productos encontrados');
  } catch (error) {
    return responseHelper.error(res, 'Error en la búsqueda', 500);
  }
};

module.exports = {
  createProduct,
  getProductsByRestaurant,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts
};