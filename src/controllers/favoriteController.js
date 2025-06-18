const User = require('../models/userModel');
const Restaurant = require('../models/restaurantModel');
const Product = require('../models/productModel');
const responseHelper = require('../utils/responseHelper');

// Agregar restaurante a favoritos
const addRestaurantToFavorites = async (req, res) => {
  try {
    const { user_id, restaurant_id } = req.body;

    // Verificar que el restaurante existe
    const restaurant = await Restaurant.findById(restaurant_id);
    if (!restaurant) {
      return responseHelper.error(res, 'Restaurante no encontrado', 404);
    }

    // Agregar a favoritos (evita duplicados con $addToSet)
    const user = await User.findByIdAndUpdate(
      user_id,
      { $addToSet: { favorite_restaurants: restaurant_id } },
      { new: true }
    ).populate('favorite_restaurants', 'name banner');

    return responseHelper.success(res, user.favorite_restaurants, 'Restaurante agregado a favoritos');
  } catch (error) {
    return responseHelper.error(res, 'Error al agregar a favoritos', 500);
  }
};

// Remover restaurante de favoritos
const removeRestaurantFromFavorites = async (req, res) => {
  try {
    const { restaurant_id } = req.params;
    const { user_id } = req.body;

    const user = await User.findByIdAndUpdate(
      user_id,
      { $pull: { favorite_restaurants: restaurant_id } },
      { new: true }
    ).populate('favorite_restaurants', 'name banner');

    return responseHelper.success(res, user.favorite_restaurants, 'Restaurante removido de favoritos');
  } catch (error) {
    return responseHelper.error(res, 'Error al remover de favoritos', 500);
  }
};

// Agregar producto a favoritos
const addProductToFavorites = async (req, res) => {
  try {
    const { user_id, restaurant_id, product_id } = req.body;

    // Verificar que el producto existe
    const product = await Product.findById(product_id);
    if (!product) {
      return responseHelper.error(res, 'Producto no encontrado', 404);
    }

    // Verificar que no esté ya en favoritos
    const user = await User.findById(user_id);
    const alreadyFavorite = user.favorite_products.some(
      fp => fp.product_id.toString() === product_id
    );

    if (alreadyFavorite) {
      return responseHelper.error(res, 'Producto ya está en favoritos', 400);
    }

    // Agregar a favoritos
    await User.findByIdAndUpdate(
      user_id,
      { 
        $push: { 
          favorite_products: { 
            restaurant_id, 
            product_id 
          } 
        } 
      }
    );

    return responseHelper.success(res, null, 'Producto agregado a favoritos');
  } catch (error) {
    return responseHelper.error(res, 'Error al agregar producto a favoritos', 500);
  }
};

// Remover producto de favoritos
const removeProductFromFavorites = async (req, res) => {
  try {
    const { product_id } = req.params;
    const { user_id } = req.body;

    await User.findByIdAndUpdate(
      user_id,
      { $pull: { favorite_products: { product_id } } }
    );

    return responseHelper.success(res, null, 'Producto removido de favoritos');
  } catch (error) {
    return responseHelper.error(res, 'Error al remover producto de favoritos', 500);
  }
};

// Obtener favoritos del usuario
const getUserFavorites = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await User.findById(user_id)
      .populate('favorite_restaurants', 'name description banner contact address')
      .populate({
        path: 'favorite_products.restaurant_id',
        select: 'name'
      })
      .populate({
        path: 'favorite_products.product_id',
        select: 'name description price image'
      });

    if (!user) {
      return responseHelper.error(res, 'Usuario no encontrado', 404);
    }

    const favorites = {
      restaurants: user.favorite_restaurants,
      products: user.favorite_products
    };

    return responseHelper.success(res, favorites, 'Favoritos obtenidos exitosamente');
  } catch (error) {
    return responseHelper.error(res, 'Error al obtener favoritos', 500);
  }
};

module.exports = {
  addRestaurantToFavorites,
  removeRestaurantFromFavorites,
  addProductToFavorites,
  removeProductFromFavorites,
  getUserFavorites
};