# Cocina Express API

API backend para la aplicación Cocina Express - Proyecto Final de Diseño de Software (I Semestre 2025)

## 📋 Descripción

Cocina Express es una aplicación de delivery donde los clientes pueden personalizar la preparación de sus pedidos y las empresas brindan bases o platillos adaptados al gusto del cliente. La aplicación soporta servicios únicos o continuos, dietas especiales y condiciones específicas de alimentación.

## 🏗️ Arquitectura Actual

### Stack Tecnológico
- **Backend:** Node.js + Express.js
- **Base de Datos:** MongoDB con Mongoose (ORM)
- **Hosting:** Render

### Estructura del Proyecto
```
cocina-express-api/
├── .env                         # Variables de entorno
├── package.json
├── server.js                    # Punto de entrada del servidor
├── src/
│   ├── config/
│   │   └── database.js          # Configuración MongoDB
│   ├── models/
│   │   └── userModel.js         # Modelo de usuarios (IMPLEMENTADO)
│   │   └── restaurantModel.js   # Por implementar
│   │   └── productModel.js      # Por implementar
│   │   └── orderModel.js        # Por implementar
│   │   └── cartModel.js         # Por implementar
│   ├── controllers/
│   │   └── userController.js    # Controlador de usuarios (IMPLEMENTADO)
│   │   └── restaurantController.js  # Por implementar
│   │   └── productController.js     # Por implementar
│   │   └── orderController.js       # Por implementar
│   │   └── cartController.js        # Por implementar
│   ├── routes/
│   │   └── userRoutes.js        # Rutas de usuarios (IMPLEMENTADO)
│   │   └── restaurantRoutes.js  # Por implementar
│   │   └── productRoutes.js     # Por implementar
│   │   └── orderRoutes.js       # Por implementar
│   │   └── cartRoutes.js        # Por implementar
│   ├── middleware/
│   │   └── roleMiddleware.js    # Middleware de roles (IMPLEMENTADO)
│   ├── utils/
│   │   └── responseHelper.js    # Helper para respuestas (IMPLEMENTADO)
│   └── app.js                   # Configuración de Express
```

## Enlace del API
https://cocina-express-api.onrender.com

## Archivo de formato de colecciones
[Descargar formato de colecciones MONGO](Formato%20colecciones%20MONGO.txt)


## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v14 o superior)
- MongoDB (local o en la nube)
- Cuenta de Google para OAuth

### Configuración Inicial

1. **Clonar el repositorio**
```bash
git clone https://github.com/DanielAR27/cocina-express-api
cd cocina-express-api
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
Copie lo de `template.env` y cree un
archivo llamado `.env`

4. **Ejecutar la aplicación**
```bash
# Desarrollo
node server.js
```



## 📡 API Endpoints Implementados

### Usuarios (`/api/users`)

| Método | Endpoint | Descripción | Middlewares |
|--------|----------|-------------|-------------|
| POST | `/` | Crear usuario nuevo | - |
| GET | `/google/:google_id` | Buscar usuario por Google ID | - |
| GET | `/:id` | Obtener usuario por ID | - |
| GET | `/` | Obtener todos los usuarios | `isAdmin` |
| PUT | `/:id` | Actualizar usuario | `isOwnerOrSelf` |
| DELETE | `/:id` | Desactivar usuario | `isOwnerOrSelf` |

### Ejemplo de Respuesta
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "google_id": "12345678901234567890",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "role": "customer",
    "phone": "+506 8888-8888",
    "address": {
      "street": "Calle Principal 123",
      "city": "San José",
      "province": "San José",
      "postal_code": "10101"
    },
    "is_active": true,
    "created_at": "2025-05-25T10:00:00.000Z",
    "updated_at": "2025-05-25T10:00:00.000Z"
  },
  "message": "Usuario encontrado"
}
```

## 👥 Sistema de Roles

### Roles Disponibles
- **admin:** Acceso completo al sistema
- **owner:** Propietario de restaurante
- **customer:** Cliente final

### Middlewares de Autenticación
- `isAdmin`: Solo administradores
- `isOwner`: Solo propietarios
- `isOwnerOrAdmin`: Propietarios o administradores
- `isOwnerOrSelf`: Propietario o el mismo usuario

## 🗄️ Modelos de Base de Datos

### Usuario (Implementado)
```javascript
{
  google_id: String (requerido, único),
  name: String (requerido),
  email: String (requerido, único),
  phone: String (opcional),
  role: String ['admin', 'owner', 'customer'],
  profile_image: String,
  address: {
    street: String,
    city: String,
    province: String,
    postal_code: String
  },
  favorite_restaurants: [ObjectId],
  favorite_products: [{
    restaurant_id: ObjectId,
    product_id: ObjectId
  }],
  is_active: Boolean,
  created_at: Date,
  updated_at: Date
}
```

### Modelos Pendientes
- **Restaurant:** Información de restaurantes
- **Product:** Productos y sus personalizaciones
- **Order:** Pedidos de los clientes
- **Cart:** Carrito de compras
- **Category:** Categorías de productos
- **Tag:** Etiquetas para productos
- **Topping:** Ingredientes adicionales

## 🔧 Funcionalidades Implementadas

✅ **Gestión de Usuarios**
- Registro con Google OAuth
- CRUD completo de usuarios
- Sistema de roles y permisos
- Soft delete (desactivación)

✅ **Infraestructura Base**
- Configuración de Express
- Conexión a MongoDB
- Middleware de manejo de errores
- Helpers para respuestas estandarizadas
- Middleware de roles y permisos

## 📝 Tareas Pendientes

### Sprint Actual (Prioridad Alta)
- [ ] Implementar modelo y controlador de Restaurantes
- [ ] Implementar modelo y controlador de Productos
- [ ] Implementar modelo y controlador de Categorías
- [ ] Configurar autenticación con Google OAuth

### Próximos Sprints
- [ ] Sistema de pedidos (Orders)
- [ ] Carrito de compras
- [ ] Sistema de toppings/personalizaciones
- [ ] Integración de multimedia (imágenes, videos)
- [ ] Notificaciones push
- [ ] Sistema de pagos

## 📱 Integración con Frontend

### React Native (Móvil)
La API está configurada con CORS para permitir requests desde React Native.

### Plataformas Sugeridas
- **Base de Datos:** MongoDB Atlas

## 📋 Convenciones de Desarrollo

### Estructura de Commits
```
feat: nueva funcionalidad
fix: corrección de bug
docs: actualización de documentación
refactor: refactorización de código
test: adición de tests
```

### Naming Conventions
- **Archivos:** camelCase (userController.js)
- **Variables:** camelCase (firstName)
- **Constantes:** UPPER_SNAKE_CASE (MONGODB_URI)
- **Rutas:** kebab-case (/api/users)