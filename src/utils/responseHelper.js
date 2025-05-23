const success = (res, data, message = 'Operación exitosa', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data,
    message
  });
};

const error = (res, message, statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null
  });
};

const validationError = (res, errors) => {
  return res.status(400).json({
    success: false,
    message: 'Errores de validación',
    errors
  });
};

module.exports = {
  success,
  error,
  validationError
};