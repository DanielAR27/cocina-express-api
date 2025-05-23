const app = require('./src/app');
const connectDB = require('./src/config/database');

// Conectar a la base de datos
connectDB();

// Puerto del servidor
const PORT = process.env.PORT;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`API disponible en: http://localhost:${PORT}`);
});

// Manejo graceful de cierre del servidor
process.on('SIGTERM', () => {
  console.log('Cerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Cerrando servidor...');
  process.exit(0);
});