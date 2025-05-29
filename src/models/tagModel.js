const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: [true, 'El ID del restaurante es obligatorio']
  },
  name: {
    type: String,
    required: [true, 'El nombre del tag es obligatorio'],
    trim: true,
    maxlength: [30, 'El nombre no puede exceder 30 caracteres']
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El usuario creador es obligatorio']
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Índice compuesto para evitar tags duplicados por restaurante
tagSchema.index({ restaurant_id: 1, name: 1 }, { unique: true });

// Índice para búsquedas rápidas
tagSchema.index({ restaurant_id: 1, is_active: 1 });

module.exports = mongoose.model('Tag', tagSchema);