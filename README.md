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
│   │   ├── categoryModel.js         # Modelo de categorias (IMPLEMENTADO)
│   │   ├── productModel.js          # Modelo de productos (IMPLEMENTADO)
│   │   ├── restaurantModel.js       # Modelo de restaurantes (IMPLEMENTADO)
│   │   ├── restaurantTagModel.js    # Modelo de tags globales (IMPLEMENTADO)
│   │   ├── tagModel.js              # Modelo de tag de restaurante (IMPLEMENTADO)
│   │   ├── toppingModel.js          # Modelo de toppings (IMPLEMENTADO)
│   │   ├── userModel.js             # Modelo de usuarios (IMPLEMENTADO)

│   ├── controllers/
│   │   ├── categoryController.js         # Controlador de categorias (IMPLEMENTADO)
│   │   ├── productController.js          # Controlador de productos (IMPLEMENTADO)
│   │   ├── restaurantController.js       # Controlador de restaurantes (IMPLEMENTADO)
│   │   ├── restaurantTagController.js    # Controlador de tags globales (IMPLEMENTADO)
│   │   ├── tagController.js              # Controlador de tag de restaurante (IMPLEMENTADO)
│   │   ├── toppingController.js          # Controlador de toppings (IMPLEMENTADO)
│   │   ├── userController.js             # Controlador de usuarios (IMPLEMENTADO)

│   ├── routes/
│   │   ├── categoryRoutes.js         # Enrutador de categorias (IMPLEMENTADO)
│   │   ├── productRoutes.js          # Enrutador de productos (IMPLEMENTADO)
│   │   ├── restaurantRoutes.js       # Enrutador de restaurantes (IMPLEMENTADO)
│   │   ├── restaurantTagRoutes.js    # Enturador de tags globales (IMPLEMENTADO)
│   │   ├── tagRoutes.js              # Enrutador de tag de restaurante (IMPLEMENTADO)
│   │   ├── toppingRoutes.js          # Enrutador de toppings (IMPLEMENTADO)
│   │   ├── userRoutes.js             # Enrutador de usuarios (IMPLEMENTADO)

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

> Nota: Esto solo es útil en deployment, pero en realidad la api se usa desde render.

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

### Modelos Pendientes
- **Order:** Pedidos de los clientes
- **Cart:** Carrito de compras

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
