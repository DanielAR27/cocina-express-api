const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del restaurante es obligatorio'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true
  },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El propietario es obligatorio']
  },
  banner: {
    type: String,
    default: function() {
      return `https://placehold.co/800x300?text=${encodeURIComponent(this.name)}`;
    }
  },
  restaurant_tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RestaurantTag'  // ← Cambiar de 'Tag' a 'RestaurantTag'
  }],
  contact: {
    phone: {
      type: String,
      required: [true, 'El teléfono es obligatorio'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      lowercase: true,
      trim: true
    }
  },
  address: {
    street: {
      type: String,
      required: [true, 'La dirección es obligatoria'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'La ciudad es obligatoria'],
      trim: true
    },
    province: {
      type: String,
      required: [true, 'La provincia es obligatoria'],
      trim: true
    }
  },
  business_hours: {
    monday: {
      open: { type: String, default: null },
      close: { type: String, default: null },
      closed: { type: Boolean, default: false }
    },
    tuesday: {
      open: { type: String, default: null },
      close: { type: String, default: null },
      closed: { type: Boolean, default: false }
    },
    wednesday: {
      open: { type: String, default: null },
      close: { type: String, default: null },
      closed: { type: Boolean, default: false }
    },
    thursday: {
      open: { type: String, default: null },
      close: { type: String, default: null },
      closed: { type: Boolean, default: false }
    },
    friday: {
      open: { type: String, default: null },
      close: { type: String, default: null },
      closed: { type: Boolean, default: false }
    },
    saturday: {
      open: { type: String, default: null },
      close: { type: String, default: null },
      closed: { type: Boolean, default: false }
    },
    sunday: {
      open: { type: String, default: null },
      close: { type: String, default: null },
      closed: { type: Boolean, default: false }
    }
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Middleware para generar banner automáticamente si no se proporciona
restaurantSchema.pre('save', function(next) {
  if (!this.banner) {
    this.banner = `https://placehold.co/800x300?text=${encodeURIComponent(this.name)}`;
  }
  next();
});

module.exports = mongoose.model('Restaurant', restaurantSchema);