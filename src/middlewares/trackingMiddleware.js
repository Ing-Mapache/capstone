const Tracking = require('../models/trackingModel');

const trackingMiddleware = async (req, res, next) => {
  const startTime = Date.now();

  res.on('finish', async () => {
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    await Tracking.create({
      endpointAccess: req.originalUrl,
      requestMethod: req.method,
      statusCode: res.statusCode,
      responseTime,
      userId: req.user ? req.user.userId : null,
    });
  });

  next();
};

module.exports = trackingMiddleware;