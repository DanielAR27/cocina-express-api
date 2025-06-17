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
    { name: 'Repostería' },
    { name: 'Mexicana' },
    { name: 'China' },
    { name: 'India' },
    { name: 'Vegetariana' },
    { name: 'Comida Rápida' },
    { name: 'Postres' },
    { name: 'Mariscos' },
    { name: 'Francesa' },
    { name: 'Brasileña' },
    { name: 'Peruana' },
    { name: 'Mediterránea' },
    { name: 'Árabe' },
    { name: 'Coreana' },
    { name: 'Fusión' },
    { name: 'Gourmet' },
    { name: 'Tradicional Costarricense' }

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
      banner: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=300&fit=crop',
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
      banner: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=300&fit=crop',
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
      banner: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=300&fit=crop',

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
      banner: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=300&fit=crop',

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
    },
    {
      name: 'Tacos & Más',
      description: 'Auténtica comida mexicana con salsas caseras',
      banner: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=300&fit=crop',

      contact: {
        phone: '2267-8901',
        email: 'pedidos@tacosymas.cr'
      },
      address: {
        street: 'Heredia Centro, Calle Central',
        city: 'Heredia',
        province: 'Heredia'
      },
      restaurant_tags: ['Mexicana', 'Casual', 'Picante'],
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
      name: 'Dragón Dorado',
      description: 'Comida china tradicional y moderna',
      banner: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&h=300&fit=crop',

      contact: {
        phone: '2278-9012',
        email: 'info@dragondorado.cr'
      },
      address: {
        street: 'Alajuela Centro, Avenida 1',
        city: 'Alajuela',
        province: 'Alajuela'
      },
      restaurant_tags: ['China', 'Familiar', 'Comida Rápida'],
      business_hours: {
        monday: { open: '11:30', close: '21:30', closed: false },
        tuesday: { open: '11:30', close: '21:30', closed: false },
        wednesday: { open: '11:30', close: '21:30', closed: false },
        thursday: { open: '11:30', close: '21:30', closed: false },
        friday: { open: '11:30', close: '22:30', closed: false },
        saturday: { open: '11:30', close: '22:30', closed: false },
        sunday: { open: '12:00', close: '21:00', closed: false }
      }
    },
    {
      name: 'Curry House',
      description: 'Sabores auténticos de la India con especias importadas',
      banner: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=300&fit=crop',

      contact: {
        phone: '2289-0123',
        email: 'reservas@curryhouse.cr'
      },
      address: {
        street: 'Rohrmoser, Plaza Mayor',
        city: 'San José',
        province: 'San José'
      },
      restaurant_tags: ['India', 'Saludable', 'Vegetariana'],
      business_hours: {
        monday: { open: '12:00', close: '22:00', closed: false },
        tuesday: { open: '12:00', close: '22:00', closed: false },
        wednesday: { open: '12:00', close: '22:00', closed: false },
        thursday: { open: '12:00', close: '22:00', closed: false },
        friday: { open: '12:00', close: '23:00', closed: false },
        saturday: { open: '12:00', close: '23:00', closed: false },
        sunday: { open: '13:00', close: '21:00', closed: false }
      }
    },
    {
      name: 'Green Garden',
      description: 'Restaurante 100% vegetariano con opciones veganas',
      banner: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=300&fit=crop',

      contact: {
        phone: '2290-1234',
        email: 'hola@greengarden.cr'
      },
      address: {
        street: 'Montes de Oca, San Pedro',
        city: 'San José',
        province: 'San José'
      },
      restaurant_tags: ['Vegetariana', 'Saludable', 'Orgánico'],
      business_hours: {
        monday: { open: '08:00', close: '20:00', closed: false },
        tuesday: { open: '08:00', close: '20:00', closed: false },
        wednesday: { open: '08:00', close: '20:00', closed: false },
        thursday: { open: '08:00', close: '20:00', closed: false },
        friday: { open: '08:00', close: '21:00', closed: false },
        saturday: { open: '09:00', close: '21:00', closed: false },
        sunday: { open: '09:00', close: '19:00', closed: false }
      }
    },
    {
      name: 'Wings Express',
      description: 'Alitas picantes y comida rápida americana',
      banner: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&h=300&fit=crop',

      contact: {
        phone: '2201-2345',
        email: 'pedidos@wingsexpress.cr'
      },
      address: {
        street: 'Curridabat Centro, Calle 5',
        city: 'Curridabat',
        province: 'San José'
      },
      restaurant_tags: ['Comida Rápida', 'Picante', 'Casual'],
      business_hours: {
        monday: { open: '15:00', close: '23:00', closed: false },
        tuesday: { open: '15:00', close: '23:00', closed: false },
        wednesday: { open: '15:00', close: '23:00', closed: false },
        thursday: { open: '15:00', close: '24:00', closed: false },
        friday: { open: '15:00', close: '01:00', closed: false },
        saturday: { open: '12:00', close: '01:00', closed: false },
        sunday: { open: '12:00', close: '23:00', closed: false }
      }
    },
    {
      name: 'Dulce Tentación',
      description: 'Repostería artesanal y postres gourmet',
      banner: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=300&fit=crop',

      contact: {
        phone: '2212-3456',
        email: 'info@dulcetentacion.cr'
      },
      address: {
        street: 'Tres Ríos Centro, Avenida Central',
        city: 'Tres Ríos',
        province: 'Cartago'
      },
      restaurant_tags: ['Postres', 'Repostería', 'Café'],
      business_hours: {
        monday: { open: '09:00', close: '20:00', closed: false },
        tuesday: { open: '09:00', close: '20:00', closed: false },
        wednesday: { open: '09:00', close: '20:00', closed: false },
        thursday: { open: '09:00', close: '20:00', closed: false },
        friday: { open: '09:00', close: '21:00', closed: false },
        saturday: { open: '08:00', close: '21:00', closed: false },
        sunday: { open: '10:00', close: '19:00', closed: false }
      }
    },
    {
      name: 'Mariscos del Pacífico',
      description: 'Pescados y mariscos frescos del Pacífico costarricense',
      banner: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=800&h=300&fit=crop',

      contact: {
        phone: '2223-4567',
        email: 'ventas@mariscospacifico.cr'
      },
      address: {
        street: 'Puntarenas Centro, Paseo de los Turistas',
        city: 'Puntarenas',
        province: 'Puntarenas'
      },
      restaurant_tags: ['Mariscos', 'Saludable', 'Familiar'],
      business_hours: {
        monday: { open: '11:00', close: '21:00', closed: false },
        tuesday: { open: '11:00', close: '21:00', closed: false },
        wednesday: { open: '11:00', close: '21:00', closed: false },
        thursday: { open: '11:00', close: '21:00', closed: false },
        friday: { open: '11:00', close: '22:00', closed: false },
        saturday: { open: '10:00', close: '22:00', closed: false },
        sunday: { open: '10:00', close: '21:00', closed: false }
      }
    },
    {
      name: 'Bistro La Parisienne',
      description: 'Cocina francesa auténtica en el corazón de San José',
      banner: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=300&fit=crop',

      contact: {
        phone: '2234-5678',
        email: 'reservas@laparisienne.cr'
      },
      address: {
        street: 'Paseo Colón, Edificio Centro Colón',
        city: 'San José',
        province: 'San José'
      },
      restaurant_tags: ['Francesa', 'Gourmet', 'Casual'],
      business_hours: {
        monday: { open: '18:00', close: '23:00', closed: false },
        tuesday: { open: '18:00', close: '23:00', closed: false },
        wednesday: { open: '18:00', close: '23:00', closed: false },
        thursday: { open: '18:00', close: '23:00', closed: false },
        friday: { open: '18:00', close: '24:00', closed: false },
        saturday: { open: '18:00', close: '24:00', closed: false },
        sunday: { closed: true }
      }
    },
    {
      name: 'Churrascaria Ipanema',
      description: 'Carnes brasileñas a la parrilla con buffet de ensaladas',
      banner: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&h=300&fit=crop',

      contact: {
        phone: '2245-6789',
        email: 'info@ipanema.cr'
      },
      address: {
        street: 'Santa Ana Centro, Plaza Real',
        city: 'Santa Ana',
        province: 'San José'
      },
      restaurant_tags: ['Brasileña', 'Parrilla', 'Familiar'],
      business_hours: {
        monday: { open: '12:00', close: '22:00', closed: false },
        tuesday: { open: '12:00', close: '22:00', closed: false },
        wednesday: { open: '12:00', close: '22:00', closed: false },
        thursday: { open: '12:00', close: '22:00', closed: false },
        friday: { open: '12:00', close: '23:00', closed: false },
        saturday: { open: '12:00', close: '23:00', closed: false },
        sunday: { open: '12:00', close: '21:00', closed: false }
      }
    },
    {
      name: 'Lima Fusión',
      description: 'Cocina peruana moderna con toques contemporáneos',
      banner: 'https://images.unsplash.com/photo-1571919743851-c8ba25d226f0?w=800&h=300&fit=crop',

      contact: {
        phone: '2256-7890',
        email: 'pedidos@limafusion.cr'
      },
      address: {
        street: 'Lindora, Forum Santa Ana',
        city: 'Santa Ana',
        province: 'San José'
      },
      restaurant_tags: ['Peruana', 'Fusión', 'Gourmet'],
      business_hours: {
        monday: { open: '12:00', close: '22:00', closed: false },
        tuesday: { open: '12:00', close: '22:00', closed: false },
        wednesday: { open: '12:00', close: '22:00', closed: false },
        thursday: { open: '12:00', close: '22:00', closed: false },
        friday: { open: '12:00', close: '23:00', closed: false },
        saturday: { open: '12:00', close: '23:00', closed: false },
        sunday: { open: '17:00', close: '21:00', closed: false }
      }
    },
    {
      name: 'Oliva Mediterránea',
      description: 'Sabores del Mediterráneo con aceite de oliva premium',
      banner: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=300&fit=crop',

      contact: {
        phone: '2267-8901',
        email: 'hola@olivamed.cr'
      },
      address: {
        street: 'Moravia Centro, Avenida Central',
        city: 'Moravia',
        province: 'San José'
      },
      restaurant_tags: ['Mediterránea', 'Saludable', 'Casual'],
      business_hours: {
        monday: { open: '11:00', close: '21:00', closed: false },
        tuesday: { open: '11:00', close: '21:00', closed: false },
        wednesday: { open: '11:00', close: '21:00', closed: false },
        thursday: { open: '11:00', close: '21:00', closed: false },
        friday: { open: '11:00', close: '22:00', closed: false },
        saturday: { open: '11:00', close: '22:00', closed: false },
        sunday: { open: '12:00', close: '20:00', closed: false }
      }
    },
    {
      name: 'Al-Habibi',
      description: 'Cocina árabe tradicional con especias importadas',
      banner: 'https://images.unsplash.com/photo-1574653969542-3d33002b9b4a?w=800&h=300&fit=crop',

      contact: {
        phone: '2278-9012',
        email: 'reservas@alhabibi.cr'
      },
      address: {
        street: 'Guadalupe Centro, Plaza González Víquez',
        city: 'Guadalupe',
        province: 'San José'
      },
      restaurant_tags: ['Árabe', 'Tradicional Costarricense', 'Familiar'],
      business_hours: {
        monday: { open: '11:30', close: '21:30', closed: false },
        tuesday: { open: '11:30', close: '21:30', closed: false },
        wednesday: { open: '11:30', close: '21:30', closed: false },
        thursday: { open: '11:30', close: '21:30', closed: false },
        friday: { open: '11:30', close: '22:30', closed: false },
        saturday: { open: '11:30', close: '22:30', closed: false },
        sunday: { open: '12:00', close: '21:00', closed: false }
      }
    },
    {
      name: 'Seoul Kitchen',
      description: 'Auténtica comida coreana con BBQ y kimchi casero',
      banner: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=300&fit=crop',

      contact: {
        phone: '2289-0123',
        email: 'info@seoulkitchen.cr'
      },
      address: {
        street: 'Tibás Centro, Mall San Pedro',
        city: 'Tibás',
        province: 'San José'
      },
      restaurant_tags: ['Coreana', 'Fusión', 'Casual'],
      business_hours: {
        monday: { open: '12:00', close: '22:00', closed: false },
        tuesday: { open: '12:00', close: '22:00', closed: false },
        wednesday: { open: '12:00', close: '22:00', closed: false },
        thursday: { open: '12:00', close: '22:00', closed: false },
        friday: { open: '12:00', close: '23:00', closed: false },
        saturday: { open: '12:00', close: '23:00', closed: false },
        sunday: { open: '13:00', close: '21:00', closed: false }
      }
    },
    {
      name: 'Fusion 360',
      description: 'Cocina de fusión internacional con técnicas modernas',
      banner: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=300&fit=crop',

      contact: {
        phone: '2290-1234',
        email: 'chef@fusion360.cr'
      },
      address: {
        street: 'Belén Centro, Ciudad Cariari',
        city: 'Belén',
        province: 'Heredia'
      },
      restaurant_tags: ['Fusión', 'Gourmet', 'Saludable'],
      business_hours: {
        monday: { open: '18:30', close: '23:00', closed: false },
        tuesday: { open: '18:30', close: '23:00', closed: false },
        wednesday: { open: '18:30', close: '23:00', closed: false },
        thursday: { open: '18:30', close: '23:00', closed: false },
        friday: { open: '18:30', close: '24:00', closed: false },
        saturday: { open: '18:30', close: '24:00', closed: false },
        sunday: { closed: true }
      }
    },
    {
      name: 'Mercado Gastronómico',
      description: 'Food hall con múltiples opciones gourmet bajo un techo',
      banner: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=300&fit=crop',

      contact: {
        phone: '2201-2345',
        email: 'contacto@mercadogastro.cr'
      },
      address: {
        street: 'San Rafael de Heredia, Centro Comercial Paseo de las Flores',
        city: 'San Rafael',
        province: 'Heredia'
      },
      restaurant_tags: ['Gourmet', 'Fusión', 'Familiar'],
      business_hours: {
        monday: { open: '10:00', close: '22:00', closed: false },
        tuesday: { open: '10:00', close: '22:00', closed: false },
        wednesday: { open: '10:00', close: '22:00', closed: false },
        thursday: { open: '10:00', close: '22:00', closed: false },
        friday: { open: '10:00', close: '23:00', closed: false },
        saturday: { open: '09:00', close: '23:00', closed: false },
        sunday: { open: '10:00', close: '21:00', closed: false }
      }
    },
    {
      name: 'Soda La Típica',
      description: 'Comida tradicional costarricense casera y auténtica',
      banner: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=300&fit=crop',
      contact: {
        phone: '2212-3456',
        email: 'info@sodatipica.cr'
      },
      address: {
        street: 'Desamparados Centro, Mercado Central',
        city: 'Desamparados',
        province: 'San José'
      },
      restaurant_tags: ['Tradicional Costarricense', 'Familiar', 'Casual'],
      business_hours: {
        monday: { open: '06:00', close: '18:00', closed: false },
        tuesday: { open: '06:00', close: '18:00', closed: false },
        wednesday: { open: '06:00', close: '18:00', closed: false },
        thursday: { open: '06:00', close: '18:00', closed: false },
        friday: { open: '06:00', close: '19:00', closed: false },
        saturday: { open: '06:00', close: '19:00', closed: false },
        sunday: { open: '07:00', close: '15:00', closed: false }
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
    ],

    'Tacos & Más': [
      { name: 'Tacos', description: 'Tacos tradicionales mexicanos' },
      { name: 'Quesadillas', description: 'Quesadillas con queso derretido' },
      { name: 'Burritos', description: 'Burritos rellenos de sabor' },
      { name: 'Nachos', description: 'Nachos con guacamole y salsas' },
      { name: 'Bebidas', description: 'Aguas frescas y sodas mexicanas' }
    ],
    'Dragón Dorado': [
      { name: 'Arroz Frito', description: 'Arroces salteados al wok' },
      { name: 'Chop Suey', description: 'Vegetales salteados' },
      { name: 'Pollo', description: 'Especialidades de pollo' },
      { name: 'Cerdo', description: 'Platos tradicionales de cerdo' },
      { name: 'Sopas', description: 'Sopas chinas calientes' }
    ],
    'Curry House': [
      { name: 'Curries', description: 'Curries tradicionales indios' },
      { name: 'Tandoor', description: 'Especialidades del horno tandoor' },
      { name: 'Biryani', description: 'Arroces aromáticos' },
      { name: 'Naan & Breads', description: 'Panes indios frescos' },
      { name: 'Lassi & Bebidas', description: 'Bebidas tradicionales' }
    ],
    'Green Garden': [
      { name: 'Ensaladas', description: 'Ensaladas frescas y nutritivas' },
      { name: 'Bowls', description: 'Bowls saludables balanceados' },
      { name: 'Wraps', description: 'Wraps vegetarianos' },
      { name: 'Smoothies', description: 'Batidos naturales' },
      { name: 'Postres Veganos', description: 'Dulces sin productos animales' }
    ],
    'Wings Express': [
      { name: 'Alitas', description: 'Alitas con diferentes salsas' },
      { name: 'Hamburguesas', description: 'Burgers americanas' },
      { name: 'Papas', description: 'Papas fritas y especialidades' },
      { name: 'Nuggets', description: 'Nuggets de pollo crujientes' },
      { name: 'Bebidas', description: 'Sodas y bebidas frías' }
    ],
    'Dulce Tentación': [
      { name: 'Pasteles', description: 'Pasteles para toda ocasión' },
      { name: 'Cupcakes', description: 'Cupcakes decorados' },
      { name: 'Galletas', description: 'Galletas artesanales' },
      { name: 'Helados', description: 'Helados cremosos caseros' },
      { name: 'Café & Té', description: 'Bebidas calientes' }
    ],
    'Mariscos del Pacífico': [
      { name: 'Ceviches', description: 'Ceviches frescos del día' },
      { name: 'Pescados', description: 'Pescados a la plancha y fritos' },
      { name: 'Mariscos', description: 'Camarones, pulpo y langostinos' },
      { name: 'Arroces', description: 'Arroces con mariscos' },
      { name: 'Sopas', description: 'Sopas de mariscos calientes' }
    ],
    
    
    'Bistro La Parisienne': [
      { name: 'Entrées', description: 'Entradas francesas tradicionales' },
      { name: 'Plats Principaux', description: 'Platos principales franceses' },
      { name: 'Fromages', description: 'Selección de quesos franceses' },
      { name: 'Desserts', description: 'Postres franceses clásicos' },
      { name: 'Vins & Boissons', description: 'Vinos y bebidas francesas' }
    ],
    'Churrascaria Ipanema': [
      { name: 'Carnes Premium', description: 'Cortes brasileños de primera' },
      { name: 'Rodizio', description: 'Servicio continuo de carnes' },
      { name: 'Buffet de Ensaladas', description: 'Variedad de ensaladas frescas' },
      { name: 'Acompañamientos', description: 'Guarniciones brasileñas' },
      { name: 'Caipirinhas', description: 'Bebidas tradicionales brasileñas' }
    ],
    'Lima Fusión': [
      { name: 'Ceviches Nikkei', description: 'Ceviches con influencia japonesa' },
      { name: 'Tiraditos', description: 'Pescado crudo al estilo peruano' },
      { name: 'Anticuchos', description: 'Brochetas peruanas marinadas' },
      { name: 'Platos de Fondo', description: 'Platos principales peruanos' },
      { name: 'Pisco Bar', description: 'Cócteles con pisco peruano' }
    ],
    'Oliva Mediterránea': [
      { name: 'Mezze', description: 'Pequeños platos mediterráneos' },
      { name: 'Ensaladas Griegas', description: 'Ensaladas con aceitunas y feta' },
      { name: 'Pescados del Mar', description: 'Pescados frescos mediterráneos' },
      { name: 'Carnes a la Parrilla', description: 'Carnes con hierbas mediterráneas' },
      { name: 'Postres Helénicos', description: 'Dulces griegos tradicionales' }
    ],
    'Al-Habibi': [
      { name: 'Mezze Árabes', description: 'Variedad de entradas árabes' },
      { name: 'Kebabs', description: 'Carnes asadas en pincho' },
      { name: 'Platos con Arroz', description: 'Arroces aromáticos árabes' },
      { name: 'Dulces Árabes', description: 'Repostería árabe tradicional' },
      { name: 'Té y Café Árabe', description: 'Bebidas árabes tradicionales' }
    ],
    'Seoul Kitchen': [
      { name: 'BBQ Coreano', description: 'Carnes a la parrilla coreanas' },
      { name: 'Bibimbap', description: 'Bowls de arroz coreanos' },
      { name: 'Sopas Calientes', description: 'Sopas coreanas tradicionales' },
      { name: 'Banchan', description: 'Acompañamientos coreanos' },
      { name: 'Bebidas Coreanas', description: 'Tés y bebidas de Corea' }
    ],
    'Fusion 360': [
      { name: 'Tapas Fusión', description: 'Pequeños platos de fusión' },
      { name: 'Pescados Asiáticos', description: 'Pescados con técnicas asiáticas' },
      { name: 'Carnes de Autor', description: 'Carnes con preparaciones únicas' },
      { name: 'Postres Modernos', description: 'Postres con técnicas modernas' },
      { name: 'Cócteles de Autor', description: 'Mixología internacional' }
    ],
    'Mercado Gastronómico': [
      { name: 'Street Food', description: 'Comida callejera gourmet' },
      { name: 'Internacional', description: 'Platos de diferentes países' },
      { name: 'Healthy Corner', description: 'Opciones saludables variadas' },
      { name: 'Sweet Station', description: 'Estación de dulces y postres' },
      { name: 'Bebidas Artesanales', description: 'Bebidas especiales del mercado' }
    ],
    'Soda La Típica': [
      { name: 'Casados', description: 'Comidas completas costarricenses' },
      { name: 'Desayunos Típicos', description: 'Desayunos tradicionales ticos' },
      { name: 'Sopas Criollas', description: 'Sopas tradicionales de Costa Rica' },
      { name: 'Bebidas Naturales', description: 'Refrescos naturales ticos' },
      { name: 'Postres Caseros', description: 'Dulces tradicionales caseros' }
    ]
  
  
  },

  // Tags específicos por restaurante
  restaurantSpecificTags: {
    'Pizzería Nonna Rosa': ['Vegetariano', 'Picante', 'Familiar', 'Clásico', 'Gourmet'],
    'El Parrillero': ['Picante', 'XXL', 'Clásico', 'Premium', 'Sin gluten'],
    'Sushi Bar Sakura': ['Pescado crudo', 'Vegetariano', 'Picante', 'Tradicional', 'Especial'],
    'Café del Volcán': ['Orgánico', 'Descafeinado', 'Dulce', 'Vegano', 'Sin azúcar'],
    'Tacos & Más': ['Picante', 'Suave', 'Extra queso', 'Vegetariano', 'Tradicional'],
    'Dragón Dorado': ['Picante', 'Agridulce', 'Vegetariano', 'Sin gluten', 'Familiar'],
    'Curry House': ['Muy picante', 'Medio picante', 'Suave', 'Vegano', 'Sin gluten'],
    'Green Garden': ['Vegano', 'Crudo', 'Sin gluten', 'Proteína vegetal', 'Orgánico'],
    'Wings Express': ['Extra picante', 'BBQ', 'Mild', 'Crujiente', 'Familiar'],
    'Dulce Tentación': ['Sin azúcar', 'Vegano', 'Sin gluten', 'Chocolate', 'Frutal'],
    'Mariscos del Pacífico': ['Fresco del día', 'Picante', 'A la plancha', 'Frito', 'Especial'],
    'Bistro La Parisienne': ['Clásico francés', 'Gourmet', 'Temporada', 'Tradicional', 'Premium'],
    'Churrascaria Ipanema': ['Rodizio completo', 'Corte premium', 'Parrilla brasileña', 'Familiar', 'All you can eat'],
    'Lima Fusión': ['Nikkei', 'Picante ají', 'Fresco', 'Peruano auténtico', 'Fusión moderna'],
    'Oliva Mediterránea': ['Aceite oliva extra', 'Mediterráneo', 'Saludable', 'Griego', 'Vegetariano'],
    'Al-Habibi': ['Halal', 'Especias árabes', 'Tradicional', 'Vegetariano', 'Casero'],
    'Seoul Kitchen': ['Kimchi casero', 'BBQ coreano', 'Picante gochujang', 'Fermentado', 'K-Food'],
    'Fusion 360': ['Técnica molecular', 'De autor', 'Internacional', 'Innovador', 'Gourmet'],
    'Mercado Gastronómico': ['Street food', 'Artesanal', 'Internacional', 'Gourmet', 'Variado'],
    'Soda La Típica': ['100% tico', 'Casero', 'Tradicional', 'Familiar', 'Económico']
  },

  // Productos detallados
  products: {
    'Pizzería Nonna Rosa': {
      'Pizzas Clásicas': [
        {
          name: 'Pizza Margarita',
          description: 'Pizza clásica con salsa de tomate, mozzarella fresca y albahaca',
          image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&h=400&fit=crop',

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
          image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&h=400&fit=crop',

          price: 5200,
          base_ingredients: ['Masa de pizza', 'Salsa de tomate', 'Mozzarella', 'Pepperoni'],
          preparation_time: 22,
          nutritional_info: { calories: 380, protein: 18, carbs: 33, fat: 18, fiber: 2 },
          tags: ['Clásico', 'Familiar']
        },
        {
          name: 'Pizza Hawaiana',
          description: 'Pizza con jamón, piña y mozzarella',
          image: 'https://placehold.co/600x400/FF6347/FFFFFF?text=Pizza+Hawaiana',
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
          image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop',

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
          image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=600&h=400&fit=crop',
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
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop',
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
          image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&h=400&fit=crop',
          price: 4200,
          base_ingredients: ['Pan de hamburguesa', 'Carne de res 150g', 'Queso cheddar', 'Lechuga', 'Tomate', 'Cebolla'],
          preparation_time: 15,
          nutritional_info: { calories: 580, protein: 28, carbs: 43, fat: 32, fiber: 4 },
          tags: ['Clásico']
        },
        {
          name: 'Hamburguesa BBQ',
          description: 'Con salsa barbacoa, cebolla caramelizada y aros de cebolla',
          image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=600&h=400&fit=crop',

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
          image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&h=400&fit=crop',

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
          image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&h=400&fit=crop',
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
          image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&h=400&fit=crop',

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
          image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=600&h=400&fit=crop',

          price: 3800,
          base_ingredients: ['Arroz sushi', 'Nori', 'Salmón fresco', 'Queso crema', 'Aguacate'],
          preparation_time: 15,
          nutritional_info: { calories: 280, protein: 15, carbs: 28, fat: 12, fiber: 3 },
          tags: ['Especial']
        },
        {
          name: 'Spicy Tuna Roll',
          description: 'Atún picante con pepino y sésamo',
          image: 'https://images.unsplash.com/photo-1563612116625-3012372fccce?w=600&h=400&fit=crop',

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
          image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600&h=400&fit=crop',

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
          image: 'https://images.unsplash.com/photo-1609501676725-7186f932a4de?w=600&h=400&fit=crop',
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
          image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop',

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
          image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&h=400&fit=crop',

          price: 2200,
          base_ingredients: ['Café espresso', 'Leche', 'Canela', 'Azúcar'],
          preparation_time: 8,
          nutritional_info: { calories: 120, protein: 6, carbs: 12, fat: 5, fiber: 0 },
          tags: ['Dulce']
        },
        {
          name: 'Latte Vainilla',
          description: 'Espresso con leche y jarabe de vainilla',
          image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=400&fit=crop',

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
          image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',

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
          image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&h=400&fit=crop',
          price: 2800,
          base_ingredients: ['Pan francés', 'Huevos', 'Leche', 'Miel', 'Mantequilla', 'Frutas frescas'],
          preparation_time: 12,
          nutritional_info: { calories: 380, protein: 12, carbs: 45, fat: 18, fiber: 4 },
          tags: ['Dulce']
        }
    ]
    }
    // ← INSERTAR AQUÍ LOS NUEVOS PRODUCTOS:
    ,
    'Tacos & Más': {
      'Tacos': [
        {
          name: 'Taco de Carnitas',
          description: 'Taco con carnitas de cerdo, cebolla y cilantro',
          image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop',

          price: 1800,
          base_ingredients: ['Tortilla de maíz', 'Carnitas de cerdo', 'Cebolla', 'Cilantro', 'Salsa verde'],
          preparation_time: 8,
          nutritional_info: { calories: 250, protein: 15, carbs: 20, fat: 12, fiber: 3 },
          tags: ['Tradicional', 'Picante'],
          is_featured: true
        },
        {
          name: 'Taco de Pollo',
          description: 'Taco con pollo marinado y guacamole',
          image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&h=400&fit=crop',

          price: 1600,
          base_ingredients: ['Tortilla de maíz', 'Pollo marinado', 'Guacamole', 'Lechuga', 'Pico de gallo'],
          preparation_time: 8,
          nutritional_info: { calories: 220, protein: 18, carbs: 18, fat: 10, fiber: 4 },
          tags: ['Suave']
        }
      ],
      'Quesadillas': [
        {
          name: 'Quesadilla de Queso',
          description: 'Quesadilla clásica con queso Oaxaca derretido',
          image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=600&h=400&fit=crop',
          price: 2200,
          base_ingredients: ['Tortilla de harina', 'Queso Oaxaca', 'Crema', 'Guacamole'],
          preparation_time: 10,
          nutritional_info: { calories: 380, protein: 20, carbs: 30, fat: 22, fiber: 2 },
          tags: ['Extra queso', 'Vegetariano'],
          is_featured: true
        }
      ]
    },
    'Dragón Dorado': {
      'Arroz Frito': [
        {
          name: 'Arroz Frito Especial',
          description: 'Arroz frito con pollo, camarones y vegetales',
          image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&h=400&fit=crop',

          price: 4200,
          base_ingredients: ['Arroz', 'Pollo', 'Camarones', 'Huevo', 'Vegetales mixtos', 'Salsa de soya'],
          preparation_time: 15,
          nutritional_info: { calories: 420, protein: 25, carbs: 45, fat: 15, fiber: 3 },
          tags: ['Familiar'],
          is_featured: true
        },
        {
          name: 'Arroz Frito Vegetariano',
          description: 'Arroz frito con tofu y vegetales frescos',
          image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&h=400&fit=crop',

          price: 3500,
          base_ingredients: ['Arroz', 'Tofu', 'Brócoli', 'Zanahoria', 'Huevo', 'Salsa de soya'],
          preparation_time: 12,
          nutritional_info: { calories: 350, protein: 15, carbs: 48, fat: 12, fiber: 5 },
          tags: ['Vegetariano']
        }
      ],
      'Pollo': [
        {
          name: 'Pollo Agridulce',
          description: 'Pollo empanizado con salsa agridulce y piña',
          image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&h=400&fit=crop',
          price: 4800,
          base_ingredients: ['Pollo empanizado', 'Salsa agridulce', 'Piña', 'Pimientos', 'Cebolla'],
          preparation_time: 18,
          nutritional_info: { calories: 480, protein: 28, carbs: 42, fat: 22, fiber: 3 },
          tags: ['Agridulce', 'Familiar']
        }
      ]
    },
    'Curry House': {
      'Curries': [
        {
          name: 'Butter Chicken',
          description: 'Pollo en salsa cremosa de tomate y especias',
          image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop',

          price: 5200,
          base_ingredients: ['Pollo', 'Salsa de tomate', 'Crema', 'Especias indias', 'Mantequilla'],
          preparation_time: 25,
          nutritional_info: { calories: 450, protein: 30, carbs: 15, fat: 28, fiber: 2 },
          tags: ['Suave'],
          is_featured: true
        },
        {
          name: 'Curry de Vegetales',
          description: 'Curry vegano con vegetales de temporada',
          image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&h=400&fit=crop',

          price: 4200,
          base_ingredients: ['Vegetales mixtos', 'Leche de coco', 'Especias curry', 'Jengibre', 'Ajo'],
          preparation_time: 20,
          nutritional_info: { calories: 320, protein: 8, carbs: 25, fat: 18, fiber: 8 },
          tags: ['Vegano', 'Medio picante']
        }
      ],
      'Naan & Breads': [
        {
          name: 'Naan con Ajo',
          description: 'Pan naan fresco con ajo y mantequilla',
          image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=400&fit=crop',
          price: 1800,
          base_ingredients: ['Harina', 'Yogur', 'Ajo', 'Mantequilla', 'Cilantro'],
          preparation_time: 12,
          nutritional_info: { calories: 280, protein: 8, carbs: 45, fat: 8, fiber: 2 },
          tags: ['Vegetariano']
        }
      ]
    },
    'Green Garden': {
      'Ensaladas': [
        {
          name: 'Ensalada Arcoíris',
          description: 'Mix de vegetales frescos con aderezo de tahini',
          image: 'https://placehold.co/600x400/32CD32/FFFFFF?text=Ensalada+Arcoiris',

          price: 3200,
          base_ingredients: ['Lechuga', 'Zanahoria', 'Remolacha', 'Pepino', 'Tomate cherry', 'Aderezo tahini'],
          preparation_time: 8,
          nutritional_info: { calories: 180, protein: 6, carbs: 15, fat: 12, fiber: 8 },
          tags: ['Vegano', 'Crudo'],
          is_featured: true
        }
      ],
      'Bowls': [
        {
          name: 'Buddha Bowl',
          description: 'Bowl completo con quinoa, vegetales y proteína vegetal',
          image: 'https://placehold.co/600x400/228B22/FFFFFF?text=Buddha+Bowl',
          price: 4500,
          base_ingredients: ['Quinoa', 'Garbanzos', 'Aguacate', 'Brócoli', 'Zanahoria', 'Hummus'],
          preparation_time: 15,
          nutritional_info: { calories: 420, protein: 18, carbs: 45, fat: 20, fiber: 12 },
          tags: ['Vegano', 'Proteína vegetal'],
          is_featured: true
        }
      ]
    },
    'Wings Express': {
      'Alitas': [
        {
          name: 'Alitas Buffalo',
          description: 'Alitas picantes con salsa buffalo clásica',
          image: 'https://placehold.co/600x400/FF4500/FFFFFF?text=Alitas+Buffalo',

          price: 4200,
          base_ingredients: ['Alitas de pollo', 'Salsa buffalo', 'Apio', 'Aderezo ranch'],
          preparation_time: 18,
          nutritional_info: { calories: 380, protein: 28, carbs: 5, fat: 28, fiber: 1 },
          tags: ['Extra picante'],
          is_featured: true
        },
        {
          name: 'Alitas BBQ',
          description: 'Alitas glaseadas con salsa barbacoa casera',
          image: 'https://placehold.co/600x400/8B4513/FFFFFF?text=Alitas+BBQ',

          price: 4200,
          base_ingredients: ['Alitas de pollo', 'Salsa BBQ', 'Miel', 'Especias'],
          preparation_time: 18,
          nutritional_info: { calories: 350, protein: 26, carbs: 12, fat: 22, fiber: 0 },
          tags: ['BBQ', 'Familiar']
        }
      ],
      'Hamburguesas': [
        {
          name: 'Burger Americana',
          description: 'Hamburguesa clásica americana con papas',
          image: 'https://placehold.co/600x400/FF6347/FFFFFF?text=Burger+Americana',
          price: 4800,
          base_ingredients: ['Pan brioche', 'Carne de res', 'Queso americano', 'Lechuga', 'Tomate', 'Papas fritas'],
          preparation_time: 15,
          nutritional_info: { calories: 650, protein: 32, carbs: 45, fat: 38, fiber: 4 },
          tags: ['Familiar', 'Crujiente']
        }
      ]
    },
    'Dulce Tentación': {
      'Pasteles': [
        {
          name: 'Pastel de Chocolate',
          description: 'Pastel de chocolate húmedo con ganache',
          image: 'https://placehold.co/600x400/8B4513/FFFFFF?text=Pastel+Chocolate',

          price: 2800,
          base_ingredients: ['Chocolate', 'Harina', 'Huevos', 'Mantequilla', 'Ganache'],
          preparation_time: 5,
          nutritional_info: { calories: 420, protein: 6, carbs: 45, fat: 24, fiber: 3 },
          tags: ['Chocolate'],
          is_featured: true
        },
        {
          name: 'Tres Leches',
          description: 'Pastel tradicional bañado en tres leches',
          image: 'https://placehold.co/600x400/F5DEB3/8B4513?text=Tres+Leches',

          price: 2500,
          base_ingredients: ['Bizcocho', 'Leche condensada', 'Leche evaporada', 'Crema', 'Canela'],
          preparation_time: 5,
          nutritional_info: { calories: 380, protein: 8, carbs: 42, fat: 20, fiber: 1 },
          tags: ['Tradicional']
        }
      ],
      'Cupcakes': [
        {
          name: 'Cupcake Red Velvet',
          description: 'Cupcake de terciopelo rojo con frosting de queso crema',
          image: 'https://placehold.co/600x400/DC143C/FFFFFF?text=Red+Velvet',
          price: 1800,
          base_ingredients: ['Harina', 'Cacao', 'Colorante rojo', 'Queso crema', 'Mantequilla'],
          preparation_time: 3,
          nutritional_info: { calories: 320, protein: 4, carbs: 38, fat: 18, fiber: 2 },
          tags: ['Chocolate']
        }
      ]
    },
    'Mariscos del Pacífico': {
      'Ceviches': [
        {
          name: 'Ceviche de Corvina',
          description: 'Ceviche fresco de corvina con limón y cilantro',
          image: 'https://placehold.co/600x400/20B2AA/FFFFFF?text=Ceviche+Corvina',

          price: 4200,
          base_ingredients: ['Corvina fresca', 'Limón', 'Cebolla morada', 'Cilantro', 'Ají dulce'],
          preparation_time: 15,
          nutritional_info: { calories: 180, protein: 25, carbs: 8, fat: 5, fiber: 2 },
          tags: ['Fresco del día'],
          is_featured: true
        },
        {
          name: 'Ceviche Mixto',
          description: 'Ceviche con corvina, camarones y pulpo',
          image: 'https://placehold.co/600x400/4682B4/FFFFFF?text=Ceviche+Mixto',
          price: 5200,
          base_ingredients: ['Corvina', 'Camarones', 'Pulpo', 'Limón', 'Cebolla', 'Ají'],
          preparation_time: 18,
          nutritional_info: { calories: 220, protein: 32, carbs: 10, fat: 6, fiber: 2 },
          tags: ['Especial', 'Fresco del día']
        }
      ],
      'Pescados': [
        {
          name: 'Filete de Dorado a la Plancha',
          description: 'Filete de dorado fresco con vegetales salteados',
          image: 'https://placehold.co/600x400/FFD700/000000?text=Dorado+Plancha',
          price: 6200,
          base_ingredients: ['Filete de dorado', 'Vegetales', 'Limón', 'Hierbas finas', 'Aceite de oliva'],
          preparation_time: 20,
          nutritional_info: { calories: 350, protein: 40, carbs: 12, fat: 15, fiber: 4 },
          tags: ['A la plancha', 'Fresco del día'],
          is_featured: true
        }
      ]
    },
    'Bistro La Parisienne': {
      'Entrées': [
        {
          name: 'Escargots de Bourgogne',
          description: 'Caracoles en mantequilla de ajo y perejil',
          image: 'https://placehold.co/600x400/800080/FFFFFF?text=Escargots',
          price: 3800,
          base_ingredients: ['Caracoles', 'Mantequilla', 'Ajo', 'Perejil', 'Vino blanco'],
          preparation_time: 15,
          nutritional_info: { calories: 220, protein: 12, carbs: 5, fat: 16, fiber: 1 },
          tags: ['Clásico francés', 'Tradicional'],
          is_featured: true
        },
        {
          name: 'Paté de Foie',
          description: 'Paté casero con tostadas francesas',
          image: 'https://placehold.co/600x400/8B4513/FFFFFF?text=Pate+Foie',

          price: 4200,
          base_ingredients: ['Hígado de pato', 'Mantequilla', 'Coñac', 'Pan francés', 'Mermelada'],
          preparation_time: 8,
          nutritional_info: { calories: 320, protein: 15, carbs: 12, fat: 24, fiber: 2 },
          tags: ['Gourmet', 'Premium']
        }
      ],
      'Plats Principaux': [
        {
          name: 'Coq au Vin',
          description: 'Pollo guisado en vino tinto con verduras',
          image: 'https://placehold.co/600x400/722F37/FFFFFF?text=Coq+au+Vin',
          price: 6800,
          base_ingredients: ['Pollo', 'Vino tinto', 'Champiñones', 'Cebollitas', 'Hierbas provenzales'],
          preparation_time: 35,
          nutritional_info: { calories: 480, protein: 35, carbs: 15, fat: 28, fiber: 4 },
          tags: ['Clásico francés', 'Gourmet'],
          is_featured: true
        }
      ]
    },
    'Churrascaria Ipanema': {
      'Carnes Premium': [
        {
          name: 'Picanha Premium',
          description: 'Corte brasileño premium a la parrilla',
          image: 'https://placehold.co/600x400/8B0000/FFFFFF?text=Picanha+Premium',
          price: 8500,
          base_ingredients: ['Picanha', 'Sal gruesa', 'Ajo', 'Chimichurri brasileño'],
          preparation_time: 25,
          nutritional_info: { calories: 520, protein: 45, carbs: 2, fat: 35, fiber: 0 },
          tags: ['Rodizio completo', 'Corte premium'],
          is_featured: true
        },
        {
          name: 'Costilla de Res',
          description: 'Costilla jugosa con especias brasileñas',
          image: 'https://placehold.co/600x400/A0522D/FFFFFF?text=Costilla+Res',
          price: 7200,
          base_ingredients: ['Costilla de res', 'Especias brasileñas', 'Sal marina'],
          preparation_time: 30,
          nutritional_info: { calories: 580, protein: 42, carbs: 3, fat: 42, fiber: 0 },
          tags: ['Parrilla brasileña', 'Familiar']
        }
      ],
      'Acompañamientos': [
        {
          name: 'Farofa Tradicional',
          description: 'Harina de mandioca tostada con tocino',
          image: 'https://placehold.co/600x400/DAA520/000000?text=Farofa',
          price: 1800,
          base_ingredients: ['Harina de mandioca', 'Tocino', 'Cebolla', 'Huevo'],
          preparation_time: 10,
          nutritional_info: { calories: 180, protein: 6, carbs: 20, fat: 8, fiber: 3 },
          tags: ['Tradicional', 'Casero']
        }
      ]
    },
    'Lima Fusión': {
      'Ceviches Nikkei': [
        {
          name: 'Ceviche Nikkei',
          description: 'Ceviche con leche de tigre y toque japonés',
          image: 'https://placehold.co/600x400/FF69B4/FFFFFF?text=Ceviche+Nikkei',
          price: 5200,
          base_ingredients: ['Corvina', 'Leche de tigre', 'Ají amarillo', 'Jengibre', 'Soya'],
          preparation_time: 20,
          nutritional_info: { calories: 280, protein: 32, carbs: 12, fat: 8, fiber: 2 },
          tags: ['Nikkei', 'Fresco'],
          is_featured: true
        },
        {
          name: 'Tiradito de Atún',
          description: 'Atún fresco con ají amarillo y leche de tigre',
          image: 'https://placehold.co/600x400/FF1493/FFFFFF?text=Tiradito+Atun',
          price: 6200,
          base_ingredients: ['Atún fresco', 'Ají amarillo', 'Leche de tigre', 'Microvegetales'],
          preparation_time: 15,
          nutritional_info: { calories: 250, protein: 28, carbs: 8, fat: 12, fiber: 1 },
          tags: ['Fusión moderna', 'Fresco']
        }
      ],
      'Platos de Fondo': [
        {
          name: 'Lomo Saltado Fusión',
          description: 'Lomo saltado con toque asiático y papas doradas',
          image: 'https://placehold.co/600x400/CD853F/FFFFFF?text=Lomo+Saltado',
          price: 7800,
          base_ingredients: ['Lomo de res', 'Cebolla', 'Tomate', 'Papas', 'Soya', 'Cilantro'],
          preparation_time: 20,
          nutritional_info: { calories: 520, protein: 35, carbs: 42, fat: 22, fiber: 5 },
          tags: ['Peruano auténtico', 'Fusión moderna']
        }
      ]
    },
    'Oliva Mediterránea': {
      'Mezze': [
        {
          name: 'Plato Mezze Clásico',
          description: 'Selección de hummus, baba ganoush y aceitunas',
          image: 'https://placehold.co/600x400/9ACD32/FFFFFF?text=Mezze+Clasico',
          price: 4200,
          base_ingredients: ['Hummus', 'Baba ganoush', 'Aceitunas kalamata', 'Pan pita', 'Aceite de oliva'],
          preparation_time: 12,
          nutritional_info: { calories: 320, protein: 12, carbs: 28, fat: 18, fiber: 8 },
          tags: ['Mediterráneo', 'Vegetariano'],
          is_featured: true
        }
      ],
      'Pescados del Mar': [
        {
          name: 'Salmón a la Parrilla',
          description: 'Salmón con hierbas mediterráneas y aceite de oliva',
          image: 'https://placehold.co/600x400/FA8072/FFFFFF?text=Salmon+Parrilla',
          price: 6800,
          base_ingredients: ['Salmón', 'Aceite de oliva extra', 'Orégano', 'Limón', 'Alcaparras'],
          preparation_time: 18,
          nutritional_info: { calories: 420, protein: 38, carbs: 5, fat: 26, fiber: 1 },
          tags: ['Saludable', 'Aceite oliva extra']
        }
      ]
    },
    'Al-Habibi': {
      'Mezze Árabes': [
        {
          name: 'Mezze Árabe Completo',
          description: 'Variedad de entradas árabes tradicionales',
          image: 'https://placehold.co/600x400/DAA520/000000?text=Mezze+Arabe',

          price: 4800,
          base_ingredients: ['Hummus', 'Tabbouleh', 'Kibbeh', 'Pan árabe', 'Yogur con pepino'],
          preparation_time: 15,
          nutritional_info: { calories: 380, protein: 16, carbs: 35, fat: 20, fiber: 8 },
          tags: ['Tradicional', 'Vegetariano'],
          is_featured: true
        }
      ],
      'Kebabs': [
        {
          name: 'Shish Kebab',
          description: 'Brochetas de cordero con especias árabes',
          image: 'https://placehold.co/600x400/8B4513/FFFFFF?text=Shish+Kebab',
          price: 6500,
          base_ingredients: ['Cordero', 'Especias árabes', 'Cebolla', 'Pimientos', 'Arroz basmati'],
          preparation_time: 22,
          nutritional_info: { calories: 480, protein: 32, carbs: 25, fat: 28, fiber: 3 },
          tags: ['Halal', 'Especias árabes']
        }
      ]
    },
    'Seoul Kitchen': {
      'BBQ Coreano': [
        {
          name: 'Bulgogi',
          description: 'Carne marinada a la parrilla coreana',
          image: 'https://placehold.co/600x400/DC143C/FFFFFF?text=Bulgogi',

          price: 6200,
          base_ingredients: ['Carne de res', 'Marinada coreana', 'Cebollín', 'Sésamo', 'Arroz'],
          preparation_time: 20,
          nutritional_info: { calories: 450, protein: 32, carbs: 28, fat: 22, fiber: 2 },
          tags: ['BBQ coreano', 'K-Food'],
          is_featured: true
        },
        {
          name: 'Galbi',
          description: 'Costillas marinadas con salsa coreana',
          image: 'https://placehold.co/600x400/8B0000/FFFFFF?text=Galbi',
          price: 7800,
          base_ingredients: ['Costillas de res', 'Salsa galbi', 'Ajo', 'Jengibre', 'Miel'],
          preparation_time: 25,
          nutritional_info: { calories: 520, protein: 38, carbs: 18, fat: 32, fiber: 1 },
          tags: ['BBQ coreano', 'Premium']
        }
      ],
      'Bibimbap': [
        {
          name: 'Bibimbap Tradicional',
          description: 'Bowl de arroz con vegetales y carne',
          image: 'https://placehold.co/600x400/FF6347/FFFFFF?text=Bibimbap',
          price: 5200,
          base_ingredients: ['Arroz', 'Vegetales variados', 'Carne marinada', 'Huevo', 'Gochujang'],
          preparation_time: 18,
          nutritional_info: { calories: 420, protein: 24, carbs: 48, fat: 16, fiber: 6 },
          tags: ['Kimchi casero', 'Tradicional']
        }
      ]
    },
    'Fusion 360': {
      'Tapas Fusión': [
        {
          name: 'Tataki de Atún',
          description: 'Atún sellado con costra de sésamo y salsa ponzu',
          image: 'https://placehold.co/600x400/2F4F4F/FFFFFF?text=Tataki+Atun',
          price: 4800,
          base_ingredients: ['Atún fresco', 'Sésamo negro', 'Ponzu', 'Microvegetales', 'Wasabi'],
          preparation_time: 12,
          nutritional_info: { calories: 280, protein: 26, carbs: 8, fat: 16, fiber: 2 },
          tags: ['De autor', 'Innovador'],
          is_featured: true
        }
      ],
      'Carnes de Autor': [
        {
          name: 'Cordero con Costra de Hierbas',
          description: 'Rack de cordero con técnicas modernas',
          image: 'https://placehold.co/600x400/556B2F/FFFFFF?text=Cordero+Hierbas',
          price: 9500,
          base_ingredients: ['Rack de cordero', 'Hierbas frescas', 'Ajo negro', 'Reducción de vino'],
          preparation_time: 30,
          nutritional_info: { calories: 520, protein: 42, carbs: 8, fat: 35, fiber: 2 },
          tags: ['Técnica molecular', 'Gourmet']
        }
      ]
    },
    'Mercado Gastronómico': {
      'Street Food': [
        {
          name: 'Bao Buns Gourmet',
          description: 'Panecillos al vapor con cerdo confitado',
          image: 'https://placehold.co/600x400/F5DEB3/8B4513?text=Bao+Buns',
          price: 3800,
          base_ingredients: ['Pan bao', 'Cerdo confitado', 'Pickles asiáticos', 'Salsa hoisin'],
          preparation_time: 10,
          nutritional_info: { calories: 320, protein: 18, carbs: 28, fat: 16, fiber: 3 },
          tags: ['Street food', 'Artesanal'],
          is_featured: true
        }
      ],
      'Internacional': [
        {
          name: 'Pad Thai Fusión',
          description: 'Pad Thai con ingredientes locales',
          image: 'https://placehold.co/600x400/FF8C00/FFFFFF?text=Pad+Thai',
          price: 4200,
          base_ingredients: ['Fideos de arroz', 'Camarones', 'Vegetales tropicales', 'Tamarindo', 'Maní'],
          preparation_time: 15,
          nutritional_info: { calories: 380, protein: 20, carbs: 42, fat: 14, fiber: 4 },
          tags: ['Internacional', 'Gourmet']
        }
      ]
    },
    'Soda La Típica': {
      'Casados': [
        {
          name: 'Casado Típico',
          description: 'Gallo pinto, carne, plátano, ensalada y frijoles',
          image: 'https://placehold.co/600x400/228B22/FFFFFF?text=Casado+Tipico',
          price: 3200,
          base_ingredients: ['Gallo pinto', 'Carne en salsa', 'Plátano maduro', 'Ensalada', 'Frijoles molidos'],
          preparation_time: 12,
          nutritional_info: { calories: 580, protein: 28, carbs: 65, fat: 22, fiber: 12 },
          tags: ['100% tico', 'Tradicional'],
          is_featured: true
        },
        {
          name: 'Casado de Pollo',
          description: 'Casado con pollo guisado tico',
          image: 'https://placehold.co/600x400/32CD32/FFFFFF?text=Casado+Pollo',
          price: 3500,
          base_ingredients: ['Gallo pinto', 'Pollo guisado', 'Plátano', 'Ensalada', 'Frijoles'],
          preparation_time: 12,
          nutritional_info: { calories: 520, protein: 32, carbs: 58, fat: 18, fiber: 10 },
          tags: ['Casero', 'Familiar']
        }
      ],
      'Desayunos Típicos': [
        {
          name: 'Desayuno Tico Completo',
          description: 'Gallo pinto, huevos, natilla, queso y café',
          image: 'https://placehold.co/600x400/FFD700/000000?text=Desayuno+Tico',
          price: 2800,
          base_ingredients: ['Gallo pinto', 'Huevos', 'Natilla', 'Queso blanco', 'Café'],
          preparation_time: 10,
          nutritional_info: { calories: 450, protein: 22, carbs: 48, fat: 20, fiber: 8 },
          tags: ['100% tico', 'Económico']
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

    ,
    'Tacos & Más': [
      { name: 'Guacamole Extra', description: 'Porción adicional de guacamole', price: 800 },
      { name: 'Queso Extra', description: 'Queso Oaxaca adicional', price: 600 },
      { name: 'Jalapeños', description: 'Jalapeños en escabeche', price: 300 },
      { name: 'Crema', description: 'Crema mexicana', price: 400 },
      { name: 'Pico de Gallo', description: 'Salsa fresca de tomate', price: 500 },
      { name: 'Carne Extra', description: 'Porción adicional de carne', price: 1200 },
      { name: 'Salsa Verde', description: 'Salsa verde picante', price: 200 },
      { name: 'Salsa Roja', description: 'Salsa roja tradicional', price: 200 },
      { name: 'Cebolla Morada', description: 'Cebolla morada encurtida', price: 300 },
      { name: 'Cilantro Extra', description: 'Cilantro fresco adicional', price: 200 }
    ],
    'Dragón Dorado': [
      { name: 'Pollo Extra', description: 'Porción adicional de pollo', price: 1000 },
      { name: 'Camarones', description: 'Camarones salteados', price: 1500 },
      { name: 'Vegetales Extra', description: 'Mix de vegetales adicionales', price: 600 },
      { name: 'Salsa Agridulce', description: 'Salsa agridulce casera', price: 300 },
      { name: 'Arroz Extra', description: 'Porción adicional de arroz', price: 500 },
      { name: 'Tofu', description: 'Tofu frito', price: 800 },
      { name: 'Huevo Frito', description: 'Huevo frito encima', price: 400 },
      { name: 'Brócoli', description: 'Brócoli fresco salteado', price: 500 },
      { name: 'Setas', description: 'Setas shiitake', price: 700 },
      { name: 'Salsa de Soya', description: 'Salsa de soya premium', price: 100 }
    ],
    'Curry House': [
      { name: 'Arroz Basmati', description: 'Porción de arroz basmati', price: 800 },
      { name: 'Naan Extra', description: 'Pan naan adicional', price: 600 },
      { name: 'Pollo Extra', description: 'Porción adicional de pollo', price: 1200 },
      { name: 'Verduras', description: 'Mix de verduras curry', price: 700 },
      { name: 'Yogur Raita', description: 'Yogur con pepino', price: 400 },
      { name: 'Mango Chutney', description: 'Chutney de mango dulce', price: 300 },
      { name: 'Picante Extra', description: 'Especias picantes adicionales', price: 200 },
      { name: 'Ghee', description: 'Mantequilla clarificada', price: 300 },
      { name: 'Cilantro Fresco', description: 'Hojas de cilantro', price: 200 },
      { name: 'Pappadums', description: 'Crackers indios crujientes', price: 500 }
    ],
    'Green Garden': [
      { name: 'Aguacate Extra', description: 'Aguacate fresco adicional', price: 800 },
      { name: 'Quinoa', description: 'Porción de quinoa cocida', price: 600 },
      { name: 'Tofu Marinado', description: 'Tofu con especias', price: 700 },
      { name: 'Hummus', description: 'Hummus de garbanzos', price: 500 },
      { name: 'Semillas de Chía', description: 'Semillas de chía orgánicas', price: 400 },
      { name: 'Nueces', description: 'Mix de nueces', price: 600 },
      { name: 'Aderezo Tahini', description: 'Aderezo de sésamo', price: 300 },
      { name: 'Germinados', description: 'Germinados frescos', price: 400 },
      { name: 'Proteína Vegetal', description: 'Proteína de soya', price: 800 },
      { name: 'Aceite de Oliva Extra', description: 'Aceite de oliva premium', price: 200 }
    ],
    'Wings Express': [
      { name: 'Salsa Buffalo Extra', description: 'Salsa buffalo adicional', price: 300 },
      { name: 'Aderezo Ranch', description: 'Aderezo ranch cremoso', price: 300 },
      { name: 'Papas Extra', description: 'Porción adicional de papas', price: 800 },
      { name: 'Aros de Cebolla', description: 'Aros de cebolla crujientes', price: 600 },
      { name: 'Queso Derretido', description: 'Queso cheddar derretido', price: 500 },
      { name: 'Bacon Bits', description: 'Trocitos de bacon', price: 700 },
      { name: 'Jalapeños', description: 'Jalapeños picantes', price: 300 },
      { name: 'Salsa BBQ', description: 'Salsa barbacoa casera', price: 200 },
      { name: 'Alitas Extra', description: '6 alitas adicionales', price: 2000 },
      { name: 'Apio', description: 'Palitos de apio fresco', price: 200 }
    ],
    'Dulce Tentación': [
      { name: 'Chocolate Extra', description: 'Cobertura de chocolate', price: 400 },
      { name: 'Fresas Frescas', description: 'Fresas naturales', price: 600 },
      { name: 'Crema Batida', description: 'Crema batida fresca', price: 300 },
      { name: 'Helado', description: 'Bola de helado de vainilla', price: 500 },
      { name: 'Caramelo', description: 'Salsa de caramelo', price: 300 },
      { name: 'Nueces', description: 'Nueces tostadas', price: 400 },
      { name: 'Coco Rallado', description: 'Coco rallado natural', price: 200 },
      { name: 'Cereza', description: 'Cereza confitada', price: 300 },
      { name: 'Almendras', description: 'Almendras fileteadas', price: 400 },
      { name: 'Dulce de Leche', description: 'Dulce de leche casero', price: 400 }
    ],
    'Mariscos del Pacífico': [
      { name: 'Camarones Extra', description: 'Camarones adicionales', price: 1500 },
      { name: 'Pulpo', description: 'Pulpo fresco', price: 1800 },
      { name: 'Aguacate', description: 'Aguacate fresco', price: 600 },
      { name: 'Limón Extra', description: 'Limones adicionales', price: 200 },
      { name: 'Ají Picante', description: 'Ají picante casero', price: 300 },
      { name: 'Cebolla Morada', description: 'Cebolla morada fresca', price: 300 },
      { name: 'Yuca Frita', description: 'Yuca frita criolla', price: 800 },
      { name: 'Patacones', description: 'Plátano verde frito', price: 700 },
      { name: 'Arroz Blanco', description: 'Arroz blanco cocido', price: 500 },
      { name: 'Salsa Rosada', description: 'Salsa golf casera', price: 300 }
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