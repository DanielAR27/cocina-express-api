const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  google_id: {
    type: String,
    required: [true, 'Google ID es obligatorio'],
    unique: true
  },
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: false,
    trim: true,
    default: null
  },
  role: {
    type: String,
    enum: ['admin', 'owner', 'customer'],
    default: 'customer'
  },
  profile_image: {
    type: String,
    default: 'https://placehold.co/400x400?text=Usuario'
  },
  address: {
    street: {
      type: String,
      required: false, // Usuario completa después
      default: null
    },
    city: {
      type: String,
      required: false,
      default: null
    },
    province: {
      type: String,
      required: false,
      default: null
    },
    postal_code: {
      type: String,
      required: false,
      default: null
    }
  },
  favorite_restaurants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  }],
  favorite_products: [{
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    }
  }],
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('User', userSchema);