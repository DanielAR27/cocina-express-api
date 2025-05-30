const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: [true, 'El ID del restaurante es obligatorio']
  },
  name: {
    type: String,
    required: [true, 'El nombre de la categoría es obligatorio'],
    trim: true,
    maxlength: [50, 'El nombre no puede exceder 50 caracteres']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'La descripción no puede exceder 200 caracteres'],
    default: ''
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El usuario creador es obligatorio']
  },
  order: {
    type: Number,
    default: 0,
    min: [0, 'El orden no puede ser negativo']
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Índice compuesto para evitar categorías duplicadas por restaurante
categorySchema.index({ restaurant_id: 1, name: 1 }, { unique: true });

// Índice para ordenamiento
categorySchema.index({ restaurant_id: 1, order: 1, created_at: 1 });

// Middleware pre-save para manejar el orden automáticamente
categorySchema.pre('save', async function(next) {
  if (this.isNew && this.order === 0) {
    // Si es una nueva categoría y no se especificó orden, asignar el siguiente
    const maxOrder = await this.constructor.findOne({
      restaurant_id: this.restaurant_id
    }).sort({ order: -1 }).select('order');
    
    this.order = maxOrder ? maxOrder.order + 1 : 1;
  }
  next();
});

module.exports = mongoose.model('Category', categorySchema);