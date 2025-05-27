const mongoose = require('mongoose');

const restaurantTagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del tag es obligatorio'],
    trim: true,
    unique: true,
    maxlength: [50, 'El nombre no puede exceder 50 caracteres']
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Índice para búsquedas rápidas
restaurantTagSchema.index({ name: 1, is_active: 1 });

module.exports = mongoose.model('RestaurantTag', restaurantTagSchema);