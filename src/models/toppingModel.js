const mongoose = require('mongoose');

const toppingSchema = new mongoose.Schema({
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: [true, 'El ID del restaurante es obligatorio']
  },
  name: {
    type: String,
    required: [true, 'El nombre del topping es obligatorio'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true,
    maxlength: [300, 'La descripción no puede exceder 300 caracteres']
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  compatible_with: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  nutritional_info: {
    calories: {
      type: Number,
      min: [0, 'Las calorías no pueden ser negativas'],
      default: null
    },
    protein: {
      type: Number,
      min: [0, 'Las proteínas no pueden ser negativas'],
      default: null
    },
    carbs: {
      type: Number,
      min: [0, 'Los carbohidratos no pueden ser negativos'],
      default: null
    },
    fat: {
      type: Number,
      min: [0, 'Las grasas no pueden ser negativas'],
      default: null
    },
    fiber: {
      type: Number,
      min: [0, 'La fibra no puede ser negativa'],
      default: null
    }
  },
  is_available: {
    type: Boolean,
    default: true
  },
  stock_quantity: {
    type: Number,
    min: [0, 'El stock no puede ser negativo'],
    default: 0
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El usuario creador es obligatorio']
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Índice compuesto para evitar toppings duplicados por restaurante
toppingSchema.index({ restaurant_id: 1, name: 1 }, { unique: true });

// Índices para búsquedas y filtros comunes
toppingSchema.index({ restaurant_id: 1, is_available: 1 });
toppingSchema.index({ price: 1 });

module.exports = mongoose.model('Topping', toppingSchema);