const express = require('express');
const router = express.Router();
const { 
  addRestaurantToFavorites,
  removeRestaurantFromFavorites,
  addProductToFavorites,
  removeProductFromFavorites,
  getUserFavorites
} = require('../controllers/favoriteController');
const { isOwnerOrSelf } = require('../middleware/roleMiddleware');

// Restaurantes favoritos
router.post('/restaurants', addRestaurantToFavorites);
router.delete('/restaurants/:restaurant_id', removeRestaurantFromFavorites);

// Productos favoritos
router.post('/products', addProductToFavorites);
router.delete('/products/:product_id', removeProductFromFavorites);

// Obtener favoritos del usuario
router.get('/user/:user_id', isOwnerOrSelf, getUserFavorites);

module.exports = router;