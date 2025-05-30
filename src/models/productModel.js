const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: [true, 'El ID del restaurante es obligatorio']
  },
  name: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio'],
    trim: true,
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true,
    maxlength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'La categoría es obligatoria']
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
  },
  image: {
    type: String,
    default: function() {
      return `https://placehold.co/600x400?text=${encodeURIComponent(this.name)}`;
    }
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  compatible_toppings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topping'
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
  preparation_time: {
    type: Number,
    min: [1, 'El tiempo de preparación debe ser al menos 1 minuto'],
    max: [180, 'El tiempo de preparación no puede exceder 180 minutos'],
    default: 15
  },
  is_available: {
    type: Boolean,
    default: true
  },
  is_featured: {
    type: Boolean,
    default: false
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

// Índice compuesto para evitar productos duplicados por restaurante
productSchema.index({ restaurant_id: 1, name: 1 }, { unique: true });

// Índices para búsquedas y filtros comunes
productSchema.index({ restaurant_id: 1, category_id: 1 });
productSchema.index({ restaurant_id: 1, is_available: 1 });
productSchema.index({ restaurant_id: 1, is_featured: 1 });
productSchema.index({ price: 1 });

// Middleware para generar imagen automáticamente si no se proporciona
productSchema.pre('save', function(next) {
  if (!this.image) {
    this.image = `https://placehold.co/600x400?text=${encodeURIComponent(this.name)}`;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);