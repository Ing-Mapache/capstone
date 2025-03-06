const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    const statusCode = err.statusCode || 500;
    
    const errorResponse = {
      error: true,
      message: err.message || 'Error interno del servidor',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    };
    
    res.status(statusCode).json(errorResponse);
  };
  
  module.exports = errorHandler;