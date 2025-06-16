// src/seeders/dataSeed.js
const mongoose = require('mongoose');
const User = require('../models/userModel');
const Restaurant = require('../models/restaurantModel');
const RestaurantTag = require('../models/restaurantTagModel');
const Category = require('../models/categoryModel');
const Tag = require('../models/tagModel');
const Product = require('../models/productModel');
const Topping = require('../models/toppingModel');

// Datos de ejemplo para el seeding
const seedData = {
  // Tags globales de restaurante
  restaurantTags: [
    { name: 'Italiana' },
    { name: 'Pizza' },
    { name: 'Familiar' },
    { name: 'Hamburguesas' },
    { name: 'Parrilla' },
    { name: 'Casual' },
    { name: 'Japonesa' },
    { name: 'Sushi' },
    { name: 'Saludable' },
    { name: 'Café' },
    { name: 'Desayunos' },
    { name: 'Repostería' }
  ],

  // Usuario admin para crear los datos
  adminUser: {
    google_id: 'admin_seed_user',
    name: 'Administrador Seed',
    email: 'admin@cookapp.com',
    role: 'admin'
  },

  // Datos de restaurantes
  restaurants: [
    {
      name: 'Pizzería Nonna Rosa',
      description: 'Auténtica pizza italiana con ingredientes frescos importados',
      contact: {
        phone: '2222-3456',
        email: 'info@nonnarosa.cr'
      },
      address: {
        street: 'Avenida Central 123',
        city: 'San José',
        province: 'San José'
      },
      restaurant_tags: ['Italiana', 'Pizza', 'Familiar'],
      business_hours: {
        monday: { open: '11:00', close: '22:00', closed: false },
        tuesday: { open: '11:00', close: '22:00', closed: false },
        wednesday: { open: '11:00', close: '22:00', closed: false },
        thursday: { open: '11:00', close: '22:00', closed: false },
        friday: { open: '11:00', close: '23:00', closed: false },
        saturday: { open: '11:00', close: '23:00', closed: false },
        sunday: { open: '12:00', close: '21:00', closed: false }
      }
    },
    {
      name: 'El Parrillero',
      description: 'Las mejores hamburguesas artesanales de Costa Rica',
      contact: {
        phone: '2234-5678',
        email: 'pedidos@elparrillero.cr'
      },
      address: {
        street: 'Escazú Centro, Plaza del Sol',
        city: 'Escazú',
        province: 'San José'
      },
      restaurant_tags: ['Hamburguesas', 'Parrilla', 'Casual'],
      business_hours: {
        monday: { open: '10:00', close: '22:00', closed: false },
        tuesday: { open: '10:00', close: '22:00', closed: false },
        wednesday: { open: '10:00', close: '22:00', closed: false },
        thursday: { open: '10:00', close: '22:00', closed: false },
        friday: { open: '10:00', close: '23:00', closed: false },
        saturday: { open: '10:00', close: '23:00', closed: false },
        sunday: { open: '11:00', close: '21:00', closed: false }
      }
    },
    {
      name: 'Sushi Bar Sakura',
      description: 'Sushi fresco y tradicional japonés en el corazón de San José',
      contact: {
        phone: '2245-6789',
        email: 'reservas@sakura.cr'
      },
      address: {
        street: 'Barrio Escalante, Calle 33',
        city: 'San José',
        province: 'San José'
      },
      restaurant_tags: ['Japonesa', 'Sushi', 'Saludable'],
      business_hours: {
        monday: { open: '12:00', close: '22:00', closed: false },
        tuesday: { open: '12:00', close: '22:00', closed: false },
        wednesday: { open: '12:00', close: '22:00', closed: false },
        thursday: { open: '12:00', close: '22:00', closed: false },
        friday: { open: '12:00', close: '23:00', closed: false },
        saturday: { open: '12:00', close: '23:00', closed: false },
        sunday: { closed: true }
      }
    },
    {
      name: 'Café del Volcán',
      description: 'Café gourmet costarricense con repostería artesanal',
      contact: {
        phone: '2256-7890',
        email: 'hola@cafedelvolcan.cr'
      },
      address: {
        street: 'Cartago Centro, Avenida 2',
        city: 'Cartago',
        province: 'Cartago'
      },
      restaurant_tags: ['Café', 'Desayunos', 'Repostería'],
      business_hours: {
        monday: { open: '06:00', close: '20:00', closed: false },
        tuesday: { open: '06:00', close: '20:00', closed: false },
        wednesday: { open: '06:00', close: '20:00', closed: false },
        thursday: { open: '06:00', close: '20:00', closed: false },
        friday: { open: '06:00', close: '21:00', closed: false },
        saturday: { open: '07:00', close: '21:00', closed: false },
        sunday: { open: '07:00', close: '19:00', closed: false }
      }
    }
  ],

  // Categorías por restaurante
  categories: {
    'Pizzería Nonna Rosa': [
      { name: 'Pizzas Clásicas', description: 'Las pizzas tradicionales de siempre' },
      { name: 'Pizzas Gourmet', description: 'Pizzas con ingredientes premium' },
      { name: 'Entradas', description: 'Para comenzar tu experiencia italiana' },
      { name: 'Bebidas', description: 'Refrescos y bebidas italianas' },
      { name: 'Postres', description: 'Dulces tradicionales italianos' }
    ],
    'El Parrillero': [
      { name: 'Hamburguesas Clásicas', description: 'Las favoritas de toda la vida' },
      { name: 'Hamburguesas Premium', description: 'Con ingredientes gourmet' },
      { name: 'Acompañamientos', description: 'Papas y más' },
      { name: 'Bebidas', description: 'Refrescos y malteadas' },
      { name: 'Postres', description: 'Para terminar perfecto' }
    ],
    'Sushi Bar Sakura': [
      { name: 'Makis', description: 'Rollos tradicionales japoneses' },
      { name: 'Nigiris', description: 'Pescado fresco sobre arroz' },
      { name: 'Sashimis', description: 'Pescado puro sin arroz' },
      { name: 'Entradas', description: 'Aperitivos japoneses' },
      { name: 'Bebidas', description: 'Té y bebidas japonesas' }
    ],
    'Café del Volcán': [
      { name: 'Cafés Especiales', description: 'Nuestros mejores granos' },
      { name: 'Desayunos', description: 'Para empezar el día bien' },
      { name: 'Repostería', description: 'Dulces hechos en casa' },
      { name: 'Bebidas Frías', description: 'Frappés y smoothies' },
      { name: 'Almuerzos Ligeros', description: 'Opciones saludables' }
    ]
  },

  // Tags específicos por restaurante
  restaurantSpecificTags: {
    'Pizzería Nonna Rosa': ['Vegetariano', 'Picante', 'Familiar', 'Clásico', 'Gourmet'],
    'El Parrillero': ['Picante', 'XXL', 'Clásico', 'Premium', 'Sin gluten'],
    'Sushi Bar Sakura': ['Pescado crudo', 'Vegetariano', 'Picante', 'Tradicional', 'Especial'],
    'Café del Volcán': ['Orgánico', 'Descafeinado', 'Dulce', 'Vegano', 'Sin azúcar']
  },

  // Productos detallados
  products: {
    'Pizzería Nonna Rosa': {
      'Pizzas Clásicas': [
        {
          name: 'Pizza Margarita',
          description: 'Pizza clásica con salsa de tomate, mozzarella fresca y albahaca',
          price: 4500,
          base_ingredients: ['Masa de pizza', 'Salsa de tomate', 'Mozzarella', 'Albahaca fresca', 'Aceite de oliva'],
          preparation_time: 20,
          nutritional_info: { calories: 320, protein: 15, carbs: 35, fat: 12, fiber: 3 },
          tags: ['Clásico', 'Vegetariano'],
          is_featured: true
        },
        {
          name: 'Pizza Pepperoni',
          description: 'Pizza tradicional con pepperoni y mozzarella',
          price: 5200,
          base_ingredients: ['Masa de pizza', 'Salsa de tomate', 'Mozzarella', 'Pepperoni'],
          preparation_time: 22,
          nutritional_info: { calories: 380, protein: 18, carbs: 33, fat: 18, fiber: 2 },
          tags: ['Clásico', 'Familiar']
        },
        {
          name: 'Pizza Hawaiana',
          description: 'Pizza con jamón, piña y mozzarella',
          price: 5800,
          base_ingredients: ['Masa de pizza', 'Salsa de tomate', 'Mozzarella', 'Jamón', 'Piña'],
          preparation_time: 25,
          nutritional_info: { calories: 350, protein: 16, carbs: 38, fat: 14, fiber: 3 },
          tags: ['Familiar']
        }
      ],
      'Pizzas Gourmet': [
        {
          name: 'Pizza Quattro Formaggi',
          description: 'Pizza de cuatro quesos: mozzarella, gorgonzola, parmesano y ricotta',
          price: 6500,
          base_ingredients: ['Masa de pizza', 'Salsa blanca', 'Mozzarella', 'Gorgonzola', 'Parmesano', 'Ricotta'],
          preparation_time: 25,
          nutritional_info: { calories: 420, protein: 22, carbs: 30, fat: 24, fiber: 2 },
          tags: ['Gourmet', 'Vegetariano'],
          is_featured: true
        },
        {
          name: 'Pizza Prosciutto e Rúcula',
          description: 'Pizza con prosciutto, rúcula fresca y parmesano',
          price: 7200,
          base_ingredients: ['Masa de pizza', 'Salsa de tomate', 'Mozzarella', 'Prosciutto', 'Rúcula', 'Parmesano'],
          preparation_time: 28,
          nutritional_info: { calories: 450, protein: 25, carbs: 32, fat: 26, fiber: 3 },
          tags: ['Gourmet']
        }
      ]
    },
    'El Parrillero': {
      'Hamburguesas Clásicas': [
        {
          name: 'Hamburguesa Clásica',
          description: 'Carne de res, lechuga, tomate, cebolla y salsa especial',
          price: 3800,
          base_ingredients: ['Pan de hamburguesa', 'Carne de res 150g', 'Lechuga', 'Tomate', 'Cebolla', 'Salsa especial'],
          preparation_time: 15,
          nutritional_info: { calories: 520, protein: 25, carbs: 42, fat: 28, fiber: 4 },
          tags: ['Clásico'],
          is_featured: true
        },
        {
          name: 'Hamburguesa con Queso',
          description: 'Nuestra clásica con queso cheddar derretido',
          price: 4200,
          base_ingredients: ['Pan de hamburguesa', 'Carne de res 150g', 'Queso cheddar', 'Lechuga', 'Tomate', 'Cebolla'],
          preparation_time: 15,
          nutritional_info: { calories: 580, protein: 28, carbs: 43, fat: 32, fiber: 4 },
          tags: ['Clásico']
        },
        {
          name: 'Hamburguesa BBQ',
          description: 'Con salsa barbacoa, cebolla caramelizada y aros de cebolla',
          price: 4800,
          base_ingredients: ['Pan de hamburguesa', 'Carne de res 150g', 'Salsa BBQ', 'Cebolla caramelizada', 'Aros de cebolla'],
          preparation_time: 18,
          nutritional_info: { calories: 620, protein: 26, carbs: 48, fat: 34, fiber: 5 },
          tags: ['Clásico']
        }
      ],
      'Hamburguesas Premium': [
        {
          name: 'Hamburguesa Gourmet',
          description: 'Carne Angus, queso brie, rúcula y cebolla morada',
          price: 6200,
          base_ingredients: ['Pan brioche', 'Carne Angus 200g', 'Queso brie', 'Rúcula', 'Cebolla morada', 'Mayonesa de ajo'],
          preparation_time: 22,
          nutritional_info: { calories: 680, protein: 32, carbs: 38, fat: 42, fiber: 4 },
          tags: ['Premium', 'Gourmet'],
          is_featured: true
        },
        {
          name: 'Hamburguesa del Chef',
          description: 'Doble carne, bacon, queso suizo y salsa secreta',
          price: 7500,
          base_ingredients: ['Pan artesanal', 'Doble carne 300g', 'Bacon', 'Queso suizo', 'Salsa secreta', 'Tomate', 'Lechuga'],
          preparation_time: 25,
          nutritional_info: { calories: 820, protein: 45, carbs: 40, fat: 52, fiber: 5 },
          tags: ['Premium', 'XXL']
        }
      ]
    },
    'Sushi Bar Sakura': {
      'Makis': [
        {
          name: 'California Roll',
          description: 'Cangrejo, aguacate y pepino con sésamo',
          price: 3200,
          base_ingredients: ['Arroz sushi', 'Nori', 'Cangrejo', 'Aguacate', 'Pepino', 'Sésamo', 'Mayonesa'],
          preparation_time: 12,
          nutritional_info: { calories: 250, protein: 12, carbs: 30, fat: 8, fiber: 2 },
          tags: ['Tradicional'],
          is_featured: true
        },
        {
          name: 'Philadelphia Roll',
          description: 'Salmón, queso crema y aguacate',
          price: 3800,
          base_ingredients: ['Arroz sushi', 'Nori', 'Salmón fresco', 'Queso crema', 'Aguacate'],
          preparation_time: 15,
          nutritional_info: { calories: 280, protein: 15, carbs: 28, fat: 12, fiber: 3 },
          tags: ['Especial']
        },
        {
          name: 'Spicy Tuna Roll',
          description: 'Atún picante con pepino y sésamo',
          price: 4200,
          base_ingredients: ['Arroz sushi', 'Nori', 'Atún fresco', 'Salsa picante', 'Pepino', 'Sésamo'],
          preparation_time: 12,
          nutritional_info: { calories: 260, protein: 18, carbs: 26, fat: 9, fiber: 2 },
          tags: ['Picante', 'Pescado crudo']
        }
      ],
      'Nigiris': [
        {
          name: 'Nigiri de Salmón',
          description: 'Salmón fresco sobre arroz sazonado (2 piezas)',
          price: 2800,
          base_ingredients: ['Arroz sushi', 'Salmón fresco', 'Wasabi'],
          preparation_time: 8,
          nutritional_info: { calories: 180, protein: 12, carbs: 20, fat: 6, fiber: 1 },
          tags: ['Tradicional', 'Pescado crudo'],
          is_featured: true
        },
        {
          name: 'Nigiri de Atún',
          description: 'Atún fresco sobre arroz sazonado (2 piezas)',
          price: 3200,
          base_ingredients: ['Arroz sushi', 'Atún fresco', 'Wasabi'],
          preparation_time: 8,
          nutritional_info: { calories: 190, protein: 14, carbs: 18, fat: 7, fiber: 1 },
          tags: ['Tradicional', 'Pescado crudo']
        }
      ]
    },
    'Café del Volcán': {
      'Cafés Especiales': [
        {
          name: 'Café Tarrazú',
          description: 'Café premium de las montañas de Tarrazú',
          price: 1800,
          base_ingredients: ['Café Tarrazú molido', 'Agua filtrada'],
          preparation_time: 5,
          nutritional_info: { calories: 5, protein: 0, carbs: 1, fat: 0, fiber: 0 },
          tags: ['Orgánico'],
          is_featured: true
        },
        {
          name: 'Capuchino Especial',
          description: 'Espresso con leche vaporizada y canela',
          price: 2200,
          base_ingredients: ['Café espresso', 'Leche', 'Canela', 'Azúcar'],
          preparation_time: 8,
          nutritional_info: { calories: 120, protein: 6, carbs: 12, fat: 5, fiber: 0 },
          tags: ['Dulce']
        },
        {
          name: 'Latte Vainilla',
          description: 'Espresso con leche y jarabe de vainilla',
          price: 2500,
          base_ingredients: ['Café espresso', 'Leche', 'Jarabe de vainilla'],
          preparation_time: 8,
          nutritional_info: { calories: 150, protein: 7, carbs: 18, fat: 6, fiber: 0 },
          tags: ['Dulce']
        }
      ],
      'Desayunos': [
        {
          name: 'Desayuno Típico',
          description: 'Gallo pinto, huevos, plátano maduro, queso y café',
          price: 3500,
          base_ingredients: ['Gallo pinto', 'Huevos', 'Plátano maduro', 'Queso blanco', 'Café'],
          preparation_time: 15,
          nutritional_info: { calories: 450, protein: 20, carbs: 55, fat: 15, fiber: 8 },
          tags: ['Orgánico'],
          is_featured: true
        },
        {
          name: 'Tostadas Francesas',
          description: 'Pan francés con miel, mantequilla y frutas',
          price: 2800,
          base_ingredients: ['Pan francés', 'Huevos', 'Leche', 'Miel', 'Mantequilla', 'Frutas frescas'],
          preparation_time: 12,
          nutritional_info: { calories: 380, protein: 12, carbs: 45, fat: 18, fiber: 4 },
          tags: ['Dulce']
        }
      ]
    }
  },

  // Toppings por restaurante
  toppings: {
    'Pizzería Nonna Rosa': [
      { name: 'Mozzarella Extra', description: 'Doble porción de mozzarella', price: 800 },
      { name: 'Pepperoni', description: 'Pepperoni italiano', price: 1200 },
      { name: 'Champiñones', description: 'Champiñones frescos', price: 600 },
      { name: 'Pimientos', description: 'Pimientos rojos y verdes', price: 500 },
      { name: 'Aceitunas', description: 'Aceitunas negras', price: 400 },
      { name: 'Jamón', description: 'Jamón cocido', price: 1000 },
      { name: 'Piña', description: 'Piña fresca en cubos', price: 300 },
      { name: 'Cebolla', description: 'Cebolla morada', price: 200 },
      { name: 'Albahaca Fresca', description: 'Hojas de albahaca', price: 300 },
      { name: 'Prosciutto', description: 'Prosciutto importado', price: 1800 }
    ],
    'El Parrillero': [
      { name: 'Queso Cheddar', description: 'Queso cheddar derretido', price: 500 },
      { name: 'Bacon', description: 'Bacon crujiente', price: 800 },
      { name: 'Cebolla Caramelizada', description: 'Cebolla dulce caramelizada', price: 400 },
      { name: 'Aguacate', description: 'Aguacate fresco', price: 600 },
      { name: 'Jalapeños', description: 'Jalapeños en escabeche', price: 300 },
      { name: 'Aros de Cebolla', description: 'Aros de cebolla empanizados', price: 500 },
      { name: 'Queso Suizo', description: 'Queso suizo derretido', price: 600 },
      { name: 'Salsa BBQ', description: 'Salsa barbacoa casera', price: 200 },
      { name: 'Champiñones', description: 'Champiñones salteados', price: 400 },
      { name: 'Tomate Extra', description: 'Tomate fresco extra', price: 200 }
    ],
    'Sushi Bar Sakura': [
      { name: 'Salmón Extra', description: 'Porción adicional de salmón', price: 1500 },
      { name: 'Aguacate', description: 'Aguacate fresco', price: 600 },
      { name: 'Pepino', description: 'Pepino japonés', price: 300 },
      { name: 'Sésamo', description: 'Semillas de sésamo', price: 200 },
      { name: 'Queso Crema', description: 'Queso crema Philadelphia', price: 400 },
      { name: 'Tempura', description: 'Vegetales en tempura', price: 800 },
      { name: 'Wasabi', description: 'Wasabi fresco', price: 100 },
      { name: 'Jengibre', description: 'Jengibre encurtido', price: 100 },
      { name: 'Mayonesa Picante', description: 'Mayonesa con sriracha', price: 300 },
      { name: 'Algas Wakame', description: 'Ensalada de algas', price: 500 }
    ],
    'Café del Volcán': [
      { name: 'Shot Extra', description: 'Shot adicional de espresso', price: 400 },
      { name: 'Leche de Almendra', description: 'Sustituto de leche', price: 300 },
      { name: 'Jarabe de Vainilla', description: 'Endulzante sabor vainilla', price: 200 },
      { name: 'Jarabe de Caramelo', description: 'Endulzante sabor caramelo', price: 200 },
      { name: 'Crema Batida', description: 'Crema batida fresca', price: 300 },
      { name: 'Canela', description: 'Canela en polvo', price: 100 },
      { name: 'Miel', description: 'Miel natural', price: 200 },
      { name: 'Chocolate Extra', description: 'Chocolate en polvo', price: 300 },
      { name: 'Leche Descremada', description: 'Opción baja en grasa', price: 0 },
      { name: 'Azúcar Brown', description: 'Azúcar morena', price: 50 }
    ]
  }
};

// Función principal de seeding
async function seedDatabase() {
  try {
    console.log('🌱 Iniciando seeding de la base de datos...');

    // 1. Limpiar base de datos (opcional - comentar si no quieres borrar datos existentes)
    console.log('🧹 Limpiando base de datos...');
    await Promise.all([
      User.deleteMany({}),
      Restaurant.deleteMany({}),
      RestaurantTag.deleteMany({}),
      Category.deleteMany({}),
      Tag.deleteMany({}),
      Product.deleteMany({}),
      Topping.deleteMany({})
    ]);

    // 2. Crear usuario admin
    console.log('👤 Creando usuario administrador...');
    const adminUser = await User.create(seedData.adminUser);

    // 3. Crear restaurant tags globales
    console.log('🏷️ Creando tags globales de restaurante...');
    const restaurantTagDocs = await RestaurantTag.insertMany(seedData.restaurantTags);
    const restaurantTagMap = {};
    restaurantTagDocs.forEach(tag => {
      restaurantTagMap[tag.name] = tag._id;
    });

    // 4. Crear restaurantes
    console.log('🏪 Creando restaurantes...');
    const restaurantDocs = {};
    for (const restaurantData of seedData.restaurants) {
      // Mapear tag names a IDs
      restaurantData.restaurant_tags = restaurantData.restaurant_tags.map(
        tagName => restaurantTagMap[tagName]
      );
      restaurantData.owner_id = adminUser._id;
      
      const restaurant = await Restaurant.create(restaurantData);
      restaurantDocs[restaurant.name] = restaurant;
      console.log(`   ✅ ${restaurant.name}`);
    }

    // 5. Crear categorías para cada restaurante
    console.log('📂 Creando categorías...');
    const categoryDocs = {};
    for (const [restaurantName, categories] of Object.entries(seedData.categories)) {
      const restaurant = restaurantDocs[restaurantName];
      categoryDocs[restaurantName] = {};
      
      for (const categoryData of categories) {
        categoryData.restaurant_id = restaurant._id;
        categoryData.created_by = adminUser._id;
        
        const category = await Category.create(categoryData);
        categoryDocs[restaurantName][category.name] = category;
        console.log(`   ✅ ${restaurantName} -> ${category.name}`);
      }
    }

    // 6. Crear tags específicos para cada restaurante
    console.log('🏷️ Creando tags específicos de restaurante...');
    const tagDocs = {};
    for (const [restaurantName, tags] of Object.entries(seedData.restaurantSpecificTags)) {
      const restaurant = restaurantDocs[restaurantName];
      tagDocs[restaurantName] = {};
      
      for (const tagName of tags) {
        const tag = await Tag.create({
          name: tagName,
          restaurant_id: restaurant._id,
          created_by: adminUser._id
        });
        tagDocs[restaurantName][tagName] = tag;
        console.log(`   ✅ ${restaurantName} -> ${tagName}`);
      }
    }

    // 7. Crear productos
    console.log('🍽️ Creando productos...');
    let totalProducts = 0;
    for (const [restaurantName, restaurantProducts] of Object.entries(seedData.products)) {
      const restaurant = restaurantDocs[restaurantName];
      
      for (const [categoryName, products] of Object.entries(restaurantProducts)) {
        const category = categoryDocs[restaurantName][categoryName];
        
        for (const productData of products) {
          // Mapear tag names a IDs
          if (productData.tags) {
            productData.tags = productData.tags.map(
              tagName => tagDocs[restaurantName][tagName]?._id
            ).filter(Boolean);
          }
          
          productData.restaurant_id = restaurant._id;
          productData.category_id = category._id;
          productData.created_by = adminUser._id;
          
          const product = await Product.create(productData);
          totalProducts++;
          console.log(`   ✅ ${restaurantName} -> ${categoryName} -> ${product.name}`);
        }
      }
    }

    // 8. Crear toppings
    console.log('🧄 Creando toppings...');
    let totalToppings = 0;
    for (const [restaurantName, toppings] of Object.entries(seedData.toppings)) {
      const restaurant = restaurantDocs[restaurantName];
      
      for (const toppingData of toppings) {
        toppingData.restaurant_id = restaurant._id;
        toppingData.created_by = adminUser._id;
        
        const topping = await Topping.create(toppingData);
        totalToppings++;
        console.log(`   ✅ ${restaurantName} -> ${topping.name}`);
      }
    }

    // 9. Resumen final
    console.log('\n🎉 ¡Seeding completado exitosamente!');
    console.log('📊 Resumen de datos creados:');
    console.log(`   👤 Usuarios: 1 (admin)`);
    console.log(`   🏷️ Tags globales: ${restaurantTagDocs.length}`);
    console.log(`   🏪 Restaurantes: ${Object.keys(restaurantDocs).length}`);
    console.log(`   📂 Categorías: ${Object.values(seedData.categories).flat().length}`);
    console.log(`   🏷️ Tags específicos: ${Object.values(seedData.restaurantSpecificTags).flat().length}`);
    console.log(`   🍽️ Productos: ${totalProducts}`);
    console.log(`   🧄 Toppings: ${totalToppings}`);
    console.log('\n✨ Tu CookApp está lista para usar!');

  } catch (error) {
    console.error('❌ Error durante el seeding:', error);
    throw error;
  }
}

// Función para conectar y ejecutar seeding
async function runSeeder() {
  try {
    // Conectar a MongoDB
    require('dotenv').config();
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🔗 Conectado a MongoDB');

    // Ejecutar seeding
    await seedDatabase();

    // Cerrar conexión
    await mongoose.connection.close();
    console.log('🔌 Conexión cerrada');
    process.exit(0);

  } catch (error) {
    console.error('💥 Error fatal:', error);
    process.exit(1);
  }
}

// Verificar si se está ejecutando directamente
if (require.main === module) {
  runSeeder();
}

module.exports = { seedDatabase, seedData };